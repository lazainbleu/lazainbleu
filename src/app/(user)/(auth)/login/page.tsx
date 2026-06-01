'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { clsx } from 'clsx'
import { magicLink } from '@/lib/auth-client'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1 block text-sm font-semibold tracking-wide text-neutral-500 uppercase">
      {children}
    </label>
  )
}

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      const callbackURL =
        typeof window === 'undefined' ? '/profile' : `${window.location.origin}/profile`

      const { error: signInError } = await magicLink.signInDynamic(email, callbackURL)

      if (signInError) {
        setError(signInError.message || 'Failed to send magic link. Please try again.')
        return
      }

      setSuccessMessage('Magic link sent. Please check your inbox.')
      form.reset()
    } catch {
      setError('Failed to send magic link. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative w-full bg-[#f5f4f2] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.4em] text-neutral-400 uppercase">
            Account
          </p>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
            Enter Lazain Bleu
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Passwordless access with a one-time magic link sent to your email.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-10 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
          <h2 className="mb-8 text-sm font-semibold tracking-wide text-neutral-500 uppercase">
            Magic Link Sign In
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-8" noValidate>
            <div>
              <FieldLabel>Email</FieldLabel>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                disabled={isSubmitting}
                className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 transition outline-none focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {successMessage && (
              <div className="flex items-center gap-2 text-sm text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                <span>{successMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                'mt-2 flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold tracking-wide uppercase transition',
                'bg-neutral-900 text-white hover:bg-neutral-800',
                isSubmitting && 'cursor-not-allowed opacity-70'
              )}
            >
              {isSubmitting ? (
                <>
                  <span>Processing...</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <span>Send Magic Link</span>
              )}
            </button>

            <p className="text-center text-sm text-neutral-500">
              First time here?{' '}
              <Link href="/register" className="font-semibold text-neutral-900">
                Continue with email
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
