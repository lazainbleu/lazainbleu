'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Hero = () => {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#050505] text-[#F5F5F5] antialiased selection:bg-white selection:text-black">
      {/* --- LAYER 0: BACKGROUND OPTIMIZATION --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Overlay jauh lebih tipis */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0.12)] via-transparent to-[rgba(0,0,0,0.12)]" />

        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full bg-[url('/cover-hero.png')] bg-cover bg-center shadow-[inset_0_0_60px_rgba(0,0,0,0.18)] grayscale-[8%]"
        />
      </div>

      {/* --- TOP: DATA HEADER (Lower Z-Index to fix Mobile Menu Bug) --- */}
      <header className="relative z-20 flex w-full items-start justify-between p-6 md:p-10 lg:px-14">
        <div className="flex flex-col gap-1">
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-white md:text-[12px]"
          >
            Lazain Bleu
          </motion.h2>
          <span className="text-[7px] font-medium uppercase tracking-[0.2em] text-zinc-600 md:text-[8px]">
            Ref. No 00-26 // 2026
          </span>
        </div>

        <div className="flex flex-col items-end gap-0.5 text-right">
          <span className="text-[8px] font-light uppercase tracking-[0.4em] text-zinc-400 md:text-[10px]">
            Pure Parfum
          </span>
          <span className="text-[7px] uppercase tracking-[0.2em] text-zinc-700 md:text-[8px]">
            Available Locally
          </span>
        </div>
      </header>

      {/* --- CENTER: RESPONSIVE BRANDING --- */}
      <main className="relative z-10 flex w-full flex-col items-center px-4">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center">
          <div className="overflow-hidden py-2">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'select-none text-center font-extralight leading-[0.85] text-white',
                // Responsive sizing & tracking logic
                'text-[15vw] tracking-[0.1em]',
                'md:pl-[0.6em] md:text-[12vw] md:tracking-[0.6em]',
                'lg:pl-[1em] lg:text-[150px] lg:tracking-[1em]'
              )}
            >
              LAZAIN
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="mt-4 md:mt-2"
          >
            <span className="font-serif text-[4.5vw] italic tracking-[0.2em] text-zinc-400 md:text-[2vw] lg:text-[28px]">
              Extrait de Parfum
            </span>
          </motion.div>
        </div>
      </main>

      {/* --- BOTTOM: TECH DATA & SINGLE CTA --- */}
      <footer className="relative z-20 w-full p-6 md:p-10 lg:px-14">
        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-3">
          {/* Scent Profile (Left) */}
          <div className="hidden flex-col gap-5 border-l border-white/10 pl-6 md:flex">
            <div className="flex flex-col gap-1.5">
              <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                Composition
              </span>
              <span className="text-[9px] font-light uppercase tracking-[0.15em] text-zinc-300">
                Bergamot / Amber / Ash
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-zinc-600">
                Longevity
              </span>
              <span className="text-[9px] font-light uppercase tracking-[0.15em] text-zinc-300">
                12+ Hours Stable
              </span>
            </div>
          </div>

          {/* SINGLE CTA (Center) */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="w-full sm:w-auto"
            >
              <a
                href="/shop"
                className={cn(
                  'group relative flex w-full items-center justify-center px-8 py-4 sm:w-[280px] md:py-5',
                  'overflow-hidden bg-white text-black transition-all duration-500 hover:scale-[1.02] active:scale-95'
                )}
              >
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.8em] transition-colors group-hover:text-black/70 md:text-[11px]">
                  Shop Now
                </span>
                {/* Subtle Shine Effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
              </a>
            </motion.div>
          </div>

          {/* Metadata (Right) */}
          <div className="flex justify-between border-t border-white/5 pt-6 md:flex-col md:items-end md:gap-5 md:border-t-0 md:pt-0">
            <div className="flex flex-col md:items-end">
              <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-zinc-700">
                Origin
              </span>
              <span className="text-[9px] uppercase tracking-[0.1em] text-zinc-400">
                Indonesia
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-zinc-700">
                Format
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.1em] tracking-widest text-zinc-400">
                35ml // 1.18 fl.oz.oz
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- DECORATIVE HUD --- */}
      <div className="pointer-events-none absolute inset-4 z-10 border border-white/[0.04] md:inset-8" />

      {/* Corner Data (Mobile Hidden) */}
      <div className="absolute bottom-4 left-4 z-10 hidden lg:block">
        <span className="vertical-text text-[7px] uppercase tracking-[1em] text-zinc-800">
          Precision Crafted
        </span>
      </div>
    </section>
  )
}

export default Hero
