# Hitec Assistant setup

## Current state

The UI and server connection are implemented. At the user's explicit request, their supplied key is now stored only in the local, Git-ignored `.env`, with AI enabled for local review. Rotate that exposed key before launch. The example configuration still defaults AI off. Two-turn live browser tests verified AI replies, relevant page suggestions, navigation, close/reopen and mobile fit. Without a configured key, messages receive clearly labelled page guidance, not generated answers.

## Local preview

Run `npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4324`. The preview command uses Vite directly because Astro's static preview omits custom Vite plugins. The local middleware serves `/api/chat` alongside the built pages. The website's regular `npm run dev` also supports it.

On this Windows machine, Node needs the system certificate store for outbound HTTPS. Use `npm run preview:system-ca -- --host 127.0.0.1 --port 4326` (Node with `--use-system-ca` support). This keeps certificate verification enabled; never use `NODE_TLS_REJECT_UNAUTHORIZED=0`. The current live local review is at http://127.0.0.1:4326/. Preview routing handles both extensionless page URLs and trailing slashes.

To enable AI locally, create a git-ignored `.env` using `.env.example` as a reference. Set a **new, unexposed** `ANTHROPIC_API_KEY` and `CHAT_ENABLED=true`, then restart the server. Never prefix the key with `PUBLIC_`. Never paste it into chat, source, a screenshot or a terminal command that will be logged. The default model is `claude-haiku-4-5`; `ANTHROPIC_MODEL` can override it.

## Vercel (when the user approves deployment)

The static Astro site stays static; root `api/chat.js` exports a Node Web Standard fetch handler. Add server-only environment variables in the project settings: `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `CHAT_ENABLED`, and `CHAT_ALLOWED_ORIGINS` (comma-separated exact origins including scheme, no trailing slash). Leave `CHAT_ENABLED=false` until launch protections are configured and a live smoke test succeeds. Redeploy after changing environment variables. No Vercel settings were changed by this implementation.

## Launch blockers and costs

- Revoke the exposed credential and create a replacement with appropriate access.
- Set Anthropic workspace spending limits/alerts. Tokens are billed when AI is enabled; no free-use claim is made.
- Configure a distributed Vercel Firewall rate-limit rule on `/api/chat`, or replace the local limiter with an atomic shared store. The current 10 requests/client/minute and 100 requests/instance/minute guard is **best effort only**: serverless instances do not share counters, and cold starts reset them. Origin checks are browser protections, not authentication. Do not treat this as a hard spend cap or protection against determined bots.
- Approve privacy wording and data handling. On Send, the current message and up to three recent exchanges may go to Anthropic. This app does not log or persist transcripts, but hosting/provider retention is separate. No resumes, phone numbers, emails, or sensitive personal information should be entered.
- Validate the curated directory against approved business copy. Draft hiring models, roles and process descriptions remain subject to confirmation; current vacancies, partnerships, client stories, statistics, prices and contact details are not verified facts. The request form is not connected to a lead backend and the assistant must not imply anything was submitted.
- Repeat the live-AI smoke test after rotating the key and after deploying; local success does not verify Vercel configuration. Unit tests use a provider stub, not live Anthropic.

## Limits and behavior

POST JSON only; exact same-origin by default; maximum 8 KiB body, 1,000 characters per message, seven alternating messages and 6,000 total characters. Provider timeout 15 seconds; output cap 500 tokens. Invalid/refused/truncated responses fall back to page guidance. Provider errors and keys are not returned to visitors. All message text is rendered with `textContent`, and clickable destinations come only from the local route allowlist. This limits navigation injection; AI factual accuracy still needs human review.

The greeting can be dismissed and remains dismissed for that tab/session where storage is available. The panel closes with its button or Escape and returns focus to the launcher. No automatic redirects, blocking modal or persisted transcript. New chat clears the conversation and cancels in-flight requests.

## Verification

`npm test` exercises the real handler and safe routing with controlled provider responses. `.impeccable/assistant_review.py` drives the local browser at desktop and mobile sizes. Local production build is `npm run build`.

Local live verification: `.impeccable/assistant_live_review.py`; 13 unit tests pass; 35-page build passes; all 33 assistant destinations return HTTP 200 from the local preview; scanning public build files finds zero occurrences of the configured credential. The live model sometimes returns a JSON code fence, which the handler now accepts before schema checks. Submission-related answers are qualified with the disconnected-form notice.

References checked during implementation: [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js), [Claude Messages API](https://platform.claude.com/docs/en/api/messages/create).
