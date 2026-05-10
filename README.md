# Operabase /productions — Discovery to Engagement

A Monsoonfish design exercise by **Vishal Maurya**.

Two views of the same `/productions` page wired through a floating
Before/After toggle. The **Before** is a faithful clone of today's
Operabase. The **After** is the redesign. Same fonts, same colors, same
type scale. What changed is the information architecture.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The floating toggle in the bottom-right
flips between Before / After. Keyboard: `←` and `→` to switch, choice
persists in `sessionStorage`.

## What's in here

- `DELIVERABLE.md` — full write-up: problem framing, user flows,
  wireframes, rationale, validation plan
- `.impeccable.md` — design context and principles
- `src/components/before/` — Operabase clone of `/productions`
- `src/components/after/` — redesigned `/productions` (production-grouped
  cards, smart filters, in-place quick-look, slide-in artist panel,
  recovery-style empty state)
- `src/lib/data.ts` — 14 mock productions covering the brief's edge cases
  (multi-date, single-date, premiere, sold-out, no-image, festival)

## Stack

Next.js 16 (App Router) · TypeScript · CSS Modules · Playfair Display +
Roboto (matching Operabase exactly).

## Author

Vishal Maurya · [vishalm.designs@gmail.com](mailto:vishalm.designs@gmail.com)

For: Monsoonfish · Operabase Design Exercise
