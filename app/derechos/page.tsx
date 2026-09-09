'use client'

import { Scale, ShieldCheck, Landmark, Users } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { SectionHeading } from '@/components/section-heading'
import { InfoCard } from '@/components/info-card'
import { useLanguage } from '@/lib/i18n'
import { infoItems } from '@/lib/data'
import type { Bilingual } from '@/types'

const fundamentals: { icon: typeof Scale; title: Bilingual; text: Bilingual }[] = [
  {
    icon: ShieldCheck,
    title: { es: 'Derecho a la identidad', qu: 'Identidad derecho' },
    text: {
      es: 'Todos tenemos derecho a un nombre, un documento y una nacionalidad.',
      qu: 'Llapanchik sutiman, documentoman, nacionalidadmanpas derechoyuq kanchik.',
    },
  },
  {
    icon: Landmark,
    title: { es: 'Derecho a usar tu idioma', qu: 'Simiykita rimay derecho' },
    text: {
      es: 'Puedes ser atendido en quechua en las instituciones del Estado.',
      qu: 'Estado wasikunapi runa simipi atendisqa kanki.',
    },
  },
  {
    icon: Users,
    title: { es: 'Derecho a la no discriminación', qu: 'Mana discriminación derecho' },
    text: {
      es: 'Nadie puede ser tratado de forma injusta por su origen o idioma.',
      qu: 'Mana pipas maymanta kasqanrayku, siminrayku mana allinta tratasqa kanmanchu.',
    },
  },
]

export default function DerechosPage() {
  const { t, tr } = useLanguage()
  const derechosItems = infoItems.filter((i) => i.category === 'derechos')

  return (
    <PageShell>
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow={
              <span className="inline-flex items-center gap-1.5">
                <Scale className="size-4" />
                {t('nav.rights')}
              </span>
            }
            title={tr({ es: 'Conoce y defiende tus derechos', qu: 'Derechoykikunata riqsiy, amachaykupas' })}
            subtitle={tr({
              es: 'Información clara sobre los derechos que te protegen como ciudadano y como hablante de quechua.',
              qu: "Runa simi rimaqta, llaqta runata amachaq derechokunamanta sut'i willakuy.",
            })}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {fundamentals.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{tr(f.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tr(f.text)}
                </p>
              </div>
            )
          })}
        </div>

        {derechosItems.length > 0 && (
          <div className="mt-14">
            <SectionHeading
              title={tr({ es: 'Guías de derechos', qu: 'Derechokunapaq yachachiy' })}
              subtitle={tr({
                es: 'Explora en detalle cada derecho y cómo hacerlo valer.',
                qu: 'Sapa derechota, imaynatam amachana, allinta qaway.',
              })}
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {derechosItems.map((item) => (
                <InfoCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </section>
    </PageShell>
  )
}
