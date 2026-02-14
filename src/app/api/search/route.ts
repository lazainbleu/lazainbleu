// app/api/search/route.ts
import { getAllProducts } from '@/lib/products'
import { searchProducts, normalizeQuery } from '@/lib/search'
import { SearchQuerySchema } from '@/lib/validation'
import type { SearchResponse } from '@/lib/validation'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') ?? ''

    // Validate query
    const parse = SearchQuerySchema.safeParse({ q })
    if (!parse.success) {
      const err = parse.error?.issues?.[0]?.message || 'Invalid search query'
      return new Response(JSON.stringify({ success: false, error: err }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const normalized = normalizeQuery(parse.data.q)

    // Defensive: if query blank after normalize
    if (!normalized) {
      return new Response(
        JSON.stringify({
          success: true,
          data: { results: [], total: 0, query: parse.data.q },
          timestamp: new Date().toISOString(),
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Fetch products
    const allProducts = await getAllProducts()

    // Search with stricter rules for short queries
    const qLen = normalized.length
    const opts = {
      minScore: 120,
      maxResults: 20,
    }

    // If query is very short, raise minScore to avoid noisy hits
    if (qLen < 3) {
      opts.minScore = 400
    }

    const results = searchProducts(normalized, allProducts, opts)

    // Build response
    const response: SearchResponse = {
      success: true,
      data: {
        results: results.map((p) => ({
          id: String(p.id),
          name: p.name ?? '',
          slug: p.slug ?? '',
          price: p.price ?? 0,
          description: p.description ?? '',
          shortDescription: p.shortDescription ?? '',
          images: p.images ?? [],
          stock: Number(p.stock ?? 0),
          category: p.category ?? '',
          featured: Boolean(p.featured ?? false),
        })),
        total: results.length,
        query: parse.data.q,
      },
      timestamp: new Date().toISOString(),
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Search API error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred while processing your search',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
