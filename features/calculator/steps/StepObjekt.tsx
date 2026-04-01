'use client'

import type { ObjektType } from '../types'
import { cn } from '@/lib/utils'

interface Props {
  value: ObjektType | ''
  m2: number
  onChange: (v: ObjektType) => void
  onM2Change: (v: number) => void
  error?: boolean
}

const OBJEKTE: { id: ObjektType; label: string; sub: string }[] = [
  { id: 'EFH', label: 'Einfamilienhaus', sub: 'Haus mit Keller, EG und OG' },
  { id: 'DG',  label: 'Dachgeschosswohnung', sub: 'Ausbau oder Bestand' },
  { id: 'ETW', label: 'Eigentumswohnung', sub: 'Wohnung im Mehrfamilienhaus' },
  { id: 'ZFH', label: 'Zweifamilienhaus', sub: 'Zwei separate Einheiten' },
]

export function StepObjekt({ value, m2, onChange, onM2Change, error }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {error && (
        <p className="text-[0.78rem] text-danger">Bitte wählen Sie ein Objekt aus.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OBJEKTE.map(({ id, label, sub }) => {
          const selected = value === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                'flex items-start gap-3 px-4 py-4 rounded-lg border text-left transition-colors',
                selected
                  ? 'border-gold bg-gold-tint'
                  : 'border-subtle bg-bg-3 hover:border-muted',
              )}
              style={{
                borderColor: selected ? '#c9aa72' : 'rgba(255,255,255,0.06)',
                backgroundColor: selected ? 'rgba(201,170,114,0.08)' : undefined,
              }}
              aria-pressed={selected}
            >
              <span
                className={cn(
                  'mt-0.5 w-[16px] h-[16px] rounded-full border-[1.5px] flex items-center justify-center shrink-0',
                )}
                style={{
                  borderColor: selected ? '#c9aa72' : 'rgba(255,255,255,0.18)',
                  backgroundColor: selected ? '#c9aa72' : 'transparent',
                }}
              >
                {selected && (
                  <span className="block w-[6px] h-[6px] rounded-full bg-[#1a1400]" />
                )}
              </span>
              <div>
                <p className="text-[0.88rem] text-text-1 font-normal leading-snug">{label}</p>
                <p className="text-[0.72rem] text-text-3 mt-0.5">{sub}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* m² picker */}
      <div
        className="border rounded-lg px-5 py-4"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <p className="text-[0.68rem] tracking-[0.1em] uppercase text-text-4 mb-4 font-normal">
          Wohnfläche (ca.)
        </p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => onM2Change(m2 - 10)}
            disabled={m2 <= 20}
            aria-label="Fläche verringern"
            className="w-9 h-9 rounded-full border flex items-center justify-center text-text-2
                       transition-colors hover:border-muted hover:text-text-1 disabled:opacity-30
                       disabled:cursor-not-allowed bg-transparent"
            style={{ borderColor: 'rgba(255,255,255,0.11)' }}
          >
            −
          </button>
          <span className="font-serif text-[1.5rem] text-text-1 tracking-[-0.02em] min-w-[90px] text-center">
            {m2} m²
          </span>
          <button
            type="button"
            onClick={() => onM2Change(m2 + 10)}
            disabled={m2 >= 500}
            aria-label="Fläche erhöhen"
            className="w-9 h-9 rounded-full border flex items-center justify-center text-text-2
                       transition-colors hover:border-muted hover:text-text-1 disabled:opacity-30
                       disabled:cursor-not-allowed bg-transparent"
            style={{ borderColor: 'rgba(255,255,255,0.11)' }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
