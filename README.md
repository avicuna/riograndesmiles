# Rio Grande Smiles

Website for **Dr. Emerson Vicuña's dental practice** in Albuquerque, NM.
Live at **[riograndesmiles.com](https://riograndesmiles.com)**

---

## Tech Stack

- **Astro 4** — static site generator (zero JS by default, island hydration)
- **React 18** — interactive components (FAQ accordion, review carousel, Google Map, mobile CTA bar)
- **Tailwind CSS 3** — utility-first styling with custom design tokens
- **TypeScript** — type checking
- **Netlify** — hosting, SSL, deploy previews

## Fonts (self-hosted)

- **Newsreader** — display/heading font (serif, via `@fontsource-variable/newsreader`)
- **Inter Tight** — body font (sans, via `@fontsource-variable/inter-tight`)
- **JetBrains Mono** — decorative labels (mono, via `@fontsource/jetbrains-mono`)

No Google Fonts CDN dependency — all fonts are bundled in the build.

## Color System

Colors are defined in two places:
- **`tailwind.config.mjs`** — hex/rgb values for Tailwind utility classes (`bg-primary-500`, `text-ink`, etc.)
- **`src/styles/global.css`** — oklch CSS custom properties for gradients and `color-mix()` effects

Primary blue palette, teal accent, navy ink text, warm neutral backgrounds.

## Bilingual (EN/ES)

- English pages at `/` (e.g., `/about`, `/services/crowns/`)
- Spanish pages at `/es/` (e.g., `/es/about`, `/es/services/crowns/`)
- Translation files: `src/i18n/en.json` and `src/i18n/es.json`
- Translation utility: `src/i18n/utils.ts` — `useTranslations(locale)` returns a `t(key)` function
- `hreflang` alternate links in `<head>` for SEO
- Language toggle in nav links to the alternate URL (real navigation, not client-side swap)

## Project Structure

```
src/
├── components/       # Astro + React components
│   ├── Nav.astro           # Sticky nav with blurred backdrop
│   ├── Hero.astro          # Split hero — text left, doctor portrait right
│   ├── TrustBar.astro      # Numeric stats strip (20+, 1200+, 12, 9)
│   ├── DoctorProfile.astro # Editorial section — quote, bio, credentials
│   ├── ServicesOverview.astro  # 12-card numbered grid
│   ├── ReviewsSection.astro    # Dark bg, 3-column review cards
│   ├── InsuranceGrid.astro     # Split layout, 3x3 provider grid
│   ├── CtaBand.astro           # Full-width CTA — call/text/email
│   ├── MapSection.astro        # Google Map + detail card
│   ├── SectionTag.astro        # Reusable § label component
│   ├── BookingSection.astro    # Call/text card (used on inner pages)
│   ├── FinalCta.astro          # Simple CTA (used on financial-policy)
│   ├── Footer.astro            # 4-column light footer
│   ├── FAQAccordion.tsx        # React — collapsible FAQ
│   ├── ReviewCarousel.tsx      # React — auto-rotating reviews (reviews page only)
│   ├── GoogleMap.tsx           # React — embedded Google Maps iframe
│   ├── MobileCtaBar.tsx        # React — sticky call/text bar (mobile)
│   └── ...
├── content/          # Astro content collections
│   └── services/     # 12 service markdown files (extractions, fillings, etc.)
├── i18n/             # Translation system
│   ├── en.json
│   ├── es.json
│   └── utils.ts
├── layouts/
│   └── BaseLayout.astro  # HTML shell — meta, fonts, nav, footer, mobile bar
├── pages/            # File-based routing
│   ├── index.astro        # EN homepage
│   ├── about.astro
│   ├── services/
│   │   ├── index.astro    # Services grid
│   │   └── [...slug].astro  # Dynamic service detail pages
│   ├── insurance.astro
│   ├── reviews.astro
│   ├── contact.astro
│   ├── faq.astro
│   ├── new-patients.astro
│   ├── affordable-care.astro
│   ├── financial-policy.astro
│   ├── 404.astro
│   └── es/            # Spanish mirrors of all pages
└── styles/
    └── global.css     # Font imports, oklch tokens, base styles, a11y
```

## Pages (45 total)

| Page | EN | ES | Description |
|------|----|----|-------------|
| Homepage | `/` | `/es/` | Hero, trust strip, doctor, services, reviews, insurance, FAQ, CTA, map |
| About | `/about` | `/es/about` | Doctor profile, credentials, practice story |
| Services index | `/services/` | `/es/services/` | Grid of all 12 services |
| Service detail (×12) | `/services/[slug]` | `/es/services/[slug]` | Individual service pages |
| Insurance | `/insurance` | `/es/insurance` | How insurance works, provider grid |
| Reviews | `/reviews` | `/es/reviews` | Review carousel + Google CTA |
| Contact | `/contact` | `/es/contact` | Map, form, directions |
| FAQ | `/faq` | `/es/faq` | 6 categories of questions |
| New Patients | `/new-patients` | `/es/new-patients` | Forms, what to bring, first visit |
| Affordable Care | `/affordable-care` | `/es/affordable-care` | Medicaid, pricing, resources |
| Financial Policy | `/financial-policy` | `/es/financial-policy` | Payment, billing, cancellation |
| 404 | `/404` | — | Error page |

## Development

```bash
# Install dependencies
npm install

# Dev server (http://localhost:4321)
npm run dev

# Type check
npx astro check

# Build (outputs to dist/)
npm run build

# Preview build locally
npx serve dist -l 4000
```

## Deployment

**Hosted on Netlify** (free tier). Deploys automatically on push to `main`.

- **Site:** `frolicking-sprinkles-06cb72.netlify.app`
- **Custom domain:** `riograndesmiles.com` (primary) + `www.riograndesmiles.com` (redirects)
- **SSL:** Let's Encrypt, auto-renewing
- **Build config:** `netlify.toml` in repo root

### DNS (Squarespace Domains)

Domain registered at Squarespace. DNS records:

| Type | Name | Data |
|------|------|------|
| A | @ | 75.2.60.5 |
| CNAME | www | frolicking-sprinkles-06cb72.netlify.app |

### To redeploy

Push to `main` — Netlify auto-builds. Or trigger manually in the Netlify dashboard under Deploys.

### To change the Netlify site name

Netlify dashboard → Project configuration → Change site name. Then update the CNAME record in Squarespace to match.

## Photos

Only two photos currently in use:
- `public/img/doctor-headshot.png` — Dr. Vicuña's headshot (hero + about page)
- `public/img/albuquerque-skyline.jpg` — Albuquerque skyline (hero background)
- `public/img/services/` — Service icon images (used on service detail pages)
- `public/img/*.png` — Insurance provider logos (not currently used — switched to text grid)

## Contact Info (hardcoded)

- **Phone:** (505) 877-1113 — used in `tel:+15058771113` and `sms:+15058771113` links
- **Email:** emersonvicunadds@gmail.com
- **Address:** 3200 Coors Blvd NW Suite F, Albuquerque, NM 87120
- **Hours:** Mon–Thu 9am–5pm, Fri–Sun closed

If any of these change, update:
1. `src/i18n/en.json` and `es.json` (display text)
2. Component files that hardcode `tel:` / `sms:` / `mailto:` links
3. `src/pages/index.astro` JSON-LD structured data
