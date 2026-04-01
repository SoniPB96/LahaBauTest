'use client'

import { useState, useCallback } from 'react'
import {
  INITIAL_STATE,
  STEPS,
  type CalculatorState,
  type StepId,
  type ObjektType,
  type ProjektType,
  type MaterialType,
} from '../types'
import { DIRECT_ANFRAGE_TYPES } from '@/config/pricing'

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE)

  const currentStepMeta = STEPS.find((s) => s.id === state.currentStep)!
  const totalSteps = STEPS.length
  const progress = Math.round(((currentStepMeta.index - 1) / totalSteps) * 100)

  const setStep = useCallback((id: StepId) => {
    setState((prev) => ({ ...prev, currentStep: id }))
  }, [])

  const setObjekt = useCallback((objekt: ObjektType) => {
    setState((prev) => ({ ...prev, objekt }))
  }, [])

  const setM2 = useCallback((m2: number) => {
    setState((prev) => ({ ...prev, m2: Math.max(20, Math.min(500, m2)) }))
  }, [])

  const setProjekt = useCallback((projekt: ProjektType) => {
    setState((prev) => ({ ...prev, projekt }))
  }, [])

  const toggleOption = useCallback((id: string) => {
    setState((prev) => {
      const has = prev.selectedOptions.includes(id)
      return {
        ...prev,
        selectedOptions: has
          ? prev.selectedOptions.filter((o) => o !== id)
          : [...prev.selectedOptions, id],
      }
    })
  }, [])

  const setQuantity = useCallback((id: string, value: number) => {
    setState((prev) => ({
      ...prev,
      quantities: { ...prev.quantities, [id]: Math.max(0, value) },
    }))
  }, [])

  const setMaterial = useCallback((material: MaterialType) => {
    setState((prev) => ({ ...prev, material }))
  }, [])

  const reset = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  /**
   * Advance to the next logical step.
   * Returns false if validation fails (caller shows inline error).
   */
  const next = useCallback((): boolean => {
    const { currentStep, objekt, projekt } = state

    if (currentStep === 'objekt') {
      if (!objekt) return false
      setState((prev) => ({ ...prev, currentStep: 'projekt' }))
      return true
    }

    if (currentStep === 'projekt') {
      if (!projekt) return false
      // Direct-Anfrage types skip calculation entirely
      if (DIRECT_ANFRAGE_TYPES.includes(projekt as ProjektType)) {
        setState((prev) => ({ ...prev, currentStep: 'anfrage' }))
      } else {
        setState((prev) => ({ ...prev, currentStep: 'optionen' }))
      }
      return true
    }

    if (currentStep === 'optionen') {
      setState((prev) => ({ ...prev, currentStep: 'ausstattung' }))
      return true
    }

    if (currentStep === 'ausstattung') {
      setState((prev) => ({ ...prev, currentStep: 'material' }))
      return true
    }

    if (currentStep === 'material') {
      setState((prev) => ({ ...prev, currentStep: 'ergebnis' }))
      return true
    }

    if (currentStep === 'ergebnis') {
      setState((prev) => ({ ...prev, currentStep: 'anfrage' }))
      return true
    }

    return true
  }, [state])

  const back = useCallback(() => {
    const { currentStep, projekt } = state

    const order: StepId[] = ['objekt', 'projekt', 'optionen', 'ausstattung', 'material', 'ergebnis', 'anfrage']
    const idx = order.indexOf(currentStep)

    if (currentStep === 'anfrage' && projekt && DIRECT_ANFRAGE_TYPES.includes(projekt as ProjektType)) {
      setState((prev) => ({ ...prev, currentStep: 'projekt' }))
      return
    }

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
    isDirectAnfrage,
    setObjekt,
    setM2,
    setProjekt,
    toggleOption,
    setQuantity,
    setMaterial,
    setStep,
    next,
    back,
    reset,
  }
}
