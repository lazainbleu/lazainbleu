import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import type { Metadata, Viewport } from 'next'
import { RootLayoutClient } from '@/components/layout/RootLayoutClient'
// import Splash from '@/components/ui/splash'

// Font setup
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

// Global SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://lazainbleu.com'),
  title: {
    default: 'Lazain Bleu',
    template: '%s | Lazain Bleu',
  },
  description:
    'Discover Lazain Bleu — premium modern fragrances crafted with elegance, clarity, and luxury.',
  keywords: [
    'Lazain Bleu',
    'Fragrance',
    'Perfume',
    'Luxury Perfume',
    'Eau de Parfum',
    'Lazain Bleu Store',
    'Premium Scents',
  ],
  authors: [{ name: 'Lazain Bleu', url: 'https://lazainbleu.com' }],
  creator: 'Lazain Bleu',
  alternates: {
    canonical: 'https://lazainbleu.com',
  },
  openGraph: {
    title: 'Lazain Bleu — Modern Luxury Fragrances',
    description:
      'Shop premium fragrances from Lazain Bleu — crafted for elegance, confidence, and timeless character.',
    url: 'https://lazainbleu.com',
    siteName: 'Lazain Bleu',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://lazainbleu.com/',
        width: 1200,
        height: 630,
        alt: 'Lazain Bleu — Premium Luxury Fragrance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lazain Bleu — Luxury Fragrance',
    description:
      'Discover Lazain Bleu — premium modern fragrances crafted with elegance.',
    images: ['https://lazainbleu.com/'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Mobile viewport
export const viewport: Viewport = {
  themeColor: '#0F172A', // pakai lb-bleu (warna brand)
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

// Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Lazain Bleu',
    url: 'https://lazainbleu.com',
    sameAs: [
      'https://www.instagram.com/lazainbleu',
      'https://www.tiktok.com/@lazainbleu',
      'https://www.pinterest.com/lazainbleu',
    ],
    description:
      'Lazain Bleu is a modern fragrance house offering premium perfumes with elegant craftsmanship.',
    logo: 'https://lazainbleu.com/icon.svg',
    brand: {
      '@type': 'Brand',
      name: 'Lazain Bleu',
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/icon.svg" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className={`${inter.variable} bg-[var(--lb-white)] text-[var(--lb-bleu)] antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* <Splash /> */}
          <RootLayoutClient>{children}</RootLayoutClient>
        </ThemeProvider>
      </body>
    </html>
  )
}
