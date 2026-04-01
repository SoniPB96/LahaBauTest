'use client'

import type { ObjektType } from '../types'
import { cn } from '@/lib/utils'

interface Props {
  value: ObjektType | ''
  onChange: (v: ObjektType) => void
  error: boolean
}

const OPTIONS: { id: ObjektType; label: string; sub: string }[] = [
  { id: 'wohnung', label: 'Wohnung', sub: 'Eigentumswohnung oder Mietwohnung' },
  { id: 'haus',    label: 'Haus',    sub: 'Einfamilienhaus, Doppelhaus oder Reihenhaus' },
]

export function StepObjektart({ value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="text-[0.78rem] text-danger mb-1" role="alert">
          Bitte wählen Sie Ihr Objekt aus.
        </p>
      )}
      {OPTIONS.map(({ id, label, sub }) => {
        const selected = value === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={selected}
            className="flex items-start gap-4 px-5 py-5 rounded-lg border text-left w-full transition-colors"
            style={{
              borderColor: selected ? '#c9aa72' : 'rgba(255,255,255,0.06)',
              background: selected ? 'rgba(201,170,114,0.06)' : 'transparent',
            }}
          >
            <span
              className="mt-0.5 w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0"
              style={{
                borderColor: selected ? '#c9aa72' : 'rgba(255,255,255,0.25)',
                background: selected ? '#c9aa72' : 'transparent',
              }}
            >
              {selected && <span className="block w-[6px] h-[6px] rounded-full bg-[#1a1400]" />}
            </span>
            <div>
              <p className="text-[0.92rem] text-text-1 font-normal leading-snug mb-1">{label}</p>
              <p className="text-[0.78rem] text-text-3 leading-snug">{sub}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
