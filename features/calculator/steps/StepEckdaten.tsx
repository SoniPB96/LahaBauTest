'use client'

interface Props {
  m2: number
  rooms: number
  bathrooms: number
  onM2Change: (v: number) => void
  onRoomsChange: (v: number) => void
  onBathroomsChange: (v: number) => void
}

interface BigStepperProps {
  label: string
  value: number
  display: string
  onDecrement: () => void
  onIncrement: () => void
  min: number
  max: number
}

function BigStepper({ label, value, display, onDecrement, onIncrement, min, max }: BigStepperProps) {
  return (
    <div
      className="flex items-center justify-between rounded-2xl"
      style={{ padding: '1.1rem 1.4rem', border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
    >
      <p className="text-[0.9rem] text-text-1">{label}</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`${label} verringern`}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[1.2rem]
                     font-light transition-all duration-150 disabled:opacity-25
                     disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.93)'}
          onMouseUp={e => e.currentTarget.style.transform = ''}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          −
        </button>
        <span
          className="font-serif tabular-nums text-center"
          style={{ fontSize: '1.5rem', color: '#ededeb', letterSpacing: '-0.02em', minWidth: '72px' }}
        >
          {display}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`${label} erhöhen`}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[1.2rem]
                     font-light transition-all duration-150 disabled:opacity-25
                     disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.93)'}
          onMouseUp={e => e.currentTarget.style.transform = ''}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          +
        </button>
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
        onDecrement={() => onM2Change(m2 - 10)}
        onIncrement={() => onM2Change(m2 + 10)}
        min={20}
        max={500}
      />
      <BigStepper
        label="Zimmer"
        value={rooms}
        display={`${rooms}`}
        onDecrement={() => onRoomsChange(rooms - 1)}
        onIncrement={() => onRoomsChange(rooms + 1)}
        min={1}
        max={20}
      />
      <BigStepper
        label="Bäder"
        value={bathrooms}
        display={`${bathrooms}`}
        onDecrement={() => onBathroomsChange(bathrooms - 1)}
        onIncrement={() => onBathroomsChange(bathrooms + 1)}
        min={1}
        max={6}
      />
      <p className="text-[0.72rem] mt-1 px-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
        Küche und Flur sind automatisch enthalten – bitte nicht mitzählen.
        Ungefähre Angaben reichen vollständig aus.
      </p>
    </div>
  )
}
