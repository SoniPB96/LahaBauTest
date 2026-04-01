import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t mt-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-site mx-auto px-6 md:px-7 py-8 flex flex-col md:flex-row
                      items-start md:items-center justify-between gap-4">
        <p className="text-[0.75rem] text-text-4">
          © {new Date().getFullYear()} Laha Baudienstleistungen, Paderborn
        </p>
        <nav aria-label="Rechtliche Links" className="flex gap-5 flex-wrap">
          {[
            { href: '/impressum', label: 'Impressum' },
            { href: '/datenschutz', label: 'Datenschutz' },
            { href: '/anfrage', label: 'Kontakt' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[0.75rem] text-text-4 hover:text-text-2 transition-colors no-underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
