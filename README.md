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

## Contact form — real email backend

The `backend/` folder is a PHP endpoint (same logic as your original
`contact_process.php`, rebuilt to talk to the React form and return JSON) that emails
every enquiry to you via PHPMailer/Gmail SMTP, exactly like your old site did. If the
email fails to send for any reason, the form shows a "Send via WhatsApp instead" button
so no enquiry is lost.

### 1. Set up credentials

`backend/config.php` already has your original Gmail address and App Password copied in
so it works immediately. **Please regenerate the App Password** at
[myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) and paste
the new one in — the old one was previously sitting in a plain-text file, so it's safest
to rotate it. Never commit `config.php` to a public repo (it's already git-ignored).

`backend/config.example.php` is a template if you ever need to recreate it.

### 2. Deploy it

This needs a host that runs PHP (shared hosting / cPanel works fine — no Composer or
special extensions required beyond the default `openssl`/`mbstring`, which almost every
PHP host has).

1. Upload the whole `backend/` folder to your PHP host, e.g. as
   `https://hussnainestateadvisor.com/contact_process.php` (upload the *contents* of
   `backend/` to your web root, or to a subfolder and adjust the endpoint URL below).
2. Build the React site (`npm run build`) and upload the contents of `dist/` to the same
   host/domain.
3. Because both live on the same domain, the form's default endpoint
   (`/contact_process.php`) just works. If you host the API on a different domain,
   create a `.env` file in the project root with:
   ```
   VITE_CONTACT_ENDPOINT=https://api.yourdomain.com/contact_process.php
   ```
   and add that domain to `allowed_origins` in `config.php`.

### 3. Test it

Submit the form once it's live — you should get an email at the `to_email` address in
`config.php` within a few seconds. Check your host's PHP error log if it fails; the
script logs SMTP errors there.
