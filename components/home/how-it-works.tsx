'use client'

import { Languages, MessagesSquare, ListChecks } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import type { Bilingual } from '@/types'

const steps: { icon: typeof Languages; title: Bilingual; text: Bilingual }[] = [
  {
    icon: Languages,
    title: { es: 'Elige tu idioma', qu: 'Simiykita akllay' },
    text: {
      es: 'Cambia entre español y quechua en cualquier momento con un solo toque.',
      qu: 'Español, quechua ukupi imay pachapas huk llamiywanlla tikray.',
    },
  },
  {
    icon: MessagesSquare,
    title: { es: 'Pregunta con tus palabras', qu: 'Rimayniykiwan tapukuy' },
    text: {
      es: 'Usa el buscador o el asistente virtual para encontrar lo que necesitas.',
      qu: 'Maskanata utaq yanapaqta servichiy, necesitasqaykita tariy.',
    },
  },
  {
    icon: ListChecks,
    title: { es: 'Sigue los pasos', qu: "Ñan'kunata qatiy" },
    text: {
      es: 'Recibe guías claras, paso a paso, para completar cada trámite.',
      qu: "Sut'i yachachiykunata chaskiy, sapa ruwayta hunt'anaykipaq.",
    },
  },
]

export function HowItWorks() {
  const { tr } = useLanguage()

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((step, i) => {
        const Icon = step.icon
        return (
          <div
            key={i}
            className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold">
              {tr(step.title)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {tr(step.text)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
