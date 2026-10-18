# Syed Abuzar — Portfolio (Next.js 16 · App Router)

Production-ready personal portfolio for **Syed Abuzar**, Senior Frontend Engineer & UI/UX Web Strategist.
Dark obsidian canvas, violet/indigo accents, glassmorphism cards and Framer Motion micro-interactions.

## Stack

| Layer    | Tech                                                        |
| -------- | ----------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components)        |
| UI       | React 19, Tailwind CSS v4, Framer Motion, Lucide + React Icons |
| Backend  | Next.js Route Handlers (Node runtime), Zod-free hand-rolled validation |
| Deploy   | Vercel (zero-config)                                        |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npx eslint .     # lint
npx tsc --noEmit # typecheck
```

## Project structure

```
src/
  app/
    layout.tsx            SEO metadata, JSON-LD, fonts (Inter + Plus Jakarta Sans)
    page.tsx              Section composition
    globals.css           Design tokens, grid overlays, glass utilities
    sitemap.ts robots.ts  SEO endpoints
    api/
      contact/route.ts    POST lead capture · GET admin listing
      resume/route.ts     GET résumé download (HTML) · ?format=json
  components/
    Navbar, Hero, Services, Projects, Experience,
    TechStack, Testimonials, Contact, Footer
    ui/                   Button, Counter, Reveal, SectionHeading
  lib/
    site.ts               Brand, links, nav (edit your URLs here)
    data.ts               Services, projects, experience, testimonials
    contact.ts            Shared validation + option lists
    store.ts              Persistence, webhook forwarding, rate limiting
    resume.ts             Résumé builder + print-ready HTML renderer
```

## Frontend

- **Sections:** Navbar · Hero (office background image, glowing profile frame, CTAs) · Stats metrics bar · Services · Filterable Project Gallery · Experience/Resume · Tech Stack · Testimonials carousel · Contact · Footer.
- **Motion:** scroll reveals, staggered grids, `layoutId` nav indicator, animated SVG chart (`pathLength`), hover glow cards, accordion-style mobile menu.
- **A11y/perf:** semantic landmarks, focus-visible rings, `aria-label`s, reduced-motion support, no layout-shift animations.
- **Responsive:** mobile-first; carousel switches from 1 → 2 cards per view at `lg`.

## Backend (Route Handlers)

### `POST /api/contact`

Accepts JSON:

```json
{
  "name": "Faisal Al-Harbi",
  "email": "faisal@brand.sa",
  "projectType": "Landing Page",
  "budget": "$5,000 – $15,000",
  "message": "Bilingual booking landing page…",
  "company": "",
  "formTime": 4200
}
```

Pipeline: rate limit (6 req / 10 min per IP) → honeypot (`company`) → submit-timing trap (`formTime` < 2500 ms) → field validation → persist to `data/inquiries.ndjson` (falls back to `os.tmpdir()` on read-only filesystems) → optional webhook forward.

Responses: `201 {ok:true,id}` · `422 {ok:false,errors}` · `429` · `503`.

### `GET /api/contact?token=…`

Returns the 50 most recent submissions. Requires `CONTACT_ADMIN_TOKEN`; otherwise `403`.

### `GET /api/resume`

- default → downloads `Syed-Abuzar-Resume.html` (print-ready, A4, `Cmd/Ctrl+P` → PDF)
- `?format=json` → structured résumé payload, CORS-enabled and cacheable

## Environment variables

Copy `.env.example` → `.env.local`:

| Variable               | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and robots      |
| `CONTACT_WEBHOOK_URL`  | Forward each lead to Zapier / Make / n8n / Slack    |
| `CONTACT_ADMIN_TOKEN`  | Enables `GET /api/contact?token=…`                  |

## Before you launch

1. Update `src/lib/site.ts` with your real email, LinkedIn, GitHub and portfolio URLs (placeholders are used currently).
2. Replace the sample testimonials in `src/lib/data.ts` with real client quotes.
3. Point project `liveUrl` / `sourceUrl` values in `src/lib/data.ts` at the real demos.
4. Add your images under `public/images/`: `office-bg.jpg` (hero background) and `syed-abuzar-profile.png` (hero avatar). The hero falls back to a gradient background / monogram avatar if either file is missing.
5. Set `NEXT_PUBLIC_SITE_URL` in Vercel, then deploy.

## Deploy on Vercel

Push the repo and import it in Vercel — no extra configuration required. Add the environment variables from the table above in **Project → Settings → Environment Variables**.
