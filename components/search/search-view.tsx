'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import {
  Search,
  Building2,
  ListChecks,
  FileText,
  ArrowRight,
  SearchX,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { useAuth } from '@/services/auth-context'
import { searchWithDelay, searchSuggestions } from '@/lib/search'
import { SectionHeading } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { SearchResult } from '@/types'

type Status = 'idle' | 'loading' | 'done'

export function SearchView() {
  const params = useSearchParams()
  const { t, tr } = useLanguage()
  const { user, addHistory } = useAuth()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [results, setResults] = useState<SearchResult[]>([])

  const runSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) return
      setStatus('loading')
      const found = await searchWithDelay(q)
      setResults(found)
      setStatus('done')
      if (user && found.length > 0) {
        addHistory(q, tr(found[0].summary))
      }
    },
    [user, addHistory, tr],
  )

  useEffect(() => {
    const initial = params.get('q')
    if (initial) {
      setQuery(initial)
      runSearch(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    runSearch(query)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <SectionHeading
        eyebrow={
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-4" />
            {t('section.search')}
          </span>
        }
        title={t('section.search')}
        subtitle={t('section.searchSub')}
        align="center"
      />

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-2xl">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/20">
          <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            aria-label={t('search.button')}
            className="h-11 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-5 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            disabled={!query.trim()}
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">{t('search.button')}</span>
          </button>
        </div>
      </form>

      {status === 'idle' && (
        <div className="mx-auto mt-8 max-w-2xl">
          <p className="text-center text-sm font-medium text-muted-foreground">
            {t('search.suggestions')}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {searchSuggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuery(s)
                  runSearch(s)
                }}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="mt-10">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="size-2 animate-ping rounded-full bg-primary" />
            {t('common.loading')}
          </p>
          <div className="flex flex-col gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-border p-5">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {status === 'done' && results.length === 0 && (
        <div className="mt-12 flex flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <SearchX className="size-8" />
          </span>
          <p className="mt-4 font-heading text-lg font-semibold">
            {t('common.empty')}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('common.emptyHint')}
          </p>
        </div>
      )}

      {status === 'done' && results.length > 0 && (
        <div className="mt-10">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            {results.length} {t('search.results').toLowerCase()}
          </p>
          <div className="flex flex-col gap-4">
            {results.map((r) => (
              <div
                key={`${r.type}-${r.id}`}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Badge variant={r.type === 'procedure' ? 'primary' : 'info'}>
                    {r.type === 'procedure'
                      ? tr({ es: 'Trámite', qu: 'Ruway' })
                      : tr({ es: 'Información', qu: 'Willakuy' })}
                  </Badge>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Building2 className="size-3.5" />
                    {r.institution}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold">
                  {tr(r.title)}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {tr(r.summary)}
                </p>

                {r.documents && r.documents.length > 0 && (
                  <div className="mt-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <FileText className="size-3.5 text-primary" />
                      {t('common.documents')}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {r.documents.map((d, i) => (
                        <Badge key={i} variant="outline">
                          {tr(d)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {r.steps && r.steps.length > 0 && (
                  <div className="mt-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <ListChecks className="size-3.5 text-primary" />
                      {t('common.steps')}
                    </p>
                    <ol className="mt-2 flex flex-col gap-1.5">
                      {r.steps.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="font-semibold text-primary">{i + 1}.</span>
                          {tr(s)}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <Link
                  href={
                    r.type === 'procedure'
                      ? `/tramites/${r.id}`
                      : `/informacion/${r.id}`
                  }
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  {r.type === 'procedure'
                    ? t('common.startProcedure')
                    : t('common.readMore')}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
