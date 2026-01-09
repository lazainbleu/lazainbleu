import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  IconArrowLeft,
  IconTruck,
  IconRefresh,
  IconShieldCheck,
} from '@tabler/icons-react'
import { getProductBySlug, getAllProducts, formatPrice } from '@/lib/products'
import { ProductImage } from '@/components/product/ProductImage'
import { AddToCartButton } from '@/components/product/AddToCartButton'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Lazain Bleu`,
      description: product.shortDescription,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const isOutOfStock = product.stock === 0

  return (
    <main className="min-h-screen bg-white">
      <div className="container-lb py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <IconArrowLeft size={16} />
            Back to Shop
          </Link>
        </nav>

        {/* Product Content */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className={isOutOfStock ? 'opacity-60' : ''}>
              <ProductImage
                src={product.images[0]}
                alt={product.name}
                className="aspect-square w-full"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-lg border-2 transition-colors ${
                      index === 0
                        ? 'border-neutral-900'
                        : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <ProductImage
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="aspect-square"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            {/* Category */}
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-neutral-400">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="mb-4 text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mb-6 text-2xl font-semibold text-neutral-900">
              {formatPrice(product.price)}
            </p>

            {/* Stock Status */}
            {isOutOfStock ? (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Out of Stock
              </div>
            ) : (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                In Stock ({product.stock} available)
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-3 font-medium text-neutral-900">Description</h2>
              <p className="leading-relaxed text-neutral-600">{product.description}</p>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <AddToCartButton product={product} />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-4 border-t border-neutral-100 pt-8 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                  <IconTruck size={20} className="text-neutral-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Free Shipping</p>
                  <p className="text-xs text-neutral-500">Orders over Rp500.000</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                  <IconRefresh size={20} className="text-neutral-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Easy Returns</p>
                  <p className="text-xs text-neutral-500">14-day return policy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                  <IconShieldCheck size={20} className="text-neutral-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Authentic</p>
                  <p className="text-xs text-neutral-500">100% genuine products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
