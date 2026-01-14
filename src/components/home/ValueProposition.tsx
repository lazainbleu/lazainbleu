'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import {
  IconPerfume,
  IconTrophy,
  IconFingerprint,
  IconMoonStars,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: <IconPerfume size={24} stroke={1.2} />,
    title: 'Andalusian Heritage',
    description: 'French perfumery with Andalusian roots.',
  },
  {
    icon: <IconMoonStars size={24} stroke={1.2} />,
    title: 'Islamic Elegance',
    description: 'Inspired by faith and spiritual values.',
  },
  {
    icon: <IconTrophy size={24} stroke={1.2} />,
    title: 'Extrait de Parfum',
    description: 'Pure concentration for maximum sillage.',
  },
  {
    icon: <IconFingerprint size={24} stroke={1.2} />,
    title: 'Exclusive Service',
    description: 'Prioritized delivery across Indonesia.',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

export default function ValueProposition() {
  return (
    <section className="overflow-hidden bg-white py-12 selection:bg-zinc-900 selection:text-white md:py-16">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.4em] text-zinc-400 md:text-[11px]">
              Lazain Bleu — Est. 2025
            </span>
            <h2 className="text-xl font-light leading-snug tracking-tight text-zinc-900 md:text-2xl">
              Luxury, Inspired by{' '}
              <span className="font-serif italic text-zinc-500">Faith & Heritage</span>
            </h2>
            <div className="mx-auto mt-4 h-px w-10 bg-zinc-100" />
          </motion.div>
        </div>

        {/* Feature Grid Section */}
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className={cn(
              'scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-8 overflow-x-auto px-4 pb-6',
              'md:mx-0 md:grid md:grid-cols-4 md:gap-10 md:overflow-visible md:px-0 md:pb-0'
            )}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex min-w-[240px] flex-1 flex-shrink-0 snap-center flex-col items-center text-center outline-none"
              >
                {/* Icon */}
                <div className="mb-4 text-zinc-800 transition-all duration-500 group-hover:scale-110 group-hover:text-[#00234E]">
                  {feature.icon}
                </div>

                {/* Text Content */}
                <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 transition-colors duration-500 group-hover:text-[#00234E]">
                  {feature.title}
                </h3>
                <p className="max-w-[200px] text-[13px] font-light leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-800 md:text-[14px]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
