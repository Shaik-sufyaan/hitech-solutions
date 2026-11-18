---
name: Hitech Solutions
description: IT staffing for employers and technology professionals, set square-shouldered and quiet, with light reading bands and dark tones held for proof, people and the close.
colors:
  ink: "#14212d"
  ink-muted: "#4b5966"
  navy: "#13212e"
  navy-raised: "#1c2e3e"
  steel: "#1a3550"
  teal: "#0a6474"
  on-navy: "#ffffff"
  on-navy-muted: "#c3ceda"
  on-navy-link: "#b8cdf5"
  on-dark-muted: "#c9d5e1"
  on-teal-muted: "#d2eaee"
  page: "#ffffff"
  paper: "#f3f5f7"
  menu: "#eaf0f6"
  menu-line: "#cfd8e2"
  line: "#d8dee4"
  line-strong: "#b9c3cd"
  action: "#1f4fa8"
  action-hover: "#173d84"
  action-tint: "#e8eef9"
  focus: "#1f4fa8"
  amber: "#f2a33a"
  amber-hover: "#f7bd6b"
  error: "#b42318"
  success: "#17663a"
typography:
  display:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1.55rem + 2.75vw, 3.75rem)"
    fontWeight: 300
    lineHeight: 1.14
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.4rem + 1.55vw, 2.75rem)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.012em"
  card-title:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)"
    fontWeight: 300
    lineHeight: 1.22
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.8rem + 1.4vw, 3rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  title:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.005em"
  lead:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.04rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.15vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  menu-category:
    fontFamily: "Libre Franklin Variable, Libre Franklin, Segoe UI, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.06em"
rounded:
  control: "2px"
  media: "4px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  section: "clamp(4rem, 2.6rem + 4.6vw, 7rem)"
  gutter: "clamp(1.25rem, 0.6rem + 2.8vw, 3rem)"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.on-navy}"
  button-primary-lg:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-navy}"
    rounded: "{rounded.control}"
    padding: "0 32px"
    height: "54px"
  button-inverse:
    backgroundColor: "{colors.page}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-inverse-hover:
    backgroundColor: "{colors.action-tint}"
    textColor: "{colors.navy}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  link-on-dark:
    textColor: "{colors.amber}"
  link-on-dark-hover:
    textColor: "{colors.amber-hover}"
  input:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "48px"
  form-panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.media}"
    padding: "clamp(1.25rem, 0.5rem + 3vw, 2.5rem)"
  step-number:
    backgroundColor: "{colors.page}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    size: "40px"
  specialty-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "24px 0"
  specialty-row-hover:
    textColor: "{colors.action}"
  nav-link:
    textColor: "{colors.ink}"
    height: "76px"
    padding: "0 12px"
  nav-link-over-hero:
    backgroundColor: "transparent"
    textColor: "{colors.on-navy}"
    height: "76px"
  header-scrolled:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy}"
    height: "76px"
  page-hero:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy}"
    typography: "{typography.headline}"
  stat-card:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.figure}"
    rounded: "{rounded.media}"
    padding: "32px"
  story-card:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy}"
    typography: "{typography.card-title}"
    rounded: "{rounded.media}"
    padding: "24px 24px 32px"
  deck-panel-specialties:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  deck-panel-hire:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
  deck-panel-process:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  job-seekers-band:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.on-navy}"
  closing-band:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.on-navy}"
    typography: "{typography.headline}"
  footer:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy-muted}"
    typography: "{typography.body-small}"
  footer-heading:
    textColor: "{colors.amber}"
    typography: "{typography.label}"
  pending:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  pending-sm:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.control}"
    padding: "2px 8px"
  pending-dark:
    textColor: "{colors.on-navy-muted}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
---

# Design System: Hitech Solutions

## At-a-glance revision (2026-11-18)

### Latest local review: reference-led statistics and photography

Latest homepage layout refinement: keep the At-a-glance heading, two stat cards, three percentage rings and provisional-values notice in a left-aligned content column, with the laptop photograph filling the right column on desktop. Remove the meeting photograph from this section. Stack the photograph below the content under 64rem. A compact white Explore Hitech Solutions navigation strip now separates the homepage's navy closing band from its navy footer; it links to How we work, Specialties and FAQ without adding business claims.

Latest navigation/surround refinement: the top header stays white on every page and at every scroll position, with black navigation labels at weight 700 and a white, black-outlined Request talent button. No transparent or navy home-header state remains. The three black stacking panels sit against a white outer background.

The user's latest reference supersedes the open statistics panel described below: use two white icon cards with 8px amber caps and subtle shadows, followed by three blue percentage rings with inline percent signs. Preserve the visible provisional-values notice. Two complementary workplace photographs follow the statistics. Interior pages pair the navy hero copy with a unique rectangular workplace photograph; the form and error pages integrate their own photos into the content instead. Every page has a distinct source photograph, with provenance in `src/content/photography.json` and `src/assets/images/CREDITS.md`.

Header top bar (added 2026-11-18 at the user's request, after an enterprise staffing reference): `UtilityBar.astro` puts a 36px strip in `--color-utility` (the hero navy) above the white navigation row, right-aligned on desktop: Search, the office address and the phone number in 13px on-dark-muted text with amber 16px line icons, a hairline divider before the phone; hover turns an item white with an amber underline. Phones keep the phone (tap to call) left and Search right; the address shows from 48rem. The header is sticky at minus `--utility-height`, so the bar scrolls away and only the navigation row stays pinned (other sticky offsets keep using `--header-height`). Search opens a white panel under the header (a 2px rule under a large light input that turns action blue on focus, then rule-divided result rows with a semibold name, a muted parent-section line and an action arrow); it searches the assistant's page directory in the browser, opens the top match on Enter, moves through results with the arrow keys, closes on Escape or an outside click, and opens from "/" anywhere. The phone number and address in `site.ts` are EXAMPLE values until Hitech supplies real ones.

Added 2026-11-18 at the user's request (from a split "report / success stories" reference): the home hero carries an experience line between the lead and the button ("30+" light figure, 1px amber rule, semibold muted label "years of IT staffing experience"), and the "at a glance" years card reads 30+. After "at a glance" sits `Features.astro`: two full-bleed photo panels (stacked on phones, side by side from 48rem, 2px navy seam), each one link with a navy scrim, a centred light headline and a muted line. With a mouse, a white square-shouldered "Learn more" button rises in on hover or keyboard focus and the photo eases to 1.04 scale (700ms ease-out); on touch screens the button is always shown, and reduced motion drops the movement. Panel photos are registered in `photography.json` (home-feature-talent, home-feature-process).

The user also approved black stacking panels with white/gray copy and orange links, hiring-model headings and process numbers for local review. This overrides the earlier Light Middle Rule for the three deck panels only. Keep the desktop stacking behavior and mobile/reduced-motion flow. These visual revisions remain uncommitted and unpublished pending review.

The revised home statistics section supersedes the stat-card and ring-figure guidance below. Use an open desktop heading/figures split, with two navy headline values in Libre Franklin at weight 400 and 52–76px. Present the three percentages as aligned 44–60px figures in one Cool Paper panel with internal dividers; keep percent signs inline at half size. Stack the figures and dividers on mobile. Do not use ring charts, individual card borders or amber card caps here. Keep the provisional-values disclosure visible below the panel, marked by a small amber left rule. Values remain unverified until Hitech confirms them.

## Overview

**Creative North Star: "The Established Ledger"**

An established staffing firm earns trust through order and deliberate contrast. The home page opens on an animated ink-navy field, then reads through an open run of white and cool-paper bands, including the three-panel stacking deck (paper, white, paper) in the middle. Dark tones arrive later and each has one job: navy client-story cards carry the proof, a steel band speaks to job seekers, one teal band asks for the request, and a navy footer closes. Content stays precisely aligned and mostly rule-divided; the two card families that exist (figures and client stories) are flat and square-shouldered.

The world was pinned by the user: restrained, corporate, reference-structured (the structure of a large staffing site, never its branding), and unmistakably technical. Its binding rejections are part of the system: no glows, blobs, particles, parallax, scroll hijacking, gradient text, glassmorphism or autoplay carousels of content; no bubbly radii; no eyebrow labels above headings; no invented proof. Dark navy, steel and teal deck panels were built and rejected ("dull", "compressed and closed"); the middle of the page stays light. Motion is approved in exactly three places (the hero's GradientASCII field, the partner logo strip, the desktop stacking deck) plus functional feedback for hover, focus, menus and disclosure. Reduced motion stills all three and restores normal section flow.

**The palette and the wordmark are PROVISIONAL.** No brand kit exists. The swap points are `src/styles/tokens.css` (every color, type and shape value) and `src/components/site/Wordmark.astro` (the typographic "Hitech | Solutions" mark, to be replaced by the supplied vector logo). Components reference tokens, so a brand kit lands in those two files. The chat assistant has its own provisional mark in `src/components/site/AssistantMark.astro`: a square-shouldered navy speech tile (4px corners, short squared tail) carrying a drawn "H" with white uprights and an amber crossbar, used as the 40px avatar; its line variant (same bubble and H on the 24px icon grid, 1.75 stroke) is the floating launcher's icon. Colors come from tokens, never hex.

**Key Characteristics:**
- Navy hero, page heroes and footer; a light middle (white and paper, with a paper/white/paper stacking deck); navy story cards, a steel job-seekers band and a teal closing band supply the contrast.
- Light (300) display, section and card headlines against semibold (600) labels and titles: one family, contrast by weight.
- Hairline 1px rules divide lists, rows, columns and FAQ items; cards are limited to figures, client stories and the form.
- Square shoulders: 2px on controls, 4px on photographs and cards, nothing rounder.
- Action blue for actions on light; warm amber for small marks and for links on dark.
- Rectangular, naturally lit, licensed photography with recorded provenance; never masked, never presented as Hitech staff or clients.

## Colors

A controlled corporate palette: ink navy anchors, cool white and paper carry reading, steel and teal give single bands a pulse, action blue means "act here" on light, and warm amber marks small details. All values are provisional pending a brand kit.

### Primary
- **Corporate Action Blue** (action): primary buttons, inline links, arrow links, specialty-row arrows and hovered titles, nav hover underline, list bullets, FAQ disclosure icons and the focus ring on light (focus shares the value). 7.3:1 on white.
- **Pressed Action Blue** (action-hover): hover state of action-blue buttons and links.
- **Action Tint** (action-tint): text selection on light and the hover fill of the white inverse button. Never a section background.

### Secondary
- **Steel** (steel): the home Job seekers band, its only field use.
- **Request Teal** (teal): the closing band on every page (white text 6.6:1) and the arc stroke of the ring figures on light.

### Tertiary
- **Warm Amber** (amber): marks only. The 6px cap on stat cards, the 3px top rule on story-card bodies, the footer's 3px top rule, column headings and link-hover underline, and link/action text inside dark tone scopes (where it becomes the action color). 3.3:1 on request teal, so never used there.
- **Light Amber** (amber-hover): hover state of amber links on dark.

### Neutral
- **Ink Navy Field** (navy): home hero, inner-page heroes, story cards, scrolled header and footer; the wordmark and step-number outlines on light; the overlay that dims a covered deck panel.
- **Raised Navy** (navy-raised): placeholder fill behind photographs on navy.
- **Ink** (ink) / **Muted Ink** (ink-muted): text and secondary text on light (muted 7.2:1 on white).
- **On-Navy White** (on-navy): headline and body text on every dark surface.
- **On-Navy Muted** (on-navy-muted): hero and page-hero support copy, footer text and dark Pending markers (10:1 on navy).
- **On-Dark Muted** (on-dark-muted): secondary text in the dark tone scope (steel band) and on story cards (7:1 or better).
- **On-Teal Muted** (on-teal-muted): secondary text on the closing band (5.4:1 or better).
- **On-Navy Link** (on-navy-link): hovered links over the home hero and page heroes.
- **White Page** (page) / **Cool Paper** (paper): default page and quiet alternating bands. Home: overview, Ways to hire and at a glance on white; Specialties, Process, client stories and FAQ on paper; the request-form panel is paper.
- **Menu Slate** (menu) / **Menu Rule** (menu-line): the desktop mega-menu and mobile submenu surface and its internal dividers.
- **Slate Rule** (line) / **Strong Slate Rule** (line-strong): 1px dividers; the heavier opening rule, input and outline-button borders, dashed Pending borders. Inside the dark tone scope they re-point to white at 14% and 30%.

### Semantic
- **Error Red** (error) and **Confirmation Green** (success): form validation and submission status only.

### Named Rules
**The Action Blue Rule.** On light surfaces, Corporate Action Blue always means "you can act here." Teal and steel fill single structural bands; amber marks details. Neither replaces action blue for controls on light.

**The Tone Scope Rule.** A section goes dark by wrapping it in the dark tone scope (navy by default, steel variant), which re-points ink, muted, rule, page, paper, action and focus tokens. Components are never restyled per band: they read the scope. Inside it, action becomes amber and primary buttons become the white inverse button.

**The Light Middle Rule.** The run between the overview and the client stories, stacking deck included, stays on white and Cool Paper. Contrast comes after it, from story cards, the steel band, the teal close and the footer, never from darkening the deck.

**The Amber Mark Rule.** Amber is a mark, never a field: caps, top rules, headings and links on dark. It never fills a band or a button, and amber text never sits on the request-teal closing band (3.3:1); text there is white or on-teal muted.

## Typography

**Display Font:** Libre Franklin Variable (with Segoe UI, system-ui fallback)
**Body Font:** Libre Franklin Variable
**Label Font:** Libre Franklin Variable

**Character:** A single grotesque used across its weight range. Large type goes light and slightly tight, small type goes semibold: an established, editorial-corporate voice without a second family.

### Hierarchy
- **Display** (300, 38px to 60px fluid, 1.14, -0.022em): the hero statement only; two balanced lines centered on desktop.
- **Headline** (300, 30px to 44px fluid, 1.2, -0.012em): every section heading, on light and dark alike.
- **Figure** (300, 36px to 48px fluid, 1.05, tabular numerals): stat-card values; ring values at 44px.
- **Card title** (300, 22px to 28px fluid, 1.22): client-story headings.
- **Title** (600, 19px to 22px, 1.3): specialty-row names, engagement models, process steps, form legends.
- **Lead** (400, 18px to 20px, 1.55): hero support copy, section introductions, closing body.
- **Body** (400, 16px to 17px, 1.6): running text; prose capped at 38rem.
- **Body small** (400, 15px): specialty-row lines (at 1.5), story summaries, stat labels, role lists on specialty pages, footer.
- **Label** (600, 14px, sentence case): in-context list labels, footer column headings, field hints, the Pending tag.
- **Menu category** (600, 12px, 0.06em tracking, uppercase): the partner-strip label and navigation-menu column headings only.

### Named Rules
**The Light-Over-Semibold Rule.** Headings above 24px are light (300), including figures and card titles; anything that labels or names is semibold (600). Bold (700) belongs to the provisional wordmark only.

**The Sentence-Case Rule.** Headings, labels and buttons are sentence case, and no eyebrow or kicker line sits above a heading. The one uppercase register is the 12px tracked category label inside navigation menus and the partner strip.

## Layout

A 1280px container (80rem) with a fluid gutter (20px to 48px). Sections breathe on a fluid block padding of 64px to 112px. Spacing runs on a 4px base (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80).

Sections use asymmetric desktop splits (fractions such as 6/5, 5/6 and 4/8, with a 48px to 96px gap) and stack to one column below 64rem. Card sets go one-up, two-up from 40rem and three-up from 64rem; ring figures go three-up from 40rem. Rule-divided rows (specialties) go one column, two from 48rem and three from 64rem.

The home band sequence is fixed: navy hero, white partner strip, white overview, the light stacking deck (paper Specialties, white Ways to hire, paper Process), white "at a glance", paper client stories (navy cards), steel job seekers, paper FAQ, teal closing band, navy footer. Inner pages open on a navy page hero, run the light system and end on the same teal closing band and footer.

**The stacking deck.** At 64rem and up with motion allowed, each deck panel is `position: sticky` on native scroll, at least one viewport tall minus the header, content centered. A panel taller than the viewport scrolls fully before pinning (its sticky top is the lesser of the header height and viewport-minus-panel height), so nothing is hidden. Panels are opaque, filled with their own band color. The covered panel dims through a navy overlay up to 0.14 opacity in proportion to how far the next panel has slid over it; the incoming panel casts the soft upward deck shadow (Elevation). Below 64rem and under reduced motion the deck is three ordinary sections.

Breakpoints: 30rem (header CTA hides below), 40rem (form rows and card sets two-up), 48rem (tablet: hero actions inline, partner label centered, specialty rows two-up), 64rem (desktop nav, splits, three-up, stacking deck), 75rem (hero switches to the centered statement framed by two edge-bleeding photographs). Header is sticky, 76px tall (64px below 48rem).

**The Rule-Not-Box Rule.** Group peers with a strong 1px top rule and 1px dividers. Cards exist only for figures, client stories and the request form.

## Elevation & Depth

Flat at rest. Depth comes from tonal banding, the stacking deck's physical overlap and hairline rules. Three authored shadows exist, each tied to one job; nothing lifts on hover.

### Shadow Vocabulary
- **Menu** (`box-shadow: 0 12px 28px -8px rgb(19 33 46 / 0.22), 0 2px 6px rgb(19 33 46 / 0.08)`): desktop mega-menu and mobile menu drawer.
- **Deck overlap** (`box-shadow: 0 -16px 36px -14px rgb(19 33 46 / 0.22)`, clipped by `clip-path: inset(-96px 0 -2px 0)`): each incoming deck panel casts a soft navy shadow upward onto the one it covers, never down onto the next section. The last panel paints a 2px fill of its own band color below its edge so covered panels never peek through the seam.
- **Over-hero legibility** (`text-shadow: 0 1px 2px rgb(10 18 26 / 0.9), 0 0 12px rgb(10 18 26 / 0.75)`): header text only while the bar is transparent over the moving hero field; removed once the header turns solid.

### Named Rules
**The One Job Shadow Rule.** A shadow is allowed only where something physically overlaps (a menu over the page, a panel over a panel) or where text must read over motion. Cards, buttons and photographs never cast shadows, at rest or on hover.

## Shapes

Square-shouldered. Controls (buttons, inputs, step numbers, FAQ icon boxes, Pending markers, focus ring) take a 2px corner; photographs, stat cards, story cards and the form panel take 4px. Nothing is pill-shaped; the only circles are the ring-figure tracks and the 3px dots between partner logos. Photographs are plain rectangles at fixed aspect ratios (16:9, 5:2, 5:4, 4:5, 4:3, 1:1) with object-fit cover; on the desktop hero they bleed partly off the left and right edges. Icons are an authored line set on a 24px grid, 1.75 stroke, round caps.

## Components

### Buttons
Crisp, solid, unadorned.
- **Shape:** 2px corner, 48px tall (54px large), semibold 16px (17px large), no icon by default.
- **Primary:** action blue fill, white text; the default on light. Inside a dark tone scope it renders as the inverse button.
- **Inverse:** white fill, navy text; hero CTA, closing CTA and every primary inside dark bands. Hover shifts to Action Tint.
- **Outline:** transparent with a Strong Slate Rule border, ink text; hover darkens the border to ink. On dark it reads the scope's white-30% rule.
- **Hover / Focus:** color change only (150ms ease-out), never lift or scale; 2px focus ring offset 3px, white on dark.
- **Arrow link:** semibold action text with a 16px arrow that nudges 3px right on hover (amber on dark).

### Inputs / Fields
- **Style:** white field, 1px Strong Slate Rule border, 2px corner, 48px min height, 12px by 16px padding; labels semibold 15px above, hints 14px muted.
- **Focus:** border and 2px outline turn action blue.
- **Error:** border goes Error Red; message 14px medium red beneath; an error summary heads the form.

### Cards / Containers
- **Stat card:** white, 1px Slate Rule border, 6px amber top cap, 4px corner, 32px padding; a light figure over a 15px muted label. A missing figure shows the word "Pending" in the figure slot.
- **Ring figure:** 160px ring, 8px Slate Rule track, request-teal arc drawn only when a real value exists; the value centered in light 44px, or "Pending" when empty; a medium-weight label beneath. Rings sit three-up under a 1px rule.
- **Story card:** navy, 4px corner with the photograph clipped flush at 4:3, then a 3px amber top rule on the body, a light card title, a 15px on-dark-muted summary and a small dark Pending tag pinned to the card foot.
- **Form panel:** Cool Paper, 1px Slate Rule border, 4px corner, fluid 20px to 40px padding.

### Specialty Row
The home Specialties list: six whole-row links under a Strong Slate Rule top rule, each divided by a 1px Slate Rule. A row holds a semibold title over one 15px muted line, with an action-blue 24px arrow at the right; 24px block padding, no box. Hover turns the title action blue and nudges the arrow 4px right. Rows run one, two (48rem) and three (64rem) columns. Example roles live on the specialty pages, never in these rows.

### Navigation
- **Desktop (inner pages):** white sticky header with a 1px bottom rule; wordmark left, medium-weight text links and menu triggers, primary "Request talent" button right. Hover turns the link blue and draws a 2px underline from the left at the header's bottom edge (220ms). Triggers open a Menu Slate mega-menu with an intro column and link columns divided by Menu Rule.
- **Home, over the hero:** the header is transparent with light text over the animated field (legibility text-shadow plus a navy shade behind the nav row); it turns solid navy once scrolled or whenever a menu is open. The header CTA becomes a white outline button over the hero and fills white on hover.
- **Mobile:** menu/close toggle opens a full-height drawer of 18px links divided by rules, ending in a full-width large button; Escape closes and returns focus.
- **Footer:** navy with a 3px amber top rule; wordmark and supporting line, then four columns (Employers, Job seekers, Company, Contact) with amber semibold 14px headings; links on-navy muted, hovering to white with an amber underline; Contact holds a small dark Pending marker until real details exist; a legal line above a white 12%-opacity rule.

### Page Hero
Inner pages open on a navy band: breadcrumbs, a light headline, on-navy muted lead, optional actions, and any page-level Pending marker in its dark form.

### Numbered Steps
A 40px outlined square (2px corner) on white holding a tabular semibold navy numeral with a navy outline, linked to the next step by a 1px Strong Slate vertical rule.

### FAQ Disclosure
Native details/summary rows between rules; semibold 17px question, 32px outlined icon box with an action plus/minus at the right; hover turns the question to the action color.

### Hero Field
The home hero runs a WebGL2 GradientASCII field (horizon shape, 18px cells, glyph ramp ` =+xX0S8#@`, blue-to-sky colors local to this component) behind navy scrims that keep the copy legible: a vertical scrim on small screens, a centered elliptical scrim at 75rem and up. It is aria-hidden, pauses off-screen and when the tab is hidden, renders nothing without WebGL2, and drops flicker, pointer and click response under reduced motion. Its colors are not palette tokens and never leave the hero.

### Partner Strip
A white band with a bottom rule directly under the hero: a three-line semibold uppercase label (centered lines from 48rem) and a continuously scrolling row of full-color 28px partner logos, 64px apart with a 3px Strong Slate dot between them, edge fades at 4%, pausing on hover. Reduced motion stops the loop.

### Pending Marker
The visible vocabulary for missing business input, in three forms:
- **Note box:** inline 14px box, 1px dashed Strong Slate Rule border, 2px corner, 8px by 12px padding, a semibold ink "Pending" tag followed by a muted description. The small size (12px, 2px by 8px padding) fits card feet and footer columns. The light form reads whatever tone scope it sits in (on the steel band it turns white-on-steel with a white-30% dash); the explicit dark form, for navy surfaces outside a scope (page heroes, story cards, footer), uses a white-30% dashed border, on-navy muted text and a white tag.
- **Card-foot tag:** the small dark note box pinned to the bottom of a story card, after the copy it qualifies.
- **Figure slot:** the word "Pending" (semibold 18px, muted) in place of a number in stat cards and ring figures, with no arc drawn.
It renders in preview so reviewers see every gap. Launch requires zero instances.

## Do's and Don'ts

### Do:
- **Do** change palette and wordmark only in `src/styles/tokens.css` and `src/components/site/Wordmark.astro`; both are provisional until a brand kit arrives.
- **Do** make a band dark by wrapping it in the dark tone scope (navy, or the steel variant) and let components read the re-pointed tokens.
- **Do** keep the stacking deck and the reading bands around it on white and Cool Paper; carry contrast with story cards, the steel band, the teal close and the footer.
- **Do** keep action blue for actions on light; on dark, use amber links and the white inverse button.
- **Do** use amber only as marks: 6px stat caps, 3px top rules, footer headings and links on dark.
- **Do** separate peers with 1px Slate Rule dividers and a Strong Slate Rule top rule; keep cards to figures, stories and the form.
- **Do** set headings above 24px light (300) and labels semibold (600), in sentence case.
- **Do** keep corners at 2px for controls and 4px for photographs and cards.
- **Do** use rectangular, licensed, naturally lit photographs with provenance recorded in `src/assets/images/CREDITS.md` and embedded in the file.
- **Do** keep the hero field, partner strip and stacking deck on native scrolling, and still them under reduced motion.
- **Do** show missing business input with a Pending note box, card-foot tag or "Pending" figure slot rather than inventing content.

### Don't:
- **Don't** add glows, blobs, particles, floating circles, gradient text, glassmorphism or decorative gradients; navy legibility scrims over the hero field are the only gradients.
- **Don't** add parallax, scroll hijacking, animated counters or motion beyond the hero field, partner strip and stacking deck.
- **Don't** turn the deck panels dark (navy, steel or teal); that version was built and rejected as dull and closed.
- **Don't** put amber text on the request-teal closing band, or use amber as a fill.
- **Don't** round anything beyond 4px or mask photographs into shapes.
- **Don't** make a card grid the default container for a section.
- **Don't** lift, scale or shadow elements on hover.
- **Don't** add eyebrow or kicker labels above headings.
- **Don't** present stock people as Hitech staff or clients, or invent metrics, logos, client stories, certifications or testimonials.
