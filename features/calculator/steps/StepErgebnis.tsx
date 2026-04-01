'use client'

import type { CalculatorState } from '../types'
import {
  calculatePrice,
  OBJEKT_LABELS,
  PROJEKT_LABELS,
  QUALITAET_LABELS,
  ADD_ON_MODULES,
  type ObjektType,
  type ProjektType,
  type QualitaetType,
} from '@/config/pricing'
import Link from 'next/link'

interface Props {
  state: CalculatorState
}

export function StepErgebnis({ state }: Props) {
  const { objekt, projekt, m2, rooms, bathrooms, addOns, fineQty, qualitaet } = state

  if (!objekt || !projekt || projekt === 'komplettsanierung' || projekt === 'teilsanierung' || projekt === 'zaehler' || projekt === 'sonderfall') {
    return null
  }

  const result = calculatePrice({
    objekt: objekt as ObjektType,
    projekt: projekt as 'neubau' | 'altbau',
    m2,
    rooms,
    bathrooms,
    addOns,
    fineQty,
    qualitaet: qualitaet as QualitaetType,
  })

  const activeAddOns = ADD_ON_MODULES.filter((m) => addOns.includes(m.id))

  return (
    <div className="flex flex-col gap-5">
      {/* Price range */}
      <div
        className="rounded-lg px-6 py-6"
        style={{ border: '1px solid rgba(201,170,114,0.18)', background: 'rgba(201,170,114,0.04)' }}
      >
        <p className="text-[0.65rem] tracking-[0.13em] uppercase text-text-4 mb-2 font-normal">
          Erste Orientierung
        </p>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-serif text-[2.4rem] text-text-1 tracking-[-0.03em] leading-none">
            {result.low.toLocaleString('de-DE')} –
          </span>
          <span className="font-serif text-[2.4rem] text-text-1 tracking-[-0.03em] leading-none">
            {result.high.toLocaleString('de-DE')} €
          </span>
        </div>
        <p className="text-[0.75rem] text-text-3 leading-relaxed">
          Netto, zzgl. 19 % MwSt. · Grobe Orientierung, kein Angebot.
        </p>
      </div>

      {/* Summary */}
      <div
        className="rounded-lg text-[0.82rem]"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {[
          { label: 'Objekt',      value: OBJEKT_LABELS[objekt as ObjektType] },
          { label: 'Projekt',     value: PROJEKT_LABELS[projekt as ProjektType] },
          { label: 'Wohnfläche',  value: `ca. ${m2} m²` },
          { label: 'Räume',       value: `${rooms} Räume, ${bathrooms} ${bathrooms === 1 ? 'Bad' : 'Bäder'}` },
          { label: 'Qualität',    value: QUALITAET_LABELS[qualitaet as QualitaetType] },
          ...(activeAddOns.length > 0
            ? [{ label: 'Extras', value: activeAddOns.map((m) => m.label).join(', ') }]
            : []),
        ].map(({ label, value }, i, arr) => (
          <div
            key={label}
            className="flex justify-between gap-4 px-4 py-3"
            style={i < arr.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.06)' } : undefined}
          >
            <span className="text-text-3 shrink-0">{label}</span>
            <span className="text-text-1 text-right">{value}</span>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <p className="text-[0.78rem] text-text-3 leading-[1.7] px-1">
        Diese Spanne basiert auf Ihren Angaben und gibt Ihnen eine erste Vorstellung. Der
        tatsächliche Preis hängt vom genauen Zustand und den endgültigen Anforderungen ab.
        Wir erstellen Ihnen gern ein kostenloses, verbindliches Angebot.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Link
          href="/anfrage"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded
                     text-[0.9rem] font-medium no-underline transition-opacity hover:opacity-85
                     active:scale-[0.98]"
          style={{ background: '#c9aa72', color: '#1a1400' }}
        >
          Kostenloses Angebot anfragen →
        </Link>
      </div>
    </div>
  )
}
