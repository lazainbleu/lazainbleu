'use client'

import Link from 'next/link'
import { ChevronRight, Lock, Trash2, Settings2, LucideIcon } from 'lucide-react'

// 1. Data Configuration - Tambahkan menu baru di sini dengan mudah
interface SettingItem {
  id: string
  title: string
  description: string
  href: string
  icon: LucideIcon
  variant: 'default' | 'danger'
}

const SETTINGS_MENU: SettingItem[] = [
  {
    id: 'password',
    title: 'Security & Password',
    description: 'Update credentials and protect your digital assets.',
    href: '/settings/password',
    icon: Lock,
    variant: 'default',
  },
  {
    id: 'delete',
    title: 'Account Termination',
    description: 'Permanently wipe your data and close this profile.',
    href: '/settings/delete',
    icon: Trash2,
    variant: 'danger',
  },
]

export default function SettingsPage() {
  return (
    /* Padding disesuaikan ke pt-12 (mobile) dan pt-16 (desktop) agar sejajar dengan halaman sub-settings */
    <div className="min-h-screen bg-[var(--lb-white)] px-4 pb-20 pt-12 transition-all duration-300 md:pt-16">
      <div className="container-lb mx-auto max-w-[760px]">
        {/* Header Section */}
        <header className="animate-in fade-in slide-in-from-top-4 mb-12 duration-700">
          <div className="mb-4 flex items-center gap-3 opacity-70">
            <div className="rounded-lg border border-[var(--lb-border)] bg-white p-2">
              <Settings2 size={16} strokeWidth={2} className="text-[var(--lb-bleu)]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--lb-neutral)] sm:text-[11px]">
              Account Control
            </span>
          </div>
          <h1 className="text-3xl font-extralight leading-tight tracking-tight text-[var(--lb-bleu)] sm:text-5xl">
            Settings <span className="font-semibold italic opacity-90">Management</span>
          </h1>
          <div className="mt-6 h-[1px] w-24 bg-[var(--lb-bleu)] opacity-10" />
        </header>

        {/* Settings Grid */}
        <div className="grid gap-5">
          {SETTINGS_MENU.map((item) => {
            const Icon = item.icon
            const isDanger = item.variant === 'danger'

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group relative block rounded-[24px] border border-[var(--lb-border)] bg-white p-5 transition-all duration-500 active:scale-[0.98] sm:p-7 ${
                  isDanger
                    ? 'hover:border-red-100 hover:shadow-[0_40px_80px_-20px_rgba(220,38,38,0.08)]'
                    : 'hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.08)]'
                }`}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-5 sm:gap-7">
                    {/* Icon Container */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:rotate-6 ${
                        isDanger
                          ? 'border-red-100/50 bg-red-50/50 text-red-500 group-hover:bg-red-600 group-hover:text-white'
                          : 'border-[var(--lb-border)] bg-[var(--lb-white)] text-[var(--lb-bleu)] group-hover:bg-[var(--lb-bleu)] group-hover:text-[var(--lb-white)]'
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </div>

                    {/* Text Content */}
                    <div>
                      <h2
                        className={`text-lg font-medium transition-colors duration-300 ${isDanger ? 'text-[var(--lb-bleu)] group-hover:text-red-600' : 'text-[var(--lb-bleu)]'} `}
                      >
                        {item.title}
                      </h2>
                      <p className="mt-1 max-w-[280px] text-sm font-light leading-relaxed text-[var(--lb-neutral)] sm:max-w-none">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div
                    className={`hidden h-10 w-10 -translate-x-4 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:flex ${isDanger ? 'bg-red-50/30 text-red-600' : 'bg-[var(--lb-white)] text-[var(--lb-bleu)]'} `}
                  >
                    <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Brand Signifier */}
        <footer className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-[var(--lb-border)] pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--lb-bleu)] opacity-40">
              End-to-End Encryption
            </span>
          </div>
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[var(--lb-bleu)] opacity-10"
              />
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}
