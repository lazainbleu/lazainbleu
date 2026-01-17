'use client'

import React from 'react'

const ShippingReturns = () => {
  const steps = [
    {
      title: 'Curation',
      desc: '1-2 business days for meticulous quality control and preparation.',
    },
    {
      title: 'Transit',
      desc: 'Premium Express and International standard options with secure tracking.',
    },
    {
      title: 'Presentation',
      desc: 'Signature protective packaging designed for aesthetic preservation.',
    },
  ]

  return (
    <section className="min-h-screen bg-[var(--lb-white)] px-6 py-20 text-[var(--lb-bleu)] selection:bg-[var(--lb-bleu)] selection:text-[var(--lb-white)] md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Header: Clean & Elegant */}
        <header className="mb-24 text-center">
          <h1 className="mb-4 font-serif text-3xl tracking-tight text-[var(--lb-bleu)] md:text-4xl">
            Shipping & Returns
          </h1>
          <div className="mx-auto mb-5 h-[1px] w-8 bg-[var(--lb-bleu)] opacity-20" />
          <p className="mb-10 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--lb-neutral)] md:text-[12px]">
            Logistics & Care
          </p>
          <p className="mx-auto max-w-2xl font-serif text-base italic leading-relaxed text-[var(--lb-neutral)] md:text-lg">
            "Each flacon of Lazain Bleu is encased with utmost precision and dispatched to
            ensure the integrity of every aromatic note remains intact."
          </p>
        </header>

        {/* Steps Grid: Professional Minimalist */}
        <div className="mb-24 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group border border-[var(--lb-border)] p-10 text-center transition-all duration-700 ease-out hover:border-[var(--lb-bleu)]"
            >
              <span className="mb-6 block font-serif text-2xl italic text-[var(--lb-bleu)] opacity-20 transition-opacity group-hover:opacity-100">
                0{i + 1}
              </span>
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)]">
                {step.title}
              </h3>
              <p className="font-sans text-[14px] font-light leading-[1.7] text-[var(--lb-neutral)]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Return Policy Section */}
        <div className="mx-auto max-w-2xl border-t border-[var(--lb-border)] pt-20">
          <div className="text-center">
            <h2 className="mb-6 font-serif text-2xl text-[var(--lb-bleu)]">
              Return Policy
            </h2>
            <p className="mb-10 font-sans text-[15px] italic leading-[1.9] text-[var(--lb-neutral)]">
              Due to the artisanal and hygienic nature of luxury fragrances, we accept
              returns only for unopened seals or items received in a compromised
              condition. Every request is handled with personal care by our team.
            </p>
            <a
              href="/contact"
              className="inline-block border border-[var(--lb-bleu)] px-10 py-4 text-[10px] font-medium uppercase tracking-[0.3em] transition-all duration-500 hover:bg-[var(--lb-bleu)] hover:text-[var(--lb-white)]"
            >
              Speak with Our Concierge
            </a>
          </div>
        </div>

        {/* Logistics Disclaimer */}
        <footer className="mt-24 border-t border-[var(--lb-border)] pt-8 text-center">
          <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--lb-neutral)] opacity-50">
            Worldwide Secured Logistics • Lazain Bleu Atelier
          </p>
        </footer>
      </div>
    </section>
  )
}

export default ShippingReturns
