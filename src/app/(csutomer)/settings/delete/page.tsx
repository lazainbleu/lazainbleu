'use client'

import { useState } from 'react'
import { Trash2, AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DeleteAccountPage() {
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const ready = confirm === 'DELETE'

  return (
    /* Padding disamakan dengan Password Page: pt-12 md:pt-16 */
    <div className="bg-[var(--lb-white)] px-4 pb-20 pt-12 transition-all duration-300 md:pt-16">
      <div className="container-lb mx-auto max-w-xl">
        {/* Navigation - mb-4 agar rapat ke judul seperti Password Page */}
        <div className="mb-4">
          <Link
            href="/settings"
            className="group inline-flex items-center gap-2 text-[var(--lb-neutral)] transition-all hover:text-[var(--lb-bleu)]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Back to Settings
            </span>
          </Link>
        </div>

        {/* Header Section - Menggunakan struktur yang sama dengan Password Page */}
        <header className="mb-6">
          <h1 className="text-3xl font-extralight leading-tight tracking-tight text-[var(--lb-bleu)] md:text-4xl">
            Account{' '}
            <span className="font-semibold italic text-red-600 opacity-90">
              Termination
            </span>
          </h1>
          <p className="mt-1 text-sm font-light text-[var(--lb-neutral)]">
            Seluruh data dan aset digital Anda akan dihapus secara permanen.
          </p>
        </header>

        <div className="overflow-hidden rounded-[24px] border border-[var(--lb-border)] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
          {/* Decorative Warning Bar - Lebih tipis agar tidak terlalu dominan di posisi atas */}
          <div className="h-1 bg-gradient-to-r from-red-500/10 via-red-500 to-red-500/10" />

          <div className="p-7 sm:p-10">
            {/* Warning Icon Section */}
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-red-500">
                Danger Zone
              </p>
            </div>

            {/* Form Section */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="mb-1 ml-1 block text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--lb-neutral)] opacity-70">
                  Type "DELETE" to proceed
                </label>
                <input
                  type="text"
                  placeholder="Konfirmasi penghapusan"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full border-b border-[var(--lb-border)] bg-transparent px-1 py-2 text-center font-medium tracking-wider text-[var(--lb-bleu)] outline-none transition-all duration-300 placeholder:text-slate-200 focus:border-red-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  disabled={!ready || loading}
                  onClick={() => {
                    setLoading(true)
                    // Integrasi Supabase Anda di sini
                  }}
                  className={`flex w-full items-center justify-center gap-3 rounded-xl py-4 text-[10px] font-medium uppercase tracking-widest transition-all duration-500 ${
                    ready
                      ? 'bg-red-600 text-white hover:shadow-[0_10px_25px_rgba(220,38,38,0.15)] active:scale-[0.98]'
                      : 'cursor-not-allowed border border-slate-100 bg-slate-50 text-slate-300'
                  }`}
                >
                  {loading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Permanently Delete
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] font-medium italic text-[var(--lb-neutral)] opacity-40">
                  Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 flex items-center justify-center gap-3 opacity-20">
          <div className="h-[1px] w-8 bg-[var(--lb-bleu)]" />
          <p className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--lb-bleu)]">
            Secure Protocol
          </p>
          <div className="h-[1px] w-8 bg-[var(--lb-bleu)]" />
        </div>
      </div>
    </div>
  )
}
