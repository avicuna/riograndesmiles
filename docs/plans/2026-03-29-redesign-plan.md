# Rio Grande Smiles Redesign — Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan. Steps use checkbox syntax for tracking.

**Goal:** Rebuild riograndesmiles.com as a modern, multi-page, bilingual dental practice website with Weave scheduling integration and Google Maps.

**Architecture:** Astro static site with React island components for interactive elements (scheduler, map, carousel, FAQ accordion, language toggle, mobile CTA bar). Tailwind CSS for styling with custom design tokens. Content collections for service pages. File-based i18n with `/es/` prefix routing. Netlify deployment with staging/production environments and feature-flag-gated scheduling widget.

**Tech Stack:** Astro 4+, React 18, Tailwind CSS 3, TypeScript, i18next, Netlify

**Spec:** `docs/specs/2026-03-29-redesign-spec.md`

---

## Phase 1: Project Foundation (Tasks 1–4)

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `netlify.toml`
- Create: `.nvmrc`
- Move: `public/img/` (existing images)
- Move: `public/favicon.ico`
- Move: `public/robots.txt`
- Move: `public/CNAME`

**What to build:**
Initialize Astro project with React and Tailwind integrations. Move existing static assets into `public/`. Configure Netlify with environment variable contexts for staging vs production.

Key Astro config:
```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  site: 'https://riograndesmiles.com',
});
```

Key Netlify config:
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[context.production.environment]
  PUBLIC_ENABLE_SCHEDULING = "false"

[context.deploy-preview.environment]
  PUBLIC_ENABLE_SCHEDULING = "true"

[context.branch-deploy.environment]
  PUBLIC_ENABLE_SCHEDULING = "true"
```

Tailwind design tokens from the spec:
```js
// tailwind.config.mjs — extend theme with:
colors: {
  primary: {
    50: '#f0f9ff', 100: '#e0f2fe',
    500: '#0ea5e9', 600: '#0284c7',
    700: '#0369a1', 900: '#0c4a6e',
  },
  neutral: {
    50: '#fafafa', 100: '#f5f5f5',
    200: '#e5e5e5', 400: '#a3a3a3',
    700: '#404040', 900: '#171717',
  },
  teal: '#14b8a6',
}
fontFamily: {
  display: ['Playfair Display', 'serif'],
  sans: ['Inter', '-apple-system', 'sans-serif'],
}
```

Global CSS: import Inter and Playfair Display from Google Fonts, Tailwind base/components/utilities layers.

**Verify:**
```bash
npm run dev
# Opens localhost — should show blank Astro welcome page
npm run build
# Builds successfully to dist/
```

**Commit:** `chore: scaffold Astro project with React, Tailwind, and Netlify config`

---

### Task 2: i18n System

**Files:**
- Create: `src/i18n/en.json`
- Create: `src/i18n/es.json`
- Create: `src/i18n/utils.ts`

**What to build:**
Extract all EN and ES translations from the current `scripts.js` into structured JSON files. Create a utility module that provides `t(key)` translation lookup and `getLocaleFromUrl(url)` detection.

```ts
// src/i18n/utils.ts
export type Locale = 'en' | 'es';
export const defaultLocale: Locale = 'en';

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  return locale === 'es' ? 'es' : 'en';
}

export function useTranslations(locale: Locale) {
  const translations = locale === 'es' ? es : en;
  return function t(key: string): string {
    // Dot-notation lookup: "services.extractions.title"
    return key.split('.').reduce((obj, k) => obj?.[k], translations) ?? key;
  };
}
```

The JSON files should mirror the existing `resources.en.translation` / `resources.es.translation` structure from `scripts.js` (330 lines of translations already exist — extract verbatim).

**Verify:**
```ts
// Quick smoke test in a scratch .astro page:
const t = useTranslations('es');
console.log(t('services.extractions.title')); // "Extracciones"
```

**Commit:** `feat: add bilingual i18n system with EN/ES translations`

---

### Task 3: Base Layout + Nav + Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/MobileCtaBar.tsx` (React island)

**What to build:**

**BaseLayout.astro** — shared HTML shell for all pages:
- `<head>`: charset, viewport, Google Fonts preconnect, global CSS, configurable `<title>` and `<meta description>` via props, Open Graph / Twitter card meta, Schema.org structured data (Dentist type — port from current `index.html`), hreflang links for EN/ES alternate, canonical URL
- `<body>`: `<Nav />`, `<slot />` (page content), `<Footer />`, `<MobileCtaBar client:media="(max-width: 768px)" />`
- Accept props: `title`, `description`, `locale`, `canonicalPath`

**Nav.astro** — sticky navigation bar:
- Logo ("Rio Grande Smiles" in Playfair Display) linking to home
- Links: Services, About, Reviews, Insurance, Contact
- Phone number with phone icon (click-to-call `tel:` link)
- "Book Online" primary button (links to scheduling section or tel: link depending on context)
- Language toggle link (EN page links to `/es/` equivalent and vice versa)
- Responsive: on mobile, hide nav links (hamburger menu is a future enhancement — for now phone + Book button remain visible)

**Footer.astro** — 4-column grid:
- Brand + description column
- Services links column
- Patients links column (New Patient Info, Insurance, Affordable Care, Forms, FAQ)
- Contact column (phone, email, address)
- Bottom bar: copyright + Español toggle
- All links bilingual via `t()` function

**MobileCtaBar.tsx** — React island, sticky bottom bar on mobile:
- Two buttons side by side: "Call" (tel: link) + "Book Online"
- Appears only below 768px (controlled by `client:media`)
- Sits above page content with white background + top shadow

Reference the mockup (`docs/specs/mockup.html`) for exact visual structure and spacing.

**Verify:**
```bash
npm run dev
# Create a minimal src/pages/index.astro that uses BaseLayout
# Verify: sticky nav renders, footer renders, mobile bar appears on narrow viewport
# Verify: all links are functional (tel:, mailto:, language toggle)
```

**Commit:** `feat: add BaseLayout, Nav, Footer, and MobileCtaBar components`

---

### Task 4: Homepage — Static Sections

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/es/index.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/TrustBar.astro`
- Create: `src/components/InsuranceGrid.astro`
- Create: `src/components/DoctorProfile.astro`
- Create: `src/components/JourneySteps.astro`
- Create: `src/components/AffordableCareCallout.astro`
- Create: `src/components/FinalCta.astro`

**What to build:**
All the non-interactive homepage sections. These are pure Astro components (no client JS).

Follow the homepage scroll order from the spec:
1. Hero — benefit headline + dual CTA (Book + Call) + skyline background with overlay
2. TrustBar — "Medicaid Welcome", "Se Habla Español", "20+ Years", "ADA Member"
3. InsuranceGrid — 9 provider cards with logos and names (3-col grid → 2-col → 1-col responsive)
4. Services overview — 6 card grid (link to individual pages, placeholder hrefs for now)
5. DoctorProfile — headshot (existing `img/doctor-headshot.png`) + bio + credential badges
6. JourneySteps — 3-step "Book → Prepare → Smile" visual
7. AffordableCareCallout — blue gradient band, "Everyone Deserves a Healthy Smile"
8. FinalCta — repeat booking CTA

The Spanish homepage (`/es/index.astro`) imports the same components but passes `locale="es"`.

Each component accepts a `locale` prop and uses `useTranslations(locale)` for all text.

**Verify:**
```bash
npm run dev
# Navigate to localhost:4321 — full homepage renders
# Navigate to localhost:4321/es/ — Spanish version renders
# Resize to mobile — responsive layout works
# Images load from /img/ directory
```

**Commit:** `feat: build homepage with all static sections`

---

## Phase 2: Interactive Islands (Tasks 5–7)

### Task 5: Google Maps Component

**Files:**
- Create: `src/components/GoogleMap.tsx`
- Modify: `src/pages/index.astro` (add map + hours section)

**What to build:**
React island that embeds Google Maps using the free Embed API (no API key billing). Lazy-loaded — only hydrates when scrolled into viewport.

```tsx
// GoogleMap.tsx
export default function GoogleMap() {
  const src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.5!2d-106.7234!3d35.1095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3200+Coors+Blvd+NW+Suite+F%2C+Albuquerque%2C+NM+87120!5e0!3m2!1sen!2sus";
  return (
    <iframe
      src={src}
      className="w-full h-full min-h-[380px] border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Rio Grande Smiles location"
    />
  );
}
```

Compose on the homepage as a side-by-side layout: map on left, hours card on right. Hours card is an Astro component (static) — create `src/components/HoursCard.astro`.

Use `client:visible` directive so the iframe only loads when scrolled into view.

**Verify:**
```bash
npm run dev
# Scroll to map section — map loads and is interactive
# Click address — opens Google Maps
# Responsive: stacks vertically on mobile
```

**Commit:** `feat: add Google Maps embed with lazy loading`

---

### Task 6: FAQ Accordion + Review Carousel

**Files:**
- Create: `src/components/FAQAccordion.tsx`
- Create: `src/components/ReviewCarousel.tsx`

**What to build:**

**FAQAccordion.tsx** — React island for collapsible FAQ sections:
- Accepts `items: Array<{ question: string; answer: string }>` prop
- Accordion behavior: click to expand/collapse, only one open at a time
- Arrow rotation animation on toggle
- Accessible: `aria-expanded`, `aria-controls`, keyboard navigation (Enter/Space)

**ReviewCarousel.tsx** — React island for patient reviews:
- Accepts `reviews: Array<{ text: string; author: string }>` prop
- Auto-rotate every 8 seconds, pause on hover/focus
- Prev/next navigation buttons with arrow icons
- Dot indicators showing current slide
- Star rating display (static 5 stars for now)
- Accessible: `aria-label` on buttons, `aria-live="polite"` on review region

Both are used on the homepage and also on dedicated pages (FAQ page, Reviews page). Accept locale-independent data — the parent Astro page handles translation and passes the content.

**Verify:**
```bash
npm run dev
# FAQ: click questions to expand/collapse, keyboard navigable
# Reviews: auto-rotates, prev/next buttons work, dots update
# Resize to mobile — both work on small screens
```

**Commit:** `feat: add FAQ accordion and review carousel islands`

---

### Task 7: Weave Scheduling Widget + Feature Flag

**Files:**
- Create: `src/components/WeaveScheduler.tsx`
- Create: `src/components/BookingSection.astro`
- Create: `src/components/BookingFallback.astro`

**What to build:**

**WeaveScheduler.tsx** — React island that loads the Weave scheduling JS snippet:
- Use `useEffect` to dynamically inject the Weave `<script>` tag on mount
- Render the Weave widget container `<div>` that their snippet targets
- Accept props for any Weave configuration (widget ID, locale, etc.)
- Note: exact snippet details depend on the practice's Weave account — create the wrapper and leave a clear `TODO` for the actual snippet URL/config

**BookingSection.astro** — conditional rendering based on feature flag:
```astro
---
const showScheduler = import.meta.env.PUBLIC_ENABLE_SCHEDULING === 'true';
---

{showScheduler ? (
  <WeaveScheduler client:visible />
) : (
  <BookingFallback />
)}
```

**BookingFallback.astro** — the "Call to Book" fallback when scheduling is disabled:
- Heading: "Book an Appointment"
- Body: "Call us to schedule your visit."
- CTA: click-to-call button with phone number
- Same visual style as the rest of the site (card with shadow)

Place `<BookingSection />` in the nav's "Book Online" button target area, at the bottom of every service page template, and in the Final CTA block on the homepage.

**Verify:**
```bash
# With scheduling OFF (default / production):
PUBLIC_ENABLE_SCHEDULING=false npm run dev
# "Book Online" buttons show "Call to Book" fallback — no Weave widget loads

# With scheduling ON (staging):
PUBLIC_ENABLE_SCHEDULING=true npm run dev
# Weave widget container renders (actual widget won't load without real Weave config)
# Verify no console errors from the widget wrapper

npm run build
# Build succeeds in both configurations
```

**Commit:** `feat: add Weave scheduling widget with feature flag`

---

## Phase 3: Content Pages (Tasks 8–11)

### Task 8: Service Page Template + Content Collections

**Files:**
- Create: `src/content/config.ts` (Astro content collection schema)
- Create: `src/content/services/extractions.md`
- Create: `src/content/services/fillings.md`
- Create: `src/content/services/crowns.md`
- Create: `src/content/services/root-canals.md`
- Create: `src/content/services/wisdom-teeth.md`
- Create: `src/content/services/bleaching.md`
- Create: `src/content/services/dentures.md`
- Create: `src/content/services/partials.md`
- Create: `src/content/services/denture-repair.md`
- Create: `src/content/services/bridges.md`
- Create: `src/content/services/veneers.md`
- Create: `src/content/services/implants.md`
- Create: `src/pages/services/index.astro`
- Create: `src/pages/services/[...slug].astro` (dynamic route)
- Create: `src/pages/es/services/index.astro`
- Create: `src/pages/es/services/[...slug].astro`
- Create: `src/components/ServicePageLayout.astro`

**What to build:**

Content collection schema:
```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.object({ en: z.string(), es: z.string() }),
    description: z.object({ en: z.string(), es: z.string() }),
    icon: z.string(), // emoji or image path
    faq: z.array(z.object({
      question: z.object({ en: z.string(), es: z.string() }),
      answer: z.object({ en: z.string(), es: z.string() }),
    })).optional(),
  }),
});

export const collections = { services };
```

Each service markdown file uses frontmatter with EN/ES content (extracted from existing `scripts.js` translations). The markdown body can hold extended EN description; ES description lives in frontmatter.

**ServicePageLayout.astro** — template following the spec:
1. Service name heading with "in Albuquerque, NM"
2. What is [Service]? section
3. Benefits
4. What to Expect
5. Cost & Insurance callout (links to insurance page)
6. Service-specific FAQ (rendered with `<FAQAccordion />`)
7. Booking CTA (`<BookingSection />`)
8. Related services links

The dynamic route `[...slug].astro` uses `getStaticPaths()` to generate one page per service from the content collection. Spanish versions pass `locale="es"`.

**Services index pages** — grid of all 12 service cards linking to individual pages.

**Verify:**
```bash
npm run dev
# /services/ — grid of 12 service cards renders
# /services/extractions — full service page renders with FAQ + booking CTA
# /es/services/extracciones — Spanish version renders
npm run build
# All 24 service pages generate (12 EN + 12 ES)
```

**Commit:** `feat: add service pages with content collections and templates`

---

### Task 9: About Page

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/es/about.astro`

**What to build:**
Expanded doctor profile page. Reuse `DoctorProfile` component from homepage but with full-length bio. Add sections for:
- Practice story / history (since 2005)
- Education & credentials
- Professional memberships (ADA, Academy of General Dentistry)
- Personal touch (from Lima, Peru; UNM then Ohio State)

Placeholder slot for future team photos / office tour images.

**Verify:**
```bash
npm run dev
# /about — renders full doctor profile
# /es/about — Spanish version
```

**Commit:** `feat: add About page with full doctor profile`

---

### Task 10: Insurance, Affordable Care, Financial Policy Pages

**Files:**
- Create: `src/pages/insurance.astro`
- Create: `src/pages/affordable-care.astro`
- Create: `src/pages/financial-policy.astro`
- Create: `src/pages/es/insurance.astro`
- Create: `src/pages/es/affordable-care.astro`
- Create: `src/pages/es/financial-policy.astro`

**What to build:**

**Insurance page** (`/insurance`):
- "How Dental Insurance Works" plain-language explainer (bilingual)
- Reuse `InsuranceGrid` component showing all 9 accepted providers
- "What to Bring" checklist
- "Not Sure About Your Coverage?" CTA linking to phone/email

**Affordable Care page** (`/affordable-care`):
- "Medicaid Welcome" messaging
- Transparent pricing section (placeholder — will need real co-pay/fee data from owners)
- Payment options: Insurance, Medicaid, Self-pay rates
- Note about payment plans being a future consideration (do NOT advertise as available)
- Community resources links (NM Human Services Dept, Medicaid enrollment)

**Financial Policy page** (`/financial-policy`):
- "Why We Collect at Time of Service" — empathetic explanation
- No-show / cancellation policy
- Contact info for billing questions

All pages use `BaseLayout` with appropriate meta titles targeting local SEO keywords.

**Verify:**
```bash
npm run dev
# /insurance — education hub + provider grid renders
# /affordable-care — pricing + Medicaid info renders
# /financial-policy — policy page renders
# All three have /es/ equivalents
```

**Commit:** `feat: add insurance, affordable care, and financial policy pages`

---

### Task 11: Remaining Pages (Reviews, New Patients, Contact, FAQ, 404)

**Files:**
- Create: `src/pages/reviews.astro`
- Create: `src/pages/new-patients.astro`
- Create: `src/pages/contact.astro`
- Create: `src/pages/faq.astro`
- Create: `src/pages/404.astro`
- Create: `src/pages/es/reviews.astro`
- Create: `src/pages/es/new-patients.astro`
- Create: `src/pages/es/contact.astro`
- Create: `src/pages/es/faq.astro`

**What to build:**

**Reviews** (`/reviews`):
- Full-page review showcase using `ReviewCarousel` island
- All 3 existing reviews displayed
- Placeholder for future Weave review widget (phase 2)

**New Patients** (`/new-patients`):
- 3-step journey visual (reuse `JourneySteps`)
- "What to Bring" checklist
- Downloadable forms links (existing Firebase Storage PDFs)
- "Your First Visit" walkthrough
- First-appointment FAQ (extracted from current FAQ content, rendered with `FAQAccordion`)

**Contact** (`/contact`):
- Google Maps embed (reuse `GoogleMap` island)
- Hours card (reuse `HoursCard`)
- Phone, email, address with icons
- Simple contact form (name, phone, email, message) — static HTML form with Netlify Forms handling (`data-netlify="true"`)
- Directions/parking notes

**FAQ** (`/faq`):
- All 6 FAQ categories from current site rendered with `FAQAccordion`
- Categories: First Appointment, Preventive, General, Family, Cosmetic, Emergencies
- FAQ schema markup (`FAQPage` JSON-LD) for SEO rich snippets

**404** — custom error page with link back to home and phone number.

**Verify:**
```bash
npm run dev
# /reviews, /new-patients, /contact, /faq — all render correctly
# Contact form submits to Netlify (test on deploy preview)
# /faq — FAQ accordions expand/collapse
# Navigate to /nonexistent — 404 page renders
# All pages have /es/ equivalents
npm run build
# Build succeeds, all pages generated
```

**Commit:** `feat: add reviews, new patients, contact, FAQ, and 404 pages`

---

## Phase 4: SEO, Polish, Deploy (Tasks 12–14)

### Task 12: SEO + Structured Data + Sitemap

**Files:**
- Create: `src/components/SEOHead.astro` (if not already part of BaseLayout)
- Modify: `src/layouts/BaseLayout.astro` (ensure all meta is wired up)
- Modify: `astro.config.mjs` (enable sitemap integration)
- Modify: service page template (add FAQPage schema per service)

**What to build:**
- Install `@astrojs/sitemap` integration — auto-generates `sitemap.xml`
- Ensure every page has unique `<title>`, `<meta description>`, canonical URL
- Service pages: title pattern = "[Service] Dentist in Albuquerque, NM | Rio Grande Smiles"
- Open Graph + Twitter card meta on every page
- `hreflang` alternate links (EN ↔ ES) on every page
- Schema.org `Dentist` JSON-LD on homepage (already in current site — port over)
- Schema.org `FAQPage` JSON-LD on FAQ page and each service page that has FAQs
- Verify `robots.txt` in `public/` allows crawling

**Verify:**
```bash
npm run build
# dist/sitemap-index.xml exists and lists all pages
# Inspect built HTML: <title>, <meta>, hreflang, JSON-LD all present
# Validate JSON-LD at https://validator.schema.org/
```

**Commit:** `feat: add SEO meta, structured data, and sitemap`

---

### Task 13: Accessibility Audit + Polish

**Files:**
- Modify: various components (fixes from audit)

**What to build:**
Run through the WCAG 2.2 AA checklist from the spec:
- Skip-to-content link in `BaseLayout`
- Verify all images have descriptive `alt` text
- Check color contrast ≥ 4.5:1 (use browser DevTools audit)
- Keyboard navigation: all interactive elements reachable via Tab, operable via Enter/Space
- Focus-visible styles on all interactive elements
- `aria-label` on icon-only buttons (nav phone, mobile CTA bar)
- `prefers-reduced-motion` media query: disable carousel auto-rotate and hover animations
- Semantic landmarks: `<nav>`, `<main>`, `<section>`, `<footer>`
- Form labels on contact form inputs

**Verify:**
```bash
# Run Lighthouse accessibility audit in Chrome DevTools
# Target: score ≥ 95
# Keyboard-only navigation test: Tab through entire homepage
```

**Commit:** `fix: accessibility improvements — skip nav, ARIA labels, contrast, motion`

---

### Task 14: Netlify Deploy + Domain Migration

**Files:**
- Modify: `netlify.toml` (final review)
- Delete: old root-level `index.html`, `style.css`, `scripts.js`, `404.html` (after confirming Astro build works)

**What to build:**
- Connect GitHub repo to Netlify
- Configure custom domain: `riograndesmiles.com` → Netlify (update DNS from GitHub Pages)
- Verify SSL auto-provisions
- Verify staging deploy preview works (push a branch, check preview URL)
- Verify `PUBLIC_ENABLE_SCHEDULING=false` in production (booking fallback shows)
- Verify `PUBLIC_ENABLE_SCHEDULING=true` in deploy preview (scheduler wrapper renders)
- Remove old static files from repo root (the original HTML/CSS/JS site)
- Update `public/CNAME` if needed (Netlify may not need it)

**Verify:**
```bash
# Push to main → production deploys to riograndesmiles.com
# Push to staging branch → preview URL deploys
# riograndesmiles.com shows new site with booking fallback
# Preview URL shows new site with scheduler wrapper
# Old static files removed, no broken references
```

**Commit:** `chore: clean up legacy static site files`

---

## Summary

| Phase | Tasks | What's Delivered |
|-------|-------|-----------------|
| 1. Foundation | Tasks 1–4 | Astro project, i18n, layout, homepage |
| 2. Islands | Tasks 5–7 | Google Maps, FAQ/reviews, Weave scheduling |
| 3. Content | Tasks 8–11 | All 21 pages (services, about, insurance, contact, etc.) |
| 4. Ship | Tasks 12–14 | SEO, accessibility, Netlify deploy, domain migration |

**Total: 14 tasks** — each is a focused, committable unit of work.

After Task 14, the site is live with scheduling gated behind the feature flag. Run through the testing checklist from the spec, get parent sign-off, flip the flag.
