'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
  start?: string
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = DURATION.base,
  direction = 'up',
  distance = 40,
  once = true,
  start = 'top 85%',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    
    if (getReducedMotion()) {
      gsap.set(ref.current, { opacity: 1 })
      return
    }

    const element = ref.current
    
    const fromVars: gsap.TweenVars = { opacity: 0 }
    
    switch (direction) {
      case 'up':
        fromVars.y = distance
        break
      case 'down':
        fromVars.y = -distance
        break
      case 'left':
        fromVars.x = distance
        break
      case 'right':
        fromVars.x = -distance
        break
    }

    gsap.set(element, fromVars)

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: EASE.expo,
        })
      },
      onEnterBack: once ? undefined : () => {
        gsap.to(element, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: EASE.expo,
        })
      },
      onLeave: once ? undefined : () => {
        gsap.to(element, {
          ...fromVars,
          duration: duration * 0.5,
          ease: EASE.power3,
        })
      },
      onLeaveBack: once ? undefined : () => {
        gsap.to(element, {
          ...fromVars,
          duration: duration * 0.5,
          ease: EASE.power3,
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [delay, duration, direction, distance, once, start])

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}
