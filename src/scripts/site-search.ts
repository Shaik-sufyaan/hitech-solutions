/**
 * Site search for the header's top bar. Searches the published page directory
 * (the same list the Hitech Assistant links to), entirely in the browser.
 *
 * - Every word typed must match the start of a word in a page's name, keywords
 *   or parent section ("secu ana" finds Security analyst).
 * - Enter opens the best match; arrow keys move through results; Escape closes.
 * - "/" anywhere on the page opens search (unless the visitor is typing).
 */
import { pages } from '../lib/assistant-directory.mjs';

type Page = { id: string; label: string; href: string; keywords: string[] };
type Entry = Page & { crumb: string; depth: number; words: string[]; keywordWords: string[]; parentWords: string[] };

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const split = (text: string) => normalize(text).split(' ').filter(Boolean);

const all: Page[] = [{ id: 'home', label: 'Home', href: '/', keywords: ['home', 'start', 'hitech'] }, ...(pages as Page[])];

const entries: Entry[] = all.map((page) => {
  const parentHref = page.href.split('/').slice(0, -1).join('/');
  const parent = parentHref ? all.find((other) => other.href === parentHref) : undefined;
  return {
    ...page,
    crumb: parent ? parent.label : 'Hitech Solutions',
    depth: page.href.split('/').filter(Boolean).length,
    words: split(page.label),
    keywordWords: page.keywords.flatMap(split),
    parentWords: parent ? split(parent.label) : [],
  };
});

const POPULAR = ['hire', 'request', 'specialties', 'process', 'jobs'];
const LIMIT = 7;

function search(query: string) {
  const tokens = split(query);
  if (!tokens.length) return [];
  const whole = normalize(query);
  return entries
    .map((entry) => {
      let score = 0;
      for (const token of tokens) {
        if (entry.words.some((word) => word.startsWith(token))) score += 3;
        else if (entry.keywordWords.some((word) => word.startsWith(token))) score += 2;
        else if (entry.parentWords.some((word) => word.startsWith(token))) score += 1;
        else return null; // every word must match somewhere
      }
      if (normalize(entry.label).startsWith(whole)) score += 4;
      return { entry, score };
    })
    .filter((item): item is { entry: Entry; score: number } => item !== null)
    .sort((a, b) => b.score - a.score || a.entry.depth - b.entry.depth || a.entry.label.length - b.entry.label.length)
    .slice(0, LIMIT)
    .map((item) => item.entry);
}

/** The site's arrow-right line icon, built with DOM calls. */
function arrowIcon() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  const attrs: Record<string, string> = {
    width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': '1.75', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  };
  for (const [name, value] of Object.entries(attrs)) svg.setAttribute(name, value);
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', 'M5 12h14M13 6l6 6-6 6');
  svg.append(path);
  return svg;
}

/** Label with the matched word starts underlined; built from text nodes, never from the query as HTML. */
function labelNode(label: string, tokens: string[]) {
  const span = document.createElement('span');
  span.className = 'site-search__label';
  for (const part of label.split(/(\s+)/)) {
    const lower = normalize(part);
    const token = tokens.find((t) => lower.startsWith(t));
    if (token && lower) {
      const mark = document.createElement('mark');
      mark.textContent = part.slice(0, token.length);
      span.append(mark, part.slice(token.length));
    } else {
      span.append(part);
    }
  }
  return span;
}

const root = document.querySelector<HTMLElement>('[data-search]');
const toggle = document.querySelector<HTMLButtonElement>('[data-search-toggle]');

if (root && toggle) initSearch(root, toggle);

function initSearch(root: HTMLElement, toggle: HTMLButtonElement) {
  const form = root.querySelector<HTMLFormElement>('[data-search-form]')!;
  const input = root.querySelector<HTMLInputElement>('[data-search-input]')!;
  const list = root.querySelector<HTMLUListElement>('[data-search-results]')!;
  const heading = root.querySelector<HTMLElement>('[data-search-heading]')!;
  const status = root.querySelector<HTMLElement>('[data-search-status]')!;
  const close = root.querySelector<HTMLButtonElement>('[data-search-close]')!;

  const links = () => [...list.querySelectorAll<HTMLAnchorElement>('a')];

  function render() {
    const query = input.value;
    const tokens = split(query);
    const results = tokens.length ? search(query) : entries.filter((entry) => POPULAR.includes(entry.id));
    heading.textContent = tokens.length ? '' : 'Popular pages';
    list.replaceChildren(
      ...results.map((entry, index) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = entry.href;
        if (tokens.length && index === 0) link.classList.add('is-active'); // Enter opens this one
        const text = document.createElement('span');
        const crumb = document.createElement('span');
        crumb.className = 'site-search__crumb';
        crumb.textContent = entry.crumb;
        text.append(labelNode(entry.label, tokens), crumb);
        link.append(text, arrowIcon());
        item.append(link);
        return item;
      }),
    );

    if (!tokens.length) {
      status.replaceChildren();
    } else if (results.length) {
      status.textContent = `${results.length} ${results.length === 1 ? 'page' : 'pages'} found. Press Enter to open the first.`;
    } else {
      const request = document.createElement('a');
      request.href = '/request-talent';
      request.textContent = 'tell us what you need';
      status.replaceChildren(`No pages match “${query.trim()}”. Try a role, a skill or a hiring arrangement, or `, request, '.');
    }
  }

  const isOpen = () => !root.hidden;

  function open() {
    if (isOpen()) return;
    document.dispatchEvent(new CustomEvent('site-search:open'));
    root.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    render();
    input.focus();
    input.select(); // a previous query stays, selected, so typing replaces it
  }

  function shut(returnFocus = false) {
    if (!isOpen()) return;
    root.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => (isOpen() ? shut() : open()));
  close.addEventListener('click', () => shut(true));
  input.addEventListener('input', render);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const first = links()[0];
    if (split(input.value).length && first) location.assign(first.href);
  });

  // Arrow keys move between the field and the results.
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      shut(true);
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    const items = links();
    if (!items.length) return;
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    event.preventDefault();
    if (event.key === 'ArrowDown') items[Math.min(items.length - 1, index + 1)].focus();
    else if (index <= 0) input.focus();
    else items[index - 1].focus();
  });

  // Keep the "Enter opens" highlight on the first result only while the field has focus.
  root.addEventListener('focusin', (event) => {
    const first = links()[0];
    if (first) first.classList.toggle('is-active', event.target === input && split(input.value).length > 0);
  });

  // Close on a click outside, or when focus leaves both the panel and its button.
  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    if (isOpen() && !root.contains(target) && !toggle.contains(target)) shut();
  });
  root.addEventListener('focusout', (event) => {
    const next = event.relatedTarget as Node | null;
    if (next && !root.contains(next) && next !== toggle) shut();
  });

  // Opening a menu closes search (the header dispatches this).
  document.addEventListener('site-menu:open', () => shut());

  // "/" opens search from anywhere, unless the visitor is typing.
  document.addEventListener('keydown', (event) => {
    if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
    const el = document.activeElement as HTMLElement | null;
    if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
    event.preventDefault();
    open();
  });
}
