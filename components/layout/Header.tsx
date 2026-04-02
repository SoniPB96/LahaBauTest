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
        className="sticky top-0 z-50 border-b border-subtle bg-nav/95 backdrop-blur-xl"
        aria-label="Hauptnavigation"
      >
        <div className="max-w-site mx-auto h-[78px] px-6 md:px-7 flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Laha Baudienstleistungen – Startseite"
            className="group flex items-center gap-3 rounded-xl border border-strong bg-[rgba(255,255,255,0.02)] px-3 py-2 no-underline transition-all duration-200 hover:border-[rgba(201,170,114,0.45)] hover:bg-[rgba(255,255,255,0.03)]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-strong bg-[rgba(255,255,255,0.03)] text-[0.9rem] font-medium text-text-1">
              L
            </div>
            <div className="leading-none">
              <div className="text-[0.96rem] font-semibold tracking-[0.14em] uppercase text-white">
                Laha
              </div>
              <div className="mt-1 text-[0.56rem] font-medium tracking-[0.24em] uppercase text-text-2">
                Baudienstleistungen
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  role="listitem"
                  className={cn(
                    'rounded-full px-4 py-2.5 text-[0.82rem] font-medium tracking-[0.01em] no-underline transition-all duration-200',
                    active
                      ? 'text-white border border-[rgba(201,170,114,0.55)] bg-[rgba(201,170,114,0.10)] shadow-[0_0_0_1px_rgba(201,170,114,0.16)]'
                      : 'text-text-2 border border-transparent hover:text-white hover:border-subtle hover:bg-[rgba(255,255,255,0.025)]',
                  )}
                >
                  {label}
                </Link>
              )
            })}
            <Link
              href="/anfrage"
              className="ml-2 inline-flex min-h-[46px] items-center rounded-full bg-gold px-5 py-2.5 text-[0.84rem] font-semibold text-[#17120a] no-underline transition-all duration-200 hover:translate-y-[-1px] hover:opacity-90"
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
                'block w-[19px] h-[1.5px] bg-text-1 rounded-full transition-transform duration-200',
                open && 'translate-y-[5.5px] rotate-45',
              )}
            />
            <span
              className={cn(
                'block w-[19px] h-[1.5px] bg-text-1 rounded-full transition-opacity duration-200',
                open && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'block w-[19px] h-[1.5px] bg-text-1 rounded-full transition-transform duration-200',
                open && '-translate-y-[5.5px] -rotate-45',
              )}
            />
          </button>
        </div>
      </nav>

      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-drawer"
            role="dialog"
            aria-label="Navigation"
            className="md:hidden fixed top-[78px] left-0 right-0 z-50 flex flex-col border-b border-subtle bg-drawer backdrop-blur-xl"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-6 py-4 text-[0.95rem] border-b border-subtle no-underline transition-colors min-h-[44px] flex items-center',
                  pathname === href ? 'text-white' : 'text-text-2 hover:text-white',
                )}
              >
                {label}
              </Link>
            ))}
            <div className="px-6 pt-4 pb-5">
              <Link
                href="/anfrage"
                className="block w-full text-center bg-gold text-[#1a1400] py-3 rounded-full text-[0.9rem] font-semibold no-underline min-h-[44px] leading-[24px] hover:opacity-90 transition-opacity"
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
