'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface BrandCinematicProps {
  videoFileName: string
  className?: string
}

export default function BrandCinematic({
  videoFileName,
  className,
}: BrandCinematicProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoSource = `/video/${videoFileName}`

  useEffect(() => {
    const vid = videoRef.current
    if (vid) {
      vid.muted = true
      vid.defaultMuted = true

      const playAttempt = () => {
        vid.play().catch(() => {
          setTimeout(playAttempt, 200)
        })
      }
      playAttempt()
    }
  }, [])

  return (
    <section
      className={cn(
        'relative aspect-[16/9] w-full overflow-hidden bg-black',
        'mt-0 pt-0',
        className
      )}
    >
      <video
        ref={videoRef}
        src={videoSource}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
    </section>
  )
}
