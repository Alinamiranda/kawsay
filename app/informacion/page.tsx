'use client'

import { Suspense } from 'react'
import { PageShell } from '@/components/page-shell'
import { InformationView } from '@/components/information/information-view'

export default function InformacionPage() {
  return (
    <PageShell>
      <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-12" />}>
        <InformationView />
      </Suspense>
    </PageShell>
  )
}
