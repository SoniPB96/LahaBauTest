import { cn } from '@/lib/utils'

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'sm'
}

export function SectionContainer({
  children,
  className,
  size = 'default',
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        'max-w-site mx-auto px-6 md:px-7',
        size === 'default' ? 'py-20 md:py-24' : 'py-14 md:py-16',
        className,
      )}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ eyebrow, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-10 md:mb-12', className)}>
      {eyebrow && (
        <p className="text-[0.68rem] tracking-[0.15em] uppercase text-gold font-normal mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-[clamp(1.65rem,2.8vw,2.5rem)] leading-[1.15] tracking-[-0.025em]
                     text-text-1 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-2 text-[0.92rem] leading-[1.75] max-w-md">{subtitle}</p>
      )}
    </div>
  )
}
