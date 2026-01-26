'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'
import { supabase } from '@/lib/supabaseClient'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1 block text-sm font-semibold uppercase tracking-wide text-neutral-500">
      {children}
    </label>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    if (!EMAIL_REGEX.test(email)) {
      setError('Masukkan email yang valid.')
      return
    }

    if (!password) {
      setError('Password wajib diisi.')
      return
    }

    setIsSubmitting(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message || 'Login gagal. Coba lagi.')
        return
      }

      router.replace('/profile')
    } catch (err: unknown) {
      setError('Login gagal. Coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative w-full bg-[#f5f4f2] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">
            Account
          </p>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
            Masuk ke Lazain Bleu
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Kelola profil, pesanan, dan pengalaman belanja Anda.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-10 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Login
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
                className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
              />
            </div>

            <div>
              <FieldLabel>Password</FieldLabel>
              <input
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                disabled={isSubmitting}
                className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                'mt-2 flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wide transition',
                'bg-neutral-900 text-white hover:bg-neutral-800',
                isSubmitting && 'cursor-not-allowed opacity-70'
              )}
            >
              {isSubmitting ? (
                <>
                  <span>Memproses...</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <span>Masuk</span>
              )}
            </button>

            <p className="text-center text-sm text-neutral-500">
              Belum punya akun?{' '}
              <Link href="/register" className="font-semibold text-neutral-900">
                Daftar di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
