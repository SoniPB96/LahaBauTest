'use client'

import { useId, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  vorname:      z.string().min(2, 'Bitte Vornamen eingeben'),
  nachname:     z.string().min(2, 'Bitte Nachnamen eingeben'),
  email:        z.string().email('Bitte gültige E-Mail-Adresse eingeben'),
  telefon:      z.string().optional(),
  ort:          z.string().min(2, 'Bitte Ort oder PLZ eingeben'),
  projektart:   z.string().min(1, 'Bitte Projektart auswählen'),
  beschreibung: z.string().min(10, 'Bitte mindestens 10 Zeichen eingeben'),
})

type FormValues = z.infer<typeof schema>

const PROJEKTARTEN = [
  'Neubau',
  'Altbau / Bestand',
  'Komplettsanierung',
  'Teil-Erneuerung / Nachinstallation',
  'Zählerschrank / Unterverteilung',
  'Baubegleitung',
  'Sonstiges',
]

const inputBase =
  'w-full bg-bg-3 rounded-xl px-4 py-3 text-text-1 text-[0.88rem] font-light ' +
  'outline-none placeholder:text-text-4'

function borderStyle(hasError: boolean) {
  return {
    border: `1.5px solid ${hasError ? 'rgba(224,82,82,0.4)' : 'rgba(255,255,255,0.08)'}`,
    transition: 'border-color 0.15s ease',
  }
}

interface FieldProps {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode
}

function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.68rem] tracking-[0.1em] uppercase font-normal mb-1.5"
        style={{ color: 'rgba(255,255,255,0.35)' }}>
        {label}
        {required && <span style={{ color: '#c9aa72' }} className="ml-0.5" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (Pflichtfeld)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.72rem]" style={{ color: '#e05252' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export function AnfrageForm() {
  const uid          = useId()
  const id           = (name: string) => `${uid}-${name}`
  const searchParams = useSearchParams()
  const calcSummary  = searchParams.get('summary') ?? ''
  const [summaryOpen, setSummaryOpen] = useState(!!calcSummary)

  const [files, setFiles]           = useState<File[]>([])
  const [submitted, setSubmitted]   = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) })

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return
    const valid = Array.from(incoming).filter(f =>
      ['image/jpeg','image/png','application/pdf'].includes(f.type) && f.size <= 10 * 1024 * 1024
    )
    setFiles(prev => [...prev, ...valid])
  }

  const removeFile = (i: number) => setFiles(prev => prev.filter((_, j) => j !== i))

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    try {
      const body = new FormData()
      Object.entries(data).forEach(([k, v]) => body.append(k, v ?? ''))
      if (calcSummary) body.append('kalkulator_zusammenfassung', calcSummary)
      files.forEach(f => body.append('dateien', f))
      // TODO: replace with real endpoint
      await new Promise(r => setTimeout(r, 700))
      setSubmitted(true)
    } catch {
      setServerError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl p-10 flex flex-col items-center text-center"
        style={{ border: '1.5px solid rgba(255,255,255,0.07)', background: '#111115' }}
        role="status" aria-live="polite">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
          style={{ background: 'rgba(76,175,130,0.08)', border: '1px solid rgba(76,175,130,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10l5 5 7-8" stroke="#4caf82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="font-serif text-[1.5rem] text-text-1 mb-2">Anfrage erhalten.</h2>
        <p className="text-[0.85rem] text-text-2 leading-[1.7] max-w-sm">
          Wir melden uns innerhalb eines Werktags bei Ihnen.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Anfrage-Formular"
      className="rounded-2xl p-6 md:p-8 flex flex-col gap-4"
      style={{ border: '1.5px solid rgba(255,255,255,0.07)', background: '#111115' }}>

      {/* Calculator summary banner */}
      {calcSummary && (
        <div className="rounded-xl" style={{ background: 'rgba(201,170,114,0.06)', border: '1px solid rgba(201,170,114,0.15)' }}>
          <button
            type="button"
            onClick={() => setSummaryOpen(!summaryOpen)}
            className="w-full flex items-center justify-between gap-3 bg-transparent border-none cursor-pointer font-sans text-left"
            style={{ padding: '0.85rem 1rem' }}
          >
            <div className="flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="#c9aa72" strokeWidth="1.2"/>
                <path d="M3.5 4.5h7M3.5 7h7M3.5 9.5h4" stroke="#c9aa72" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              <span className="text-[0.78rem] font-normal" style={{ color: '#c9aa72' }}>
                Kostenschätzung aus dem Rechner wird mitgesendet
              </span>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
              style={{ transform: summaryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', color: 'rgba(201,170,114,0.5)', flexShrink: 0 }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {summaryOpen && (
            <pre
              className="text-[0.65rem] leading-relaxed overflow-x-auto"
              style={{ padding: '0 1rem 0.85rem', color: 'rgba(255,255,255,0.38)', whiteSpace: 'pre-wrap', fontFamily: 'monospace', borderTop: '1px solid rgba(201,170,114,0.1)', marginTop: 0, paddingTop: '0.75rem' }}>
              {decodeURIComponent(calcSummary)}
            </pre>
          )}
        </div>
      )}

      {serverError && (
        <div className="px-4 py-3 rounded-xl text-[0.78rem] flex gap-2"
          style={{ background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.2)', color: '#e05252' }}
          role="alert">
          <span aria-hidden="true">⚠</span><span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field id={id('vorname')} label="Vorname" required error={errors.vorname?.message}>
          <input {...register('vorname')} id={id('vorname')} type="text" placeholder="Max"
            autoComplete="given-name" aria-invalid={!!errors.vorname}
            aria-describedby={errors.vorname ? `${id('vorname')}-error` : undefined}
            className={inputBase} style={borderStyle(!!errors.vorname)}/>
        </Field>
        <Field id={id('nachname')} label="Nachname" required error={errors.nachname?.message}>
          <input {...register('nachname')} id={id('nachname')} type="text" placeholder="Mustermann"
            autoComplete="family-name" aria-invalid={!!errors.nachname}
            aria-describedby={errors.nachname ? `${id('nachname')}-error` : undefined}
            className={inputBase} style={borderStyle(!!errors.nachname)}/>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field id={id('email')} label="E-Mail" required error={errors.email?.message}>
          <input {...register('email')} id={id('email')} type="email" placeholder="max@beispiel.de"
            autoComplete="email" aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id('email')}-error` : undefined}
            className={inputBase} style={borderStyle(!!errors.email)}/>
        </Field>
        <Field id={id('telefon')} label="Telefon">
          <input {...register('telefon')} id={id('telefon')} type="tel" placeholder="+49 5251 …"
            autoComplete="tel" className={inputBase} style={borderStyle(false)}/>
        </Field>
      </div>

      <Field id={id('ort')} label="Ort / PLZ" required error={errors.ort?.message}>
        <input {...register('ort')} id={id('ort')} type="text" placeholder="Paderborn, 33100"
          autoComplete="postal-code" aria-invalid={!!errors.ort}
          aria-describedby={errors.ort ? `${id('ort')}-error` : undefined}
          className={inputBase} style={borderStyle(!!errors.ort)}/>
      </Field>

      <Field id={id('projektart')} label="Projektart" required error={errors.projektart?.message}>
        <select {...register('projektart')} id={id('projektart')}
          aria-invalid={!!errors.projektart}
          aria-describedby={errors.projektart ? `${id('projektart')}-error` : undefined}
          className={inputBase + ' cursor-pointer appearance-none'}
          style={{
            ...borderStyle(!!errors.projektart),
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23606060' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center',
          }}>
          <option value="">Bitte auswählen …</option>
          {PROJEKTARTEN.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </Field>

      <Field id={id('beschreibung')} label="Projektbeschreibung" required error={errors.beschreibung?.message}>
        <textarea {...register('beschreibung')} id={id('beschreibung')} rows={4}
          placeholder="Kurze Beschreibung Ihres Vorhabens …"
          aria-invalid={!!errors.beschreibung}
          aria-describedby={errors.beschreibung ? `${id('beschreibung')}-error` : undefined}
          className={inputBase}
          style={{ ...borderStyle(!!errors.beschreibung), resize: 'vertical', lineHeight: '1.6' }}/>
      </Field>

      {/* File upload */}
      <div>
        <p className="block text-[0.68rem] tracking-[0.1em] uppercase font-normal mb-1.5"
          style={{ color: 'rgba(255,255,255,0.35)' }}>
          Dateien <span className="normal-case tracking-normal" style={{ color: 'rgba(255,255,255,0.2)' }}>(optional)</span>
        </p>
        <div className="rounded-xl transition-colors"
          style={{ border: '1.5px dashed rgba(255,255,255,0.1)', padding: '1.25rem' }}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files) }}>
          <label htmlFor={id('files')} className="cursor-pointer flex flex-col items-center gap-2">
            <svg className="text-text-4" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M19 14v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M15 7l-4-4-4 4M11 3v11"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-[0.78rem] text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>Klicken</span> oder hierher ziehen
              <br/>
              <span className="text-[0.68rem]" style={{ color: 'rgba(255,255,255,0.22)' }}>PDF, JPG, PNG · max. 10 MB</span>
            </p>
            <input ref={fileInputRef} id={id('files')} type="file" accept=".pdf,.jpg,.jpeg,.png"
              multiple className="sr-only" onChange={e => addFiles(e.target.files)}/>
          </label>
        </div>
        {files.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1.5" aria-label="Ausgewählte Dateien">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`}
                className="flex items-center gap-2 text-[0.75rem] text-text-2 rounded-lg px-3 py-2"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="truncate flex-1">{f.name}</span>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.68rem' }}>{(f.size/1024/1024).toFixed(1)} MB</span>
                <button type="button" onClick={() => removeFile(i)}
                  className="transition-colors bg-transparent border-none cursor-pointer p-1 font-sans leading-none min-w-[24px] min-h-[24px] flex items-center justify-center"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e05252')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                  aria-label={`${f.name} entfernen`}>×</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl text-[0.9rem] font-medium font-sans cursor-pointer
                   active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:active:scale-100 mt-1 min-h-[52px]"
        style={{ background: '#c9aa72', color: '#1a1400', border: 'none', transition: 'opacity 0.15s ease, transform 0.1s ease' }}
        onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.opacity = '0.88' }}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
        {isSubmitting ? 'Wird gesendet …' : 'Anfrage absenden'}
      </button>

      <p className="text-[0.7rem] text-center leading-[1.55]" style={{ color: 'rgba(255,255,255,0.22)' }}>
        Keine Verpflichtung. Rückmeldung innerhalb eines Werktags.{' '}
        <a href="/datenschutz" className="underline underline-offset-2 transition-colors"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
          Datenschutz
        </a>
      </p>
    </form>
  )
}
