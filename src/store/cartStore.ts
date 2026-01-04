import { create } from 'zustand'

type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  image: string
}

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

// DUMMY
const dummyItems: CartItem[] = [
  {
    id: 'p1',
    name: 'Bleu Noir 50ml',
    price: 450000,
    qty: 1,
    image: '/images/perfume1.jpg',
  },
  {
    id: 'p2',
    name: 'Eau Fraiche 100ml',
    price: 650000,
    qty: 2,
    image: '/images/perfume2.jpg',
  },
]

export const useCartStore = create<CartStore>((set, get) => ({
  items: dummyItems, // inject dummy

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((total, i) => total + i.qty, 0),

  totalPrice: () => get().items.reduce((total, i) => total + i.price * i.qty, 0),
}))
