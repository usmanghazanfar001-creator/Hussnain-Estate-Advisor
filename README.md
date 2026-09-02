# Hussnain Estate Advisor — React Website

A modern, mobile-responsive React rebuild of the Hussnain Estate Advisor site, with an
auto-sliding hero and a "society photos" carousel (Sitara Housing Societies), inspired by
the layout style of edifyelite.com.pk.

## What's inside

- **Hero** — auto-sliding background of real site photos with captions and a Ken Burns zoom
- **Sitara Housing Societies reel** — horizontally scrolling photo carousel with a click-to-enlarge lightbox
- **Featured Properties** — filterable grid (Residential / Commercial / Luxury / Industrial / Agriculture)
- **About** — animated stat counters (properties sold, happy clients, years of experience)
- **Client feedback**, **Contact form** (opens WhatsApp with the enquiry pre-filled), **Footer**, floating WhatsApp/email buttons
- Fully responsive: sticky navbar collapses into a mobile hamburger menu, all sections reflow for phones/tablets

Built with **React 19 + Vite + Tailwind CSS**.

## Running it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Building for production / deploying

```bash
npm run build
```

This creates a `dist/` folder with static HTML/CSS/JS you can upload to any web host
(cPanel, Netlify, Vercel, GitHub Pages, etc.) — no server/PHP required for the site itself.

## Editing content

Almost everything — property listings, contact details, testimonials, social links — lives
in one file: `src/data/content.js`. Update the text or swap image imports there and every
section updates automatically.

To change the photos used in the hero slider or the societies reel, edit the `heroSlides`
and `societyPhotos` arrays in that same file (images live in `src/assets/images/`).

## Deploying on Vercel (recommended)

This repo includes a serverless function at `api/contact.js` that Vercel runs
automatically — no PHP hosting needed.

1. Push this repo to GitHub (already done if you're reading this from there).
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the repo.
   Vercel auto-detects the Vite build settings — leave them as-is and click **Deploy**.
3. Once deployed, go to **Project Settings → Environment Variables** and add:

   | Name        | Value                                             |
   |-------------|----------------------------------------------------|
   | `SMTP_USER` | your Gmail address, e.g. `you@gmail.com`           |
   | `SMTP_PASS` | a Gmail **App Password** (not your normal password) — generate one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) |
   | `TO_EMAIL`  | the address enquiries should be delivered to        |
   | `FROM_NAME` | (optional) display name, e.g. `Hussnain Estate Advisor` |

4. Redeploy (Vercel → Deployments → ⋯ → Redeploy) so the new environment
   variables take effect.
5. Also open `api/contact.js` and add your live Vercel URL (and any custom
   domain) to the `ALLOWED_ORIGINS` list at the top, then push — this is the
   CORS allowlist that protects the endpoint from being called from other sites.

Test it by submitting the form on your live site — you should get an email
within a few seconds. If it fails, the form automatically offers a
"Send via WhatsApp instead" button, and Vercel's **Deployments → Functions**
logs will show the error.

## Alternative: PHP backend (cPanel / shared hosting)

If you'd rather host on traditional PHP hosting instead of Vercel, the
`backend/` folder contains an equivalent PHPMailer-based endpoint
(`contact_process.php`). See the comments in that file and set
`VITE_CONTACT_ENDPOINT` (in `.env.example`) to point the React form at it.
Only one of the two backends (Vercel function or PHP) needs to be set up —
not both.
