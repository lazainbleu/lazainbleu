'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import Header from './Header'

interface RootLayoutClientProps {
  children: React.ReactNode
}

/**
 * RootLayoutClient - Wrapper untuk layout components yang di-share across all pages
 *
 * Komponen ini menangani:
 * - Header (navigasi utama, search, cart, dll)
 * - Main content area (children)
 * - Footer (links, payment methods, sosial media)
 *
 * Struktur ini memastikan konsistensi layout di semua halaman
 * dan memudahkan maintenance jangka panjang
 */
export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.history.scrollRestoration = 'manual'
    } catch {
      // Ignore unsupported browsers
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  )
}
