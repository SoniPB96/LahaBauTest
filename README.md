# Laha Baudienstleistungen

Production website for Laha Baudienstleistungen, Paderborn — built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/                          # Next.js App Router pages
  layout.tsx                  # Root layout (Header, Footer, metadata, JSON-LD)
  page.tsx                    # Homepage /
  baubegleitung/page.tsx      # /baubegleitung
  anfrage/
    page.tsx                  # /anfrage
    AnfrageForm.tsx           # Client form component (RHF + Zod)
  kosteneinschaetzung/
    page.tsx                  # /kosteneinschaetzung
  impressum/page.tsx          # /impressum
  datenschutz/page.tsx        # /datenschutz

components/
  layout/
    Header.tsx                # Sticky nav, mobile drawer
    Footer.tsx                # Footer with legal links
  ui/
    Button.tsx                # ButtonLink + Button (primary / ghost)
    SectionContainer.tsx      # Section wrapper + SectionHeader

features/
  calculator/
    CalculatorShell.tsx       # Orchestrator: progress, step routing, nav
    types.ts                  # StepId, CalculatorState, STEPS, INITIAL_STATE
    hooks/
      useCalculator.ts        # All state logic, next/back, validation
    steps/
      StepObjekt.tsx          # Step 1 – object type + m²
      StepProjekt.tsx         # Step 2 – project type
      StepOptionen.tsx        # Step 3 – flat-rate options
      StepAusstattung.tsx     # Step 4 – quantities (conditional)
      StepMaterial.tsx        # Step 5 – material grade
      StepErgebnis.tsx        # Step 6 – result + breakdown
      StepAnfrage.tsx         # Step 7 – next-step CTA

config/
  pricing.ts                  # Single source of truth for all prices and logic

lib/
  utils.ts                    # cn() utility
```

---

## Before Launch – Required Changes

### 1. Contact details
Update the following placeholder values across the project:

| File | What to update |
|---|---|
| `app/impressum/page.tsx` | Legal name, address, responsible person |
| `app/datenschutz/page.tsx` | Contact details |
| `app/anfrage/page.tsx` | WhatsApp link (`wa.me/…`), phone number, email |
| `app/layout.tsx` (JSON-LD) | telephone, email |

### 2. Form submission
`app/anfrage/AnfrageForm.tsx` contains a placeholder `await new Promise(…)` where the real API call belongs.

Options:
- **Resend** (recommended): Create `app/api/anfrage/route.ts`, call Resend API, send email
- **Formspree**: Replace the fetch with `https://formspree.io/f/{your-id}`
- **Custom backend**: POST to your own endpoint

### 3. Legal review
`/impressum` and `/datenschutz` are structurally complete but must be reviewed and completed by a German legal professional before going live.

### 4. Pricing calibration
All prices live in `config/pricing.ts`. Adjust `BASE_PRICES`, `PRICE_PER_SQM_ABOVE_BASELINE`, and `QUANTITY_ITEMS[].pricePerUnit` to match actual cost structures. No UI changes required.

---

## Deploy to Vercel

### Option A – GitHub + Vercel (recommended)

```bash
# 1. Create a new GitHub repository, then:
git init
git add .
git commit -m "feat: initial production build"
git remote add origin https://github.com/YOUR_USERNAME/laha-baudienstleistungen.git
git push -u origin main
```

Then go to [vercel.com](https://vercel.com):
1. Click **Add New Project**
2. Import your GitHub repository
3. Leave all settings as default (Next.js auto-detected)
4. Click **Deploy**

### Option B – Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## Environment Variables

No environment variables are required for the foundation build.

When wiring the contact form to a real email provider, add:

```env
# .env.local (never commit this file)
RESEND_API_KEY=re_...
CONTACT_EMAIL=info@laha-bau.de
```

---

## Build & Type Check

```bash
npm run build     # Production build
npm run lint      # ESLint
```
