# Known Risks

> Unresolved issues and structural risks as of the last QA pass. Keep this file updated as issues are resolved or discovered.

---

## Structural Risks

**S1 — Google Fonts loaded via external `@import` (no self-hosting)**
Impact: GDPR risk for German audience (Google receives visitor IPs). Performance risk (render-blocking external request).
Resolution: Self-host fonts using `next/font/google` in `app/layout.tsx`, remove the `@import` from `globals.css`.
Priority: High before launch.

**S2 — No API route for form submission**
Impact: `AnfrageForm.tsx` simulates submission with `await new Promise(...)`. No real email is sent. The success state shown to users is currently fake.
Resolution: Create `app/api/anfrage/route.ts`, wire to Resend or equivalent, replace the placeholder in `onSubmit`.
Priority: Critical before launch.

**S3 — Placeholder contact data throughout**
Impact: WhatsApp link (`wa.me/4915200000000`), phone (`tel:+495251000000`), email (`info@laha-bau.de`), and address in `impressum/page.tsx` and `datenschutz/page.tsx` are all placeholders.
Resolution: Replace with real data in: `app/anfrage/page.tsx`, `app/impressum/page.tsx`, `app/datenschutz/page.tsx`, `app/layout.tsx` (JSON-LD schema).
Priority: Critical before launch.

**S4 — Legal pages are incomplete drafts**
Impact: `impressum/page.tsx` and `datenschutz/page.tsx` have structural shape but missing real legal content. In Germany, an incomplete Impressum is an abmahnable offence.
Resolution: Have a German lawyer review and complete both pages.
Priority: Critical before launch.

**S5 — No OG image defined**
Impact: Social shares show no preview image. `openGraph.images` is absent from `app/layout.tsx` metadata.
Resolution: Create a static OG image (1200×630px), place in `/public`, add to `layout.tsx` metadata.
Priority: Medium.

**S6 — `public/` directory is empty**
Impact: No favicon. Browser shows default icon. Some Vercel deployments may show warnings.
Resolution: Add `favicon.ico` and `apple-touch-icon.png` to `/public`.
Priority: Medium before launch.

---

## Calculator Risks

**C1 — No persistence across page navigations**
Impact: If a user starts the calculator, navigates away, and returns, state resets to `INITIAL_STATE`. The `initCalc` equivalent (`CalculatorShell` mount) always starts fresh.
Resolution: Optionally persist state to `sessionStorage` on state change and rehydrate on mount. Only do this if user research confirms it's a problem — adds complexity.
Priority: Low.

**C2 — m² input has no free-text entry**
Impact: Users can only change m² in increments of 10 via +/- buttons. A 125m² house requires 5 taps from 80. A user with an irregular size (e.g. 97m²) cannot enter it directly.
Resolution: Add an `<input type="number">` alongside the stepper in `StepObjekt.tsx`, or replace stepper with a range slider.
Priority: Low (acceptable for first version).

**C3 — Calculator result is not passed to the Anfrage form**
Impact: When users complete the calculator and proceed to `/anfrage`, the form has no pre-filled context about what was calculated. The operator receives an inquiry with no reference to the calculator result.
Resolution: Pass result via URL query params from `StepAnfrage.tsx`, read in `AnfrageForm.tsx` to pre-populate `projektart` and add a hidden field with the estimate.
Priority: Medium — improves lead quality significantly.

**C4 — Pricing values are not validated at runtime**
Impact: If `config/pricing.ts` is edited incorrectly (e.g. a `BASE_PRICES` value set to `undefined`), `calculatePrice()` will silently return `NaN` and display "ab NaN €". No error boundary exists.
Resolution: Add a Zod schema or simple runtime assertion to `calculatePrice()` that throws a descriptive error if inputs are invalid. Wrap `StepErgebnis` in an error boundary.
Priority: Low (risk only arises when editing pricing.ts).

---

## Inquiry / Form Risks

**F1 — File uploads are not wired to a backend**
Impact: Files selected in the upload zone are held in React state only. When the form is submitted (once a real API route exists), files are appended to `FormData` — but if the API route doesn't accept multipart, they'll be silently dropped.
Resolution: Ensure `app/api/anfrage/route.ts` handles `multipart/form-data`. Consider size limits on the Vercel function (default 4.5MB body limit — conflicts with the 10MB per-file UI promise).
Priority: High when wiring the API route. The 10MB UI label should be lowered to 4MB or the route must use an external upload service.

**F2 — Form grid is 2-column on small screens**
Impact: The `grid-cols-2` for Vorname/Nachname and E-Mail/Telefon collapses to `grid-cols-1 sm:grid-cols-2`. On screens narrower than 640px (the `sm` breakpoint), the two-column layout may feel cramped.
Resolution: Already uses `sm:grid-cols-2` — acceptable. Monitor with real device testing.
Priority: Low.

**F3 — No rate limiting or spam protection on the form**
Impact: Once a real API route exists, the form has no CAPTCHA, honeypot, or rate limiting. Open to spam.
Resolution: Add a honeypot field (hidden via CSS, reject submissions where it's filled), or integrate Cloudflare Turnstile / hCaptcha.
Priority: Medium — implement alongside the real API route.

---

## Content / Design Risks

**D1 — Social proof numbers are not real**
Impact: Homepage shows "48h Rückmeldung garantiert" and "100% Festpreisangebote" as marketing claims. If the business cannot consistently deliver these, they create expectation mismatches.
Resolution: Confirm with the business owner that these are accurate before launch. Adjust copy if needed.
Priority: Verify before launch.

**D2 — No real project photos or portfolio**
Impact: The website communicates entirely through copy. There are no project images, before/after photos, or visual proof of work quality. For a premium service brand this is a trust gap.
Resolution: Add a portfolio section or at minimum 1–2 project photos once available. The homepage Services section or a dedicated page is the natural location.
Priority: Medium — acceptable for V1, plan for V2.

**D3 — Trust bar copy is partially generic**
Impact: "Zuverlässige Partnerbetriebe" is a claim, not a verifiable fact from the visitor's perspective. It carries low trust weight.
Resolution: Replace with a more specific or verifiable signal when available (e.g. "Mitglied im Elektrohandwerk OWL" or a partner logo if permitted).
Priority: Low.
