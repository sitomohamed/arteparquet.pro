'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface CountUpProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({
  value,
  suffix = '',
  prefix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [mounted, setMounted] = useState(false)
  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (isInView) {
      motionValue.set(0)
      // small delay so spring starts from 0 visually
      const t = setTimeout(() => motionValue.set(value), 50)
      return () => clearTimeout(t)
    }
  }, [mounted, isInView, motionValue, value])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(latest).toString() + suffix
      }
    })
  }, [springValue, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  )
}
