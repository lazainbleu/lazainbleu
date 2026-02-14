'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import ShinyText from '@/components/ui/ShinyText'

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Luxury ease
      },
    },
  }

  const lineVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 0.3,
      transition: { duration: 1, ease: 'circOut' },
    },
  }

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#020202] text-white antialiased">
      {/* --- BACKGROUND LAYER --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="h-full w-full bg-[url('/cover-hero.png')] bg-cover bg-center shadow-[inset_0_0_120px_rgba(0,0,0,1)] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
      </div>

      {/* --- CONTENT COMPOSITION --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.span
          variants={itemVariants}
          className="mb-8 text-[9px] font-medium uppercase tracking-[1.4em] text-zinc-500"
        >
          Signature Edition
        </motion.span>

        <div className="flex flex-col items-center">
          <motion.h1
            variants={itemVariants}
            className="ml-[0.35em] text-[11vw] font-extralight leading-none tracking-[0.35em] md:text-[6vw] lg:text-[72px]"
          >
            {/* LAZAIN - White Base, Bright Shine */}
            <ShinyText
              text="LAZAIN"
              speed={4}
              baseColor="rgba(255, 255, 255, 0.85)"
              shineColor="#ffffff"
              className="font-extralight"
            />

            <span className="inline-block w-[0.25em]" />

            {/* BLEU - Soft Blue Base, White Shine */}
            <ShinyText
              text="BLEU"
              speed={4}
              baseColor="rgba(191, 219, 254, 0.6)" // Blue-200 with opacity
              shineColor="#ffffff"
              className="font-normal"
            />
          </motion.h1>

          <motion.div
            variants={lineVariants}
            className="mt-10 h-[0.5px] w-14 origin-center bg-white/40"
          />
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-10 max-w-[300px] text-[10px] font-light uppercase italic leading-[2.4] tracking-[0.25em] text-zinc-400"
        >
          Fine Fragrances. Modern Perfumery.
        </motion.p>

        {/* --- LUXURY GLASS BUTTON --- */}
        <motion.div variants={itemVariants} className="mt-20">
          <a
            href="/shop"
            className={cn(
              'group relative flex items-center justify-center overflow-hidden px-16 py-4',
              'border border-white/10 bg-white/[0.02] backdrop-blur-md',
              'transition-all duration-500 ease-out hover:border-white/25 hover:bg-white/[0.05]'
            )}
          >
            {/* Glass Shine Effect on Button (Synced loop) */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'linear',
                repeatDelay: 1,
              }}
              className="absolute inset-0 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
            />

            <span className="relative z-10 text-[9px] font-medium uppercase tracking-[0.9em] text-zinc-400 transition-all duration-500 group-hover:text-white">
              SHOP NOW
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* --- LIGHTING --- */}
      <div className="pointer-events-none absolute bottom-[-15%] left-1/2 h-[400px] w-full -translate-x-1/2 rounded-full bg-blue-900/[0.04] blur-[140px]" />
    </section>
  )
}

export default Hero
