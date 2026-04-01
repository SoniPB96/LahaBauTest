'use client'

import { ADD_ON_MODULES } from '@/config/pricing'

interface Props {
  selected: string[]
  onToggle: (id: string) => void
}

export function StepZusatzmodule({ selected, onToggle }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.82rem] text-text-2 leading-relaxed mb-1">
        Wählen Sie nur, was Sie tatsächlich möchten. Alles andere können Sie weglassen.
      </p>
      {ADD_ON_MODULES.map((mod) => {
        const isSelected = selected.includes(mod.id)
        return (
          <button
            key={mod.id}
            type="button"
            onClick={() => onToggle(mod.id)}
            aria-pressed={isSelected}
            className="flex items-start gap-4 px-4 py-4 rounded-lg border text-left w-full transition-colors"
            style={{
              borderColor: isSelected ? '#c9aa72' : 'rgba(255,255,255,0.06)',
              background: isSelected ? 'rgba(201,170,114,0.06)' : 'transparent',
            }}
          >
            {/* Checkbox */}
            <span
              className="mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border-[1.5px] transition-colors"
              style={{
                borderColor: isSelected ? '#c9aa72' : 'rgba(255,255,255,0.25)',
                background: isSelected ? '#c9aa72' : 'transparent',
              }}
            >
              {isSelected && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                  <path d="M1 3.5l2.5 2.5 4.5-5" stroke="#1a1400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-[0.88rem] text-text-1 font-normal leading-snug">{mod.label}</p>
                <p className="text-[0.72rem] text-text-3 shrink-0">
                  + ca. {mod.price.toLocaleString('de-DE')} €
                </p>
              </div>
              <p className="text-[0.75rem] text-text-3 mt-0.5 leading-snug">{mod.description}</p>
            </div>
          </button>
        )
      })}
      <p className="text-[0.72rem] text-text-4 mt-1 leading-relaxed">
        Keine Auswahl ist auch in Ordnung – die Grundinstallation ist immer enthalten.
      </p>
    </div>
  )
}
