'use client'

import Header from './Header'
import Footer from './Footer'

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
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  )
}
