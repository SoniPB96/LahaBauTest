'use client'

import { ADD_ON_MODULES } from '@/config/pricing'
import { cn } from '@/lib/utils'

interface Props {
  selected: string[]
  onToggle: (id: string) => void
}

const ICONS: Record<string, React.ReactNode> = {
  lan: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="13" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="8" y="13" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="14" y="13" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="8" y="3" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M10 7v3M4 13v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  fussbodenheizung: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 16h12M4 12h12M7 8c0-2 3-4 3-4s3 2 3 4-1.5 2.5-3 2.5S7 10 7 8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  jalousien: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="3" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="3" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  wallbox: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M11 8l-2 4h3l-2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

export function StepZusatzmodule({ selected, onToggle }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ADD_ON_MODULES.map((mod) => {
          const sel = selected.includes(mod.id)
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onToggle(mod.id)}
              aria-pressed={sel}
              className={cn(
                'calc-choice-card min-h-[176px] px-4 py-4 md:px-5 md:py-5 flex flex-col items-start text-left justify-between active:scale-[0.985]',
                sel && 'calc-choice-card-selected',
              )}
            >
              <div className="w-full flex items-start justify-between gap-3 relative z-[1]">
                <span className={cn('calc-icon-chip', sel && 'calc-icon-chip-active')}>
                  {ICONS[mod.id]}
                </span>

                <span
                  className={cn(
                    'calc-choice-indicator calc-check-indicator',
                    sel && 'calc-check-indicator-selected',
                  )}
                  aria-hidden="true"
                >
                  {sel && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                      <path d="M1 3l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              </div>

              <div className="w-full relative z-[1]">
                <div className="flex items-start justify-between gap-2 w-full mb-2 flex-wrap">
                  <p className="text-[0.92rem] text-text-1 leading-snug pr-2">{mod.label}</p>
                  <span className={cn('calc-choice-badge', sel && 'calc-choice-badge-active')}>
                    {sel ? 'Aktiv' : 'Optional'}
                  </span>
                </div>

                {mod.price > 0 && (
                  <p className="text-[0.72rem]" style={{ color: sel ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.42)' }}>
                    + ca. {mod.price.toLocaleString('de-DE')} €
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="calc-hint-box">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="calc-hint-icon" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <p className="calc-hint-text">
          <strong>Mehrfachauswahl möglich:</strong> Wählen Sie nur, was zusätzlich gewünscht ist. Nicht ausgewählte Punkte werden nicht mitgerechnet.
        </p>
      </div>
    </div>
  )
}
