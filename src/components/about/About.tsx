'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Balancer } from 'react-wrap-balancer'
import { cn } from '@/lib/utils'

const BRAND = {
  founder: {
    name: 'Zain',
    role: 'Founder & CEO',
    image: '/images/owner.png',
  },
  tagline: 'Crafted for those who move in silence.',
  philosophy: 'Luxury is a silent signature of power and elegance.',
  history:
    'Lazain Bleu is a luxury fragrance house founded in 2025, blending French artistry with Andalusian and Islamic heritage. Guided by the philosophy “Luxury, Inspired by Faith and Heritage”, each creation is an olfactory journey that honors tradition while embracing contemporary elegance.',
}

/**
 * PAGE 1: THE ATMOSPHERIC VISION
 */
const VisionPage = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.85])

  return (
    <motion.section
      style={{ opacity }}
      className="relative flex h-screen w-full flex-col justify-center bg-[#0a0a0a] px-6 md:px-12"
    >
      <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center space-y-6 text-center md:space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn(
            'text-[10px] font-medium uppercase tracking-[0.8em] text-zinc-500 md:text-[11px]',
            GeistMono.className
          )}
        >
          Our Story
        </motion.p>

        <h1 className="text-3xl font-extralight leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          <Balancer>{BRAND.tagline}</Balancer>
        </h1>

        <p className="max-w-md text-sm font-light leading-relaxed text-zinc-400 opacity-80 md:text-base">
          Experience luxury in every detail.
        </p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '40px' }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-6 h-[1px] bg-zinc-800"
        />
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="h-12 w-[1px] bg-gradient-to-b from-zinc-700 to-transparent" />
      </motion.div>
    </motion.section>
  )
}

/**
 * FOUNDER CARD
 */
const FounderCard = () => (
  <div className="mt-8 space-y-2 text-center lg:text-left">
    <h3 className="text-xl font-light uppercase tracking-[0.2em] text-white">
      {BRAND.founder.name}
    </h3>
    <p
      className={cn(
        'text-[9px] font-medium uppercase tracking-[0.4em] text-zinc-500',
        GeistMono.className
      )}
    >
      {BRAND.founder.role}
    </p>
  </div>
)

/**
 * PAGE 2: THE HERITAGE & OWNER
 */
const HeritagePage = () => {
  return (
    <section className="relative w-full bg-[#0a0a0a] px-6 pb-32 pt-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Persona Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-zinc-900 bg-zinc-900/50">
              <Image
                src={BRAND.founder.image}
                alt={BRAND.founder.name}
                fill
                /* FIX: opacity-90 sudah masuk ke dalam className */
                className="object-cover opacity-90 transition-all duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <FounderCard />
          </motion.div>

          {/* Text Content Section */}
          <div className="space-y-12 md:space-y-16 lg:pt-12">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-extralight italic leading-snug tracking-tight text-white opacity-90 md:text-4xl">
                <Balancer>"{BRAND.philosophy}"</Balancer>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="border-l border-zinc-800/50 pl-6 text-base font-light leading-[1.8] text-zinc-400 md:pl-8 md:text-[17px]">
                {BRAND.history}
              </p>

              <div>
                <button className="group flex items-center gap-6 text-white transition-all">
                  <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-zinc-300 transition-colors group-hover:text-white">
                    Discover the House
                  </span>
                  <div className="relative h-[1px] w-12 overflow-hidden bg-zinc-800">
                    <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Signature: ESTD 2025 */}
        <div className="mt-32 space-y-4 text-center">
          <div className="mx-auto mb-8 h-12 w-px bg-gradient-to-b from-zinc-800 to-transparent" />
          <p
            className={cn(
              'text-[11px] font-light uppercase tracking-[1.2em] text-zinc-400 md:text-[12px]',
              GeistMono.className
            )}
          >
            Lazain Bleu
          </p>
          <p
            className={cn(
              'text-[9px] font-medium uppercase tracking-[0.6em] text-zinc-600',
              GeistMono.className
            )}
          >
            ESTD 2025
          </p>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <main
      ref={containerRef}
      className={cn(
        'relative min-h-screen bg-[#0a0a0a] selection:bg-white selection:text-black',
        GeistSans.className
      )}
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/static/grain.png')] bg-cover opacity-5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1a1a_0%,_transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10">
        <VisionPage scrollYProgress={scrollYProgress} />
        <HeritagePage />
      </div>
    </main>
  )
}
