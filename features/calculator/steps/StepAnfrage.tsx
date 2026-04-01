'use client'

import Link from 'next/link'
import type { CalculatorState } from '../types'
import { PROJEKT_LABELS, OBJEKT_LABELS, DIRECT_ANFRAGE_TYPES, type ObjektType, type ProjektType } from '@/config/pricing'

interface Props {
  state: CalculatorState
}

export function StepAnfrage({ state }: Props) {
  const { objekt, projekt } = state
  const isDirect = projekt && DIRECT_ANFRAGE_TYPES.includes(projekt as ProjektType)

  return (
    <div className="flex flex-col gap-6 text-center py-4">
      {isDirect ? (
        <>
          <div
            className="w-12 h-12 rounded-full border flex items-center justify-center mx-auto"
            style={{ background: 'rgba(201,170,114,0.08)', borderColor: 'rgba(201,170,114,0.25)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2v9M10 14v2" stroke="#c9aa72" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-[1.4rem] text-text-1 mb-2">
              Individuelle Anfrage erforderlich
            </h3>
            <p className="text-[0.88rem] text-text-2 leading-[1.7] max-w-sm mx-auto">
              Für{' '}
              <strong className="text-text-1 font-normal">
                {projekt ? PROJEKT_LABELS[projekt as ProjektType] : ''}
              </strong>{' '}
              ist eine automatische Berechnung nicht sinnvoll – die Kosten hängen stark vom
              Einzelfall ab. Wir erstellen Ihnen ein individuelles Festpreisangebot.
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            className="w-12 h-12 rounded-full border flex items-center justify-center mx-auto"
            style={{ background: 'rgba(76,175,130,0.08)', borderColor: 'rgba(76,175,130,0.25)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10l5 5 7-8" stroke="#4caf82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-[1.4rem] text-text-1 mb-2">
              Bereit für Ihr Angebot
            </h3>
            <p className="text-[0.88rem] text-text-2 leading-[1.7] max-w-sm mx-auto">
              Auf Basis Ihrer Angaben erstellen wir Ihnen ein verbindliches Festpreisangebot.
              Kein Verkaufsgespräch – nur ein konkretes Angebot.
            </p>
          </div>
        </>
      )}

      {/* Summary chip */}
      {objekt && projekt && (
        <div
          className="inline-flex items-center gap-2 mx-auto px-4 py-2 rounded-full text-[0.75rem] text-text-3 border"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <span>{OBJEKT_LABELS[objekt as ObjektType]}</span>
          <span className="text-text-4">·</span>
          <span>{PROJEKT_LABELS[projekt as ProjektType]}</span>
        </div>
      )}

      <Link
        href="/anfrage"
        className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gold
                   text-[#1a1400] rounded text-[0.9rem] font-medium no-underline
                   transition-opacity hover:opacity-85 active:scale-[0.98]"
      >
        Zur Anfrage →
      </Link>

      <p className="text-[0.72rem] text-text-4">
        Ihre Angaben werden nicht gespeichert und nicht weitergegeben.
      </p>
    </div>
  )
}
