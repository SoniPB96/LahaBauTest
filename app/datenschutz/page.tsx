import type { Metadata } from 'next'
import { SectionContainer } from '@/components/ui/SectionContainer'

export const metadata: Metadata = {
  title: 'Datenschutz',
  robots: { index: false, follow: false },
}

export default function DatenschutzPage() {
  return (
    <SectionContainer>
      <h1 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] text-text-1 tracking-[-0.02em] mb-10">
        Datenschutzerklärung
      </h1>
      <div className="max-w-[640px] space-y-8 text-[0.88rem] text-text-2 leading-[1.8]">
        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            1. Verantwortlicher
          </h2>
          <p>
            Verantwortlicher im Sinne der DSGVO ist:
            <br />
            Laha Baudienstleistungen, Musterstraße 1, 33100 Paderborn {/* TODO */}
            <br />
            E-Mail: info@laha-bau.de
          </p>
        </section>

        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            2. Erhebung und Verarbeitung personenbezogener Daten
          </h2>
          <p>
            Beim Absenden des Anfrageformulars werden folgende Daten erhoben: Name, E-Mail-Adresse,
            Telefonnummer (freiwillig), Ort, Projektart und Beschreibung sowie optional hochgeladene
            Dateien. Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
          </p>
        </section>

        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            3. Rechtsgrundlage
          </h2>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Erfüllung eines
            Vertrags bzw. vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an der Beantwortung von Anfragen).
          </p>
        </section>

        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            4. Speicherdauer
          </h2>
          <p>
            Ihre Daten werden nur so lange gespeichert, wie es für die Bearbeitung Ihrer Anfrage
            erforderlich ist, oder bis Sie der Speicherung widersprechen.
          </p>
        </section>

        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            5. Ihre Rechte
          </h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung sowie das Recht auf Datenübertragbarkeit. Wenden Sie sich hierzu an
            info@laha-bau.de.
          </p>
        </section>

        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            6. Hosting
          </h2>
          <p>
            Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104,
            USA gehostet. Es gilt die Datenschutzerklärung von Vercel:{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:opacity-80 transition-opacity"
            >
              vercel.com/legal/privacy-policy
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            7. Google Fonts
          </h2>
          <p>
            Diese Website lädt Schriftarten von Google Fonts. Dabei werden die IP-Adresse des
            Nutzers und weitere technische Daten an Google übermittelt. Weitere Informationen:{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:opacity-80 transition-opacity"
            >
              policies.google.com/privacy
            </a>
          </p>
        </section>

        <p className="text-[0.75rem] text-text-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          Diese Datenschutzerklärung ist ein strukturierter Entwurf. Vor dem Launch bitte durch einen
          auf DSGVO spezialisierten Anwalt prüfen und vervollständigen lassen.
        </p>
      </div>
    </SectionContainer>
  )
}
