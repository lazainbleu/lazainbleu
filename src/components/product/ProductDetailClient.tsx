'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  IconArrowLeft,
  IconTruck,
  IconRefresh,
  IconShieldCheck,
} from '@tabler/icons-react'

import { ProductImage } from '@/components/product/ProductImage'
import { AddToCartButton } from '@/components/product/AddToCartButton'
import { formatPrice } from '@/lib/products'

export default function ProductDetailClient({ product, isOutOfStock }: any) {
  const [selectedImage, setSelectedImage] = useState(product.images[0])

  let touchStartX = 0

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX

    if (diff > 50) handleSwipe('right')
    if (diff < -50) handleSwipe('left')
  }

  const handleSwipe = (dir: 'left' | 'right') => {
    const index = product.images.indexOf(selectedImage)

    if (dir === 'left') {
      const next = (index + 1) % product.images.length
      setSelectedImage(product.images[next])
    } else {
      const prev = (index - 1 + product.images.length) % product.images.length
      setSelectedImage(product.images[prev])
    }
  }

  return (
    <main className="min-h-screen bg-[var(--lb-white)]">
      <div className="container-lb py-6 md:py-10 lg:py-12">
        <nav className="mb-6 md:mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-[var(--lb-neutral)] hover:text-[var(--lb-bleu)]"
          >
            <IconArrowLeft size={16} />
            Back to Shop
          </Link>
        </nav>

        <div className="grid gap-10 md:gap-12 lg:grid-cols-2">
          <div className="space-y-3 md:space-y-4">
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className={isOutOfStock ? 'opacity-50' : ''}
            >
              <ProductImage
                src={selectedImage}
                alt={product.name}
                className="aspect-square w-full rounded-xl"
                priority
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                {product.images.map((img: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`cursor-pointer rounded-lg border-2 transition ${
                      selectedImage === img
                        ? 'border-[var(--lb-bleu)]'
                        : 'border-transparent hover:border-[var(--lb-border)]'
                    }`}
                  >
                    <ProductImage
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="aspect-square rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 md:pt-4 lg:pt-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--lb-neutral)] md:text-sm">
              {product.category}
            </p>

            <h1 className="mb-4 text-2xl font-light tracking-tight text-[var(--lb-bleu)] md:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            <p className="mb-5 text-xl font-semibold text-[var(--lb-bleu)] md:mb-6 md:text-2xl">
              {formatPrice(product.price)}
            </p>

            {isOutOfStock ? (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-medium text-red-600 md:mb-6 md:text-sm">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Out of Stock
              </div>
            ) : (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-medium text-green-600 md:mb-6 md:text-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                In Stock ({product.stock} available)
              </div>
            )}

            <div className="mb-8">
              <h2 className="mb-2 text-base font-medium text-[var(--lb-bleu)] md:mb-3 md:text-lg">
                Description
              </h2>
              <p className="text-sm leading-relaxed text-[var(--lb-neutral)] md:text-base">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <AddToCartButton product={product} />
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-[var(--lb-border)] pt-6 sm:grid-cols-3 md:pt-8">
              {[
                {
                  icon: <IconTruck size={20} />,
                  title: 'Free Shipping',
                  desc: 'Orders over Rp500.000',
                },
                {
                  icon: <IconRefresh size={20} />,
                  title: 'Easy Returns',
                  desc: '14-day return policy',
                },
                {
                  icon: <IconShieldCheck size={20} />,
                  title: 'Authentic',
                  desc: '100% genuine products',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--lb-border)] bg-[var(--lb-white)]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--lb-bleu)]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[var(--lb-neutral)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
