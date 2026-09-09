import { infoItems, procedures } from '@/lib/data'
import type { SearchResult } from '@/types'

/** Normalize text for accent/case-insensitive matching. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function tokenize(query: string): string[] {
  return normalize(query)
    .split(/\s+/)
    .filter((t) => t.length > 2)
}

/** Score a haystack against query tokens using simple term frequency. */
function scoreText(haystack: string, tokens: string[]): number {
  const text = normalize(haystack)
  let score = 0
  for (const token of tokens) {
    if (text.includes(token)) score += 1
  }
  return score
}

/**
 * Search across information items and guided procedures.
 * Kept independent of the UI so it can later be swapped for a
 * real database / full-text search backend.
 */
export function search(query: string): SearchResult[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) return []

  const results: SearchResult[] = []

  for (const item of infoItems) {
    const haystack = [
      item.title.es,
      item.title.qu,
      item.summary.es,
      item.summary.qu,
      item.institution,
      ...item.body.flatMap((b) => [b.es, b.qu]),
    ].join(' ')

    const score = scoreText(haystack, tokens)
    if (score > 0) {
      results.push({
        id: item.id,
        type: 'info',
        title: item.title,
        summary: item.summary,
        institution: item.institution,
        steps: item.steps,
        documents: item.documents,
        score,
      })
    }
  }

  for (const proc of procedures) {
    const haystack = [
      proc.title.es,
      proc.title.qu,
      proc.summary.es,
      proc.summary.qu,
      proc.institution,
      ...proc.steps.flatMap((s) => [s.title.es, s.title.qu]),
    ].join(' ')

    const score = scoreText(haystack, tokens)
    if (score > 0) {
      results.push({
        id: proc.id,
        type: 'procedure',
        title: proc.title,
        summary: proc.summary,
        institution: proc.institution,
        steps: proc.steps.map((s) => s.title),
        documents: proc.documents,
        score,
      })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

export const searchSuggestions = [
  '¿Cómo saco mi DNI?',
  '¿Qué beneficios sociales existen?',
  '¿Cómo me afilio al SIS?',
  '¿Cómo matriculo a mi hijo?',
]

/** Simulate a network / database roundtrip so the loading state is visible. */
export function searchWithDelay(query: string, delay = 900): Promise<SearchResult[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(search(query)), delay)
  })
}
