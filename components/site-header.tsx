'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, User as UserIcon, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { useAuth } from '@/services/auth-context'
import { LanguageSelector } from '@/components/language-selector'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/informacion', label: t('nav.info') },
    { href: '/buscar', label: t('nav.search') },
    { href: '/tramites', label: t('nav.procedures') },
    { href: '/derechos', label: t('nav.rights') },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-heading text-lg font-bold">
            K
          </span>
          <span className="font-heading text-lg font-bold tracking-tight">
            Kawsay<span className="text-primary">Info</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSelector />
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Button variant="outline" size="lg" render={<Link href="/admin" />}>
                  <ShieldCheck className="size-4" />
                  {t('nav.admin')}
                </Button>
              )}
              <Button variant="secondary" size="lg" render={<Link href="/perfil" />}>
                <UserIcon className="size-4" />
                {user.name.split(' ')[0]}
              </Button>
              <Button variant="ghost" size="lg" onClick={logout}>
                {t('nav.logout')}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="lg" render={<Link href="/ingresar" />}>
                {t('nav.login')}
              </Button>
              <Button size="lg" render={<Link href="/registro" />}>
                {t('nav.register')}
              </Button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Móvil">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-lg px-3 py-3 text-base font-medium',
                  isActive(link.href)
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-foreground hover:bg-muted',
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2">
              <LanguageSelector />
            </div>
            {user ? (
              <div className="flex flex-col gap-2">
                {user.role === 'admin' && (
                  <Button variant="outline" size="lg" render={<Link href="/admin" onClick={() => setOpen(false)} />}>
                    {t('nav.admin')}
                  </Button>
                )}
                <Button variant="secondary" size="lg" render={<Link href="/perfil" onClick={() => setOpen(false)} />}>
                  {t('nav.profile')}
                </Button>
                <Button variant="ghost" size="lg" onClick={() => { logout(); setOpen(false) }}>
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="lg" render={<Link href="/ingresar" onClick={() => setOpen(false)} />}>
                  {t('nav.login')}
                </Button>
                <Button size="lg" render={<Link href="/registro" onClick={() => setOpen(false)} />}>
                  {t('nav.register')}
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
