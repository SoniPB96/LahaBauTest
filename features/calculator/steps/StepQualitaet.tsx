'use client'

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
    note: 'Solide Grundausstattung – alles was man braucht.',
  },
  {
    id: 'standard',
    label: 'Komfort',
    tag: 'Standardpreis',
    steckdosen: '6 pro Raum',
    schalter: '1–2 pro Raum',
    note: 'Mehr Steckdosen, durchdachte Platzierung. Die häufigste Wahl.',
    popular: true,
  },
  {
    id: 'premium',
    label: 'Großzügig',
    tag: '+25 %',
    steckdosen: '8+ pro Raum',
    schalter: '2 pro Raum',
    note: 'Maximaler Komfort, großzügige Ausstattung in jedem Bereich.',
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
            className="flex items-start gap-4 text-left w-full rounded-2xl transition-all duration-200"
            style={{
              padding: '1.1rem 1.4rem',
              border: sel ? '2px solid #c9aa72' : '1.5px solid rgba(255,255,255,0.08)',
              background: sel ? 'rgba(201,170,114,0.07)' : 'rgba(255,255,255,0.02)',
            }}
          >
            {/* Radio */}
            <span
              className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                border: sel ? '2px solid #c9aa72' : '2px solid rgba(255,255,255,0.18)',
                background: sel ? '#c9aa72' : 'transparent',
              }}
            >
              {sel && <span className="block w-[5px] h-[5px] rounded-full" style={{ background: '#1a1400' }} />}
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-[0.97rem] text-text-1 font-normal">{label}</span>
                {popular && (
                  <span
                    className="text-[0.6rem] font-medium tracking-wide rounded-full px-2 py-0.5"
                    style={{ background: 'rgba(201,170,114,0.12)', color: '#c9aa72', border: '1px solid rgba(201,170,114,0.2)' }}
                  >
                    Beliebt
                  </span>
                )}
              </div>

              {/* Fittings display */}
              <div className="flex gap-4 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.65rem] uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>Steckdosen</span>
                  <span className="text-[0.78rem]" style={{ color: sel ? 'rgba(201,170,114,0.9)' : 'rgba(255,255,255,0.55)' }}>{steckdosen}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.65rem] uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>Schalter</span>
                  <span className="text-[0.78rem]" style={{ color: sel ? 'rgba(201,170,114,0.9)' : 'rgba(255,255,255,0.55)' }}>{schalter}</span>
                </div>
              </div>

              <p className="text-[0.72rem] leading-snug" style={{ color: 'rgba(255,255,255,0.32)' }}>{note}</p>
            </div>

            <span
              className="shrink-0 text-[0.72rem] font-medium self-start mt-0.5 whitespace-nowrap"
              style={{ color: sel ? '#c9aa72' : 'rgba(255,255,255,0.28)' }}
            >
              {tag}
            </span>
          </button>
        )
      })}

      <p className="text-[0.7rem] px-1 mt-0.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.22)' }}>
        Alle Varianten werden mit Gira System 55 ausgeführt. Detailabstimmung erfolgt vor Ort.
      </p>
    </div>
  )
}
