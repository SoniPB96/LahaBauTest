'use client'

import { QUANTITY_ITEMS } from '@/config/pricing'

interface Props {
  selectedOptions: string[]
  quantities: Record<string, number>
  onQtyChange: (id: string, value: number) => void
}

export function StepAusstattung({ selectedOptions, quantities, onQtyChange }: Props) {
  // Show all items, hiding those whose required option isn't selected
  const visible = QUANTITY_ITEMS.filter(
    (item) => !item.requiresOption || selectedOptions.includes(item.requiresOption),
  )

  if (visible.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-[0.88rem] text-text-2 leading-relaxed">
          Keine zusätzlichen Positionen ausgewählt. Klicken Sie auf &quot;Weiter&quot;, um
          fortzufahren.
        </p>
        <p className="text-[0.78rem] text-text-3 mt-1">
          Tipp: Aktivieren Sie im vorherigen Schritt &quot;LAN / Netzwerk&quot; oder
          &quot;Fußbodenheizung&quot;, um weitere Positionen hinzuzufügen.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {visible.map((item) => {
        const qty = quantities[item.id] ?? item.defaultQty
        return (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 px-4 py-4 rounded-lg border"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[0.88rem] text-text-1 font-normal leading-snug">{item.label}</p>
              <p className="text-[0.72rem] text-text-3 mt-0.5">{item.description}</p>
              <p className="text-[0.72rem] text-text-4 mt-0.5">
                {item.pricePerUnit.toLocaleString('de-DE')} € / Stück
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onQtyChange(item.id, qty - 1)}
                disabled={qty <= item.min}
                aria-label={`${item.label} verringern`}
                className="w-8 h-8 rounded-full border flex items-center justify-center
                           text-text-2 transition-colors hover:border-muted hover:text-text-1
                           disabled:opacity-30 disabled:cursor-not-allowed bg-transparent"
                style={{ borderColor: 'rgba(255,255,255,0.11)' }}
              >
                −
              </button>
              <span className="text-[1rem] text-text-1 min-w-[28px] text-center tabular-nums">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => onQtyChange(item.id, qty + 1)}
                disabled={qty >= item.max}
                aria-label={`${item.label} erhöhen`}
                className="w-8 h-8 rounded-full border flex items-center justify-center
                           text-text-2 transition-colors hover:border-muted hover:text-text-1
                           disabled:opacity-30 disabled:cursor-not-allowed bg-transparent"
                style={{ borderColor: 'rgba(255,255,255,0.11)' }}
              >
                +
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
