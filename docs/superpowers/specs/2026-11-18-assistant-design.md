# Homepage accents and Hitech Assistant

Approved in chat: build locally, no push. Preserve existing work.

- Expand the white Explore area into a spacious section. Use existing amber sparingly in section details; retain the white header and black deck.
- Add a site-wide bottom-right navy/white assistant with a small amber accent, dismissible greeting, close/reopen controls, accessible mobile layout and page suggestions. Never redirect without a click.
- Greet visitors and ask how they are doing. Answer from site content only. Label AI assistance and disclose that submitted messages go to Anthropic; ask visitors not to share sensitive information.
- No invented facts, current vacancies, confirmed memberships or metrics. Existing provisional statistics and stories are not evidence. The request form is not connected to a backend.
- Keep the exposed key out of all files. Read a replacement from server-only ANTHROPIC_API_KEY. AI remains off until explicitly configured. No chat persistence or message logging.
- Keep Astro pages static. Use a Vercel Node function with the same handler mounted in local dev/preview. Bound requests, output, timeouts and instance-level traffic. Document that distributed rate limiting/firewall and provider spending controls are launch requirements.
- Approach: a custom small Astro widget plus server function fits the existing stack and gives control over truth and navigation. A hosted widget would add another vendor; browser-only Claude would expose credentials.

Visual contract: existing Libre Franklin, white/ink/navy/amber palette; legible message list, understated rectangular controls, no fake online agent, no blocking auto-open modal. Greeting shown once per tab; messages live only in memory.
