import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Laha Baudienstleistungen – Elektroinstallation Paderborn',
    template: '%s | Laha Baudienstleistungen',
  },
  description:
    'Professionelle Elektroinstallation in Paderborn. Sanierung, Modernisierung und Baubegleitung für private Hauseigentümer – sauber ausgeführt, klar kommuniziert.',
  keywords: ['Elektriker Paderborn', 'Elektroinstallation', 'Sanierung', 'Modernisierung', 'Baubegleitung OWL'],
  openGraph: {
    title: 'Laha Baudienstleistungen – Elektroinstallation Paderborn',
    description: 'Saubere Elektroarbeiten mit klarer Kommunikation und verlässlicher Ausführung.',
    type: 'website',
    locale: 'de_DE',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Laha Baudienstleistungen',
  description: 'Elektroinstallation für private Hauseigentümer in Paderborn',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Paderborn',
    postalCode: '33100',
    addressCountry: 'DE',
  },
  areaServed: ['Paderborn', 'OWL'],
  telephone: '+49-5251-000000',
  email: 'info@laha-bau.de',
  openingHours: 'Mo-Fr 08:00-17:00',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50
                     focus:px-4 focus:py-2 focus:bg-gold focus:text-[#1a1400] focus:rounded
                     focus:text-sm focus:font-medium"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
