'use client'

import type { ProjektType } from '../types'
import { DIRECT_ANFRAGE_TYPES } from '@/config/pricing'

interface Props {
  value: ProjektType | ''
  onChange: (v: ProjektType) => void
  error: boolean
}

const OPTIONS: { id: ProjektType; label: string; sub: string }[] = [
  { id: 'neubau',           label: 'Neubau',                          sub: 'Komplette Elektroinstallation im Neubau' },
  { id: 'altbau',           label: 'Altbau / Bestand',                sub: 'Erneuerung in einem bestehenden Gebäude' },
  { id: 'komplettsanierung',label: 'Komplettsanierung',               sub: 'Komplette Erneuerung der gesamten Elektrik' },
  { id: 'teilsanierung',    label: 'Teil-Erneuerung',                 sub: 'Einzelne Bereiche oder Leitungen nachrüsten' },
  { id: 'zaehler',          label: 'Zählerschrank / Sicherungskasten',sub: 'Austausch oder Aufrüstung' },
  { id: 'sonderfall',       label: 'Ich bin noch unsicher',           sub: 'Wir beraten Sie gerne persönlich' },
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
        const sel      = value === id
        const isDirect = DIRECT_ANFRAGE_TYPES.includes(id)
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={sel}
            className="flex items-center gap-4 text-left w-full rounded-xl
                       transition-all duration-200"
            style={{
              padding: '1rem 1.25rem',
              border: sel ? '2px solid #c9aa72' : '1.5px solid rgba(255,255,255,0.07)',
              background: sel ? 'rgba(201,170,114,0.07)' : 'rgba(255,255,255,0.02)',
            }}
          >
            {/* Radio */}
            <span
              className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                border: sel ? '2px solid #c9aa72' : '2px solid rgba(255,255,255,0.18)',
                background: sel ? '#c9aa72' : 'transparent',
              }}
            >
              {sel && <span className="block w-[6px] h-[6px] rounded-full" style={{ background: '#1a1400' }} />}
            </span>

            <div className="flex-1 min-w-0">
              <p className="text-[0.9rem] text-text-1 leading-snug">{label}</p>
              <p className="text-[0.72rem] mt-0.5 leading-snug" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</p>
            </div>

            {isDirect && (
              <span
                className="shrink-0 text-[0.6rem] font-medium tracking-wide rounded-full px-2 py-0.5"
                style={{ color: 'rgba(201,170,114,0.8)', background: 'rgba(201,170,114,0.08)', border: '1px solid rgba(201,170,114,0.15)' }}
              >
                Anfrage
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
