'use client'

import { useId, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  vorname: z.string().min(2, 'Bitte Vornamen eingeben'),
  nachname: z.string().min(2, 'Bitte Nachnamen eingeben'),
  email: z.string().email('Bitte gültige E-Mail-Adresse eingeben'),
  telefon: z.string().optional(),
  ort: z.string().min(2, 'Bitte Ort oder PLZ eingeben'),
  projektart: z.string().min(1, 'Bitte Projektart auswählen'),
  beschreibung: z.string().min(20, 'Bitte mindestens 20 Zeichen eingeben'),
})

type FormValues = z.infer<typeof schema>

const PROJEKTARTEN = [
  'Sanierung / Renovierung',
  'Modernisierung',
  'Neubau / Erweiterung',
  'Zählerschrank erneuern',
  'Baubegleitung',
  'Sonstiges',
]

const inputBase =
  'w-full bg-bg-3 rounded px-4 py-3 text-text-1 text-[0.88rem] font-light ' +
  'outline-none transition-all duration-150 placeholder:text-text-4'

function borderStyle(hasError: boolean) {
  return {
    border: `1px solid ${hasError ? 'rgba(224,82,82,0.4)' : 'rgba(255,255,255,0.06)'}`,
  }
}

interface FieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.68rem] tracking-[0.1em] uppercase text-text-3 font-normal mb-1.5"
      >
        {label}
        {required && <span className="text-gold ml-0.5" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (Pflichtfeld)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.72rem] text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export function AnfrageForm() {
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`

  const [files, setFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return
    const valid = Array.from(incoming).filter((f) => {
      const validType = ['image/jpeg', 'image/png', 'application/pdf'].includes(f.type)
      const validSize = f.size <= 10 * 1024 * 1024
      return validType && validSize
    })
    setFiles((prev) => [...prev, ...valid])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    try {
      const body = new FormData()
      Object.entries(data).forEach(([k, v]) => body.append(k, v ?? ''))
      files.forEach((f) => body.append('dateien', f))

      // Wire to real endpoint: await fetch('/api/anfrage', { method: 'POST', body })
      // Using Resend, Formspree, or a custom API route in app/api/anfrage/route.ts
      await new Promise((r) => setTimeout(r, 600))

      setSubmitted(true)
    } catch {
      setServerError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.')
    }
  }

  if (submitted) {
    return (
      <div
        className="bg-bg-2 rounded-lg p-10 flex flex-col items-center text-center"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        role="status"
        aria-live="polite"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
          style={{ background: 'rgba(76,175,130,0.08)', border: '1px solid rgba(76,175,130,0.25)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10l5 5 7-8" stroke="#4caf82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="font-serif text-[1.5rem] text-text-1 mb-2">Anfrage erhalten.</h2>
        <p className="text-[0.85rem] text-text-2 leading-[1.7] max-w-sm">
          Wir melden uns innerhalb eines Werktags bei Ihnen. Vielen Dank.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Anfrage-Formular"
      className="bg-bg-2 rounded-lg p-6 md:p-8 flex flex-col gap-4"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {serverError && (
        <div
          className="px-4 py-3 rounded text-[0.78rem] text-danger flex gap-2"
          style={{ background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.25)' }}
          role="alert"
        >
          <span aria-hidden="true">⚠</span>
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field id={id('vorname')} label="Vorname" required error={errors.vorname?.message}>
          <input
            {...register('vorname')}
            id={id('vorname')}
            type="text"
            placeholder="Max"
            autoComplete="given-name"
            aria-describedby={errors.vorname ? `${id('vorname')}-error` : undefined}
            aria-invalid={!!errors.vorname}
            className={inputBase}
            style={borderStyle(!!errors.vorname)}
          />
        </Field>
        <Field id={id('nachname')} label="Nachname" required error={errors.nachname?.message}>
          <input
            {...register('nachname')}
            id={id('nachname')}
            type="text"
            placeholder="Mustermann"
            autoComplete="family-name"
            aria-describedby={errors.nachname ? `${id('nachname')}-error` : undefined}
            aria-invalid={!!errors.nachname}
            className={inputBase}
            style={borderStyle(!!errors.nachname)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field id={id('email')} label="E-Mail" required error={errors.email?.message}>
          <input
            {...register('email')}
            id={id('email')}
            type="email"
            placeholder="max@beispiel.de"
            autoComplete="email"
            aria-describedby={errors.email ? `${id('email')}-error` : undefined}
            aria-invalid={!!errors.email}
            className={inputBase}
            style={borderStyle(!!errors.email)}
          />
        </Field>
        <Field id={id('telefon')} label="Telefon">
          <input
            {...register('telefon')}
            id={id('telefon')}
            type="tel"
            placeholder="+49 5251 …"
            autoComplete="tel"
            className={inputBase}
            style={borderStyle(false)}
          />
        </Field>
      </div>

      <Field id={id('ort')} label="Ort / PLZ" required error={errors.ort?.message}>
        <input
          {...register('ort')}
          id={id('ort')}
          type="text"
          placeholder="Paderborn, 33100"
          autoComplete="postal-code"
          aria-describedby={errors.ort ? `${id('ort')}-error` : undefined}
          aria-invalid={!!errors.ort}
          className={inputBase}
          style={borderStyle(!!errors.ort)}
        />
      </Field>

      <Field id={id('projektart')} label="Projektart" required error={errors.projektart?.message}>
        <select
          {...register('projektart')}
          id={id('projektart')}
          aria-describedby={errors.projektart ? `${id('projektart')}-error` : undefined}
          aria-invalid={!!errors.projektart}
          className={inputBase + ' cursor-pointer appearance-none'}
          style={{
            ...borderStyle(!!errors.projektart),
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23606060' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
          }}
        >
          <option value="">Bitte auswählen …</option>
          {PROJEKTARTEN.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </Field>

      <Field id={id('beschreibung')} label="Projektbeschreibung" required error={errors.beschreibung?.message}>
        <textarea
          {...register('beschreibung')}
          id={id('beschreibung')}
          rows={4}
          placeholder="Kurze Beschreibung Ihres Vorhabens – z.B. Wohnfläche, besondere Anforderungen …"
          aria-describedby={errors.beschreibung ? `${id('beschreibung')}-error` : undefined}
          aria-invalid={!!errors.beschreibung}
          className={inputBase}
          style={{ ...borderStyle(!!errors.beschreibung), resize: 'vertical', lineHeight: '1.6' }}
        />
      </Field>

      {/* File upload */}
      <div>
        <p className="block text-[0.68rem] tracking-[0.1em] uppercase text-text-3 font-normal mb-1.5">
          Dateien <span className="normal-case tracking-normal">(optional – Grundrisse, Fotos)</span>
        </p>
        <div
          className="rounded px-5 py-5 text-center transition-colors"
          style={{ border: '1px dashed rgba(255,255,255,0.11)' }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files) }}
        >
          <label htmlFor={id('files')} className="cursor-pointer block">
            <svg
              className="mx-auto mb-2 text-text-4"
              width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
            >
              <path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            <p className="text-[0.8rem] text-text-3 leading-[1.6]">
              <span className="text-text-2">Klicken zum Hochladen</span> oder hierher ziehen
              <br />
              <span className="text-[0.72rem]">PDF, JPG, PNG · max. 10 MB pro Datei</span>
            </p>
            <input
              ref={fileInputRef}
              id={id('files')}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
        </div>

        {files.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1.5" aria-label="Ausgewählte Dateien">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center gap-2 text-[0.75rem] text-text-2 bg-bg-3 rounded px-3 py-2"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="shrink-0 text-text-3" aria-hidden="true">
                  <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="truncate flex-1">{f.name}</span>
                <span className="text-text-4 shrink-0">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-text-4 hover:text-danger transition-colors bg-transparent
                             border-none cursor-pointer p-1 font-sans leading-none min-w-[24px] min-h-[24px]
                             flex items-center justify-center"
                  aria-label={`${f.name} entfernen`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-gold text-[#1a1400] border-none rounded text-[0.9rem]
                   font-medium font-sans cursor-pointer transition-opacity hover:opacity-85
                   active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:active:scale-100 mt-1 min-h-[48px]"
      >
        {isSubmitting ? 'Wird gesendet …' : 'Anfrage absenden'}
      </button>

      <p className="text-[0.7rem] text-text-4 text-center leading-[1.55]">
        Keine Verpflichtung. Rückmeldung innerhalb eines Werktags.{' '}
        <a href="/datenschutz" className="text-text-3 hover:text-text-2 transition-colors underline underline-offset-2">
          Datenschutzhinweis
        </a>
      </p>
    </form>
  )
}
