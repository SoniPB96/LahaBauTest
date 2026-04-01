import type { ObjektType, ProjektType, MaterialType } from '@/config/pricing'

export type { ObjektType, ProjektType, MaterialType }

export type StepId =
  | 'objekt'
  | 'projekt'
  | 'optionen'
  | 'ausstattung'
  | 'material'
  | 'ergebnis'
  | 'anfrage'

export interface StepMeta {
  id: StepId
  label: string
  index: number
}

export const STEPS: StepMeta[] = [
  { id: 'objekt',      label: 'Objekt',      index: 1 },
  { id: 'projekt',     label: 'Projekt',     index: 2 },
  { id: 'optionen',    label: 'Optionen',    index: 3 },
  { id: 'ausstattung', label: 'Ausstattung', index: 4 },
  { id: 'material',    label: 'Material',    index: 5 },
  { id: 'ergebnis',    label: 'Ergebnis',    index: 6 },
  { id: 'anfrage',     label: 'Anfrage',     index: 7 },
]

export interface CalculatorState {
  currentStep: StepId
  objekt: ObjektType | ''
  m2: number
  projekt: ProjektType | ''
  selectedOptions: string[]
  quantities: Record<string, number>
  material: MaterialType
}

export const INITIAL_STATE: CalculatorState = {
  currentStep: 'objekt',
  objekt: '',
  m2: 80,
  projekt: '',
  selectedOptions: [],
  quantities: {},
  material: 'standard',
}
