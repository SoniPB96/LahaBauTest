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
  const isHome = pathname === '/'

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
        className={cn(
          'sticky top-0 z-50 flex items-center justify-between px-6 md:px-8',
          'border-b border-white/10 backdrop-blur-xl',
          isHome ? 'h-[74px] bg-[#0b0d12]/96 shadow-[0_18px_40px_rgba(0,0,0,0.35)]' : 'h-[64px] bg-nav',
        )}
        aria-label="Hauptnavigation"
      >
        <Link
          href="/"
          aria-label="Laha Baudienstleistungen – Startseite"
          className="flex items-center gap-3 no-underline transition-opacity hover:opacity-90"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[0.92rem] font-semibold uppercase tracking-[0.08em] text-white">
            L
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.96rem] font-semibold uppercase tracking-[0.12em] text-white sm:text-[1rem]">
              Laha
            </span>
            <span className="hidden text-[0.62rem] uppercase tracking-[0.22em] text-white/55 sm:block">
              Baudienstleistungen
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'rounded-full px-4 py-2 text-[0.82rem] no-underline transition-all duration-150',
                  'border border-transparent',
                  active
                    ? 'border-white/12 bg-white/[0.06] text-white'
                    : 'text-white/68 hover:border-white/10 hover:bg-white/[0.04] hover:text-white',
                )}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/anfrage"
            className="ml-3 inline-flex items-center rounded-full bg-gold px-5 py-2.5 text-[0.82rem] font-semibold text-[#141007] no-underline transition-all duration-150 hover:-translate-y-px hover:opacity-95 active:translate-y-0"
          >
            Anfrage stellen
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col gap-[4px] p-[6px] bg-transparent border-none rounded cursor-pointer min-w-[44px] min-h-[44px] items-center justify-center"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(!open)}
        >
          <span
            className={cn(
              'block w-[20px] h-[1.5px] bg-white rounded-full transition-transform duration-200',
              open && 'translate-y-[5.5px] rotate-45',
            )}
          />
          <span
            className={cn(
              'block w-[20px] h-[1.5px] bg-white rounded-full transition-opacity duration-200',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'block w-[20px] h-[1.5px] bg-white rounded-full transition-transform duration-200',
              open && '-translate-y-[5.5px] -rotate-45',
            )}
          />
        </button>
      </nav>

      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/50"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-drawer"
            role="dialog"
            aria-label="Navigation"
            className="md:hidden fixed top-[64px] left-0 right-0 z-50 flex flex-col border-b border-white/10 bg-[#0b0d12]/98 backdrop-blur-xl"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-6 py-4 text-[0.95rem] border-b border-white/8 no-underline transition-colors min-h-[44px] flex items-center',
                  pathname === href ? 'text-white' : 'text-white/72 hover:text-white',
                )}
              >
                {label}
              </Link>
            ))}
            <div className="px-6 pt-4 pb-5">
              <Link
                href="/anfrage"
                className="block w-full text-center rounded-xl bg-gold py-3 text-[0.9rem] font-semibold text-[#141007] no-underline transition-opacity hover:opacity-90"
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
