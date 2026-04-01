'use client'

import type { QualitaetType } from '../types'

interface Props {
  value: QualitaetType
  onChange: (v: QualitaetType) => void
}

const OPTIONS: { id: QualitaetType; label: string; tag: string; details: string; example: string }[] = [
  {
    id: 'einfach',
    label: 'Einfach',
    tag: '−15 %',
    details: 'Solide Markenmaterialien, schlichte Schalter.',
    example: 'z.B. Busch-Jaeger Basic 55',
  },
  {
    id: 'standard',
    label: 'Standard',
    tag: 'Basispreis',
    details: 'Hochwertigere Schalterserien, mehr Steckdosen pro Raum.',
    example: 'z.B. Gira E2 oder Jung LS990',
  },
  {
    id: 'premium',
    label: 'Premium',
    tag: '+25 %',
    details: 'Designschalter, großzügige Ausstattung, besondere Ausführung.',
    example: 'z.B. Busch-Jaeger Axcent, Gira Esprit',
  },
]

export function StepQualitaet({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {OPTIONS.map(({ id, label, tag, details, example }) => {
        const sel = value === id
        const isStandard = id === 'standard'
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={sel}
            className="flex items-start gap-4 text-left w-full rounded-2xl
                       transition-all duration-200 relative"
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
              <div className="flex items-center gap-2.5 flex-wrap mb-1">
                <span className="text-[0.97rem] text-text-1 font-normal">{label}</span>
                {isStandard && (
                  <span
                    className="text-[0.6rem] font-medium tracking-wide rounded-full px-2 py-0.5"
                    style={{ background: 'rgba(201,170,114,0.12)', color: '#c9aa72', border: '1px solid rgba(201,170,114,0.2)' }}
                  >
                    Beliebt
                  </span>
                )}
              </div>
              <p className="text-[0.78rem] leading-snug mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{details}</p>
              <p className="text-[0.68rem]" style={{ color: 'rgba(255,255,255,0.25)' }}>{example}</p>
            </div>

            {/* Price tag */}
            <span
              className="shrink-0 text-[0.72rem] font-medium self-start mt-0.5"
              style={{ color: sel ? '#c9aa72' : 'rgba(255,255,255,0.3)' }}
            >
              {tag}
            </span>
          </button>
        )
      })}
    </div>
  )
}
