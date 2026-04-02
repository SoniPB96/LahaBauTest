import type { Metadata } from 'next'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { SectionContainer, SectionHeader } from '@/components/ui/SectionContainer'

export const metadata: Metadata = {
  title: 'Elektroinstallation Paderborn – Laha Baudienstleistungen',
}

const SERVICES = [
  {
    title: 'Sanierung & Renovierung',
    desc: 'Vollständige oder teilweise Erneuerung veralteter Elektroinstallationen. Sicherheit und Normkonformität nach aktuellem Standard.',
    tags: ['Unterputz', 'Verteilungen', 'Sicherungskästen'],
  },
  {
    title: 'Modernisierung',
    desc: 'Schalter, Steckdosen, Beleuchtung, Fußbodenheizung. Ihr Zuhause zeitgemäß und komfortabel ausgestattet.',
    tags: ['LED-Systeme', 'Fußbodenheizung', 'LAN/Netzwerk'],
  },
  {
    title: 'Zählerschrank & Absicherung',
    desc: 'Erneuerung und Aufrüstung von Zählerschränken, Unterverteilungen und Überspannungsschutz. Normgerecht und dokumentiert.',
    tags: ['FI-Schutz', 'Überspannungsschutz', 'Dokumentation'],
  },
  {
    title: 'Baubegleitung & Koordination',
    desc: 'Strukturierte Projektabwicklung mit zuverlässigen Partnerbetrieben. Ein Ansprechpartner für alle Gewerke.',
    tags: ['Terminkoordination', 'Partnerhandwerker', 'Transparenz'],
  },
]

const TRUST_ITEMS = [
  'Paderborn & OWL',
  'Festpreisangebot',
  'Rückmeldung innerhalb 48h',
  'Dokumentierte Ausführung',
  'Zuverlässige Partnerbetriebe',
]

const CALC_STEPS = [
  'Objekt auswählen',
  'Projekttyp festlegen',
  'Optionen & Ausstattung',
  'Material & Qualität',
  'Erste Einschätzung erhalten',
]

const PROOF = [
  { num: '48h', label: 'Rückmeldung garantiert' },
  { num: '100%', label: 'Festpreisangebote' },
  { num: 'OWL', label: 'Paderborn & Umgebung' },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <div className="max-w-site mx-auto px-6 md:px-7 pt-20 md:pt-24 pb-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-14 items-center">
          <div>
            <p className="text-[0.68rem] tracking-[0.16em] uppercase text-gold font-normal mb-5">
              Elektroinstallation · Paderborn
            </p>
            <h1 className="font-serif text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.12]
                           tracking-[-0.025em] text-text-1 mb-5">
              Saubere Elektroarbeiten mit klarer Kommunikation und{' '}
              <em className="text-gold" style={{ fontStyle: 'italic' }}>verlässlicher</em>{' '}
              Ausführung.
            </h1>
            <p className="text-text-2 text-[0.92rem] leading-[1.8] max-w-[400px] mb-8">
              Für private Hauseigentümer in Paderborn und Umgebung. Renovierung,
              Modernisierung, Erweiterung – strukturiert begleitet, transparent kommuniziert.
            </p>
            <div className="flex gap-3 flex-wrap">
              <ButtonLink href="/anfrage">Anfrage stellen →</ButtonLink>
              <ButtonLink href="/kosteneinschaetzung" variant="ghost">
                Kosten einschätzen
              </ButtonLink>
            </div>
          </div>

          {/* Preview card – desktop only */}
          <div className="hidden md:block" aria-hidden="true">
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: '#111115', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Gold accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg,transparent 10%,rgba(201,170,114,0.5) 50%,transparent 90%)' }}
              />

              {/* Label */}
              <p className="text-[0.6rem] tracking-[0.18em] uppercase mb-5 font-normal"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                Beispielrechnung
              </p>

              {/* Example spec pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {['Altbau', 'Haus', '120 m²', '5 Zimmer', 'Standard'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.7rem] px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price range */}
              <div className="mb-5">
                <p className="text-[0.68rem] mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Erste Einschätzung</p>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-serif tracking-tight"
                    style={{ fontSize: '2rem', color: '#ededeb', letterSpacing: '-0.03em' }}
                  >
                    9.500 –
                  </span>
                  <span
                    className="font-serif tracking-tight"
                    style={{ fontSize: '2rem', color: '#ededeb', letterSpacing: '-0.03em' }}
                  >
                    12.900 €
                  </span>
                </div>
                <p className="text-[0.65rem] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Netto · Orientierungswert
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/kosteneinschaetzung"
                className="flex items-center justify-between rounded-xl no-underline
                           transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  padding: '0.85rem 1.1rem',
                  background: '#c9aa72',
                  color: '#1a1400',
                }}
              >
                <span className="text-[0.85rem] font-medium">Ihr Projekt berechnen</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div
        className="bg-bg-2 py-3.5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-site mx-auto px-6 md:px-7 flex gap-6 flex-wrap justify-center">
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[0.72rem] text-text-3
                         tracking-[0.07em] uppercase font-normal whitespace-nowrap"
            >
              <span className="w-[3px] h-[3px] rounded-full bg-gold shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <SectionContainer>
        <SectionHeader
          eyebrow="Leistungen"
          title="Was wir für Sie umsetzen"
          subtitle="Spezialisiert auf moderne Elektroinstallation im Privatbereich – strukturiert, sauber ausgeführt."
        />
        <div className="grid sm:grid-cols-2 gap-5">
          {SERVICES.map(({ title, desc, tags }) => (
            <div
              key={title}
              className="bg-bg-2 rounded-lg p-7 transition-colors hover:bg-bg-3"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="text-[0.92rem] font-medium text-text-1 mb-2 tracking-[-0.01em]">
                {title}
              </h3>
              <p className="text-[0.82rem] text-text-2 leading-[1.7] mb-4">{desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.65rem] text-text-4 rounded px-2 py-0.5 tracking-[0.04em]"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ── SOCIAL PROOF ── */}
      <div
        className="bg-bg-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-site mx-auto px-6 md:px-7 py-12 grid grid-cols-1 sm:grid-cols-3">
          {PROOF.map(({ num, label }, i) => (
            <div
              key={label}
              className="py-8 sm:py-0 sm:px-10 text-center"
              style={
                i < PROOF.length - 1
                  ? { borderBottom: '1px solid rgba(255,255,255,0.06)' }
                  : undefined
              }
            >
              <span className="font-serif text-[2.2rem] text-text-1 tracking-[-0.03em] block mb-1">
                {num}
              </span>
              <span className="text-[0.75rem] text-text-3 tracking-[0.07em] uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALC TEASER ── */}
      <SectionContainer size="sm">
        <SectionHeader
          eyebrow="Kosteneinschätzung"
          title="Was kostet Ihr Projekt?"
          subtitle="In wenigen Schritten zur ersten Orientierung – ohne Anmeldung, ohne Verpflichtung."
        />
        <div
          className="rounded-xl p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center bg-bg-2"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex flex-col gap-2.5">
            {CALC_STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[0.62rem] shrink-0"
                  style={{
                    border: i < 2 ? '1px solid #c9aa72' : '1px solid rgba(255,255,255,0.11)',
                    background: i < 2 ? '#c9aa72' : 'transparent',
                    color: i < 2 ? '#1a1400' : 'rgba(255,255,255,0.4)',
                    fontWeight: i < 2 ? 500 : 300,
                  }}
                >
                  {i + 1}
                </div>
                <span className={`text-[0.82rem] ${i < 2 ? 'text-text-2' : 'text-text-3'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[0.88rem] text-text-2 leading-[1.75] mb-6">
              Unser Kalkulator gibt Ihnen eine realistische erste Einschätzung für Ihr
              Elektroprojekt. Kein Verkaufsgespräch, keine Verpflichtung – nur Orientierung.
            </p>
            <ButtonLink href="/kosteneinschaetzung">Kalkulator starten →</ButtonLink>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
