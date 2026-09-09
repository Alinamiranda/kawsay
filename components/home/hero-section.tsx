'use client'

import Link from 'next/link'
import { ArrowRight, Search, ScrollText, HandHeart } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:py-24 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="highlight" className="px-3 py-1 text-sm">
            {t('hero.tag')}
          </Badge>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-6 text-base" render={<Link href="/informacion" />}>
              <ScrollText className="size-5" />
              {t('hero.cta.info')}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-6 text-base"
              render={<Link href="/tramites" />}
            >
              <HandHeart className="size-5" />
              {t('hero.cta.procedure')}
            </Button>
          </div>
          <Link
            href="/buscar"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            <Search className="size-4" />
            {t('hero.cta.rights')}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            <img
              src="/images/derechos.png"
              alt="Personas de comunidades andinas accediendo a información pública"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card p-4 shadow-lg sm:block">
            <p className="font-heading text-2xl font-bold text-primary">2</p>
            <p className="text-xs text-muted-foreground">Español · Runa Simi</p>
          </div>
        </div>
      </div>
    </section>
  )
}
