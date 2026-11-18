# Hitech Solutions Homepage — Design and Delivery Plan

> **For agentic workers:** Implementation was authorized on 2026-11-16 (local preview only; no external publishing). Read **Revision 1** first: it overrides conflicting aesthetic and stack guidance later in this document. Checkboxes track work.

**Goal:** Create a polished IT staffing homepage for Hitech Solutions, closely following the visual structure of the supplied reference and using original Hitech content.

**Architecture:** A fast, server-rendered marketing site with reusable page sections and structured content. Isolate job-system and lead-system integrations from presentation so the homepage remains maintainable as later references are incorporated.

**Tech stack:** Astro 5 (static output), TypeScript (strict) and plain CSS with shared tokens (`src/styles/tokens.css`). Self-hosted Libre Franklin via @fontsource. JavaScript only for mobile navigation and form feedback; FAQ uses native `<details>`. No React, no animation library. Hosting and lead backend remain open. A CMS is conditional on the editorial team's needs.

**Spec / product context:** [PRODUCT.md](../../../PRODUCT.md). This plan contains the proposed visual specification; business facts and proposed copy need approval.

**Reference:** [Robert Half technology landing page](https://www.roberthalf.com/us/en/tech-it), inspected November 16, 2026. This is the linked technology landing page, not the domain's general homepage.

## Revision 1 — 2026-11-16: clarified direction, stack and build status

**Direction (user, binding; overrides §2 and §4 where they conflict).** "Established, clean, restrained, and professional." Interpret the reference with restraint: keep its structure and hiring journey, drop decorative treatments. Specifically superseded: pill-shaped buttons (now 2px corners), squircle/organic photo masks and curved section edges (now plain rectangles, 4px corners, straight section edges), desktop carousels for specialties and insights (now static layouts), and teal reference colors (now a provisional Hitech palette). Banned: moving/floating shapes, blobs, particles, decorative backgrounds or gradients, bouncing cards, parallax, scroll hijacking, animated counters, autoplay carousels or video, glassmorphism, neon glows, bubbly containers, a card grid for every section, generic AI marketing language. Motion is limited to hover, focus, menu and disclosure feedback, and is disabled under reduced motion.

**Stack (user decision).** Astro + TypeScript + plain CSS tokens, static HTML. See the Tech stack line above. §8's Next.js file map is replaced by:

```text
src/pages/index.astro                 homepage composition
src/pages/request-talent.astro        employer inquiry form (validation, honest states)
src/pages/404.astro                   not-found page
src/layouts/BaseLayout.astro          document shell, meta, noindex for previews
src/components/site/                  Header (mobile drawer), Footer, Wordmark (provisional)
src/components/home/                  Hero, Overview, Specialties, Engagement, Process, JobSeekers, Faq, Closing
src/components/ui/                    Button, Icon (authored line icons), Pending (visible gap marker)
src/content/site.ts                   nav, destinations, careersUrl, leadEndpoint (PUBLIC_LEAD_ENDPOINT)
src/content/home.ts                   all homepage copy (DRAFT; CONFIRM markers)
src/styles/tokens.css, global.css     design tokens and base styles
src/assets/images/                    licensed stock masters + CREDITS.md (provenance also embedded)
scripts/capture.py, interact.py       rendered QA: screenshots at 1440/834/390, state + link checks
```

**Visual system (provisional until a brand kit exists).** Ink-navy hero and footer (#13212E), white page, cool paper bands (#F3F5F7), one action blue (#1F4FA8), 1px slate rules (#D8DEE4). Libre Franklin: light display headings, regular body, semibold labels. All values live in `tokens.css`; swapping the brand touches that file and `Wordmark.astro` only.

**Imagery.** Free Unsplash-licensed stock for the preview (user decision). Generic people only, never captioned as Hitech staff or clients. Replace with commissioned photography when available.

**Homepage as built (preview).** Header → hero (centered statement, two edge photographs on desktop, one leading photograph on mobile) → staffing overview → specialties (ruled 3×2 list, no cards) → engagement models (three ruled columns, each linking to the form with the model preselected) → process (photo + numbered steps) → job seekers → FAQ (native disclosure) → closing CTA → footer. Held until real evidence exists: industries (§3-04), office search (§3-07), client outcomes (§3-08), trust (§3-09), insights (§3-10), related services (§3-12).

**Employer journey.** `/request-talent` validates on the client (summary + inline errors, values preserved, double-submit guard, 15s timeout, 422/429/failure states). With no `PUBLIC_LEAD_ENDPOINT` it says plainly that nothing was sent. Server-side validation, durable acceptance and CRM delivery remain Task 4.

**Candidate journey.** `careersUrl` is null; candidate links go to `#job-seekers`, which shows a visible Pending marker until the ATS/careers URL is supplied.

**Revision 2 (2026-11-18): multi-page navigation.** The header items now open full-width navy menu panels on click: Hire talent and Specialties (one open at a time; Escape and outside clicks close them; focus returns to the trigger; the open trigger becomes a navy tab). Every navigation item now has its own page instead of a homepage anchor: `/hire-talent`, `/hire-talent/{contract-staffing|contract-to-hire|direct-hire}`, `/specialties`, `/specialties/{slug}` (6), `/how-we-work`, `/job-seekers` and `/faq`. Interior pages share `components/page/PageHero.astro` (navy band, breadcrumb, H1, lead, actions) and `components/page/LinkIndex.astro` (ruled index). Navigation data lives in `src/content/navigation.ts`. The homepage keeps its summary sections, each linking to its page. A full crawl found every internal link and anchor resolving across 16 pages.

**Status of Tasks 1–3.**
- [x] Stack and direction approved (2026-11-16).
- [x] Shared tokens, site shell, hero and representative split section built and inspected at 1440 and 390 before extending.
- [x] Remaining supported sections built from typed content; semantic headings; accessible controls.
- [x] No horizontal overflow at 390 / 834 / 1440; keyboard order, menu, FAQ, form states and internal links verified in a real browser.
- [ ] Business approval of all DRAFT/CONFIRM copy, specialties and engagement models.
- [ ] Brand kit, careers URL, lead backend, privacy notice (see open items in PRODUCT.md).
- [ ] 200% zoom check, Safari/Firefox, and screen-reader pass (Task 5).

## 1. Deliverables and evidence

- [Open the screenshot and image gallery](../../../reference/robert-half/index.html).
- [Desktop full page](../../../reference/robert-half/screenshots/01-desktop-full.png), captured at a 1440 × 1000 viewport.
- [Mobile full page](../../../reference/robert-half/screenshots/mobile-full.png), captured at a 390 × 844 viewport.
- [Section overview](../../../reference/robert-half/contact-sheet.jpg): 14 crops, including header/hero and footer.
- Thirteen overlapping desktop viewport captures in `reference/robert-half/screenshots`.
- Seventeen separate source-image screenshots, including navigation imagery, in `reference/robert-half/images/asset-*.png`.
- [Asset manifest](../../../reference/robert-half/asset-manifest.json) records source URLs and native dimensions.
- [Inspection metadata](../../../reference/robert-half/inspection.json) records geometry and a typography sample, without a full copy transcription.

Scope of the evidence: the default rendered page and mobile layout. Expanded navigation, every carousel position, all case-study selections, and expanded FAQ answers are not yet a complete interaction capture. Some source embeds displayed Access Denied. Captures preserve this; do not reproduce the errors. Logo/icon SVGs and CSS decorations are visible within section screenshots, not all separate files. Individual source images are visual references, not approved Hitech production assets.

The pack does not supply the entire reference's text verbatim. Hitech should use original copy and its own factual evidence. A name replacement across another company's claims would produce an inaccurate corporate site.

## 2. Recommended direction and alternatives

**Recommended: close visual adaptation.** Retain the spacious composition, readable typography, curved section boundaries, photographic treatments and clear employer/candidate paths. Use Hitech's name, brand, original messaging, verified proof and owned imagery. This best matches the brief while creating a credible company website.

**Alternative: more distinct Hitech design.** Keep the information architecture but introduce a different hero and stronger brand-specific compositions. Better differentiation, but farther from the requested reference; revisit only after evaluating the other CEO references.

**Alternative: simpler launch site.** Keep the hero, capabilities, services, process, FAQ and contact journey; defer case studies, insights and integrations. Faster content preparation, but less breadth. Use this only if business evidence and editorial resources are unavailable.

The recommendation is a proposal, not a user-approved design. This phase ends with a concrete plan and evidence pack.

## 3. Proposed homepage, section by section

The following is an original Hitech specification. Headings are draft Hitech copy. Numbers correspond to the gallery crops. Include only services that Hitech confirms it provides.

| Area | Hitech content and purpose | Layout / behavior | Assets and inputs |
|---|---|---|---|
| 01 Header and hero | Main message: **The right IT talent. Ready for what comes next.** Supporting copy: **Build your technology team with Hitech Solutions. Tell us the skills you need, the work ahead, and how you want to hire.** Primary CTA: **Find IT talent**. Secondary: **Explore opportunities**. | White header; logo left, compact navigation, employer CTA. Dark slate hero; centered headline, two offset people images, generous vertical spacing and shallow curved lower edge. Keep copy separate from artwork. | Vector logo, two approved technology-professional photographs. |
| 02 Staffing overview | **People who move your technology forward.** Explain Hitech's actual recruiting method, technical screening and account support. | Desktop text left and large masked photo right; stack on mobile. Use three short proof points below the description. | Recruiting method, delivery geography, screening details; a third photo. Replace unsupported numerical metrics with truthful process facts. |
| 03 Technical specialties | **Find expertise for your next priority.** Proposed groups: software engineering, cloud and infrastructure, data and AI, cybersecurity, enterprise applications, IT support. | Consistent cards with short description and three example roles. Desktop carousel if retaining reference behavior; mobile swipe with visible controls and position indicator. No automatic rotation. | Confirmed specialties and role taxonomy; six custom SVG line icons. |
| 04 Industries | **Technical talent with industry context.** Explain sector experience in one concise paragraph. | Text and a two-column sector list paired with a wide collaboration image. | Actual served sectors. Do not suggest regulated-industry expertise without confirmation. |
| 05 Engagement models | **Build your team on the terms you need.** Proposed cards: contract staffing, contract-to-hire, direct hire. | Three evenly balanced service columns, restrained icons, individual destination links. Stack on small screens. | Confirmed commercial service models. Executive search appears only if Hitech offers it. |
| 06 Hiring process | **A clear path from requirement to onboarding.** Steps: define the need; review a relevant shortlist; coordinate selection and onboarding. | Photo left, three numbered steps right, CTA underneath. Give each step one precise outcome. | Actual recruitment workflow, handoff ownership and onboarding support. |
| 07 Coverage and contact | **Start with a conversation.** Route visitors to a staffing specialist. | Retain a split image/contact section. Use region selection only when there are genuine offices or regional teams. One office does not need a location-search product. | Approved office locations, phone number, service areas and routing rules. |
| 08 Client outcomes | **The work behind the results.** Show two or three verified stories. Structure: business situation → hiring challenge → Hitech's contribution → documented outcome. | Large muted panel. Desktop vertical tabs; mobile accordion or stacked stories. Preserve selected state and keyboard access. | Approved case studies with attribution, permission and measurable evidence. Omit until available rather than invent success stories. |
| 09 Trust | **Confidence built through delivery.** Use real client relationships, certifications or approved testimonials. | Quiet horizontal strip with balanced optical logo sizes. Never reuse another company's awards. | Approved logos and certification assets; expiry dates where relevant. |
| 10 Insights | **Perspectives for technology hiring.** Launch with three useful articles: writing an IT role brief; choosing an engagement model; evaluating technical candidates. | Image, topic, headline and short summary. Real article destination for each card. | Authored articles, editorial owner, three thumbnails initially; six if matching the fuller carousel. |
| 11 FAQs | Address staffing options, specialties, recruitment stages, timing, geographic coverage and how candidates apply. | Single-column disclosure rows with plus/minus indicators, clear focus states and comfortable spacing. | Business-approved answers. Do not promise a fixed placement time unless Hitech can support it. |
| 12 Related services | **Support for the next stage of your team.** Cross-link only real adjacent offerings. | Compact image/text split. If Hitech focuses solely on IT staffing, use this space for candidate support or omit it. | Verified adjacent services or candidate program. |
| 13 Final conversion | **Let's build your next technology team.** Supporting copy: **Share your hiring priorities with Hitech Solutions and take the next step toward the team you need.** | Centered CTA section with generous space; employer button and quieter candidate link. | Contact destination and ownership. |
| 14 Footer | Company, employers, candidates, resources, contact and legal. | Dark background, clear columns, approved social icons and compact legal row. | Legal entity, contact details, privacy content and working destinations. |

## 4. Visual system and responsive specification

Measured reference cues: large headings use a Noto Sans Display Light family declaration at 56px in the desktop sample; card headings are 22px. The reference uses dark slate, teal, white and very pale neutral panels. Use the screenshots for the visual relationship, not just these values.

Proposed starting tokens for Hitech, pending its brand kit:

| Token | Desktop starting value | Mobile behavior |
|---|---|---|
| Content container | 1280px maximum, centered | 20–24px side padding |
| Main heading | 56px / 1.18, light display sans | 36–40px / 1.15 |
| Section heading | 48–56px / 1.2 | 30–36px / 1.2 |
| Body text | 18px / 1.6; hero up to 22px | 16–18px / 1.55 |
| Card heading | 22px / 1.3, semibold | 20–22px |
| Section padding | 80–112px vertically | 48–64px |
| Main text | #151A1E | Same |
| Hero surface | #26333B | Same |
| Teal action color | #0B6E76 | Same; verify contrast in all states |
| Soft surface | #F3F6F6 | Same |
| Light CTA surface | #E2F4F5 | Dark text |
| Buttons | Pill shape; 56–72px height, generous horizontal padding | At least 44px target; full width only where helpful |

These are implementation starting values, not a claim of an exact extracted token set. Resolve actual font files and licenses before matching typography. Use optical comparison to finalize wraps and spacing.

At 1440px: keep hero text within roughly 850px; place portraits outside the central copy column. At 1024px: reduce decoration before shrinking essential text. At 768px and below: stack image/text sections, simplify navigation into a drawer, and keep the hiring CTA easy to find. At 390px: headline and CTA must remain visible without overlapping portraits; decorative images may move below text or be omitted when the reference mobile treatment supports it. Test 320px, 390px, 768px, 1024px, 1440px and 1920px.

Use SVG masks or well-supported CSS for the soft photographic shapes. Avoid baking body copy or CTAs into images. Use small 150–250ms interaction transitions and respect reduced-motion preferences. Avoid scroll-driven spectacle or heavy animation that distracts from reading.

## 5. Image production brief

Prefer commissioned Hitech photography for people presented as employees. Licensed stock or generated imagery can illustrate general work scenarios. Generated people must not be presented as named Hitech employees or client testimonials.

**Shared photographic direction:** natural daylight, believable working environments, modern but ordinary technology, realistic skin and hands, restrained wardrobe, warm human expressions, clean composition. Exclude logos, watermarks, readable personal data, floating holograms, glowing brains, fake certifications and oversized code overlays. Keep crops consistent. Produce masters without text and apply masks in the website.

| ID | Placement / master size | Generation or shoot brief |
|---|---|---|
| H01 | Hero left; 1600 × 1600 | Candid side view of a software professional working at a desk, monitor softly out of focus, natural window light, subject toward the inner edge of frame, neutral office palette, authentic editorial business photography. |
| H02 | Hero right; 1600 × 1600 | Confident senior technology professional in a real workspace, relaxed expression, subtle technology context behind them, waist-up framing, natural skin texture, subject oriented toward the central headline. |
| H03 | Staffing overview; 1600 × 1600 | Experienced recruiter or technology specialist concentrating on work in a bright office, candid posture, laptop present but no legible interface, enough surrounding space for an organic crop. |
| H04 | Industries; 1800 × 1200 | Three professionals reviewing a technical hiring brief around a table, eye-level camera, believable interaction, daylight, simple background, landscape composition. |
| H05 | Process; 1600 × 1600 | Technology professional participating in a recruiter conversation at a desk, warm collaborative tone, portrait crop, screen content defocused. |
| H06 | Coverage/contact; 1600 × 1500 | Professional arriving at a modern workplace, architectural context and natural motion, no identifiable address or unrelated company signage, composition usable beside a contact panel. |
| H07 | Related services; 1600 × 1600 | Two colleagues discussing a document or laptop in a calm office, candid conversation, professional wardrobe, square crop with room around faces. |
| H08–H10 | Initial article thumbnails; 1600 × 960 | Three different scenes: technical interview discussion; collaborative project planning; recruiter reviewing an anonymized role brief. Maintain consistent color grading and photographic style. |
| H11–H13 | Additional article thumbnails; 1600 × 960 | Optional second batch for three more approved articles. Match each image to a real article subject; do not generate before titles are settled. |
| H14–H17 | Navigation thumbnails; 800 × 800 | Optional supporting portraits/work scenes for expanded employer, candidate, resources and company navigation. Reuse suitable crops from approved masters when possible. |

Required launch target: seven section photographs plus three editorial thumbnails, or fewer if unsupported sections are omitted. Additional navigation and article imagery is optional. Logos, UI icons, curves and trust marks should be vector assets, not AI-generated lettering.

For each asset record: owner/source, usage permission, subject description, master file, focal point, alt text, desktop crop, mobile crop and compressed delivery files. Use AVIF/WebP with appropriate fallbacks; explicit dimensions prevent layout shifts. Target a roughly 200KB hero image per crop where quality permits, and roughly 120KB thumbnails. These are budgets to validate, not reasons to accept visible artifacts.

## 6. Video decision

No visible promotional video was established in the captured page. The detected iframes do not establish a video requirement. **Launch recommendation: no video dependency.** Strong photography is sufficient for this design.

Optional phase two: a 45–60 second Hitech introduction, initiated by the visitor below the hero. Suggested sequence: an actual hiring challenge; recruiter explaining how Hitech works; team collaboration; approved client or leader perspective; clear invitation to contact. Use real speakers and evidence, captions, transcript, accessible player and a lightweight poster. Do not autoplay audio. If a decorative 8–12 second loop is later selected, retain a static fallback and disable motion for reduced-motion users. Production needs a script, releases, real office access, edit approval and caption review.

## 7. Conversion flows and content requirements

**Employer journey:** homepage → request talent → confirmation → responsible recruiter/CRM queue. Proposed fields: full name, work email, company, role/skills needed, engagement type, location/work arrangement and optional message. Phone can be optional. Do not make salary and detailed procurement information mandatory before a conversation.

Validation must preserve input on failure and identify the affected field. Cover empty, invalid, submitting, success, rate-limited and server-failure states. Prevent double submission, validate on the server, keep keys private and log delivery failures without exposing message content unnecessarily. A success screen must mean the request was accepted by the backend, not merely that the button was clicked. Set response-time copy only after the business agrees to an SLA.

**Candidate journey:** homepage → existing ATS job board or an approved careers page. Avoid building an ATS for this homepage project. Do not show a sign-in link without a functioning account destination. Resume uploads introduce additional storage and handling requirements; use the existing ATS if available.

**Analytics proposal:** CTA clicks by placement; form start; validated submission; confirmed delivery; candidate outbound clicks. Track conversion quality in aggregate. Do not include emails, phone numbers, CVs or free-text messages in analytics event payloads. Agree on consent behavior with the company's privacy owner.

Content approval matrix:

- Marketing: brand kit, voice, homepage copy and article ownership.
- Recruiting: supported roles, screening, process and service models.
- Sales/account team: lead routing, office contacts and response expectations.
- Leadership: differentiators and approved case-study outcomes.
- Privacy/legal owner: notices, form wording, logo/testimonial permissions.
- IT: domain, hosting, ATS/CRM integration, access ownership and operational contacts.

## 8. Proposed implementation boundaries

No application code is present in this workspace. Proposed structure, adjusted once the stack is approved:

```text
src/app/page.tsx                       homepage composition and metadata
src/app/request-talent/page.tsx        employer inquiry journey
src/app/api/leads/route.ts             validated submission adapter
src/components/site/header.tsx        desktop navigation and mobile drawer
src/components/site/footer.tsx        footer and legal navigation
src/components/home/                  one component per substantial section
src/components/ui/                    button, disclosure, carousel and form controls
src/content/home.ts                   typed Hitech copy and section configuration
src/content/types.ts                  content contracts
src/lib/leads.ts                      integration boundary and delivery result
src/styles/tokens.css                 shared typography, spacing and color values
public/images/home/                   optimized, approved Hitech assets
tests/e2e/home.spec.ts                 navigation and interactive behavior
tests/e2e/request-talent.spec.ts       lead success, validation and failure journeys
tests/visual/home.spec.ts              approved viewport screenshots
```

Content contracts: `ImageAsset` carries src, alt, width, height and focal point; `ServiceCard` carries id, title, description, roles and href; `CaseStudy` carries situation, approach, outcome and approval reference; `LeadInput` carries validated inquiry fields; `LeadResult` is an accepted reference or a typed error. Keep secrets and internal approval records out of public content bundles.

Use a CMS if marketing needs frequent independent editing. Otherwise begin with typed content files and preserve the same data model for later migration. Hosting selection should follow the company's deployment requirements. Do not introduce a CMS, database, search product or chat widget merely because the reference has one.

## 9. Delivery stages and acceptance gates

### Task 1 — Complete the design inputs

- [ ] Approve this visual direction and confirm offered service categories.
- [ ] Obtain logo, brand guidance, contacts, locations, ATS/CRM destinations and approved proof.
- [ ] Record missing evidence and conditionally omit unsupported sections.
- [ ] Complete the reference interaction capture: desktop menu, mobile menu, carousel positions, case-study selections and representative expanded FAQs.
- [ ] Accept when every proposed section has a content owner, intended destination and asset decision.

### Task 2 — Approve the homepage composition

- [ ] Prepare 1440px desktop and 390px mobile designs with actual draft Hitech copy.
- [ ] Resolve fonts, image crops, headline wraps, CTA contrast and section spacing.
- [ ] Compare section by section against the reference images; explicitly record Hitech-specific differences.
- [ ] Accept when the owner approves both viewport designs. No production implementation before this decision.

### Task 3 — Build the responsive page

- [ ] Create the shared tokens and site shell; implement the hero and one representative split section first.
- [ ] Confirm their rendered appearance at desktop and mobile before expanding to the remaining sections.
- [ ] Implement remaining sections from structured content, with semantic headings and accessible controls.
- [ ] Verify no unexpected horizontal overflow at all named widths and no overlap at 200% text zoom.
- [ ] Accept when the complete rendered page matches the approved designs and all links have intended destinations.

### Task 4 — Connect real journeys

- [ ] Implement and test the employer form with server-side validation and the chosen CRM/delivery adapter.
- [ ] Prove valid submission, invalid email, missing required fields, double click, upstream timeout and failure recovery using controlled test fixtures.
- [ ] Connect candidate links to the approved ATS and verify destination behavior.
- [ ] Verify analytics events contain no inquiry content or personal fields.
- [ ] Accept when an authorized internal test lead reaches its intended destination and the UI reports the real result.

### Task 5 — Content and visual QA

- [ ] Audit every claim, contact, logo, image permission, CTA and legal link.
- [ ] Compare screenshots at 1440px and 390px; expand checks to tablet and wide desktop.
- [ ] Exercise keyboard-only navigation, focus return, drawers, disclosures and carousels; check screen-reader names.
- [ ] Test Chrome, Edge, Safari and Firefox using available devices or a documented cross-browser service.
- [ ] Verify heading hierarchy, canonical URL, title/description, social preview, sitemap and robots rules. Preview environments must not be indexed.
- [ ] Accept when no blocking content, accessibility, broken-link or visual issues remain, with deferred items explicitly listed.

### Task 6 — Launch and operate

- [ ] Configure company-owned hosting, domain, TLS, preview/production separation and managed secrets.
- [ ] Set up monitoring for site errors and lead delivery, plus a tested rollback path.
- [ ] Obtain final business sign-off on the concrete preview and deploy using the company's release process.
- [ ] Recheck the public employer and candidate journeys after deployment.
- [ ] Hand over content-editing guidance, asset provenance, integration ownership and incident contacts.
- [ ] Review conversion quality after enough real traffic; prioritize improvements from evidence.

Performance targets: aim for LCP ≤2.5 seconds, INP ≤200ms and CLS ≤0.1 at the 75th percentile in field data. Before launch use lab measurements as a proxy, explicitly labeling them as lab results. Defer below-fold images, reserve image space, load only necessary fonts and avoid unnecessary third-party scripts. Accessibility target: WCAG 2.2 AA with manual interaction review as well as automated checks; a tool score alone does not establish conformance.

### Scope and integration decisions resolved during review

The proposed base build includes the homepage and employer inquiry page/backend. Service, careers, article and legal destinations must be existing approved pages or separately scoped supporting work. If there are no existing article destinations, omit the insights section from the first release or explicitly add article-page templates and three finished articles to scope; never ship dead teaser links. Required privacy information must be available before the inquiry form launches.

Existing-site status remains unknown. Before implementation, establish whether this replaces a current domain/site. For a replacement, inventory current URLs, preserve valuable routes and metadata, and add tested redirects before launch. Do not assume a greenfield deployment merely because the local workspace is empty.

For lead handling, define success as durable acceptance: store a reference and the validated request in an approved reliable delivery queue before returning success. CRM delivery may then happen asynchronously with retries and failure alerts. The confirmation says the inquiry was received, not that a recruiter read it. Track delivered status separately; the internal end-to-end test must prove eventual receipt by the intended team. If the selected platform cannot persist pending requests, use synchronous delivery and show success only after the destination acknowledges acceptance.

## 10. Review focus and risks

1. **Long content:** test long role names, larger text and expanded FAQs; cards and layouts must grow without clipping.
2. **Keyboard and touch:** menus, tabs and carousels must remain operable without hover, preserve focus and announce selected states.
3. **Unavailable integrations:** a failed CRM or ATS must produce an honest recovery path; do not show false success.
4. **Incomplete company evidence:** unpublished case studies, unapproved logos and missing metrics must be omitted rather than fabricated.
5. **Slow connections and failed images:** preserve layout, readable copy and working CTAs while assets load or fail.

These checks belong respectively to Tasks 3/5, 3/5, 4, 1/5 and 3/5. An ambitious homepage still fails if its inquiry journey loses leads or its claims are inaccurate.

## 11. Incorporating the CEO's other references

For each new URL, record the exact admired section, screenshot, purpose, integration cost and whether it improves the visitor's decision. Compare it with the existing Hitech section before adding it. Adopt a feature only if it fills a gap, improves clarity or adds real evidence. Translate all imported ideas into the same typography, spacing, color and interaction rules. Avoid extending the homepage with duplicate introductions, repeated service grids or competing CTAs.

## 12. Next decisions

First approve or correct this close-adaptation direction. Then provide Hitech's existing website/brand kit if available, confirmed service list and job-board destination. The next concrete deliverable should be a desktop/mobile Hitech homepage design with approved draft copy and image selections. Generate assets after those placements are settled; build after design approval. No video needs to hold up this first release.
