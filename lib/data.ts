import type { Category, InfoItem, Procedure } from '@/types'

export const categories: Category[] = [
  {
    id: 'derechos',
    name: { es: 'Derechos ciudadanos', qu: 'Runa derechokuna' },
    description: {
      es: 'Conoce tus derechos fundamentales y cómo hacerlos valer.',
      qu: 'Derechoykikunata riqsiy, imaynatam amachana.',
    },
    icon: 'scale',
    image: '/images/derechos.png',
  },
  {
    id: 'salud',
    name: { es: 'Salud', qu: 'Hampi kawsay' },
    description: {
      es: 'Atención médica, seguros y campañas de salud pública.',
      qu: 'Hampiy, seguro, hampi kawsay ruwaykunapas.',
    },
    icon: 'heart-pulse',
    image: '/images/salud.png',
  },
  {
    id: 'educacion',
    name: { es: 'Educación', qu: 'Yachachiy' },
    description: {
      es: 'Matrículas, becas y programas educativos para todos.',
      qu: 'Qillqachiy, beca, yachachiy ruwaykunapas llapanpaq.',
    },
    icon: 'graduation-cap',
    image: '/images/educacion.png',
  },
  {
    id: 'servicios',
    name: { es: 'Servicios públicos', qu: 'Llaqtapaq servisyukuna' },
    description: {
      es: 'Agua, luz, transporte y otros servicios esenciales.',
      qu: 'Yaku, k’anchay, puriy, hukkuna servisyukunapas.',
    },
    icon: 'building-2',
    image: '/images/servicios.png',
  },
  {
    id: 'programas',
    name: { es: 'Programas sociales', qu: 'Runa yanapay ruwaykuna' },
    description: {
      es: 'Apoyos y beneficios del Estado para familias y personas.',
      qu: 'Estadopaq yanapaykuna ayllukunapaq, runakunapaqpas.',
    },
    icon: 'hand-heart',
    image: '/images/programas.png',
  },
  {
    id: 'tramites',
    name: { es: 'Trámites frecuentes', qu: 'Sapa kuti ruwaykuna' },
    description: {
      es: 'Guías paso a paso para los trámites más comunes.',
      qu: "Aswan ruwasqa ruwaykunapaq ñan'ninta yachachiy.",
    },
    icon: 'file-text',
    image: '/images/tramites.png',
  },
]

export const infoItems: InfoItem[] = [
  {
    id: 'derecho-identidad',
    category: 'derechos',
    title: { es: 'Derecho a la identidad', qu: 'Identidad derechomanta' },
    summary: {
      es: 'Toda persona tiene derecho a un nombre, nacionalidad y documento de identidad.',
      qu: 'Sapa runapa sutinman, nacionalidadninman, documentonmanpas derechon kan.',
    },
    body: [
      {
        es: 'El derecho a la identidad garantiza que seas reconocido legalmente ante el Estado desde tu nacimiento.',
        qu: 'Identidad derecho estadopa ñawpaqinpi paqarisqaykimantapacha riqsisqa kanaykita amachan.',
      },
      {
        es: 'Incluye la inscripción de nacimiento, el DNI y el derecho a usar tu propio idioma.',
        qu: 'Paqariy qillqakuy, DNI, kikin simiykita rimay derechontapas hunt’an.',
      },
    ],
    languages: ['es', 'qu'],
    image: '/images/derechos.png',
    institution: 'RENIEC',
    updatedAt: '2026-01-12',
  },
  {
    id: 'sis-salud',
    category: 'salud',
    title: { es: 'Seguro Integral de Salud (SIS)', qu: 'Hunt’a Hampi Seguro (SIS)' },
    summary: {
      es: 'Acceso gratuito a servicios de salud para personas sin seguro.',
      qu: 'Mana seguroyuq runakunapaq qullqi mana kanan hampi servisyu.',
    },
    body: [
      {
        es: 'El SIS cubre consultas, medicinas y emergencias para las personas afiliadas.',
        qu: 'SIS qatisqa runakunapaq tapukuyta, hampikunata, emergenciakunatapas qatin.',
      },
      {
        es: 'Puedes afiliarte de forma gratuita presentando tu DNI en el centro de salud más cercano.',
        qu: 'Qayllapi kaq hampina wasipi DNIykita rikuchispa qullqi mana afiliakuwaq.',
      },
    ],
    languages: ['es', 'qu'],
    image: '/images/salud.png',
    institution: 'Ministerio de Salud',
    documents: [
      { es: 'DNI vigente', qu: 'Kawsaq DNI' },
      { es: 'Declaración de domicilio', qu: 'Maypi tiyay willakuy' },
    ],
    updatedAt: '2026-01-08',
  },
  {
    id: 'matricula-escolar',
    category: 'educacion',
    title: { es: 'Matrícula escolar', qu: 'Yachaywasi qillqachiy' },
    summary: {
      es: 'La matrícula en escuelas públicas es gratuita y un derecho de todo niño.',
      qu: 'Llaqta yachaywasipi qillqachiy qullqi mana, sapa warmapa derechon.',
    },
    body: [
      {
        es: 'Ningún niño puede ser rechazado por falta de documentos o por su idioma.',
        qu: 'Mana ima warmapas documento mana kaptin utaq siminrayku qarqusqa kanmanchu.',
      },
    ],
    languages: ['es', 'qu'],
    image: '/images/educacion.png',
    institution: 'Ministerio de Educación',
    documents: [
      { es: 'Partida de nacimiento', qu: 'Paqariy partida' },
      { es: 'DNI del apoderado', qu: 'Apoderadopa DNIn' },
    ],
    updatedAt: '2026-01-15',
  },
  {
    id: 'acceso-agua',
    category: 'servicios',
    title: { es: 'Acceso al agua potable', qu: 'Upyana yakuman haykuy' },
    summary: {
      es: 'Solicita conexión de agua potable y saneamiento para tu vivienda.',
      qu: 'Wasiykipaq upyana yaku, saneamiento conexionta mañakuy.',
    },
    body: [
      {
        es: 'El acceso al agua segura es un derecho reconocido para toda familia.',
        qu: 'Allin yakuman haykuy sapa ayllupaq riqsisqa derechon.',
      },
    ],
    languages: ['es', 'qu'],
    image: '/images/servicios.png',
    institution: 'Municipalidad / EPS',
    updatedAt: '2026-01-03',
  },
  {
    id: 'programa-juntos',
    category: 'programas',
    title: { es: 'Programa Juntos', qu: 'Juntos Ruway' },
    summary: {
      es: 'Apoyo económico para familias en situación de pobreza con hijos.',
      qu: 'Wakcha kaypi kaq ayllukunapaq wawakunayuq qullqi yanapay.',
    },
    body: [
      {
        es: 'Juntos entrega un incentivo económico a cambio de compromisos en salud y educación.',
        qu: 'Juntos hampi, yachachiy compromisokunapaq qullqi yanapayta qun.',
      },
    ],
    languages: ['es', 'qu'],
    image: '/images/programas.png',
    institution: 'MIDIS',
    documents: [
      { es: 'DNI de la madre', qu: 'Mamap DNIn' },
      { es: 'DNI de los hijos', qu: 'Wawakunap DNIn' },
    ],
    updatedAt: '2026-01-10',
  },
  {
    id: 'tramite-dni',
    category: 'tramites',
    title: { es: '¿Cómo saco mi DNI?', qu: 'Imaynatam DNIyta hurquni?' },
    summary: {
      es: 'Guía completa para obtener o renovar tu Documento Nacional de Identidad.',
      qu: 'DNIta hurquy utaq musuqchay hunt’a yachachiy.',
    },
    body: [
      {
        es: 'El DNI es tu documento principal de identidad y es necesario para casi todos los trámites.',
        qu: 'DNI identidadniykipa kaq documenton, yaqa llapan ruwaykunapaq necesitasqa.',
      },
    ],
    languages: ['es', 'qu'],
    image: '/images/tramites.png',
    institution: 'RENIEC',
    documents: [
      { es: 'Partida de nacimiento', qu: 'Paqariy partida' },
      { es: 'Recibo de pago', qu: 'Pago recibo' },
      { es: 'Foto reciente', qu: 'Musuq foto' },
    ],
    steps: [
      { es: 'Realiza el pago en el banco autorizado.', qu: 'Autorizasqa bancopi pagota ruway.' },
      { es: 'Acude a una oficina de RENIEC.', qu: 'RENIEC oficinaman riy.' },
      { es: 'Toma tu foto y firma la solicitud.', qu: 'Fotoykita hurquy, solicitudta firmay.' },
      { es: 'Recoge tu DNI en la fecha indicada.', qu: 'Nisqa p’unchawpi DNIykita hurquy.' },
    ],
    updatedAt: '2026-01-14',
  },
]

export const procedures: Procedure[] = [
  {
    id: 'renovacion-dni',
    title: { es: 'Renovación de DNI', qu: 'DNI musuqchay' },
    summary: {
      es: 'Renueva tu DNI cuando esté vencido o por caducidad.',
      qu: 'DNIykita musuqchay tukusqa kaptin utaq wataynin junt’aptin.',
    },
    institution: 'RENIEC',
    estimatedTime: { es: 'Aprox. 15 días hábiles', qu: 'Yaqa 15 llamk’ana p’unchaw' },
    documents: [
      { es: 'DNI anterior', qu: 'Ñawpaq DNI' },
      { es: 'Recibo de pago por renovación', qu: 'Musuqchay pago recibo' },
    ],
    steps: [
      {
        title: { es: 'Reunir documentos necesarios', qu: 'Necesitasqa documentokunata huñuy' },
        description: {
          es: 'Junta tu DNI anterior y realiza el pago de la tasa en un banco autorizado.',
          qu: 'Ñawpaq DNIykita huñuy, autorizasqa bancopi tasa pagota ruway.',
        },
        tip: {
          es: 'Guarda el recibo de pago, lo necesitarás en el siguiente paso.',
          qu: 'Pago reciboykita waqaychay, qatiq ñanpi necesitanki.',
        },
      },
      {
        title: { es: 'Acudir a la institución', qu: 'Ruwaq wasiman riy' },
        description: {
          es: 'Ve a la oficina de RENIEC más cercana con tus documentos.',
          qu: 'Qayllapi kaq RENIEC oficinaman documentoykiwan riy.',
        },
      },
      {
        title: { es: 'Completar la solicitud', qu: 'Solicitudta hunt’ay' },
        description: {
          es: 'Llena el formulario, toma tu foto y coloca tu huella y firma.',
          qu: 'Formularioykita hunt’ay, fotoykita hurquy, huellaykita firmaykitapas churay.',
        },
        tip: {
          es: 'Puedes pedir ayuda en quechua al personal de atención.',
          qu: 'Atención runamanta runa simipi yanapayta mañakuwaq.',
        },
      },
      {
        title: { es: 'Recoger el nuevo DNI', qu: 'Musuq DNIta hurquy' },
        description: {
          es: 'Regresa en la fecha indicada para recoger tu nuevo documento.',
          qu: 'Nisqa p’unchawpi musuq documentoykita hurquq kutimuy.',
        },
      },
    ],
  },
  {
    id: 'afiliacion-sis',
    title: { es: 'Afiliación al SIS', qu: 'SIS afiliakuy' },
    summary: {
      es: 'Afíliate gratis al Seguro Integral de Salud.',
      qu: 'Hunt’a Hampi Seguroman qullqi mana afiliakuy.',
    },
    institution: 'Ministerio de Salud',
    estimatedTime: { es: 'El mismo día', qu: 'Kikin p’unchaw' },
    documents: [{ es: 'DNI vigente', qu: 'Kawsaq DNI' }],
    steps: [
      {
        title: { es: 'Verifica que no tengas otro seguro', qu: 'Huk seguroyki mana kasqanta qaway' },
        description: {
          es: 'El SIS es para personas que no cuentan con EsSalud u otro seguro.',
          qu: 'SIS mana EsSalud utaq huk seguroyuq runakunapaq.',
        },
      },
      {
        title: { es: 'Acude al centro de salud', qu: 'Hampina wasiman riy' },
        description: {
          es: 'Lleva tu DNI al establecimiento de salud más cercano.',
          qu: 'DNIykita qayllapi kaq hampina wasiman apay.',
        },
      },
      {
        title: { es: 'Registra tu afiliación', qu: 'Afiliacionniykita qillqachiy' },
        description: {
          es: 'El personal registrará tus datos y quedarás afiliado de inmediato.',
          qu: 'Runa datosniykita qillqanqa, chaymantapacha afiliasqa kanki.',
        },
      },
    ],
  },
]

/** Fast lookup helpers. */
export function getCategory(id: string) {
  return categories.find((c) => c.id === id)
}

export function getInfoItem(id: string) {
  return infoItems.find((i) => i.id === id)
}

export function getProcedure(id: string) {
  return procedures.find((p) => p.id === id)
}
