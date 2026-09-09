'use client'

import { Languages } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Language } from '@/types'

const options: { value: Language; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'qu', label: 'Runa Simi' },
]

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-border bg-background p-1',
        className,
      )}
    >
      <Languages className="ml-1.5 size-4 text-muted-foreground" aria-hidden="true" />
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLanguage(opt.value)}
          aria-pressed={language === opt.value}
          className={cn(
            'rounded-full px-3 py-1 text-sm font-medium transition-colors',
            language === opt.value
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
