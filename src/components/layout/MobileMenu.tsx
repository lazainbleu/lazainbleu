'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { X, User, Search, Globe } from 'lucide-react'
import { clsx } from 'clsx'
import { NAVIGATION_ITEMS } from '@/constants/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useSupabaseSession } from '@/hooks/use-supabase-session'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter()
  const { user } = useSupabaseSession()
  const accountHref = user ? '/profile' : '/login'
  const accountLabel = user ? 'Profile' : 'Login'

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    onClose()
    router.push('/login')
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
        isOpen
          ? 'z-[70] translate-x-0 opacity-100'
          : 'pointer-events-none z-[-1] -translate-x-full opacity-0'
      )}
      style={{
        backgroundColor: 'var(--lb-white)',
        color: 'var(--lb-bleu)',
      }}
    >
      <div className="relative flex h-full flex-col p-6">
        {/* Close Button */}
        <div className="relative z-[80] flex justify-end">
          <button
            onClick={onClose}
            className="-mr-2 touch-manipulation p-4 active:scale-90"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6 stroke-[1.2px]" style={{ color: 'var(--lb-bleu)' }} />
          </button>
        </div>

        {/* Main Content */}
        <div className="-mt-16 flex grow flex-col items-center justify-center">
          <nav className="mb-12 flex flex-col items-center space-y-8">
            {NAVIGATION_ITEMS.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  'text-xl font-light uppercase tracking-[0.2em] transition-all duration-700',
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}
                style={{
                  transitionDelay: `${isOpen ? idx * 50 : 0}ms`,
                  color: 'var(--lb-bleu)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div
            className={clsx(
              'relative z-[90] flex justify-center gap-10 transition-all delay-300 duration-1000',
              isOpen
                ? 'pointer-events-auto translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-4 opacity-0'
            )}
          >
            <Link
              href={accountHref}
              onClick={onClose}
              aria-label={accountLabel}
              className="-m-3 p-3 transition-all hover:opacity-50 active:scale-90"
            >
              <User
                className="h-5 w-5 stroke-[1.1px]"
                style={{ color: 'var(--lb-bleu)' }}
              />
            </Link>

            <button
              className="-m-3 p-3 transition-all hover:opacity-50 active:scale-90"
              onClick={() => console.log('Search clicked')}
            >
              <Search
                className="h-5 w-5 stroke-[1.1px]"
                style={{ color: 'var(--lb-bleu)' }}
              />
            </button>

            <button
              className="-m-3 p-3 transition-all hover:opacity-50 active:scale-90"
              onClick={() => console.log('Globe clicked')}
            >
              <Globe
                className="h-5 w-5 stroke-[1.1px]"
                style={{ color: 'var(--lb-bleu)' }}
              />
            </button>
          </div>

          {/* Login / Logout */}
          <div
            className={clsx(
              'mt-10 flex flex-col items-center gap-3 text-sm uppercase tracking-[0.2em] transition-all duration-700',
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
          >
            {user ? (
              <button
                onClick={handleSignOut}
                className="rounded-full px-6 py-3 text-[11px] font-semibold transition-all active:scale-95"
                style={{
                  border: '1px solid var(--lb-border)',
                  color: 'var(--lb-bleu)',
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="rounded-full px-6 py-3 text-[11px] font-semibold transition-all active:scale-95"
                  style={{
                    border: '1px solid var(--lb-border)',
                    color: 'var(--lb-bleu)',
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={onClose}
                  className="rounded-full px-6 py-3 text-[11px] font-semibold transition-all active:scale-95"
                  style={{
                    backgroundColor: 'var(--lb-bleu)',
                    color: 'var(--lb-white)',
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
