'use client'

import { DIRECT_ANFRAGE_TYPES } from '@/config/pricing'
import { cn } from '@/lib/utils'
import type { ProjektType } from '../types'

interface Props {
  value: ProjektType | ''
  onChange: (v: ProjektType) => void
  error: boolean
}

const OPTIONS: { id: ProjektType; label: string; sub: string }[] = [
  { id: 'neubau',            label: 'Neubau',                           sub: 'Komplette Elektroinstallation im Neubau' },
  { id: 'altbau',            label: 'Altbau / Bestand',                 sub: 'Erneuerung in einem bestehenden Gebäude' },
  { id: 'komplettsanierung', label: 'Komplettsanierung',                sub: 'Komplette Erneuerung der gesamten Elektrik' },
  { id: 'teilsanierung',     label: 'Teil-Erneuerung',                  sub: 'Einzelne Bereiche oder Leitungen nachrüsten' },
  { id: 'zaehler',           label: 'Zählerschrank / Sicherungskasten', sub: 'Austausch oder Aufrüstung' },
  { id: 'sonderfall',        label: 'Ich bin noch unsicher',            sub: 'Wir beraten Sie gerne persönlich' },
]

export function StepProjektart({ value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-2.5">
      {error && (
        <p className="text-[0.78rem] mb-1 px-3 py-2 rounded-lg"
          style={{ color: '#e05252', background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.2)' }}
          role="alert">
          Bitte wählen Sie einen Projekttyp.
        </p>
      )}
      {OPTIONS.map(({ id, label, sub }) => {
        const sel = value === id
        const isDirect = DIRECT_ANFRAGE_TYPES.includes(id)
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={sel}
            className={cn(
              'calc-choice-card w-full px-4 py-4 flex items-center gap-4 text-left active:scale-[0.985]',
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
                <p className="text-[0.92rem] text-text-1 leading-snug">{label}</p>
                {sel && <span className="calc-choice-badge calc-choice-badge-active">Ausgewählt</span>}
              </div>
              <p
                className="text-[0.73rem] leading-relaxed"
                style={{ color: sel ? 'rgba(255,255,255,0.66)' : 'rgba(255,255,255,0.36)' }}
              >
                {sub}
              </p>
            </div>

            {isDirect && (
              <span className={cn('calc-choice-badge relative z-[1]', sel && 'calc-choice-badge-active')}>
                Anfrage
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
