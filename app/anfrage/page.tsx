import type { Metadata } from 'next'
import { SectionContainer, SectionHeader } from '@/components/ui/SectionContainer'
import { AnfrageForm } from './AnfrageForm'

export const metadata: Metadata = {
  title: 'Anfrage stellen',
  description:
    'Schildern Sie Ihr Elektroprojekt – wir melden uns innerhalb eines Werktags mit einem konkreten Festpreisangebot.',
}

const CONTACT_METHODS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9c0 1.34.35 2.6.96 3.7L1.5 16.5l3.93-1.02A7.47 7.47 0 0 0 9 16.5c4.14 0 7.5-3.36 7.5-7.5S13.14 1.5 9 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M6.75 6.75s.375 0 .563.563c.187.562.562 1.687.562 1.687s.188.375-.375.938l-.187.187s.562 1.125 1.5 1.875l.187-.188c.563-.562.938-.375.938-.375s1.125.375 1.688.563c.562.187.562.562.562.562v1.688s0 .562-.75.562c-3.375 0-6-2.625-6-6 0-.75.563-.75.563-.75h1.687z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
    iconBg: 'rgba(37,211,102,0.10)',
    iconColor: '#25d366',
    label: 'WhatsApp',
    sub: 'Schnell & unkompliziert',
    href: 'https://wa.me/4915200000000',
    external: true,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 3h3l1.5 3.75-1.5 1.5a9 9 0 0 0 3.75 3.75l1.5-1.5L15 12v3a1.5 1.5 0 0 1-1.5 1.5A13.5 13.5 0 0 1 1.5 4.5 1.5 1.5 0 0 1 3 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
    iconBg: 'rgba(201,170,114,0.10)',
    iconColor: '#c9aa72',
    label: 'Anruf',
    sub: 'Mo–Fr, 8–17 Uhr',
    href: 'tel:+495251000000',
    external: false,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M1.5 5.5l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
    iconBg: 'rgba(99,149,255,0.10)',
    iconColor: '#6395ff',
    label: 'E-Mail',
    sub: 'info@laha-bau.de',
    href: 'mailto:info@laha-bau.de',
    external: false,
  },
]

const PROCESS_STEPS = [
  'Anfrage absenden – kurz beschreiben, was geplant ist.',
  'Wir melden uns innerhalb eines Werktags für ein erstes Gespräch.',
  'Gemeinsam klären wir Details und erstellen ein konkretes Festpreisangebot.',
]

export default function AnfragePage() {
  return (
    <SectionContainer>
      <SectionHeader
        eyebrow="Anfrage stellen"
        title="Ihr Projekt beginnt hier."
        subtitle="Schildern Sie Ihr Vorhaben kurz – wir melden uns innerhalb eines Werktags."
      />

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16">
        {/* Left column */}
        <div>
          <p className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-4 font-normal">
            Direktkontakt
          </p>
          <div className="flex flex-col gap-3 mb-10">
            {CONTACT_METHODS.map(({ icon, iconBg, iconColor, label, sub, href, external }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 px-4 py-4 rounded-lg bg-bg-2
                           transition-colors hover:bg-bg-3 no-underline min-h-[64px]"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span
                  className="w-[38px] h-[38px] rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: iconBg, color: iconColor }}
                >
                  {icon}
                </span>
                <div>
                  <p className="text-[0.88rem] text-text-1 font-normal leading-tight">{label}</p>
                  <p className="text-[0.72rem] text-text-3 mt-0.5">{sub}</p>
                </div>
              </a>
            ))}
          </div>

          <p className="text-[0.68rem] tracking-[0.12em] uppercase text-text-4 mb-3 font-normal">
            Wie es weitergeht
          </p>
          <div className="flex flex-col">
            {PROCESS_STEPS.map((text, i) => (
              <div
                key={i}
                className="flex gap-3 py-3"
                style={i < PROCESS_STEPS.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.06)' } : undefined}
              >
                <span className="text-[0.68rem] text-gold font-medium min-w-[18px] pt-0.5 shrink-0">
                  0{i + 1}
                </span>
                <p className="text-[0.82rem] text-text-2 leading-[1.65]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column – form */}
        <AnfrageForm />
      </div>
    </SectionContainer>
  )
}
