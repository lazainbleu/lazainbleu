// lib/search.ts
import type { Product } from '@/types/product'

/**
 * Normalize query/text:
 * - trim, toLowerCase
 * - remove diacritics (NFD)
 */
export function normalizeQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
}

/**
 * Tokenize text into meaningful tokens (remove stopwords, short tokens)
 */
function tokenize(text?: string): string[] {
  if (!text) return []
  const stopwords = new Set([
    'and',
    'or',
    'the',
    'a',
    'an',
    'of',
    'in',
    'for',
    'with',
    'by',
    'on',
    'to',
    'at',
    'from',
    'is',
    'are',
    'be',
    'as',
  ])
  return normalizeQuery(text)
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((t) => !stopwords.has(t) && t.length > 0)
}

/**
 * Simple subsequence fuzzy check (previous fuzzyMatch)
 * Returns true if query is a subsequence of text
 */
export function fuzzySubsequenceMatch(query: string, text: string): boolean {
  if (!query) return true
  if (!text) return false
  const q = normalizeQuery(query)
  const t = normalizeQuery(text)
  let qi = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++
  }
  return qi === q.length
}

/**
 * Levenshtein distance (iterative, optimized memory)
 * Returns integer distance
 */
export function levenshtein(a: string, b: string): number {
  const s = normalizeQuery(a)
  const t = normalizeQuery(b)
  const n = s.length
  const m = t.length
  if (n === 0) return m
  if (m === 0) return n

  let v0 = new Array(m + 1).fill(0)
  let v1 = new Array(m + 1).fill(0)

  for (let j = 0; j <= m; j++) v0[j] = j

  for (let i = 0; i < n; i++) {
    v1[0] = i + 1
    for (let j = 0; j < m; j++) {
      const cost = s[i] === t[j] ? 0 : 1
      v1[j + 1] = Math.min(
        v1[j] + 1, // insertion
        v0[j + 1] + 1, // deletion
        v0[j] + cost // substitution
      )
    }
    ;[v0, v1] = [v1, v0]
  }
  return v0[m]
}

/**
 * Calculate normalized edit-score:
 * returns value in [0,1] where 1 means identical, 0 means very different.
 * We cap to 0 if normalized distance > 0.5 (too far).
 */
function editSimilarityScore(q: string, text: string): number {
  if (!q || !text) return 0
  const s = normalizeQuery(q)
  const t = normalizeQuery(text)
  const maxLen = Math.max(s.length, t.length)
  if (maxLen === 0) return 0
  const dist = levenshtein(s, t)
  const norm = dist / maxLen
  if (norm > 0.5) return 0 // too different — reject
  return Math.max(0, 1 - norm) // 1 -> identical, 0 -> far
}

/**
 * Calculate a relevance score for a single field
 * Score ranges roughly in [0, 1000] — relative weights applied outside when combining fields.
 */
export function calculateMatchScore(query: string, text?: string): number {
  if (!query || !text) return 0
  const q = normalizeQuery(query)
  const t = normalizeQuery(text)

  // exact equality
  if (t === q) return 1000

  // tokenization for word-level checks
  const tokens = t.split(/[^a-z0-9]+/).filter(Boolean)

  // exact word match or word-start
  if (tokens.includes(q)) return 700
  if (tokens.some((token) => token.startsWith(q))) return 600
  if (t.startsWith(q)) return 550

  // substring match (consecutive characters) -> earlier position = higher score
  const idx = t.indexOf(q)
  if (idx !== -1) {
    // prioritize earlier position, and shorter text
    const positionBoost = Math.max(0, 200 - idx) // earlier index -> larger boost
    const lengthPenalty = Math.max(0, 100 - t.length) // shorter text gets small boost
    return 300 + positionBoost + Math.min(50, lengthPenalty)
  }

  // token overlap (how many tokens from query appear in text tokens)
  const qTokens = q.split(/[^a-z0-9]+/).filter(Boolean)
  if (qTokens.length > 0) {
    const overlap = qTokens.filter((qt) => tokens.includes(qt)).length
    if (overlap > 0) {
      // partial token matches good but lower than substring
      return 200 + Math.min(200, 100 * (overlap / qTokens.length))
    }
  }

  // edit distance similarity (allow fuzzy only if reasonably similar)
  const editSim = editSimilarityScore(q, t) // 0..1
  if (editSim > 0) {
    // scale
    return Math.round(150 + editSim * 250) // up to ~400
  }

  // subsequence/fuzzy fallback (very loose)
  if (fuzzySubsequenceMatch(q, t)) {
    return 50
  }

  return 0
}

/**
 * Search products across fields with improved ranking and filters.
 */
export function searchProducts(
  query: string,
  products: Product[],
  opts?: {
    minScore?: number
    maxResults?: number
  }
): Product[] {
  const normalized = normalizeQuery(query)
  if (!normalized) return []

  const qLen = normalized.length
  const MIN_QUERY_LEN = 2 // validation may enforce this; we keep defensive here
  if (qLen < MIN_QUERY_LEN) return []

  // dynamic minScore: shorter queries need stricter scoring
  const baseMinScore = opts?.minScore ?? 120
  const minScore = qLen < 3 ? Math.max(baseMinScore, 400) : baseMinScore
  const maxResults = opts?.maxResults ?? 20

  const scored = products.map((product) => {
    // defensive access to product fields
    const name = product.name ?? ''
    const desc = product.description ?? ''
    const shortDesc = product.shortDescription ?? ''
    const category = product.category ?? ''

    // compute field scores
    const nameScore = calculateMatchScore(normalized, name)
    const descScore = calculateMatchScore(normalized, desc)
    const shortScore = calculateMatchScore(normalized, shortDesc)
    const catScore = calculateMatchScore(normalized, category)

    // weight fields — name matters most, then category, shortDesc, description
    const totalScore =
      nameScore * 1.0 + catScore * 0.7 + shortScore * 0.5 + descScore * 0.3

    // small query length penalty: if qLen < 3 and no strong name/category match, drop score
    const isStrongPrefix =
      normalizeQuery(name).startsWith(normalized) ||
      normalizeQuery(category).startsWith(normalized)
    const finalScore = qLen < 3 && !isStrongPrefix ? totalScore * 0.25 : totalScore

    return { product, score: Math.round(finalScore) }
  })

  // filter by minScore and >0
  const filtered = scored
    .filter((s) => s.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((s) => s.product)

  return filtered
}
