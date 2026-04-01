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
    <div className="mb-8">
      <div className="flex gap-1.5 mb-2">
        {steps.map((s) => (
          <div
            key={s.id}
            className="flex-1 h-[3px] rounded-full"
            style={{
              background: s.index < currentIndex
                ? '#c9aa72'
                : s.index === currentIndex
                ? 'rgba(201,170,114,0.45)'
                : 'rgba(255,255,255,0.07)',
              transition: 'background 0.5s ease',
            }}
          />
        ))}
      </div>
      <div className="flex justify-between px-0.5">
        {steps.map((s) => (
          <span
            key={s.id}
            className="text-[0.5rem] uppercase tracking-widest hidden sm:block"
            style={{
              color: s.index === currentIndex ? '#c9aa72' : 'rgba(255,255,255,0.18)',
              transition: 'color 0.3s ease',
            }}
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
    <div className="max-w-[640px] mx-auto px-4 md:px-0 py-12 md:py-20">
      {!isDirektanfrage && <ProgressBar steps={STEPS} currentIndex={currentStepMeta.index} />}

      <div className="calc-shell-panel rounded-[28px] px-4 py-5 md:px-6 md:py-6">
        <FadeStep id={`title-${state.currentStep}`}>
          <div className="mb-7 relative z-[1]">
            <div className="flex items-center gap-2 mb-3">
              <span className="calc-choice-badge calc-choice-badge-active">Schritt {currentStepMeta.index + 1}</span>
              {!isDirektanfrage && <span className="calc-choice-badge">Kostenrechner</span>}
            </div>
            <h1
              className="font-serif text-text-1 leading-tight mb-2"
              style={{ fontSize: 'clamp(1.55rem, 4vw, 2.2rem)', letterSpacing: '-0.03em' }}
            >
              {meta.title}
            </h1>
            {meta.hint && (
              <p className="text-[0.84rem] leading-relaxed max-w-[48ch]" style={{ color: 'rgba(255,255,255,0.46)' }}>
                {meta.hint}
              </p>
            )}
          </div>
        </FadeStep>

        <FadeStep id={state.currentStep}>
          <div className="mb-8 relative z-[1]">{stepContent}</div>
        </FadeStep>

        {showNav && (
          <div className="flex items-center gap-3 relative z-[1]">
            {showBack ? (
              <button
                type="button"
                onClick={calc.back}
                className="font-sans cursor-pointer bg-transparent rounded-2xl transition-all text-[0.85rem] flex items-center gap-2 py-3 px-4 min-h-[48px] border active:scale-[0.98]"
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.62)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                }}
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
                'ml-auto flex items-center gap-2 font-sans cursor-pointer font-medium text-[0.9rem] px-7 rounded-2xl min-h-[54px] active:scale-[0.97] border-none',
                'shadow-[0_18px_34px_rgba(0,0,0,0.22)]',
              )}
              style={{
                background: 'linear-gradient(180deg, #dfc28e 0%, #c9aa72 100%)',
                color: '#1a1400',
                transition: 'opacity 0.15s ease, transform 0.1s ease, box-shadow 0.18s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.94'
                e.currentTarget.style.boxShadow = '0 22px 40px rgba(0,0,0,0.28)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.boxShadow = '0 18px 34px rgba(0,0,0,0.22)'
              }}
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
