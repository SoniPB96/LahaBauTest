// ─────────────────────────────────────────────────────────────
// Pricing Engine – Laha Baudienstleistungen
// All prices in EUR net (excl. VAT).
// UI components must never contain pricing logic.
// Only import from this file.
// ─────────────────────────────────────────────────────────────

// ── Core domain types ─────────────────────────────────────────
export type StartMode  = 'schnell' | 'genauer'
export type ObjektType = 'wohnung' | 'haus'
export type ProjektType =
  | 'neubau'
  | 'altbau'
  | 'komplettsanierung'
  | 'teilsanierung'
  | 'zaehler'
  | 'sonderfall'
export type QualitaetType = 'einfach' | 'standard' | 'premium'

// ── Project types that cannot be auto-calculated ──────────────
// These receive a dedicated explanation step, then route to Anfrage.
export const DIRECT_ANFRAGE_TYPES: ProjektType[] = [
  'komplettsanierung',
  'teilsanierung',
  'zaehler',
  'sonderfall',
]

// ── Base prices per object × project combination ──────────────
// Reference: 80 m², 4 rooms, 1 bathroom.
// These are V1 rough estimates — intentionally displayed as ranges.
export const BASE_PRICES: Record<ObjektType, Record<'neubau' | 'altbau', number>> = {
  wohnung: { neubau: 5800,  altbau: 4200  },
  haus:    { neubau: 9500,  altbau: 7200  },
}

// ── Per-m² rate above the 80 m² baseline ─────────────────────
export const PRICE_PER_SQM_ABOVE_BASELINE = 28 // EUR per m²
export const BASELINE_SQM = 80

// ── Per-room surcharge (above 4 rooms baseline) ───────────────
export const PRICE_PER_ROOM_ABOVE_BASELINE = 350
export const BASELINE_ROOMS = 4

// ── Per-bathroom surcharge (above 1 bathroom baseline) ────────
export const PRICE_PER_BATHROOM_ABOVE_BASELINE = 600
export const BASELINE_BATHROOMS = 1

// ── Quality multipliers ────────────────────────────────────────
// Applied to the full subtotal before display rounding.
export const QUALITAET_MULTIPLIERS: Record<QualitaetType, number> = {
  einfach:  0.85,
  standard: 1.00,
  premium:  1.25,
}

// ── Display range spread ───────────────────────────────────────
// Result is shown as a range: [total * (1 - RANGE_SPREAD), total * (1 + RANGE_SPREAD)]
// Keeps honesty: this is an orientation, not a quote.
export const RANGE_SPREAD = 0.15

// ── Add-on modules (flat price each) ─────────────────────────
export interface AddOnModule {
  id: string
  label: string
  description: string
  price: number
}

export const ADD_ON_MODULES: AddOnModule[] = [
  {
    id: 'lan',
    label: 'LAN / Netzwerk',
    description: 'Netzwerkverkabelung in alle Räume',
    price: 1200,
  },
  {
    id: 'fussbodenheizung',
    label: 'Fußbodenheizung',
    description: 'Elektrische Flächenheizung',
    price: 1800,
  },
  {
    id: 'jalousien',
    label: 'Elektrische Jalousien',
    description: 'Motorisierte Rollläden oder Jalousien',
    price: 900,
  },
  {
    id: 'wallbox',
    label: 'Wallbox (E-Auto)',
    description: 'Ladestation inkl. Zuleitung und Absicherung',
    price: 1350,
  },
]

// ── Fine-adjustment items (only shown in "Etwas genauer" mode) ─
export interface FineItem {
  id: string
  label: string
  description: string
  pricePerUnit: number
  defaultQty: number
  min: number
  max: number
}

export const FINE_ITEMS: FineItem[] = [
  {
    id: 'steckdosen',
    label: 'Zusätzliche Steckdosen',
    description: 'Pro Steckdose / Schalter',
    pricePerUnit: 55,
    defaultQty: 0,
    min: 0,
    max: 40,
  },
  {
    id: 'netzwerkdosen',
    label: 'Netzwerkdosen (RJ45)',
    description: 'Pro Dose (nur mit LAN-Modul sinnvoll)',
    pricePerUnit: 95,
    defaultQty: 0,
    min: 0,
    max: 30,
  },
  {
    id: 'thermostate',
    label: 'Raumthermostate',
    description: 'Pro Thermostat',
    pricePerUnit: 185,
    defaultQty: 0,
    min: 0,
    max: 15,
  },
  {
    id: 'jalousien_qty',
    label: 'Jalousien-Antriebe',
    description: 'Pro Motor / Fenstergruppe',
    pricePerUnit: 220,
    defaultQty: 0,
    min: 0,
    max: 20,
  },
]

// ─────────────────────────────────────────────────────────────
// Calculation
// ─────────────────────────────────────────────────────────────

export interface CalculatorInput {
  objekt: ObjektType
  projekt: 'neubau' | 'altbau'
  m2: number
  rooms: number
  bathrooms: number
  addOns: string[]
  fineQty: Record<string, number>
  qualitaet: QualitaetType
}

export interface PriceResult {
  /** Lower bound of the range (rounded to nearest 100) */
  low: number
  /** Upper bound of the range (rounded to nearest 100) */
  high: number
  /** Midpoint, for reference in breakdown */
  mid: number
}

export function calculatePrice(input: CalculatorInput): PriceResult {
  const { objekt, projekt, m2, rooms, bathrooms, addOns, fineQty, qualitaet } = input

  // Base
  const base = BASE_PRICES[objekt][projekt]

  // Size adjustment
  const sizeAdj = Math.max(0, m2 - BASELINE_SQM) * PRICE_PER_SQM_ABOVE_BASELINE

  // Room adjustment
  const roomAdj = Math.max(0, rooms - BASELINE_ROOMS) * PRICE_PER_ROOM_ABOVE_BASELINE

  // Bathroom adjustment
  const bathAdj = Math.max(0, bathrooms - BASELINE_BATHROOMS) * PRICE_PER_BATHROOM_ABOVE_BASELINE

  // Add-on modules
  const addOnTotal = ADD_ON_MODULES
    .filter((m) => addOns.includes(m.id))
    .reduce((sum, m) => sum + m.price, 0)

  // Fine adjustments
  const fineTotal = FINE_ITEMS.reduce((sum, item) => {
    return sum + (fineQty[item.id] ?? 0) * item.pricePerUnit
  }, 0)

  const subtotal = base + sizeAdj + roomAdj + bathAdj + addOnTotal + fineTotal

  // Quality multiplier
  const qualMul = QUALITAET_MULTIPLIERS[qualitaet]
  const mid = subtotal * qualMul

  // Range
  const low  = Math.round((mid * (1 - RANGE_SPREAD)) / 100) * 100
  const high = Math.round((mid * (1 + RANGE_SPREAD)) / 100) * 100

  return { low, high, mid: Math.round(mid / 100) * 100 }
}

// ─────────────────────────────────────────────────────────────
// Human-readable labels
// ─────────────────────────────────────────────────────────────

export const OBJEKT_LABELS: Record<ObjektType, string> = {
  wohnung: 'Wohnung',
  haus:    'Haus',
}

export const PROJEKT_LABELS: Record<ProjektType, string> = {
  neubau:           'Neubau',
  altbau:           'Altbau / Bestand',
  komplettsanierung:'Komplettsanierung',
  teilsanierung:    'Teil-Erneuerung / Nachinstallation',
  zaehler:          'Zählerschrank / Unterverteilung',
  sonderfall:       'Sonderfall',
}

export const QUALITAET_LABELS: Record<QualitaetType, string> = {
  einfach:  'Einfach',
  standard: 'Standard',
  premium:  'Premium',
}

// Why a direct-Anfrage project type can't be auto-calculated — shown to the user
export const DIRECT_ANFRAGE_REASONS: Record<string, string> = {
  komplettsanierung:
    'Eine Komplettsanierung hängt stark vom Zustand des Gebäudes ab. Ohne eine kurze Einschätzung vor Ort können wir keinen sinnvollen Richtwert geben.',
  teilsanierung:
    'Bei Teil-Erneuerungen und Nachinstallationen kommt es sehr auf den bestehenden Zustand und den genauen Umfang an. Das lässt sich nicht pauschal berechnen.',
  zaehler:
    'Zählerschrank und Unterverteilungen variieren stark je nach Hausanschluss, Verteilertyp und lokalem Netzbetreiber. Dafür brauchen wir ein kurzes Gespräch.',
  sonderfall:
    'Für besondere Vorhaben erstellen wir Ihnen gerne ein individuelles Angebot – kontaktieren Sie uns einfach direkt.',
}
