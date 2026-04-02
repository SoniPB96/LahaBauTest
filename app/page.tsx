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

const PROCESS = [
  'Klare Erstaufnahme statt losem Hin und Her',
  'Saubere Angebotsstruktur für Privatkunden',
  'Koordinierte Ausführung mit dokumentiertem Abschluss',
]

export default function HomePage() {
  return (
    <>
      <section className="max-w-site mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-14 md:pb-18">
        <div
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1016] px-6 py-8 md:px-10 md:py-12"
          style={{
            backgroundImage:
              'radial-gradient(circle at top right, rgba(201,170,114,0.12), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
            boxShadow: '0 30px 70px rgba(0,0,0,0.32)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9aa72]/60 to-transparent" />
          <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:gap-12">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-white/58">
                <span className="rounded-full border border-[#c9aa72]/25 bg-[#c9aa72]/10 px-3 py-1.5 text-[#e1c58f]">
                  Laha Baudienstleistungen
                </span>
                <span>Elektroinstallation · Paderborn</span>
              </div>

              <h1 className="max-w-[12ch] text-[clamp(2.4rem,5vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
                Elektroarbeiten mit Struktur und Präsenz.
              </h1>

              <p className="mt-6 max-w-[640px] text-[1rem] leading-[1.8] text-white/72 md:text-[1.02rem]">
                Für Eigentümer, Sanierungen und Modernisierungen im Privatbereich. Klare Kommunikation,
                saubere Ausführung und ein Auftritt, der Ihr Projekt von Anfang an ernst nimmt.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/anfrage" className="rounded-full px-7 py-4 text-[0.92rem] font-semibold">
                  Anfrage stellen →
                </ButtonLink>
                <ButtonLink
                  href="/kosteneinschaetzung"
                  variant="ghost"
                  className="rounded-full border border-white/12 bg-white/[0.03] px-7 py-4 text-[0.92rem] text-white hover:bg-white/[0.05] hover:text-white"
                >
                  Kosteneinschätzung starten
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-white/50">Leistungsschwerpunkte</span>
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-[#d7bc88]">Privatbereich</span>
                </div>
                <div className="grid gap-3">
                  {SERVICES.slice(0, 3).map((service, index) => (
                    <div
                      key={service.title}
                      className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4 transition-all hover:border-[#c9aa72]/20 hover:bg-white/[0.05]"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#d8be8b]">
                          0{index + 1}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-[#c9aa72]/30 to-transparent" />
                      </div>
                      <h2 className="text-[1rem] font-semibold tracking-[-0.02em] text-white">{service.title}</h2>
                      <p className="mt-2 text-[0.88rem] leading-[1.7] text-white/60">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {PROOF.map(({ num, label }) => (
                  <div key={label} className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-5 text-center">
                    <div className="text-[1.6rem] font-semibold tracking-[-0.04em] text-white">{num}</div>
                    <div className="mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-white/48">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="bg-bg-2 py-3.5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-site mx-auto px-6 md:px-8 flex gap-6 flex-wrap justify-center">
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 whitespace-nowrap text-[0.72rem] uppercase tracking-[0.07em] text-text-2"
            >
              <span className="w-[4px] h-[4px] rounded-full bg-gold shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <SectionContainer>
        <SectionHeader
          eyebrow="Leistungen"
          title="Klar aufgebaut statt dekorativ überladen"
          subtitle="Die Startseite bleibt schlank, wirkt aber deutlich professioneller. Inhalte und Struktur bleiben erhalten, die Darstellung ist sauberer und belastbarer."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {SERVICES.map(({ title, desc, tags }, index) => (
            <article
              key={title}
              className="rounded-[24px] border border-white/10 bg-[#0f131a] p-6 md:p-7"
              style={{ boxShadow: '0 22px 55px rgba(0,0,0,0.18)' }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#d8be8b]">
                    Leistung 0{index + 1}
                  </div>
                  <h3 className="text-[1.2rem] font-semibold tracking-[-0.025em] text-white">{title}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.12em] text-white/52">
                  Privatbereich
                </span>
              </div>

              <p className="mb-5 max-w-[58ch] text-[0.94rem] leading-[1.8] text-white/66">{desc}</p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#c9aa72]/18 bg-[#c9aa72]/8 px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.08em] text-[#e0c793]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      <div
        className="bg-bg-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-site mx-auto px-6 md:px-8 py-12 grid grid-cols-1 gap-0 sm:grid-cols-3">
          {PROOF.map(({ num, label }, i) => (
            <div
              key={label}
              className="py-8 text-center sm:px-10"
              style={
                i < PROOF.length - 1
                  ? { borderBottom: '1px solid rgba(255,255,255,0.06)' }
                  : undefined
              }
            >
              <span className="block text-[2.4rem] font-semibold tracking-[-0.05em] text-white">{num}</span>
              <span className="mt-2 block text-[0.75rem] uppercase tracking-[0.09em] text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <SectionContainer>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-[24px] border border-white/10 bg-[#0e1218] p-7 md:p-8">
            <div className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#d8be8b]">
              Projektablauf
            </div>
            <h2 className="max-w-[14ch] text-[clamp(1.9rem,3vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              Sauber geplant. Ruhig kommuniziert. Verlässlich umgesetzt.
            </h2>
            <div className="mt-7 grid gap-4">
              {PROCESS.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-[18px] border border-white/8 bg-white/[0.03] p-4">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c9aa72]/22 bg-[#c9aa72]/10 text-[0.78rem] font-semibold text-[#e0c793]">
                    {index + 1}
                  </span>
                  <p className="text-[0.93rem] leading-[1.75] text-white/68">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#0f1319] p-7 md:p-8">
            <SectionHeader
              eyebrow="Kosteneinschätzung"
              title="Was kostet Ihr Projekt?"
              subtitle="In wenigen Schritten zur ersten Orientierung – ohne Anmeldung, ohne Verpflichtung."
              className="mb-8"
            />
            <div className="grid gap-3">
              {CALC_STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-3 rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3.5">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-semibold"
                    style={{
                      border: i < 2 ? '1px solid rgba(201,170,114,0.35)' : '1px solid rgba(255,255,255,0.1)',
                      background: i < 2 ? 'rgba(201,170,114,0.14)' : 'rgba(255,255,255,0.03)',
                      color: i < 2 ? '#e0c793' : 'rgba(255,255,255,0.46)',
                    }}
                  >
                    {i + 1}
                  </div>
                  <span className={i < 2 ? 'text-[0.9rem] text-white/78' : 'text-[0.9rem] text-white/48'}>{label}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[0.93rem] leading-[1.8] text-white/66">
              Unser Kalkulator gibt Ihnen eine realistische erste Einschätzung für Ihr Elektroprojekt.
              Keine unnötige Hürde, sondern eine schnelle und saubere Orientierung.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/kosteneinschaetzung" className="rounded-full px-7 py-4 text-[0.92rem] font-semibold">
                Kalkulator starten →
              </ButtonLink>
              <Link
                href="/anfrage"
                className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-4 text-[0.9rem] text-white/78 no-underline transition-all hover:bg-white/[0.05] hover:text-white"
              >
                Direkt anfragen
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
