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

The personal details are woven in rather than announced: a black cat with green
eyes asleep on the paperwork (she blinks), coffee rings stained into the paper,
a guitar pick, a mug, a record sleeve, a greeting that changes with the clock,
and herbarium tags for cats, coffee, guitar and mornings alongside the work
ones. The collage decorations are hidden below 1080px, where the stage stops
being a positioning context.

Where the lily shows up: the mark after "hi! i'm pavitra!" and in the footer,
the section dividers, the favicon, a faint watermark inside every empty photo
slot, the pressed-and-taped specimen on the home collage, and the herbarium
tags on the interests page. The lily itself is drawn twice in
`assets/style.css` as `--lily-solid` (a silhouette used as a mask, so it always
picks up the surrounding text colour) and `--lily-outline` (the watermark).

## Pages

| File | Nav label | What's on it |
|---|---|---|
| `index.html` | home | the collage — nine objects, each linking somewhere |
| `about.html` | about me | the long-form intro + draggable photos |
| `stills.html` | stills | photo grid |
| `music.html` | music | guitar covers, played from YouTube |
| `work.html` | work | what I do — the three services |
| `projects.html` | projects | past projects + case studies |
| `socials.html` | socials | social links + contact form |
| `interests.html` | interests | nine herbarium specimen tags |
| `professional.html` | professional | the CV page |

Every collage object goes somewhere different: film strip → stills, notebook →
projects, sticky note → email, record sleeve → music, mug → work, polaroid →
about, phone → socials, paper stack → professional, pressed lily → interests.

## Before this goes live

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

**3. Your real projects** — two places, both marked with `<!-- TODO -->`:
`projects.html` has six placeholder cards (three past projects, three case
studies), and `work.html`'s "Selected Work" section has four more. Swap the
titles and one-line descriptions for real work.

**4. Your cover videos** — `music.html` has four empty record sleeves. Each
needs a YouTube **video id**: the eleven characters after `v=` in the watch URL
(`youtube.com/watch?v=`**`dQw4w9WgXcQ`**). Put them in the `covers` list at the
top of the music section. Until then a sleeve shows the play triangle and does
nothing when clicked.

Nothing loads from YouTube until a visitor actually presses play, and playback
uses `youtube-nocookie.com` — so no tracking cookies are set for people who
just browse. Starting one cover stops any other.

**5. Confirm the job title.** The site says you moved from Ad Operations at
JioHotstar into Digital Ad Sales. I didn't know the company for the current
role, so `professional.html` names it without one — there's a `<!-- TODO -->`
on that line.

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
