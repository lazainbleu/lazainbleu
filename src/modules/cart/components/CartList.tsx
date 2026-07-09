'use client'

import React, { useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CartItem, { CartItemType } from './CartItem'

type Props = {
  items: CartItemType[]
  onQuantityChange: (id: string, qty: number) => void
  onRemove: (id: string) => void
  emptyCTA?: React.ReactNode
}

function CartList({ items, onQuantityChange, onRemove, emptyCTA }: Props) {
  const handleQty = useCallback(
    (id: string, qty: number) => onQuantityChange(id, qty),
    [onQuantityChange]
  )
  const handleRemove = useCallback((id: string) => onRemove(id), [onRemove])

  if (!items || items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-200 p-8 text-center text-neutral-600">
        <div className="mb-2 text-lg font-medium">Keranjang kosong</div>
        <div className="text-sm">{emptyCTA ?? 'Tambahkan produk ke keranjang Anda.'}</div>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {items.map((it) => (
          <motion.div key={it.id} layout>
            <CartItem item={it} onQuantityChange={handleQty} onRemove={handleRemove} />
          </motion.div>
        ))}
      </AnimatePresence>
    </ul>
  )
}

export default React.memo(CartList)
