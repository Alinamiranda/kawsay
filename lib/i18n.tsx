'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Bilingual, Language } from '@/types'

/** UI string dictionary. Keys are shared across both languages. */
const dictionary = {
  es: {
    'nav.home': 'Inicio',
    'nav.info': 'Información',
    'nav.search': 'Buscar',
    'nav.procedures': 'Trámites',
    'nav.rights': 'Mis derechos',
    'nav.profile': 'Mi perfil',
    'nav.admin': 'Administración',
    'nav.login': 'Iniciar sesión',
    'nav.register': 'Registrarse',
    'nav.logout': 'Cerrar sesión',

    'common.readMore': 'Leer más',
    'common.available': 'Disponible en',
    'common.institution': 'Institución responsable',
    'common.documents': 'Documentos necesarios',
    'common.steps': 'Pasos del procedimiento',
    'common.back': 'Volver',
    'common.viewAll': 'Ver todo',
    'common.loading': 'Buscando información en la base de datos...',
    'common.empty': 'No encontramos resultados',
    'common.emptyHint': 'Intenta con otras palabras o revisa las categorías.',
    'common.error': 'Ocurrió un error',
    'common.errorHint': 'Vuelve a intentarlo en unos momentos.',
    'common.startProcedure': 'Iniciar trámite',
    'common.updated': 'Actualizado',
    'common.estimatedTime': 'Tiempo estimado',

    'hero.tag': 'Plataforma intercultural',
    'hero.title':
      'Información, derechos y servicios públicos al alcance de todos en tu idioma',
    'hero.subtitle':
      'KawsayInfo acerca la información pública a las personas quechuhablantes con contenido claro, culturalmente adaptado y bilingüe.',
    'hero.cta.info': 'Consultar información',
    'hero.cta.procedure': 'Realizar trámite',
    'hero.cta.rights': 'Conocer mis derechos',

    'section.categories': 'Explora por categoría',
    'section.categoriesSub':
      'Encuentra información organizada y fácil de entender.',
    'section.search': 'Buscador inteligente',
    'section.searchSub':
      'Pregunta con tus propias palabras y encuentra los pasos que necesitas.',
    'section.procedures': 'Trámites guiados',
    'section.proceduresSub': 'Sigue cada trámite paso a paso, sin complicaciones.',

    'search.placeholder': '¿Cómo saco mi DNI? ¿Qué beneficios sociales existen?',
    'search.button': 'Buscar',
    'search.suggestions': 'Ejemplos de búsqueda',
    'search.results': 'Resultados',

    'procedure.progress': 'Progreso',
    'procedure.completed': 'Pasos completados',
    'procedure.next': 'Siguiente paso',
    'procedure.prev': 'Anterior',
    'procedure.finish': 'Trámite completado',
    'procedure.recommendation': 'Recomendación',

    'chat.title': 'Asistente virtual',
    'chat.subtitle': 'Estoy aquí para ayudarte',
    'chat.placeholder': 'Escribe tu pregunta...',
    'chat.greeting':
      'Hola, soy el asistente de KawsayInfo. ¿En qué puedo ayudarte hoy?',
    'chat.send': 'Enviar',

    'auth.loginTitle': 'Iniciar sesión',
    'auth.registerTitle': 'Crear cuenta',
    'auth.name': 'Nombre completo',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.location': 'Ubicación',
    'auth.language': 'Idioma preferido',
    'auth.noAccount': '¿No tienes cuenta?',
    'auth.hasAccount': '¿Ya tienes cuenta?',
    'auth.submitLogin': 'Ingresar',
    'auth.submitRegister': 'Registrarme',

    'profile.title': 'Mi perfil',
    'profile.history': 'Historial de consultas',
    'profile.procedures': 'Trámites realizados',
    'profile.saved': 'Información guardada',
    'profile.noHistory': 'Aún no tienes consultas registradas.',

    'admin.title': 'Panel administrativo',
    'admin.users': 'Usuarios',
    'admin.queries': 'Consultas realizadas',
    'admin.content': 'Información publicada',
    'admin.categories': 'Categorías',
    'admin.languages': 'Idiomas utilizados',
    'admin.manageContent': 'Gestionar contenido',
    'admin.createContent': 'Crear contenido',
    'admin.recentContent': 'Contenido reciente',
    'admin.actions': 'Acciones',
    'admin.edit': 'Editar',
    'admin.delete': 'Eliminar',
  },
  qu: {
    'nav.home': 'Qallariy',
    'nav.info': 'Willakuy',
    'nav.search': 'Maskay',
    'nav.procedures': 'Ruwaykuna',
    'nav.rights': 'Derechosniykuna',
    'nav.profile': 'Ñuqap perfilniy',
    'nav.admin': 'Kamachiy',
    'nav.login': 'Yaykuy',
    'nav.register': 'Qillqakuy',
    'nav.logout': 'Lluqsiy',

    'common.readMore': 'Astawan ñawinchay',
    'common.available': 'Kay simikunapi',
    'common.institution': 'Ruwaq wasi',
    'common.documents': 'Necesitasqa qillqakuna',
    'common.steps': "Ruwaypa ñan'kuna",
    'common.back': 'Kutiy',
    'common.viewAll': 'Llapanta qaway',
    'common.loading': 'Willakuyta base de datospi maskachkani...',
    'common.empty': 'Mana tarikunchu',
    'common.emptyHint': 'Huk rimaykunawan maskay utaq categoriakunata qaway.',
    'common.error': 'Huk pantay karqan',
    'common.errorHint': 'Ama hina kaspa yapamanta ruway.',
    'common.startProcedure': 'Ruwayta qallariy',
    'common.updated': 'Musuqchasqa',
    'common.estimatedTime': 'Pisi pacha',

    'hero.tag': 'Iskay kawsay plataforma',
    'hero.title':
      'Willakuy, derechokuna, hukkunapaq servisyukunapas llapanpaq qanpa simiykipi',
    'hero.subtitle':
      'KawsayInfo runa simi rimaqkunaman willakuyta qayllachin, sut’i, kawsayninkuman hina, iskaynin simipi.',
    'hero.cta.info': 'Willakuyta maskay',
    'hero.cta.procedure': 'Ruwayta ruway',
    'hero.cta.rights': 'Derechoyta riqsiy',

    'section.categories': 'Categoriapi maskay',
    'section.categoriesSub': "Allin churasqa, sut'i willakuyta tariy.",
    'section.search': 'Yuyayniyuq maskana',
    'section.searchSub':
      "Kikin rimayniykiwan tapukuy, necesitasqa ñan'kunata tariy.",
    'section.procedures': 'Yachachisqa ruwaykuna',
    'section.proceduresSub': "Sapa ruwayta ñan'ninta qatiy, mana sasachakuywan.",

    'search.placeholder': 'Imaynatam DNIyta hurquni? Ima yanapaykunam kan?',
    'search.button': 'Maskay',
    'search.suggestions': 'Maskana kaqllakuna',
    'search.results': 'Tarisqakuna',

    'procedure.progress': 'Ñawpaqman puriy',
    'procedure.completed': "Tukusqa ñan'kuna",
    'procedure.next': "Qatiq ñan",
    'procedure.prev': 'Ñawpaq',
    'procedure.finish': 'Ruway tukusqa',
    'procedure.recommendation': 'Yuyaychay',

    'chat.title': 'Yanapaq',
    'chat.subtitle': 'Yanapaykunaypaq kaypi kani',
    'chat.placeholder': 'Tapuyniykita qillqay...',
    'chat.greeting':
      'Napaykullayki, KawsayInfo yanapaq kani. Imapim yanapaykiman kunan?',
    'chat.send': 'Apachiy',

    'auth.loginTitle': 'Yaykuy',
    'auth.registerTitle': 'Cuentata paqarichiy',
    'auth.name': 'Hunt’a suti',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.location': 'Maypi tiyanki',
    'auth.language': 'Munasqa simi',
    'auth.noAccount': 'Manachu cuentayki kan?',
    'auth.hasAccount': 'Cuentaykiña kanchu?',
    'auth.submitLogin': 'Yaykuy',
    'auth.submitRegister': 'Qillqakuy',

    'profile.title': 'Ñuqap perfilniy',
    'profile.history': 'Tapukuykunap historian',
    'profile.procedures': 'Rurasqa ruwaykuna',
    'profile.saved': 'Waqaychasqa willakuy',
    'profile.noHistory': 'Manaraq tapukuyniykikuna kanchu.',

    'admin.title': 'Kamachiy panel',
    'admin.users': 'Ruwaqkuna',
    'admin.queries': 'Rurasqa tapukuykuna',
    'admin.content': 'Willakuy churasqa',
    'admin.categories': 'Categoriakuna',
    'admin.languages': 'Servisqa simikuna',
    'admin.manageContent': 'Willakuyta kamachiy',
    'admin.createContent': 'Willakuyta paqarichiy',
    'admin.recentContent': 'Kunan willakuy',
    'admin.actions': 'Ruwaykuna',
    'admin.edit': 'Allichay',
    'admin.delete': 'Pichay',
  },
} as const

type TranslationKey = keyof (typeof dictionary)['es']

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
  /** Resolve a Bilingual field to the current language. */
  tr: (value: Bilingual) => string
  languageLabel: string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  const t = useCallback(
    (key: TranslationKey) => dictionary[language][key] ?? key,
    [language],
  )

  const tr = useCallback(
    (value: Bilingual) => value[language] || value.es,
    [language],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t,
      tr,
      languageLabel: language === 'es' ? 'Español' : 'Runa Simi',
    }),
    [language, t, tr],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
