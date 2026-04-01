'use client'

import { useRef, useEffect, useState } from 'react'
import { useCalculator } from './hooks/useCalculator'
import { STEPS } from './types'
import { StepStart }         from './steps/StepStart'
import { StepObjektart }     from './steps/StepObjektart'
import { StepProjektart }    from './steps/StepProjektart'
import { StepEckdaten }      from './steps/StepEckdaten'
import { StepZusatzmodule }  from './steps/StepZusatzmodule'
import { StepQualitaet }     from './steps/StepQualitaet'
import { StepRaumeditor }    from './steps/StepRaumeditor'
import { StepErgebnis }      from './steps/StepErgebnis'
import { StepDirektanfrage } from './steps/StepDirektanfrage'

// ── Step meta ─────────────────────────────────────────────────
const STEP_META: Record<string, { title: string; hint?: string }> = {
  start:        { title: 'Wie möchten Sie starten?', hint: 'Dauert weniger als 2 Minuten.' },
  objektart:    { title: 'Was für ein Objekt ist es?', hint: 'Wohnung oder Haus – das beeinflusst die Grundkalkulation.' },
  projektart:   { title: 'Was planen Sie?', hint: 'Wählen Sie das, was am ehesten passt.' },
  eckdaten:     { title: 'Wie groß ist das Objekt?', hint: 'Ungefähre Angaben reichen völlig.' },
  zusatzmodule: { title: 'Welche Extras kommen dazu?', hint: 'Nur auswählen, was Sie wirklich wollen.' },
  qualitaet:    { title: 'Welche Ausstattung soll es sein?', hint: 'Das beeinflusst Materialwahl und Preis.' },
  raumeditor:   { title: 'Jeden Raum individuell einstellen', hint: 'Die Basis ist bereits voreingestellt – passen Sie nur an, was abweicht.' },
  ergebnis:     { title: 'Ihre erste Kostenschätzung', hint: undefined },
  direktanfrage:{ title: 'Für dieses Vorhaben brauchen wir ein Gespräch', hint: undefined },
}

// ── Animated step wrapper ─────────────────────────────────────
function AnimatedStep({ stepId, children }: { stepId: string; children: React.ReactNode }) {
  const [key, setKey] = useState(stepId)
  const [visible, setVisible] = useState(true)
  const prevRef = useRef(stepId)

  useEffect(() => {
    if (prevRef.current !== stepId) {
      setVisible(false)
      const t = setTimeout(() => {
        setKey(stepId)
        setVisible(true)
        prevRef.current = stepId
      }, 120)
      return () => clearTimeout(t)
    }
  }, [stepId])

  return (
    <div
      key={key}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.22s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {children}
    </div>
  )
}

// ── Progress strip ────────────────────────────────────────────
function ProgressStrip({
  steps,
  currentIndex,
}: {
  steps: typeof STEPS
  currentIndex: number
}) {
  return (
    <div className="flex gap-1.5 mb-8">
      {steps.map((s) => {
        const done   = s.index < currentIndex
        const active = s.index === currentIndex
        return (
          <div
            key={s.id}
            className="flex-1 flex flex-col gap-1.5"
          >
            <div
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                background: done
                  ? '#c9aa72'
                  : active
                  ? 'rgba(201,170,114,0.55)'
                  : 'rgba(255,255,255,0.07)',
              }}
            />
            <span
              className="text-[0.5rem] uppercase tracking-widest hidden sm:block"
              style={{ color: active ? '#c9aa72' : 'rgba(255,255,255,0.2)' }}
            >
              {s.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ── Main shell ────────────────────────────────────────────────
export function CalculatorShell() {
  const calc = useCalculator()
  const { state, currentStepMeta, validationError } = calc

  const isDirektanfrage = state.currentStep === 'direktanfrage'
  const isTerminalStep  = isDirektanfrage || state.currentStep === 'ergebnis'
  const showNav         = !isTerminalStep
  const showBack        = showNav && state.currentStep !== 'start'

  const meta = STEP_META[state.currentStep] ?? { title: '' }

  return (
    <div className="max-w-[600px] mx-auto px-4 md:px-0 py-12 md:py-20">

      {/* Progress */}
      {!isDirektanfrage && (
        <ProgressStrip steps={STEPS} currentIndex={currentStepMeta.index} />
      )}

      {/* Step header */}
      <AnimatedStep stepId={`header-${state.currentStep}`}>
        <div className="mb-8">
          <h1
            className="font-serif text-text-1 leading-tight mb-2"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', letterSpacing: '-0.025em' }}
          >
            {meta.title}
          </h1>
          {meta.hint && (
            <p className="text-[0.82rem] text-text-3 leading-relaxed">{meta.hint}</p>
          )}
        </div>
      </AnimatedStep>

      {/* Step content */}
      <AnimatedStep stepId={state.currentStep}>
        <div className="mb-8">
          {state.currentStep === 'start' && (
            <StepStart value={state.startMode} onChange={calc.setStartMode} error={validationError} />
          )}
          {state.currentStep === 'objektart' && (
            <StepObjektart value={state.objekt} onChange={calc.setObjekt} error={validationError} />
          )}
          {state.currentStep === 'projektart' && (
            <StepProjektart value={state.projekt} onChange={calc.setProjekt} error={validationError} />
          )}
          {state.currentStep === 'eckdaten' && (
            <StepEckdaten
              m2={state.m2} rooms={state.rooms} bathrooms={state.bathrooms}
              onM2Change={calc.setM2} onRoomsChange={calc.setRooms} onBathroomsChange={calc.setBathrooms}
            />
          )}
          {state.currentStep === 'zusatzmodule' && (
            <StepZusatzmodule selected={state.addOns} onToggle={calc.toggleAddOn} />
          )}
          {state.currentStep === 'qualitaet' && (
            <StepQualitaet value={state.qualitaet} onChange={calc.setQualitaet} />
          )}
          {state.currentStep === 'raumeditor' && (
            <StepRaumeditor
              roomConfigs={state.roomConfigs} addOns={state.addOns}
              qualitaet={state.qualitaet} onUpdate={calc.updateRoomConfig}
            />
          )}
          {state.currentStep === 'ergebnis' && <StepErgebnis state={state} />}
          {state.currentStep === 'direktanfrage' && (
            <StepDirektanfrage projekt={state.projekt} onBack={calc.back} />
          )}
        </div>
      </AnimatedStep>

      {/* Navigation */}
      {showNav && (
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              type="button"
              onClick={calc.back}
              className="font-sans cursor-pointer bg-transparent border-none
                         text-text-3 hover:text-text-1 transition-colors text-[0.85rem]
                         flex items-center gap-1.5 py-3 pl-0 pr-4 min-h-[48px]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Zurück
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={calc.next}
            className="ml-auto flex items-center gap-2 font-sans cursor-pointer border-none
                       font-medium text-[0.9rem] px-7 rounded-xl min-h-[52px]
                       transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
            style={{ background: '#c9aa72', color: '#1a1400' }}
          >
            Weiter
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Reset */}
      {isTerminalStep && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={calc.reset}
            className="text-[0.75rem] text-text-4 hover:text-text-2 transition-colors
                       bg-transparent border-none cursor-pointer font-sans"
          >
            ↺ Neu starten
          </button>
        </div>
      )}
    </div>
  )
}
