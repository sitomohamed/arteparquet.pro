'use client'

import { useEffect, useRef, useCallback, MutableRefObject } from 'react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'

export { gsap, ScrollTrigger, EASE, DURATION }

interface UseGsapOptions {
  scope?: MutableRefObject<HTMLElement | null>
  dependencies?: unknown[]
  revertOnUpdate?: boolean
}

export function useGsap(
  callback: (ctx: gsap.Context) => void | (() => void),
  options: UseGsapOptions = {}
): void {
  const { scope, dependencies = [], revertOnUpdate = false } = options

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx)
    }, scope?.current || undefined)

    return () => {
      if (revertOnUpdate) {
        ctx.revert()
      } else {
        ctx.kill()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export function useScrollTrigger(
  callback: () => ScrollTrigger | ScrollTrigger[] | void,
  dependencies: unknown[] = []
): void {
  useEffect(() => {
    if (getReducedMotion()) return

    const triggers = callback()
    
    return () => {
      if (Array.isArray(triggers)) {
        triggers.forEach(t => t.kill())
      } else if (triggers) {
        triggers.kill()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export function useTimeline(
  options?: gsap.TimelineVars
): [MutableRefObject<gsap.core.Timeline | null>, () => gsap.core.Timeline] {
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const getTimeline = useCallback(() => {
    if (!tlRef.current) {
      tlRef.current = gsap.timeline(options)
    }
    return tlRef.current
  }, [options])

  useEffect(() => {
    return () => {
      tlRef.current?.kill()
      tlRef.current = null
    }
  }, [])

  return [tlRef, getTimeline]
}

export function useParallax(
  ref: MutableRefObject<HTMLElement | null>,
  options: {
    y?: string | number
    scale?: number
    speed?: number
    start?: string
    end?: string
  } = {}
): void {
  const { y, scale, speed = 0.5, start = 'top bottom', end = 'bottom top' } = options

  useEffect(() => {
    if (!ref.current || getReducedMotion()) return

    const yValue = y ?? `${speed * 100}%`
    
    const tween = gsap.fromTo(
      ref.current,
      { y: typeof yValue === 'string' ? `-${yValue.replace('-', '')}` : -yValue },
      {
        y: yValue,
        scale: scale ?? 1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub: true,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [ref, y, scale, speed, start, end])
}

export function useSplitText(
  ref: MutableRefObject<HTMLElement | null>,
  options: {
    type?: 'chars' | 'words' | 'lines'
    animate?: boolean
    delay?: number
    stagger?: number
  } = {}
): void {
  const { type = 'words', animate = true, delay = 0, stagger = 0.03 } = options

  useEffect(() => {
    if (!ref.current || getReducedMotion()) return

    const element = ref.current
    const text = element.textContent || ''
    
    let items: string[]
    if (type === 'chars') {
      items = text.split('')
    } else if (type === 'words') {
      items = text.split(' ')
    } else {
      items = [text]
    }

    element.innerHTML = items
      .map((item, i) => 
        `<span class="gsap-${type.slice(0, -1)} inline-block overflow-hidden">
          <span class="gsap-${type.slice(0, -1)}-inner inline-block" style="transform: translateY(100%); opacity: 0;">
            ${item}${type === 'words' && i < items.length - 1 ? '&nbsp;' : ''}
          </span>
        </span>`
      )
      .join('')

    if (animate) {
      const innerElements = element.querySelectorAll(`.gsap-${type.slice(0, -1)}-inner`)
      
      gsap.to(innerElements, {
        y: 0,
        opacity: 1,
        duration: DURATION.base,
        delay,
        stagger,
        ease: EASE.expo,
      })
    }

    return () => {
      element.textContent = text
    }
  }, [ref, type, animate, delay, stagger])
}

export function useMouseParallax(
  ref: MutableRefObject<HTMLElement | null>,
  options: {
    intensity?: number
    ease?: number
  } = {}
): void {
  const { intensity = 0.02, ease = 0.1 } = options

  useEffect(() => {
    if (!ref.current || getReducedMotion()) return
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window) return

    const element = ref.current
    let rafId: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      targetX = (e.clientX - centerX) * intensity
      targetY = (e.clientY - centerY) * intensity
    }

    const animate = () => {
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease
      
      gsap.set(element, {
        x: currentX,
        y: currentY,
      })
      
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
      gsap.set(element, { x: 0, y: 0 })
    }
  }, [ref, intensity, ease])
}
