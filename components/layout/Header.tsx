'use client'

import { useState, useEffect, useCallback } from 'react'
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

  // Close drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close drawer on ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  return (
    <>
      <nav
        className="sticky top-0 z-50 h-[60px] flex items-center justify-between px-6 md:px-7
                   border-b border-subtle bg-nav backdrop-blur-xl"
        aria-label="Hauptnavigation"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Laha Baudienstleistungen – Startseite"
          className="flex items-baseline gap-2 no-underline hover:opacity-80 transition-opacity"
        >
          <span className="font-serif text-[1.15rem] text-text-1 tracking-tight">Laha</span>
          <span className="text-[0.6rem] text-text-4 tracking-[0.13em] uppercase font-normal hidden sm:inline">
            Baudienstleistungen
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              role="listitem"
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
            className={cn(
              'ml-2 px-4 py-[0.45rem] rounded text-[0.82rem] font-medium transition-opacity',
              'hover:opacity-85 active:scale-[0.97] no-underline',
              pathname === '/anfrage'
                ? 'bg-gold/80 text-[#1a1400]'
                : 'bg-gold text-[#1a1400]',
            )}
          >
            Anfrage stellen
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[4px] p-[6px] bg-transparent border-none
                     rounded cursor-pointer min-w-[44px] min-h-[44px] items-center justify-center"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(!open)}
        >
          <span
            className={cn(
              'block w-[19px] h-[1.5px] bg-text-2 rounded-full transition-transform duration-200',
              open && 'translate-y-[5.5px] rotate-45',
            )}
          />
          <span
            className={cn(
              'block w-[19px] h-[1.5px] bg-text-2 rounded-full transition-opacity duration-200',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'block w-[19px] h-[1.5px] bg-text-2 rounded-full transition-transform duration-200',
              open && '-translate-y-[5.5px] -rotate-45',
            )}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-drawer"
            role="dialog"
            aria-label="Navigation"
            className="md:hidden fixed top-[60px] left-0 right-0 z-50 flex flex-col
                       border-b border-subtle bg-drawer backdrop-blur-xl"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-6 py-4 text-[0.95rem] border-b border-subtle no-underline transition-colors',
                  'min-h-[44px] flex items-center',
                  pathname === href ? 'text-text-1' : 'text-text-2 hover:text-text-1',
                )}
              >
                {label}
              </Link>
            ))}
            <div className="px-6 pt-4 pb-5">
              <Link
                href="/anfrage"
                className="block w-full text-center bg-gold text-[#1a1400] py-3 rounded
                           text-[0.9rem] font-medium no-underline min-h-[44px] leading-[44px]
                           hover:opacity-85 transition-opacity"
              >
                Anfrage stellen
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
