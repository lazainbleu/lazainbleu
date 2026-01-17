'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Perbaikan di sini: tambahkan 'as const'
const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function DiscoverySetComingSoon() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[var(--lb-white)] px-6">
      {/* Latar Belakang Dekoratif */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-[var(--lb-bleu)]/5 absolute left-[-5%] top-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="bg-[var(--lb-bleu)]/5 absolute bottom-[-10%] right-[-5%] h-[30%] w-[30%] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          className="mb-6 block text-[10px] font-bold uppercase tracking-[0.6em] text-[var(--lb-neutral)]"
        >
          Olfactory Excellence
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: luxuryEase }}
          className="mb-8 font-serif text-5xl tracking-tighter text-[var(--lb-bleu)] sm:text-7xl"
        >
          Discovery <span className="font-light italic">Set</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: luxuryEase }}
          className="bg-[var(--lb-bleu)]/20 mx-auto mb-8 h-[1px] w-24"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mb-12 max-w-md text-sm font-light leading-relaxed tracking-wide text-[var(--lb-neutral)] opacity-80 sm:text-base"
        >
          A curated journey through our most prestigious fragrances. Something
          extraordinary is being prepared for your senses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: luxuryEase }}
          className="border-[var(--lb-bleu)]/10 inline-flex items-center gap-3 rounded-full border px-6 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--lb-bleu)] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--lb-bleu)]"></span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--lb-bleu)]">
            Coming Soon
          </span>
        </motion.div>
      </div>
    </section>
  )
}
