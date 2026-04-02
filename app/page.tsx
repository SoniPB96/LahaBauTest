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
    desc: 'Erneuerung veralteter Elektroinstallationen im Bestand. Sauber geplant, normgerecht umgesetzt und auf lange Nutzbarkeit ausgelegt.',
    tags: ['Bestand', 'Unterputz', 'Modernisierung'],
  },
  {
    title: 'Schalter, Steckdosen & Licht',
    desc: 'Klar strukturierte Elektroarbeiten für Wohnräume, Küchen und Bäder. Funktional, sauber ausgeführt und optisch stimmig eingebunden.',
    tags: ['Beleuchtung', 'Schalterprogramme', 'Nachrüstung'],
  },
  {
    title: 'Zählerschrank & Unterverteilung',
    desc: 'Erneuerung und Aufrüstung von Zählerschränken, Absicherung und Verteilungen. Dokumentiert und nach aktuellem Stand ausgeführt.',
    tags: ['Zählerschrank', 'FI/LS', 'Dokumentation'],
  },
  {
    title: 'Baubegleitung & Koordination',
    desc: 'Ein Ansprechpartner für saubere Projektabläufe. Gewerke, Termine und Ausführung werden nachvollziehbar koordiniert.',
    tags: ['Koordination', 'Partnerbetriebe', 'Abläufe'],
  },
]

const TRUST_ITEMS = [
  'Paderborn & OWL',
  'Festpreisangebot',
  'Rückmeldung innerhalb 48h',
  'Dokumentierte Ausführung',
  'Zuverlässige Partnerbetriebe',
]

const PROOF = [
  { num: '48h', label: 'Rückmeldung garantiert' },
  { num: '100%', label: 'Festpreisangebote' },
  { num: 'OWL', label: 'Paderborn & Umgebung' },
]

const PROCESS = [
  'Objekt und Vorhaben aufnehmen',
  'Elektroumfang sinnvoll eingrenzen',
  'Klare Ersteinschätzung erhalten',
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-subtle">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(201,170,114,0.10),transparent_36%)]" />
        <div className="max-w-site mx-auto px-6 md:px-7 pt-16 md:pt-24 pb-16 md:pb-20 relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-12 items-start">
            <div className="max-w-[640px]">
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-text-2">
                <span className="rounded-full border border-[rgba(201,170,114,0.28)] bg-[rgba(201,170,114,0.08)] px-3 py-1 text-gold">
                  Laha Baudienstleistungen
                </span>
                <span>Elektroinstallation · Paderborn</span>
              </div>

              <h1 className="max-w-[10ch] text-[clamp(2.8rem,7vw,5.3rem)] font-sans font-semibold leading-[0.96] tracking-[-0.055em] text-white mb-6">
                Elektroarbeiten mit Substanz und Struktur.
              </h1>

              <p className="max-w-[580px] text-[1rem] md:text-[1.04rem] text-text-2 leading-[1.8] mb-8">
                Für Eigentümer, Sanierungen und Modernisierungen im Privatbereich.
                Klare Kommunikation, saubere Ausführung und ein Auftritt, der Ihr Projekt ernst nimmt.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <ButtonLink href="/anfrage">Anfrage stellen →</ButtonLink>
                <ButtonLink href="/kosteneinschaetzung" variant="ghost">
                  Kosteneinschätzung starten
                </ButtonLink>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 max-w-[720px]">
                {PROOF.map(({ num, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-subtle bg-[rgba(255,255,255,0.02)] px-5 py-5"
                  >
                    <div className="text-[2rem] leading-none font-semibold tracking-[-0.04em] text-white mb-3">
                      {num}
                    </div>
                    <div className="text-[0.72rem] uppercase tracking-[0.12em] text-text-2">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 md:p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-text-2">
                  Leistungsschwerpunkte
                </p>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold">
                  Privatbereich
                </p>
              </div>

              <div className="space-y-3">
                {SERVICES.slice(0, 3).map(({ title, desc }, index) => (
                  <div
                    key={title}
                    className="rounded-[22px] border border-strong bg-[rgba(12,12,14,0.55)] p-5"
                  >
                    <div className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-gold">
                      0{index + 1}
                    </div>
                    <h3 className="mb-2 text-[1rem] font-semibold tracking-[-0.02em] text-white">
                      {title}
                    </h3>
                    <p className="text-[0.86rem] leading-[1.75] text-text-2">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] border border-subtle bg-[rgba(255,255,255,0.02)] p-5">
                <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-text-2">
                  So starten viele Projekte
                </p>
                <div className="space-y-3">
                  {PROCESS.map((item, index) => (
                    <div key={item} className="flex items-start gap-3 text-[0.86rem] leading-[1.65] text-text-2">
                      <span className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgba(201,170,114,0.3)] bg-[rgba(201,170,114,0.08)] text-[0.7rem] font-semibold text-gold">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/kosteneinschaetzung"
                  className="mt-5 inline-flex items-center gap-2 text-[0.82rem] font-semibold text-white no-underline transition-opacity hover:opacity-80"
                >
                  Zum Rechner
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="bg-bg-2 py-3.5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-site mx-auto px-6 md:px-7 flex gap-6 flex-wrap justify-center">
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[0.72rem] text-text-3 tracking-[0.07em] uppercase font-normal whitespace-nowrap"
            >
              <span className="w-[3px] h-[3px] rounded-full bg-gold shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <SectionContainer>
        <SectionHeader
          eyebrow="Leistungen"
          title="Was wir im Privatbereich konkret umsetzen"
          subtitle="Klar abgegrenzte Elektroarbeiten statt unklarer Sammelbegriff. Damit sofort erkennbar wird, wofür Laha Baudienstleistungen steht."
        />
        <div className="grid sm:grid-cols-2 gap-5">
          {SERVICES.map(({ title, desc, tags }) => (
            <div
              key={title}
              className="rounded-[22px] border border-subtle bg-[rgba(255,255,255,0.02)] p-6 transition-all duration-200 hover:border-strong hover:bg-[rgba(255,255,255,0.03)]"
            >
              <h3 className="text-[1rem] font-semibold text-white mb-2 tracking-[-0.02em]">
                {title}
              </h3>
              <p className="text-[0.88rem] text-text-2 leading-[1.75] mb-4">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-subtle px-3 py-1 text-[0.68rem] uppercase tracking-[0.08em] text-text-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </>
  )
}
