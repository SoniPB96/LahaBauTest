'use client'

import { useState, useRef } from 'react'
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

const inputClass =
  'w-full bg-bg-3 border rounded px-4 py-3 text-text-1 text-[0.88rem] font-light ' +
  'outline-none transition-all duration-150 placeholder:text-text-4 ' +
  'hover:border-muted focus:border-gold/50 focus:ring-2 focus:ring-gold/10'

const labelClass = 'block text-[0.68rem] tracking-[0.1em] uppercase text-text-3 font-normal mb-1.5'

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

function Field({ label, required, error, children }: FieldProps) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[0.72rem] text-danger">{error}</p>
      )}
    </div>
  )
}

export function AnfrageForm() {
  const [files, setFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return
    const valid = Array.from(incoming).filter((f) => {
      const ok = ['image/jpeg', 'image/png', 'application/pdf'].includes(f.type)
      const small = f.size <= 10 * 1024 * 1024
      return ok && small
    })
    setFiles((prev) => [...prev, ...valid])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    try {
      // TODO: Replace with real API route or Resend/Formspree integration
      // Example: await fetch('/api/anfrage', { method: 'POST', body: FormData })
      const body = new FormData()
      Object.entries(data).forEach(([k, v]) => body.append(k, v ?? ''))
      files.forEach((f) => body.append('dateien', f))

      // Simulated network delay – remove when real endpoint is wired
      await new Promise((r) => setTimeout(r, 800))

      setSubmitted(true)
    } catch {
      setServerError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    }
  }

  if (submitted) {
    return (
      <div
        className="bg-bg-2 border rounded-lg p-10 flex flex-col items-center text-center"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="w-12 h-12 rounded-full border flex items-center justify-center mb-5"
          style={{
            background: 'rgba(76,175,130,0.08)',
            borderColor: 'rgba(76,175,130,0.25)',
          }}
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
      className="bg-bg-2 border rounded-lg p-6 md:p-8 flex flex-col gap-4"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      {serverError && (
        <div
          className="px-4 py-3 rounded border text-[0.78rem] text-danger flex gap-2"
          style={{ background: 'rgba(224,82,82,0.08)', borderColor: 'rgba(224,82,82,0.25)' }}
        >
          <span>⚠</span> {serverError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Vorname" required error={errors.vorname?.message}>
          <input
            {...register('vorname')}
            type="text"
            placeholder="Max"
            autoComplete="given-name"
            className={inputClass}
            style={{ borderColor: errors.vorname ? 'rgba(224,82,82,0.4)' : 'rgba(255,255,255,0.06)' }}
          />
        </Field>
        <Field label="Nachname" required error={errors.nachname?.message}>
          <input
            {...register('nachname')}
            type="text"
            placeholder="Mustermann"
            autoComplete="family-name"
            className={inputClass}
            style={{ borderColor: errors.nachname ? 'rgba(224,82,82,0.4)' : 'rgba(255,255,255,0.06)' }}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="E-Mail" required error={errors.email?.message}>
          <input
            {...register('email')}
            type="email"
            placeholder="max@beispiel.de"
            autoComplete="email"
            className={inputClass}
            style={{ borderColor: errors.email ? 'rgba(224,82,82,0.4)' : 'rgba(255,255,255,0.06)' }}
          />
        </Field>
        <Field label="Telefon" error={errors.telefon?.message}>
          <input
            {...register('telefon')}
            type="tel"
            placeholder="+49 5251 …"
            autoComplete="tel"
            className={inputClass}
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          />
        </Field>
      </div>

      <Field label="Ort / PLZ" required error={errors.ort?.message}>
        <input
          {...register('ort')}
          type="text"
          placeholder="Paderborn, 33100"
          autoComplete="postal-code"
          className={inputClass}
          style={{ borderColor: errors.ort ? 'rgba(224,82,82,0.4)' : 'rgba(255,255,255,0.06)' }}
        />
      </Field>

      <Field label="Projektart" required error={errors.projektart?.message}>
        <select
          {...register('projektart')}
          className={inputClass + ' cursor-pointer'}
          style={{
            borderColor: errors.projektart ? 'rgba(224,82,82,0.4)' : 'rgba(255,255,255,0.06)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23606060' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            appearance: 'none',
          }}
        >
          <option value="">Bitte auswählen …</option>
          {PROJEKTARTEN.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </Field>

      <Field label="Projektbeschreibung" required error={errors.beschreibung?.message}>
        <textarea
          {...register('beschreibung')}
          rows={4}
          placeholder="Kurze Beschreibung Ihres Vorhabens – z.B. Wohnfläche, besondere Anforderungen …"
          className={inputClass}
          style={{
            borderColor: errors.beschreibung ? 'rgba(224,82,82,0.4)' : 'rgba(255,255,255,0.06)',
            resize: 'vertical',
            lineHeight: '1.6',
          }}
        />
      </Field>

      {/* File upload */}
      <div>
        <p className={labelClass}>Dateien (optional)</p>
        <div
          className="border border-dashed rounded px-5 py-5 text-center cursor-pointer
                     transition-colors hover:border-gold/40 hover:bg-gold-tint relative"
          style={{ borderColor: 'rgba(255,255,255,0.11)' }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <svg
            className="mx-auto mb-2 text-text-4"
            width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
              stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-[0.8rem] text-text-3 leading-[1.6]">
            <strong className="text-text-2 font-normal">Klicken zum Hochladen</strong> oder
            hierher ziehen
            <br />
            <span className="text-[0.72rem]">PDF, JPG, PNG · max. 10 MB pro Datei</span>
          </p>
        </div>

        {files.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1.5">
            {files.map((f, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-[0.75rem] text-text-2 bg-bg-3 border
                           rounded px-3 py-2"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-text-3" aria-hidden="true">
                  <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="truncate flex-1">{f.name}</span>
                <span className="text-text-4 shrink-0">
                  {(f.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                  className="text-text-4 hover:text-danger transition-colors bg-transparent
                             border-none cursor-pointer p-0 font-sans text-sm"
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
                   disabled:scale-100 mt-1"
      >
        {isSubmitting ? 'Wird gesendet …' : 'Anfrage absenden'}
      </button>

      <p className="text-[0.7rem] text-text-4 text-center leading-[1.55]">
        Keine Verpflichtung. Rückmeldung innerhalb eines Werktags.{' '}
        <a href="/datenschutz" className="text-text-3 hover:text-text-2 transition-colors">
          Datenschutzhinweis
        </a>
      </p>
    </form>
  )
}
