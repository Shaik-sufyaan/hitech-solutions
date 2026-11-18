---
name: Hitech Solutions
description: IT staffing for employers and technology professionals, set square-shouldered and quiet.
colors:
  ink: "#14212d"
  ink-muted: "#4b5966"
  navy: "#13212e"
  navy-raised: "#1c2e3e"
  on-navy: "#ffffff"
  on-navy-muted: "#c3ceda"
  on-navy-link: "#b8cdf5"
  page: "#ffffff"
  paper: "#f3f5f7"
  line: "#d8dee4"
  line-strong: "#b9c3cd"
  action: "#1f4fa8"
  action-hover: "#173d84"
  action-tint: "#e8eef9"
  focus: "#1f4fa8"
  steel: "#1a3550"
  teal: "#0a6474"
  teal-deep: "#0b4a56"
  on-dark-muted: "#c9d5e1"
  on-teal-muted: "#d2eaee"
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
  nav-link:
    textColor: "{colors.ink}"
    height: "76px"
    padding: "0 12px"
  pending:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
---

# Design System: Hitech Solutions

## Overview

**Creative North Star: "The Established Ledger"**

An established staffing firm earns trust through order and deliberate contrast. An ink-navy hero opens the page; white and cool-paper sections handle long-form reading; navy, steel and teal middle bands create a clear narrative rhythm; and a richer navy footer closes the experience. Content remains precisely aligned and mostly rule-divided rather than boxed. On desktop, three approved dark panels use native sticky positioning to form a stacking deck; mobile and reduced-motion experiences remain ordinary document flow.

The world was pinned by the user: restrained, corporate, reference-structured (the structure of a large staffing site, never its branding). Its binding rejections are part of the system: no gradients, glassmorphism, glows, blobs, particles, parallax, scroll hijacking or carousels; no bubbly radii; no card grid as the default container. Motion is functional, with the explicitly approved hero treatment, partner strip and desktop stacking deck added to hover, focus, menu and disclosure behavior. Reduced motion removes nonessential animation and restores normal section flow.

**The palette and the wordmark are PROVISIONAL.** No brand kit exists. The only swap points are `src/styles/tokens.css` (every color, type and shape value) and `src/components/site/Wordmark.astro` (the typographic "Hitech | Solutions" mark, to be replaced by the supplied vector logo). Components reference tokens only, so a brand kit lands in those two files.

**Key Characteristics:**
- Navy hero and footer, a teal closing band, and a navy/steel/teal stacking deck between white and paper sections.
- Light (300) display and section headlines against semibold (600) labels and titles: one family, contrast by weight.
- Hairline 1px rules divide lists, columns and FAQ items; containers are rare.
- Square shoulders: 2px on controls, 4px on photographs, nothing rounder.
- Action blue remains exclusive to controls and links; warm amber is a small informational accent on card caps, stat details and footer headings.
- Rectangular, naturally lit, licensed photography; never masked, never presented as Hitech staff.

## Colors

A controlled corporate palette: deep ink-navy, steel and teal establish section rhythm; action blue remains dedicated to interaction; cool neutrals support reading; warm amber is reserved for small accents. All values remain provisional pending a brand kit.

### Primary
- **Corporate Action Blue** (action): every primary button, inline link, the nav hover underline, list bullets, FAQ disclosure icons and the focus ring (focus shares the value). 7.3:1 on white.
- **Pressed Action Blue** (action-hover): hover state of action-blue buttons and links.
- **Action Tint** (action-tint): text selection and the hover fill of the white inverse button on navy. Never a section background.

### Secondary and accent
- **Steel** (steel): the second panel of the desktop stacking deck.
- **Teal / Deep Teal** (teal, teal-deep): the closing call-to-action band and third stacking panel.
- **Warm Amber** (amber, amber-hover): narrow stat-card caps, selected dark-surface details and footer headings. Never use amber as a large background.

### Neutral
- **Ink Navy Field** (navy): hero, closing band and footer background; also the wordmark, step-number outlines and toggle icon on light.
- **Raised Navy** (navy-raised): placeholder fill behind photographs on navy.
- **Ink** (ink): body text and headlines on light surfaces.
- **Muted Ink** (ink-muted): secondary text, descriptions, optional-field markers (7.2:1 on white).
- **White Page** (page): the default page, header and input background.
- **Cool Paper** (paper): alternating quiet section bands (specialties, process, FAQ) and the request-form panel.
- **Slate Rule** (line): 1px dividers between list items, columns and header bottom.
- **Strong Slate Rule** (line-strong): the heavier top rule that opens a list, input borders, outline-button borders, dashed Pending borders.
- **On-Navy White / Muted / Link** (on-navy, on-navy-muted, on-navy-link): headline, body (10:1) and hovered-link text on the navy field. Focus rings on navy turn white.

### Semantic
- **Error Red** (error) and **Confirmation Green** (success): form validation and submission status only.

### Named Rules
**The Action Blue Rule.** Corporate Action Blue always means "you can act here." Teal may fill approved structural bands, while amber is a small noninteractive accent; neither replaces action blue for primary controls.

**The Controlled Dark-Band Rule.** Dark fields are limited to the hero, three-panel stacking deck, teal closing band and footer. Reading-heavy sections remain white or Cool Paper.

## Typography

**Display Font:** Libre Franklin Variable (with Segoe UI, system-ui fallback)
**Body Font:** Libre Franklin Variable
**Label Font:** Libre Franklin Variable

**Character:** A single grotesque used across its weight range. Large type goes light and slightly tight, small type goes semibold, which gives an established, editorial-corporate voice without a second family.

### Hierarchy
- **Display** (300, 38px to 60px fluid, 1.14, -0.022em): the hero statement only; two balanced lines centered on desktop.
- **Headline** (300, 30px to 44px fluid, 1.2, -0.012em): every section heading.
- **Title** (600, 19px to 22px, 1.3): specialty names, engagement models, process steps, form legends.
- **Lead** (400, 18px to 20px, 1.55): hero support copy and section introductions.
- **Body** (400, 16px to 17px, 1.6): running text; prose capped at 38rem, descriptions at 30 to 36rem.
- **Body small** (400, 15px): candidate lines, role lists, footer.
- **Label** (600, 14px, sentence case): in-context list labels ("Example roles", "Suited to"), footer column headings, field hints, Pending tag.

### Named Rules
**The Light-Over-Semibold Rule.** Headings above 24px are light (300); anything that labels or names is semibold (600). Bold (700) belongs to the provisional wordmark only.

**The Sentence-Case Rule.** No uppercase tracking labels and no eyebrow line above headlines. Labels sit inside the content they name.

## Layout

A 1280px container (80rem) with a fluid gutter (20px to 48px). Sections breathe on a fluid block padding of 64px to 112px. Spacing runs on a 4px base (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80).

Sections use asymmetric desktop splits (5/7, 6/5, 7/5, 4/7 fractions with a 48px to 96px gap) and stack to a single column below 64rem. Lists of peers remain rule-divided rather than boxed. The home-page Specialties, Ways to hire and How hiring works panels use CSS `position: sticky` on desktop with native scrolling; they revert to normal sections below 64rem and when reduced motion is requested.

Breakpoints: 30rem (header CTA hides below), 40rem (form field rows go two-up), 48rem (tablet: hero actions go inline, specialties two-up), 64rem (desktop nav, splits, three-up lists), 75rem (hero switches to the centered statement framed by two edge-bleeding photographs). Header is sticky, 76px tall (64px below 48rem).

**The Rule-Not-Box Rule.** Group content with a strong 1px top rule and 1px dividers between items. A card or panel is the exception, reserved for the form.

## Elevation & Depth

Primarily flat. Depth comes from tonal banding and hairline rules. Shadows are limited to the open mobile menu and the upward overlap edge between approved stacking panels.

### Shadow Vocabulary
- **Menu** (`box-shadow: 0 12px 28px -8px rgb(19 33 46 / 0.22), 0 2px 6px rgb(19 33 46 / 0.08)`): the mobile menu drawer only.

### Named Rules
**The Flat Page Rule.** Surfaces never lift on hover and never cast shadows at rest. If something must separate, use a rule or a band.

## Shapes

Square-shouldered. Controls (buttons, inputs, step numbers, FAQ icon boxes, Pending marker, focus ring) take a 2px corner; photographs and the form panel take 4px. Nothing is pill-shaped or circular. Photographs are plain rectangles at fixed aspect ratios (16:9, 5:2, 5:4, 4:5, 4:3, 1:1) with object-fit cover; on the desktop hero they bleed partly off the left and right edges. Icons are an authored line set on a 24px grid, 1.75 stroke, round caps.

## Components

### Buttons
Crisp, solid, unadorned.
- **Shape:** 2px corner, 48px tall (54px large), semibold 16px (17px large), no icon by default.
- **Primary:** action blue fill, white text, 24px side padding; the default on light surfaces.
- **Inverse:** white fill, navy text; the only button on the navy field. Hover shifts to Action Tint.
- **Outline:** transparent with Strong Slate Rule border, ink text; hover darkens the border to ink.
- **Hover / Focus:** color change only (150ms ease-out), never lift or scale; 2px focus ring offset 3px, white on navy.
- **Arrow link:** semibold action-blue text with a 16px arrow that nudges 3px right on hover; the default secondary action ("See how the process works").

### Inputs / Fields
- **Style:** white field, 1px Strong Slate Rule border, 2px corner, 48px min height, 12px by 16px padding; labels semibold 15px above, hints 14px muted.
- **Focus:** border and 2px outline turn action blue.
- **Error:** border goes Error Red; message 14px medium red beneath; an error summary box with red border heads the form. Status boxes use a 1px border colored by outcome.

### Cards / Containers
- **Form panel:** the one container: Cool Paper, 1px Slate Rule border, 4px corner, fluid 20px to 40px padding.
- Everything else is rule-divided, not carded.

### Navigation
- **Desktop:** white sticky header with a 1px bottom rule; wordmark left, five medium-weight 15.5px text links, primary "Request talent" button right. Hover turns the link blue and draws a 2px blue underline from the left at the header's bottom edge (220ms).
- **Mobile:** menu/close icon toggle opens a full-height white drawer of 18px links divided by rules, ending in a full-width large primary button; Escape closes and returns focus.
- **Footer:** rich navy, wordmark and supporting line, link and contact columns, amber headings, reserved Pending areas for locations/social links, and a legal line above a white 12%-opacity rule.

### Numbered Steps
Sequence carries meaning: a 40px navy-outlined square (2px corner) holding a tabular semibold numeral, linked to the next step by a 1px vertical rule. A 28px variant lists next steps on the request page.

### FAQ Disclosure
Native details/summary rows between rules; semibold 17px question, 32px outlined icon box with a blue plus/minus at the right; hover turns the question blue.

### Pending Marker
The visible marker for missing business input: an inline 14px box with a dashed Strong Slate Rule border, 2px corner, a semibold "Pending" tag followed by a muted description (dark variant for navy). It renders in preview so reviewers see every gap. Launch requires zero instances.

## Do's and Don'ts

### Do:
- **Do** change palette and wordmark only in `src/styles/tokens.css` and `src/components/site/Wordmark.astro`; both are provisional until a brand kit arrives.
- **Do** keep Corporate Action Blue exclusive to actions, links and focus; use teal for approved dark bands and amber only for small accents.
- **Do** separate content with 1px Slate Rule dividers and a Strong Slate Rule top rule.
- **Do** set section headings light (300) and labels semibold (600), in sentence case.
- **Do** keep corners at 2px for controls and 4px for photographs and the form panel.
- **Do** use rectangular, licensed, naturally lit photographs with provenance recorded in `src/assets/images/CREDITS.md` and embedded in the file.
- **Do** keep the approved hero, partner strip and desktop stacking deck on native scrolling, and restore ordinary static flow under reduced motion.
- **Do** show missing business input with the Pending marker rather than inventing content.

### Don't:
- **Don't** add animated counters, parallax, scroll hijacking, autoplay carousels or hero video beyond the specifically approved motion treatments.
- **Don't** use decorative gradients, glassmorphism, neon glows, floating circles, blobs or particles.
- **Don't** round containers beyond 4px or mask photographs into shapes.
- **Don't** make a card grid the default container for a section.
- **Don't** lift, scale or shadow elements on hover.
- **Don't** add uppercase eyebrow or kicker labels above headings.
- **Don't** present generic stock people as Hitech staff or clients, or invent metrics, logos, certifications or testimonials.
