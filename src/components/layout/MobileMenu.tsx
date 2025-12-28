'use client';

import Link from 'next/link';
import { X, User, Search, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { NAVIGATION_ITEMS } from '@/constants/navigation';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    return (
        <div className={clsx(
            'fixed inset-0 bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
            isOpen ? 'z-[70] opacity-100 translate-x-0' : 'z-[-1] opacity-0 -translate-x-full pointer-events-none'
        )}>
            <div className="flex flex-col h-full p-6 relative">
                {/* Close Button */}
                <div className="flex justify-end relative z-[80]">
                    <button
                        onClick={onClose}
                        className="p-4 -mr-2 active:scale-90 touch-manipulation"
                        aria-label="Close Menu"
                    >
                        <X className="w-6 h-6 stroke-[1.2px] text-[#0A192F]" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center justify-center grow -mt-16">
                    <nav className="flex flex-col items-center space-y-8 mb-12">
                        {NAVIGATION_ITEMS.map((item, idx) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={clsx(
                                    "text-xl font-light tracking-[0.2em] uppercase transition-all duration-700",
                                    isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                )}
                                style={{ transitionDelay: `${isOpen ? idx * 50 : 0}ms` }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Action Icons - Wrapped in Buttons */}
                    <div className={clsx(
                        "flex justify-center gap-10 transition-all duration-1000 delay-300 relative z-[90]",
                        isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
                    )}>
                        <button
                            className="p-3 -m-3 hover:opacity-50 active:scale-90 transition-all"
                            onClick={() => console.log('Account clicked')}
                        >
                            <User className="w-5 h-5 stroke-[1.1px]" />
                        </button>

                        <button
                            className="p-3 -m-3 hover:opacity-50 active:scale-90 transition-all"
                            onClick={() => console.log('Search clicked')}
                        >
                            <Search className="w-5 h-5 stroke-[1.1px]" />
                        </button>

                        <button
                            className="p-3 -m-3 hover:opacity-50 active:scale-90 transition-all"
                            onClick={() => console.log('Globe clicked')}
                        >
                            <Globe className="w-5 h-5 stroke-[1.1px]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}