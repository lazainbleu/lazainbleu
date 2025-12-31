'use client';

import React from 'react';
import Image from 'next/image';
import { Playfair_Display, Manrope } from 'next/font/google';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' });

const ASSETS = {
    hero: "/assets/try.jpg",
    founder: "/images/owner.png",
    heritage: "/images/heritage.jpg",
};

export default function AboutBrand() {
    return (
        <main className={clsx(
            playfair.variable, manrope.variable,
            "bg-[#0D0D0D] text-[#ECECE8] font-sans selection:bg-[#C5A059] selection:text-black overflow-x-hidden"
        )}>

            {/* --- 1. NEW AVANT-GARDE HERO --- */}
            <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 border-b border-white/5">
                {/* Left Side: Text Dominance */}
                <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-12 lg:p-20 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="w-8 h-[1px] bg-[#C5A059]" />
                        <span className="text-[10px] tracking-[0.8em] uppercase text-[#C5A059]">Maison Lazain Bleu</span>
                    </motion.div>

                    <div className="my-12 lg:my-0">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="font-serif text-[18vw] lg:text-[13vw] leading-[0.75] tracking-tighter"
                        >
                            Soul <br /> <span className="italic opacity-20">Inhaled.</span>
                        </motion.h1>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <p className="text-[11px] leading-relaxed opacity-40 uppercase tracking-[0.2em] max-w-[280px]">
                            Inspired by the sanctity of faith and the timelessness of Andalusian heritage.
                        </p>
                        <span className="font-serif italic text-4xl opacity-10 hidden md:block">Paris — 2025</span>
                    </div>
                </div>

                {/* Right Side: Image Monolith */}
                <div className="lg:col-span-5 relative h-[50vh] lg:h-full order-1 lg:order-2 overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2.5 }}
                        className="h-full w-full"
                    >
                        <Image src={ASSETS.hero} alt="The Scent" fill className="object-cover grayscale contrast-125 brightness-75" priority />
                    </motion.div>
                    {/* Vertical Label */}
                    <div className="absolute bottom-12 right-0 origin-right rotate-90 translate-x-full pr-12 hidden lg:block">
                        <span className="text-[9px] tracking-[1em] uppercase opacity-30 whitespace-nowrap">Authentic Craftsmanship</span>
                    </div>
                </div>
            </section>

            {/* --- 2. THE SACRED STATEMENT --- */}
            <section className="py-40 px-6 md:px-20 text-center bg-white text-black">
                <motion.div
                    whileInView={{ opacity: [0, 1], y: [20, 0] }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto space-y-12"
                >
                    <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#C5A059]">The Covenant</span>
                    <h2 className="font-serif text-4xl md:text-7xl leading-tight tracking-tighter">
                        "Beauty is a <span className="italic opacity-30">silent prayer</span>, and scent is its most profound language."
                    </h2>
                    <p className="text-xl font-light opacity-60 max-w-2xl mx-auto leading-relaxed">
                        Maison Lazain Bleu lahir dari pencarian makna. Kami mengolah niat menjadi aroma, memadukan tradisi spiritual dengan presisi modern.
                    </p>
                </motion.div>
            </section>

            {/* --- 3. FOUNDER: THE PORTRAIT (REFINED SIZE) --- */}
            <section className="py-32 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm aspect-[3/4] bg-[#1A1A1A] border border-white/5 p-4 grayscale transition-all duration-1000 hover:grayscale-0">
                        <Image
                            src={ASSETS.founder}
                            alt="Zain"
                            fill
                            className="object-contain p-6"
                        />
                    </div>
                </div>
                <div className="lg:col-span-7 space-y-10">
                    <span className="text-[10px] tracking-[0.5em] uppercase opacity-40">Creative Director</span>
                    <h3 className="font-serif text-7xl md:text-9xl tracking-tighter">Zain.</h3>
                    <p className="text-2xl font-light italic opacity-60 max-w-xl border-l border-[#C5A059] pl-8">
                        "Warisan bukan tentang apa yang kita tinggalkan, tapi tentang apa yang kita bawa ke masa depan dengan kejujuran."
                    </p>
                    <div className="pt-8">
                        <div className="h-[1px] w-20 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* --- 4. ATELIER GRID: DARK MODE LUXE --- */}
            <section className="py-40 px-6 md:px-20 bg-[#080808] border-y border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5">
                    {[
                        { t: "Sacred Sourcing", d: "Memanen bahan dari tanah yang diberkati tradisi." },
                        { t: "Slow Infusion", d: "Waktu adalah bahan kami yang paling rahasia." },
                        { t: "Divine Design", d: "Botol yang dirancang untuk keabadian visual." }
                    ].map((item, i) => (
                        <div key={i} className="bg-[#0D0D0D] p-12 space-y-8 hover:bg-black transition-all duration-500">
                            <span className="text-[#C5A059] font-mono text-xs">0{i + 1} —</span>
                            <h4 className="font-serif text-2xl tracking-wide">{item.t}</h4>
                            <p className="text-xs opacity-30 leading-relaxed tracking-widest uppercase">{item.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 5. THE FINAL CALL --- */}
            <section className="py-40 bg-white text-black flex flex-col items-center justify-center text-center px-6">
                <motion.div whileInView={{ opacity: [0, 1] }} className="space-y-12">
                    <h2 className="font-serif text-5xl md:text-[8vw] leading-none tracking-tighter">Wear the Invisible.</h2>
                    <button className="group relative px-16 py-6 border border-black overflow-hidden">
                        <span className="relative z-10 text-[10px] tracking-[0.8em] uppercase font-bold group-hover:text-white transition-colors duration-500">
                            Enter Collection
                        </span>
                        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19, 1, 0.22, 1]" />
                    </button>
                </motion.div>
            </section>

        </main>
    );
}