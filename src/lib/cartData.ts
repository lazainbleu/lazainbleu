import type { CartItemType } from '@/components/cart/CartItem'

export const getInitialCart = (): CartItemType[] => [
  {
    id: 'prod-1',
    name: 'Lazain Bleu Eau de Parfum',
    variant: '50ml',
    priceCents: 1599000,
    quantity: 1,
    image: '/images/parfum-50ml.jpg',
  },
  {
    id: 'prod-2',
    name: 'Lazain Bleu Body Lotion',
    variant: '200ml',
    priceCents: 890000,
    quantity: 2,
    image: '/images/body-lotion.jpg',
  },
]
