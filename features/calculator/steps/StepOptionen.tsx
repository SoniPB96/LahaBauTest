'use client'

import { FLAT_OPTIONS } from '@/config/pricing'
import { cn } from '@/lib/utils'

interface Props {
  selected: string[]
  onToggle: (id: string) => void
}

export function StepOptionen({ selected, onToggle }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {FLAT_OPTIONS.map((opt) => {
        const isSelected = selected.includes(opt.id)
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className="flex items-start gap-3 px-4 py-4 rounded-lg border text-left transition-colors w-full"
            style={{
              borderColor: isSelected ? '#c9aa72' : 'rgba(255,255,255,0.06)',
              backgroundColor: isSelected ? 'rgba(201,170,114,0.08)' : undefined,
            }}
            aria-pressed={isSelected}
          >
            {/* Checkbox */}
            <span
              className="mt-0.5 w-[16px] h-[16px] rounded flex items-center justify-center shrink-0 border-[1.5px] transition-colors"
              style={{
                borderColor: isSelected ? '#c9aa72' : 'rgba(255,255,255,0.18)',
                backgroundColor: isSelected ? '#c9aa72' : 'transparent',
              }}
            >
              {isSelected && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                  <path d="M1 4l3 3 5-5" stroke="#1a1400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-[0.88rem] text-text-1 font-normal leading-snug">{opt.label}</p>
                {opt.price > 0 && (
                  <p className="text-[0.75rem] text-text-3 shrink-0">
                    + {opt.price.toLocaleString('de-DE')} €
                  </p>
                )}
              </div>
              <p className="text-[0.72rem] text-text-3 mt-0.5 leading-snug">{opt.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
