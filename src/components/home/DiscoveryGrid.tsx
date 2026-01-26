'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { IconArrowRight } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface CollectionCardProps {
  title: string
  subtitle: string
  image: string
  className?: string
  isLarge?: boolean
}

const luxuryEase = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: luxuryEase,
    },
  },
}

const CollectionCard = ({
  title,
  subtitle,
  image,
  className,
  isLarge = false,
}: CollectionCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--lb-border)] transition-all duration-500',
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full bg-neutral-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 z-20 flex flex-col items-start justify-end p-6 sm:p-8">
        <div className="w-full transform transition-transform duration-500 group-hover:-translate-y-1">
          <h3
            className={cn(
              'mb-2 font-serif leading-tight tracking-tight text-white',
              isLarge
                ? 'text-2xl sm:text-3xl md:text-4xl'
                : 'text-base sm:text-lg md:text-xl'
            )}
          >
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 max-w-[85%] text-[11px] font-light leading-relaxed text-white/80 sm:text-[12px]">
            {subtitle}
          </p>
          <div className="flex translate-y-2 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="border-b border-white/40 pb-0.5">Explore</span>
            <IconArrowRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CollectionsGrid() {
  return (
    <section className="overflow-hidden bg-[var(--lb-white)] px-4 py-16 selection:bg-[var(--lb-bleu)] selection:text-white sm:px-6 sm:py-24">
      <motion.div
        className="mx-auto max-w-[1320px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        variants={containerVariants}
      >
        {/* Header Section */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.span
            variants={itemVariants}
            className="mb-2 block text-[9px] font-bold uppercase tracking-[0.5em] text-[var(--lb-neutral)]"
          >
            The Art of Scent
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="mb-4 font-serif text-3xl tracking-tight text-[var(--lb-bleu)] sm:text-4xl md:text-5xl"
          >
            Our{' '}
            <span className="font-light italic text-[var(--lb-bleu)]">Discovery Set</span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="bg-[var(--lb-bleu)]/10 mx-auto mb-6 h-[1px] w-12"
          />
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-xl px-4 text-sm font-light leading-relaxed text-[var(--lb-neutral)] opacity-80 md:text-base"
          >
            Experience the complete olfactory journey with our curated sets, designed for
            those who seek to explore every note.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid h-auto grid-cols-1 gap-4 md:h-[580px] md:grid-cols-12">
          <div className="h-[350px] md:col-span-7 md:h-full">
            <CollectionCard
              isLarge
              title="Golden Oud"
              subtitle="The pinnacle of luxury. A profound journey into the heart of Andalusia."
              image="/images/collections/golden-oud.png"
              className="h-full w-full"
            />
          </div>
          <div className="flex h-auto flex-col gap-4 md:col-span-5 md:h-full">
            <div className="h-[250px] md:h-[46%]">
              <CollectionCard
                title="Bleu Citrus"
                subtitle="Vibrant, fresh, and full of life."
                image="/images/collections/bleu-citrus.png"
                className="h-full w-full"
              />
            </div>
            <div className="grid h-[250px] grid-cols-2 gap-4 md:h-[54%]">
              <CollectionCard
                title="Amber Rose"
                subtitle="A poetic floral embrace."
                image="/images/collections/amber-rose.png"
                className="h-full w-full"
              />
              <CollectionCard
                title="Nocturne"
                subtitle="Mysteries of the night."
                image="/images/collections/nocturne-series.png"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Button - Statis tanpa animasi muncul, hanya hover & active */}
        <div className="mt-16 text-center">
          <Link href="/discovery">
            <button className="group relative overflow-hidden border border-[var(--lb-bleu)] px-12 py-4 text-[var(--lb-bleu)] transition-all duration-200 hover:bg-[var(--lb-bleu)] hover:text-white active:scale-95">
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em]">
                View Discovery Set
              </span>
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
