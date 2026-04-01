// ─────────────────────────────────────────────────────────────
// Pricing Engine – Laha Baudienstleistungen
// All prices in EUR net (excl. VAT).
// UI components must never contain pricing logic.
// Only import from this file.
// ─────────────────────────────────────────────────────────────

// ── Core domain types ─────────────────────────────────────────
export type StartMode     = 'schnell' | 'genauer'
export type ObjektType    = 'wohnung' | 'haus'
export type ProjektType   =
  | 'neubau'
  | 'altbau'
  | 'komplettsanierung'
  | 'teilsanierung'
  | 'zaehler'
  | 'sonderfall'
export type QualitaetType = 'einfach' | 'standard' | 'premium'
export type RoomKind      = 'room' | 'bathroom' | 'kitchen'

// ── Project types that cannot be auto-calculated ──────────────
export const DIRECT_ANFRAGE_TYPES: ProjektType[] = [
  'komplettsanierung',
  'teilsanierung',
  'zaehler',
  'sonderfall',
]

// ── Base prices per object × project combination ──────────────
// Reference: 80 m², 4 rooms, 1 bathroom.
export const BASE_PRICES: Record<ObjektType, Record<'neubau' | 'altbau', number>> = {
  wohnung: { neubau: 5800, altbau: 4200 },
  haus:    { neubau: 9500, altbau: 7200 },
}

// ── Size / room / bathroom adjustments ────────────────────────
export const PRICE_PER_SQM_ABOVE_BASELINE       = 28
export const BASELINE_SQM                        = 80
export const PRICE_PER_ROOM_ABOVE_BASELINE       = 350
export const BASELINE_ROOMS                      = 4
export const PRICE_PER_BATHROOM_ABOVE_BASELINE   = 600
export const BASELINE_BATHROOMS                  = 1

// ── Quality multipliers ────────────────────────────────────────
export const QUALITAET_MULTIPLIERS: Record<QualitaetType, number> = {
  einfach:  0.85,
  standard: 1.00,
  premium:  1.25,
}

// ── Base fittings per room by quality (informational + used in pricing) ──
// sockets: Steckdosen, switches: Lichtschalter
export interface RoomFittings {
  sockets: number
  switches: number
}

export const BASE_FITTINGS_ROOM: Record<QualitaetType, RoomFittings> = {
  einfach:  { sockets: 4, switches: 1 },
  standard: { sockets: 6, switches: 1 },
  premium:  { sockets: 8, switches: 2 },
}

export const BASE_FITTINGS_BATHROOM: Record<QualitaetType, RoomFittings> = {
  einfach:  { sockets: 2, switches: 1 },
  standard: { sockets: 3, switches: 1 },
  premium:  { sockets: 4, switches: 1 },
}

export const BASE_FITTINGS_KITCHEN: Record<QualitaetType, RoomFittings> = {
  einfach:  { sockets: 6, switches: 1 },
  standard: { sockets: 8, switches: 1 },
  premium:  { sockets: 10, switches: 2 },
}

// ── Prices for room-level extras ──────────────────────────────
// These are added per unit in the Raum-Editor.
export const PRICE_LAN_PER_ROOM    = 180  // one network drop per room
export const PRICE_JALOUSIE_UNIT   = 220  // per motorised blind/shutter drive
export const PRICE_FUSSBODENHEIZUNG_ROOM = 420 // per room thermostat + wiring

// ── Display range spread ───────────────────────────────────────
export const RANGE_SPREAD = 0.15

// ── Add-on modules (flat price each, shown in Zusatzmodule step) ─
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

// ─────────────────────────────────────────────────────────────
// Room configuration (Raum-Editor)
// ─────────────────────────────────────────────────────────────

/** Per-room extra configuration set by the user in the Raum-Editor step */
export interface RoomConfig {
  /** Unique id, e.g. "room-1", "bathroom-2", "kitchen" */
  id: string
  kind: RoomKind
  /** Display label, e.g. "Raum 1", "Bad 2", "Küche" */
  label: string
  /** How many LAN drops the user wants here (0 if LAN add-on not selected) */
  lan: number
  /** How many jalousie drives the user wants here (0 if jalousien add-on not selected) */
  jalousien: number
  /** Whether floor heating is active in this room (only if fussbodenheizung add-on selected) */
  fussbodenheizung: boolean
}

/** Build the default RoomConfig list from room/bathroom counts and active add-ons */
export function buildDefaultRoomConfigs(
  rooms: number,
  bathrooms: number,
  addOns: string[],
): RoomConfig[] {
  const hasFbh = addOns.includes('fussbodenheizung')
  const configs: RoomConfig[] = []

  for (let i = 1; i <= rooms; i++) {
    configs.push({
      id: `room-${i}`,
      kind: 'room',
      label: `Raum ${i}`,
      lan: 0,
      jalousien: 0,
      fussbodenheizung: hasFbh, // default: all rooms get floor heating if module selected
    })
  }

  for (let i = 1; i <= bathrooms; i++) {
    configs.push({
      id: `bathroom-${i}`,
      kind: 'bathroom',
      label: bathrooms === 1 ? 'Bad' : `Bad ${i}`,
      lan: 0,
      jalousien: 0,
      fussbodenheizung: false, // floor heating not typical in bathrooms
    })
  }

  // Kitchen is always included automatically
  configs.push({
    id: 'kitchen',
    kind: 'kitchen',
    label: 'Küche',
    lan: 0,
    jalousien: 0,
    fussbodenheizung: hasFbh,
  })

  return configs
}

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
  roomConfigs: RoomConfig[]
  qualitaet: QualitaetType
}

export interface PriceResult {
  low: number
  high: number
  mid: number
}

export function calculatePrice(input: CalculatorInput): PriceResult {
  const { objekt, projekt, m2, rooms, bathrooms, addOns, roomConfigs, qualitaet } = input

  // Base
  const base = BASE_PRICES[objekt][projekt]

  // Size / room / bathroom adjustments
  const sizeAdj = Math.max(0, m2 - BASELINE_SQM) * PRICE_PER_SQM_ABOVE_BASELINE
  const roomAdj = Math.max(0, rooms - BASELINE_ROOMS) * PRICE_PER_ROOM_ABOVE_BASELINE
  const bathAdj = Math.max(0, bathrooms - BASELINE_BATHROOMS) * PRICE_PER_BATHROOM_ABOVE_BASELINE

  // Flat add-on modules (wallbox, LAN base, fussbodenheizung base, jalousien base)
  const addOnTotal = ADD_ON_MODULES
    .filter((m) => addOns.includes(m.id))
    .reduce((sum, m) => sum + m.price, 0)

  // Per-room extras from Raum-Editor
  let roomExtrasTotal = 0
  for (const rc of roomConfigs) {
    roomExtrasTotal += rc.lan * PRICE_LAN_PER_ROOM
    roomExtrasTotal += rc.jalousien * PRICE_JALOUSIE_UNIT
    if (rc.fussbodenheizung) roomExtrasTotal += PRICE_FUSSBODENHEIZUNG_ROOM
  }

  const subtotal = base + sizeAdj + roomAdj + bathAdj + addOnTotal + roomExtrasTotal

  // Quality multiplier
  const qualMul = QUALITAET_MULTIPLIERS[qualitaet]
  const mid = subtotal * qualMul

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
  neubau:            'Neubau',
  altbau:            'Altbau / Bestand',
  komplettsanierung: 'Komplettsanierung',
  teilsanierung:     'Teil-Erneuerung / Nachinstallation',
  zaehler:           'Zählerschrank / Unterverteilung',
  sonderfall:        'Sonderfall',
}

export const QUALITAET_LABELS: Record<QualitaetType, string> = {
  einfach:  'Einfach',
  standard: 'Standard',
  premium:  'Premium',
}

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
