'use client'

import { Suspense } from 'react'
import { PageShell } from '@/components/page-shell'
import { SearchView } from '@/components/search/search-view'

export default function BuscarPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-12" />}>
        <SearchView />
      </Suspense>
    </PageShell>
  )
}
