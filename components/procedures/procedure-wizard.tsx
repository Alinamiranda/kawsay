'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock,
  FileText,
  Lightbulb,
  Check,
  PartyPopper,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { getProcedure } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export function ProcedureWizard({ id }: { id: string }) {
  const { t, tr } = useLanguage()
  const proc = getProcedure(id)
  const [current, setCurrent] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!proc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="font-heading text-xl font-semibold">{t('common.empty')}</p>
        <Button className="mt-6" render={<Link href="/tramites" />}>
          {t('common.back')}
        </Button>
      </div>
    )
  }

  const total = proc.steps.length
  const step = proc.steps[current]
  const progress = finished ? 100 : Math.round((current / total) * 100)

  const goNext = () => {
    if (current < total - 1) setCurrent((c) => c + 1)
    else setFinished(true)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/tramites"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t('common.back')}
      </Link>

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="info" className="gap-1.5">
            <Building2 className="size-3.5" />
            {proc.institution}
          </Badge>
          <Badge variant="highlight" className="gap-1.5">
            <Clock className="size-3.5" />
            {tr(proc.estimatedTime)}
          </Badge>
        </div>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance">
          {tr(proc.title)}
        </h1>
        <p className="mt-2 text-lg leading-relaxed text-muted-foreground text-pretty">
          {tr(proc.summary)}
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5">
        <h2 className="flex items-center gap-2 font-heading text-base font-semibold">
          <FileText className="size-5 text-primary" />
          {t('common.documents')}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {proc.documents.map((doc, i) => (
            <Badge key={i} variant="outline" className="bg-card">
              {tr(doc)}
            </Badge>
          ))}
        </div>
      </section>

      {!finished ? (
        <section className="mt-8">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">
              {t('procedure.progress')}
            </span>
            <span className="font-semibold text-primary">
              {current + 1} / {total}
            </span>
          </div>
          <Progress value={progress} className="mt-2" />

          <ol className="mt-6 flex items-center gap-2">
            {proc.steps.map((_, i) => (
              <li key={i} className="flex-1">
                <span
                  className={cn(
                    'flex h-1.5 rounded-full transition-colors',
                    i <= current ? 'bg-primary' : 'bg-muted',
                  )}
                />
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
              {current + 1}
            </span>
            <h3 className="mt-4 font-heading text-xl font-semibold">
              {tr(step.title)}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-foreground">
              {tr(step.description)}
            </p>

            {step.tip && (
              <div className="mt-4 flex gap-3 rounded-xl bg-accent p-4 text-accent-foreground">
                <Lightbulb className="size-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{t('procedure.recommendation')}</p>
                  <p className="mt-0.5 text-sm leading-relaxed">{tr(step.tip)}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
            >
              <ArrowLeft className="size-4" />
              {t('procedure.prev')}
            </Button>
            <Button size="lg" onClick={goNext}>
              {current === total - 1 ? t('procedure.finish') : t('procedure.next')}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>
      ) : (
        <section className="mt-8 flex flex-col items-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <PartyPopper className="size-8" />
          </span>
          <h3 className="mt-4 font-heading text-2xl font-bold">
            {t('procedure.finish')}
          </h3>
          <p className="mt-2 max-w-md text-muted-foreground">
            {tr({
              es: 'Has revisado todos los pasos de este trámite. ¡Ya sabes qué hacer!',
              qu: "Kay ruwaypa llapan ñan'kunata qawarqanki. Imatam ruwanaykita yachankiña!",
            })}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" size="lg" onClick={() => { setCurrent(0); setFinished(false) }}>
              {tr({ es: 'Revisar de nuevo', qu: 'Yapamanta qaway' })}
            </Button>
            <Button size="lg" render={<Link href="/tramites" />}>
              {tr({ es: 'Ver otros trámites', qu: 'Huk ruwaykunata qaway' })}
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <ul className="mt-8 w-full space-y-2 border-t border-border pt-6 text-left">
            {proc.steps.map((s, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" />
                </span>
                {tr(s.title)}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
