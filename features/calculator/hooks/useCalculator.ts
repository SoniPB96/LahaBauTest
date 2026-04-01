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
} from '../types'
import { DIRECT_ANFRAGE_TYPES } from '@/config/pricing'

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE)
  const [validationError, setValidationError] = useState(false)

  // Progress is based on STEPS that have index values.
  // 'direktanfrage' sits outside the normal flow.
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

  const setFineQty = useCallback((id: string, value: number) => {
    setState((prev) => ({
      ...prev,
      fineQty: { ...prev.fineQty, [id]: Math.max(0, value) },
    }))
  }, [])

  const setQualitaet = useCallback((qualitaet: QualitaetType) => {
    setState((prev) => ({ ...prev, qualitaet }))
  }, [])

  const setStep = useCallback((id: StepId) => {
    setState((prev) => ({ ...prev, currentStep: id }))
    setValidationError(false)
  }, [])

  const reset = useCallback(() => {
    setState(INITIAL_STATE)
    setValidationError(false)
  }, [])

  // ── Navigation ─────────────────────────────────────────────

  /**
   * Advance to the next logical step.
   * Returns false if validation fails (shell shows inline error).
   */
  const next = useCallback((): boolean => {
    const { currentStep, startMode, objekt, projekt } = state

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
        // Non-calculable: show explanation step, then route to /anfrage
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
      // "Etwas genauer" mode includes the fine-adjustment step
      if (startMode === 'genauer') {
        setState((prev) => ({ ...prev, currentStep: 'feinanpassung' }))
      } else {
        setState((prev) => ({ ...prev, currentStep: 'ergebnis' }))
      }
      return true
    }

    if (currentStep === 'feinanpassung') {
      setState((prev) => ({ ...prev, currentStep: 'ergebnis' }))
      return true
    }

    return true
  }, [state])

  const back = useCallback(() => {
    const { currentStep, startMode } = state
    setValidationError(false)

    const normalOrder: StepId[] = [
      'start', 'objektart', 'projektart', 'eckdaten',
      'zusatzmodule', 'qualitaet', 'feinanpassung', 'ergebnis',
    ]

    if (currentStep === 'direktanfrage') {
      setState((prev) => ({ ...prev, currentStep: 'projektart' }))
      return
    }

    if (currentStep === 'ergebnis' && startMode !== 'genauer') {
      // Schnell mode skips feinanpassung — go back to qualitaet
      setState((prev) => ({ ...prev, currentStep: 'qualitaet' }))
      return
    }

    const idx = normalOrder.indexOf(currentStep)
    if (idx > 0) {
      setState((prev) => ({ ...prev, currentStep: normalOrder[idx - 1] }))
    }
  }, [state])

  const isDirectAnfrage =
    !!state.projekt && DIRECT_ANFRAGE_TYPES.includes(state.projekt as ProjektType)

  const isCalculable =
    !!state.objekt &&
    !!state.projekt &&
    !isDirectAnfrage

  return {
    state,
    currentStepMeta,
    progress,
    totalSteps,
    validationError,
    isDirectAnfrage,
    isCalculable,
    setStartMode,
    setObjekt,
    setProjekt,
    setM2,
    setRooms,
    setBathrooms,
    toggleAddOn,
    setFineQty,
    setQualitaet,
    setStep,
    next,
    back,
    reset,
  }
}
