# Ankit Kumar — Portfolio

Next.js portfolio site. Oversized display type with a cut-out portrait, alternating
light and dark halves, pill-shaped service rows, floating project cards over a giant
wordmark, an offcanvas menu, a project popup and a contact form.

The layout follows a commercial reference design, but every line of HTML, CSS and JS
here was written from scratch — no template files, no licence attached.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm run start
```

Node 18.18 or newer.

## Stack

| Piece | What it does |
| --- | --- |
| Next.js 15 (App Router) | Pages and rendering |
| GSAP + ScrollTrigger | Preloader, reveals, counters, pointer-following previews |
| Lenis | Smooth scrolling |
| next/font | Archivo (display) and Instrument Sans (body) |

Plain CSS in `app/globals.css`. No Tailwind, no jQuery, no AOS.

## Page order

Hero → about → statement → bio → **dark:** marquee, services, work, recognition →
experience, stack → **dark:** contact, footer.

Every section runs edge to edge — `--shell` is `100%`, so width is controlled by
`--gutter` alone. Long-form copy carries its own `max-width` so lines stay readable
on a wide monitor.

The light/dark alternation comes from wrapping sections in `<section className="dark">`
in `app/page.jsx`. Move a section between wrappers and it re-skins itself. The work
section is a light island inside the dark half — that is deliberate, and it is done with
a background override on `.works`.

## Editing

**Everything you'd want to change lives in `lib/content.js`** — name, hero word, stats,
services, projects, recognition rows, experience, tools, contact details, nav links.
Change the data and the page follows.

### The hero portrait

The hero is a giant word with a portrait standing in front of it. That only works with a
**cut-out PNG** — a photo with the background removed — at `public/portrait.png`.

`public/portrait.png` currently holds a cut-out made from a stock photo, so the hero
reads correctly out of the box. **Replace it with one of yourself.** To cut your own
photo out:

```bash
pip install "rembg[cpu]" pillow
```

```bash
python scripts/cutout.py my-photo.jpg public/portrait.png
```

The script removes the background and trims the result to the subject so it sits flush
on the hero baseline. First run downloads the model (~1 GB), after that it is instant.
The source can be a local file or a URL.

If `public/portrait.png` is ever missing, the site falls back to a stock photo and adds
`.is-fallback`, which vignettes the rectangular edges instead of faking a cut-out.

### The hero word

`profile.heroWord` renders **one line per word**, and `SiteMotion` scales each line so it
fills the viewport width exactly — so "Software Developer" reads as `SOFTWARE` over
`DEVELOPER`, each edge to edge at its own size. Never a mid-word break.

The fit re-runs on resize and once webfonts load. A single word like "Developer" fills
one line, which is the reference layout.

### Images

Every image is a free Unsplash URL built by the `IMG()` helper at the top of
`lib/content.js`. To use your own, replace the `IMG(...)` call with a path like
`/work/my-project.jpg` and put the file in `public/work/`.

These are plain `<img>` tags rather than `next/image`, so no `remotePatterns` config is
needed. If you switch to local files and want optimisation, swap in `next/image` and
add the sizes.

### Theme

A real light/dark switch lives in the header (`#themeToggle`). The choice is saved to
`localStorage` and applied by an inline script in `app/layout.jsx` **before first
paint**, so the page never flashes the wrong palette. With no saved choice it follows
the OS setting and keeps following it until the visitor picks one.

Everything is driven by the tokens under `:root` and `[data-theme="dark"]` in
`app/globals.css` — to retune dark mode, edit that one block.

### The work section

The giant `WORK` wordmark is `position: sticky` inside `.works__stage`; the card
column is pulled up over it with a negative `margin-top`, so the wordmark holds still
while cards scroll across it. Cards alternate `.wcard--left` / `.wcard--right` for the
zig-zag. Card count is whatever is in `projects` — the layout does not care.

### The service rows

Rows are wider than the viewport and slide in opposite directions as you scroll
(`--svc-drift`, set to `0px` below 861px so nothing moves on a phone). The horizontal
travel is a scrubbed ScrollTrigger in `SiteMotion.jsx`.

### The experience slider

The template this follows used client testimonials here. Since there were no real
quotes to use, the same card treatment carries the **experience** timeline instead —
Tred+, INNOFarms.AI, SmartED. If you collect real testimonials later, replace the
`experience` array in `lib/content.js` and rename the fields; the markup in
`components/Experience.jsx` will need the same swap.

### The recognition rows

`lib/content.js` → `awards`. Each row's `image` is what appears in the panel that
follows your pointer on hover.

### The contact form

`components/Contact.jsx` renders it; validation lives at the bottom of
`components/SiteMotion.jsx`. It currently validates and stops — **nothing is sent**.
Point the submit handler at a Next.js route handler, Formspree, Resend, or whatever
you use.

### The CV

`public/Ankit-Kumar-Resume.pdf`, linked from `profile.cvUrl`. Replace the file to
update it.

### Colours and type

Tokens at the top of `app/globals.css`:

```css
--void:  #000000;   /* dark sections */
--paper: #f4f3f1;   /* light sections */
--flame: #ff4a17;   /* primary accent — grid button, CTA, years badge */
--lime:  #cbff3a;   /* secondary accent — side tab, submit button */
```

Fonts are set in `app/layout.jsx`.

## How the behaviour is wired

Every section is a plain server component. One client component,
`components/SiteMotion.jsx`, mounts once and drives everything: preloader, smooth
scroll, sticky header, offcanvas, reveals, counters, project popup, the "View" bubble
over the work grid, the recognition preview, the experience slider, ripples,
back-to-top and form validation. Each block is commented — delete one and nothing else
breaks.

`prefers-reduced-motion` turns off the preloader, reveals, marquee, smooth scroll and
every pointer-following element.

## Deploying

Push to GitHub, import at vercel.com, accept the defaults.
