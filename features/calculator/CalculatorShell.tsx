'use client'

import { useState } from 'react'
import { useCalculator } from './hooks/useCalculator'
import { STEPS } from './types'
import { StepObjekt } from './steps/StepObjekt'
import { StepProjekt } from './steps/StepProjekt'
import { StepOptionen } from './steps/StepOptionen'
import { StepAusstattung } from './steps/StepAusstattung'
import { StepMaterial } from './steps/StepMaterial'
import { StepErgebnis } from './steps/StepErgebnis'
import { StepAnfrage } from './steps/StepAnfrage'
import { cn } from '@/lib/utils'

const STEP_TITLES: Record<string, string> = {
  objekt:      'Um welches Objekt handelt es sich?',
  projekt:     'Was ist geplant?',
  optionen:    'Welche Optionen sollen umgesetzt werden?',
  ausstattung: 'Mengen und Ausstattung',
  material:    'Welches Material bevorzugen Sie?',
  ergebnis:    'Ihre erste Einschätzung',
  anfrage:     'Nächster Schritt',
}

export function CalculatorShell() {
  const calc = useCalculator()
  const [validationError, setValidationError] = useState(false)

  const { state, currentStepMeta, progress, totalSteps } = calc

  const handleNext = () => {
    const ok = calc.next()
    setValidationError(!ok)
  }

  const handleBack = () => {
    setValidationError(false)
    calc.back()
  }

  const showNavButtons =
    state.currentStep !== 'ergebnis' && state.currentStep !== 'anfrage'

  const showBackButton = state.currentStep !== 'objekt'

  return (
    <div className="max-w-[640px] mx-auto px-4 md:px-0 py-12 md:py-16">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[0.68rem] tracking-[0.15em] uppercase text-gold font-normal mb-3">
          Erste Kosteneinschätzung
        </p>
        <h1 className="font-serif text-[clamp(1.6rem,3vw,2rem)] text-text-1 tracking-[-0.02em]">
          {STEP_TITLES[state.currentStep]}
        </h1>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div
          className="h-[3px] rounded-full overflow-hidden mb-3"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <div
            className="h-full rounded-full bg-gold transition-all duration-400 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step bubbles */}
        <div className="flex items-center justify-between">
          {STEPS.map((step) => {
            const done = step.index < currentStepMeta.index
            const active = step.id === state.currentStep
            return (
              <div key={step.id} className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    'w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[0.6rem] font-medium transition-all',
                    active
                      ? 'bg-gold border-gold text-[#1a1400]'
                      : done
                      ? 'bg-gold/30 border-gold/30 text-gold'
                      : 'border-subtle text-text-4',
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
                    'text-[0.58rem] hidden sm:block tracking-wide',
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

      {/* Step content */}
      <div
        className="border rounded-lg p-6 md:p-8 mb-5"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#111115' }}
      >
        {state.currentStep === 'objekt' && (
          <StepObjekt
            value={state.objekt}
            m2={state.m2}
            onChange={calc.setObjekt}
            onM2Change={calc.setM2}
            error={validationError}
          />
        )}
        {state.currentStep === 'projekt' && (
          <StepProjekt
            value={state.projekt}
            onChange={calc.setProjekt}
            error={validationError}
          />
        )}
        {state.currentStep === 'optionen' && (
          <StepOptionen
            selected={state.selectedOptions}
            onToggle={calc.toggleOption}
          />
        )}
        {state.currentStep === 'ausstattung' && (
          <StepAusstattung
            selectedOptions={state.selectedOptions}
            quantities={state.quantities}
            onQtyChange={calc.setQuantity}
          />
        )}
        {state.currentStep === 'material' && (
          <StepMaterial
            value={state.material}
            onChange={calc.setMaterial}
          />
        )}
        {state.currentStep === 'ergebnis' && (
          <StepErgebnis
            state={state}
            onProceedToAnfrage={() => calc.setStep('anfrage')}
          />
        )}
        {state.currentStep === 'anfrage' && (
          <StepAnfrage state={state} />
        )}
      </div>

      {/* Navigation */}
      {showNavButtons && (
        <div className="flex items-center justify-between gap-3">
          {showBackButton ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-5 py-3 border rounded text-[0.85rem]
                         text-text-2 font-normal transition-colors hover:border-muted hover:text-text-1
                         bg-transparent font-sans cursor-pointer"
              style={{ borderColor: 'rgba(255,255,255,0.11)' }}
            >
              ← Zurück
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 px-6 py-3 bg-gold text-[#1a1400] rounded
                       text-[0.88rem] font-medium transition-opacity hover:opacity-85
                       active:scale-[0.97] border-none font-sans cursor-pointer"
          >
            Weiter →
          </button>
        </div>
      )}

      {/* Reset */}
      {(state.currentStep === 'ergebnis' || state.currentStep === 'anfrage') && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={calc.reset}
            className="text-[0.75rem] text-text-4 hover:text-text-2 transition-colors
                       bg-transparent border-none cursor-pointer font-sans underline
                       underline-offset-2"
          >
            Neu starten
          </button>
        </div>
      )}
    </div>
  )
}
