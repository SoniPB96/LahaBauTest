import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ui/Button'
import { SectionContainer, SectionHeader } from '@/components/ui/SectionContainer'

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

export default function BaubegleitungPage() {
  return (
    <SectionContainer>
      <SectionHeader
        eyebrow="Baubegleitung"
        title="Ihr Projekt. Sauber koordiniert."
        subtitle="Wir übernehmen nicht nur die Elektroarbeiten – wir begleiten Ihr Bauvorhaben strukturiert von Anfang bis Ende."
      />

      <div className="grid md:grid-cols-2 gap-14 md:gap-16 items-start">
        {/* Left – body text */}
        <div className="text-[0.9rem] text-text-2 leading-[1.85] space-y-5">
          <p>
            Viele Renovierungs- und Bauprojekte scheitern nicht am fehlenden Handwerk, sondern
            an fehlender Koordination. Termine werden nicht abgestimmt, Gewerke blockieren sich
            gegenseitig, und Hauseigentümer verlieren den Überblick.
          </p>
          <p>
            Bei Laha Baudienstleistungen denken wir über das reine Elektrohandwerk hinaus. Wir
            koordinieren zuverlässige Partnerbetriebe, stimmen Termine aufeinander ab und halten
            Sie als Auftraggeber jederzeit auf dem Laufenden.
          </p>
          <p>
            Das Ergebnis: Ihr Projekt läuft strukturiert ab – ohne dass Sie jeden einzelnen
            Schritt selbst organisieren müssen.
          </p>
          <div className="pt-2">
            <ButtonLink href="/anfrage">Projekt besprechen →</ButtonLink>
          </div>
        </div>

        {/* Right – benefits */}
        <div className="flex flex-col gap-3">
          {BENEFITS.map(({ title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 px-5 py-4 border rounded-lg bg-bg-2
                         transition-colors hover:border-muted"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <span className="text-gold mt-0.5 shrink-0 text-[0.85rem] leading-none">→</span>
              <div>
                <p className="text-[0.85rem] text-text-1 font-normal mb-1">{title}</p>
                <p className="text-[0.78rem] text-text-2 leading-[1.65]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
