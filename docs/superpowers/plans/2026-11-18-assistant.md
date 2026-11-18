# Hitech Assistant Implementation Plan

> Use superpowers:executing-plans inline. User approved local implementation; do not commit or push.

**Goal:** Taller Explore section, restrained orange accents and a closable, site-grounded assistant.
**Architecture:** Static Astro UI; shared Node request handler behind Vercel /api/chat and a local Vite middleware. Curated route directory shared by UI and backend. No new runtime dependencies.
**Tech Stack:** Astro, CSS, TypeScript/browser DOM, Node fetch, node:test, Playwright.
**Spec:** ../specs/2026-11-18-assistant-design.md

## Constraints and review focus
- Do not use or store the exposed credential; server-only replacement key.
- Unsafe output is text, not HTML; navigation limited to the route directory.
- Missing key, rate limit, timeout and malformed provider response must recover honestly.
- Small screens, keyboard closure, focus return and dismissed greeting must work.
- Provisional statistics, missing careers destination and disconnected inquiry form must not become verified claims.

## Tasks
- [x] Add tests for request validation, offline replies/routes, restricted links, provider errors, throttling and bounded model payload. Run red.
- [x] Implement src/lib/assistant-directory.mjs, server/chat.mjs, api/chat.js and local middleware; run Node tests green.
- [x] Add ChatAssistant.astro + browser script, mount in BaseLayout; test greeting/dismiss/open/send/error/close/reset and navigation.
- [x] Expand Explore content/padding and add scoped amber detail styling; preserve existing layout and copy.
- [x] Document env setup, privacy and launch protections. Build, test desktop/mobile, scan for secrets in shipping artifacts, obtain fresh design review. No push.

## Execution record

- Preserved the user's uncommitted local work and stayed in the requested preview workspace. No commits or push.
- Initial Node tests failed for the absent handler; implementation passed eight tests.
- Initial browser test failed for the absent widget. Implemented controls, bounded requests, allowlisted page links and offline disclosure.
- Found Astro static preview ignores custom Vite plugins. API integration assertion reproduced 404. Changed the preview command to Vite with the same local middleware; endpoint and interaction checks now pass.
- Fresh code reviewer found history could exceed byte/character budgets. Two regression tests failed against the old six-message history; pairwise trimming fixed ASCII and multibyte histories. Full Node suite: 11 passed.
- Fresh Impeccable reviewer: ship for local review, no material visual defects across 1440/390/320px. This does not clear live AI or production launch.
- Production build: 35 pages, no errors/warnings, one existing unused-variable hint in logo-loop.js. Browser checks cover greeting dismissal across reload, API guide response, page links, send, Escape/focus, reset, failed transport recovery, fit and Explore height. 33 routes resolve to built pages; no key/server-variable matches in public assets.
- Remaining: replacement key and live-provider smoke test, distributed rate limiting, provider spending controls and privacy/business approval before live AI deployment. These are explicit launch gates, not claims of completed production validation.
