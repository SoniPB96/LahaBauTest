import type {
  StartMode,
  ObjektType,
  ProjektType,
  QualitaetType,
} from '@/config/pricing'

export type { StartMode, ObjektType, ProjektType, QualitaetType }

export type StepId =
  | 'start'
  | 'objektart'
  | 'projektart'
  | 'eckdaten'
  | 'zusatzmodule'
  | 'qualitaet'
  | 'feinanpassung'
  | 'ergebnis'
  | 'direktanfrage'

export interface StepMeta {
  id: StepId
  label: string
  /** Display index shown in progress bubbles — direktanfrage shares the anfrage slot */
  index: number
}

// Steps shown in the progress indicator.
// 'direktanfrage' is not listed — it replaces the normal flow without a dedicated bubble.
export const STEPS: StepMeta[] = [
  { id: 'start',        label: 'Start',      index: 1 },
  { id: 'objektart',    label: 'Objekt',     index: 2 },
  { id: 'projektart',   label: 'Projekt',    index: 3 },
  { id: 'eckdaten',     label: 'Eckdaten',   index: 4 },
  { id: 'zusatzmodule', label: 'Extras',     index: 5 },
  { id: 'qualitaet',    label: 'Qualität',   index: 6 },
  { id: 'ergebnis',     label: 'Ergebnis',   index: 7 },
]

export interface CalculatorState {
  currentStep: StepId
  startMode: StartMode | ''
  objekt: ObjektType | ''
  /** Only 'neubau' | 'altbau' are calculable; others route to direktanfrage */
  projekt: ProjektType | ''
  m2: number
  rooms: number
  bathrooms: number
  addOns: string[]
  fineQty: Record<string, number>
  qualitaet: QualitaetType
}

export const INITIAL_STATE: CalculatorState = {
  currentStep: 'start',
  startMode: '',
  objekt: '',
  projekt: '',
  m2: 80,
  rooms: 4,
  bathrooms: 1,
  addOns: [],
  fineQty: {},
  qualitaet: 'standard',
}
