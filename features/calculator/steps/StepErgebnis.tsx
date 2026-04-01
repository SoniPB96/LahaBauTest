'use client'

import { useState } from 'react'
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

interface Props {
  state: CalculatorState
}

// Build a plain-text summary of the calculator result for sharing
function buildSummary(state: CalculatorState, low: number, high: number): string {
  const objekt  = OBJEKT_LABELS[state.objekt as ObjektType] ?? ''
  const projekt = PROJEKT_LABELS[state.projekt as ProjektType] ?? ''
  const qual    = QUALITAET_LABELS[state.qualitaet as QualitaetType] ?? ''
  const extras  = ADD_ON_MODULES.filter(m => state.addOns.includes(m.id)).map(m => m.label).join(', ')

  return [
    `📋 Meine Kostenschätzung – Laha Baudienstleistungen`,
    ``,
    `Objekt:      ${objekt}`,
    `Vorhaben:    ${projekt}`,
    `Wohnfläche:  ca. ${state.m2} m²`,
    `Räume:       ${state.rooms} Zimmer, ${state.bathrooms} Bad/Bäder, Küche`,
    `Ausstattung: ${qual}`,
    extras ? `Extras:      ${extras}` : '',
    ``,
    `Erste Einschätzung: ${low.toLocaleString('de-DE')} – ${high.toLocaleString('de-DE')} € (netto)`,
    ``,
    `Ich würde gerne ein kostenloses Angebot anfragen.`,
  ].filter(l => l !== null).join('\n')
}

export function StepErgebnis({ state }: Props) {
  const [detailOpen, setDetailOpen] = useState(false)

  const { objekt, projekt, m2, rooms, bathrooms, addOns, roomConfigs, qualitaet } = state

  if (
    !objekt || !projekt ||
    projekt === 'komplettsanierung' || projekt === 'teilsanierung' ||
    projekt === 'zaehler' || projekt === 'sonderfall'
  ) return null

  const result = calculatePrice({
    objekt: objekt as ObjektType,
    projekt: projekt as 'neubau' | 'altbau',
    m2, rooms, bathrooms, addOns, roomConfigs,
    qualitaet: qualitaet as QualitaetType,
  })

  const activeAddOns = ADD_ON_MODULES.filter(m => addOns.includes(m.id))
  const summary = buildSummary(state, result.low, result.high)
  const encoded = encodeURIComponent(summary)

  const waHref    = `https://wa.me/4917682067106?text=${encoded}`
  const mailHref  = `mailto:info@laha-bau.de?subject=${encodeURIComponent('Kostenschätzung – Anfrage')}&body=${encoded}`
  const formHref  = `/anfrage?summary=${encoded}`

  const rows = [
    { label: 'Objekt',     value: OBJEKT_LABELS[objekt as ObjektType] },
    { label: 'Vorhaben',   value: PROJEKT_LABELS[projekt as ProjektType] },
    { label: 'Fläche',     value: `ca. ${m2} m²` },
    { label: 'Räume',      value: `${rooms} Zimmer · ${bathrooms} Bad · Küche` },
    { label: 'Ausstattung',value: QUALITAET_LABELS[qualitaet as QualitaetType] },
    ...(activeAddOns.length > 0 ? [{ label: 'Extras', value: activeAddOns.map(m => m.label).join(', ') }] : []),
  ]

  return (
    <div className="flex flex-col gap-5">

      {/* Price */}
      <div
        className="rounded-2xl px-6 py-6"
        style={{ border: '1.5px solid rgba(201,170,114,0.25)', background: 'rgba(201,170,114,0.05)' }}
      >
        <p className="text-[0.62rem] tracking-[0.15em] uppercase mb-2 font-normal"
          style={{ color: 'rgba(201,170,114,0.6)' }}>
          Erste Orientierung · Netto zzgl. MwSt.
        </p>
        <p
          className="font-serif leading-none mb-1"
          style={{ fontSize: 'clamp(1.9rem,5vw,2.6rem)', color: '#ededeb', letterSpacing: '-0.03em' }}
        >
          {result.low.toLocaleString('de-DE')} – {result.high.toLocaleString('de-DE')} €
        </p>
        <p className="text-[0.72rem]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Richtgröße ohne Gewähr · Verbindliches Angebot auf Anfrage
        </p>
      </div>

      {/* Summary table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className="flex justify-between gap-4 px-4 py-3 text-[0.82rem]"
            style={i < rows.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.05)' } : undefined}
          >
            <span style={{ color: 'rgba(255,255,255,0.38)' }}>{label}</span>
            <span className="text-text-1 text-right">{value}</span>
          </div>
        ))}
      </div>

      {/* CTA headline */}
      <div>
        <p className="text-[0.88rem] font-normal mb-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Kostenloses Angebot anfragen
        </p>
        <p className="text-[0.75rem]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Ihre Angaben werden automatisch mitgesendet.
        </p>
      </div>

      {/* Contact buttons */}
      <div className="flex flex-col gap-2.5">
        {/* WhatsApp */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl no-underline transition-all duration-150 active:scale-[0.98]"
          style={{ padding: '1rem 1.25rem', background: 'rgba(37,211,102,0.08)', border: '1.5px solid rgba(37,211,102,0.18)' }}
        >
          <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(37,211,102,0.12)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 1.34.35 2.6.96 3.7L1.5 16.5l3.93-1.02A7.47 7.47 0 0 0 9 16.5c4.14 0 7.5-3.36 7.5-7.5S13.14 1.5 9 1.5z" stroke="#25d366" strokeWidth="1.3" strokeLinejoin="round"/>
              <path d="M6.5 6.5s.5.5.5 1.5-.5 1.5-.5 1.5 1 2 3 3c0 0 .5-.5 1.5-.5s1.5.5 1.5.5v1.5s-1 .5-2 .5C8 14 4.5 10.5 4.5 8c0-1 .5-2 .5-2l1.5.5z" stroke="#25d366" strokeWidth="1.1" strokeLinejoin="round"/>
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-[0.88rem] font-normal" style={{ color: '#25d366' }}>Via WhatsApp anfragen</p>
            <p className="text-[0.7rem]" style={{ color: 'rgba(37,211,102,0.5)' }}>Schätzung wird automatisch mitgeschickt</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="rgba(37,211,102,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Email */}
        <a
          href={mailHref}
          className="flex items-center gap-4 rounded-xl no-underline transition-all duration-150 active:scale-[0.98]"
          style={{ padding: '1rem 1.25rem', background: 'rgba(99,149,255,0.06)', border: '1.5px solid rgba(99,149,255,0.15)' }}
        >
          <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(99,149,255,0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke="#6395ff" strokeWidth="1.3"/>
              <path d="M1.5 5.5l7.5 5 7.5-5" stroke="#6395ff" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-[0.88rem] font-normal" style={{ color: '#6395ff' }}>Per E-Mail anfragen</p>
            <p className="text-[0.7rem]" style={{ color: 'rgba(99,149,255,0.5)' }}>Schätzung im E-Mail-Text vorausgefüllt</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="rgba(99,149,255,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Form */}
        <a
          href={formHref}
          className="flex items-center gap-4 rounded-xl no-underline transition-all duration-150 active:scale-[0.98]"
          style={{ padding: '1rem 1.25rem', background: 'rgba(201,170,114,0.07)', border: '1.5px solid rgba(201,170,114,0.2)' }}
        >
          <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(201,170,114,0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="14" height="14" rx="2" stroke="#c9aa72" strokeWidth="1.3"/>
              <path d="M5 6h8M5 9h8M5 12h5" stroke="#c9aa72" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-[0.88rem] font-normal" style={{ color: '#c9aa72' }}>Anfrage-Formular ausfüllen</p>
            <p className="text-[0.7rem]" style={{ color: 'rgba(201,170,114,0.5)' }}>Schätzung wird automatisch beigefügt</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="rgba(201,170,114,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Collapsible detail */}
      <div>
        <button
          type="button"
          onClick={() => setDetailOpen(!detailOpen)}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer font-sans text-[0.75rem] transition-colors"
          style={{ color: 'rgba(255,255,255,0.28)', padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
            style={{ transform: detailOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }}>
            <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {detailOpen ? 'Datenblatt ausblenden' : 'Datenblatt anzeigen'}
        </button>

        {detailOpen && (
          <pre
            className="mt-3 text-[0.68rem] leading-relaxed rounded-xl overflow-x-auto"
            style={{
              padding: '1rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.4)',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
            }}
          >
            {summary}
          </pre>
        )}
      </div>

      <p className="text-[0.7rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>
        Diese Schätzung basiert auf Ihren Angaben. Der tatsächliche Preis wird im persönlichen Gespräch vor Ort ermittelt.
      </p>
    </div>
  )
}
