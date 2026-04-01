'use client'

interface Props {
  m2: number
  rooms: number
  bathrooms: number
  onM2Change: (v: number) => void
  onRoomsChange: (v: number) => void
  onBathroomsChange: (v: number) => void
}

function BigStepper({
  label, value, display, note, onDecrement, onIncrement, min, max,
}: {
  label: string; value: number; display: string; note?: string
  onDecrement: () => void; onIncrement: () => void; min: number; max: number
}) {
  return (
    <div className="calc-choice-card px-4 py-4 md:px-5 md:py-4 flex items-center justify-between gap-4">
      <div className="relative z-[1]">
        <p className="text-[0.92rem] text-text-1">{label}</p>
        {note && <p className="text-[0.68rem] mt-1" style={{ color: 'rgba(255,255,255,0.34)' }}>{note}</p>}
      </div>
      <div className="flex items-center gap-2 md:gap-3 shrink-0 relative z-[1]">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`${label} verringern`}
          className="w-11 h-11 rounded-2xl flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed transition-all active:scale-[0.96]"
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.72)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '1.15rem',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(201,170,114,0.12)'
            e.currentTarget.style.borderColor = 'rgba(201,170,114,0.22)'
            e.currentTarget.style.color = '#dfc28e'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.72)'
          }}
        >−</button>
        <span
          className="font-serif tabular-nums text-center min-w-[84px] rounded-2xl px-3 py-2"
          style={{
            fontSize: '1.35rem',
            color: '#ededeb',
            letterSpacing: '-0.02em',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {display}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`${label} erhöhen`}
          className="w-11 h-11 rounded-2xl flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed transition-all active:scale-[0.96]"
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.72)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '1.15rem',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(201,170,114,0.12)'
            e.currentTarget.style.borderColor = 'rgba(201,170,114,0.22)'
            e.currentTarget.style.color = '#dfc28e'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.72)'
          }}
        >+</button>
      </div>
    </div>
  )
}

export function StepEckdaten({ m2, rooms, bathrooms, onM2Change, onRoomsChange, onBathroomsChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <BigStepper
        label="Wohnfläche"
        value={m2}
        display={`${m2} m²`}
        note={m2 <= 80 ? 'bis 80 m²' : `${m2} m²`}
        onDecrement={() => onM2Change(m2 - 10)}
        onIncrement={() => onM2Change(m2 + 10)}
        min={20} max={500}
      />
      <BigStepper
        label="Zimmer"
        value={rooms}
        display={`${rooms}`}
        onDecrement={() => onRoomsChange(rooms - 1)}
        onIncrement={() => onRoomsChange(rooms + 1)}
        min={1} max={20}
      />
      <BigStepper
        label="Bäder"
        value={bathrooms}
        display={`${bathrooms}`}
        onDecrement={() => onBathroomsChange(bathrooms - 1)}
        onIncrement={() => onBathroomsChange(bathrooms + 1)}
        min={1} max={6}
      />

      <div className="calc-hint-box">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="calc-hint-icon" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <p className="calc-hint-text">
          <strong>Bitte nicht mitzählen:</strong> Küche und Flur sind automatisch in der Kalkulation enthalten.
        </p>
      </div>
    </div>
  )
}
