import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // menghentikan Next.js menambah include otomatis ke tsconfig
    tsconfigPath: './tsconfig.json',
  },
  typedRoutes: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Mengizinkan semua path gambar dari unsplash
      },
    ],
  },
}

export default nextConfig
