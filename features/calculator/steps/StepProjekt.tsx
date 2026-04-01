'use client'

import type { ProjektType } from '../types'
import { DIRECT_ANFRAGE_TYPES } from '@/config/pricing'
import { cn } from '@/lib/utils'

interface Props {
  value: ProjektType | ''
  onChange: (v: ProjektType) => void
  error?: boolean
}

const PROJEKTE: { id: ProjektType; label: string; sub: string }[] = [
  { id: 'sanierung',     label: 'Sanierung / Renovierung', sub: 'Erneuerung der bestehenden Installation' },
  { id: 'modernisierung',label: 'Modernisierung',           sub: 'Ergänzung und Verbesserung einzelner Bereiche' },
  { id: 'erweiterung',   label: 'Erweiterung / Anbau',     sub: 'Neuer Bereich wird ans Netz angebunden → Individuelle Anfrage' },
  { id: 'zaehler',       label: 'Zählerschrank erneuern',  sub: 'Hauptverteilung und Absicherung → Individuelle Anfrage' },
]

export function StepProjekt({ value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="text-[0.78rem] text-danger mb-1">Bitte wählen Sie einen Projekttyp.</p>
      )}

      {PROJEKTE.map(({ id, label, sub }) => {
        const selected = value === id
        const isDirect = DIRECT_ANFRAGE_TYPES.includes(id)
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              'flex items-start gap-3 px-4 py-4 rounded-lg border text-left transition-colors w-full',
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
              className="mt-0.5 w-[16px] h-[16px] rounded-full border-[1.5px] flex items-center justify-center shrink-0"
              style={{
                borderColor: selected ? '#c9aa72' : 'rgba(255,255,255,0.18)',
                backgroundColor: selected ? '#c9aa72' : 'transparent',
              }}
            >
              {selected && <span className="block w-[6px] h-[6px] rounded-full bg-[#1a1400]" />}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[0.88rem] text-text-1 font-normal leading-snug">{label}</p>
                {isDirect && (
                  <span
                    className="text-[0.62rem] text-gold px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(201,170,114,0.12)', border: '1px solid rgba(201,170,114,0.22)' }}
                  >
                    Individuelle Anfrage
                  </span>
                )}
              </div>
              <p className="text-[0.72rem] text-text-3 mt-0.5 leading-snug">{sub}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
