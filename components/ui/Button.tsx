import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: React.ReactNode
}

interface ButtonLinkProps {
  href: string
  variant?: Variant
  children: React.ReactNode
  className?: string
}

const base =
  'inline-flex items-center gap-2 px-6 py-[0.8rem] rounded text-[0.88rem] font-sans ' +
  'cursor-pointer transition-all duration-150 active:scale-[0.97] focus-visible:outline ' +
  'focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 ' +
  'no-underline border-none'

const variants: Record<Variant, string> = {
  primary: 'bg-gold text-[#1a1400] font-medium hover:opacity-85',
  ghost:
    'bg-transparent border text-text-2 font-normal hover:text-text-1 hover:border-strong ' +
    'border-muted',
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({ href, variant = 'primary', className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  )
}
