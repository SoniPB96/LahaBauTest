'use client'

import type { MaterialType } from '../types'
import { MATERIAL_MULTIPLIERS, MATERIAL_LABELS } from '@/config/pricing'
import { cn } from '@/lib/utils'

interface Props {
  value: MaterialType
  onChange: (v: MaterialType) => void
}

const DESCRIPTIONS: Record<MaterialType, string> = {
  standard: 'Markenmaterial namhafter Hersteller – gutes Preis-Leistungs-Verhältnis',
  premium:  'Hochwertige Schalterserien, z.B. Gira E2 oder Jung LS990',
  design:   'Designserien, z.B. Busch-Jaeger Axcent oder Gira Esprit',
}

const MATERIALS: MaterialType[] = ['standard', 'premium', 'design']

export function StepMaterial({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {MATERIALS.map((mat) => {
        const selected = value === mat
        const surcharge = Math.round((MATERIAL_MULTIPLIERS[mat] - 1) * 100)
        return (
          <button
            key={mat}
            type="button"
            onClick={() => onChange(mat)}
            className="flex items-start gap-3 px-4 py-4 rounded-lg border text-left transition-colors w-full"
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
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-[0.88rem] text-text-1 font-normal">{MATERIAL_LABELS[mat]}</p>
                {surcharge > 0 && (
                  <p className="text-[0.72rem] text-text-3">+{surcharge}% Aufschlag</p>
                )}
                {surcharge === 0 && (
                  <p className="text-[0.72rem] text-text-3">Basispreis</p>
                )}
              </div>
              <p className="text-[0.72rem] text-text-3 mt-0.5 leading-snug">
                {DESCRIPTIONS[mat]}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
