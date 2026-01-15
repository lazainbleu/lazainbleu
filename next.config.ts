import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // menghentikan Next.js menambah include otomatis ke tsconfig
    tsconfigPath: './tsconfig.json',
  },
}

export default nextConfig
