'use client'

import { useState } from 'react'
import { IconShoppingCart, IconCheck, IconMinus, IconPlus } from '@tabler/icons-react'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types/product'
import { cn } from '@/lib/utils'

type AddToCartButtonProps = {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addItem, items } = useCartStore()

  const isOutOfStock = product.stock === 0
  const cartItem = items.find((item) => item.id === product.id)
  const currentInCart = cartItem?.quantity || 0
  const availableStock = product.stock - currentInCart
  const canAddMore = availableStock > 0

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQty = prev + delta
      if (newQty < 1) return 1
      if (newQty > availableStock) return availableStock
      return newQty
    })
  }

  const handleAddToCart = async () => {
    if (isOutOfStock || !canAddMore || isAdding) return

    setIsAdding(true)

    // Simulate slight delay for better UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300))

    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity,
      image: product.images[0],
      stock: product.stock,
    })

    setShowSuccess(true)
    setIsAdding(false)
    setQuantity(1)

    // Reset success state after animation
    setTimeout(() => setShowSuccess(false), 2000)
  }

  if (isOutOfStock) {
    return (
      <button
        disabled
        className={cn(
          'flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-neutral-200 px-6 py-4 font-medium text-neutral-400',
          className
        )}
      >
        Out of Stock
      </button>
    )
  }

  if (!canAddMore) {
    return (
      <button
        disabled
        className={cn(
          'flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-neutral-200 px-6 py-4 font-medium text-neutral-400',
          className
        )}
      >
        Maximum quantity in cart
      </button>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Quantity Selector */}
      <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-2">
        <span className="pl-2 text-sm text-neutral-500">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconMinus size={16} />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= availableStock}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconPlus size={16} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-medium transition-all duration-300',
          showSuccess
            ? 'bg-green-500 text-white'
            : 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98]',
          isAdding && 'cursor-wait opacity-80'
        )}
      >
        {isAdding ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Adding...
          </>
        ) : showSuccess ? (
          <>
            <IconCheck size={20} />
            Added to Cart
          </>
        ) : (
          <>
            <IconShoppingCart size={20} />
            Add to Cart
          </>
        )}
      </button>

      {/* Stock Warning */}
      {availableStock <= 5 && (
        <p className="text-center text-sm text-amber-600">
          Only {availableStock} available
        </p>
      )}
    </div>
  )
}
