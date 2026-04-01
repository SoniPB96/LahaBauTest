'use client'

import type { QualitaetType } from '../types'
import { QUALITAET_MULTIPLIERS } from '@/config/pricing'

interface Props {
  value: QualitaetType
  onChange: (v: QualitaetType) => void
}

const OPTIONS: {
  id: QualitaetType
  label: string
  sub: string
  details: string
}[] = [
  {
    id: 'einfach',
    label: 'Einfach',
    sub: 'Solide und funktional',
    details:
      'Bewährte Markenmaterialien, schlichte Schalterserien. Alles funktioniert zuverlässig – ohne besondere Extras.',
  },
  {
    id: 'standard',
    label: 'Standard',
    sub: 'Gut ausgestattet – die häufigste Wahl',
    details:
      'Hochwertige Schalterserien, mehr Steckdosen pro Raum, bessere Verkabelung. Ein angenehmes Wohnkomfort-Niveau.',
  },
  {
    id: 'premium',
    label: 'Premium',
    sub: 'Komfort und Qualität ohne Kompromisse',
    details:
      'Designschalter, großzügige Ausstattung, besonders sorgfältige Ausführung. Für anspruchsvolle Ansprüche.',
  },
]

export function StepQualitaet({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.82rem] text-text-2 leading-relaxed mb-1">
        Die Qualitätsstufe beschreibt, wie hochwertig die Materialien und wie umfangreich die
        Ausstattung sein soll.
      </p>
      {OPTIONS.map(({ id, label, sub, details }) => {
        const selected = value === id
        const surcharge = Math.round((QUALITAET_MULTIPLIERS[id] - 1) * 100)
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
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
                <div>
                  <span className="text-[0.92rem] text-text-1 font-normal">{label}</span>
                  <span className="text-[0.75rem] text-text-3 ml-2">{sub}</span>
                </div>
                <span className="text-[0.72rem] text-text-3 shrink-0">
                  {surcharge > 0 ? `+${surcharge}%` : surcharge < 0 ? `${surcharge}%` : 'Basispreis'}
                </span>
              </div>
              <p className="text-[0.75rem] text-text-3 leading-[1.6]">{details}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
