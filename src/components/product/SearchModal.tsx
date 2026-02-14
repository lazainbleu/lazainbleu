'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { X, Search, Loader2 } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useProductSearch } from '@/hooks/use-product-search'
import { formatPrice } from '@/lib/products'

// --- Luxury Animation Variants ---
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.3 },
  },
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { setQuery, results, loading, clearSearch, totalResults } = useProductSearch()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 400)
      document.body.style.overflow = 'hidden'
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSearch = useCallback(
    (value: string) => {
      setInputValue(value)
      setQuery(value)
    },
    [setQuery]
  )

  const handleClose = useCallback(() => {
    setInputValue('')
    clearSearch()
    onClose()
  }, [clearSearch, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center">
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-[rgba(15,23,42,0.2)] backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
          />

          {/* MODAL CONTAINER */}
          <motion.div
            className="relative flex max-h-[85vh] w-full flex-col overflow-hidden bg-[var(--lb-white)] shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* INPUT AREA */}
            <div className="w-full border-b border-[var(--lb-border)] bg-[var(--lb-white)] px-4 py-4 md:px-12">
              <div className="relative mx-auto flex max-w-6xl items-center gap-4">
                <div className="relative flex flex-1 items-center rounded-sm bg-[#F4F4F4] px-4 py-2.5 transition-all focus-within:bg-[var(--lb-white)] focus-within:ring-1 focus-within:ring-[var(--lb-border)]">
                  <Search className="h-4 w-4 shrink-0 text-[var(--lb-neutral)]" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search"
                    value={inputValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full bg-transparent px-3 text-sm font-light tracking-wide text-[var(--lb-bleu)] placeholder-[var(--lb-neutral)] outline-none md:text-base"
                    autoComplete="off"
                  />
                  {inputValue && (
                    <button
                      onClick={() => {
                        setInputValue('')
                        setQuery('')
                      }}
                      className="text-[10px] uppercase tracking-widest text-[var(--lb-neutral)] transition-colors hover:text-[var(--lb-bleu)]"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button onClick={handleClose} className="p-1">
                  <X className="h-5 w-5 text-[var(--lb-neutral)] transition-colors hover:text-[var(--lb-bleu)]" />
                </button>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-8 md:px-12">
              <div className="mx-auto max-w-6xl">
                {/* INITIAL STATE */}
                {!inputValue && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-16 text-center"
                  >
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--lb-neutral)]">
                      Collections
                    </p>
                    <h2 className="text-lg font-light text-[var(--lb-bleu)] md:text-xl">
                      Search our curated luxury goods
                    </h2>
                  </motion.div>
                )}

                {/* LOADING */}
                {loading && (
                  <div className="flex justify-center py-20">
                    <Loader2 className="h-6 w-6 animate-spin text-[var(--lb-neutral)]" />
                  </div>
                )}

                {/* NO RESULTS */}
                {!loading && inputValue && results.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <p className="text-base font-light text-[var(--lb-bleu)]">
                      No results found for &quot;{inputValue}&quot;
                    </p>
                    <p className="mt-1 text-xs font-light italic text-[var(--lb-neutral)]">
                      Check the spelling or use a different word
                    </p>
                    <button
                      onClick={() => handleSearch(inputValue)}
                      className="mt-8 bg-[var(--lb-bleu)] px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--lb-white)] transition-transform active:scale-95"
                    >
                      Search for &quot;{inputValue.toUpperCase()}&quot;
                    </button>
                  </motion.div>
                )}

                {/* RESULTS GRID */}
                {!loading && results.length > 0 && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="mb-8 border-b border-[var(--lb-border)] pb-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--lb-neutral)]">
                        Suggestions ({totalResults})
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 md:gap-x-8 lg:grid-cols-5">
                      {results.map((product) => (
                        <SearchProductCard
                          key={product.id}
                          product={product}
                          onClose={handleClose}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function SearchProductCard({ product, onClose }: { product: any; onClose: () => void }) {
  return (
    <motion.div variants={itemVariants}>
      <Link href={`/shop/${product.slug}`} onClick={onClose} className="group block">
        <div className="relative mb-3 aspect-[4/5] overflow-hidden bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 transition-colors group-hover:text-gray-600">
            {product.name}
          </h3>
          <p className="text-xs font-light italic text-gray-500">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
