'use client'
import { useEffect, useState } from 'react'

export function useScroll(offset = 10) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastY = 0
    const handle = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY) > 2) {
        setScrolled(y > offset)
        lastY = y
      }
    }

    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [offset])

  return scrolled
}
