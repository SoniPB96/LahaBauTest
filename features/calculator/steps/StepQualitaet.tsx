'use client'

import { cn } from '@/lib/utils'
import type { QualitaetType } from '../types'

interface Props {
  value: QualitaetType
  onChange: (v: QualitaetType) => void
}

const OPTIONS: {
  id: QualitaetType
  label: string
  tag: string
  steckdosen: string
  schalter: string
  note: string
  popular?: boolean
}[] = [
  {
    id: 'einfach',
    label: 'Basis',
    tag: '−15 %',
    steckdosen: '4 pro Raum',
    schalter: '1 pro Raum',
    note: 'Solide Grundausstattung – alles, was man braucht.',
  },
  {
    id: 'standard',
    label: 'Komfort',
    tag: 'Standardpreis',
    steckdosen: '6 pro Raum',
    schalter: '1–2 pro Raum',
    note: 'Mehr Steckdosen, bessere Verteilung und die häufigste Wahl.',
    popular: true,
  },
  {
    id: 'premium',
    label: 'Großzügig',
    tag: '+25 %',
    steckdosen: '8+ pro Raum',
    schalter: '2 pro Raum',
    note: 'Maximaler Komfort mit großzügiger Ausstattung in jedem Bereich.',
  },
]

export function StepQualitaet({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {OPTIONS.map(({ id, label, tag, steckdosen, schalter, note, popular }) => {
        const sel = value === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={sel}
            className={cn(
              'calc-choice-card w-full px-5 py-5 flex items-start gap-4 text-left active:scale-[0.985]',
              sel && 'calc-choice-card-selected',
            )}
          >
            <span
              className={cn(
                'calc-choice-indicator calc-radio-indicator mt-1 relative z-[1]',
                sel && 'calc-radio-indicator-selected',
              )}
              aria-hidden="true"
            />

            <div className="flex-1 min-w-0 relative z-[1]">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[1rem] text-text-1 font-normal">{label}</span>
                {popular && <span className="calc-choice-badge calc-choice-badge-active">Beliebt</span>}
                {sel && <span className="calc-choice-badge calc-choice-badge-active">Ausgewählt</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2.5">
                <div className="calc-data-box">
                  <span className="calc-data-box-label">Steckdosen</span>
                  <div className="calc-data-box-value" style={{ color: sel ? '#e5c995' : 'rgba(255,255,255,0.68)' }}>
                    {steckdosen}
                  </div>
                </div>
                <div className="calc-data-box">
                  <span className="calc-data-box-label">Schalter</span>
                  <div className="calc-data-box-value" style={{ color: sel ? '#e5c995' : 'rgba(255,255,255,0.68)' }}>
                    {schalter}
                  </div>
                </div>
              </div>

              <p className="text-[0.74rem] leading-relaxed" style={{ color: sel ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.42)' }}>
                {note}
              </p>
            </div>

            <span className={cn('calc-choice-badge self-start relative z-[1]', sel && 'calc-choice-badge-active')}>
              {tag}
            </span>
          </button>
        )
      })}

      <div className="calc-hint-box">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="calc-hint-icon" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <p className="calc-hint-text">
          <strong>Ausführung:</strong> Alle Varianten werden mit Gira System 55 ausgeführt. Detailabstimmung erfolgt vor Ort.
        </p>
      </div>
    </div>
  )
}
