'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type ProductImageProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

export function ProductImage({
  src,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden rounded-xl bg-neutral-100',
        className
      )}
    >
      {hasError ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
          <div className="text-center">
            <div className="mb-2 text-4xl">🌸</div>
            <span className="text-xs text-neutral-400">Image unavailable</span>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            'object-cover transition-all duration-500 group-hover:scale-105',
            isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}

      {/* Loading overlay */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-100 to-neutral-200" />
      )}
    </div>
  )
}
