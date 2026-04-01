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
    <div
      className="flex items-center justify-between rounded-2xl"
      style={{ padding: '1rem 1.25rem', border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div>
        <p className="text-[0.9rem] text-text-1">{label}</p>
        {note && <p className="text-[0.68rem] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{note}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button" onClick={onDecrement} disabled={value <= min}
          aria-label={`${label} verringern`}
          className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '1.2rem', transition: 'background 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
        >−</button>
        <span className="font-serif tabular-nums text-center min-w-[80px]"
          style={{ fontSize: '1.4rem', color: '#ededeb', letterSpacing: '-0.02em' }}>
          {display}
        </span>
        <button
          type="button" onClick={onIncrement} disabled={value >= max}
          aria-label={`${label} erhöhen`}
          className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '1.2rem', transition: 'background 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
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

      {/* Kitchen/hallway notice — prominent block */}
      <div
        className="flex items-start gap-3 rounded-xl mt-1"
        style={{ padding: '0.9rem 1.1rem', background: 'rgba(201,170,114,0.06)', border: '1px solid rgba(201,170,114,0.14)' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="#c9aa72" strokeWidth="1.2"/>
          <path d="M8 7v4M8 5.5v.5" stroke="#c9aa72" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <p className="text-[0.78rem] leading-relaxed" style={{ color: 'rgba(201,170,114,0.85)' }}>
          <strong className="font-normal" style={{ color: '#c9aa72' }}>Bitte nicht mitzählen:</strong>{' '}
          Küche und Flur sind automatisch in der Kalkulation enthalten.
        </p>
      </div>
    </div>
  )
}
