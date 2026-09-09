'use client'

import Link from 'next/link'
import { Building2, Clock, FileText, ArrowRight } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { SectionHeading } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import { procedures } from '@/lib/data'

export default function TramitesPage() {
  const { t, tr } = useLanguage()

  return (
    <PageShell>
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow={t('nav.procedures')}
            title={t('section.procedures')}
            subtitle={t('section.proceduresSub')}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {procedures.map((proc) => (
            <div
              key={proc.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Badge variant="primary">{proc.steps.length} {tr({ es: 'pasos', qu: 'ñan' })}</Badge>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Building2 className="size-3.5" />
                  {proc.institution}
                </span>
              </div>
              <h3 className="mt-3 font-heading text-xl font-semibold">
                {tr(proc.title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tr(proc.summary)}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {tr(proc.estimatedTime)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="size-4" />
                  {proc.documents.length} {t('common.documents').toLowerCase()}
                </span>
              </div>

              <Button
                size="lg"
                className="mt-6 w-full"
                render={<Link href={`/tramites/${proc.id}`} />}
              >
                {t('common.startProcedure')}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
