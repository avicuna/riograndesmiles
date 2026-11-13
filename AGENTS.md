# Working in riograndesmiles

The website for a dental practice in Albuquerque. This repo is public, so keep personal details, email addresses, account IDs and patient information out of code, commits, issues and PRs.

## Build and deploy

- Node version is in `.nvmrc`. `npm install`, then `npm run dev` (http://localhost:4321) or `npm run build`, which runs `astro check` and stops on any type error.
- Cloudflare Workers Builds deploys production from `main` and posts a preview link on every PR. Config is in `wrangler.jsonc`. Builds are free within a 3,000-minute monthly allowance, so there's no need to batch PRs.

## Privacy and tracking

- Healthcare sites draw tracking lawsuits. Don't add Google Analytics, the Meta pixel, Hotjar, Clarity, or any ad pixel or session recording. Cloudflare Web Analytics is the only analytics, loaded in `src/layouts/BaseLayout.astro` only when `process.env.CONTEXT === 'production'`.
- The contact form posts to Web3Forms (`src/components/ContactForm.astro`) and goes to the office only. Don't route messages anywhere else.
- Patient forms in `public/forms/` must be blank. Check PDF metadata before committing, and keep the file names when replacing one.

## Content

- Don't invent practice claims or add words to patient reviews. Ask first.
- Keep copy consistent across pages and between English and Spanish. No spelling or grammar mistakes.
- Say "Albuquerque", not "Rio Grande Valley".

## Design

- Keep the current palette and fonts. Calling and texting stay the primary actions.
- Reuse the `.btn*` and `.kicker` classes in `global.css` and the `Icon` component for new UI.
- Only two real photos exist (the doctor's headshot and the Albuquerque skyline). Don't design around photos the site doesn't have.
- The site icon is a set of files in `public/` (favicons, touch icons, manifest icons). Changing it means re-exporting every size.
