'use client'

import { useState } from 'react'
import { ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  return (
    /* Hapus min-h-screen agar tidak dipaksa ke tengah, pt dikurangi menjadi 12 untuk posisi paling atas */
    <div className="bg-[var(--lb-white)] px-4 pb-20 pt-12 md:pt-16">
      <div className="container-lb mx-auto max-w-[550px]">
        {/* Navigation - mb dikurangi agar sangat rapat ke judul */}
        <Link
          href="/settings"
          className="group mb-4 inline-flex items-center gap-2 text-[var(--lb-neutral)] transition-colors hover:text-[var(--lb-bleu)]"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Back to Settings
          </span>
        </Link>

        <header className="mb-6">
          <h1 className="text-3xl font-extralight leading-tight tracking-tight text-[var(--lb-bleu)] md:text-4xl">
            Security <span className="font-semibold italic opacity-90">Update</span>
          </h1>
          <p className="mt-1 text-sm font-light text-[var(--lb-neutral)]">
            Amankan akun Anda dengan kredensial baru.
          </p>
        </header>

        {/* Form Card - Desain tetap sama sesuai request */}
        <div className="rounded-[24px] border border-[var(--lb-border)] bg-white p-7 shadow-[0_15px_40px_rgba(0,0,0,0.02)] sm:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setLoading(true)
              // Integrasi Supabase Anda di sini
            }}
            className="space-y-8"
          >
            {/* Input Group: Current Password */}
            <div className="group relative">
              <label className="mb-1 ml-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--lb-neutral)] opacity-70">
                Current Password
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                className="w-full border-b border-[var(--lb-border)] bg-transparent px-1 py-2 text-sm tracking-[0.2em] text-[var(--lb-bleu)] outline-none transition-all duration-300 placeholder:text-slate-200 focus:border-[var(--lb-bleu)]"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Input Group: New Password */}
            <div className="group relative">
              <label className="mb-1 ml-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--lb-neutral)] opacity-70">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="w-full border-b border-[var(--lb-border)] bg-transparent px-1 py-2 text-sm tracking-[0.2em] text-[var(--lb-bleu)] outline-none transition-all duration-300 placeholder:text-slate-200 focus:border-[var(--lb-bleu)]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute bottom-2 right-1 text-[var(--lb-neutral)] opacity-50 transition-colors hover:text-[var(--lb-bleu)] hover:opacity-100"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--lb-bleu)] py-4 text-[10px] font-medium uppercase tracking-widest text-[var(--lb-white)] transition-all duration-500 hover:shadow-[0_10px_25px_rgba(15,23,42,0.15)] active:scale-[0.98] disabled:opacity-40"
              >
                {loading ? (
                  <div className="border-[var(--lb-white)]/30 h-4 w-4 animate-spin rounded-full border-2 border-t-[var(--lb-white)]" />
                ) : (
                  <>
                    <ShieldCheck size={16} strokeWidth={2} />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Note */}
        <div className="mt-8 flex items-center justify-center gap-3 opacity-30">
          <div className="h-[1px] w-8 bg-[var(--lb-bleu)]" />
          <p className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--lb-bleu)]">
            Secure Session
          </p>
          <div className="h-[1px] w-8 bg-[var(--lb-bleu)]" />
        </div>
      </div>
    </div>
  )
}
