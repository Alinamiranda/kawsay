import type { Bilingual, Language } from '@/types'
import { search } from '@/lib/search'

interface Intent {
  keywords: string[]
  answer: Bilingual
}

const intents: Intent[] = [
  {
    keywords: ['hola', 'buenos', 'buenas', 'napaykullayki', 'saludos'],
    answer: {
      es: 'Hola, con gusto te ayudo. Puedes preguntarme por trámites, derechos o servicios.',
      qu: 'Napaykullayki, kusiywan yanapayki. Ruwaykunamanta, derechokunamanta, servisyukunamantapas tapukuwaq.',
    },
  },
  {
    keywords: ['tramite', 'tramites', 'ruway', 'realizar', 'hacer'],
    answer: {
      es: 'Te ayudaré a encontrar los pasos necesarios para realizarlo. ¿Qué trámite deseas hacer?',
      qu: 'Ruwaypaq necesitasqa ñan’kunata tariyta yanapasqayki. Ima ruwaytam munanki?',
    },
  },
  {
    keywords: ['dni', 'identidad', 'documento'],
    answer: {
      es: 'Para el DNI debes pagar la tasa, acudir a RENIEC, tomar tu foto y recoger tu documento. Revisa la guía en Trámites.',
      qu: 'DNIpaq tasata pagay, RENIECman riy, fotoykita hurquy, documentoykitapas hurquy. Ruwaykunapi qaway.',
    },
  },
  {
    keywords: ['salud', 'sis', 'hampi', 'seguro', 'enfermo'],
    answer: {
      es: 'El SIS es el seguro de salud gratuito. Puedes afiliarte llevando tu DNI al centro de salud más cercano.',
      qu: 'SIS qullqi mana hampi seguro. DNIykita qayllapi kaq hampina wasiman apaspa afiliakuwaq.',
    },
  },
  {
    keywords: ['derecho', 'derechos', 'derecho'],
    answer: {
      es: 'Tienes derecho a la identidad, la salud, la educación y a usar tu propio idioma. Explóralos en Mis derechos.',
      qu: 'Identidad, hampi, yachachiy, kikin simiykita rimay derechoykipas kan. Derechoykikunapi qaway.',
    },
  },
]

const fallback: Bilingual = {
  es: 'No estoy seguro de eso, pero puedo mostrarte información relacionada. También puedes usar el buscador inteligente.',
  qu: 'Manam allintachu yachani, ichaqa willakuyta rikuchiyta atini. Yuyayniyuq maskanatapas servichiwaq.',
}

/** Very small rule-based assistant. Falls back to the search index. */
export function getBotReply(message: string, language: Language): string {
  const text = message
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  for (const intent of intents) {
    if (intent.keywords.some((k) => text.includes(k))) {
      return intent.answer[language] || intent.answer.es
    }
  }

  const results = search(message)
  if (results.length > 0) {
    const top = results[0]
    return language === 'qu' ? top.summary.qu : top.summary.es
  }

  return fallback[language] || fallback.es
}
