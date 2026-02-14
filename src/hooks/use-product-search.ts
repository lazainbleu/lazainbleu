'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { Product } from '@/types/product'

interface SearchState {
  query: string
  results: Product[]
  loading: boolean
  error: string | null
}

export function useProductSearch() {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    loading: false,
    error: null,
  })

  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  const search = useCallback(async (query: string) => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Update query immediately for input responsiveness
    setState((prev) => ({ ...prev, query }))

    // If query is empty, clear results
    if (!query.trim()) {
      setState((prev) => ({
        ...prev,
        query: '',
        results: [],
        loading: false,
        error: null,
      }))
      return
    }

    // Set loading state
    setState((prev) => ({ ...prev, loading: true, error: null }))

    // Debounce API call (250ms)
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)

        if (!response.ok) {
          throw new Error('Search failed')
        }

        const data = await response.json()

        setState((prev) => ({
          ...prev,
          results: data.data.results || [],
          loading: false,
          error: null,
        }))
      } catch (err) {
        setState((prev) => ({
          ...prev,
          results: [],
          loading: false,
          error: err instanceof Error ? err.message : 'An error occurred during search',
        }))
      }
    }, 250)
  }, [])

  const clearSearch = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    setState({
      query: '',
      results: [],
      loading: false,
      error: null,
    })
  }, [])

  const setQuery = useCallback(
    (query: string) => {
      search(query)
    },
    [search]
  )

  return {
    query: state.query,
    results: state.results,
    loading: state.loading,
    error: state.error,
    totalResults: state.results.length,
    setQuery,
    clearSearch,
  }
}
