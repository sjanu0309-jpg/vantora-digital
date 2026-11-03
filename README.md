# VANTORA DIGITAL — Official Website
**DIGITAL LIFE GROWTH** · https://vantoradigital.info

Premium, responsive agency website with a real-time 3D hero (Three.js), scroll animations
(Framer Motion), service & portfolio pages, and a contact form that saves enquiries to Google Sheets.

## Tech
React 19 · TypeScript · Vite 6 · React Router 7 · Three.js (lazy-loaded) · Framer Motion · Lucide icons · plain CSS design system.

## Run locally
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the production build
```

## Pages
| Route | Page |
|---|---|
| `/` | Home — 3D hero, intro, services, why us, process, portfolio, testimonials, industries, FAQ, CTA |
| `/about` | About Us — story, vision, mission, philosophy, values, approach, (founder — hidden until filled) |
| `/services` and `/services/:slug` | Services overview + 6 detailed service pages |
| `/portfolio` and `/portfolio/:slug` | Filterable gallery + project detail pages |
| `/testimonials` | Testimonials + official profile links |
| `/process` | 5-step growth process |
| `/contact` | Enquiry form (Google Sheets), phone, email, WhatsApp |
| `/privacy-policy`, `/terms-and-conditions` | Legal |
| anything else | Custom 404 |

## Where to edit content
| What | File |
|---|---|
| Phone, email, social links, domain | `src/config/site.ts` |
| **Founder profile** (shows on About when `name` is filled) | `src/config/site.ts` → `founder` |
| **Testimonials** (genuine, approved reviews only) | `src/data/testimonials.ts` |
| Services text, deliverables, FAQs | `src/data/services.ts` |
| Portfolio projects | `src/data/portfolio.ts` (+ images in `public/images/`) |
| General FAQs | `src/data/faqs.ts` |
| Industries | `src/data/industries.ts` |
| Colours / fonts / layout | `src/styles/global.css` (tokens at the top) |
| 3D hero scene | `src/three/heroScene.ts` |

## Environment variables (`.env`, copy from `.env.example`)
| Variable | Purpose |
|---|---|
| `VITE_GOOGLE_SCRIPT_URL` | Apps Script Web App URL — see `backend/google-apps-script/README.md` |
| `VITE_GA_ID` | Google Analytics 4 ID (optional). A cookie-consent notice appears only when set. |
| `VITE_BOOKING_URL` | Optional calendar booking link (Calendly / Google appointment page) |

## Deploying to vantoradigital.info
Build with `npm run build` and upload the **contents of `dist/`** to your host.
Client-side routes need a fallback to `index.html` — already included for:
- **Apache / Hostinger / cPanel:** `public/.htaccess` (copied into `dist/`)
- **Netlify / Cloudflare Pages:** `public/_redirects`
- **Vercel:** `vercel.json`

After going live:
1. Add the site to **Google Search Console**, verify (meta tag placeholder in `index.html`), and submit
   `https://vantoradigital.info/sitemap.xml`.
2. Connect the form (see backend README) and send a test enquiry.

## Quality checklist
- ✅ Production build succeeds (`npm run build`), TypeScript strict mode
- ✅ 3D hero with WebGL detection, static logo fallback, reduced-motion support, pauses when off-screen
- ✅ Mobile layouts tested at 390px — no horizontal overflow
- ✅ Keyboard navigation, skip link, visible focus, ARIA on menu/accordion/form
- ✅ Page titles, descriptions, canonical URLs, Open Graph, JSON-LD, sitemap, robots.txt
- ✅ Portfolio items clearly labelled **Concept project**; no invented clients, reviews or statistics
- ⏳ Google Sheets submission — verify after you deploy the Apps Script (cannot be tested without your Google account)

## GitHub Pages (automatic publishing)
Every push to `main` builds and publishes the site via `.github/workflows/deploy.yml`.
1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Custom domain: `public/CNAME` contains `vantoradigital.info`. At your domain registrar add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `sjanu0309-jpg.github.io`
   Then tick **Enforce HTTPS** in Settings → Pages.
3. Form endpoint: **Settings → Secrets and variables → Actions → Variables** → add `VITE_GOOGLE_SCRIPT_URL`.
