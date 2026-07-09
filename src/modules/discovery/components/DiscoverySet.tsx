'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Perbaikan di sini: tambahkan 'as const'
const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function DiscoverySetComingSoon() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-(--lb-white) px-6">
      {/* Latar Belakang Dekoratif */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[40%] w-[40%] rounded-full bg-(--lb-bleu)/5 blur-[120px]" />
        <div className="absolute right-[-5%] bottom-[-10%] h-[30%] w-[30%] rounded-full bg-(--lb-bleu)/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          className="mb-6 block text-[10px] font-bold tracking-[0.6em] text-(--lb-neutral) uppercase"
        >
          Olfactory Excellence
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: luxuryEase }}
          className="mb-8 font-serif text-5xl tracking-tighter text-(--lb-bleu) sm:text-7xl"
        >
          Discovery <span className="font-light italic">Set</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: luxuryEase }}
          className="mx-auto mb-8 h-px w-24 bg-(--lb-bleu)/20"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mb-12 max-w-md text-sm leading-relaxed font-light tracking-wide text-(--lb-neutral) opacity-80 sm:text-base"
        >
          A curated journey through our most prestigious fragrances. Something
          extraordinary is being prepared for your senses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: luxuryEase }}
          className="inline-flex items-center gap-3 rounded-full border border-(--lb-bleu)/10 px-6 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--lb-bleu) opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-(--lb-bleu)"></span>
          </span>
          <span className="text-[9px] font-bold tracking-[0.3em] text-(--lb-bleu) uppercase">
            Coming Soon
          </span>
        </motion.div>
      </div>
    </section>
  )
}
