'use client'

import Link from 'next/link'
import { ArrowRight, Building2, Languages } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { Badge } from '@/components/ui/badge'
import type { InfoItem } from '@/types'

export function InfoCard({ item }: { item: InfoItem }) {
  const { tr, t } = useLanguage()

  return (
    <Link
      href={`/informacion/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image || '/placeholder.svg'}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex gap-1.5">
          {item.languages.map((lang) => (
            <Badge key={lang} variant="primary" className="uppercase">
              {lang}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-lg font-semibold leading-tight">
          {tr(item.title)}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {tr(item.summary)}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
          <Building2 className="size-3.5" />
          <span className="truncate">{item.institution}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Languages className="size-3.5" />
            {t('common.available')} {item.languages.length}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            {t('common.readMore')}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
