# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal website on Next.js 16 (Turbopack), deployed on Vercel. `npm run dev` / `build` / `start` / `lint`; no tests.

Uses the **Pages Router** (`pages/`), not the App Router.

`next build` does not lint. `npm run lint` runs the ESLint CLI as its own step and has to be invoked explicitly.

Turbopack matches loaders on the literal file extension, so image files need lowercase extensions.
