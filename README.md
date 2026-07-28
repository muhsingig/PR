# Pavitra Rajpal — portfolio

A scrapbook-style personal site, built in the same shape as prasjain.com,
with a **stargazer lily** theme: blush paper, deep plum ink, stargazer pink,
Cutive Mono + Inter + a handwriting face, and a home page made of cut-out
objects you click to move around the site.

Plain HTML/CSS/JS. No build step, no dependencies.

## The palette

All eight colours live in one `:root` block at the top of `assets/style.css`.
Change them there and the whole site follows.

| Token | Value | Used for |
|---|---|---|
| `--paper` | `#fdf9f8` | page background |
| `--ink` | `#3d1a2e` | all body text |
| `--accent` | `#cf6382` | links, active nav, italics, the lily |
| `--cream` | `#fdf1f4` | paper objects |

Where the lily shows up: the mark after "hi! i'm pavitra!" and in the footer,
the section dividers, the favicon, a faint watermark inside every empty photo
slot, the pressed-and-taped specimen on the home collage, and the herbarium
tags on the interests page. The lily itself is drawn twice in
`assets/style.css` as `--lily-solid` (a silhouette used as a mask, so it always
picks up the surrounding text colour) and `--lily-outline` (the watermark).

## Pages

| File | Nav label | What's on it |
|---|---|---|
| `index.html` | home | the collage — eight objects, each links somewhere |
| `about.html` | about me | the long-form intro + draggable photos |
| `stills.html` | stills | photo grid |
| `work.html` | work | what I do (3 services) + selected work (4) |
| `socials.html` | socials | social links + contact form |
| `interests.html` | interests | the five interests |
| `professional.html` | professional | the CV page |

## Three things to do before this goes live

**1. Your contact details** — open `assets/site.js` and edit the `CONTACT`
block at the very top. It's the only place they live; every page reads from it.

```js
const CONTACT = {
  email:     'hello@pavitrarajpal.com',   // <- placeholder
  instagram: 'https://instagram.com/pavitrarajpal',   // <- placeholder
  tiktok:    'https://tiktok.com/@pavitrarajpal',     // <- placeholder
  linkedin:  'https://www.linkedin.com/in/pavitra-rajpal-926125325'  // real
};
```

**2. Your photos** — drop them in the `photos/` folder with these exact names:

```
portrait.jpg          face or half-body shot — used on the polaroids
life1.jpg … life4.jpg casual personal photos
work1.jpg … work4.jpg work / project shots
```

Until a file exists the site shows a neutral paper placeholder in its slot,
so nothing looks broken while you gather them. Square-ish or portrait crops
work best.

**3. Your real projects** — `work.html`, the "Selected Work" section, currently
has four placeholder cards (`campaign delivery`, `audience insight`,
`brand narrative`, `platform strategy`). Swap the titles and one-line
descriptions for real work. There's a `<!-- TODO -->` comment marking the spot.

Optional: add your CV as `resume.pdf` in this folder — the "i prefer a pdf"
button on `professional.html` already points at it.

## Publishing

Drag this whole folder onto [netlify.com/drop](https://netlify.com/drop).
It's live in about thirty seconds, free, and you get a URL you can point a
custom domain at later.

## Notes

- `_old/index-editorial.html` is the earlier blue editorial-style draft and
  `_old/lily-palette-options.html` shows the four lily palettes side by side
  (calla, stargazer, water lily, white lily) if you ever want to switch. Both
  are kept as backups — delete them if you don't want them.
- The contact form has no backend — submitting it opens the visitor's mail app
  with the message pre-filled. If you'd rather it post somewhere, Netlify Forms
  or Formspree both drop in with one attribute change.
- Objects on the home page and photos on the about page can be dragged around
  (desktop only).
- **Falling petals** drift down the home page. To turn them off, delete the
  `<div class="petals">` from `index.html`; to add them to another page, paste
  that same empty div in. Speed, size, opacity and count are the `PETALS` array
  in `assets/site.js` — nine hand-placed lanes rather than random ones, so they
  never clump. They skip themselves entirely for visitors whose system asks for
  reduced motion, and drop to five on phones.
