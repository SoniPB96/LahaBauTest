# Calculator Plan

> Current state, intended responsibility split, and evolution guidance. Do not redesign the module structure — extend within it.

---

## Current State (as built)

The calculator is a fully functional 7-step multi-step flow embedded at `/kosteneinschaetzung`. It is isolated in `features/calculator/` and exposed to the rest of the app only through `CalculatorShell.tsx`.

### Step Flow

```
Step 1 — objekt      Object type (EFH/DG/ETW/ZFH) + m² input
Step 2 — projekt     Project type — triggers direct-Anfrage bypass for 'erweiterung' and 'zaehler'
Step 3 — optionen    Flat-rate options (wallbox, PV prep, LAN, floor heating, smoke detectors)
Step 4 — ausstattung Quantity pickers — conditionally shown based on Step 3 selections
Step 5 — material    Material grade (standard / premium / design)
Step 6 — ergebnis    Calculated result with line-item breakdown
Step 7 — anfrage     CTA to /anfrage — context-aware (post-calculation vs direct-Anfrage)
```

### Bypass Logic

When `projekt` is `'erweiterung'` or `'zaehler'`, the `next()` function in `useCalculator.ts` skips steps 3–6 and jumps directly to step 7. This is controlled by `DIRECT_ANFRAGE_TYPES` in `config/pricing.ts`.

---

## Responsibility Split

### `config/pricing.ts` — Data and arithmetic only
**Is:** The single source of truth for all prices, multipliers, option definitions, and the `calculatePrice()` function.
**Must stay:** Pure TypeScript. No React, no JSX, no imports from features/. Fully testable in isolation.
**Do not add:** UI labels that belong in step components, state management, conditional rendering logic.
**Extend by:** Adding entries to `FLAT_OPTIONS[]` or `QUANTITY_ITEMS[]`. Editing `BASE_PRICES`, multipliers, or the `calculatePrice()` formula.

### `features/calculator/types.ts` — Shape definitions only
**Is:** `StepId` union, `StepMeta` interface, `CalculatorState` interface, `STEPS` array, `INITIAL_STATE`.
**Must stay:** No logic, no React. Pure type and constant definitions.
**Do not add:** Business logic, pricing imports beyond type re-exports.
**Extend by:** Adding a new `StepId` value and corresponding entry to `STEPS[]` if a new step is introduced.

### `features/calculator/hooks/useCalculator.ts` — State and navigation only
**Is:** All `useState` and `useCallback` logic. Exposes setters and the `next()` / `back()` / `reset()` functions to the shell.
**Must stay:** No JSX, no direct pricing imports beyond `DIRECT_ANFRAGE_TYPES`. Navigation rules live here.
**Do not add:** UI rendering, direct `calculatePrice()` calls (that belongs in `StepErgebnis`).
**Extend by:** Adding new setter if a new field is added to `CalculatorState`. Updating `next()` if step routing changes.

### `features/calculator/CalculatorShell.tsx` — Orchestration only
**Is:** Reads state from `useCalculator`, renders the progress bar + step bubbles, switches between step components, renders nav buttons.
**Must stay:** No pricing logic, no direct state mutations. Should not import from `config/pricing.ts`.
**Do not add:** Business rules, form validation, calculation rendering.
**Extend by:** Adding a new `{state.currentStep === 'newstep' && <StepNewStep />}` block and the corresponding nav visibility rule.

### `features/calculator/steps/Step*.tsx` — Display only
**Is:** Stateless presentational components. Receive all data as props. Emit user actions via callback props.
**Must stay:** No `useState` (except purely cosmetic hover states if needed). No direct imports from `config/pricing.ts` except to read labels and option arrays for display.
**Allowed imports from pricing:** `FLAT_OPTIONS`, `QUANTITY_ITEMS`, `MATERIAL_MULTIPLIERS`, `*_LABELS` maps.
**Not allowed:** Calling `calculatePrice()` — that is `StepErgebnis`'s exclusive responsibility.
**Extend by:** Adding new props. Adding new UI within the existing component.

---

## What Is Already Stable (Do Not Change)

| Part | Status |
|---|---|
| `config/pricing.ts` export shape | Stable — all consumers depend on these exports |
| `CalculatorState` interface in `types.ts` | Stable — changing field names requires updating hook + shell + all steps |
| `STEPS` array order | Stable — `index` values drive progress bar percentage |
| `useCalculator` API surface (exported names) | Stable — shell and steps depend on these |
| Step component prop interfaces | Stable individually — but isolated, so safe to extend per-component |
| Direct-Anfrage bypass in `next()` | Stable logic — controlled only via `DIRECT_ANFRAGE_TYPES` in pricing config |

---

## Planned Extensions (Not Yet Built)

### Form pre-fill from calculator result
After Step 7, the user navigates to `/anfrage`. The calculated result and selected options are currently not passed to the form. Options:
- Add URL query params in `StepAnfrage.tsx` when navigating to `/anfrage`
- Use `sessionStorage` to persist result (add in `StepErgebnis.tsx` before navigation)
- Recommended: query params — simpler, no extra state, works on direct links

### Email submission for inquiry form
`app/anfrage/AnfrageForm.tsx` has a placeholder `await new Promise(...)` in `onSubmit`. Replace with:
```ts
await fetch('/api/anfrage', { method: 'POST', body })
```
Then create `app/api/anfrage/route.ts` using Resend or Nodemailer.

### Calculator result summary in Anfrage form
`StepAnfrage.tsx` already shows a summary chip with object type and project type. This could be extended to include the calculated price if pre-fill is implemented.

---

## Anti-Patterns to Avoid

- **Do not put prices in JSX.** All numbers must come from `config/pricing.ts`.
- **Do not put navigation logic in step components.** Step components call `onNext` / `onBack` props — they do not import `useCalculator`.
- **Do not add `useState` to step components** for data that belongs to `CalculatorState`. Add the field to `CalculatorState` and a setter to `useCalculator` instead.
- **Do not import `calculatePrice` outside `StepErgebnis`.** It is a pure function but its result should only be displayed in one place.
