import type { Product } from '@/types/product'

// Dummy product data - 8 luxury perfume products
export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Creed Aventus (2010)',
    slug: 'creed-aventus-2010',
    price: 7399999,
    description:
      'Creed Aventus (2010) is a legendary niche fragrance featuring pineapple, birch, and musk. Known for its bold projection and masculine elegance, Aventus remains one of the most influential perfumes in modern fragrance history.',
    shortDescription: 'Iconic pineapple, birch & musk',
    images: [
      '/images/products/creed-aventus1.png',
      '/images/products/creed-aventus2.png',
    ],
    stock: 1,
    category: 'Eau de Parfum',
    featured: true,
  },
  {
    id: 'prod-002',
    name: 'Tom Ford Ombre Leather',
    slug: 'tom-ford-ombre-leather',
    price: 3499999,
    description:
      'Tom Ford Ombre Leather delivers a smooth blend of black leather, cardamom, and jasmine sambac. Deep, addictive, and effortlessly luxurious with a signature warm leather finish.',
    shortDescription: 'Smooth leather with warm spice',
    images: ['/images/products/tom-ford1.png', '/images/products/tom-ford2.png'],
    stock: 0,
    category: 'Eau de Parfum',
    featured: true,
  },
  {
    id: 'prod-003',
    name: 'Dior Homme Intense (DHI)',
    slug: 'dior-homme-intense',
    price: 2799999,
    description:
      'Dior Homme Intense is an elegant masculine iris fragrance with lavender, ambrette, and cedar. Smooth, seductive, and widely considered one of Dior’s best masculine releases.',
    shortDescription: 'Elegant iris, lavender & cedar',
    images: ['/images/products/dhi2.png', '/images/products/dhi2.png'],
    stock: 0,
    category: 'Eau de Parfum',
  },
  {
    id: 'prod-004',
    name: 'Roja Parfums Elysium Parfum Cologne',
    slug: 'roja-elysium-parfum-cologne',
    price: 5699999,
    description:
      'Roja Elysium Parfum Cologne offers a bright, modern blend of grapefruit, juniper berry, vetiver, and ambergris. A luxurious fresh fragrance with exceptional smoothness and clarity.',
    shortDescription: 'Lux fresh citrus & vetiver blend',
    images: ['/images/products/elysium-1.png', '/images/products/elysium-2.png'],
    stock: 0,
    category: 'Parfum Cologne',
    featured: true,
  },
  {
    id: 'prod-005',
    name: 'Lattafa Khamrah',
    slug: 'lattafa-khamrah',
    price: 499999,
    description:
      'Lattafa Khamrah is a viral cinnamon-vanilla gourmand fragrance with exceptional sweetness and strong projection. Perfect for evening wear and cold weather.',
    shortDescription: 'Sweet cinnamon vanilla gourmand',
    images: [
      '/images/products/lattafa-khamrah1.png',
      '/images/products/lattafa-khamrah2.png',
    ],
    stock: 0,
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

export function formatPrice(price: number): string {
  const formatted = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
  return `IDR ${formatted}`
}
