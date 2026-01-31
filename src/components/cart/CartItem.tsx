'use client'

import React, { useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/products'

export type CartItemType = {
  id: string
  name: string
  image?: string // public path or external url supported by next/image config
  variant?: string | null
  priceCents: number // price in IDR (e.g., 1599000 for Rp 1.599.000)
  quantity: number
}

type Props = {
  item: CartItemType
  onQuantityChange: (id: string, newQty: number) => void
  onRemove: (id: string) => void
  minQty?: number
  maxQty?: number
}

function CartItemComponent({
  item,
  onQuantityChange,
  onRemove,
  minQty = 1,
  maxQty = 99,
}: Props) {
  const handleDecrease = useCallback(() => {
    const next = Math.max(minQty, item.quantity - 1)
    if (next !== item.quantity) onQuantityChange(item.id, next)
  }, [item, minQty, onQuantityChange])

  const handleIncrease = useCallback(() => {
    const next = Math.min(maxQty, item.quantity + 1)
    if (next !== item.quantity) onQuantityChange(item.id, next)
  }, [item, maxQty, onQuantityChange])

  const handleRemove = useCallback(() => onRemove(item.id), [item.id, onRemove])

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="flex items-start gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
    >
      <div className="relative h-[84px] w-[84px] flex-none overflow-hidden rounded-md bg-neutral-50">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="84px"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            No image
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="truncate">
            <div className="truncate text-sm font-medium text-neutral-900">
              {item.name}
            </div>
            {item.variant && (
              <div className="mt-1 text-xs text-neutral-500">{item.variant}</div>
            )}
          </div>

          <div className="text-sm font-medium text-neutral-900">
            {formatPrice(item.priceCents)}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              aria-label={`Kurangi jumlah ${item.name}`}
              onClick={handleDecrease}
              className="inline-grid h-8 w-8 place-items-center rounded-md border border-neutral-200 text-sm disabled:opacity-40"
              disabled={item.quantity <= minQty}
            >
              –
            </button>

            <input
              aria-label={`Jumlah ${item.name}`}
              value={item.quantity}
              onChange={(e) => {
                const v = Number(e.target.value || 0)
                if (!Number.isFinite(v)) return
                const clamped = Math.max(minQty, Math.min(maxQty, Math.floor(v)))
                if (clamped !== item.quantity) onQuantityChange(item.id, clamped)
              }}
              type="number"
              min={minQty}
              max={maxQty}
              className="w-14 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1 text-center text-sm"
            />

            <button
              aria-label={`Tambah jumlah ${item.name}`}
              onClick={handleIncrease}
              className="inline-grid h-8 w-8 place-items-center rounded-md border border-neutral-200 text-sm"
              disabled={item.quantity >= maxQty}
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-neutral-600">
              {formatPrice(item.priceCents * item.quantity)}
            </div>
            <button
              aria-label={`Hapus ${item.name}`}
              onClick={handleRemove}
              className="rounded-md p-2 hover:bg-neutral-100"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  )
}

export default React.memo(CartItemComponent)
