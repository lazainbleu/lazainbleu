import type { Product } from '@/types/product'

// Dummy product data - 8 luxury perfume products
export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Bleu Noir Eau de Parfum',
    slug: 'bleu-noir-edp',
    price: 1599000,
    description:
      'A sophisticated blend of bergamot, black pepper, and oud wood. Bleu Noir captures the essence of midnight elegance with its deep, mysterious character. The fragrance opens with fresh citrus notes that gradually reveal a warm, spicy heart before settling into a rich, woody base that lingers throughout the day.',
    shortDescription: 'Mysterious oud & bergamot blend',
    images: ['/images/products/bleu-noir-1.jpg', '/images/products/bleu-noir-2.jpg'],
    stock: 15,
    category: 'Eau de Parfum',
    featured: true,
  },
  {
    id: 'prod-002',
    name: 'Eau Fraîche Légère',
    slug: 'eau-fraiche-legere',
    price: 1250000,
    description:
      'A light, refreshing fragrance perfect for everyday wear. Eau Fraîche Légère combines crisp green apple, cucumber, and white tea for an invigorating experience. The delicate floral heart of jasmine and lily of the valley adds femininity, while a base of musk and cedar provides lasting freshness.',
    shortDescription: 'Fresh citrus & white tea',
    images: ['/images/products/eau-fraiche-1.jpg', '/images/products/eau-fraiche-2.jpg'],
    stock: 22,
    category: 'Eau de Toilette',
    featured: true,
  },
  {
    id: 'prod-003',
    name: 'Velvet Rose Intense',
    slug: 'velvet-rose-intense',
    price: 1850000,
    description:
      'An opulent floral fragrance centered around the finest Damascus rose. Velvet Rose Intense opens with sparkling pink pepper and saffron, leading to a heart of rose absolute and geranium. The base features warm amber, sandalwood, and a hint of vanilla for an unforgettable finish.',
    shortDescription: 'Luxurious Damascus rose & saffron',
    images: ['/images/products/velvet-rose-1.jpg', '/images/products/velvet-rose-2.jpg'],
    stock: 8,
    category: 'Eau de Parfum',
    featured: true,
  },
  {
    id: 'prod-004',
    name: 'Amber Mystique',
    slug: 'amber-mystique',
    price: 1450000,
    description:
      'A warm, sensual fragrance built around precious amber. Amber Mystique features top notes of cardamom and pink pepper, a heart of labdanum and benzoin, and a base of vanilla, sandalwood, and golden amber. Perfect for evening occasions and intimate moments.',
    shortDescription: 'Warm amber & vanilla embrace',
    images: [
      '/images/products/amber-mystique-1.jpg',
      '/images/products/amber-mystique-2.jpg',
    ],
    stock: 12,
    category: 'Eau de Parfum',
  },
  {
    id: 'prod-005',
    name: 'Citrus Soleil',
    slug: 'citrus-soleil',
    price: 980000,
    description:
      'Capture the essence of a Mediterranean summer with Citrus Soleil. This vibrant fragrance bursts open with Sicilian lemon, bergamot, and grapefruit. A heart of neroli and orange blossom adds elegance, while white musk and driftwood complete this sun-kissed composition.',
    shortDescription: 'Mediterranean citrus sunshine',
    images: [
      '/images/products/citrus-soleil-1.jpg',
      '/images/products/citrus-soleil-2.jpg',
    ],
    stock: 25,
    category: 'Eau de Toilette',
  },
  {
    id: 'prod-006',
    name: 'Oud Royale',
    slug: 'oud-royale',
    price: 2450000,
    description:
      'The pinnacle of luxury fragrance. Oud Royale showcases the finest Laotian oud, enriched with Turkish rose and Somali frankincense. The opening features saffron and cinnamon, leading to a majestic heart of oud and rose. A base of musk, amber, and sandalwood ensures lasting magnificence.',
    shortDescription: 'Rare Laotian oud & Turkish rose',
    images: ['/images/products/oud-royale-1.jpg', '/images/products/oud-royale-2.jpg'],
    stock: 5,
    category: 'Parfum',
    featured: true,
  },
  {
    id: 'prod-007',
    name: 'White Jasmine Dreams',
    slug: 'white-jasmine-dreams',
    price: 1350000,
    description:
      'A ethereal floral fragrance celebrating the beauty of night-blooming jasmine. White Jasmine Dreams opens with pear and mandarin, revealing a heart of jasmine sambac and tuberose. The composition rests on a bed of white musk, cedarwood, and a whisper of vanilla.',
    shortDescription: 'Ethereal jasmine & tuberose',
    images: [
      '/images/products/white-jasmine-1.jpg',
      '/images/products/white-jasmine-2.jpg',
    ],
    stock: 0, // Out of stock for testing
    category: 'Eau de Parfum',
  },
  {
    id: 'prod-008',
    name: 'Bois de Minuit',
    slug: 'bois-de-minuit',
    price: 1750000,
    description:
      'A sophisticated woody fragrance for the modern connoisseur. Bois de Minuit opens with black pepper and juniper, progressing to a heart of vetiver and iris. The base features Haitian vetiver, Indonesian patchouli, and Mysore sandalwood for unparalleled depth.',
    shortDescription: 'Refined vetiver & sandalwood',
    images: ['/images/products/bois-minuit-1.jpg', '/images/products/bois-minuit-2.jpg'],
    stock: 10,
    category: 'Eau de Parfum',
  },
]

// Fetch functions
export async function getAllProducts(): Promise<Product[]> {
  // Simulate network delay for realistic loading states
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return products.find((p) => p.slug === slug)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter((p) => p.featured)
}

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceInCents)
}
