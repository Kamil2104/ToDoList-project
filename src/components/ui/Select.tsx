import type { SelectHTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

export default function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950/30 px-3 text-sm text-zinc-100',
        'outline-none transition focus:border-zinc-700 focus:ring-2 focus:ring-zinc-500/30',
        className,
      )}
      {...props}
    />
  )
}

