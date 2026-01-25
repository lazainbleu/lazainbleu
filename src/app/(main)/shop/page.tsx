import type { Metadata } from 'next'
import { getAllProducts } from '@/lib/products'
import { ProductGrid } from '@/components/product/ProductGrid'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Explore our collection of premium luxury fragrances. From fresh citrus to deep oud, find your signature scent.',
  openGraph: {
    title: 'Shop | Lazain Bleu',
    description: 'Explore our collection of premium luxury fragrances.',
  },
}

export default async function ShopPage() {
  const products = await getAllProducts()

  return (
    <main className="min-h-screen bg-[var(--lb-white)]">
      {/* Hero Section */}
      <section className="border-b border-[var(--lb-border)] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-lb">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-3 text-3xl font-light uppercase tracking-tight text-[var(--lb-bleu)] sm:text-4xl md:text-5xl lg:text-6xl">
              Our Collection
            </h1>

            <p className="text-sm font-light text-[var(--lb-neutral)] sm:text-base md:text-lg">
              Discover luxury fragrances crafted with the finest ingredients from around
              the world.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container-lb">
          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between border-b border-[var(--lb-border)] pb-3 sm:mb-8 sm:pb-4">
            <p className="text-[10px] uppercase tracking-widest text-[var(--lb-neutral)] sm:text-xs">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Product Grid */}
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  )
}
