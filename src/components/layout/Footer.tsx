'use client';

import Link from 'next/link';
import { Instagram, Facebook, Youtube, ArrowRight, CreditCard, Linkedin } from 'lucide-react';
import { clsx } from 'clsx';

const FOOTER_LINKS = [
    {
        title: "Collections",
        links: [
            { label: "All Fragrances", href: "/fragrances" },
            { label: "Discovery Sets", href: "/discovery" },
            { label: "Home Ambiance", href: "/home" },
            { label: "Limited Editions", href: "/limited" },
        ]
    },
    {
        title: "The Maison",
        links: [
            { label: "Our Story", href: "/about" },
            { label: "Craftsmanship", href: "/craft" },
            { label: "Sustainability", href: "/eco" },
            { label: "Store Locator", href: "/stores" },
        ]
    },
    {
        title: "Client Care",
        links: [
            { label: "Shipping & Returns", href: "/shipping" },
            { label: "Contact Us", href: "/contact" },
            { label: "FAQ", href: "/faq" },
            { label: "Track Order", href: "/track" },
        ]
    }
];

// Data metode pembayaran
const PAYMENT_METHODS = [
    { name: 'Visa', type: 'card' },
    { name: 'Mastercard', type: 'card' },
    { name: 'American Express', type: 'card' },
    { name: 'PayPal', type: 'digital' },
    { name: 'Apple Pay', type: 'digital' },
    { name: 'Google Pay', type: 'digital' },
    { name: 'Bank Transfer', type: 'bank' },
];

export default function Footer() {
    return (
        <footer className="bg-white border-t border-[#0A192F]/5 pt-20 pb-10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">

                {/* Upper Footer: Newsletter & Links */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

                    {/* Newsletter Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-[#0A192F] text-xs uppercase tracking-[0.3em] font-semibold">
                                Newsletter
                            </h3>
                            <p className="text-[#0A192F]/60 text-sm font-light leading-relaxed max-w-sm">
                                Subscribe to receive updates on new launches and invitation to private events.
                            </p>
                        </div>

                        <form className="relative group max-w-sm" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={clsx(
                                    "w-full bg-transparent border-b border-[#0A192F]/20 py-3 text-sm outline-none",
                                    "focus:border-[#0A192F] transition-all duration-500 placeholder:text-neutral-300 font-light"
                                )}
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:translate-x-1 transition-transform duration-300">
                                <ArrowRight className="w-4 h-4 text-[#0A192F] stroke-[1px]" />
                            </button>
                        </form>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
                        {FOOTER_LINKS.map((section) => (
                            <div key={section.title} className="space-y-6">
                                <h3 className="text-[#0A192F] text-xs uppercase tracking-[0.3em] font-semibold">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-[#0A192F]/60 text-[13px] font-light hover:text-[#C5A27D] transition-colors duration-300"
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

                {/* Middle Footer: Logo & Social */}
                <div className="flex flex-col md:flex-row justify-between items-center py-12 border-y border-[#0A192F]/5 gap-8">
                    <div className="flex flex-col items-center md:items-start space-y-2">
                        <h2 className="text-[#0A192F] text-xl tracking-[0.4em] font-light uppercase">
                            LAZAIN<span className="font-semibold">BLEU</span>
                        </h2>
                        <span className="text-[10px] text-[#C5A27D] tracking-[0.4em] uppercase">Luxury, Inspired by Faith and Heritage</span>
                    </div>

                    <div className="flex gap-8">
                        {[
                            { Icon: Instagram, href: "https://www.instagram.com/lazainbleu" },
                            { Icon: Facebook, href: "#" },
                            { Icon: Youtube, href: "https://www.youtube.com/@LazainBleu" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/company/lazainbleu/" }
                        ].map(({ Icon, href }, idx) => (
                            <Link key={idx} href={href} className="text-[#0A192F]/40 hover:text-[#0A192F] transition-colors duration-300">
                                <Icon className="w-5 h-5 stroke-[1.2px]" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Footer: Legal & Payments */}
                <div className="pt-10 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Copyright & Legal */}
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                            <p className="text-[#0A192F]/40 text-[10px] uppercase tracking-widest font-light">
                                © 2025 Lazain Bleu.
                            </p>
                            <div className="flex gap-6">
                                <Link href="/privacy" className="text-[#0A192F]/40 text-[10px] uppercase tracking-widest font-light hover:text-[#0A192F]">Privacy</Link>
                                <Link href="/terms" className="text-[#0A192F]/40 text-[10px] uppercase tracking-widest font-light hover:text-[#0A192F]">Terms</Link>
                            </div>
                        </div>

                        {/* Payment Methods - Luxury Grayscale Look */}
                        <div className="flex flex-wrap justify-center items-center gap-5 opacity-40 grayscale hover:opacity-80 transition-opacity duration-500">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#0A192F] mr-2">Secure Payment:</span>
                            {/* Di sini Anda bisa mengganti dengan icon SVG asli dari provider bank */}
                            <div className="flex items-center gap-4">
                                <CreditCard className="w-5 h-5 stroke-[1px]" aria-label="Visa" />
                                <div className="text-[10px] font-bold tracking-tighter">VISA</div>
                                <div className="text-[10px] font-bold tracking-tighter">MASTERCARD</div>
                                <div className="text-[10px] font-bold tracking-tighter">AMEX</div>
                                <div className="text-[10px] font-bold tracking-tighter">PAYPAL</div>
                                <div className="text-[10px] font-bold tracking-tighter">BCA</div>
                                <div className="text-[10px] font-bold tracking-tighter">MANDIRI</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}