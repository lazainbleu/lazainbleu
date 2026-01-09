'use client'

import Link from 'next/link'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

type PaginationProps = {
  currentPage: number
  totalPages: number
  baseUrl: string
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show max 5 pages with ellipsis
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages

    if (currentPage <= 3) {
      return [...pages.slice(0, 4), -1, totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, -1, ...pages.slice(totalPages - 4)]
    }

    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages]
  }

  const visiblePages = getVisiblePages()

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)}>
      {/* Previous */}
      <Link
        href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : '#'}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
          currentPage > 1
            ? 'text-neutral-700 hover:bg-neutral-100'
            : 'cursor-not-allowed text-neutral-300'
        )}
        aria-disabled={currentPage <= 1}
      >
        <IconChevronLeft size={20} />
      </Link>

      {/* Page Numbers */}
      {visiblePages.map((page, index) =>
        page === -1 ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-10 w-10 items-center justify-center text-neutral-400"
          >
            …
          </span>
        ) : (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-700 hover:bg-neutral-100'
            )}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      <Link
        href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : '#'}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
          currentPage < totalPages
            ? 'text-neutral-700 hover:bg-neutral-100'
            : 'cursor-not-allowed text-neutral-300'
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <IconChevronRight size={20} />
      </Link>
    </nav>
  )
}
