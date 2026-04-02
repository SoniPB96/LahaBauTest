'use client'

import type { ObjektType } from '../types'

interface Props {
  value: ObjektType | ''
  onChange: (v: ObjektType) => void
  error: boolean
}

const OPTIONS: { id: ObjektType; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    id: 'wohnung',
    label: 'Wohnung',
    sub: 'Eigentumswohnung oder Mietwohnung',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="10" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 12l10-8 10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="11" y="17" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="10" y1="10" x2="10" y2="10" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    id: 'haus',
    label: 'Haus',
    sub: 'Einfamilienhaus, Doppelhaus oder Reihenhaus',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M3 14l11-10 11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12v12h16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="11" y="18" width="6" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="7" y="14" width="4" height="4" rx="0.75" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="17" y="14" width="4" height="4" rx="0.75" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
]

export function StepObjektart({ value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="text-[0.78rem] mb-2 px-3 py-2 rounded-lg"
          style={{ color: '#e05252', background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.2)' }}
          role="alert">
          Bitte wählen Sie Ihr Objekt aus.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map(({ id, label, sub, icon }) => {
          const sel = value === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={sel}
              className="flex flex-col items-center text-center rounded-2xl
                         transition-all duration-200 py-8 px-4"
              style={{
                border: sel ? '2px solid #c9aa72' : '1.5px solid rgba(255,255,255,0.08)',
                background: sel ? 'rgba(201,170,114,0.07)' : 'rgba(255,255,255,0.02)',
                color: sel ? '#c9aa72' : 'rgba(255,255,255,0.45)',
              }}
            >
              <span className="mb-3 transition-colors duration-200">{icon}</span>
              <p className="text-[1rem] font-normal mb-1" style={{ color: sel ? '#ededeb' : '#ededeb' }}>{label}</p>
              <p className="text-[0.72rem] leading-snug" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
