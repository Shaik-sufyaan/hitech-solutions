import { pages, guideReply } from '../lib/assistant-directory.mjs';
import { buildHistory } from '../lib/chat-history.mjs';

type Message = { role: 'user' | 'assistant'; content: string };
type Link = { href: string; label: string };
type Reply = { mode: 'ai' | 'guide'; answer: string; links: Link[]; navigate?: Link };
type Entry = { role: 'user' | 'assistant'; text: string; links: Link[]; mode: string };

const KEY = {
  closed: 'hitech-assistant-closed',
  greeting: 'hitech-greeting-dismissed',
  transcript: 'hitech-assistant-transcript',
  history: 'hitech-assistant-history',
  reopen: 'hitech-assistant-reopen',
};
const store = {
  get(key: string) { try { return sessionStorage.getItem(key); } catch { return null; } },
  set(key: string, value: string) { try { sessionStorage.setItem(key, value); } catch { /* Storage may be unavailable. */ } },
  remove(key: string) { try { sessionStorage.removeItem(key); } catch { /* Storage may be unavailable. */ } },
};
const safePage = (href: string) => pages.find(page => page.href === href);
/** Reply text plus the names of the pages it linked, so "that page" can be resolved later. */
const withPageNames = (answer: string, links: Link[]) => {
  const names = links.map(link => safePage(link.href)?.label).filter(Boolean);
  const text = names.length ? `${answer}

Suggested pages: ${names.join(', ')}.` : answer;
  return text.slice(0, 1000);
};

const root = document.querySelector<HTMLElement>('[data-assistant]');
if (root) {
  const panel = root.querySelector<HTMLElement>('[data-chat-panel]')!;
  const greeting = root.querySelector<HTMLElement>('[data-chat-greeting]')!;
  const launcher = root.querySelector<HTMLButtonElement>('[data-chat-launcher]')!;
  const messages = root.querySelector<HTMLElement>('[data-chat-messages]')!;
  // The panel body (messages + choices) is the element that scrolls.
  const scroller = root.querySelector<HTMLElement>('.assistant__body') ?? messages;
  const suggestions = root.querySelector<HTMLElement>('[data-chat-suggestions]')!;
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]')!;
  const input = root.querySelector<HTMLTextAreaElement>('textarea')!;
  const send = root.querySelector<HTMLButtonElement>('[data-chat-send]')!;
  const status = root.querySelector<HTMLElement>('[data-chat-status]')!;
  let history: Message[] = [];
  let transcript: Entry[] = [];
  let active: AbortController | null = null;
  let generation = 0;
  let busy = false;
  const welcome = 'Hi, I’m Hitech Assistant from Hitech Solutions. We help employers find IT talent and help technology professionals find their next role. Would you like me to help you hire IT talent, book a meeting with our team, or get support with a question?';

  function dismissGreeting() {
    greeting.hidden = true;
    store.set(KEY.greeting, '1');
  }
  /**
   * moveFocus is false only for the automatic pop-up on page load, so the
   * panel never takes keyboard focus or scroll position from the visitor.
   */
  function setOpen(open: boolean, moveFocus = true) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Minimize Hitech Assistant' : 'Open Hitech Assistant');
    dismissGreeting();
    if (!open) store.set(KEY.closed, '1'); // Once closed, stay closed for the rest of this visit.
    if (open) scrollToLatest();
    if (!moveFocus) return;
    if (open) input.focus({ preventScroll: true });
    else launcher.focus({ preventScroll: true });
  }

  /** Bring the newest message into view: its first line if it is long, otherwise the very bottom. */
  function scrollToLatest() {
    const last = messages.lastElementChild as HTMLElement | null;
    if (!last) return;
    // Only the greeting so far: show it from the top, like a fresh card.
    if (messages.children.length === 1) {
      scroller.scrollTop = 0;
      return;
    }
    const lastTop = last.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    const fits = last.offsetHeight <= scroller.clientHeight - 24;
    scroller.scrollTop = fits || last.classList.contains('chat-message--user') ? scroller.scrollHeight : Math.max(0, lastTop - 12);
  }

  function render(entry: Entry) {
    const article = document.createElement('div');
    article.className = `chat-message chat-message--${entry.role}`;
    const label = document.createElement('p');
    label.className = entry.mode === 'guide' ? 'chat-message__label' : 'chat-message__label visually-hidden';
    label.textContent = entry.role === 'user' ? 'You' : entry.mode === 'guide' ? 'Page guidance' : 'Hitech Assistant';
    const body = document.createElement('p');
    body.className = 'chat-message__text';
    body.textContent = entry.text;
    article.append(label, body);
    const safeLinks = entry.links.map(link => safePage(link.href)).filter(Boolean).slice(0, 3);
    if (safeLinks.length) {
      const list = document.createElement('div');
      list.className = 'chat-links';
      for (const destination of safeLinks) {
        const anchor = document.createElement('a');
        anchor.href = destination!.href;
        anchor.textContent = destination!.label;
        anchor.addEventListener('click', () => store.set(KEY.reopen, '1'));
        list.append(anchor);
      }
      article.append(list);
    }
    messages.append(article);
    while (messages.children.length > 30) messages.firstElementChild?.remove();
  }

  function append(role: Entry['role'], text: string, links: Link[] = [], mode = '') {
    const entry = { role, text, links, mode };
    render(entry);
    transcript = [...transcript, entry].slice(-30);
    save();
    // Wait a frame so layout includes the new message before scrolling.
    requestAnimationFrame(scrollToLatest);
  }

  function save() {
    store.set(KEY.transcript, JSON.stringify(transcript));
    store.set(KEY.history, JSON.stringify(history));
  }

  function reset() {
    generation++;
    active?.abort(); active = null;
    history = []; transcript = []; busy = false; send.disabled = false;
    status.textContent = ''; input.value = '';
    messages.replaceChildren(); suggestions.hidden = false;
    append('assistant', welcome);
  }

  /** Continue the same conversation after moving to another page of the site. */
  function restore(): boolean {
    try {
      const saved = JSON.parse(store.get(KEY.transcript) ?? 'null');
      const savedHistory = JSON.parse(store.get(KEY.history) ?? '[]');
      if (!Array.isArray(saved) || saved.length === 0) return false;
      transcript = saved
        .filter((e: Entry) => e && (e.role === 'user' || e.role === 'assistant') && typeof e.text === 'string')
        .map((e: Entry) => ({ role: e.role, text: e.text.slice(0, 1000), links: Array.isArray(e.links) ? e.links : [], mode: String(e.mode ?? '') }))
        .slice(-30);
      history = Array.isArray(savedHistory) ? savedHistory.slice(-6) : [];
      messages.replaceChildren();
      transcript.forEach(render);
      suggestions.hidden = transcript.some(e => e.role === 'user');
      return transcript.length > 0;
    } catch {
      return false;
    }
  }

  /** Open a site page the visitor asked for. Only directory pages are allowed. */
  function navigateTo(link: Link | undefined) {
    const destination = link && safePage(link.href);
    if (!destination) return;
    if (location.pathname.replace(/\/$/, '') === destination.href) {
      append('assistant', `You’re already on the ${destination.label} page.`);
      return;
    }
    status.textContent = `Opening ${destination.label}…`;
    store.set(KEY.reopen, '1');
    window.setTimeout(() => location.assign(destination.href), 600);
  }

  async function submit(text: string) {
    const content = text.trim();
    if (busy || !content || content.length > 1000) return;
    busy = true; send.disabled = true; suggestions.hidden = true;
    input.value = ''; append('user', content);
    status.textContent = 'Finding the right information…';
    const ticket = generation;
    const controller = new AbortController(); active = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    const outgoing = buildHistory(history, content);
    const lastReply = [...transcript].reverse().find(entry => entry.role === 'assistant');
    const previous = lastReply ? withPageNames(lastReply.text, lastReply.links) : '';
    let navigate: Link | undefined;
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: outgoing }), signal: controller.signal });
      if (ticket !== generation) return;
      if (!response.ok) {
        if (response.status === 429) {
          append('assistant', 'Please wait a minute before sending another message. You can still explore these pages.', guideReply(content).links, 'guide');
          return;
        }
        throw new Error('unavailable');
      }
      const reply: Reply = await response.json();
      if (ticket !== generation) return;
      if (!reply || typeof reply.answer !== 'string' || reply.answer.length > 1000 || !Array.isArray(reply.links) || !['ai', 'guide'].includes(reply.mode)) throw new Error('invalid response');
      history = [...outgoing, { role: 'assistant' as const, content: withPageNames(reply.answer, reply.links) }].slice(-6);
      append('assistant', reply.answer, reply.links, reply.mode);
      navigate = reply.navigate;
    } catch {
      if (ticket !== generation) return;
      // Offline fallback still understands "take me to that page" from the previous reply.
      const reply = guideReply(content, true, previous);
      append('assistant', reply.answer, reply.links, 'guide');
      navigate = reply.navigate;
    } finally {
      clearTimeout(timeout);
      if (ticket === generation) { busy = false; send.disabled = false; status.textContent = ''; active = null; }
    }
    if (ticket === generation) navigateTo(navigate);
  }

  launcher.addEventListener('click', () => setOpen(panel.hidden));
  root.querySelector('[data-chat-start]')!.addEventListener('click', () => setOpen(true));
  root.querySelector('[data-chat-dismiss]')!.addEventListener('click', dismissGreeting);
  root.querySelector('[data-chat-close]')!.addEventListener('click', () => setOpen(false));
  root.querySelector('[data-chat-reset]')!.addEventListener('click', () => { reset(); input.focus(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !panel.hidden) { setOpen(false); event.preventDefault(); } });
  form.addEventListener('submit', (event) => { event.preventDefault(); void submit(input.value); });
  input.addEventListener('keydown', (event) => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); void submit(input.value); } });
  root.querySelectorAll<HTMLButtonElement>('[data-chat-prompt]').forEach(button => button.addEventListener('click', () => { input.focus(); void submit(button.dataset.chatPrompt!); }));

  if (!restore()) reset();
  root.hidden = false;

  // Arriving from a page the assistant opened: reopen the same conversation.
  if (store.get(KEY.reopen) === '1') {
    store.remove(KEY.reopen);
    greeting.hidden = true;
    setOpen(true);
  } else {
    // Pop-up on load: the full panel on every screen size (phones included, at the user's
    // request). Skipped once the visitor closes it during this visit.
    const closedThisVisit = store.get(KEY.closed) === '1';
    const greetingDismissed = store.get(KEY.greeting) === '1';
    if (!closedThisVisit) {
      greeting.hidden = true;
      window.setTimeout(() => {
        if (panel.hidden && store.get(KEY.closed) !== '1') setOpen(true, false);
      }, 900);
    } else {
      greeting.hidden = closedThisVisit || greetingDismissed;
    }
  }
}
