# Rio Grande Smiles — Website Redesign Spec

## Overview

Redesign riograndesmiles.com from a static single-page HTML site into a modern, multi-page dental practice website built with **Astro + React islands**. The goal is a site that rivals top dental practices in UX, SEO, and patient conversion — while integrating with the practice's existing **Fuse** (PMS) and **Weave** (communications) stack.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Astro + React islands | Zero JS by default, hydrate only interactive widgets. Best Core Web Vitals for local SEO. |
| Styling | Tailwind CSS | Utility-first, pairs well with Astro, design tokens for consistent theme |
| Visual direction | Modern medical clean | White/light backgrounds, teal/blue accent, generous whitespace, card-based |
| Site structure | Multi-page | Individual service pages for SEO; each ranks for "[procedure] Albuquerque NM" |
| Bilingual | i18next (existing) | Migrate current EN/ES translations to Astro i18n routing (`/es/` prefix) |
| Integrations | Weave scheduling widget (phase 1) | Highest conversion impact; reviews + chat in future phases |
| Maps | Google Maps Embed API | Free tier, interactive, tap-to-navigate on mobile |
| Hosting | Netlify | Free tier, auto preview deploys per branch for staging, env var feature flags |
| Photography | Current headshot + placeholders | Design with placeholder slots for future photo shoot |

## Architecture

```
riograndesmiles/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # Shared head, nav, footer, i18n
│   ├── components/
│   │   ├── Nav.astro                 # Sticky header with dual CTA
│   │   ├── Hero.astro                # Benefit-driven headline + trust bar
│   │   ├── ServiceCard.astro         # Reusable service preview card
│   │   ├── ReviewCarousel.tsx        # React island — interactive carousel
│   │   ├── WeaveScheduler.tsx        # React island — Weave booking widget
│   │   ├── GoogleMap.tsx             # React island — Maps embed
│   │   ├── LanguageToggle.tsx        # React island — EN/ES switch
│   │   ├── FAQAccordion.tsx          # React island — collapsible FAQ
│   │   ├── InsuranceGrid.astro       # Static insurance logos
│   │   ├── DoctorProfile.astro       # Doctor bio card
│   │   ├── Footer.astro              # Contact, hours, address, sitemap
│   │   └── MobileCtaBar.tsx          # React island — sticky bottom bar (Call/Text/Book)
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   ├── about.astro               # Doctor bio + practice story
│   │   ├── services/
│   │   │   ├── index.astro           # All services overview
│   │   │   ├── extractions.astro     # Individual service pages (12 total)
│   │   │   ├── fillings.astro
│   │   │   ├── crowns.astro
│   │   │   ├── root-canals.astro
│   │   │   ├── wisdom-teeth.astro
│   │   │   ├── bleaching.astro
│   │   │   ├── dentures.astro
│   │   │   ├── partials.astro
│   │   │   ├── denture-repair.astro
│   │   │   ├── bridges.astro
│   │   │   ├── veneers.astro
│   │   │   └── implants.astro
│   │   ├── reviews.astro             # Patient testimonials
│   │   ├── insurance.astro           # Providers + financing info
│   │   ├── new-patients.astro        # Forms, what to expect, FAQ
│   │   ├── contact.astro             # Map, hours, address, contact form
│   │   ├── faq.astro                 # Full FAQ page
│   │   ├── 404.astro                 # Custom error page
│   │   └── es/                       # Spanish versions (same structure)
│   ├── content/
│   │   └── services/                 # Markdown content for each service
│   │       ├── extractions.md
│   │       └── ...                   # Content collections for easy editing
│   ├── i18n/
│   │   ├── en.json                   # English translations (migrated from scripts.js)
│   │   └── es.json                   # Spanish translations
│   └── styles/
│       └── global.css                # Tailwind base + custom theme tokens
├── public/
│   ├── img/                          # Existing images + new assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── CNAME
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

## Page Designs

### Homepage — Scroll Order

1. **Sticky Nav**: Logo | Services | About | Reviews | Insurance | Contact | 📞 (505) 877-1113 | [Book Online]
2. **Hero Section**:
   - Benefit headline: "Exceptional Dental Care for Your Whole Family"
   - Subheadline: "Accepting new patients · Se habla español · Most insurance accepted"
   - Dual CTA: [Book Your Visit] [Call (505) 877-1113]
   - Background: Albuquerque skyline (existing) with overlay
3. **Trust Bar**: Insurance logo strip + "20+ Years Experience" + "ADA Member" badges
4. **Services Overview**: 6 most popular services as cards → link to individual pages
5. **About the Doctor**: Headshot + brief bio + "Meet Dr. Vicuña →" link
6. **Patient Reviews**: Carousel with star ratings (static for now, Weave reviews in phase 2)
7. **New Patient Journey**: 3-step visual: Book → Visit → Smile
8. **Google Maps + Hours**: Interactive map embed + office hours card
9. **Final CTA Block**: Repeat booking CTA
10. **Footer**: Sitemap, contact info, hours, legal links

### Individual Service Pages — Template

Each service page follows this structure:

```
[Service Name] in Albuquerque, NM

## What is [Service]?
Plain-language explanation (< 8th grade reading level)

## Benefits
- Patient-outcome focused bullet points

## What to Expect
Step-by-step process description (reduces anxiety)

## Cost & Insurance
"We accept most major insurance providers" + link to insurance page
Mention financing options

## Frequently Asked Questions
3-4 service-specific FAQs (with FAQ schema markup)

## [Book Your Consultation]
CTA block with Weave scheduler
```

### Contact Page

- Interactive Google Maps embed (tap-to-navigate on mobile)
- Office hours card
- Phone (click-to-call) + email + address
- Contact form (basic — name, phone, email, message)
- Directions/parking notes

## Integrations

### Google Maps (Phase 1)

- **Google Maps Embed API** (free, no API key billing for embeds)
- React island component with lazy loading (loads on scroll into viewport)
- Address: 3200 Coors Boulevard NW Suite F, Albuquerque, NM 87120
- Mobile: tap address → opens native Maps app

### Weave Scheduling Widget (Phase 1)

- Embed Weave's JS scheduling snippet as a React island
- Placement: dedicated "Book" button in nav → opens scheduler modal/section
- Also embedded at bottom of every service page
- Widget syncs directly with Fuse PMS (appointments flow: Weave → Fuse)
- **Controlled by feature flag** — see Hosting & Staging section below

### Future Phases

| Phase | Integration | Effort |
|-------|------------|--------|
| Phase 2 | Weave review carousel (live Google reviews) | Drop-in JS snippet |
| Phase 2 | Weave "Text Us" chat bubble | Drop-in JS snippet |
| Phase 3 | Weave HIPAA digital forms (replace Firebase PDFs) | iframe or link to forms.weaveportal.com |
| Phase 3 | Weave payments (online bill pay) | JS snippet + configuration |
| Phase 4 | Blog / education hub (Astro content collections) | New pages + markdown content |
| Phase 4 | Before/after gallery (when photos available) | New component + image optimization |

## SEO Strategy

- **Individual service pages**: each targets "[procedure] dentist Albuquerque NM"
- **Schema.org structured data**: Dentist, MedicalBusiness, FAQPage, AggregateRating
- **Local SEO**: NAP consistency, Google Business Profile link, location-specific content
- **Bilingual routing**: `/es/` prefix for Spanish pages (hreflang tags)
- **Core Web Vitals targets**: LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Canonical URLs**: prevent duplicate content between EN/ES
- **Open Graph + Twitter cards**: per-page meta with service-specific images
- **Sitemap**: auto-generated by Astro

## Mobile Experience

- **Sticky bottom CTA bar**: Call | Book — appears after scrolling past hero
- **Touch targets**: minimum 44px on all interactive elements
- **Click-to-call**: all phone numbers are `tel:` links
- **Tap-to-navigate**: address opens Google/Apple Maps
- **Responsive breakpoints**: mobile-first design, breakpoints at 640, 768, 1024px
- **`prefers-reduced-motion`**: respect user motion preferences

## Accessibility

- WCAG 2.2 AA compliance
- Semantic HTML5 landmarks (nav, main, section, footer)
- Skip-to-content link
- Focus-visible styles on all interactive elements
- Alt text on all images
- Color contrast ratio ≥ 4.5:1 for text
- Keyboard navigation for all interactive components
- ARIA labels on icon-only buttons

## Design Tokens (Tailwind theme)

```js
// Color palette — modern medical clean
colors: {
  primary: {
    50:  '#f0f9ff',  // lightest tint
    100: '#e0f2fe',
    500: '#0ea5e9',  // main accent (sky blue — warmer than current #007BFF)
    600: '#0284c7',  // hover states
    700: '#0369a1',  // active states
    900: '#0c4a6e',  // dark text on light
  },
  neutral: {
    50:  '#fafafa',   // page background
    100: '#f5f5f5',   // section alternating bg
    200: '#e5e5e5',   // borders
    700: '#404040',   // body text
    900: '#171717',   // headings
  },
  accent: {
    teal: '#14b8a6',  // secondary accent for badges/highlights
  }
}
```

## Migration Plan

### Content to migrate from current site:
- [x] All 12 service descriptions (EN + ES) → Astro content collections
- [x] Doctor bio → about page
- [x] Insurance provider logos → insurance page
- [x] FAQ content (6 categories) → FAQ page + per-service FAQs
- [x] Patient reviews (3) → reviews page
- [x] Contact info / hours → contact page + footer
- [x] Downloadable forms links → new patients page

### What stays:
- Domain: riograndesmiles.com (CNAME)
- Existing images (img/ directory)
- GitHub repo

### What changes:
- Static HTML → Astro project
- Single page → multi-page with routing
- Inline i18n → file-based translations with `/es/` routing
- No booking → Weave scheduling widget
- No map → Google Maps embed
- Basic styling → Tailwind with design tokens

## Patient-Facing Pain Point Pages

Based on real practice feedback — these pages address the biggest friction points for both patients and front desk staff.

### Insurance Education Hub (`/insurance`)

The #1 source of confusion for patients. This page does double duty: reduces front-desk burden AND builds trust with new visitors.

- **"How Dental Insurance Works"** — plain-language bilingual explainer section with infographics
  - What's a deductible? What's a co-pay? What does "covered at 80%" mean?
  - "Why you may still owe after insurance pays" — common surprise explained simply
  - Written at < 8th grade reading level
- **Accepted Plans Grid** — all insurance logos with names, prominently featuring:
  - Medicaid MCOs: Blue Cross Community, Western Sky, Presbyterian Medicaid
  - Commercial: Delta Dental, MetLife, United Healthcare, etc.
- **"What to Bring" Checklist** — downloadable PDF + displayed inline
  - Insurance card (front and back), ID, completed forms
- **"Not Sure About Your Coverage?"** CTA — links to phone/chat for front desk help

### Affordable Care Page (`/affordable-care`)

Majority of patients are low-income. This page removes financial anxiety and differentiates the practice.

- **"Medicaid Welcome"** — prominent, warm messaging
- **Transparent Pricing Section** — estimated co-pays for common procedures
  - Medicaid co-pay ranges vs. self-pay rates for top 10 procedures
- **Payment Options** — clear breakdown:
  - Insurance (accepted plans link)
  - Medicaid
  - Self-pay rates
- **Community Resources** — links to NM Human Services Dept, Medicaid enrollment, local assistance programs

> **Note:** Payment plans are NOT currently offered. This is a future consideration that requires owner approval (defining terms, interest, minimums, etc.). If/when approved, add a payment plans section here and link to CareCredit/Sunbit pre-qualification.

### Financial Policy Page (`/financial-policy`)

Linked in every appointment confirmation. Removes the "negotiation" dynamic by setting expectations before the visit.

- **"Why We Collect at Time of Service"** — empathetic, clear explanation
  - "Collecting at the time of your visit allows us to keep costs low for all patients"
  - Framed as a benefit to patients, not a hardship
- **No-Show / Cancellation Policy** — clear, compassionate:
  - "We ask for 24-hour notice if you need to reschedule"
  - Explain why: "Your appointment time is reserved just for you — when it goes unused, another patient misses out"

### New Patients Page (`/new-patients`) — Enhanced

Expand current forms section into a full "What to Expect" experience:

- **3-Step Visual Journey**: Book → Prepare → Visit
- **"What to Bring" checklist** (reiterated from insurance page)
- **Digital Forms** — link to Weave HIPAA forms (phase 3) or current Firebase PDFs
- **"Your First Visit" walkthrough** — anxiety-reducing description
- **FAQ section** with first-appointment questions (migrated from current FAQ)

## Updated Page Architecture

Adding the new pages to the site structure:

```
pages/
├── index.astro               # Homepage
├── about.astro               # Doctor bio + practice story
├── services/
│   ├── index.astro           # All services overview
│   └── [12 individual service pages]
├── reviews.astro             # Patient testimonials
├── insurance.astro           # Insurance education hub + accepted plans
├── affordable-care.astro     # Payment options, Medicaid, financing
├── financial-policy.astro    # Collection policy, payment plans
├── new-patients.astro        # Forms, what to expect, first visit FAQ
├── contact.astro             # Map, hours, address, contact form
├── faq.astro                 # Full FAQ page
├── 404.astro                 # Custom error page
└── es/                       # Spanish versions (same structure)
```

Total: **21 pages** (EN) + **21 pages** (ES) = **42 pages**

## Updated Homepage Scroll Order

1. **Sticky Nav**: Logo | Services | About | Reviews | Insurance | Contact | 📞 (505) 877-1113 | [Book Online]
2. **Hero Section**:
   - Benefit headline: "Exceptional Dental Care for Your Whole Family"
   - Subheadline: "Accepting new patients · Medicaid welcome · Se habla español"
   - Dual CTA: [Book Your Visit] [Call (505) 877-1113]
3. **Trust Bar**: "Medicaid & Medicaid Welcome" + Insurance logos + "20+ Years" + "ADA Member"
4. **Services Overview**: 6 most popular services as cards → link to individual pages
5. **About the Doctor**: Headshot + brief bio + "Meet Dr. Vicuña →" link
6. **Patient Reviews**: Carousel with star ratings
7. **New Patient Journey**: 3-step visual: Book → Prepare → Smile
8. **Affordable Care Callout**: "We believe everyone deserves quality dental care" + payment options summary
9. **Google Maps + Hours**: Interactive map embed + office hours card
10. **Final CTA Block**: Repeat booking CTA
11. **Footer**: Sitemap, contact info, hours, legal links

## Updated Future Phases

| Phase | Integration | Effort | Pain Point Addressed |
|-------|------------|--------|---------------------|
| Phase 1 | Weave scheduling widget | React island | No-shows (online booking + reminders) |
| Phase 1 | Google Maps embed | React island | Patient convenience |
| Phase 2 | Weave review carousel (live Google reviews) | Drop-in JS snippet | Trust / patient acquisition |
| Phase 2 | Weave "Text Us" chat bubble | Drop-in JS snippet | Insurance confusion, accessibility |
| Phase 3 | Weave HIPAA digital forms (replace Firebase PDFs) | iframe/link | Reduce front-desk paperwork |
| Phase 3 | Weave Payments portal (online bill pay) | JS snippet | Collections, reduce negotiation |
| Phase 3 | Self-service rescheduling widget | Fuse availability API via Weave | No-shows |
| Phase 4 | Blog / education hub | Astro content collections | SEO, patient education |
| Phase 4 | Before/after gallery (when photos available) | New component | Trust, conversion |
| Phase 4 | Insurance benefit checker (card upload → estimate) | Weave + Fuse eligibility | Insurance confusion |

## Hosting & Staging

### Netlify Setup

The site deploys to **Netlify** with two environments:

| Environment | Branch | URL | Scheduling |
|---|---|---|---|
| **Production** | `main` | `riograndesmiles.com` | OFF until approved |
| **Staging** | `staging` / any PR | `staging--riograndesmiles.netlify.app` | ON |

DNS: Point `riograndesmiles.com` to Netlify (migrate from GitHub Pages). Netlify handles SSL automatically.

### Feature Flag for Scheduling

The Weave scheduling widget is gated behind an environment variable so it can be tested on staging before going live:

```
# Netlify environment variables
# Production: PUBLIC_ENABLE_SCHEDULING=false
# Staging:    PUBLIC_ENABLE_SCHEDULING=true
```

In the code, the booking component conditionally renders:

```astro
---
const showScheduler = import.meta.env.PUBLIC_ENABLE_SCHEDULING === 'true';
---

{showScheduler ? (
  <WeaveScheduler client:visible />
) : (
  <div class="booking-fallback">
    <h3>Book an Appointment</h3>
    <p>Call us to schedule your visit.</p>
    <a href="tel:+5058771113" class="btn-primary">Call (505) 877-1113</a>
  </div>
)}
```

When scheduling is OFF, all "Book Online" buttons become "Call to Book" with the phone number. No dead links, no broken UX.

**To go live:** Flip `PUBLIC_ENABLE_SCHEDULING=true` in Netlify's production environment variables. No code change, no deploy needed — Netlify triggers a rebuild automatically.

### Staging Password Protection (Optional)

To prevent anyone from stumbling onto the staging URL, add basic auth in `netlify.toml`:

```toml
# Only applies to deploy previews / branch deploys, not production
[context.deploy-preview]
  [context.deploy-preview.environment]
    PUBLIC_ENABLE_SCHEDULING = "true"

[context.branch-deploy]
  [context.branch-deploy.environment]
    PUBLIC_ENABLE_SCHEDULING = "true"
```

For password protection, use Netlify's site-wide password feature (Settings → Access & Security → Visitor access → Password protection) on the staging subdomain.

### Testing Plan

> **Important:** The Weave scheduling widget creates **real appointments** in Fuse PMS. There is no sandbox mode. The front desk should be aware that test bookings will appear and need to be cancelled.

**Tester:** You (the owners' son), using your own personal information.

**Testing checklist:**

1. **Basic booking flow**
   - [ ] Open staging URL → click "Book Online"
   - [ ] Select appointment type, date, time
   - [ ] Enter personal info (name, phone, email)
   - [ ] Submit → verify confirmation screen appears
   - [ ] Verify appointment appears in Fuse PMS at the front desk
   - [ ] Cancel the test appointment in Fuse

2. **Notifications**
   - [ ] Verify Weave sends confirmation text/email after booking
   - [ ] Check that reminder cadence fires (if configured in Weave)

3. **Mobile experience**
   - [ ] Book from your phone (iOS Safari and/or Android Chrome)
   - [ ] Verify touch targets, scrolling, and form inputs work smoothly

4. **Spanish version**
   - [ ] Navigate to `/es/` and book through the Spanish interface
   - [ ] Verify widget language matches (Weave may need locale config)

5. **Edge cases**
   - [ ] Try booking outside office hours → verify appropriate messaging
   - [ ] Try booking the same time slot twice → verify conflict handling
   - [ ] Test on slow connection (Chrome DevTools → Network → Slow 3G)

6. **Parent testing**
   - [ ] Have each parent book from their own phone
   - [ ] Get their feedback on the UX before going live
   - [ ] Final sign-off → flip the production flag

### Go-Live Sequence

1. All testing checklist items pass
2. Parents give sign-off
3. Flip `PUBLIC_ENABLE_SCHEDULING=true` in Netlify production env vars
4. Netlify auto-rebuilds and deploys
5. Verify scheduling works on `riograndesmiles.com`
6. Monitor first few real patient bookings in Fuse for any issues

## Out of Scope (for now)

- Blog / content marketing (phase 4)
- Before/after photo gallery (phase 4)
- AI chatbot
- Video testimonials
- Custom photography (using existing headshot + placeholders)
- In-house membership plan signup (operational decision, not website-first)
- Deposit-based booking (requires practice policy decision)
- Payment plans / financing (CareCredit, Sunbit, etc.) — requires owners to define terms and approve; add to Affordable Care page when ready
- Centennial Care or other MCO-specific pages — only add when confirmed as accepted plans
