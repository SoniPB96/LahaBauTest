'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Start' },
  { href: '/kosteneinschaetzung', label: 'Kosteneinschätzung' },
  { href: '/baubegleitung', label: 'Baubegleitung' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav
        className="sticky top-0 z-50 h-[60px] flex items-center justify-between px-6 md:px-7
                   border-b border-subtle bg-bg/90 backdrop-blur-xl"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        aria-label="Hauptnavigation"
      >
        {/* Logo */}
        <Link href="/" aria-label="Laha Baudienstleistungen – Startseite"
          className="flex items-baseline gap-2 no-underline hover:opacity-80 transition-opacity">
          <span className="font-serif text-[1.15rem] text-text-1 tracking-tight">Laha</span>
          <span className="text-[0.6rem] text-text-4 tracking-[0.13em] uppercase font-normal hidden sm:inline">
            Baudienstleistungen
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-[0.82rem] font-normal tracking-[0.01em] transition-colors duration-150 no-underline',
                pathname === href ? 'text-text-1' : 'text-text-3 hover:text-text-1',
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/anfrage"
            className="ml-2 bg-gold text-[#1a1400] px-4 py-[0.45rem] rounded text-[0.82rem]
                       font-medium transition-opacity hover:opacity-85 active:scale-[0.97]"
          >
            Anfrage stellen
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[4px] p-[6px] bg-transparent border-none
                     rounded cursor-pointer"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(!open)}
        >
          <span className={cn('block w-[19px] h-[1.5px] bg-text-2 rounded-full transition-transform duration-200',
            open && 'translate-y-[5.5px] rotate-45')} />
          <span className={cn('block w-[19px] h-[1.5px] bg-text-2 rounded-full transition-opacity duration-200',
            open && 'opacity-0')} />
          <span className={cn('block w-[19px] h-[1.5px] bg-text-2 rounded-full transition-transform duration-200',
            open && '-translate-y-[5.5px] -rotate-45')} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-drawer"
          className="md:hidden flex flex-col border-b border-subtle bg-bg/97 backdrop-blur-xl"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-6 py-4 text-[0.95rem] text-text-2 border-b border-subtle
                         hover:text-text-1 transition-colors no-underline"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              {label}
            </Link>
          ))}
          <div className="px-6 pt-4 pb-5">
            <Link
              href="/anfrage"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-gold text-[#1a1400] py-3 rounded
                         text-[0.9rem] font-medium no-underline"
            >
              Anfrage stellen
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
