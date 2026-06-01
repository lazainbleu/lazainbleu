import { betterAuth } from 'better-auth/minimal'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { magicLink } from 'better-auth/plugins/magic-link'
import { Resend } from 'resend'
import { db } from '@/db/client'
import * as schema from '@/db/schema'

const resend = new Resend(process.env.RESEND_API_KEY)

const getMagicLinkEmailHtml = (verificationUrl: string, email: string) => `
  <div style="margin:0;padding:0;background:#070b12;color:#f5f7fa;font-family:Inter,Segoe UI,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;background:#070b12;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;border:1px solid #1d2533;background:#0d1420;border-radius:18px;padding:32px;">
            <tr>
              <td>
                <p style="margin:0 0 8px;color:#8fa4c3;font-size:12px;letter-spacing:0.25em;text-transform:uppercase;">
                  Lazain Bleu Terminal
                </p>
                <h1 style="margin:0 0 12px;font-size:30px;line-height:1.2;font-weight:500;color:#ffffff;">
                  Verify &amp; Enter Terminal
                </h1>
                <p style="margin:0 0 24px;color:#c7d2e2;font-size:15px;line-height:1.7;">
                  A secure one-time access link has been requested for <strong style="color:#ffffff;">${email}</strong>.
                  This link expires in <strong style="color:#ffffff;">5 minutes</strong>.
                </p>
                <a href="${verificationUrl}" style="display:inline-block;padding:13px 26px;border-radius:999px;background:#f3f6ff;color:#0d1420;text-decoration:none;font-weight:600;font-size:14px;letter-spacing:0.04em;">
                  Verify &amp; Enter Terminal
                </a>
                <p style="margin:26px 0 0;color:#8fa4c3;font-size:12px;line-height:1.7;">
                  If you did not request this, you can safely ignore this email.
                </p>
                <p style="margin:12px 0 0;color:#8fa4c3;font-size:11px;line-height:1.7;word-break:break-all;">
                  ${verificationUrl}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  plugins: [
    nextCookies(),
    magicLink({
      expiresIn: 300,
      sendMagicLink: async ({ email, token, url }) => {
        const { error } = await resend.emails.send(
          {
            from: 'Lazain Bleu <onboarding@resend.dev>', // TODO: replace with verified custom domain sender in production.
            to: email,
            subject: 'Your Lazain Bleu access link',
            html: getMagicLinkEmailHtml(url, email),
          },
          {
            idempotencyKey: `magic-link/${token}`,
          }
        )

        if (error) {
          throw new Error(`Magic link email failed: ${error.message}`)
        }
      },
    }),
  ],
  emailAndPassword: {
    enabled: false,
  },
  advanced: {
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    },
  },
})
