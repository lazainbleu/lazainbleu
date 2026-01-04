'use client'

import { useState, useCallback } from 'react'
import CartList from './CartList'
import CartSummary from './CartSummary'
import { CartItemType } from './CartItem' // <--- fix di sini
import { getInitialCart } from '@/lib/cartData'

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(getInitialCart())

  const handleQuantityChange = useCallback((id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    )
  }, [])

  const handleRemove = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const handleCheckout = useCallback(() => {
    if (!cartItems.length) return
    alert('Proceeding to checkout...')
  }, [cartItems])

  return (
    <main className="container mx-auto flex min-h-[70vh] flex-col gap-8 p-4 md:flex-row">
      <section className="flex-1">
        <h1 className="mb-6 text-2xl font-bold">Keranjang Belanja</h1>
        <CartList
          items={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      </section>

      <section className="w-full flex-shrink-0 md:w-[360px]">
        <CartSummary
          items={cartItems}
          shippingCents={25000}
          freeShippingThresholdCents={2000000}
          onCheckout={handleCheckout}
        />
      </section>
    </main>
  )
}
