import type { CalculatorState } from '../types'
import {
  OBJEKT_LABELS,
  PROJEKT_LABELS,
  QUALITAET_LABELS,
  ADD_ON_MODULES,
  calculatePrice,
  type ObjektType,
  type ProjektType,
  type QualitaetType,
} from '@/config/pricing'

export interface CalcSummary {
  low: number
  high: number
  lines: { label: string; value: string }[]
}

export function buildCalcSummary(state: CalculatorState): CalcSummary | null {
  const { objekt, projekt, m2, rooms, bathrooms, addOns, roomConfigs, qualitaet } = state
  if (!objekt || !projekt) return null
  if (['komplettsanierung','teilsanierung','zaehler','sonderfall'].includes(projekt)) return null

  const result = calculatePrice({
    objekt: objekt as ObjektType,
    projekt: projekt as 'neubau' | 'altbau',
    m2, rooms, bathrooms, addOns, roomConfigs,
    qualitaet: qualitaet as QualitaetType,
  })

  const activeAddOns = ADD_ON_MODULES.filter((m) => addOns.includes(m.id))

  const lines: { label: string; value: string }[] = [
    { label: 'Objekt',     value: OBJEKT_LABELS[objekt as ObjektType] },
    { label: 'Projekt',    value: PROJEKT_LABELS[projekt as ProjektType] },
    { label: 'Wohnfläche', value: `ca. ${m2} m²` },
    { label: 'Räume',      value: `${rooms} Zimmer, ${bathrooms} ${bathrooms === 1 ? 'Bad' : 'Bäder'}, Küche` },
    { label: 'Qualität',   value: QUALITAET_LABELS[qualitaet as QualitaetType] },
    ...(activeAddOns.length > 0
      ? [{ label: 'Extras', value: activeAddOns.map((m) => m.label).join(', ') }]
      : []),
  ]

  return { low: result.low, high: result.high, lines }
}

export function formatSummaryText(summary: CalcSummary): string {
  const rows = summary.lines.map((l) => `${l.label}: ${l.value}`).join('\n')
  return `Hallo, ich habe Ihren Kostenrechner genutzt und möchte ein unverbindliches Angebot anfragen.\n\nMeine Angaben:\n${rows}\n\nErste Einschätzung laut Rechner: ${summary.low.toLocaleString('de-DE')} – ${summary.high.toLocaleString('de-DE')} € (netto)\n\nIch freue mich über eine Rückmeldung.`
}

export function buildWhatsAppUrl(phone: string, summary: CalcSummary | null): string {
  const base = `https://wa.me/${phone}`
  if (!summary) return base
  return `${base}?text=${encodeURIComponent(formatSummaryText(summary))}`
}

export function buildMailtoUrl(email: string, summary: CalcSummary | null): string {
  const subject = encodeURIComponent('Anfrage – Kosteneinschätzung Elektroinstallation')
  if (!summary) return `mailto:${email}?subject=${subject}`
  return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(formatSummaryText(summary))}`
}
