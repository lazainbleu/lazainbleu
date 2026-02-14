'use client'

import React, { useState } from 'react'
import LuxuryButton from '@/components/ui/LuxuryButton' // Sesuaikan path import

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      q: 'What sets Lazain Bleu apart?',
      a: 'Lazain Bleu unites the refinement of French perfumery with the rich heritage of Andalusian and Islamic fragrance traditions. Our compositions strike a balance between historical depth and contemporary elegance.',
    },
    {
      q: 'How long does each scent last?',
      a: 'Our fragrances are offered in Eau de Parfum and Extrait de Parfum concentrations. On skin, expect a refined sillage lasting approximately 8–12 hours; the scent will typically endure longer on fabrics.',
    },
    {
      q: 'How can I track my order?',
      a: 'When your order is dispatched we will email a personalised tracking link to your registered address. This provides real‑time tracking from our atelier to your delivery location.',
    },
    {
      q: 'Do you provide gift services?',
      a: 'Yes. We offer signature gift wrapping in monochrome packaging and the option of a personalised handwritten note in calligraphy, to ensure a memorable presentation.',
    },
  ]

  return (
    <section className="min-h-screen bg-[var(--lb-white)] px-6 py-20 text-[var(--lb-bleu)] selection:bg-[var(--lb-bleu)] selection:text-[var(--lb-white)] md:px-12">
      <div className="mx-auto max-w-2xl">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-3xl tracking-tight text-[var(--lb-bleu)] md:text-4xl">
            Frequently Asked Questions
          </h1>
          <div className="mx-auto mb-5 h-[1px] w-8 bg-[var(--lb-bleu)] opacity-20" />
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--lb-neutral)] md:text-[12px]">
            Assistance and fragrance guidance
          </p>
        </header>

        {/* FAQ List Container */}
        <div className="border-t border-[var(--lb-border)]">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx

            return (
              <div key={idx} className="border-b border-[var(--lb-border)]">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="group flex w-full items-center justify-between py-6 text-left transition-colors duration-300 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-sans text-[15px] tracking-wide transition-colors duration-300 md:text-[16px] ${
                      isOpen
                        ? 'font-medium text-[var(--lb-bleu)]'
                        : 'text-[var(--lb-neutral)] group-hover:text-[var(--lb-bleu)]'
                    }`}
                  >
                    {item.q}
                  </span>

                  {/* Animated Cross/Minus Icon */}
                  <div
                    className="relative ml-4 flex h-3 w-3 flex-shrink-0 items-center justify-center"
                    aria-hidden
                  >
                    <div
                      className={`absolute h-[1px] w-full bg-[var(--lb-bleu)] transition-transform duration-500 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                    <div
                      className={`absolute h-[1px] w-full bg-[var(--lb-bleu)] transition-transform duration-500 ${
                        isOpen ? 'rotate-180 opacity-0' : 'rotate-90'
                      }`}
                    />
                  </div>
                </button>

                {/* Answer Area with Smooth Expansion */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pr-8">
                      <p className="font-sans text-[14px] font-light leading-[1.7] text-[var(--lb-neutral)] md:text-[15px]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Concierge Section */}
        <footer className="mt-20 border-t border-[var(--lb-border)] pt-10 text-center">
          <p className="mb-8 font-serif text-base italic text-[var(--lb-neutral)]">
            Still have questions?
          </p>

          {/* IMPLEMENTASI LUXURY BUTTON */}
          <LuxuryButton href="/contact">Contact Our Concierge</LuxuryButton>
        </footer>
      </div>
    </section>
  )
}

export default FAQ
