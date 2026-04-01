'use client'

import type { CalculatorState } from '../types'
import {
  calculatePrice,
  OBJEKT_LABELS,
  PROJEKT_LABELS,
  MATERIAL_LABELS,
  FLAT_OPTIONS,
  QUANTITY_ITEMS,
  type ObjektType,
  type ProjektType,
  type MaterialType,
} from '@/config/pricing'
import { ButtonLink } from '@/components/ui/Button'

interface Props {
  state: CalculatorState
  onProceedToAnfrage: () => void
}

export function StepErgebnis({ state, onProceedToAnfrage }: Props) {
  const { objekt, m2, projekt, selectedOptions, quantities, material } = state

  if (!objekt || !projekt) return null

  const breakdown = calculatePrice({
    objekt: objekt as ObjektType,
    m2,
    projekt: projekt as ProjektType,
    selectedOptions,
    quantities,
    material: material as MaterialType,
  })

  const activeOptions = FLAT_OPTIONS.filter((o) => selectedOptions.includes(o.id))
  const activeQuantities = QUANTITY_ITEMS.filter(
    (q) => (quantities[q.id] ?? 0) > 0,
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Main result */}
      <div
        className="border rounded-lg px-6 py-6"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(201,170,114,0.04)' }}
      >
        <p className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-1 font-normal">
          Erste Einschätzung – Richtwert
        </p>
        <p className="font-serif text-[2.6rem] text-text-1 tracking-[-0.03em] leading-none mb-1">
          ab {breakdown.displayTotal.toLocaleString('de-DE')} €
        </p>
        <p className="text-[0.75rem] text-text-3">Netto, zzgl. MwSt. · Richtwert ohne Gewähr</p>
      </div>

      {/* Breakdown */}
      <div
        className="border rounded-lg divide-y text-[0.82rem]"
        style={{ borderColor: 'rgba(255,255,255,0.06)', '--tw-divide-opacity': 1 } as React.CSSProperties}
      >
        {[
          { label: 'Objekt', value: OBJEKT_LABELS[objekt as ObjektType] },
          { label: 'Projekt', value: PROJEKT_LABELS[projekt as ProjektType] },
          { label: 'Wohnfläche', value: `ca. ${m2} m²` },
          { label: 'Material', value: MATERIAL_LABELS[material as MaterialType] },
          ...(activeOptions.length > 0
            ? [{ label: 'Optionen', value: activeOptions.map((o) => o.label).join(', ') }]
            : []),
          ...(activeQuantities.length > 0
            ? activeQuantities.map((q) => ({
                label: q.label,
                value: `${quantities[q.id]} Stück`,
              }))
            : []),
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between px-4 py-3"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <span className="text-text-3">{label}</span>
            <span className="text-text-1 text-right max-w-[55%]">{value}</span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div
        className="text-[0.75rem] text-text-3 leading-[1.65] px-4 py-4 rounded-lg border"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#111115' }}
      >
        Dieser Richtwert basiert auf Ihren Angaben und dient der ersten Orientierung. Der
        tatsächliche Preis hängt vom genauen Zustand der Immobilie und den finalen
        Anforderungen ab. Wir erstellen Ihnen gern ein verbindliches Festpreisangebot.
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          type="button"
          onClick={onProceedToAnfrage}
          className="flex-1 py-3.5 bg-gold text-[#1a1400] rounded text-[0.9rem] font-medium
                     font-sans cursor-pointer transition-opacity hover:opacity-85 active:scale-[0.98]
                     border-none"
        >
          Verbindliches Angebot anfragen →
        </button>
        <ButtonLink href="/anfrage" variant="ghost" className="flex-1 justify-center">
          Zur Anfrage-Seite
        </ButtonLink>
      </div>
    </div>
  )
}
