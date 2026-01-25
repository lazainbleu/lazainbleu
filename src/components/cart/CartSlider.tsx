'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartSlider({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SLIDER PANEL */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-[420px] bg-[var(--lb-white)] shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[var(--lb-border)] p-4">
              <h2 className="text-lg font-semibold tracking-tight text-[var(--lb-bleu)]">
                Your Cart
              </h2>

              <button onClick={onClose} className="text-[var(--lb-bleu)]">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <p className="text-sm text-[var(--lb-neutral)]">Cart is empty.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
