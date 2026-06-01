'use client'

import dynamic from 'next/dynamic'
import Footer from './Footer'

const Header = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => <HeaderPlaceholder />,
})

function HeaderPlaceholder() {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 h-[72px] bg-(--lb-white) md:h-[88px]"
      aria-hidden
    />
  )
}

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
