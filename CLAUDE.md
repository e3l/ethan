# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal website on Next.js 14, deployed on Vercel. `npm run dev` / `build` / `start` / `lint`; no tests.

Uses the **Pages Router** (`pages/`), not the App Router.

Route transitions rely on three coupled pieces that must stay in sync — see the WHY comments in each file:
- `pages/_app.js` — Framer Motion 0.5s fade + a `media="x"` stripper (Next issue #17464 workaround)
- `util/fixTimeoutTransition.js` — clones active `<style>`/`<link>` nodes on route change; the timeout must exceed the fade duration
