import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 – Seite nicht gefunden',
}

export default function NotFound() {
  return (
    <div className="max-w-site mx-auto px-6 md:px-7 py-32 text-center">
      <p className="text-[0.68rem] tracking-[0.15em] uppercase text-gold font-normal mb-4">
        404
      </p>
      <h1 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-text-1 tracking-[-0.02em] mb-4">
        Seite nicht gefunden.
      </h1>
      <p className="text-text-2 text-[0.92rem] leading-[1.75] max-w-sm mx-auto mb-8">
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-gold text-[#1a1400] px-6 py-3 rounded
                   text-[0.88rem] font-medium no-underline hover:opacity-85 transition-opacity"
      >
        ← Zurück zur Startseite
      </Link>
    </div>
  )
}
