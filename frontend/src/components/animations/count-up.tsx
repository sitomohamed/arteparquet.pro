'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion'

interface CountUpProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function CountUp({
  value,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(latest).toString() + suffix
      }
    })
  }, [springValue, prefix, suffix])

  return (
    <motion.span ref={ref} className={className}>
      {prefix}0{suffix}
    </motion.span>
  )
}
