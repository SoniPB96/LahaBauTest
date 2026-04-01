# Architecture Map

> Practical reference for LLM-based editing. Load this file first to orient any editing task, then load only the files listed in EDIT_SCOPES.md for the specific task.

---

## Project Stack

Next.js 14 · App Router · TypeScript (strict) · Tailwind CSS · React Hook Form + Zod · Vercel

---

## Directory Structure

```
laha/
├── app/                         # Next.js App Router — one folder = one route
│   ├── layout.tsx               # Root layout: wraps every page with Header + Footer + metadata + JSON-LD
│   ├── globals.css              # Tailwind directives + custom utility classes (rgba borders, bg-nav, hover variants)
│   ├── not-found.tsx            # 404 page
│   ├── page.tsx                 # Route: /
│   ├── baubegleitung/page.tsx   # Route: /baubegleitung
│   ├── anfrage/
│   │   ├── page.tsx             # Route: /anfrage (layout + contact methods + process steps)
│   │   └── AnfrageForm.tsx      # Client component: RHF + Zod form, file upload, success state
│   ├── kosteneinschaetzung/
│   │   └── page.tsx             # Route: /kosteneinschaetzung — renders <CalculatorShell /> only
│   ├── impressum/page.tsx       # Route: /impressum
│   └── datenschutz/page.tsx     # Route: /datenschutz
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Sticky nav, desktop links, mobile drawer (ESC + backdrop + route-close)
│   │   └── Footer.tsx           # Copyright + legal nav links (Impressum, Datenschutz, Kontakt)
│   └── ui/
│       ├── Button.tsx           # <Button> (button element) + <ButtonLink> (Next Link) — variants: primary | ghost
│       └── SectionContainer.tsx # <SectionContainer size="default|sm"> + <SectionHeader eyebrow title subtitle>
│
├── features/
│   └── calculator/              # Self-contained module — only entry point is CalculatorShell.tsx
│       ├── CalculatorShell.tsx  # Orchestrator: progress bar, step bubbles, step routing, nav buttons
│       ├── types.ts             # StepId union, StepMeta, CalculatorState, INITIAL_STATE, STEPS array
│       ├── hooks/
│       │   └── useCalculator.ts # All state logic: setters, next/back navigation, validation, reset
│       └── steps/
│           ├── StepObjekt.tsx   # Step 1 — object type radio + m² picker
│           ├── StepProjekt.tsx  # Step 2 — project type radio (flags direct-Anfrage types)
│           ├── StepOptionen.tsx # Step 3 — flat-rate checkbox options (reads FLAT_OPTIONS from config)
│           ├── StepAusstattung.tsx # Step 4 — quantity pickers (conditional: shown only if parent option selected)
│           ├── StepMaterial.tsx # Step 5 — material grade radio (reads MATERIAL_MULTIPLIERS from config)
│           ├── StepErgebnis.tsx # Step 6 — price result + breakdown (calls calculatePrice())
│           └── StepAnfrage.tsx  # Step 7 — CTA to /anfrage (handles both direct-Anfrage and post-calculation flows)
│
├── config/
│   └── pricing.ts               # Single source of truth for ALL pricing data and logic (see below)
│
├── lib/
│   └── utils.ts                 # cn() — Tailwind class merger (clsx + tailwind-merge)
│
├── docs/                        # Internal LLM editing documentation
│   ├── ARCHITECTURE_MAP.md      # This file
│   ├── EDIT_SCOPES.md           # Minimal file-load scopes per task
│   ├── CALCULATOR_PLAN.md       # Calculator module responsibilities and evolution plan
│   └── KNOWN_RISKS.md           # Unresolved issues and structural risks
│
├── public/                      # Static assets (currently empty)
├── next.config.js               # Minimal Next.js config (must be .js not .ts for Next 14.2.5)
├── tailwind.config.ts           # Color tokens, font families, maxWidth, borderRadius extensions
├── tsconfig.json                # Strict mode, @/* path alias
├── postcss.config.js            # Required for Tailwind
├── vercel.json                  # framework: "nextjs" — required for Vercel to detect the project
└── package.json                 # next@14.2.5, react-hook-form, zod, @hookform/resolvers, clsx, tailwind-merge
```

---

## Key File Responsibilities

### `app/layout.tsx`
- Defines global `<Metadata>` used by all pages (title template, description, OG tags)
- Injects `LocalBusiness` JSON-LD schema via `<script type="application/ld+json">`
- Renders `<Header />`, `<main id="main">`, `<Footer />` around all page content
- Contains the skip-nav link for keyboard accessibility
- **Edit here for:** global SEO, schema data, font loading strategy, skip-nav

### `app/globals.css`
- `@import` for Google Fonts **must remain before** `@tailwind` directives (CSS spec)
- Custom utilities in `@layer utilities`: all rgba border/background values that Tailwind JIT cannot generate from hex colors with opacity modifiers
- Critical classes: `.bg-nav`, `.bg-drawer`, `.border-subtle`, `.border-muted`, `.border-strong`, `.bg-gold-tint`, `.hover:border-muted` etc.
- **Edit here for:** adding new rgba color utilities, font changes, global base styles

### `config/pricing.ts`
- No UI code. No JSX. Pure TypeScript data and logic.
- Exports: type aliases, base price constants, multiplier records, `FLAT_OPTIONS[]`, `QUANTITY_ITEMS[]`, `calculatePrice()`, human-readable label maps
- `DIRECT_ANFRAGE_TYPES` controls which project types skip calculation and redirect to Anfrage
- `calculatePrice()` is the only place arithmetic happens — all step components are display-only
- **Edit here for:** adjusting prices, adding options, changing multipliers, modifying the calculation formula

### `components/ui/Button.tsx`
- Ghost variant border is set via `style` prop (not Tailwind class) — intentional, avoids JIT purge
- Do not move the border back to a class string without adding it to `globals.css` safelist

### `components/ui/SectionContainer.tsx`
- `size="sm"` reduces vertical padding — used for the calculator teaser section on the homepage
- `SectionHeader` keeps consistent eyebrow/title/subtitle rhythm across all pages

### `tailwind.config.ts`
- Color tokens: `bg.DEFAULT/2/3/4`, `gold.DEFAULT/light`, `text.1/2/3/4`, `danger`, `success`
- These tokens are used throughout JSX; renaming them requires a project-wide find/replace
- `maxWidth.site = 1080px` — used as `max-w-site` on all container divs

---

## Data Flow: Calculator

```
config/pricing.ts          → defines all data (prices, options, labels)
         ↓
features/calculator/types.ts       → defines CalculatorState shape and STEPS array
         ↓
features/calculator/hooks/useCalculator.ts  → manages state, exposes setters + next/back
         ↓
features/calculator/CalculatorShell.tsx     → orchestrates rendering, progress, nav
         ↓
features/calculator/steps/Step*.tsx         → receive props only, no internal state, no pricing
```

Step components are intentionally stateless. All state lives in `useCalculator`. All pricing logic lives in `config/pricing.ts`.
