# Hitech Solutions website

Static marketing site built with Astro, TypeScript and plain CSS. **Local preview only. Not published.**

## Run it

```sh
npm install
npm run dev        # http://localhost:4321 (live reload)
npm run build      # type-check + static build into dist/
npm run preview    # serve the built site
```

## Where things live

| To change | Edit |
|---|---|
| Colours, type sizes, spacing, corners | `src/styles/tokens.css` (palette is provisional) |
| Logo | `src/components/site/Wordmark.astro` (provisional text wordmark) |
| Homepage copy (all DRAFT) | `src/content/home.ts` (lines marked `CONFIRM` need business approval) |
| Navigation, careers link, form endpoint | `src/content/site.ts` |
| Photos and their licences | `src/assets/images/` + `CREDITS.md` |

## Connecting the real journeys

- **Careers / job board:** set `careersUrl` in `src/content/site.ts`. The Pending marker in the job-seekers section is replaced by the "Explore opportunities" button, and the FAQ shows the "How do I apply?" answer.
- **Employer inquiries:** set `PUBLIC_LEAD_ENDPOINT` (see `.env.example`) to a backend that accepts a JSON POST. Return `2xx` with an optional `{ "reference": "..." }` on success, `422` with `{ "errors": { field: message } }` for validation failures, and `429` when rate limiting. Until it is set, the form validates and tells the visitor plainly that nothing was sent.

## Before launch

Every dashed **Pending** marker on the site is a missing business input. There must be none at launch. Also remove `noindex` (it is set by `BaseLayout.astro` for previews).

## QA scripts

```sh
python -I scripts/capture.py http://127.0.0.1:4321 .impeccable/review/latest / /request-talent
python -I scripts/interact.py http://127.0.0.1:4321 .impeccable/review/states
python -I scripts/form_states.py http://127.0.0.1:4321 .impeccable/review/states
```

These need Python Playwright. In Git Bash, prefix the commands with `MSYS_NO_PATHCONV=1`.
