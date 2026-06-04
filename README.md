# Compleo Advisors — Website

The Compleo Advisors website. Built with Astro and deployed to Cloudflare Pages.

Visit the live site at https://compleoadvisors.com.

## What this is

A static site for Compleo Advisors, a rare disease strategy and creative firm. Eight pages: Home, About, For Biotech, For Advocacy, For Pharma Marketing Services, Insights, Contact, and a 404.

Built as a static Astro project so it can deploy free to Cloudflare Pages, edit in plain Markdown and Astro files, and stay portable.

## Local development

You need Node 18.17 or newer.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321` by default and reloads when you save files.

```bash
npm run build      # production build into dist/
npm run preview    # preview the built site locally
```

## Project structure

```
astro/
├── public/                 # Static assets copied as-is to the deployed site
│   ├── _headers            # Cloudflare HTTP headers and cache rules
│   ├── _redirects          # Cloudflare redirect rules
│   ├── robots.txt
│   ├── site_assets/
│   │   ├── favicon/        # Favicons in every needed size, plus PWA manifest
│   │   └── og/             # Open Graph share cards for every page
│   └── images/             # Headshot, environmental photos, future imagery
├── src/
│   ├── components/
│   │   ├── BrandMark.astro     # The arc-and-dot SVG mark, sized via prop
│   │   ├── SiteHeader.astro    # Sticky nav header
│   │   └── SiteFooter.astro    # Dark footer
│   ├── layouts/
│   │   └── SiteLayout.astro    # Shared <html>/<head>/<body> shell
│   ├── pages/                  # File-based routes
│   │   ├── index.astro                          # /
│   │   ├── about.astro                          # /about
│   │   ├── for-biotech.astro                    # /for-biotech
│   │   ├── for-advocacy.astro                   # /for-advocacy
│   │   ├── for-pharma-marketing-services.astro  # /for-pharma-marketing-services
│   │   ├── insights.astro                       # /insights
│   │   ├── contact.astro                        # /contact
│   │   └── 404.astro                            # /404
│   └── styles/
│       ├── tokens.css      # Color, type, spacing tokens from the Brand Standard
│       └── global.css      # Reset, base type, shared components, a11y, print
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## How to edit content

**Body copy.** Each page lives in `src/pages/`. Open the page you want to edit, scroll past the front matter (`---` block at the top), and find the section you want to change. Edit the text directly.

**Meta tags and SEO.** Page title, description, slug, and OG image are passed as props to `<SiteLayout>` at the top of each page. Edit those props.

**Nav and footer.** Edit `src/components/SiteHeader.astro` and `src/components/SiteFooter.astro`. Changes apply to every page automatically.

**Design tokens.** Color, type, spacing live in `src/styles/tokens.css`. Change values here and they cascade through the whole site.

## How to add an Insights piece

Insights is currently a curated POV page with five draft topics shown as cards on `/insights`. When real pieces are ready:

1. Add a new file `src/pages/insights/[slug].astro` for each published piece (Astro supports nested routes via folders).
2. Or, simpler: keep a single `/insights` page and edit `src/pages/insights.astro` to update the card list (titles, summaries, dates, and remove "Draft pending" pills as each piece publishes).

The "Draft pending" status pill is in the page CSS. Remove the `<span class="status-pill">Draft pending</span>` from a card once that piece is live.

## Deployment to Cloudflare Pages

The first deploy is a one-time setup:

1. Push this folder to a GitHub repo (`compleo-advisors-site` or similar).
2. In Cloudflare dashboard: Workers & Pages → Create application → Pages → Connect to Git.
3. Select the repo. Cloudflare auto-detects Astro:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/astro` (if the repo has the astro/ folder; otherwise leave blank if you push only the astro/ folder contents)
4. Deploy. Cloudflare gives you a `*.pages.dev` URL.
5. To use compleoadvisors.com: Cloudflare dashboard → Pages → Custom domains → add `compleoadvisors.com` and `www.compleoadvisors.com`. Cloudflare provides the DNS records; update them at your domain registrar.

After setup, every push to `main` rebuilds and deploys automatically. Pull requests get preview URLs.

## Open items before launch

Resolved on 2026-06-04:

1. ~~**LinkedIn URL.**~~ ✓ Wired to https://www.linkedin.com/company/compleo-advisors/ everywhere it appears.
2. ~~**Pharma page URL slug.**~~ ✓ Confirmed kept as `/for-pharma-marketing-services`.
4. ~~**Email capture on Insights.**~~ ✓ Kept. Form posts via a `mailto:` JavaScript handler that emails Kristin (see "Form wiring" below). For production volume, upgrade to a real list service.
6. ~~**Form wiring.**~~ ✓ Both forms (Insights signup and Contact) now construct a `mailto:kristin@compleoadvisors.com` with the user's input and open the user's email client. v1 mechanism. For production, swap to a Formspree endpoint (free tier 50/mo) or a Cloudflare Pages Function with MailChannels (free, integrated with Cloudflare). The JS handlers are isolated and easy to swap.

Still open:

3. **Insights piece selection.** Five POV topics are stubbed as "Draft pending" cards. Decide which 3 to 5 ship at launch, and replace the placeholder summaries with real piece abstracts written in Kristin's voice.
5. **Headshot.** Drop the chosen Image 5 headshot at `public/images/kristin.jpg` and replace the placeholder cards on About and Home with real `<img>` tags.
7. **Real case study text.** Two blinded biotech cases and one pharma marketing services case are stubbed. Expand each with full client situation, what Compleo Advisors did, and what changed, drafted from Kristin's notes.
8. ~~**Sitemap.**~~ ✓ `@astrojs/sitemap` integration is wired into `astro.config.mjs`. The build automatically generates `/sitemap-index.xml` and `/sitemap-0.xml` with priorities tuned per page type (homepage 1.0, audience pages 0.9, insights 0.8). `robots.txt` already references the sitemap index. Search engines will find it.

## Form wiring (current and future)

Both the Insights signup form (`/insights`) and the Contact form (`/contact`) currently use a client-side `mailto:` handler:

1. User submits the form.
2. JavaScript constructs an email with the form data in the body and a subject like "Conversation request from \[name\]" or "Insights signup."
3. The user's default email client opens with the email pre-filled.
4. They click Send. The email arrives at kristin@compleoadvisors.com.

This works in every modern browser, requires no backend or third-party service, and lets you start collecting signups immediately at launch.

**Limitations:** the user must have an email client configured (most desktop users do; many mobile users do; some don't). And they have to click Send manually.

**For production volume**, swap the JavaScript handler for a `fetch()` POST to one of:

- **Formspree** (https://formspree.io). Free tier: 50 submissions/month. Sign up, get an endpoint URL, replace the `mailto:` JS with a `fetch()` POST to the endpoint. Submission confirmation handled automatically.
- **Cloudflare Pages Functions + MailChannels.** Native to Cloudflare. Add `functions/api/contact.js` with a POST handler that emails via MailChannels. Free, no monthly limit, integrated with the deployment. Requires DKIM DNS records (one-time setup at Cloudflare DNS).

Either path is a one-file change. The form HTML and the user experience stay the same — only the JS handler swaps.

## Editing voice and style

Compleo Advisors brand voice rules live in `CompleoAdvisors_BrandStandard.docx` in the parent folder. Key principles:

- The brand is always written as **Compleo Advisors** in full. Never shortened to "Compleo."
- No m-dashes. Use colons or restructure.
- No defining-by-negation. Affirmative language only.
- No AI-cute rhetorical reversals.
- On the Insights page especially, copy must be in Kristin's first-person voice.

Run `grep -rE "Compleo[^A]|—|no [a-z]+, no" src/pages/` before every PR to catch slips.

## Phase status

- **Phase 0 (content):** Complete. Master content document in the parent folder at `Phase_0_Content_Document.md`.
- **Phase 1 (homepage design):** Complete and approved.
- **Phase 2 (cascade to remaining pages):** Complete.
- **Phase 3 (polish):** Complete. Favicons, OG cards, SEO meta, accessibility pass, print stylesheet, voice rescan all shipped.
- **Phase 4 (launch):** In progress. Astro scaffold done. Cloudflare Pages config ready. Deploy when the open items above are settled.

## Brand assets

The Compleo Advisors Brand Standard, logo files, and Phase 0 content document live in the parent folder, one level up from this Astro project. Treat that folder as the source of truth for brand material.
