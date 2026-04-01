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
  'cursor-pointer transition-all duration-150 active:scale-[0.97] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 no-underline border-none'

// Ghost variant uses inline style for border to avoid Tailwind JIT purge issues
// with dynamically constructed class strings in non-template-literal positions
const primaryCls = 'bg-gold text-[#1a1400] font-medium hover:opacity-85'
const ghostCls   = 'bg-transparent text-text-2 font-normal hover:text-text-1'

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const variantCls = variant === 'primary' ? primaryCls : ghostCls
  return (
    <button
      className={cn(base, variantCls, className)}
      style={variant === 'ghost' ? { border: '1px solid rgba(255,255,255,0.11)' } : undefined}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonLink({ href, variant = 'primary', className, children }: ButtonLinkProps) {
  const variantCls = variant === 'primary' ? primaryCls : ghostCls
  return (
    <Link
      href={href}
      className={cn(base, variantCls, className)}
      style={variant === 'ghost' ? { border: '1px solid rgba(255,255,255,0.11)' } : undefined}
    >
      {children}
    </Link>
  )
}
