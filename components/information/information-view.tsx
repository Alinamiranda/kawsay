'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'
import { categories, infoItems } from '@/lib/data'
import { InfoCard } from '@/components/info-card'
import { SectionHeading } from '@/components/section-heading'
import { CategoryIcon } from '@/components/category-icon'
import { cn } from '@/lib/utils'
import type { CategoryId } from '@/types'

export function InformationView() {
  const params = useSearchParams()
  const { t, tr } = useLanguage()
  const [active, setActive] = useState<CategoryId | 'all'>('all')

  useEffect(() => {
    const cat = params.get('categoria') as CategoryId | null
    if (cat && categories.some((c) => c.id === cat)) setActive(cat)
  }, [params])

  const filtered = useMemo(
    () => (active === 'all' ? infoItems : infoItems.filter((i) => i.category === active)),
    [active],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading
        eyebrow={t('nav.info')}
        title={t('section.categories')}
        subtitle={t('section.categoriesSub')}
      />

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive('all')}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
            active === 'all'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-card text-muted-foreground hover:text-foreground',
          )}
        >
          {t('common.viewAll')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActive(cat.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              active === cat.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            <CategoryIcon name={cat.icon} className="size-4" />
            {tr(cat.name)}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <InfoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
