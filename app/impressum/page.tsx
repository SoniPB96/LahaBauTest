import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false, follow: false },
}

export default function ImpressumPage() {
  return (
    <SectionContainer>
      <h1 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] text-text-1 tracking-[-0.02em] mb-10">
        Impressum
      </h1>
      <div className="max-w-[640px] space-y-8 text-[0.88rem] text-text-2 leading-[1.8]">
        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            Angaben gemäß § 5 TMG
          </h2>
          <address className="not-italic space-y-0.5">
            <p className="text-text-1 font-normal">Laha Baudienstleistungen</p>
            <p>Musterstraße 1 {/* TODO: Echte Adresse eintragen */}</p>
            <p>33100 Paderborn</p>
          </address>
        </section>

        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            Kontakt
          </h2>
          <p>
            Telefon:{' '}
            <a href="tel:+495251000000" className="text-gold hover:opacity-80 transition-opacity">
              +49 5251 000000 {/* TODO */}
            </a>
          </p>
          <p>
            E-Mail:{' '}
            <a href="mailto:info@laha-bau.de" className="text-gold hover:opacity-80 transition-opacity">
              info@laha-bau.de {/* TODO */}
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)
          </h2>
          <p>
            [Name des Verantwortlichen] {/* TODO */}
            <br />
            Musterstraße 1, 33100 Paderborn
          </p>
        </section>

        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            Haftungsausschluss
          </h2>
          <p>
            Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Als
            Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich.
          </p>
        </section>

        <p className="text-[0.75rem] text-text-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          Bitte ersetzen Sie alle markierten Platzhalter vor dem Launch. Dieses Impressum ersetzt
          keine Rechtsberatung.
        </p>
      </div>
    </SectionContainer>
  )
}
