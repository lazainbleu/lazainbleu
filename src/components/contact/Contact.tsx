// src/components/contact/Contact.tsx
'use client'

import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import { Send, Loader2, CheckCircle2, Phone, MessageCircle } from 'lucide-react'

type Props = {
  whatsappNumber?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SUBMIT_COOLDOWN_MS = 30_000

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-sm font-semibold uppercase tracking-wide text-neutral-500">
      {children}
    </label>
  )
}

export default function Contact({ whatsappNumber = '+6281359049439' }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hpRef = useRef<HTMLInputElement | null>(null)

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const last = Number(localStorage.getItem('lb_contact_last') || '0')
    if (Date.now() - last < SUBMIT_COOLDOWN_MS) {
      setError('Please wait before sending again.')
      return
    }

    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    let message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    const honeypot =
      (form.elements.namedItem('hp') as HTMLInputElement | null)?.value || ''

    message = message.slice(0, 5000)

    if (!name) return setError('Name is required.')
    if (!EMAIL_REGEX.test(email)) return setError('Enter a valid email.')
    if (!message || message.length < 3) return setError('Message is required.')
    if (honeypot !== '') return setError('Spam detected.')

    setIsSubmitting(true)
    const controller = new AbortController()
    const tm = setTimeout(() => controller.abort(), 12_000)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ name, email, message, hp: honeypot }),
      })

      clearTimeout(tm)

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload?.error || 'Failed to send message.')
      }

      setIsSuccess(true)
      form.reset()
      localStorage.setItem('lb_contact_last', String(Date.now()))
      setTimeout(() => setIsSuccess(false), 4000)
    } catch (err: any) {
      if (err.name === 'AbortError') setError('Request timed out. Please try again.')
      else setError(err?.message || 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-var(--lb-white) relative w-full py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <header className="mb-20 text-center">
          <h1 className="mb-4 font-serif text-3xl tracking-tight text-[var(--lb-bleu)] md:text-4xl">
            Contact Us
          </h1>

          <div className="mx-auto mb-5 h-[1px] w-8 bg-[var(--lb-bleu)] opacity-20" />
          <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--lb-neutral)] md:text-[12px]">
            Assistance and Fragrance Guidance
          </p>

          <p className="mx-auto max-w-2xl font-serif text-base italic leading-relaxed text-[var(--lb-neutral)] md:text-lg">
            The Lazain Bleu team is here to assist with any enquiries. You will find our
            Headquarters office details, along with dedicated contacts for key areas of
            our maison such as fragrance enquiries, retail partnerships, and private
            client services.
          </p>
        </header>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column */}
          <div className="space-y-10">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Other Contact
              </h3>
              <p className="text-base text-neutral-600">
                For collaborations, support, or wholesale inquiries.
              </p>
            </div>

            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-[#fbfbfa] shadow-sm">
                <Phone className="h-5 w-5 text-neutral-800" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  Call Us
                </div>
                <div className="mt-1 text-base font-light text-neutral-900">
                  +62 813-5904-9439
                </div>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-[#fbfbfa] shadow-sm transition group-hover:bg-green-600 group-hover:text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  WhatsApp
                </div>
                <div className="mt-1 text-base font-light text-neutral-900">
                  Chat with us directly
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Form */}
          <div className="rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-10 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
            <h4 className="mb-8 text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Contact Form
            </h4>

            <form onSubmit={handleSubmit} className="grid gap-8" noValidate>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <FieldLabel>Name</FieldLabel>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    maxLength={120}
                    disabled={isSubmitting}
                    className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                  />
                </div>

                <div>
                  <FieldLabel>Email</FieldLabel>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    maxLength={200}
                    disabled={isSubmitting}
                    className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Message</FieldLabel>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Write your inquiry here…"
                  maxLength={5000}
                  disabled={isSubmitting}
                  className="w-full resize-none appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                />
              </div>

              {/* honeypot */}
              <input
                name="hp"
                ref={hpRef}
                className="absolute left-[-9999px] opacity-0"
                aria-hidden
                tabIndex={-1}
              />

              {error && <div className="text-sm text-red-600">{error}</div>}

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={clsx(
                  'mt-3 flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wide transition-colors duration-300',
                  // default button
                  'bg-[var(--lb-bleu)] text-[var(--lb-white)] hover:bg-[#0c1422]',
                  // success
                  isSuccess && 'bg-green-600 text-[var(--lb-white)]',
                  // disabled (jangan ubah warna, cuma opacity)
                  (isSubmitting || isSuccess) && 'cursor-not-allowed opacity-70'
                )}
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : isSuccess ? (
                  <>
                    <span>Sent</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
