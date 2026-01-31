import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { getProductBySlug, getAllProducts, formatPrice } from '@/lib/products'
import ProductDetailClient from '@/components/product/ProductDetail'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return { title: 'Product Not Found' }

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

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const isOutOfStock = product.stock === 0

  return <ProductDetailClient product={product} isOutOfStock={isOutOfStock} />
}
