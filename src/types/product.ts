// Product Types for E-commerce

export type Product = {
  id: string
  name: string
  slug: string
  price: number
  description: string
  shortDescription: string
  images: string[]
  stock: number
  category: string
  featured?: boolean
}

export type CartItem = {
  id: string
  name: string
  slug: string
  price: number // in IDR
  quantity: number
  image: string
  stock: number
}
