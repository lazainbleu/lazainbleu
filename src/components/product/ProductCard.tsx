import Link from 'next/link'
import type { Product } from '@/types/product'
import { ProductImage } from './ProductImage'
import { formatPrice } from '@/lib/products'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-[var(--lb-white)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Out of Stock Badge */}
      {isOutOfStock && (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-[var(--lb-bleu)] px-2 py-0.5 text-[10px] font-medium text-[var(--lb-white)] md:left-3 md:top-3 md:px-3 md:py-1 md:text-xs">
          Out of Stock
        </div>
      )}

      {/* Featured Badge */}
      {product.featured && !isOutOfStock && (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-[var(--lb-bleu)] px-2 py-0.5 text-[10px] font-medium text-[var(--lb-white)] md:left-3 md:top-3 md:px-3 md:py-1 md:text-xs">
          Featured
        </div>
      )}

      {/* Product Image */}
      <div className={isOutOfStock ? 'opacity-60' : ''}>
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          className="aspect-[4/5]"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4">
        {/* Category */}
        <p className="mb-1 truncate text-[10px] font-medium uppercase tracking-wider text-[var(--lb-neutral)] md:text-xs">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="group-hover:text-[var(--lb-bleu)]/70 mb-1 line-clamp-2 text-sm font-medium text-[var(--lb-bleu)] transition-colors md:mb-2 md:text-base">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mb-2 line-clamp-2 text-xs text-[var(--lb-neutral)] md:mb-3 md:text-sm">
          {product.shortDescription}
        </p>

        {/* Price */}
        <p className="text-xs font-medium text-[var(--lb-bleu)] md:text-sm">
          {formatPrice(product.price)}
        </p>

        {/* Stock Indicator */}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="mt-1 text-[10px] text-amber-600 md:mt-2 md:text-xs">
            Only {product.stock} left
          </p>
        )}
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-[var(--lb-border)]" />
    </Link>
  )
}
