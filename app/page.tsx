'use client'

import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { HeroSection } from '@/components/home/hero-section'
import { CategoryGrid } from '@/components/category-grid'
import { HowItWorks } from '@/components/home/how-it-works'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'
import { searchSuggestions } from '@/lib/search'

export default function HomePage() {
  const { t, tr } = useLanguage()

  return (
    <PageShell>
      <HeroSection />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow={t('section.categories')}
          title={t('section.categories')}
          subtitle={t('section.categoriesSub')}
        />
        <div className="mt-8">
          <CategoryGrid />
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-balance md:text-3xl">
              {t('section.search')}
            </h2>
            <p className="mt-3 max-w-lg leading-relaxed text-primary-foreground/80 text-pretty">
              {t('section.searchSub')}
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-6 h-12 px-6 text-base"
              render={<Link href="/buscar" />}
            >
              <Search className="size-5" />
              {t('search.button')}
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {searchSuggestions.map((s) => (
              <Link
                key={s}
                href={`/buscar?q=${encodeURIComponent(s)}`}
                className="group flex items-center justify-between gap-3 rounded-xl bg-primary-foreground/10 px-4 py-3.5 text-sm font-medium transition-colors hover:bg-primary-foreground/20"
              >
                <span className="flex items-center gap-2.5">
                  <Search className="size-4 opacity-70" />
                  {s}
                </span>
                <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          title={tr({ es: '¿Cómo funciona?', qu: 'Imaynatam llamk’an?' })}
          subtitle={tr({
            es: 'Tres pasos sencillos para acceder a la información que buscas.',
            qu: "Kimsa sut'i ñan willakuyman haykunaykipaq.",
          })}
        />
        <div className="mt-8">
          <HowItWorks />
        </div>
      </section>
    </PageShell>
  )
}
