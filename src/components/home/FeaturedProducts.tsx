'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { IconShoppingBag } from '@tabler/icons-react'

// --- Types ---
interface Product {
  id: string
  name: string
  type?: string
  price: string
  unitPrice?: string
  image: string
  hoverImage: string
  isNew: boolean
  slug: string
}

// --- Mock Data ---
const products: Product[] = [
  {
    id: '1',
    name: 'APRÈS ALPINE',
    type: 'EXTRAIT DE PARFUM',
    price: '£ 190.00',
    unitPrice: '£ 1,900.00 / l',
    image: '/images/product-1.png',
    hoverImage: '/images/product-1-hover.png',
    slug: 'apres-alpine',
    isNew: true,
  },
  {
    id: '2',
    name: 'Discovery Set',
    type: 'LIMITED COLLECTION',
    price: '£ 35.00',
    image: '/images/product-2.png',
    hoverImage: '/images/product-2-hover.png',
    slug: 'discovery-set',
    isNew: true,
  },
  {
    id: '3',
    name: 'Alpine Candle',
    type: 'HOME FRAGRANCE',
    price: '£ 48.00',
    image: '/images/product-3.png',
    hoverImage: '/images/product-3-hover.png',
    slug: 'alpine-candle',
    isNew: false,
  },
  {
    id: '4',
    name: 'CREMA DI CAPRI',
    type: 'EXTRAIT DE PARFUM',
    price: '£ 190.00',
    unitPrice: '£ 1,900.00 / l',
    image: '/images/product-4.png',
    hoverImage: '/images/product-4-hover.png',
    slug: 'crema-di-capri',
    isNew: false,
  },
]

export default function FeaturedProducts() {
  return (
    <section
      className={cn(
        'bg-[var(--lb-white)] px-4 py-16',
        'md:py-24', // Sedikit dikurangi dari 28 agar lebih compact
        'selection:bg-[var(--lb-bleu)] selection:text-[var(--lb-white)]'
      )}
    >
      <div className="mx-auto max-w-[1440px]">
        {/* --- Header Section --- */}
        {/* Masih menggunakan motion halus untuk header agar tetap elegan, tapi static untuk produk */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 space-y-4 text-center md:mb-14"
        >
          <h2 className="font-serif text-3xl tracking-tight text-[var(--lb-bleu)] md:text-4xl">
            Sprezzatura with every Spritz
          </h2>
          <div className="bg-[var(--lb-bleu)]/20 mx-auto my-4 h-[1px] w-12" />
          <p
            className={cn(
              'mx-auto max-w-2xl font-light leading-relaxed tracking-wide text-[var(--lb-neutral)]',
              'text-xs md:text-sm'
            )}
          >
            Lazain Bleu combines Andalusian elegance with Parisian perfumery art.
            <br className="hidden md:block" />
            Our fragrances embody timeless beauty to create an incomparably luxurious
            experience.
          </p>
        </motion.div>

        {/* --- Product Grid --- */}
        <div
          className={cn(
            // Mobile: Horizontal Scroll Snap
            'scrollbar-hide -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-6',
            // Desktop: Grid Layout
            'md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 lg:gap-8'
          )}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* --- Marketplace Button --- */}
        <div
          className={cn(
            'text-center',
            'mt-10', // Mobile: Jarak diperkecil (sebelumnya 12/20)
            'md:mt-16' // Desktop: Jarak diperkecil (sebelumnya 24)
          )}
        >
          <a
            href="https://shopee.co.id/lazainbleu"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group relative inline-flex items-center justify-center overflow-hidden border border-[var(--lb-bleu)]',
              'px-10 py-3.5',
              'md:px-12 md:py-4',
              'transition-all duration-300 active:scale-95' // Removed shadow on hover for cleaner look
            )}
          >
            {/* Hover Fill Effect */}
            <span className="absolute inset-0 h-full w-full translate-y-full bg-[var(--lb-bleu)] transition-transform duration-500 ease-out group-hover:translate-y-0" />

            {/* Button Text */}
            <span
              className={cn(
                'relative z-10 flex items-center gap-2 font-bold uppercase tracking-[0.25em] text-[var(--lb-bleu)] transition-colors duration-500 group-hover:text-[var(--lb-white)] md:gap-3',
                'text-[9px] md:text-[10px]'
              )}
            >
              Discover Us on Marketplace
              <svg
                className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

// --- Sub-component: Static & Performant ---
function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block min-w-[280px] flex-shrink-0 snap-center md:min-w-0"
    >
      <div className="flex h-full flex-col">
        {/* Image Frame */}
        <div
          className={cn(
            'relative mb-4 aspect-[4/5] overflow-hidden bg-white',
            'border border-[var(--lb-border)]',
            'group-hover:border-[var(--lb-bleu)]/30 transition-colors duration-300'
          )}
        >
          {/* Badge */}
          {product.isNew && (
            <span className="absolute left-3 top-3 z-20 bg-[var(--lb-bleu)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--lb-white)]">
              New
            </span>
          )}

          {/* Image 1 (Default) */}
          <div className="absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-500 group-hover:opacity-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-contain p-2 mix-blend-multiply"
            />
          </div>

          {/* Image 2 (Hover) */}
          <div className="absolute inset-0 flex scale-105 items-center justify-center p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <Image
              src={product.hoverImage || product.image}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-contain p-2 mix-blend-multiply"
            />
          </div>

          {/* Quick Action Button - Muncul Smooth */}
          <div className="absolute bottom-4 right-4 z-20 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="hover:bg-[var(--lb-bleu)]/90 rounded-full bg-[var(--lb-bleu)] p-2.5 text-white shadow-md">
              <IconShoppingBag size={16} stroke={1.5} />
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="mt-auto space-y-1 px-1 text-center md:text-left">
          <h3
            className={cn(
              'text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)] transition-colors',
              'group-hover:text-[var(--lb-bleu)]/80'
            )}
          >
            {product.name}
          </h3>

          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            {product.type && (
              <p className="text-[var(--lb-neutral)]/80 text-[9px] font-light uppercase tracking-widest">
                {product.type}
              </p>
            )}
            <p className="text-[12px] font-medium text-[var(--lb-bleu)]">
              {product.price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
