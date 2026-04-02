'use client'

import { ADD_ON_MODULES } from '@/config/pricing'

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
      <div className="grid grid-cols-2 gap-3">
        {ADD_ON_MODULES.map((mod) => {
          const sel = selected.includes(mod.id)
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onToggle(mod.id)}
              aria-pressed={sel}
              className="flex flex-col items-start text-left rounded-2xl p-4
                         transition-all duration-200 relative"
              style={{
                border: sel ? '2px solid #c9aa72' : '1.5px solid rgba(255,255,255,0.08)',
                background: sel ? 'rgba(201,170,114,0.07)' : 'rgba(255,255,255,0.02)',
              }}
            >
              {/* Checkmark top-right */}
              <span
                className="absolute top-3 right-3 w-4 h-4 rounded flex items-center justify-center transition-all duration-200"
                style={{
                  border: sel ? '1.5px solid #c9aa72' : '1.5px solid rgba(255,255,255,0.15)',
                  background: sel ? '#c9aa72' : 'transparent',
                }}
              >
                {sel && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                    <path d="M1 3l2 2 4-4" stroke="#1a1400" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>

              {/* Icon */}
              <span
                className="mb-3 transition-colors duration-200"
                style={{ color: sel ? '#c9aa72' : 'rgba(255,255,255,0.35)' }}
              >
                {ICONS[mod.id]}
              </span>

              {/* Label */}
              <p className="text-[0.85rem] text-text-1 leading-snug mb-1 pr-4">{mod.label}</p>

              {/* Price */}
              {mod.price > 0 && (
                <p className="text-[0.7rem]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  + ca. {mod.price.toLocaleString('de-DE')} €
                </p>
              )}
            </button>
          )
        })}
      </div>
      <p className="text-[0.72rem] px-1 mt-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
        Mehrfachauswahl möglich. Nichts auswählen ist auch in Ordnung.
      </p>
    </div>
  )
}
