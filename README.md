# Rio Grande Smiles

Website for **Dr. Emerson Vicuña's dental practice** in Albuquerque, NM.
Live at **[riograndesmiles.com](https://riograndesmiles.com)**, in English and Spanish.

---

## Quick Reference: How Do I…

| I want to… | Edit this | Notes |
|---|---|---|
| Change wording on any page | `src/i18n/en.json` **and** `src/i18n/es.json` | Almost all visible text lives here. Change both languages. |
| Add, remove, or reword a service | `src/content/services/<slug>.yaml` | One file per service, both languages inside. See [Services](#services). |
| Choose which services the homepage shows | `homepage: true` in a service's `.yaml` | The first one (by `order`) gets the wide card. |
| Change a review | `reviews.items` in both i18n files | Used on the homepage and `/reviews`. Keep them short, quoted word for word. |
| Change a homepage or New Patients FAQ | `homeFaq.items` / `faq.*` in both i18n files | The FAQ page builds its questions from `faq.*` keys. |
| Replace a patient form | `public/forms/*.pdf` | Keep the same file name. See [Patient Forms](#patient-forms). |
| Change the site icon | `public/icon.svg`, `brand-tile.svg`, `favicon.svg` and their PNG/ICO copies | Update every file together. See [Site Icon](#site-icon). |
| Change phone, email, address, or hours | Several files | See [Contact Info](#contact-info-hardcoded). |
| Change a page's layout | `src/pages/<page>.astro` **and** `src/pages/es/<page>.astro` | Spanish pages are separate copies. See [Bilingual](#bilingual-enes). |
| Publish a change | Open a PR, then merge it into `main` | Netlify deploys `main` automatically. See [Deployment](#deployment). |

## Tech Stack

- **Astro 4**: static site generator. Every page is plain HTML at build time.
- **React 18**: only for the two interactive pieces, the FAQ accordion and the review carousel. They load as "islands" when scrolled into view (`client:visible`).
- **Tailwind CSS 3**: styling, with the site's colors and fonts as custom tokens.
- **TypeScript**: type checking, run as part of every build.
- **Netlify**: hosting, SSL, and preview deploys for pull requests.
- **Web3Forms**: emails contact form messages to the office (free plan).
- **Cloudflare Web Analytics**: counts visitors (free, no cookies).

## Development

Requires **Node 24** (pinned in `.nvmrc` and `netlify.toml`). With nvm: `nvm install && nvm use`.

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:4321
npx astro check    # type check only
npm run build      # type check, then build to dist/ (stops on any type error)
npm run preview    # serve the built dist/ locally
```

The build runs the type check first, so a broken change fails on Netlify instead of deploying.

## Deployment

**Hosted on Netlify.** Netlify builds and deploys automatically when `main` changes. Every pull request also gets its own **Deploy Preview** link, posted as a comment on the PR, for checking changes before they go live.

- **Custom domain:** `riograndesmiles.com` (primary) + `www.riograndesmiles.com` (redirects)
- **SSL:** Let's Encrypt, auto-renewing
- **Build config:** `netlify.toml` (Node version, build command, and the 404 page rules)
- **DNS registrar:** Squarespace Domains, with an A record + CNAME pointing to Netlify. DNS records and the Netlify site name are managed in the Netlify and Squarespace dashboards; see the Netlify project's Domain Management page for current values.

**Netlify plan limits:** newer Netlify accounts use a credit-based free plan. Each deploy (including every PR preview) and every GB served spends credits, and the site pauses if the month's credits run out. Check the Netlify billing page if you make a lot of changes in one month, and batch small edits into one PR when you can.

## Contact Form

The form on `/contact/` and `/es/contact/` (`src/components/ContactForm.astro`) sends messages through **[Web3Forms](https://web3forms.com)**, which emails each one to the office at **emersonvicunadds@gmail.com**. There's no server code.

- **Account:** the Web3Forms account belongs to the office email. Sign in at [app.web3forms.com](https://app.web3forms.com) with that address (it emails a one-time code) to change settings or see the last 30 days of messages. The emails in the office inbox are the permanent record.
- **Access key:** written in `ContactForm.astro`. It's public by design: it can only send messages to the office inbox. If you ever need a new one, create it in the Web3Forms dashboard and replace it there.
- **Subject line:** messages arrive as "New message from riograndesmiles.com", with "(Spanish page)" added for the Spanish form. The patient's email address is in the message; reply to that address.
- **Spam:** a hidden `botcheck` checkbox catches simple bots, and Web3Forms filters the rest.
- **Limit:** the free plan allows 250 messages a month. Web3Forms emails a warning at 90%, and stops accepting messages at 100% until the next month.
- **Privacy:** the note under the message box asks patients not to include medical details, because messages pass through Web3Forms and Gmail.

**How to test it:** send a short test message from the live site and check that it arrives in the office inbox. If sending fails, patients see a message asking them to call or text instead.

**Why not Netlify Forms?** Netlify only emails form notifications to members of the Netlify team. On the free plan that's only the account owner, so it can't notify the office address.

## Analytics

**Cloudflare Web Analytics** counts visits: visitors and page views over time, top pages, where visitors came from (Google, Facebook, direct), their country and device, and page load speed. It's free and sets no cookies, so the site needs no cookie banner.

- **Dashboard:** the site lives in Alejandro's Cloudflare account. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com), go to **Web Analytics**, and pick riograndesmiles.com.
- **Office access:** invite emersonvicunadds@gmail.com on the account's **Members** page with the read-only **Analytics** role. That role also sees analytics for the account's other sites.
- **Script:** `src/layouts/BaseLayout.astro` adds Cloudflare's script to every page. Its token is public by design: all it does is report visits to this dashboard.
- **Live site only:** the script is added only when Netlify builds the live site (`CONTEXT=production`), so deploy previews and local builds don't count as visits.
- **Numbers run a bit low:** ad blockers and some browsers' privacy settings block the script, so some visits never show up.

## Bilingual (EN/ES)

- English pages at `/` (e.g. `/about/`, `/services/crowns/`)
- Spanish pages at `/es/` (e.g. `/es/about/`, `/es/services/crowns/`)
- **Text:** `src/i18n/en.json` and `src/i18n/es.json`, which must have the same keys.
- **Lookup:** `useTranslations(locale)` in `src/i18n/utils.ts` returns `t('some.key')` for text, and `t.list('some.key')` for lists such as reviews and FAQs. A missing key shows up on the page as the key itself, so look for stray `something.like.this` text after editing.
- **Page files:** every page in `src/pages/` has a Spanish copy in `src/pages/es/`. They share components, but layout changes to a page must be made in both files.
- `hreflang` links (including `x-default` → English) tell search engines which pages are translations of each other.
- The language toggle in the nav links to the same page in the other language.

## Services

Each service is one YAML file in `src/content/services/`. The file name is the URL (`crowns.yaml` → `/services/crowns/`).

```yaml
order: 3          # position on the homepage and /services (must be unique)
homepage: true    # optional: show it in the homepage's services section
icon: crowns      # an icon name from src/lib/service-icons.ts
en:
  title: ...
  summary: ...      # one line, shown on the service cards
  description: ...  # intro paragraph on the service page
  expect: ...       # "What to Expect" paragraph
  benefits: [...]
es:
  ...same fields in Spanish...
```

- Adding a file adds the service everywhere: `/services`, its own page in both languages, the sitemap, the homepage's scrolling list of services, and its service count. It shows in the homepage's services section only with `homepage: true` (seven do now: the wide Cleanings card plus six tiles).
- The build fails if a language is missing, the icon name is unknown, or two services share an `order`.
- On `/services`, the first service (Cleanings & Checkups) spans a full row, which keeps the remaining 12 cards in even rows. With a different number of services, check the grid at a few screen widths. On the homepage, keep the `homepage: true` tiles (after the first) to a multiple of 3 so the rows stay even.
- Icons are hand-drawn SVG line icons in `src/lib/service-icons.ts`, matching the style of Lucide icons.

## Project Structure

```
src/
├── components/            # Shared pieces (.astro = static HTML, .tsx = React island)
│   ├── UtilityBar.astro        # Dark bar above the header: phone, address, hours
│   ├── Nav.astro               # Sticky header; links from 1280px, Menu button below that
│   ├── Hero.astro              # Homepage hero, plus the Call/Text/Directions/Insurance bar under it
│   ├── DoctorProfile.astro     # Homepage blue "About the doctor" band with the practice's numbers
│   ├── ServiceMarquee.astro    # Homepage scrolling list of services, with Pause/Play
│   ├── ServicesOverview.astro  # Homepage services (the ones marked homepage: true)
│   ├── ServicesGrid.astro      # /services grid
│   ├── ServicePageLayout.astro # Layout for each service page
│   ├── ServiceIcon.astro       # Renders an icon from lib/service-icons.ts
│   ├── Icon.astro              # Small interface icons (phone, chat, map pin, …)
│   ├── ReviewsSection.astro    # Homepage reviews
│   ├── FAQAccordion.tsx        # React: collapsible FAQ
│   ├── ReviewCarousel.tsx      # React: rotating reviews on /reviews
│   ├── GoogleMap.astro         # Embedded map (no API key needed)
│   ├── MobileCtaBar.astro      # Call/Text bar fixed to the bottom on phones
│   ├── Footer.astro
│   └── ...                     # Booking, CTA, insurance, and callout sections
├── content/
│   ├── config.ts          # Rules for the service files
│   └── services/          # One YAML file per service (13)
├── i18n/                  # en.json, es.json, utils.ts
├── layouts/
│   └── BaseLayout.astro   # HTML shell: SEO and icon tags, analytics script, nav, footer, mobile call bar
├── lib/
│   ├── services.ts        # getServices() and servicePath(); every service list uses these
│   ├── contact.ts         # Phone, text, email, and Google Maps links
│   └── service-icons.ts   # The service icon set
├── pages/                 # One file per page; es/ holds the Spanish copies
└── styles/
    └── global.css         # Fonts, color variables, base styles, buttons (.btn)
public/                    # Copied to the site as is (images, forms, site icons, robots.txt)
docs/                      # The original March 2026 redesign spec and plan (historical)
```

`docs/` records the original redesign. Some planned features, such as online scheduling through Weave, were never built, so treat it as history rather than a description of the current site.

## Pages (48 built)

| Page | EN | ES | Description |
|------|----|----|-------------|
| Homepage | `/` | `/es/` | Hero with quick actions, doctor band with stats, scrolling services, services, reviews, insurance, FAQ, call band, map |
| About | `/about/` | `/es/about/` | Doctor profile, credentials, practice story |
| Services index | `/services/` | `/es/services/` | Grid of all services |
| Service pages (×13) | `/services/<slug>/` | `/es/services/<slug>/` | One per file in `src/content/services/` |
| Insurance | `/insurance/` | `/es/insurance/` | How insurance works, accepted plans |
| Reviews | `/reviews/` | `/es/reviews/` | Review carousel + link to Google reviews |
| Contact | `/contact/` | `/es/contact/` | Contact form, map, directions |
| FAQ | `/faq/` | `/es/faq/` | Six categories of questions |
| New Patients | `/new-patients/` | `/es/new-patients/` | Forms, what to bring, first visit |
| Affordable Care | `/affordable-care/` | `/es/affordable-care/` | Medicaid, pricing, resources |
| Financial Policy | `/financial-policy/` | `/es/financial-policy/` | Payment, billing, cancellation |
| Not found (404) | `/404` | `/es/404/` | Shown for any missing page; kept out of search results |

A sitemap (`/sitemap-index.xml`) is generated on every build. `@astrojs/sitemap` is pinned to `~3.2.1`, because newer versions require Astro 5.

## Fonts (self-hosted)

- **Newsreader**: headings (serif, `@fontsource-variable/newsreader`)
- **Inter Tight**: body text (sans, `@fontsource-variable/inter-tight`)
- **JetBrains Mono**: small decorative labels (`@fontsource/jetbrains-mono`)

All fonts are bundled in the build; nothing loads from Google Fonts.

## Color System

Colors are defined in two places, so change both:
- **`tailwind.config.mjs`**: values for Tailwind classes (`bg-primary-500`, `text-ink`, etc.)
- **`src/styles/global.css`**: OKLCH CSS variables for gradients and `color-mix()` effects

The palette is a primary blue, a teal accent, navy text, and warm neutral backgrounds. The main blue (`#186db9`) and the light gray text (`ink-3`) were darkened so text meets the WCAG AA contrast standard. Check contrast before lightening them.

**Buttons** are shared classes in `global.css`: `.btn` plus one color, `.btn-primary` (solid blue), `.btn-line` (blue outline), `.btn-white` (on blue or dark bands), or `.btn-glass` (outline over a photo). The homepage, header, and footer use them; the other pages still have their older rounded buttons. The keyboard focus ring is a navy outline with a white halo, so it shows on light and blue backgrounds alike.

## Photos and Images

- `public/img/doctor-headshot.jpg`: Dr. Vicuña's headshot, as shown on the homepage and the About page (1100px wide, about 220 KB)
- `public/img/doctor-headshot.png`: the full-size original (2.2 MB). Not shown on the site; make new crops from it
- `public/img/albuquerque-skyline.jpg`: Albuquerque skyline (bottom of the homepage hero, and behind "Call or text us today")
- `public/og-image.jpg`: the 1200×630 preview image shown when a link is shared in texts or social media (built from the two photos above)
- `public/img/services/`: old service images (not used; replaced by the line icons)
- `public/img/*.png`: insurance logos (not used; the site lists insurers as text)

## Site Icon

The icon is a smiling tooth on the site's blue tile, with the Rio Grande curving under it like a second smile. Small icons lose detail, so it's drawn three times, each for a range of sizes:

- **Full drawing** (64 px and up): `public/icon.svg`. These PNGs are copies of it:
  - `public/apple-touch-icon.png`: 180 px, square. iPhones and iPads use it when someone saves the site to their home screen, and round the corners themselves.
  - `public/icon-192.png`, `public/icon-512.png`: on the rounded tile, the manifest's "any" icons.
  - `public/icon-maskable-192.png`, `public/icon-maskable-512.png`: the drawing at 80% on a full blue square, so Android can cut it into its own shapes without clipping it.
- **Middle drawing** (40–63 px): `public/brand-tile.svg`, the 42 px tile beside "Rio Grande Smiles" in the header and footer. It leaves out the glints on the water and the highlights in the eyes.
- **Small drawing** (16 and 32 px): `public/favicon.svg` and `public/favicon.ico`, for browser tabs and bookmarks. The tooth is bigger, the face sits on whole pixels, and the river is thicker.

`public/site.webmanifest` gives Android the name and icons, and `BaseLayout.astro` links all of them. If the icon changes, replace every file above, so no place shows the old one.

## Patient Forms

The blank forms linked from the New Patients page (English and Spanish) are served from the site itself:
- `public/forms/medical-history.pdf`: Medical History
- `public/forms/patient-registration.pdf`: Patient Registration

To update a form, replace the PDF and keep the same file name, so the links keep working. Only post blank forms. (These used to be hosted on Firebase Storage, which stopped working when Firebase ended free-plan storage.)

## Contact Info (hardcoded)

- **Phone:** (505) 877-1113, used in `tel:+15058771113` and `sms:+15058771113` links
- **Email:** emersonvicunadds@gmail.com
- **Address:** 3200 Coors Blvd NW Suite F, Albuquerque, NM 87120
- **Hours:** Mon–Thu 9am–5pm, Fri–Sun closed

If any of these change, update:
1. `src/i18n/en.json` and `es.json` (display text)
2. The links in `src/lib/contact.ts` (phone, text, email, Google Maps), plus any `tel:` / `sms:` / `mailto:` links left in pages. To find them: `grep -rn "tel:\|sms:\|mailto:\|+1505" src`
3. The structured data for Google (`application/ld+json`) in `src/pages/index.astro` and `src/pages/es/index.astro`
4. The map address in `src/components/GoogleMap.astro`, if the office moves
