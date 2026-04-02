'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useCalculator } from './hooks/useCalculator'
import { StepStart } from './steps/StepStart'
import { StepObjektart } from './steps/StepObjektart'
import { StepProjektart } from './steps/StepProjektart'
import { StepEckdaten } from './steps/StepEckdaten'
import { StepZusatzmodule } from './steps/StepZusatzmodule'
import { StepQualitaet } from './steps/StepQualitaet'
import { StepRaumeditor } from './steps/StepRaumeditor'
import { StepErgebnis } from './steps/StepErgebnis'
import { StepDirektanfrage } from './steps/StepDirektanfrage'

const STEPS = [
  { id: 'start', label: 'Start', index: 0 },
  { id: 'objektart', label: 'Objekt', index: 1 },
  { id: 'projektart', label: 'Projekt', index: 2 },
  { id: 'eckdaten', label: 'Eckdaten', index: 3 },
  { id: 'zusatzmodule', label: 'Extras', index: 4 },
  { id: 'qualitaet', label: 'Qualität', index: 5 },
  { id: 'raumeditor', label: 'Räume', index: 6 },
  { id: 'ergebnis', label: 'Ergebnis', index: 7 },
] as const

const STEP_META: Record<string, { title: string; hint?: string }> = {
  start:         { title: 'Wie möchten Sie starten?', hint: 'Wählen Sie die passende Tiefe für Ihre Einschätzung.' },
  objektart:     { title: 'Welches Objekt möchten Sie einschätzen?', hint: 'Die Objektart beeinflusst typische Verteilungen und Installationsaufwand.' },
  projektart:    { title: 'Um welche Art von Projekt geht es?', hint: 'Wählen Sie den Fall, der Ihrem Vorhaben am nächsten kommt.' },
  eckdaten:      { title: 'Ein paar Eckdaten zu Ihrem Projekt', hint: 'So entsteht eine erste belastbare Größenordnung.' },
  zusatzmodule:  { title: 'Welche Extras sollen berücksichtigt werden?', hint: 'Nur auswählen, wenn diese Punkte wirklich gewünscht sind.' },
  qualitaet:     { title: 'Welche Ausstattungsqualität wünschen Sie?', hint: 'Die Qualität beeinflusst Umfang und Komfort der Basisausstattung.' },
  raumeditor:    { title: 'Räume individuell anpassen', hint: 'Hier können Sie Zusatzpunkte pro Raum feiner einstellen.' },
  ergebnis:      { title: 'Ihre erste Kosteneinschätzung', hint: 'Dies ist eine strukturierte Orientierung – kein finales Angebot.' },
  direktanfrage: { title: 'Kurze Anfrage stellen', hint: 'Für diesen Fall ist eine direkte Rückmeldung sinnvoller als eine Pauschalkalkulation.' },
}

function FadeStep({ id, children }: { id: string; children: React.ReactNode }) {
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const previousId = useRef(id)
  const t = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (id === previousId.current) return
    if (t.current) clearTimeout(t.current)

    previousId.current = id
    setPhase('out')
    t.current = setTimeout(() => {
      setPhase('in')
      t.current = setTimeout(() => setPhase('idle'), 260)
    }, 150)

    return () => {
      if (t.current) clearTimeout(t.current)
    }
  }, [id])

  const style =
    phase === 'out'
      ? { opacity: 0, transform: 'translateY(12px) scale(0.992)' }
      : phase === 'in'
      ? { opacity: 1, transform: 'translateY(0) scale(1)' }
      : { opacity: 1, transform: 'translateY(0) scale(1)' }

  return (
    <div
      key={id}
      style={{
        ...style,
        transition: 'opacity 0.24s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

function ProgressBar({ steps, currentIndex }: { steps: typeof STEPS; currentIndex: number }) {
  return (
    <div className="calc-progress-shell mb-8">
      <div className="calc-progress-rail">
        {steps.map((s) => (
          <div
            key={s.id}
            className={cn(
              'calc-progress-segment',
              s.index < currentIndex && 'calc-progress-segment-done',
              s.index === currentIndex && 'calc-progress-segment-current',
            )}
          />
        ))}
      </div>

      <div className="calc-progress-labels">
        {steps.map((s) => (
          <span
            key={s.id}
            className={cn(
              'calc-progress-label hidden sm:block',
              s.index === currentIndex && 'calc-progress-label-current',
            )}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function CalculatorShell() {
  const calc = useCalculator()
  const { state, currentStepMeta, validationError } = calc

  const isDirektanfrage = state.currentStep === 'direktanfrage'
  const isTerminalStep = isDirektanfrage || state.currentStep === 'ergebnis'
  const showNav = !isTerminalStep
  const showBack = showNav && state.currentStep !== 'start'

  const meta = STEP_META[state.currentStep] ?? { title: '' }

  const stepContent = (
    <>
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
          m2={state.m2}
          rooms={state.rooms}
          bathrooms={state.bathrooms}
          onM2Change={calc.setM2}
          onRoomsChange={calc.setRooms}
          onBathroomsChange={calc.setBathrooms}
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
          roomConfigs={state.roomConfigs}
          addOns={state.addOns}
          qualitaet={state.qualitaet}
          onUpdate={calc.updateRoomConfig}
        />
      )}
      {state.currentStep === 'ergebnis' && <StepErgebnis state={state} />}
      {state.currentStep === 'direktanfrage' && (
        <StepDirektanfrage projekt={state.projekt} onBack={calc.back} />
      )}
    </>
  )

  return (
    <div className="max-w-[676px] mx-auto px-4 md:px-0 py-12 md:py-20">
      {!isDirektanfrage && <ProgressBar steps={STEPS} currentIndex={currentStepMeta.index} />}

      <div className="calc-shell-panel rounded-[30px] px-5 py-5 md:px-7 md:py-7">
        <FadeStep id={`title-${state.currentStep}`}>
          <div className="mb-7 relative z-[1]">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="calc-title-kicker calc-title-kicker-active">Schritt {currentStepMeta.index + 1}</span>
              {!isDirektanfrage && <span className="calc-title-kicker">Kostenrechner</span>}
            </div>

            <h1
              className="font-serif text-text-1 leading-tight mb-2"
              style={{ fontSize: 'clamp(1.7rem, 4vw, 2.35rem)', letterSpacing: '-0.035em' }}
            >
              {meta.title}
            </h1>

            {meta.hint && (
              <p
                className="text-[0.86rem] leading-relaxed max-w-[50ch]"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {meta.hint}
              </p>
            )}

            <div className="calc-header-divider" />
          </div>
        </FadeStep>

        <FadeStep id={state.currentStep}>
          <div className="mb-8 relative z-[1]">{stepContent}</div>
        </FadeStep>

        {showNav && (
          <div className="flex items-center gap-3 relative z-[1] pt-1">
            {showBack ? (
              <button
                type="button"
                onClick={calc.back}
                className="calc-nav-button font-sans cursor-pointer text-[0.85rem] active:scale-[0.98]"
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
              className={cn(
                'calc-nav-button calc-nav-button-primary ml-auto font-sans cursor-pointer font-medium text-[0.9rem] px-7 active:scale-[0.97]',
              )}
            >
              Weiter
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {isTerminalStep && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={calc.reset}
            className="text-[0.75rem] transition-colors bg-transparent border-none cursor-pointer font-sans"
            style={{ color: 'rgba(255,255,255,0.25)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
          >
            ↺ Neu starten
          </button>
        </div>
      )}
    </div>
  )
}
