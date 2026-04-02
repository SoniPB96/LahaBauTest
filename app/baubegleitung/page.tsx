import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ui/Button'
import { SectionContainer } from '@/components/ui/SectionContainer'

export const metadata: Metadata = {
  title: 'Baubegleitung',
  description:
    'Strukturierte Projektkoordination für Hauseigentümer in Paderborn. Ein Ansprechpartner, zuverlässige Partner, transparente Kommunikation.',
}

const BENEFITS = [
  {
    title: 'Zentrale Anlaufstelle',
    desc: 'Ein Ansprechpartner für alle Gewerke. Keine endlose Koordination zwischen verschiedenen Handwerkern.',
  },
  {
    title: 'Geprüfte Partnerbetriebe',
    desc: 'Wir arbeiten ausschließlich mit Handwerkern zusammen, deren Qualität wir aus eigener Erfahrung kennen.',
  },
  {
    title: 'Transparente Kommunikation',
    desc: 'Regelmäßige Updates zu Zeitplan, Fortschritt und eventuellen Anpassungen – ohne dass Sie nachfragen müssen.',
  },
  {
    title: 'Realistische Zeitplanung',
    desc: 'Sauber geplante Abläufe. Wenn sich etwas ändert, kommunizieren wir das offen und frühzeitig.',
  },
  {
    title: 'Vollständige Dokumentation',
    desc: 'Alle ausgeführten Arbeiten werden normgerecht dokumentiert und strukturiert übergeben.',
  },
]

const PROCESS = [
  'Bedarf und Gewerke sauber eingrenzen',
  'Partnerbetriebe und Termine abstimmen',
  'Fortschritt transparent kommunizieren',
  'Abschluss strukturiert dokumentieren',
]

export default function BaubegleitungPage() {
  return (
    <SectionContainer className="pt-16 md:pt-20">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-start">
        <div>
          <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-gold">
            Baubegleitung
          </p>
          <h1 className="max-w-[13ch] text-[clamp(2.2rem,5vw,4.2rem)] font-sans font-semibold leading-[0.98] tracking-[-0.05em] text-white mb-5">
            Ihr Projekt. Sauber koordiniert.
          </h1>
          <p className="max-w-[620px] text-[1rem] leading-[1.85] text-text-2 mb-8">
            Wir übernehmen nicht nur Elektroarbeiten. Wir strukturieren Abläufe,
            koordinieren Partnerbetriebe und sorgen dafür, dass Ihr Bauvorhaben nicht
            an Schnittstellen oder fehlender Kommunikation scheitert.
          </p>

          <div className="rounded-[26px] border border-subtle bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-6 md:p-7 mb-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-text-2 mb-3">
                  Worum es in der Praxis geht
                </p>
                <p className="text-[0.92rem] leading-[1.8] text-text-2">
                  Viele Renovierungs- und Bauprojekte scheitern nicht am Handwerk selbst,
                  sondern an fehlender Abstimmung. Termine passen nicht zusammen,
                  Gewerke blockieren sich gegenseitig und Eigentümer verlieren den Überblick.
                </p>
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-text-2 mb-3">
                  Unser Ansatz
                </p>
                <p className="text-[0.92rem] leading-[1.8] text-text-2">
                  Laha Baudienstleistungen denkt über das reine Elektrogewerk hinaus.
                  Wir stimmen Abläufe ab, koordinieren bekannte Partnerbetriebe und halten
                  Sie während des Projekts nachvollziehbar auf dem Laufenden.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-subtle bg-[rgba(255,255,255,0.02)] p-6 md:p-7">
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.18em] text-text-2">
              Typischer Ablauf
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {PROCESS.map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-subtle bg-[rgba(0,0,0,0.12)] p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(201,170,114,0.35)] bg-[rgba(201,170,114,0.08)] text-[0.72rem] font-semibold text-gold">
                    {index + 1}
                  </span>
                  <span className="text-[0.88rem] leading-[1.7] text-text-2">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-6">
              <ButtonLink href="/anfrage">Projekt besprechen →</ButtonLink>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {BENEFITS.map(({ title, desc }, index) => (
            <div
              key={title}
              className="rounded-[22px] border border-subtle bg-[rgba(255,255,255,0.02)] px-5 py-5 transition-all duration-200 hover:border-strong hover:bg-[rgba(255,255,255,0.03)]"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  0{index + 1}
                </span>
                <div className="h-px flex-1 bg-[rgba(255,255,255,0.07)]" />
              </div>
              <h2 className="mb-2 text-[1rem] font-semibold tracking-[-0.02em] text-white">{title}</h2>
              <p className="text-[0.86rem] leading-[1.75] text-text-2">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
