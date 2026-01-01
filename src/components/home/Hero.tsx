'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Balancer } from 'react-wrap-balancer'
import { cn } from '@/lib/utils'

const Hero = () => {
  return (
    <section className="relative flex min-h-[95vh] w-full items-center justify-center overflow-hidden bg-white dark:bg-zinc-950">
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,245,245,0.5)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(15,15,15,0.5)_0%,transparent_100%)]" />

        {/* Soft Ambient Orbs */}
        <div className="absolute left-[-5%] top-[-5%] h-[45%] w-[45%] rounded-full bg-blue-50/20 blur-[100px] dark:bg-blue-900/5" />
        <div className="absolute bottom-[-5%] right-[-5%] h-[45%] w-[45%] rounded-full bg-zinc-100/40 blur-[100px] dark:bg-zinc-800/10" />

        {/* Luxury Vertical Line */}
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-zinc-100 to-transparent opacity-40 dark:via-zinc-900" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="flex flex-col items-center text-center">
          {/* Sub-heading */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 block text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-400 sm:text-[11px]"
          >
            L&apos;art de la Parfumerie
          </motion.span>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 text-7xl font-extralight leading-none tracking-tight text-zinc-900 dark:text-zinc-100 md:text-9xl lg:text-[110px]"
          >
            <Balancer>
              Lazain <span className="font-serif font-light italic opacity-90">Bleu</span>
            </Balancer>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="mb-14 max-w-[540px] text-sm font-light italic leading-relaxed tracking-wide text-zinc-500 dark:text-zinc-400 md:text-base"
          >
            &quot;Beyond fragrance, an invisible signature of your presence.&quot;
          </motion.p>

          {/* CTA Buttons dengan Fill Animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col items-center gap-8"
          >
            <Link
              href="/shop"
              className={cn(
                'group relative overflow-hidden border border-zinc-900 px-16 py-5 transition-colors duration-500 dark:border-zinc-100',
                'text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-900 hover:text-white dark:text-white dark:hover:text-zinc-900'
              )}
            >
              {/* Layer yang bergeser ke atas */}
              <span className="ease-[0.76, 0, 0.24, 1] absolute inset-0 z-0 translate-y-full bg-zinc-900 transition-transform duration-500 group-hover:translate-y-0 dark:bg-white" />

              {/* Teks harus di atas layer (z-10) */}
              <span className="relative z-10 transition-colors duration-500">
                Shop Collection
              </span>
            </Link>

            <button className="group flex flex-col items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-zinc-400 transition-colors duration-500 hover:text-zinc-900 dark:hover:text-zinc-100">
              Explore Stories
              <div className="h-8 w-px bg-zinc-200 shadow-[0_0_8px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:h-12 dark:bg-zinc-800" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Aesthetic Side Detail */}
      <div className="absolute bottom-10 right-10 hidden overflow-hidden lg:block">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-[9px] uppercase tracking-[0.5em] text-zinc-300 [writing-mode:vertical-rl] dark:text-zinc-700"
        >
          Collection 2025
        </motion.p>
      </div>
    </section>
  )
}

export default Hero
