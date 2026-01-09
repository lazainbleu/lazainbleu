import type { Product } from '@/types/product'
import { ProductCard } from '@/components/product/ProductCard'

type ProductGridProps = {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-neutral-50">
        <div className="text-center">
          <div className="mb-4 text-5xl">🔍</div>
          <h3 className="mb-2 text-lg font-medium text-neutral-900">No products found</h3>
          <p className="text-neutral-500">Check back later for new arrivals</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
