'use client'

import type { ProjektType } from '../types'
import { DIRECT_ANFRAGE_REASONS, PROJEKT_LABELS } from '@/config/pricing'
import Link from 'next/link'

interface Props {
  projekt: ProjektType | ''
  onBack: () => void
}

export function StepDirektanfrage({ projekt, onBack }: Props) {
  const label = projekt ? PROJEKT_LABELS[projekt as ProjektType] : ''
  const reason = projekt ? (DIRECT_ANFRAGE_REASONS[projekt] ?? '') : ''

  return (
    <div className="flex flex-col gap-5 text-center py-2">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
        style={{ background: 'rgba(201,170,114,0.09)', border: '1px solid rgba(201,170,114,0.22)' }}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path d="M10 6v5M10 13.5v.5" stroke="#c9aa72" strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="10" cy="10" r="8.5" stroke="#c9aa72" strokeWidth="1.3"/>
        </svg>
      </div>

      <div className="text-left">
        <p className="text-[0.68rem] tracking-[0.12em] uppercase text-gold font-normal mb-2">
          {label}
        </p>
        <h3 className="font-serif text-[1.35rem] text-text-1 tracking-[-0.02em] mb-3 leading-snug">
          Für dieses Vorhaben erstellen wir Ihnen ein individuelles Angebot.
        </h3>
        <p className="text-[0.85rem] text-text-2 leading-[1.75]">{reason}</p>
      </div>

      <div className="calc-soft-panel text-left px-4 py-4">
        <p className="text-[0.72rem] tracking-[0.1em] uppercase text-text-4 mb-3 font-normal">
          So geht es weiter
        </p>
        {[
          'Kurze Anfrage absenden – ein paar Zeilen genügen.',
          'Wir melden uns innerhalb eines Werktags.',
          'Sie erhalten ein kostenloses, verbindliches Angebot.',
        ].map((step, i) => (
          <div key={i} className="flex gap-3 py-2" style={i > 0 ? { borderTop: '1px solid rgba(255,255,255,0.05)' } : undefined}>
            <span className="text-[0.68rem] text-gold font-medium min-w-[18px] pt-0.5">0{i + 1}</span>
            <p className="text-[0.82rem] text-text-2 leading-snug">{step}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Link
          href="/anfrage"
          className="calc-nav-button calc-nav-button-primary flex-1 no-underline text-[0.9rem] font-medium"
        >
          Zur Anfrage →
        </Link>
        <button
          type="button"
          onClick={onBack}
          className="calc-nav-button flex-1 text-[0.88rem] font-normal bg-transparent font-sans cursor-pointer"
        >
          ← Anderen Typ wählen
        </button>
      </div>
    </div>
  )
}
