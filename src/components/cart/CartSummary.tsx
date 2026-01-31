'use client'

import React, { useMemo } from 'react'

import { ShoppingCart } from 'lucide-react'
import { formatPrice } from '@/lib/products'

import type { CartItemType } from './CartItem'

type Props = {
  items: CartItemType[]
  currency?: string // e.g. "IDR"
  locale?: string // e.g. "id-ID"
  shippingCents?: number // fixed shipping cost in IDR (optional)
  freeShippingThresholdCents?: number | null // threshold for free shipping in IDR
  onCheckout?: () => void
  onApplyCoupon?: (code: string) => Promise<{ success: boolean; message?: string }>
}

export default function CartSummary({
  items,
  currency = 'IDR',
  locale = 'id-ID',
  shippingCents = 0,
  freeShippingThresholdCents = null,
  onCheckout,
  onApplyCoupon,
}: Props) {
  const subtotal = useMemo(() => {
    // sum digit-by-digit (integer arithmetic)
    let acc = 0
    for (let i = 0; i < items.length; i++) {
      acc += items[i].priceCents * items[i].quantity
    }
    return acc
  }, [items])

  const shipping = useMemo(() => {
    if (freeShippingThresholdCents !== null && subtotal >= freeShippingThresholdCents)
      return 0
    return shippingCents
  }, [subtotal, shippingCents, freeShippingThresholdCents])

  const total = useMemo(() => subtotal + shipping, [subtotal, shipping])

  return (
    <aside className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-md bg-neutral-50 p-2">
          <ShoppingCart size={18} />
        </div>
        <div>
          <div className="text-sm text-neutral-500">Ringkasan pesanan</div>
          <div className="text-xs text-neutral-400">{items.length} item</div>
        </div>
      </div>

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-neutral-600">Subtotal</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-neutral-600">Biaya kirim</dt>
          <dd className="font-medium">{formatPrice(shipping)}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-neutral-600">Diskon</dt>
          <dd className="font-medium text-emerald-600">- {formatPrice(0)}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-neutral-100 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-neutral-600">Total</div>
          <div className="text-lg font-semibold">{formatPrice(total)}</div>
        </div>

        <button
          onClick={() => onCheckout?.()}
          disabled={items.length === 0}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 py-3 text-sm font-medium text-white hover:opacity-95 disabled:opacity-60"
        >
          Checkout
        </button>

        <div className="mt-3 text-xs text-neutral-500">
          {freeShippingThresholdCents && subtotal < freeShippingThresholdCents ? (
            <div>
              Tambah {formatPrice(freeShippingThresholdCents - subtotal)} lagi untuk
              gratis ongkir.
            </div>
          ) : (
            <div>Estimasi pengiriman akan dihitung saat checkout.</div>
          )}
        </div>
      </div>
    </aside>
  )
}
