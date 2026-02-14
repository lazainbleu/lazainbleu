'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LuxuryButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'outline' | 'solid'
  target?: string
  rel?: string
}

const LuxuryButton = ({
  children,
  href,
  onClick,
  className,
  variant = 'outline',
  target,
  rel,
}: LuxuryButtonProps) => {
  const baseStyles = cn(
    'inline-block px-10 py-4 text-[10px] font-medium uppercase tracking-[0.3em] transition-all duration-500 ease-out text-center',
    variant === 'outline'
      ? 'border border-[var(--lb-bleu)] text-[var(--lb-bleu)] hover:bg-[var(--lb-bleu)] hover:text-[var(--lb-white)]'
      : 'bg-[var(--lb-bleu)] text-[var(--lb-white)] border border-[var(--lb-bleu)] hover:bg-transparent hover:text-[var(--lb-bleu)]',
    className
  )

  if (href) {
    // Jika link eksternal (mengandung http), gunakan tag <a> biasa
    const isExternal = href.startsWith('http')

    if (isExternal) {
      return (
        <a href={href} className={baseStyles} target={target} rel={rel}>
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={baseStyles} target={target} rel={rel}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {children}
    </button>
  )
}

export default LuxuryButton
