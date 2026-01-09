// Product Types for E-commerce

export type Product = {
  id: string
  name: string
  slug: string
  price: number // in cents (IDR)
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
  price: number
  quantity: number
  image: string
  stock: number
}
