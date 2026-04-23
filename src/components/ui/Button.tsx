import type { ButtonHTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-zinc-50 text-zinc-950 hover:bg-zinc-200 active:bg-zinc-300 focus-visible:ring-zinc-200/60',
  secondary:
    'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 active:bg-zinc-700 focus-visible:ring-zinc-500/40 border border-zinc-800',
  danger:
    'bg-red-500/10 text-red-200 hover:bg-red-500/15 active:bg-red-500/20 border border-red-500/20 focus-visible:ring-red-400/30',
  ghost:
    'bg-transparent text-zinc-200 hover:bg-white/5 active:bg-white/10 border border-transparent focus-visible:ring-zinc-500/40',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-3.5 text-sm',
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium outline-none transition',
        'focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}

