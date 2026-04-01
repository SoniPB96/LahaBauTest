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

const STEP_META: Record<string, { title: string; hint?: string }> = {
  start:         { title: 'Wie möchten Sie starten?',              hint: 'Dauert weniger als 2 Minuten.' },
  objektart:     { title: 'Was für ein Objekt ist es?',            hint: 'Wohnung oder Haus – das beeinflusst die Grundkalkulation.' },
  projektart:    { title: 'Was planen Sie?',                       hint: 'Wählen Sie das, was am ehesten passt.' },
  eckdaten:      { title: 'Wie groß ist das Objekt?',              hint: 'Ungefähre Angaben reichen völlig aus.' },
  zusatzmodule:  { title: 'Welche Extras kommen dazu?',            hint: 'Nur auswählen, was Sie wirklich wollen.' },
  qualitaet:     { title: 'Wie viel Ausstattung soll es sein?',    hint: 'Mehr Ausstattung = mehr Steckdosen und Schalter pro Raum.' },
  raumeditor:    { title: 'Jeden Raum individuell einstellen',     hint: 'Passen Sie nur an, was von der Voreinstellung abweicht.' },
  ergebnis:      { title: 'Ihre erste Kostenschätzung',            hint: undefined },
  direktanfrage: { title: 'Persönliche Beratung',                  hint: undefined },
}

// ── Fade-only transition — no layout shift ───────────────────
// We render both old and new content, crossfade between them.
// This avoids any height change during transition.
function FadeStep({ id, children }: { id: string; children: React.ReactNode }) {
  const [current, setCurrent] = useState({ id, children })
  const [next, setNext] = useState<{ id: string; children: React.ReactNode } | null>(null)
  const [opacity, setOpacity] = useState(1)
  const t = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (id === current.id) return
    if (t.current) clearTimeout(t.current)
    // Fade out
    setOpacity(0)
    t.current = setTimeout(() => {
      setCurrent({ id, children })
      setOpacity(1)
    }, 180)
    return () => { if (t.current) clearTimeout(t.current) }
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ opacity, transition: 'opacity 0.18s ease', willChange: 'opacity' }}>
      {current.children}
    </div>
  )
}

// ── Progress bar ─────────────────────────────────────────────
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

// ── Main shell ────────────────────────────────────────────────
export function CalculatorShell() {
  const calc = useCalculator()
  const { state, currentStepMeta, validationError } = calc

  const isDirektanfrage = state.currentStep === 'direktanfrage'
  const isTerminalStep  = isDirektanfrage || state.currentStep === 'ergebnis'
  const showNav         = !isTerminalStep
  const showBack        = showNav && state.currentStep !== 'start'

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
    </>
  )

  return (
    <div className="max-w-[600px] mx-auto px-4 md:px-0 py-12 md:py-20">

      {/* Progress — stable, never fades */}
      {!isDirektanfrage && (
        <ProgressBar steps={STEPS} currentIndex={currentStepMeta.index} />
      )}

      {/* Title — fades independently */}
      <FadeStep id={`title-${state.currentStep}`}>
        <div className="mb-7">
          <h1
            className="font-serif text-text-1 leading-tight mb-2"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', letterSpacing: '-0.025em' }}
          >
            {meta.title}
          </h1>
          {meta.hint && (
            <p className="text-[0.82rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {meta.hint}
            </p>
          )}
        </div>
      </FadeStep>

      {/* Step content — fades independently */}
      <FadeStep id={state.currentStep}>
        <div className="mb-8">{stepContent}</div>
      </FadeStep>

      {/* Nav — stable, no animation */}
      {showNav && (
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              type="button"
              onClick={calc.back}
              className="font-sans cursor-pointer bg-transparent border-none
                         transition-colors text-[0.85rem] flex items-center gap-1.5
                         py-3 pl-0 pr-4 min-h-[48px]"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
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
                       active:scale-[0.97]"
            style={{ background: '#c9aa72', color: '#1a1400', transition: 'opacity 0.15s ease, transform 0.1s ease' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
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
            className="text-[0.75rem] transition-colors bg-transparent border-none
                       cursor-pointer font-sans"
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
