'use client'
import { useEffect, useState } from 'react'

export function useScroll(offset = 10) {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.scrollY > offset
  })

  useEffect(() => {
    let frame = 0

    const handle = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        const next = window.scrollY > offset
        setScrolled((prev) => (prev === next ? prev : next))
        frame = 0
      })
    }

    handle()
    window.addEventListener('scroll', handle, { passive: true })

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener('scroll', handle)
    }
  }, [offset])

  return scrolled
}
