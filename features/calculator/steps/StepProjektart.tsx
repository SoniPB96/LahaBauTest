'use client'

import type { ProjektType } from '../types'
import { DIRECT_ANFRAGE_TYPES } from '@/config/pricing'
import { cn } from '@/lib/utils'

interface Props {
  value: ProjektType | ''
  onChange: (v: ProjektType) => void
  error: boolean
}

const OPTIONS: { id: ProjektType; label: string; sub: string }[] = [
  {
    id: 'neubau',
    label: 'Neubau',
    sub: 'Komplette Elektroinstallation in einem Neubau',
  },
  {
    id: 'altbau',
    label: 'Altbau / Bestand',
    sub: 'Erneuerung oder Erweiterung in einem bestehenden Gebäude',
  },
  {
    id: 'komplettsanierung',
    label: 'Komplettsanierung',
    sub: 'Komplette Erneuerung der gesamten Elektroanlage',
  },
  {
    id: 'teilsanierung',
    label: 'Teil-Erneuerung / Nachinstallation',
    sub: 'Einzelne Bereiche oder zusätzliche Leitungen nachrüsten',
  },
  {
    id: 'zaehler',
    label: 'Zählerschrank / Unterverteilung',
    sub: 'Austausch oder Aufrüstung des Sicherungskastens',
  },
  {
    id: 'sonderfall',
    label: 'Sonderfall / Ich bin unsicher',
    sub: 'Ich weiß noch nicht genau, was ich brauche',
  },
]

export function StepProjektart({ value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-2.5">
      {error && (
        <p className="text-[0.78rem] text-danger mb-1" role="alert">
          Bitte wählen Sie einen Projekttyp aus.
        </p>
      )}
      {OPTIONS.map(({ id, label, sub }) => {
        const selected = value === id
        const isDirect = DIRECT_ANFRAGE_TYPES.includes(id)
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={selected}
            className="flex items-start gap-4 px-4 py-4 rounded-lg border text-left w-full transition-colors"
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
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[0.88rem] text-text-1 font-normal leading-snug">{label}</p>
                {isDirect && (
                  <span
                    className="text-[0.6rem] px-1.5 py-0.5 rounded"
                    style={{
                      color: '#c9aa72',
                      background: 'rgba(201,170,114,0.10)',
                      border: '1px solid rgba(201,170,114,0.20)',
                    }}
                  >
                    Individuelle Anfrage
                  </span>
                )}
              </div>
              <p className="text-[0.75rem] text-text-3 mt-0.5 leading-snug">{sub}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
