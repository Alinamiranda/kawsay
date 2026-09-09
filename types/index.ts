export type Language = 'es' | 'qu'

/** Text available in both platform languages. */
export interface Bilingual {
  es: string
  qu: string
}

export type CategoryId =
  | 'derechos'
  | 'salud'
  | 'educacion'
  | 'servicios'
  | 'programas'
  | 'tramites'

export interface Category {
  id: CategoryId
  name: Bilingual
  description: Bilingual
  icon: string
  image: string
}

export interface InfoItem {
  id: string
  category: CategoryId
  title: Bilingual
  summary: Bilingual
  body: Bilingual[]
  languages: Language[]
  image: string
  institution: string
  documents?: Bilingual[]
  steps?: Bilingual[]
  updatedAt: string
}

export interface ProcedureStep {
  title: Bilingual
  description: Bilingual
  tip?: Bilingual
}

export interface Procedure {
  id: string
  title: Bilingual
  summary: Bilingual
  institution: string
  estimatedTime: Bilingual
  documents: Bilingual[]
  steps: ProcedureStep[]
}

export interface SearchResult {
  id: string
  type: 'info' | 'procedure'
  title: Bilingual
  summary: Bilingual
  institution: string
  steps?: Bilingual[]
  documents?: Bilingual[]
  score: number
}

export interface User {
  id: string
  name: string
  email: string
  language: Language
  location: string
  role: 'user' | 'admin'
}

export interface QueryHistoryEntry {
  id: string
  question: string
  answer: string
  date: string
}
