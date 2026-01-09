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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24">
        <div className="container-lb">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-light tracking-tight text-neutral-900 md:text-5xl">
              Our Collection
            </h1>
            <p className="text-lg text-neutral-500">
              Discover luxury fragrances crafted with the finest ingredients from around
              the world.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16">
        <div className="container-lb">
          {/* Results Count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-neutral-500">
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
