'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

const directionMap = {
  up:    { y: 32, x: 0 },
  down:  { y: -32, x: 0 },
  left:  { y: 0, x: 32 },
  right: { y: 0, x: -32 },
  none:  { y: 0, x: 0 },
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()
  const offset = directionMap[direction]

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? {}
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
