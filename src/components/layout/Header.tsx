'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingCart, Menu, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { useScroll } from '@/hooks/use-scroll';
import { MobileMenu } from './MobileMenu';

export default function Header() {
    const isScrolled = useScroll(20);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <header className={clsx(
            'fixed left-0 right-0 z-50 transition-all duration-700 ease-in-out',
            isScrolled ? 'top-0' : 'top-0 md:top-9'
        )}>
            <div className={clsx(
                'w-full border-b transition-all duration-500',
                isScrolled ? 'bg-white/90 backdrop-blur-md py-3 border-neutral-100' : 'bg-white border-transparent py-4 md:py-6'
            )}>
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">

                    {/* LEFT */}
                    <div className="flex items-center w-1/4 lg:w-1/3">
                        <button
                            className="lg:hidden p-2 -ml-2 active:scale-90 transition-transform"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-5 h-5 stroke-[1.2px]" />
                        </button>
                        <DesktopNav items={NAVIGATION_ITEMS.slice(0, 2)} showGlobe />
                    </div>

                    {/* CENTER: Logo & Tagline */}
                    <Logo isScrolled={isScrolled} />

                    {/* RIGHT */}
                    <div className="flex items-center justify-end gap-3 w-1/4 lg:w-1/3">
                        <DesktopNav items={NAVIGATION_ITEMS.slice(2)} className="mr-4" />
                        <ActionIcons />
                    </div>
                </div>
            </div>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </header>
    );
}

function Logo({ isScrolled }: { isScrolled: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <Link href="/" className="group block">
                <h1 className={clsx(
                    "font-light tracking-[0.3em] md:tracking-[0.5em] transition-all duration-700 uppercase leading-none",
                    isScrolled ? "text-base md:text-lg" : "text-xl md:text-2xl"
                )}>
                    LAZAIN<span className="font-medium text-[#0A192F]"> BLEU</span>
                </h1>

                <div className={clsx(
                    "transition-all duration-700 overflow-hidden",
                    isScrolled
                        ? "max-h-0 opacity-0 mt-0"
                        : "max-h-10 opacity-100 mt-2"
                )}>
                    <p className="text-[7px] md:text-[8px] tracking-[0.4em] md:tracking-[0.6em] uppercase text-neutral-400 whitespace-nowrap">
                        Parfumerie d'Excellence
                    </p>
                </div>
            </Link>
        </div>
    );
}

function DesktopNav({ items, showGlobe, className }: any) {
    return (
        <nav className={clsx("hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.15em]", className)}>
            {showGlobe && (
                <button className="flex items-center gap-1 group">
                    <Globe className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" strokeWidth={1.2} />
                    <span className="font-medium">EN</span>
                </button>
            )}
            {items.map((item: any) => (
                <Link key={item.href} href={item.href} className="hover:opacity-40 transition-opacity">
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}

function ActionIcons() {
    return (
        <div className="flex items-center gap-1.5 md:gap-4">
            <button className="p-1 hover:opacity-50 transition-opacity" aria-label="Search">
                <Search className="w-5 h-5 stroke-[1.1px]" />
            </button>
            <button className="hidden md:block p-1 hover:opacity-50 transition-opacity" aria-label="Account">
                <User className="w-5 h-5 stroke-[1.1px]" />
            </button>
            <button className="relative p-1 hover:opacity-50 transition-opacity" aria-label="Cart">
                <ShoppingCart className="w-5 h-5 stroke-[1.1px]" />
                <span className="absolute -top-1 -right-1 text-[7px] bg-[#0A192F] text-white w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                    0
                </span>
            </button>
        </div>
    );
}