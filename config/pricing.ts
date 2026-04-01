// ─────────────────────────────────────────────────────────────
// Pricing Engine – Laha Baudienstleistungen
// All prices in EUR net (excl. VAT).
// UI components must never contain pricing logic.
// Only import from this file.
// ─────────────────────────────────────────────────────────────

export type ObjektType = 'EFH' | 'DG' | 'ETW' | 'ZFH'
export type ProjektType = 'sanierung' | 'modernisierung' | 'erweiterung' | 'zaehler'
export type MaterialType = 'standard' | 'premium' | 'design'

// ── Project types that cannot be auto-calculated ──────────────
export const DIRECT_ANFRAGE_TYPES: ProjektType[] = ['erweiterung', 'zaehler']

// ── Base prices per object type (80 m² reference) ────────────
export const BASE_PRICES: Record<ObjektType, number> = {
  EFH: 4800,
  ZFH: 7200,
  DG: 3200,
  ETW: 2200,
}

// ── Per-m² surcharge above the 80 m² baseline ────────────────
export const PRICE_PER_SQM_ABOVE_BASELINE = 9 // EUR per m²
export const BASELINE_SQM = 80

// ── Project type multipliers ──────────────────────────────────
export const PROJEKT_MULTIPLIERS: Record<ProjektType, number | null> = {
  sanierung: 1.0,
  modernisierung: 0.72,
  erweiterung: null, // → direct Anfrage
  zaehler: null,     // → direct Anfrage
}

// ── Material multipliers ──────────────────────────────────────
export const MATERIAL_MULTIPLIERS: Record<MaterialType, number> = {
  standard: 1.0,
  premium: 1.18,
  design: 1.34,
}

// ── Flat-rate options (one-time add-on per selection) ─────────
export interface FlatOption {
  id: string
  label: string
  description: string
  price: number
  /** If true, selecting this enables a quantity field */
  enablesQuantityField?: string
}

export const FLAT_OPTIONS: FlatOption[] = [
  {
    id: 'ladestation',
    label: 'E-Auto-Ladestation (Wallbox)',
    description: 'Inklusive Zuleitung, Absicherung und Montage',
    price: 1350,
  },
  {
    id: 'photovoltaik',
    label: 'Photovoltaik-Vorbereitung',
    description: 'Leerrohrverlegung und Vorbereitung Einspeisepunkt',
    price: 680,
  },
  {
    id: 'lan',
    label: 'LAN / Netzwerk',
    description: 'Strukturierte Netzwerkverkabelung',
    price: 0,
    enablesQuantityField: 'netzwerkdosen',
  },
  {
    id: 'heizung',
    label: 'Fußbodenheizung (elektrisch)',
    description: 'Elektrische Flächenheizung',
    price: 0,
    enablesQuantityField: 'raumthermostate',
  },
  {
    id: 'rauchwarnmelder',
    label: 'Rauchwarnmelder',
    description: 'Vernetzt, nach DIN 14676',
    price: 0,
    enablesQuantityField: 'rauchwarnmelder_qty',
  },
]

// ── Quantity-based line items ─────────────────────────────────
export interface QuantityItem {
  id: string
  label: string
  description: string
  pricePerUnit: number
  defaultQty: number
  min: number
  max: number
  /** Which flat option must be selected to show this field */
  requiresOption?: string
}

export const QUANTITY_ITEMS: QuantityItem[] = [
  {
    id: 'steckdosen',
    label: 'Zusätzliche Steckdosen / Schalter',
    description: 'Aufputz oder Unterputz, je Einheit',
    pricePerUnit: 48,
    defaultQty: 0,
    min: 0,
    max: 60,
  },
  {
    id: 'leuchten',
    label: 'Deckenleuchten / LED-Einbaustrahler',
    description: 'Inklusive Zuleitung und Montage, je Einheit',
    pricePerUnit: 135,
    defaultQty: 0,
    min: 0,
    max: 80,
  },
  {
    id: 'netzwerkdosen',
    label: 'Netzwerkdosen (RJ45)',
    description: 'Cat 6A, je Dose',
    pricePerUnit: 95,
    defaultQty: 0,
    min: 0,
    max: 40,
    requiresOption: 'lan',
  },
  {
    id: 'raumthermostate',
    label: 'Raumthermostate',
    description: 'Digital, je Thermostat',
    pricePerUnit: 185,
    defaultQty: 0,
    min: 0,
    max: 20,
    requiresOption: 'heizung',
  },
  {
    id: 'rauchwarnmelder_qty',
    label: 'Anzahl Rauchwarnmelder',
    description: 'Vernetzt montiert, je Gerät',
    pricePerUnit: 82,
    defaultQty: 0,
    min: 0,
    max: 20,
    requiresOption: 'rauchwarnmelder',
  },
]

// ─────────────────────────────────────────────────────────────
// Calculation
// ─────────────────────────────────────────────────────────────

export interface CalculatorInput {
  objekt: ObjektType
  m2: number
  projekt: ProjektType
  selectedOptions: string[]          // flat option ids
  quantities: Record<string, number> // quantity item id → count
  material: MaterialType
}

export interface PriceBreakdown {
  base: number
  sizeAdjustment: number
  projektAdjusted: number
  optionsTotal: number
  quantitiesTotal: number
  subtotal: number
  materialMultiplier: number
  total: number
  /** Rounded to nearest 100 for display */
  displayTotal: number
}

export function calculatePrice(input: CalculatorInput): PriceBreakdown {
  const { objekt, m2, projekt, selectedOptions, quantities, material } = input

  const base = BASE_PRICES[objekt]
  const sizeAdjustment = Math.max(0, m2 - BASELINE_SQM) * PRICE_PER_SQM_ABOVE_BASELINE
  const rawBase = base + sizeAdjustment

  const projektMultiplier = PROJEKT_MULTIPLIERS[projekt] ?? 1
  const projektAdjusted = rawBase * projektMultiplier

  // Flat options
  const optionsTotal = FLAT_OPTIONS.filter((o) => selectedOptions.includes(o.id)).reduce(
    (sum, o) => sum + o.price,
    0,
  )

  // Quantity line items
  const quantitiesTotal = QUANTITY_ITEMS.reduce((sum, item) => {
    const qty = quantities[item.id] ?? 0
    return sum + qty * item.pricePerUnit
  }, 0)

  const subtotal = projektAdjusted + optionsTotal + quantitiesTotal
  const matMul = MATERIAL_MULTIPLIERS[material]
  const total = subtotal * matMul
  const displayTotal = Math.round(total / 100) * 100

  return {
    base,
    sizeAdjustment,
    projektAdjusted,
    optionsTotal,
    quantitiesTotal,
    subtotal,
    materialMultiplier: matMul,
    total,
    displayTotal,
  }
}

// ─────────────────────────────────────────────────────────────
// Human-readable labels (used in result step and summary)
// ─────────────────────────────────────────────────────────────

export const OBJEKT_LABELS: Record<ObjektType, string> = {
  EFH: 'Einfamilienhaus',
  ZFH: 'Zweifamilienhaus',
  DG: 'Dachgeschosswohnung',
  ETW: 'Eigentumswohnung',
}

export const PROJEKT_LABELS: Record<ProjektType, string> = {
  sanierung: 'Sanierung / Renovierung',
  modernisierung: 'Modernisierung',
  erweiterung: 'Erweiterung / Anbau',
  zaehler: 'Zählerschrank erneuern',
}

export const MATERIAL_LABELS: Record<MaterialType, string> = {
  standard: 'Standard',
  premium: 'Premium',
  design: 'Design',
}
