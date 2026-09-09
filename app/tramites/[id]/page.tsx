'use client'

import { use } from 'react'
import { PageShell } from '@/components/page-shell'
import { ProcedureWizard } from '@/components/procedures/procedure-wizard'

export default function TramiteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return (
    <PageShell>
      <ProcedureWizard id={id} />
    </PageShell>
  )
}
