import type { CartItemType } from '@/components/cart/CartItem'

export const getInitialCart = (): CartItemType[] => [
  {
    id: 'prod-001',
    name: 'Creed Aventus (2010)',
    variant: '100ml', // bisa disesuaikan kalau mau
    priceCents: 7399999,
    quantity: 1,
    image: '/images/products/creed-aventus1.png',
  },
  {
    id: 'prod-002',
    name: 'Tom Ford Ombre Leather',
    variant: '100ml',
    priceCents: 3499999,
    quantity: 1,
    image: '/images/products/tom-ford1.png',
  },
]
