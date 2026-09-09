'use client'

import { use } from 'react'
import { PageShell } from '@/components/page-shell'
import { InfoDetail } from '@/components/information/info-detail'

export default function InfoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return (
    <PageShell>
      <InfoDetail id={id} />
    </PageShell>
  )
}
