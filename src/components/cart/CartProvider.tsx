'use client'

import { useEffect, useState, type ReactNode } from 'react'

type CartProviderProps = {
  children: ReactNode
}

/**
 * CartProvider handles hydration for the Zustand cart store.
 * This prevents hydration mismatches between server and client.
 */
export function CartProvider({ children }: CartProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // During SSR, render children without cart state
  // After hydration, cart state is available
  return <div suppressHydrationWarning>{children}</div>
}

/**
 * Hook to check if the cart store is hydrated
 */
export function useCartHydration() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
}
