'use client'

import Link from 'next/link'
import { ArrowRight, CreditCard } from 'lucide-react'
import {
  InstagramLogo,
  TiktokLogo,
  PinterestLogo,
  YoutubeLogo,
  LinkedinLogo,
} from 'phosphor-react'
import { clsx } from 'clsx'

const FOOTER_LINKS = [
  {
    title: 'Collections',
    links: [
      { label: 'All Fragrances', href: '/shop' },
      { label: 'Discovery Sets', href: '/discovery' },
      { label: 'Limited Editions', href: '/limited' },
    ],
  },
  {
    title: 'The Maison',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Craftsmanship', href: '/craft' },
      { label: 'Career', href: 'https://www.linkedin.com/company/lazainbleu/' },
      { label: 'Store Locator', href: '/stores' },
    ],
  },
  {
    title: 'Client Care',
    links: [
      { label: 'Shipping & Returns', href: '/shipping' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Track Order', href: '/track' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#0A192F]/5 bg-white pb-10 pt-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Upper Footer */}
        <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Newsletter */}
          <div className="space-y-8 lg:col-span-4">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0A192F]">
                Newsletter
              </h3>
              <p className="max-w-sm text-sm font-light leading-relaxed text-[#0A192F]/80">
                Subscribe to receive updates on new launches and invitations to private
                events.
              </p>
            </div>

            <form
              className="group relative max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email Address"
                className={clsx(
                  'w-full border-b border-[#0A192F]/30 bg-transparent py-3 text-sm outline-none',
                  'font-light transition-all duration-500 placeholder:text-neutral-400 focus:border-[#0A192F]'
                )}
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 transition-transform duration-300 hover:translate-x-1">
                <ArrowRight className="h-4 w-4 stroke-[1px] text-[#0A192F]" />
              </button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:col-span-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0A192F]">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] font-light text-[#0A192F]/80 transition-colors duration-300 hover:text-[#C5A27D]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Footer */}
        <div className="flex flex-col items-center justify-between gap-8 border-y border-[#0A192F]/5 py-12 md:flex-row">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <h2 className="text-xl font-light uppercase tracking-[0.4em] text-[#0A192F]">
              LAZAIN<span className="font-semibold">BLEU</span>
            </h2>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A27D]">
              Luxury, Inspired by Faith and Heritage
            </span>
          </div>

          {/* Social Icons w/ Ripple Animation */}
          <div className="flex gap-8">
            {[
              { Icon: InstagramLogo, href: 'https://www.instagram.com/lazainbleu' },
              { Icon: TiktokLogo, href: 'https://www.tiktok.com/@lazainbleu' },
              { Icon: PinterestLogo, href: 'https://www.pinterest.com/lazainbleu' },
              { Icon: YoutubeLogo, href: 'https://www.youtube.com/@LazainBleu' },
              {
                Icon: LinkedinLogo,
                href: 'https://www.linkedin.com/company/lazainbleu/',
              },
            ].map(({ Icon, href }, idx) => (
              <Link
                key={idx}
                href={href}
                className="group relative text-[#0A192F] transition-colors duration-500 hover:text-[#08172B]"
              >
                <span className="duration-600 absolute inset-0 scale-0 rounded-full bg-[#08172B] opacity-0 transition-all group-hover:scale-125 group-hover:opacity-10"></span>
                <Icon size={22} weight="light" className="relative" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="space-y-8 pt-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Legal */}
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
              <p className="text-[10px] font-light uppercase tracking-widest text-[#0A192F]/70">
                © 2025 Lazain Bleu.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="text-[10px] font-light uppercase tracking-widest text-[#0A192F]/70 hover:text-[#0A192F]"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-[10px] font-light uppercase tracking-widest text-[#0A192F]/70 hover:text-[#0A192F]"
                >
                  Terms
                </Link>
              </div>
            </div>

            {/* Payment Icons - Fully Black, No Animations */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              <span className="mr-2 text-[9px] uppercase tracking-[0.2em] text-[#0A192F]">
                Secure Payment:
              </span>

              <div className="flex items-center gap-4 text-[#0A192F]">
                <CreditCard className="h-5 w-5 stroke-[1px]" />

                <div className="text-[10px] font-bold tracking-tighter">VISA</div>
                <div className="text-[10px] font-bold tracking-tighter">MASTERCARD</div>
                <div className="text-[10px] font-bold tracking-tighter">JCB</div>
                <div className="text-[10px] font-bold tracking-tighter">APPLE PAY</div>
                <div className="text-[10px] font-bold tracking-tighter">GOOGLE PAY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
