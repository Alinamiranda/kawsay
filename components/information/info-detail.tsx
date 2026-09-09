'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  FileText,
  ListChecks,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { useAuth } from '@/services/auth-context'
import { getInfoItem, getCategory, procedures } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CategoryIcon } from '@/components/category-icon'

export function InfoDetail({ id }: { id: string }) {
  const { t, tr } = useLanguage()
  const { savedItems, toggleSaved } = useAuth()
  const item = getInfoItem(id)

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="font-heading text-xl font-semibold">{t('common.empty')}</p>
        <p className="mt-2 text-muted-foreground">{t('common.emptyHint')}</p>
        <Button className="mt-6" render={<Link href="/informacion" />}>
          {t('common.back')}
        </Button>
      </div>
    )
  }

  const category = getCategory(item.category)
  const saved = savedItems.includes(item.id)
  const relatedProcedure = procedures.find((p) =>
    p.institution === item.institution,
  )

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/informacion"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t('common.back')}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {category && (
          <Badge variant="info" className="gap-1.5">
            <CategoryIcon name={category.icon} className="size-3.5" />
            {tr(category.name)}
          </Badge>
        )}
        {item.languages.map((lang) => (
          <Badge key={lang} variant="highlight" className="uppercase">
            {lang}
          </Badge>
        ))}
      </div>

      <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-balance">
        {tr(item.title)}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">
        {tr(item.summary)}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="size-4" />
          {item.institution}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-4" />
          {t('common.updated')} {item.updatedAt}
        </span>
        <Button
          variant={saved ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => toggleSaved(item.id)}
        >
          {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
          {saved ? tr({ es: 'Guardado', qu: 'Waqaychasqa' }) : tr({ es: 'Guardar', qu: 'Waqaychay' })}
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <img
          src={item.image || '/placeholder.svg'}
          alt={tr(item.title)}
          className="h-64 w-full object-cover"
        />
      </div>

      <div className="mt-8 flex flex-col gap-5">
        {item.body.map((para, i) => (
          <p key={i} className="text-base leading-relaxed text-foreground">
            {tr(para)}
          </p>
        ))}
      </div>

      {item.documents && item.documents.length > 0 && (
        <section className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
            <FileText className="size-5 text-primary" />
            {t('common.documents')}
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {item.documents.map((doc, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                {tr(doc)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {item.steps && item.steps.length > 0 && (
        <section className="mt-6 rounded-2xl border border-border p-6">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
            <ListChecks className="size-5 text-primary" />
            {t('common.steps')}
          </h2>
          <ol className="mt-4 flex flex-col gap-3">
            {item.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5">{tr(step)}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {relatedProcedure && (
        <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl bg-primary p-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold">
              {tr(relatedProcedure.title)}
            </p>
            <p className="text-sm text-primary-foreground/80">
              {tr(relatedProcedure.summary)}
            </p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="shrink-0"
            render={<Link href={`/tramites/${relatedProcedure.id}`} />}
          >
            {t('common.startProcedure')}
          </Button>
        </div>
      )}
    </article>
  )
}
