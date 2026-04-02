'use client'

import type { RoomConfig, QualitaetType } from '@/config/pricing'
import {
  BASE_FITTINGS_ROOM,
  BASE_FITTINGS_BATHROOM,
  BASE_FITTINGS_KITCHEN,
} from '@/config/pricing'

interface Props {
  roomConfigs: RoomConfig[]
  addOns: string[]
  qualitaet: QualitaetType
  onUpdate: (roomId: string, patch: Partial<Omit<RoomConfig, 'id' | 'kind' | 'label'>>) => void
}

const hasLan = (addOns: string[]) => addOns.includes('lan')
const hasJalousien = (addOns: string[]) => addOns.includes('jalousien')
const hasFbh = (addOns: string[]) => addOns.includes('fussbodenheizung')

function Stepper({
  value,
  onDecrement,
  onIncrement,
  min = 0,
  max = 10,
  label,
}: {
  value: number
  onDecrement: () => void
  onIncrement: () => void
  min?: number
  max?: number
  label: string
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label={`${label} verringern`}
        className="calc-stepper-button w-8 h-8 rounded-full text-base"
      >
        −
      </button>
      <span className="text-[0.92rem] text-text-1 min-w-[22px] text-center tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        aria-label={`${label} erhöhen`}
        className="calc-stepper-button w-8 h-8 rounded-full text-base"
      >
        +
      </button>
    </div>
  )
}

function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-all shrink-0"
      style={{
        background: value ? 'linear-gradient(180deg, #dfc28e 0%, #c9aa72 100%)' : 'rgba(255,255,255,0.12)',
        boxShadow: value ? '0 10px 18px rgba(0,0,0,0.18)' : 'none',
      }}
    >
      <span
        className="absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white transition-transform"
        style={{ transform: value ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </button>
  )
}

function RoomCard({
  rc,
  addOns,
  qualitaet,
  onUpdate,
}: {
  rc: RoomConfig
  addOns: string[]
  qualitaet: QualitaetType
  onUpdate: (patch: Partial<Omit<RoomConfig, 'id' | 'kind' | 'label'>>) => void
}) {
  const fittings =
    rc.kind === 'bathroom'
      ? BASE_FITTINGS_BATHROOM[qualitaet]
      : rc.kind === 'kitchen'
      ? BASE_FITTINGS_KITCHEN[qualitaet]
      : BASE_FITTINGS_ROOM[qualitaet]

  const showLan = hasLan(addOns)
  const showJalousien = hasJalousien(addOns)
  const showFbh = hasFbh(addOns)
  const hasAnyExtra = showLan || showJalousien || showFbh

  return (
    <div className="calc-room-card">
      <div className="calc-room-header">
        <span className="text-[0.9rem] text-text-1 font-normal">{rc.label}</span>
        <span className="calc-choice-badge calc-choice-badge-active">
          {fittings.sockets} Steckdosen · {fittings.switches} Schalter
        </span>
      </div>

      {hasAnyExtra ? (
        <div className="px-4 py-4 flex flex-col gap-3">
          {showLan && (
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.82rem] text-text-2">Netzwerkanschlüsse</p>
                <p className="text-[0.68rem] text-text-4">Anzahl Punkte, Detailausführung erfolgt vor Ort</p>
              </div>
              <Stepper
                value={rc.lan}
                onDecrement={() => onUpdate({ lan: Math.max(0, rc.lan - 1) })}
                onIncrement={() => onUpdate({ lan: rc.lan + 1 })}
                max={8}
                label={`Netzwerkanschlüsse in ${rc.label}`}
              />
            </div>
          )}

          {showJalousien && (
            <div
              className="flex items-center justify-between gap-3"
              style={showLan ? { borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.9rem' } : undefined}
            >
              <div>
                <p className="text-[0.82rem] text-text-2">Jalousien / Rollläden</p>
                <p className="text-[0.68rem] text-text-4">Anzahl Antriebe</p>
              </div>
              <Stepper
                value={rc.jalousien}
                onDecrement={() => onUpdate({ jalousien: Math.max(0, rc.jalousien - 1) })}
                onIncrement={() => onUpdate({ jalousien: rc.jalousien + 1 })}
                max={6}
                label={`Jalousien in ${rc.label}`}
              />
            </div>
          )}

          {showFbh && (
            <div
              className="flex items-center justify-between gap-3"
              style={showLan || showJalousien ? { borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.9rem' } : undefined}
            >
              <div>
                <p className="text-[0.82rem] text-text-2">Fußbodenheizung</p>
                <p className="text-[0.68rem] text-text-4">In diesem Raum aktiv</p>
              </div>
              <Toggle
                value={rc.fussbodenheizung}
                onChange={(v) => onUpdate({ fussbodenheizung: v })}
                label={`Fußbodenheizung in ${rc.label}`}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="px-4 py-4">
          <p className="text-[0.75rem] text-text-4 italic">Keine Extras ausgewählt</p>
        </div>
      )}
    </div>
  )
}

export function StepRaumeditor({ roomConfigs, addOns, qualitaet, onUpdate }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="mb-1">
        <p className="text-[0.82rem] text-text-2 leading-relaxed">
          Hier sehen Sie jeden Raum einzeln. Die Basisausstattung ist bereits nach Ihrer Qualitätswahl voreingestellt. Passen Sie die Extras pro Raum nach Bedarf an.
        </p>
        {addOns.includes('lan') || addOns.includes('jalousien') || addOns.includes('fussbodenheizung') ? null : (
          <p className="text-[0.75rem] text-text-4 mt-1">
            Sie haben keine konfigurierbaren Extras gewählt – die Basisausstattung wird übernommen.
          </p>
        )}
      </div>

      <div className="calc-hint-box">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="calc-hint-icon" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <p className="calc-hint-text">
          <strong>Hinweis:</strong> Die Küche ist automatisch enthalten und wurde nicht in Ihrer Zimmerzahl gezählt.
        </p>
      </div>

      {roomConfigs.map((rc) => (
        <RoomCard
          key={rc.id}
          rc={rc}
          addOns={addOns}
          qualitaet={qualitaet}
          onUpdate={(patch) => onUpdate(rc.id, patch)}
        />
      ))}
    </div>
  )
}
