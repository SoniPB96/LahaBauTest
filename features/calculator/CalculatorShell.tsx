'use client'

import { useCalculator } from './hooks/useCalculator'
import { STEPS } from './types'
import { StepStart }          from './steps/StepStart'
import { StepObjektart }      from './steps/StepObjektart'
import { StepProjektart }     from './steps/StepProjektart'
import { StepEckdaten }       from './steps/StepEckdaten'
import { StepZusatzmodule }   from './steps/StepZusatzmodule'
import { StepQualitaet }      from './steps/StepQualitaet'
import { StepFeinanpassung }  from './steps/StepFeinanpassung'
import { StepErgebnis }       from './steps/StepErgebnis'
import { StepDirektanfrage }  from './steps/StepDirektanfrage'
import { cn } from '@/lib/utils'

const STEP_TITLES: Record<string, string> = {
  start:          'Wie möchten Sie die Einschätzung starten?',
  objektart:      'Um welches Objekt handelt es sich?',
  projektart:     'Was haben Sie vor?',
  eckdaten:       'Ein paar Eckdaten zu Ihrem Objekt',
  zusatzmodule:   'Welche Extras möchten Sie?',
  qualitaet:      'Welche Ausstattungsqualität wünschen Sie sich?',
  feinanpassung:  'Haben Sie schon konkretere Vorstellungen?',
  ergebnis:       'Ihre erste Einschätzung',
  direktanfrage:  'Wir helfen Ihnen persönlich weiter',
}

export function CalculatorShell() {
  const calc = useCalculator()
  const { state, currentStepMeta, progress, totalSteps, validationError } = calc

  const isDirektanfrage  = state.currentStep === 'direktanfrage'
  const isErgebnis       = state.currentStep === 'ergebnis'
  const isTerminalStep   = isDirektanfrage || isErgebnis

  // Back button is hidden only on first step and terminal steps
  const showBackButton = state.currentStep !== 'start' && !isTerminalStep

  // Nav buttons hidden on terminal steps (those have their own CTAs)
  const showNavButtons = !isTerminalStep

  return (
    <div className="max-w-[640px] mx-auto px-4 md:px-0 py-12 md:py-16">
      {/* Header */}
      <div className="mb-7">
        <p className="text-[0.68rem] tracking-[0.15em] uppercase text-gold font-normal mb-3">
          Erste Kosteneinschätzung
        </p>
        <h1 className="font-serif text-[clamp(1.45rem,3vw,1.9rem)] text-text-1 tracking-[-0.02em] leading-snug">
          {STEP_TITLES[state.currentStep]}
        </h1>
      </div>

      {/* Progress bar — hidden on direktanfrage */}
      {!isDirektanfrage && (
        <div className="mb-6">
          <div
            className="h-[3px] rounded-full overflow-hidden mb-3"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="h-full rounded-full bg-gold transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            {STEPS.map((step) => {
              const done   = step.index < currentStepMeta.index
              const active = step.id === state.currentStep
              return (
                <div key={step.id} className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      'w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[0.6rem] font-medium transition-all',
                    )}
                    style={{
                      borderColor: active
                        ? '#c9aa72'
                        : done
                        ? 'rgba(201,170,114,0.4)'
                        : 'rgba(255,255,255,0.06)',
                      background: active
                        ? '#c9aa72'
                        : done
                        ? 'rgba(201,170,114,0.15)'
                        : 'transparent',
                      color: active ? '#1a1400' : done ? '#c9aa72' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {done ? (
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none" aria-hidden="true">
                        <path d="M1 3.5l2 2 4-4" stroke="#c9aa72" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      step.index
                    )}
                  </span>
                  <span
                    className={cn(
                      'text-[0.55rem] hidden sm:block tracking-wide',
                      active ? 'text-gold' : 'text-text-4',
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Step content */}
      <div
        className="rounded-lg p-6 md:p-8 mb-5"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#111115', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {state.currentStep === 'start' && (
          <StepStart
            value={state.startMode}
            onChange={calc.setStartMode}
            error={validationError}
          />
        )}
        {state.currentStep === 'objektart' && (
          <StepObjektart
            value={state.objekt}
            onChange={calc.setObjekt}
            error={validationError}
          />
        )}
        {state.currentStep === 'projektart' && (
          <StepProjektart
            value={state.projekt}
            onChange={calc.setProjekt}
            error={validationError}
          />
        )}
        {state.currentStep === 'eckdaten' && (
          <StepEckdaten
            m2={state.m2}
            rooms={state.rooms}
            bathrooms={state.bathrooms}
            onM2Change={calc.setM2}
            onRoomsChange={calc.setRooms}
            onBathroomsChange={calc.setBathrooms}
          />
        )}
        {state.currentStep === 'zusatzmodule' && (
          <StepZusatzmodule
            selected={state.addOns}
            onToggle={calc.toggleAddOn}
          />
        )}
        {state.currentStep === 'qualitaet' && (
          <StepQualitaet
            value={state.qualitaet}
            onChange={calc.setQualitaet}
          />
        )}
        {state.currentStep === 'feinanpassung' && (
          <StepFeinanpassung
            fineQty={state.fineQty}
            onQtyChange={calc.setFineQty}
          />
        )}
        {state.currentStep === 'ergebnis' && (
          <StepErgebnis state={state} />
        )}
        {state.currentStep === 'direktanfrage' && (
          <StepDirektanfrage
            projekt={state.projekt}
            onBack={calc.back}
          />
        )}
      </div>

      {/* Navigation */}
      {showNavButtons && (
        <div className="flex items-center justify-between gap-3">
          {showBackButton ? (
            <button
              type="button"
              onClick={calc.back}
              className="flex items-center gap-1.5 px-5 py-3 rounded text-[0.85rem] min-h-[44px]
                         text-text-2 font-normal transition-colors hover:text-text-1
                         bg-transparent font-sans cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.11)' }}
            >
              ← Zurück
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={calc.next}
            className="flex items-center gap-1.5 px-6 py-3 rounded min-h-[44px]
                       text-[0.88rem] font-medium transition-opacity hover:opacity-85
                       active:scale-[0.97] border-none font-sans cursor-pointer"
            style={{ background: '#c9aa72', color: '#1a1400' }}
          >
            Weiter →
          </button>
        </div>
      )}

      {/* Reset */}
      {isTerminalStep && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={calc.reset}
            className="text-[0.75rem] text-text-4 hover:text-text-2 transition-colors
                       bg-transparent border-none cursor-pointer font-sans underline underline-offset-2"
          >
            Neu starten
          </button>
        </div>
      )}
    </div>
  )
}
