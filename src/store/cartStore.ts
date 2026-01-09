import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/product'

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)

          if (existingItem) {
            // Update quantity if item exists
            const newQuantity = existingItem.quantity + item.quantity
            // Don't exceed stock
            const finalQuantity = Math.min(newQuantity, item.stock)

            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: finalQuantity } : i
              ),
            }
          }

          // Add new item
          return {
            items: [...state.items, item],
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            return {
              items: state.items.filter((i) => i.id !== id),
            }
          }

          return {
            items: state.items.map((i) => {
              if (i.id === id) {
                // Don't exceed stock
                const finalQuantity = Math.min(quantity, i.stock)
                return { ...i, quantity: finalQuantity }
              }
              return i
            }),
          }
        }),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((total, i) => total + i.quantity, 0),

      totalPrice: () => get().items.reduce((total, i) => total + i.price * i.quantity, 0),
    }),
    {
      name: 'lazainbleu-cart',
    }
  )
)
