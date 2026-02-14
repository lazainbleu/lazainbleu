'use client'

import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ShinyTextProps extends MotionProps {
  text: string
  className?: string
  speed?: number
  shineColor?: string
  baseColor?: string
  size?: string
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className,
  speed = 5, // Default slow luxury speed
  shineColor = 'rgba(255, 255, 255, 1)',
  baseColor = 'rgba(255, 255, 255, 0.5)',
  ...props
}) => {
  return (
    <motion.span
      className={cn('inline-block bg-clip-text text-transparent', className)}
      initial={{ backgroundPosition: '100% 0' }}
      animate={{ backgroundPosition: '-100% 0' }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: speed,
        ease: 'linear',
      }}
      style={{
        backgroundImage: `linear-gradient(
          120deg, 
          ${baseColor} 40%, 
          ${shineColor} 50%, 
          ${baseColor} 60%
        )`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text', // Wajib untuk Safari/Chrome
      }}
      {...props}
    >
      {text}
    </motion.span>
  )
}

export default ShinyText
