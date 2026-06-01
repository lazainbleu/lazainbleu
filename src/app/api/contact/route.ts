// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const BodySchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  hp: z.string().optional(),
})
type Body = z.infer<typeof BodySchema>

// In-memory rate limiter (suitable for single-instance / small sites)
const RATE_LIMIT_MAP = new Map<string, { count: number; reset: number }>()
const WINDOW_MS = 60_000 // 1 minute window
const MAX_PER_WINDOW = 6

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Validate origin for production+development:
 * - allows localhost (dev)
 * - allows SITE_DOMAIN and comma-separated ALLOWED_ORIGINS (production)
 *
 * Expected env:
 *   SITE_DOMAIN=lazainbleu.com
 *   ALLOWED_ORIGINS=app.lazainbleu.com,other.example.com
 */
function validateOrigin(req: Request): boolean {
  const originHeader = req.headers.get('origin') || req.headers.get('referer') || ''
  if (!originHeader) return true // no origin (server-to-server) => allow

  const siteDomainsRaw = process.env.SITE_DOMAIN || ''
  const extraRaw = process.env.ALLOWED_ORIGINS || ''

  // helper: normalize entry -> host[:port] (if entry contains protocol, extract host)
  const normalize = (entry: string) => {
    const trimmed = entry.trim()
    if (!trimmed) return ''
    try {
      if (trimmed.includes('://')) {
        return new URL(trimmed).host.toLowerCase()
      }
      return trimmed.toLowerCase()
    } catch {
      return trimmed.toLowerCase()
    }
  }

  const allowedProd = siteDomainsRaw.split(',').map(normalize).filter(Boolean)

  const allowedExtra = extraRaw.split(',').map(normalize).filter(Boolean)

  const allowed = new Set<string>([
    ...allowedProd,
    ...allowedExtra,
    'localhost:3000',
    '127.0.0.1:3000',
    'localhost',
    '127.0.0.1',
  ])

  // extract host from origin
  let originHost = ''
  try {
    originHost = new URL(originHeader).host.toLowerCase() // host:port if present
  } catch {
    // If header isn't a full URL try to fallback to header string normalized
    originHost = originHeader.toLowerCase()
  }

  // direct match (host or host:port) OR subdomain match
  for (const a of allowed) {
    if (!a) continue
    if (originHost === a) return true
    // allow subdomains: e.g. originHost = "app.lazainbleu.com" and a = "lazainbleu.com"
    if (originHost.endsWith(`.${a}`)) return true
  }

  return false
}

export async function POST(req: Request) {
  try {
    // origin check (production + development)
    if (!validateOrigin(req)) {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
    }

    const ip = (
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown'
    )
      .split(',')[0]
      .trim()

    const json = await req.json().catch(() => ({}))
    const parsed = BodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    const body: Body = parsed.data

    // honeypot
    if (body.hp && body.hp.trim() !== '') {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    // rate limit (in-memory)
    const now = Date.now()
    const state = RATE_LIMIT_MAP.get(ip) || { count: 0, reset: now + WINDOW_MS }
    if (state.reset < now) {
      state.count = 0
      state.reset = now + WINDOW_MS
    }
    state.count += 1
    RATE_LIMIT_MAP.set(ip, state)
    if (state.count > MAX_PER_WINDOW) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // required envs (Resend + receiver)
    const RECEIVER = process.env.CONTACT_RECEIVER_EMAIL
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RECEIVER || !RESEND_API_KEY) {
      console.error('Missing email envs')
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    // Lazain Bleu: use the official Resend sender for now.
    // NOTE: Replace with your verified custom domain sender in production.
    const FROM = 'Lazain Bleu <onboarding@resend.dev>'

    const resend = new Resend(RESEND_API_KEY)

    // build email content
    const subject = `[Lazain Bleu] Contact from ${body.name}`
    const text = `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`
    const html = `<p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
<hr/>
<p>${escapeHtml(body.message).replace(/\n/g, '<br/>')}</p>`

    // send via Resend
    const { error } = await resend.emails.send({
      from: FROM,
      replyTo: body.email,
      to: RECEIVER,
      subject,
      text,
      html,
    })

    if (error) {
      console.error('Resend contact email error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
