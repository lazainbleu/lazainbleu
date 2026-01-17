import React from 'react'

const PrivacyPolicy = () => {
  return (
    /* Background menggunakan --lb-white, Teks menggunakan --lb-bleu */
    <section className="min-h-screen bg-[var(--lb-white)] px-6 py-20 text-[var(--lb-bleu)] selection:bg-[var(--lb-bleu)] selection:text-[var(--lb-white)] md:px-12">
      <div className="mx-auto max-w-2xl">
        {/* Header Section */}
        <header className="mb-20 text-center">
          <h1 className="mb-4 font-serif text-3xl tracking-tight text-[var(--lb-bleu)] md:text-4xl">
            Privacy Policy
          </h1>
          {/* Garis aksen menggunakan variabel bleu dengan opacity rendah sesuai tema mewah */}
          <div className="mx-auto mb-5 h-[1px] w-8 bg-[var(--lb-bleu)] opacity-20" />
          <p className="mb-8 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--lb-neutral)] md:text-[12px]">
            Data Protection & Trust
          </p>
          <p className="mx-auto max-w-lg font-serif text-base italic leading-relaxed text-[var(--lb-neutral)] md:text-lg">
            "Your trust is our ultimate luxury. At Lazain Bleu, we are committed to
            safeguarding your personal data with standards that mirror the excellence of
            our fragrances."
          </p>
        </header>

        {/* Content Section */}
        {/* Border menggunakan variabel --lb-border yang sudah didefinisikan di global css */}
        <div className="space-y-16 border-t border-[var(--lb-border)] pt-16">
          {/* Item 01 */}
          <article className="group">
            <h2 className="mb-5 flex items-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)] md:text-[12px]">
              <span className="mr-3 text-[var(--lb-bleu)] opacity-30 transition-opacity group-hover:opacity-100">
                01.
              </span>
              Data Collection
            </h2>
            <p className="font-sans text-[14px] font-light leading-[1.8] text-[var(--lb-neutral)] md:text-[15px]">
              To provide a bespoke shopping experience, we collect personal
              information—including your name, contact details, and shipping
              address—exclusively when you engage with our services or place an order.
            </p>
          </article>

          {/* Item 02 */}
          <article className="group">
            <h2 className="mb-5 flex items-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)] md:text-[12px]">
              <span className="mr-3 text-[var(--lb-bleu)] opacity-30 transition-opacity group-hover:opacity-100">
                02.
              </span>
              Purpose of Use
            </h2>
            <p className="font-sans text-[14px] font-light leading-[1.8] text-[var(--lb-neutral)] md:text-[15px]">
              Your data is utilised solely to process your commissions, facilitate
              seamless delivery, and curate a personalised olfactory journey tailored to
              your unique preferences.
            </p>
          </article>

          {/* Item 03 */}
          <article className="group">
            <h2 className="mb-5 flex items-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)] md:text-[12px]">
              <span className="mr-3 text-[var(--lb-bleu)] opacity-30 transition-opacity group-hover:opacity-100">
                03.
              </span>
              High-Tier Security
            </h2>
            <p className="font-sans text-[14px] font-light leading-[1.8] text-[var(--lb-neutral)] md:text-[15px]">
              We employ advanced encryption protocols to ensure your payment details
              remain strictly confidential. Our digital vault is designed to provide the
              same protection as the heritage we preserve.
            </p>
          </article>

          {/* Item 04: Featured Policy Section */}
          {/* Menggunakan border bleu yang sangat tipis dan background yang sedikit berbeda dari bg utama untuk penekanan */}
          <article className="bg-[var(--lb-bleu)]/[0.02] border-l-2 border-[var(--lb-bleu)] p-8 md:p-10">
            <h2 className="mb-5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--lb-bleu)] md:text-[12px]">
              04. Exclusive Custody
            </h2>
            <p className="font-sans text-[14px] font-normal italic leading-[1.8] text-[var(--lb-bleu)] md:text-[15px]">
              Lazain Bleu strictly prohibits the sale of your personal information to
              third parties. Your data is held in professional exclusivity; it remains
              yours, and ours alone.
            </p>
          </article>
        </div>

        {/* Footer Info */}
        <footer className="mt-24 border-t border-[var(--lb-border)] pt-8 text-center">
          <p className="font-sans text-[10px] uppercase tracking-widest text-[var(--lb-neutral)] opacity-60">
            Last Updated: January 2026
          </p>
        </footer>
      </div>
    </section>
  )
}

export default PrivacyPolicy
