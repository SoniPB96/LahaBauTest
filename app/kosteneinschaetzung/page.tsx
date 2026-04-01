import type { Metadata } from 'next'
import { CalculatorShell } from '@/features/calculator/CalculatorShell'

export const metadata: Metadata = {
  title: 'Erste Kosteneinschätzung',
  description:
    'Erhalten Sie in wenigen Schritten eine erste Orientierung zu den Kosten Ihres Elektroprojekts in Paderborn. Kein Verkaufsgespräch, keine Verpflichtung.',
}

export default function KosteneinschaetzungPage() {
  return <CalculatorShell />
}
