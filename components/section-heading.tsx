import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-2xl font-bold tracking-tight text-balance md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty',
            align === 'center' && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
