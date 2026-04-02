'use client'

import type { StartMode } from '../types'

interface Props {
  value: StartMode | ''
  onChange: (v: StartMode) => void
  error: boolean
}

const OPTIONS: { id: StartMode; label: string; sub: string; tag: string }[] = [
  {
    id: 'schnell',
    label: 'Schnell orientieren',
    sub: 'Ich möchte wissen, ob das Projekt in meinem Budget liegt.',
    tag: '~1 min',
  },
  {
    id: 'genauer',
    label: 'Genauer planen',
    sub: 'Ich kenne mein Objekt bereits und möchte jeden Raum einrichten.',
    tag: '~3 min',
  },
]

export function StepStart({ value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="text-[0.78rem] mb-2 px-3 py-2 rounded-lg"
          style={{ color: '#e05252', background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.2)' }}
          role="alert">
          Bitte eine Option auswählen.
        </p>
      )}
      {OPTIONS.map(({ id, label, sub, tag }) => {
        const sel = value === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={sel}
            className="group flex items-center gap-5 text-left w-full rounded-2xl
                       transition-all duration-200"
            style={{
              padding: '1.25rem 1.5rem',
              border: sel ? '2px solid #c9aa72' : '1.5px solid rgba(255,255,255,0.08)',
              background: sel ? 'rgba(201,170,114,0.07)' : 'rgba(255,255,255,0.02)',
            }}
          >
            {/* Radio dot */}
            <span
              className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                border: sel ? '2px solid #c9aa72' : '2px solid rgba(255,255,255,0.2)',
                background: sel ? '#c9aa72' : 'transparent',
              }}
            >
              {sel && <span className="block w-2 h-2 rounded-full" style={{ background: '#1a1400' }} />}
            </span>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[0.97rem] text-text-1 font-normal leading-snug mb-0.5">{label}</p>
              <p className="text-[0.78rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>{sub}</p>
            </div>

            {/* Time tag */}
            <span
              className="shrink-0 text-[0.65rem] font-medium tracking-wide rounded-full px-2.5 py-1"
              style={{
                color: sel ? '#c9aa72' : 'rgba(255,255,255,0.3)',
                background: sel ? 'rgba(201,170,114,0.12)' : 'rgba(255,255,255,0.05)',
              }}
            >
              {tag}
            </span>
          </button>
        )
      })}
    </div>
  )
}
