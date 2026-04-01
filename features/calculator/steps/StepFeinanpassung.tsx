'use client'

import { FINE_ITEMS } from '@/config/pricing'

interface Props {
  fineQty: Record<string, number>
  onQtyChange: (id: string, value: number) => void
}

export function StepFeinanpassung({ fineQty, onQtyChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.82rem] text-text-2 leading-relaxed mb-1">
        Alle Felder sind optional. Lassen Sie Felder auf 0, wenn Sie es noch nicht wissen –
        das beeinflusst nur die Feinabstimmung der Schätzung.
      </p>
      {FINE_ITEMS.map((item) => {
        const qty = fineQty[item.id] ?? item.defaultQty
        return (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 px-5 py-4 rounded-lg"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[0.88rem] text-text-1 font-normal leading-snug">{item.label}</p>
              <p className="text-[0.72rem] text-text-3 mt-0.5">{item.description}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onQtyChange(item.id, qty - 1)}
                disabled={qty <= item.min}
                aria-label={`${item.label} verringern`}
                className="w-9 h-9 rounded-full flex items-center justify-center text-text-2
                           transition-colors hover:text-text-1 disabled:opacity-30
                           disabled:cursor-not-allowed bg-transparent"
                style={{ border: '1px solid rgba(255,255,255,0.11)' }}
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
      })}
    </div>
  )
}
