'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

export function SiteFooter() {
  const { t, tr } = useLanguage()

  const columns = [
    {
      title: { es: 'Plataforma', qu: 'Plataforma' },
      links: [
        { href: '/informacion', label: t('nav.info') },
        { href: '/buscar', label: t('nav.search') },
        { href: '/tramites', label: t('nav.procedures') },
        { href: '/derechos', label: t('nav.rights') },
      ],
    },
    {
      title: { es: 'Cuenta', qu: 'Cuenta' },
      links: [
        { href: '/ingresar', label: t('nav.login') },
        { href: '/registro', label: t('nav.register') },
        { href: '/perfil', label: t('nav.profile') },
      ],
    },
  ]

  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-heading text-lg font-bold">
              K
            </span>
            <span className="font-heading text-lg font-bold">
              Kawsay<span className="text-primary">Info</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {tr({
              es: 'Acercamos la información pública a las personas quechuhablantes con contenido claro, bilingüe y culturalmente adaptado.',
              qu: 'Runa simi rimaqkunaman willakuyta qayllachiyku sut’i, iskay simipi, kawsayninkuman hina.',
            })}
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title.es}>
            <h4 className="font-heading text-sm font-semibold">{tr(col.title)}</h4>
            <ul className="mt-4 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-muted-foreground">
          {tr({
            es: '© 2026 KawsayInfo · Información pública intercultural · Español y Quechua',
            qu: '© 2026 KawsayInfo · Iskay kawsay llaqta willakuy · Español, Runa Simi',
          })}
        </div>
      </div>
    </footer>
  )
}
