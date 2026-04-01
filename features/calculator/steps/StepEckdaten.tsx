'use client'

interface Props {
  m2: number
  rooms: number
  bathrooms: number
  onM2Change: (v: number) => void
  onRoomsChange: (v: number) => void
  onBathroomsChange: (v: number) => void
}

interface StepperProps {
  label: string
  sub: string
  value: number
  unit: string
  onDecrement: () => void
  onIncrement: () => void
  min: number
  max: number
}

function Stepper({ label, sub, value, unit, onDecrement, onIncrement, min, max }: StepperProps) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-5 py-4 rounded-lg"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-[0.88rem] text-text-1 font-normal leading-snug">{label}</p>
        <p className="text-[0.72rem] text-text-3 mt-0.5">{sub}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`${label} verringern`}
          className="w-9 h-9 rounded-full flex items-center justify-center text-text-2
                     transition-colors hover:text-text-1 disabled:opacity-30
                     disabled:cursor-not-allowed bg-transparent"
          style={{ border: '1px solid rgba(255,255,255,0.11)' }}
        >
          −
        </button>
        <span className="text-[1rem] text-text-1 min-w-[56px] text-center tabular-nums">
          {value} {unit}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`${label} erhöhen`}
          className="w-9 h-9 rounded-full flex items-center justify-center text-text-2
                     transition-colors hover:text-text-1 disabled:opacity-30
                     disabled:cursor-not-allowed bg-transparent"
          style={{ border: '1px solid rgba(255,255,255,0.11)' }}
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
      <Stepper
        label="Wohnfläche"
        sub="Beheizte Nutzfläche in Quadratmetern"
        value={m2}
        unit="m²"
        onDecrement={() => onM2Change(m2 - 10)}
        onIncrement={() => onM2Change(m2 + 10)}
        min={20}
        max={500}
      />
      <Stepper
        label="Anzahl Räume"
        sub="Wohn-, Schlaf-, Kinder- und Arbeitszimmer"
        value={rooms}
        unit={rooms === 1 ? 'Raum' : 'Räume'}
        onDecrement={() => onRoomsChange(rooms - 1)}
        onIncrement={() => onRoomsChange(rooms + 1)}
        min={1}
        max={20}
      />
      <Stepper
        label="Badezimmer"
        sub="Bad, Duschbad, WC mit Anschlüssen"
        value={bathrooms}
        unit={bathrooms === 1 ? 'Bad' : 'Bäder'}
        onDecrement={() => onBathroomsChange(bathrooms - 1)}
        onIncrement={() => onBathroomsChange(bathrooms + 1)}
        min={1}
        max={6}
      />
      <p className="text-[0.72rem] text-text-4 mt-1 leading-relaxed">
        Ungefähre Angaben genügen – diese Einschätzung ist kein verbindliches Angebot.
      </p>
    </div>
  )
}
