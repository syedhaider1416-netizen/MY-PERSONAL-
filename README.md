# Syed Shabih Haider — Portfolio

Single-page portfolio/sales site. Next.js 16 (App Router) + TypeScript + Tailwind v4, one Three.js scene in the hero, Framer Motion for everything else.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Hot reload is on.

To check a production build before deploying:

```bash
npm run build
npm start
```

## Edit the content

Everything on the page — name, links, service copy, project descriptions, process steps — lives in one file:

```
src/content/index.ts
```

Change text there. You don't need to touch any component file for a copy edit.

## Add the video reel

The video section expects two files that aren't in the repo yet (video is your file to drop in):

```
public/work/easy-vitamins-ugc.mp4
public/work/easy-vitamins-poster.jpg
```

Drop them in with those exact filenames and the reel section picks them up automatically — no code change needed. Until they exist, the section still renders (a dark placeholder box with the play button), it just has nothing to play.

If you ever swap the video for a different one, update the two path strings in `videoReel` inside `src/content/index.ts`.

## Structure

```
src/
  app/
    layout.tsx          — fonts, global <head> metadata (SEO/OG/Twitter)
    page.tsx             — assembles all sections in order
    opengraph-image.tsx  — generates the social-preview image on the fly (no binary asset needed)
    globals.css           — design tokens (colors, type scale) as CSS variables
    robots.ts / sitemap.ts
  components/            — shared UI: nav rail, reveal-on-scroll wrapper, hero 3D scene + its fallback
  sections/              — one file per page section (Hero, Services, Work, Contact, ...)
  content/index.ts        — all copy and structured data
  lib/                    — small hooks (reduced-motion detection, section list)
```

## The hero scene

`src/components/NodeGraph.tsx` picks between two renderers:

- **Desktop, WebGL available, motion not reduced** → `NodeGraphScene.tsx`, a real Three.js node-graph scene (signal pulses traveling across a layered network).
- **Mobile, no WebGL, or `prefers-reduced-motion: reduce`** → `NodeGraphStatic.tsx`, a static SVG version of the same graph with a lightweight CSS/SMIL pulse animation.

This keeps the 3D cost off phones entirely, which is where most links from WhatsApp/email get opened.

## Design tokens

Colors, font stacks, and the type scale are defined once in `src/app/globals.css` under `@theme`. Change a hex value there and it updates everywhere — no hunting through components.

## Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, keep the defaults (Next.js is auto-detected).
3. Deploy.
4. Once you have a real domain, update `site.url` in `src/content/index.ts` — it feeds the OG/Twitter card URLs and the sitemap.

No environment variables are required.

## Favicon

A default Next.js favicon ships at `src/app/favicon.ico`. Replace that file with your own to change the browser-tab icon.
