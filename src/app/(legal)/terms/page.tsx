import React from 'react'

const TermsOfService = () => {
  return (
    /* Background menggunakan --lb-white, Teks menggunakan --lb-bleu */
    <section className="min-h-screen bg-[var(--lb-white)] px-6 py-20 text-[var(--lb-bleu)] selection:bg-[var(--lb-bleu)] selection:text-[var(--lb-white)] md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <header className="mb-16 text-center md:mb-24">
          <h1 className="mb-4 font-serif text-3xl tracking-tight text-[var(--lb-bleu)] md:text-4xl">
            Terms of Service
          </h1>
          {/* Garis aksen menggunakan variabel bleu dengan opacity rendah */}
          <div className="mx-auto mb-5 h-[1px] w-8 bg-[var(--lb-bleu)] opacity-20" />
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--lb-neutral)] md:text-[12px]">
            Legal Framework & House Rules
          </p>
        </header>

        {/* Content Grid: Menggunakan --lb-border untuk garis pemisah horizontal */}
        <div className="grid gap-x-20 gap-y-16 border-t border-[var(--lb-border)] pt-16 md:grid-cols-2">
          {/* Column 1 */}
          <div className="space-y-16">
            <section className="group">
              <h2 className="mb-5 flex items-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)] md:text-[12px]">
                <span className="mr-3 opacity-30 transition-opacity group-hover:opacity-100">
                  01.
                </span>
                Intellectual Property
              </h2>
              <p className="font-sans text-[14px] font-light leading-[1.8] text-[var(--lb-neutral)] md:text-[15px]">
                All designs, visual identities, and proprietary fragrance formulas are the
                exclusive property of Lazain Bleu. We stand as the sole guardians of our
                Andalusian and Islamic heritage.
              </p>
            </section>

            <section className="group">
              <h2 className="mb-5 flex items-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)] md:text-[12px]">
                <span className="mr-3 opacity-30 transition-opacity group-hover:opacity-100">
                  02.
                </span>
                Product Authenticity
              </h2>
              <p className="font-sans text-[14px] font-light leading-[1.8] text-[var(--lb-neutral)] md:text-[15px]">
                Authenticity is the cornerstone of our house. We guarantee that every
                flacon purchased directly via our official digital boutique is a genuine
                creation of Lazain Bleu.
              </p>
            </section>
          </div>

          {/* Column 2 */}
          <div className="space-y-16">
            <section className="group">
              <h2 className="mb-5 flex items-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)] md:text-[12px]">
                <span className="mr-3 opacity-30 transition-opacity group-hover:opacity-100">
                  03.
                </span>
                Order Acceptance
              </h2>
              <p className="font-sans text-[14px] font-light leading-[1.8] text-[var(--lb-neutral)] md:text-[15px]">
                We reserve the right to decline or cancel orders in instances of suspected
                fraudulent activity or technical anomalies to maintain the integrity of
                our service.
              </p>
            </section>

            <section className="group">
              <h2 className="mb-5 flex items-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)] md:text-[12px]">
                <span className="mr-3 opacity-30 transition-opacity group-hover:opacity-100">
                  04.
                </span>
                Liability Limits
              </h2>
              <p className="font-sans text-[14px] font-light leading-[1.8] text-[var(--lb-neutral)] md:text-[15px]">
                Lazain Bleu shall not be held liable for indirect damages arising from the
                use of this website. Our commitment is to provide excellence within the
                bounds of digital commerce regulations.
              </p>
            </section>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <footer className="mt-24 border-t border-[var(--lb-border)] pt-8 text-center">
          <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--lb-neutral)] opacity-60">
            Governance of Maison Lazain Bleu • 2026
          </p>
        </footer>
      </div>
    </section>
  )
}

export default TermsOfService
