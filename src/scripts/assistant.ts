import { pages, guideReply } from '../lib/assistant-directory.mjs';
import { buildHistory } from '../lib/chat-history.mjs';

type Message = { role: 'user' | 'assistant'; content: string };
type Reply = { mode: 'ai' | 'guide'; answer: string; links: { href: string; label: string }[] };
const root = document.querySelector<HTMLElement>('[data-assistant]');
if (root) {
  const panel = root.querySelector<HTMLElement>('[data-chat-panel]')!;
  const greeting = root.querySelector<HTMLElement>('[data-chat-greeting]')!;
  const launcher = root.querySelector<HTMLButtonElement>('[data-chat-launcher]')!;
  const messages = root.querySelector<HTMLElement>('[data-chat-messages]')!;
  const suggestions = root.querySelector<HTMLElement>('[data-chat-suggestions]')!;
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]')!;
  const input = root.querySelector<HTMLTextAreaElement>('textarea')!;
  const send = root.querySelector<HTMLButtonElement>('[data-chat-send]')!;
  const status = root.querySelector<HTMLElement>('[data-chat-status]')!;
  let history: Message[] = [];
  let active: AbortController | null = null;
  let generation = 0;
  let busy = false;
  const welcome = 'Hi, I’m the Hitech Assistant. I can help you find IT talent, explain how we work, or point you to the right page if you’re looking for your next role. What brings you here today?';

  function dismissGreeting() {
    greeting.hidden = true;
    try { sessionStorage.setItem('hitech-greeting-dismissed', '1'); } catch { /* Storage may be unavailable. */ }
  }
  function setOpen(open: boolean) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Minimize Hitech Assistant' : 'Open Hitech Assistant');
    dismissGreeting();
    if (open) input.focus({ preventScroll: true });
    else launcher.focus({ preventScroll: true });
  }
  function append(role: 'user' | 'assistant', text: string, links: Reply['links'] = [], mode = '') {
    const article = document.createElement('div');
    article.className = `chat-message chat-message--${role}`;
    const label = document.createElement('p');
    label.className = mode === 'guide' ? 'chat-message__label' : 'chat-message__label visually-hidden';
    label.textContent = role === 'user' ? 'You' : mode === 'guide' ? 'Page guidance' : 'Hitech Assistant';
    const body = document.createElement('p');
    body.className = 'chat-message__text';
    body.textContent = text;
    article.append(label, body);
    const safeLinks = links.filter(link => pages.some(page => page.href === link.href)).slice(0, 3);
    if (safeLinks.length) {
      const list = document.createElement('div');
      list.className = 'chat-links';
      for (const link of safeLinks) {
        const destination = pages.find(page => page.href === link.href)!;
        const anchor = document.createElement('a');
        anchor.href = destination.href;
        anchor.textContent = destination.label;
        list.append(anchor);
      }
      article.append(list);
    }
    messages.append(article);
    while (messages.children.length > 30) messages.firstElementChild?.remove();
    messages.scrollTop = messages.scrollHeight;
  }
  function reset() {
    generation++;
    active?.abort(); active = null;
    history = []; busy = false; send.disabled = false;
    status.textContent = ''; input.value = '';
    messages.replaceChildren(); suggestions.hidden = false;
    append('assistant', welcome);
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
      append('assistant', reply.answer, reply.links, reply.mode);
      history = [...outgoing, { role: 'assistant' as const, content: reply.answer }].slice(-6);
    } catch {
      if (ticket !== generation) return;
      const reply = guideReply(content, true);
      append('assistant', reply.answer, reply.links, 'guide');
    } finally {
      clearTimeout(timeout);
      if (ticket === generation) { busy = false; send.disabled = false; status.textContent = ''; active = null; }
    }
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
  reset(); root.hidden = false;
  try { greeting.hidden = sessionStorage.getItem('hitech-greeting-dismissed') === '1'; } catch { greeting.hidden = false; }
}
