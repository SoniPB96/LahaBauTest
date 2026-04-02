'use client'

import { cn } from '@/lib/utils'
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
    sub: 'Ich möchte wissen, ob das Projekt in mein Budget passt.',
    tag: '~1 min',
  },
  {
    id: 'genauer',
    label: 'Genauer planen',
    sub: 'Ich kenne mein Objekt bereits und möchte jeden Raum gezielter einrichten.',
    tag: '~3 min',
  },
]

export function StepStart({ value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p
          className="text-[0.78rem] mb-2 px-3 py-2 rounded-lg"
          style={{ color: '#e05252', background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.2)' }}
          role="alert"
        >
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
            className={cn(
              'calc-choice-card w-full text-left px-5 py-5 md:px-6 md:py-5 flex items-center gap-4 md:gap-5 active:scale-[0.985]',
              sel && 'calc-choice-card-selected',
            )}
          >
            <span
              className={cn(
                'calc-choice-indicator calc-radio-indicator relative z-[1]',
                sel && 'calc-radio-indicator-selected',
              )}
              aria-hidden="true"
            />

            <div className="flex-1 min-w-0 relative z-[1]">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <p className="text-[1rem] text-text-1 font-normal leading-snug">{label}</p>
                {sel && <span className="calc-choice-badge calc-choice-badge-active">Ausgewählt</span>}
              </div>
              <p
                className="text-[0.78rem] leading-relaxed transition-colors"
                style={{ color: sel ? 'rgba(255,255,255,0.76)' : 'rgba(255,255,255,0.44)' }}
              >
                {sub}
              </p>
            </div>

            <span className={cn('calc-choice-badge relative z-[1]', sel && 'calc-choice-badge-active')}>
              {tag}
            </span>
          </button>
        )
      })}
    </div>
  )
}
