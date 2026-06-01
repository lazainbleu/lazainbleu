'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, LogOut } from 'lucide-react'
import { clsx } from 'clsx'
import { authClient } from '@/lib/auth-client'

const formatDate = (value?: Date | string | null) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user ?? null
  const [isSigningOut, setIsSigningOut] = useState(false)
  const provider = 'magic-link'

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await authClient.signOut()
    router.replace('/login')
  }

  return (
    <section className="relative w-full bg-[#f5f4f2] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.4em] text-neutral-400 uppercase">
            Account
          </p>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
            Your Profile
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            View your account details and manage access.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-10 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
          {isPending ? (
            <div className="flex items-center justify-center gap-3 text-sm text-neutral-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading profile...</span>
            </div>
          ) : user ? (
            <div className="space-y-10">
              <div className="grid gap-6 text-sm text-neutral-700">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="tracking-[0.2em] text-neutral-400 uppercase">
                    Email
                  </span>
                  <span className="font-medium text-neutral-900">
                    {user.email ?? '-'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="tracking-[0.2em] text-neutral-400 uppercase">
                    User ID
                  </span>
                  <span className="font-medium text-neutral-900">{user.id}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="tracking-[0.2em] text-neutral-400 uppercase">
                    Provider
                  </span>
                  <span className="font-medium text-neutral-900">{provider}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="tracking-[0.2em] text-neutral-400 uppercase">
                    Created At
                  </span>
                  <span className="font-medium text-neutral-900">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="tracking-[0.2em] text-neutral-400 uppercase">
                    Session Expires
                  </span>
                  <span className="font-medium text-neutral-900">
                    {formatDate(session?.session.expiresAt)}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <h2 className="mb-6 text-sm font-semibold tracking-wide text-neutral-500 uppercase">
                  Security Status
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Your account is protected by one-time magic links with 5-minute expiry.
                  Shipping profile fields from the old Supabase implementation were
                  removed during migration and should be rebuilt on a dedicated Better
                  Auth-compatible profile API if needed.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className={clsx(
                  'flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold tracking-wide uppercase transition',
                  'bg-neutral-900 text-white hover:bg-neutral-800',
                  isSigningOut && 'cursor-not-allowed opacity-70'
                )}
              >
                {isSigningOut ? (
                  <>
                    <span>Processing...</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <p className="text-sm text-neutral-600">
                You are not logged in. Please login or create an account to continue.
              </p>
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/login"
                  className="w-full rounded-full border border-neutral-300 px-8 py-4 text-sm font-semibold tracking-wide text-neutral-900 uppercase hover:border-neutral-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold tracking-wide text-white uppercase hover:bg-neutral-800"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
