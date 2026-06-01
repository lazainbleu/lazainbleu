import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PROTECTED_PATHS = ['/cart', '/checkout', '/profile', '/settings']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtected = PROTECTED_PATHS.some((protectedPath) =>
    path.startsWith(protectedPath)
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  // Ambil token session dari cookie untuk pengecekan cepat sebelum hit API
  const sessionToken = request.cookies.get('better-auth.session_token')?.value

  if (!sessionToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // Panggil API Better Auth menggunakan fetch standar agar kompatibel di Edge Runtime
    const baseUrl = process.env.BETTER_AUTH_URL || new URL(request.url).origin
    const response = await fetch(`${baseUrl}/api/auth/get-session`, {
      headers: {
        // Teruskan cookie asli dari browser agar Better Auth bisa memvalidasi session
        cookie: request.headers.get('cookie') || '',
      },
    })

    const sessionResult = await response.json()

    if (!sessionResult?.session) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', path)
      return NextResponse.redirect(loginUrl)
    }
  } catch (error) {
    // Jika API gagal merespons, amankan dengan melempar user ke halaman login
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cart/:path*', '/checkout/:path*', '/profile/:path*', '/settings/:path*'],
}
