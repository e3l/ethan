# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal website on Next.js 16 (Turbopack), deployed on Vercel. `npm run dev` / `build` / `start` / `lint`; no tests.

Uses the **Pages Router** (`pages/`), not the App Router.

`next build` does not lint. `npm run lint` runs the ESLint CLI as its own step and has to be invoked explicitly.

Turbopack matches loaders on the literal file extension, so image files need lowercase extensions.

Photos under `components/gallery` are display copies kept to one spec by `scripts/photos.mjs` (JPEG, long edge ≤ 2560px, no EXIF/XMP; originals live in a photo library, not the repo). After adding a photo, run `npm run photos` and update its import if the extension changed. `prebuild` runs `npm run photos -- --check`, so a photo not to spec fails the build.
