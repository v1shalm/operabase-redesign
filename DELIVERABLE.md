# Operabase /productions — Discovery to Engagement

A Monsoonfish design exercise by **Vishal Maurya**.

> Two views of the same `/productions` page, wired through a floating
> Before/After toggle. The Before is a faithful clone of today's Operabase.
> The After is the redesign. Same fonts, same colors, same type scale.
> What changed is the information architecture.

---

## How to read this deliverable

| Where it lives                            | What it covers                                                |
| ----------------------------------------- | ------------------------------------------------------------- |
| **The running app** at `localhost:3000`   | The hi-fi screen. Toggle between Before / After in any state. |
| `.impeccable.md`                          | Design context — users, brand personality, principles.        |
| This file (`DELIVERABLE.md`)              | Problem understanding, user flows, wireframes, rationale.     |
| `Operabase_DesignResearch.md` (provided)  | The full prior research doc.                                  |

To run: `npm install` then `npm run dev`. The page defaults to the After
view; the floating toggle in the bottom-right flips to Before.

---

## 1. Problem Understanding

### The brief

The brief states four failure metrics: low platform usage, low time on
site, low artist discoverability, low ticket click-through. Operabase has
the data (1M+ performances, 270K+ artists), but users browse without
exploring deeply, and rarely take meaningful actions.

### The root causes I'm fixing

After reading the brief and walking the live site, the seven causes
(documented in `Operabase_DesignResearch.md`) collapse to four that
matter at the listing level:

1. **Repetitive listings.** La Traviata × 6 dates appears as 6 rows. By
   row 3 the user has lost patience.
2. **No reason to click.** Every row looks identical. There's no
   editorial signal (premiere? new staging? sold-out trend?), so casual
   users have no anchor for "is this worth my attention."
3. **Cross-entity navigation is broken.** Finding an artist from a
   performance requires leaving the listing. The listing is the spine of
   the session and shouldn't lose its place.
4. **Ticket CTA is buried.** The most commercially important action on
   the page is a tiny inline link, competing with a dozen other tiny
   links.

### Hypotheses (what changes the metrics)

| If we…                                                            | Then…                                                                                  | Metric moved                              |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------- |
| Group repetitive listings by production (not by date)             | The listing becomes ~60–70% shorter; users don't bounce on visual repetition           | Bounce rate ↓, time on site ↑             |
| Surface editorial badges at the card level                        | Non-experts get reasons to click; "New production" and "Sold out" become decision aids | Ticket CTR ↑, session depth ↑             |
| Make artist names clickable into a side panel (no nav away)       | Users explore artists without losing their listing place                               | Artist profile clicks ↑, time on site ↑   |
| Persistent ticket CTA per card (not per row)                      | The action gets the visual weight it deserves                                          | Ticket CTR ↑                              |
| Quick-look reveals all dates + cast in place                      | Users decide between dates without leaving the card                                    | Engagement, Filter usage ↑                |

### Assumptions

1. Operabase has production photos available (cover image fallback handles
   the case when it doesn't — see card #9 "Pelléas et Mélisande" which has
   no image, rendering an editorial wash with the work's initial).
2. Performance data already includes premiere flag, dates list, and ticket
   URLs for ticketed shows.
3. The redesign keeps SSR/SEO equivalence. The page renders the full set
   of productions on first paint.
4. No login is needed for the artist preview panel.
5. The current Operabase global header and IA stay; only the
   `/productions` page changes.

---

## 2. User Flows

The flow chart below is rendered from the live app — every step in the
After flow is implemented and clickable.

### Flow A — Casual explorer (no specific intent)

```
   Lands on /productions
            │
            ▼
   Sees grid of productions with editorial badges
   ("New production", "Booking fast", "World premiere")
            │
            ▼
   Stops on a card whose badge piques interest
   (cover image + composer + work title visible)
            │
            ▼
   Clicks "Quick-look" → card expands in place
   Sees full cast, all dates, production note
            │
            ▼
   Clicks artist name → side panel slides in
   Reads bio + top roles + upcoming count
            │
            ▼
   Clicks "Get tickets" on a specific date row
   → exits to box office
```

### Flow B — Location-based planner

```
   Lands on /productions
            │
            ▼
   Sticky filter bar visible at top
   Sets City = "Vienna", From = "12 Jun", To = "28 Jun"
            │
            ▼
   Active filters render as removable chips
   Grid re-sorts to 1 production (La Traviata, 6 dates)
            │
            ▼
   Clicks "Quick-look" → expands to show 6 dates
   Each date shows: weekday, status (available/low/sold-out)
            │
            ▼
   Picks a Friday with "Few seats left" → clicks "Book"
            │
            ▼
   Optional: clicks Anna Netrebko's name
   Side panel: "Currently in La Traviata · Vienna State Opera"
   Confirms it's the artist they expected
   → returns to ticket flow
```

### Flow C — Artist follower

```
   Lands on /productions
            │
            ▼
   Types "Kaufmann" in the smart search input
   (filters across work / composer / artist / company)
            │
            ▼
   Grid filters to productions where Kaufmann appears in cast
            │
            ▼
   Clicks his name on La Traviata card → side panel
   Sees: 21 upcoming performances this season
   "Best known for: Otello, Don José, Florestan"
            │
            ▼
   Clicks "See all upcoming dates" → nav to artist page
   (in this prototype, a stub link)
```

---

## 3. Wireframes (ASCII)

These wireframes describe the structural skeleton independent of the
visual design. The live Before/After views in the app are the rendered
versions.

### Before — current Operabase layout

```
┌──────────────────────────────────────────────────────────────┐
│ Operabase   Performances Artists Companies …    PRO  Sign in │  ← topbar
├──────────────────────────────────────────────────────────────┤
│ Future · Past · All productions  ·  Premieres · Festivals    │  ← subnav
├──────────────────────────────────────────────────────────────┤
│ Future productions                                           │  ← H1 (Playfair)
│ 47 performances across 14 productions                        │
├──────────────┬───────────────────────────────────────────────┤
│ FILTERS      │  47 performances           Sort: Date earliest│
│              │  ───────────────────────────────────────────── │
│ City   [▾]   │  12 │ La Traviata                  → Tickets   │
│ Country[▾]   │  JUN│ Verdi · Opera in 3 acts                  │
│ Composer[▾]  │  '26│ Wiener Staatsoper · Vienna               │
│ Work   [   ] │     │ Anna Netrebko (Soprano), Jonas Kaufmann… │
│ Voice  [▾]   │ ──────────────────────────────────────────────│
│ From   [/]   │  15 │ La Traviata                  → Tickets   │  ← repetition
│ To     [/]   │  JUN│ Verdi · Opera in 3 acts                  │     of same
│              │  '26│ Wiener Staatsoper · Vienna               │     production
│ [Reset]      │     │ Anna Netrebko (Soprano), Jonas Kaufmann… │
│              │ ──────────────────────────────────────────────│
│              │  18 │ La Traviata                  → Tickets   │  ← again
│              │  ...                                           │
└──────────────┴───────────────────────────────────────────────┘
```

### After — redesigned

```
┌──────────────────────────────────────────────────────────────┐
│ Operabase   Performances Artists Companies …    PRO  Sign in │  ← sticky header
├──────────────────────────────────────────────────────────────┤
│ PERFORMANCES · FUTURE PRODUCTIONS                            │
│                                                              │
│ What's on this season                                        │  ← H1 (Playfair, larger)
│ 14 productions · 47 performances across 12 cities. Tap any   │
│ artist to preview their schedule.                            │
├──────────────────────────────────────────────────────────────┤
│ 🔎 [Search work, composer, artist…]                          │  ← sticky smart filter
│ City [▾] Composer [▾] Voice [▾] [date]→[date]    [▦] [≡]    │     bar
│ Active: [city: Vienna ×] [from: 2026-06-12 ×]  Clear all     │
├──────────────────────────────────────────────────────────────┤
│ ┌──────────┬─────────────────────────────┐ ┌──────────────┐ │
│ │ [image]  │ VERDI                       │ │ STRAUSS      │ │
│ │ ┌──────┐ │ La Traviata                 │ │ Salome       │ │
│ │ │NEW   │ │ Opera in 3 acts             │ │ Opera in 1 …│ │
│ │ │PROD  │ │ Wiener Staatsoper · Vienna  │ │ La Scala …  │ │  ← grid of
│ │ └──────┘ │ ┌─────┐  6 performances     │ │ ...         │ │     production-
│ │          │ │ Next│  12 Jun → 27 Jun    │ │             │ │     grouped
│ │          │ │12Jun│                     │ │             │ │     cards
│ │          │ └─────┘                     │ │             │ │
│ │          │ ◯ Anna Netrebko · Violetta │ │             │ │
│ │          │   (Soprano)                 │ │             │ │
│ │          │ ◯ Jonas Kaufmann · Alfredo  │ │             │ │
│ │          │ ◯ Ludovic Tézier · Germont  │ │             │ │
│ │          │ [Get tickets →]  [Quick-look▾]│ │           │ │
│ └──────────┴─────────────────────────────┘ └──────────────┘ │
└──────────────────────────────────────────────────────────────┘

Quick-look expanded (in place, not a modal):
┌──────────────────────────────────────────────────────────────┐
│ FULL CAST                                                    │
│  Violetta Valéry  Anna Netrebko        Soprano               │
│  Alfredo Germont  Jonas Kaufmann       Tenor                 │
│  Giorgio Germont  Ludovic Tézier       Baritone              │
│                                                              │
│ CREATIVE TEAM                                                │
│  [Conductor: Philippe Jordan] [Director: Simon Stone]        │
│                                                              │
│ ALL DATES · BOOK A SPECIFIC SHOW                             │
│  12 │ Friday      Few seats left         [Book]              │
│  JUN│                                                        │
│  ──────────────────────────────────────────────────────────  │
│  15 │ Monday      Tickets available      [Book]              │
│  JUN│                                                        │
│  ──────────────────────────────────────────────────────────  │
│  21 │ Sunday      Sold out               —                   │
│  ...                                                         │
└──────────────────────────────────────────────────────────────┘

Artist side panel (slides in from right when name clicked):
                                    ┌──────────────────────────┐
                                    │                       [×]│
                                    │  ╭─╮                     │
                                    │  │A│                     │
                                    │  ╰─╯                     │
                                    │  SOPRANO                 │
                                    │  Anna Netrebko           │
                                    │  Currently in La Traviata│
                                    │  · Wiener Staatsoper     │
                                    │  ─────────────────────── │
                                    │  Russian-Austrian sopr…  │
                                    │                          │
                                    │  ROLE IN THIS PRODUCTION │
                                    │  Violetta Valéry         │
                                    │                          │
                                    │  BEST KNOWN FOR          │
                                    │  [Tosca][Lady M.][Aida]  │
                                    │                          │
                                    │  UPCOMING PERFORMANCES   │
                                    │  14 scheduled this season│
                                    │  ─────────────────────── │
                                    │  [View full profile →]   │
                                    │  See all upcoming dates  │
                                    └──────────────────────────┘
```

---

## 4. One High-Fidelity Screen

The hi-fi screen is the live `localhost:3000` page in **After** mode. It
demonstrates:

- **Production-grouped card** with editorial badges, cover image / fallback,
  date chip, principal cast preview
- **Smart filter bar** with persistent active-filter chips
- **Quick-look expansion** in place (not a modal)
- **Artist side panel** slides in on artist click
- **Empty state** with recovery suggestions (try removing one filter at a
  time)
- **Compact / grid view toggle**
- **Sold-out / few-seats-left status** at the date level

To compare against the current Operabase, hit the floating Before/After
toggle in the bottom-right corner. It is keyboard-accessible (←/→) and
persists across page reloads via sessionStorage.

---

## 5. Rationale — connecting design decisions to metrics

| Design decision                              | Why                                                                                    | Metric it moves                       |
| -------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------- |
| **Production-grouped cards**                 | Collapses 47 rows → 14 cards. Visual repetition was the #1 patience-killer.            | Bounce ↓, Time on listing ↑           |
| **Editorial badges (New, Festival, etc.)**   | Gives non-expert browsers a reason to click. Replaces "raw data" with editorial signal. | Ticket CTR ↑, Session depth ↑         |
| **Cover image at card level**                | Prestige cue. Opera audiences respond to production aesthetics. Anchors the eye.       | Time on listing ↑, Bounce ↓           |
| **Sticky smart filter bar**                  | Filters were buried in a sidebar. Surfacing them turns the listing browse-first.       | Filter usage ↑                        |
| **Active filter chips with one-click remove** | Lowers friction of trying a different combination.                                     | Filter usage ↑                        |
| **Quick-look in place (grid-rows transition)** | No modal, no nav. Decision happens without losing context.                             | Quick-look engagement ↑               |
| **Per-date booking row with status**         | The user's actual question is "which date works." Ticket CTA is per-date, not per-row. | Ticket CTR ↑                          |
| **Artist side panel from the listing**       | Artist profile clicks were broken because they meant leaving the page.                 | Artist profile clicks ↑               |
| **Empty state with recovery chips**          | Common cause of "no results" is one filter being too tight. Surface that fix.          | Bounce ↓                              |
| **Same fonts/colors as today's Operabase**   | Brand equity is preserved. The redesign is "evolution, not revolution."                | Reduced rollout risk; A/B-friendly    |
| **Floating Before/After toggle**             | Lets reviewers compare without two browser tabs. Part of the deliverable, not a gimmick. | Reviewability of the work itself      |

### Validation plan

I'd ship this behind an A/B test split on `/productions` with the
following primary metrics:

| Metric                      | How                                            | Target lift      |
| --------------------------- | ---------------------------------------------- | ---------------- |
| Artist profile click rate   | Clicks on artist names ÷ sessions             | +40% from base   |
| Ticket CTA click-through    | Clicks on "Get tickets" / "Book" ÷ sessions   | +25% from base   |
| Session depth               | Median pages per session                       | +30%             |
| Time on listing             | Median time on `/productions`                  | +45 seconds      |
| Quick-look engagement       | % sessions opening a quick-look at least once  | >35%             |
| Filter usage                | % sessions applying ≥1 filter                  | >50%             |
| Bounce rate                 | % sessions exiting without a click             | -20%             |

The four narrowest experiments to ship first:

1. Grouped production cards vs. row-per-date listing (the heaviest lever).
2. Inline artist side panel vs. full-page navigation.
3. Editorial badges visible vs. hidden (control).
4. Sticky filter bar vs. left sidebar.

---

## 6. What I'd build next (if more time)

1. **Personalization layer** — after 2–3 sessions, sort the grid by
   cities/artists/voice types the user has engaged with. Cookie-based, no
   login required.
2. **"Build your opera season" planner** — save productions into a
   personal list, get reminders when booking opens.
3. **Social proof signal** — "27 Operabase users are watching this
   production" or "Anna Netrebko's most-anticipated role of 2026".
4. **PRO conversion nudge** — after a user clicks an artist a few times,
   surface "Want their full schedule and agent contact? → Operabase PRO"
   without being intrusive.
5. **True mobile-first listing** — the discovery moment ("what's on
   tonight") is inherently mobile. The current redesign is responsive but
   not mobile-first.
6. **Live data** — wire to the real Operabase API so the prototype can be
   used as the basis for an A/B test rather than a demo.

---

## 7. Project structure

```
operabase/
├─ .impeccable.md                  ← design context (loaded by /impeccable)
├─ DELIVERABLE.md                  ← this file
├─ Operabase_DesignResearch.md     ← prior research doc (provided)
├─ package.json
├─ next.config.mjs
├─ tsconfig.json
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                ← fonts (Playfair + Roboto) + ToggleProvider
│  │  ├─ page.tsx                  ← picks Before vs After
│  │  └─ globals.css               ← design tokens
│  ├─ components/
│  │  ├─ Toggle.tsx                ← floating Before/After switch
│  │  ├─ Toggle.module.css
│  │  ├─ before/                   ← Operabase clone of /productions
│  │  │  ├─ BeforeView.tsx
│  │  │  └─ BeforeView.module.css
│  │  └─ after/                    ← Redesigned /productions
│  │     ├─ AfterView.tsx
│  │     ├─ AfterView.module.css
│  │     ├─ ProductionCard.tsx
│  │     ├─ ProductionCard.module.css
│  │     ├─ ArtistPanel.tsx
│  │     ├─ ArtistPanel.module.css
│  │     ├─ Badge.tsx
│  │     └─ Badge.module.css
│  └─ lib/
│     ├─ data.ts                   ← 14 mock productions covering edge cases
│     ├─ types.ts
│     └─ toggle-context.tsx
└─ public/                         ← (empty — images load from Unsplash)
```

---

*Designer: Vishal Maurya · vishalm.designs@gmail.com*
*For: Monsoonfish · Operabase Design Exercise*
