# Edit Scopes

> Minimal file sets to load per task. Loading fewer files = less token waste + less hallucination risk. Do not load files outside the listed scope unless a specific cross-file dependency is mentioned.

---

## Homepage Content or Layout

**Files to load:**
```
app/page.tsx
components/ui/Button.tsx          (if changing CTAs)
components/ui/SectionContainer.tsx (if changing section structure)
```

**Do not load:** Header, Footer, globals.css, calculator files

**Notes:**
- All homepage sections are in one file (`app/page.tsx`) — no sub-components
- TRUST_ITEMS, SERVICES, CALC_STEPS, PROOF arrays are defined inline at the top of the file
- Borders use inline `style` props, not Tailwind border classes

---

## Baubegleitung Page

**Files to load:**
```
app/baubegleitung/page.tsx
```

**Do not load:** anything else unless changing shared components

**Notes:**
- BENEFITS array is defined inline — edit content there directly
- CTA at the bottom links to `/anfrage` — no logic, just a ButtonLink

---

## Inquiry Form (Anfrage)

**Files to load:**
```
app/anfrage/AnfrageForm.tsx
app/anfrage/page.tsx              (if changing layout, contact methods, or process steps)
```

**Do not load:** layout files, calculator files

**Notes:**
- Zod schema is defined at the top of `AnfrageForm.tsx` — edit validation rules there
- `onSubmit` contains the placeholder API call — replace the `await new Promise(...)` with a real `fetch`
- File upload logic is in `addFiles()` — MIME types and size limit are hardcoded there
- `useId()` is used for all field IDs — do not add manual `id` strings; extend the `id()` helper instead
- PROJEKTARTEN array is inline in `AnfrageForm.tsx`
- Contact methods (WhatsApp, phone, email) are in `app/anfrage/page.tsx` as the CONTACT_METHODS array

---

## Layout / Navigation / Footer

**Files to load:**
```
components/layout/Header.tsx
components/layout/Footer.tsx
app/layout.tsx                    (if changing global metadata, JSON-LD, or skip-nav)
```

**Do not load:** page files, calculator files

**Notes:**
- NAV_LINKS array in `Header.tsx` controls desktop + mobile nav items (excluding the CTA)
- The CTA "Anfrage stellen" is hardcoded separately in both desktop and mobile sections
- Mobile drawer uses `position: fixed` — do not change to `sticky` or `absolute`
- Footer legal links are a hardcoded array — add new links there directly
- `bg-nav` and `bg-drawer` classes are defined in `globals.css` — if renaming, update both files

---

## Calculator UI (Visual / Step Content Changes)

**Files to load:**
```
features/calculator/CalculatorShell.tsx   (progress bar, step bubbles, nav buttons)
features/calculator/steps/Step[Name].tsx  (only the specific step being changed)
features/calculator/types.ts              (if changing step labels or adding a step)
```

**Do not load:** `useCalculator.ts`, `config/pricing.ts` unless logic is also changing

**Notes:**
- Step components receive all data as props — they have no internal state
- Conditional rendering in `StepAusstattung` (showing/hiding quantity fields) is driven by `selectedOptions` prop passed from the shell
- Step labels shown in the progress bubbles come from `STEPS` array in `types.ts`
- Visual-only changes to a single step require only that step's file

---

## Calculator Logic (State / Navigation / Pricing)

**Files to load:**
```
config/pricing.ts
features/calculator/hooks/useCalculator.ts
features/calculator/types.ts
```

**Also load if the change affects what a step renders:**
```
features/calculator/steps/StepErgebnis.tsx   (reads calculatePrice output)
features/calculator/steps/StepAusstattung.tsx (conditional on selectedOptions)
features/calculator/steps/StepAnfrage.tsx    (handles direct-Anfrage routing)
```

**Do not load:** CalculatorShell, UI step files, page files

**Notes:**
- `DIRECT_ANFRAGE_TYPES` in `config/pricing.ts` controls which project types skip to Anfrage
- The `next()` function in `useCalculator.ts` contains all step-transition logic including the direct-Anfrage bypass
- `calculatePrice()` in `config/pricing.ts` is pure — no side effects, safe to edit in isolation
- Adding a new pricing option requires: (1) add to `FLAT_OPTIONS` or `QUANTITY_ITEMS` in `config/pricing.ts`, (2) update `calculatePrice()` if it needs special handling

---

## Legal Pages (Impressum / Datenschutz)

**Files to load:**
```
app/impressum/page.tsx
app/datenschutz/page.tsx
```

**Do not load:** anything else

**Notes:**
- Both pages use `SectionContainer` but import it — no need to load that component
- Both have `robots: { index: false, follow: false }` metadata — intentional, keep it
- Placeholder markers (`{/* TODO */}`) indicate where real contact data needs to be filled in

---

## SEO / Metadata

**Files to load:**
```
app/layout.tsx                    (global metadata, JSON-LD schema)
app/page.tsx                      (homepage title override)
app/[route]/page.tsx              (per-page title + description)
```

**Do not load:** component files, calculator files

**Notes:**
- Title template is `'%s | Laha Baudienstleistungen'` — set in `layout.tsx`
- Each page exports its own `metadata` object to override title/description
- JSON-LD `LocalBusiness` schema is in `layout.tsx` as the `jsonLd` const — telephone, email, address are placeholders
- OG image is not yet set — add `openGraph.images` to `layout.tsx` metadata when an image exists

---

## Adding a New Page / Route

**Files to load:**
```
app/layout.tsx                    (understand the shell)
components/ui/SectionContainer.tsx (for consistent layout pattern)
components/ui/Button.tsx          (for CTAs)
app/[closest-existing-page]/page.tsx  (as a reference pattern)
```

**Pattern:** Create `app/[route]/page.tsx`, export `metadata`, use `SectionContainer` + `SectionHeader`, link from `Header.tsx` NAV_LINKS and `Footer.tsx` if needed.

---

## Tailwind / Styling Tokens

**Files to load:**
```
tailwind.config.ts
app/globals.css
```

**Notes:**
- Never use `bg-bg/90` syntax — hex colors don't support Tailwind opacity modifiers. Use `.bg-nav` / `.bg-drawer` or add a new named utility in `globals.css`
- All rgba border values must be in `style` props or defined as named utilities in `globals.css`
- Do not add new color tokens to `tailwind.config.ts` without also adding their rgba variants to `globals.css` if opacity variants are needed
