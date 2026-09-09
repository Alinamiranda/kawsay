'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '@/lib/data'
import { useLanguage } from '@/lib/i18n'
import { CategoryIcon } from '@/components/category-icon'

export function CategoryGrid() {
  const { tr } = useLanguage()

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/informacion?categoria=${cat.id}`}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="relative h-36 overflow-hidden">
            <img
              src={cat.image || '/placeholder.svg'}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-xl bg-card/95 text-primary shadow-sm">
              <CategoryIcon name={cat.icon} className="size-6" />
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading text-lg font-semibold leading-tight">
                {tr(cat.name)}
              </h3>
              <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tr(cat.description)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
