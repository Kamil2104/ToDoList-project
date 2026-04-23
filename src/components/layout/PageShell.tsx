import type { PropsWithChildren } from 'react'

export default function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_42%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.05),transparent_44%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.85))]" />
      </div>
      {children}
    </div>
  )
}

