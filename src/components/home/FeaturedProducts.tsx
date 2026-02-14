'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IconShoppingBag } from '@tabler/icons-react'
import LuxuryButton from '@/components/ui/LuxuryButton'

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

const products: Product[] = [
  {
    id: '1',
    name: 'Tom Ford Ombré Leather',
    type: 'EAU DE PARFUM',
    price: 'IDR 3.499.999',
    image: '/images/products/tom-ford1.png',
    hoverImage: '/images/products/tom-ford2.png',
    slug: 'tom-ford-ombre-leather',
    isNew: false,
  },
  {
    id: '2',
    name: 'Lazain Bleu',
    type: 'LIMITED COLLECTION',
    price: 'IDR —.000',
    image: '/images/products/lazain-bleu.png',
    hoverImage: '/coming-soon.png',
    slug: 'discovery-set',
    isNew: true,
  },
  {
    id: '3',
    name: 'Creed Aventus',
    type: 'EAU DE PARFUM',
    price: 'IDR 7.399.999',
    image: '/images/products/creed-aventus1.png',
    hoverImage: '/images/products/creed-aventus2.png',
    slug: 'creed-aventus-2010',
    isNew: false,
  },
  {
    id: '4',
    name: 'Lattafa Khamrah',
    type: 'EAU DE PARFUM',
    price: 'IDR 499.999',
    image: '/images/products/lattafa-khamrah1.png',
    hoverImage: '/images/products/lattafa-khamrah2.png',
    slug: 'lattafa-khamrah',
    isNew: false,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="bg-[var(--lb-white)] px-4 py-16 selection:bg-[var(--lb-bleu)] selection:text-[var(--lb-white)] md:py-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 space-y-4 text-center md:mb-14"
        >
          <h2 className="font-serif text-3xl tracking-tight text-[var(--lb-bleu)] md:text-4xl">
            Effortless Elegance in Every Scent
          </h2>
          <div className="bg-[var(--lb-bleu)]/20 mx-auto my-4 h-[1px] w-12" />
          <p className="mx-auto max-w-2xl text-xs font-light leading-relaxed tracking-wide text-[var(--lb-neutral)] md:text-sm">
            Lazain Bleu blends Andalusian grace with Parisian craftsmanship.
            <br className="hidden md:block" />
            Each fragrance is a quiet testament to timeless refinement and contemporary
            luxury.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-6 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Marketplace Button - Updated with LuxuryButton */}
        <div className="mt-10 text-center md:mt-16">
          <LuxuryButton
            href="https://shopee.co.id/lazainbleu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12"
          >
            <span className="flex items-center justify-center gap-3">
              Discover Us on Marketplace
            </span>
          </LuxuryButton>
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

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block min-w-[280px] flex-shrink-0 snap-center md:min-w-0"
    >
      <div className="flex h-full flex-col">
        <div className="group-hover:border-[var(--lb-bleu)]/30 relative mb-4 aspect-[4/5] overflow-hidden border border-[var(--lb-border)] bg-[var(--lb-white)] transition-colors duration-300">
          {product.isNew && (
            <span className="absolute left-3 top-3 z-20 bg-[var(--lb-bleu)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--lb-white)]">
              New
            </span>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <Image
              src={product.hoverImage || product.image}
              alt={`${product.name} hover`}
              fill
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </motion.div>

          <div className="absolute bottom-4 right-4 z-20 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="hover:bg-[var(--lb-bleu)]/90 rounded-full bg-[var(--lb-bleu)] p-2.5 text-white shadow-md">
              <IconShoppingBag size={16} stroke={1.5} />
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-1 px-1 text-center md:text-left">
          <h3 className="group-hover:text-[var(--lb-bleu)]/80 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)]">
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
