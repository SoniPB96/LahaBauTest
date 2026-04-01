'use client'

import { useState, useCallback } from 'react'
import {
  INITIAL_STATE,
  STEPS,
  type CalculatorState,
  type StepId,
  type StartMode,
  type ObjektType,
  type ProjektType,
  type QualitaetType,
  type RoomConfig,
} from '../types'
import {
  DIRECT_ANFRAGE_TYPES,
  buildDefaultRoomConfigs,
} from '@/config/pricing'

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE)
  const [validationError, setValidationError] = useState(false)

  const currentStepMeta =
    STEPS.find((s) => s.id === state.currentStep) ??
    STEPS[STEPS.length - 1]

  const totalSteps = STEPS.length
  const progress = Math.round(((currentStepMeta.index - 1) / totalSteps) * 100)

  // ── Setters ────────────────────────────────────────────────

  const setStartMode = useCallback((mode: StartMode) => {
    setState((prev) => ({ ...prev, startMode: mode }))
  }, [])

  const setObjekt = useCallback((objekt: ObjektType) => {
    setState((prev) => ({ ...prev, objekt }))
  }, [])

  const setProjekt = useCallback((projekt: ProjektType) => {
    setState((prev) => ({ ...prev, projekt }))
  }, [])

  const setM2 = useCallback((m2: number) => {
    setState((prev) => ({ ...prev, m2: Math.max(20, Math.min(500, m2)) }))
  }, [])

  const setRooms = useCallback((rooms: number) => {
    setState((prev) => ({ ...prev, rooms: Math.max(1, Math.min(20, rooms)) }))
  }, [])

  const setBathrooms = useCallback((bathrooms: number) => {
    setState((prev) => ({ ...prev, bathrooms: Math.max(1, Math.min(6, bathrooms)) }))
  }, [])

  const toggleAddOn = useCallback((id: string) => {
    setState((prev) => {
      const has = prev.addOns.includes(id)
      return {
        ...prev,
        addOns: has ? prev.addOns.filter((o) => o !== id) : [...prev.addOns, id],
      }
    })
  }, [])

  const setQualitaet = useCallback((qualitaet: QualitaetType) => {
    setState((prev) => ({ ...prev, qualitaet }))
  }, [])

  /** Update a single field on one RoomConfig by id */
  const updateRoomConfig = useCallback(
    (roomId: string, patch: Partial<Omit<RoomConfig, 'id' | 'kind' | 'label'>>) => {
      setState((prev) => ({
        ...prev,
        roomConfigs: prev.roomConfigs.map((rc) =>
          rc.id === roomId ? { ...rc, ...patch } : rc,
        ),
      }))
    },
    [],
  )

  const setStep = useCallback((id: StepId) => {
    setState((prev) => ({ ...prev, currentStep: id }))
    setValidationError(false)
  }, [])

  const reset = useCallback(() => {
    setState(INITIAL_STATE)
    setValidationError(false)
  }, [])

  // ── Navigation ─────────────────────────────────────────────

  const next = useCallback((): boolean => {
    const { currentStep, startMode, objekt, projekt, rooms, bathrooms, addOns } = state

    setValidationError(false)

    if (currentStep === 'start') {
      if (!startMode) { setValidationError(true); return false }
      setState((prev) => ({ ...prev, currentStep: 'objektart' }))
      return true
    }

    if (currentStep === 'objektart') {
      if (!objekt) { setValidationError(true); return false }
      setState((prev) => ({ ...prev, currentStep: 'projektart' }))
      return true
    }

    if (currentStep === 'projektart') {
      if (!projekt) { setValidationError(true); return false }
      if (DIRECT_ANFRAGE_TYPES.includes(projekt as ProjektType)) {
        setState((prev) => ({ ...prev, currentStep: 'direktanfrage' }))
      } else {
        setState((prev) => ({ ...prev, currentStep: 'eckdaten' }))
      }
      return true
    }

    if (currentStep === 'eckdaten') {
      setState((prev) => ({ ...prev, currentStep: 'zusatzmodule' }))
      return true
    }

    if (currentStep === 'zusatzmodule') {
      setState((prev) => ({ ...prev, currentStep: 'qualitaet' }))
      return true
    }

    if (currentStep === 'qualitaet') {
      // "Etwas genauer" → show Raum-Editor; "Einfach & schnell" → skip to result
      if (startMode === 'genauer') {
        // Build default room configs from current rooms/bathrooms/addOns
        const configs = buildDefaultRoomConfigs(rooms, bathrooms, addOns)
        setState((prev) => ({ ...prev, roomConfigs: configs, currentStep: 'raumeditor' }))
      } else {
        setState((prev) => ({ ...prev, currentStep: 'ergebnis' }))
      }
      return true
    }

    if (currentStep === 'raumeditor') {
      setState((prev) => ({ ...prev, currentStep: 'ergebnis' }))
      return true
    }

    return true
  }, [state])

  const back = useCallback(() => {
    const { currentStep, startMode } = state
    setValidationError(false)

    if (currentStep === 'direktanfrage') {
      setState((prev) => ({ ...prev, currentStep: 'projektart' }))
      return
    }

    if (currentStep === 'ergebnis') {
      if (startMode === 'genauer') {
        setState((prev) => ({ ...prev, currentStep: 'raumeditor' }))
      } else {
        setState((prev) => ({ ...prev, currentStep: 'qualitaet' }))
      }
      return
    }

    const order: StepId[] = [
      'start', 'objektart', 'projektart', 'eckdaten',
      'zusatzmodule', 'qualitaet', 'raumeditor', 'ergebnis',
    ]
    const idx = order.indexOf(currentStep)
    if (idx > 0) {
      setState((prev) => ({ ...prev, currentStep: order[idx - 1] }))
    }
  }, [state])

  const isDirectAnfrage =
    !!state.projekt && DIRECT_ANFRAGE_TYPES.includes(state.projekt as ProjektType)

  return {
    state,
    currentStepMeta,
    progress,
    totalSteps,
    validationError,
    isDirectAnfrage,
    setStartMode,
    setObjekt,
    setProjekt,
    setM2,
    setRooms,
    setBathrooms,
    toggleAddOn,
    setQualitaet,
    updateRoomConfig,
    setStep,
    next,
    back,
    reset,
  }
}
