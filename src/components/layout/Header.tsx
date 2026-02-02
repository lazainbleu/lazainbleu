'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingCart, Menu, Globe } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { clsx } from 'clsx'
import { NAVIGATION_ITEMS } from '@/constants/navigation'
import { useScroll } from '@/hooks/use-scroll'
import { useSupabaseSession } from '@/hooks/use-supabase-session'
import { MobileMenu } from './MobileMenu'
import CartSlider from '@/components/cart/CartSlider'

export default function Header() {
  const isScrolled = useScroll(10)
  const { user, isLoading } = useSupabaseSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
  }, [isMobileMenuOpen])

  const transitionClass = 'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]'

  return (
    <header
      className={clsx(
        'fixed left-0 right-0 top-0 z-50 bg-[var(--lb-white)]',
        transitionClass,
        isScrolled ? 'shadow-sm' : 'pt-2 md:pt-4'
      )}
    >
      <div
        className={clsx(
          'w-full border-b',
          transitionClass,
          isScrolled
            ? 'border-neutral-100 bg-[var(--lb-white)] py-2 backdrop-blur-md'
            : 'border-transparent py-3 md:py-5'
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 md:px-8">
          {/* LEFT */}
          <div className="flex w-1/4 items-center lg:w-1/3">
            <button
              className="-ml-2 p-2 transition-transform active:scale-90 lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5 stroke-[1.2px]" />
            </button>
            <DesktopNav items={NAVIGATION_ITEMS.slice(0, 2)} showGlobe />
          </div>

          {/* CENTER */}
          <Logo isScrolled={isScrolled} transitionClass={transitionClass} />

          {/* RIGHT */}
          <div className="flex w-1/4 items-center justify-end gap-3 lg:w-1/3">
            <DesktopNav items={NAVIGATION_ITEMS.slice(2)} className="mr-4" />
            <ActionIcons
              onOpenCart={() => setIsCartOpen(true)}
              user={user}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* CART SLIDER (FIX) */}
      <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

function Logo({ isScrolled, transitionClass }: any) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Link href="/" className="group block">
        <h1
          className={clsx(
            'font-light uppercase leading-none tracking-[0.3em] md:tracking-[0.5em]',
            transitionClass,
            isScrolled ? 'text-sm md:text-base' : 'text-lg md:text-2xl'
          )}
        >
          LAZAIN<span className="font-medium text-[#0A192F]"> BLEU</span>
        </h1>

        <div
          className={clsx(
            'overflow-hidden',
            transitionClass,
            isScrolled ? 'mt-0 max-h-0 opacity-0' : 'mt-2 max-h-10 opacity-100'
          )}
        >
          <p className="whitespace-nowrap text-[7px] uppercase tracking-[0.4em] text-neutral-400 md:text-[8px] md:tracking-[0.6em]">
            Parfumerie d'Excellence
          </p>
        </div>
      </Link>
    </div>
  )
}

function DesktopNav({ items, showGlobe, className }: any) {
  return (
    <nav
      className={clsx(
        'hidden items-center gap-8 text-[11px] uppercase tracking-[0.15em] lg:flex',
        className
      )}
    >
      {showGlobe && (
        <button className="group flex items-center gap-1">
          <Globe
            className="h-3.5 w-3.5 text-neutral-400 group-hover:text-black"
            strokeWidth={1.2}
          />
          <span className="font-medium">EN</span>
        </button>
      )}

      {items.map((item: any) => (
        <Link
          key={item.href}
          href={item.href}
          className="transition-opacity duration-300 hover:opacity-40"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

function ActionIcons({
  onOpenCart,
  user,
  isLoading,
}: {
  onOpenCart: () => void
  user: SupabaseUser | null
  isLoading: boolean
}) {
  const accountHref = user ? '/profile' : '/login'
  const accountLabel = user ? 'Profile' : 'Login'

  return (
    <div className="flex items-center gap-1.5 md:gap-4">
      <button className="p-1 hover:opacity-50" aria-label="Search">
        <Search className="h-5 w-5 stroke-[1.1px]" />
      </button>

      <Link
        href={accountHref}
        className="hidden items-center gap-2 p-1 hover:opacity-50 md:flex"
        aria-label={accountLabel}
      >
        <User className="h-5 w-5 stroke-[1.1px]" />
        {/* <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
          {isLoading ? 'Account' : accountLabel}
        </span> */}
        <span
          className={clsx(
            'h-1.5 w-1.5 rounded-full',
            isLoading ? 'bg-neutral-200' : user ? 'bg-emerald-600' : 'bg-neutral-400'
          )}
        />
      </Link>

      <button
        className="relative p-1 hover:opacity-50"
        aria-label="Cart"
        onClick={onOpenCart}
      >
        <ShoppingCart className="h-5 w-5 stroke-[1.1px]" />

        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0A192F] text-[7px] font-bold text-white">
          0
        </span>
      </button>
    </div>
  )
}
