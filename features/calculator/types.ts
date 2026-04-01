import type {
  StartMode,
  ObjektType,
  ProjektType,
  QualitaetType,
  RoomConfig,
} from '@/config/pricing'

export type { StartMode, ObjektType, ProjektType, QualitaetType, RoomConfig }

export type StepId =
  | 'start'
  | 'objektart'
  | 'projektart'
  | 'eckdaten'
  | 'zusatzmodule'
  | 'qualitaet'
  | 'raumeditor'
  | 'ergebnis'
  | 'direktanfrage'

export interface StepMeta {
  id: StepId
  label: string
  index: number
}

// 'direktanfrage' is intentionally absent — it sits outside the normal flow.
export const STEPS: StepMeta[] = [
  { id: 'start',        label: 'Start',    index: 1 },
  { id: 'objektart',    label: 'Objekt',   index: 2 },
  { id: 'projektart',   label: 'Projekt',  index: 3 },
  { id: 'eckdaten',     label: 'Eckdaten', index: 4 },
  { id: 'zusatzmodule', label: 'Extras',   index: 5 },
  { id: 'qualitaet',    label: 'Qualität', index: 6 },
  { id: 'raumeditor',   label: 'Räume',    index: 7 },
  { id: 'ergebnis',     label: 'Ergebnis', index: 8 },
]

export interface CalculatorState {
  currentStep: StepId
  startMode: StartMode | ''
  objekt: ObjektType | ''
  projekt: ProjektType | ''
  m2: number
  rooms: number
  bathrooms: number
  addOns: string[]
  /** Per-room configuration built and edited in the Raum-Editor step */
  roomConfigs: RoomConfig[]
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
  roomConfigs: [],
  qualitaet: 'standard',
}
