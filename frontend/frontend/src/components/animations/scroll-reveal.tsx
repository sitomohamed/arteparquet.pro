'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap, ScrollTrigger, EASE, DURATION, getReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  x?: number
  scale?: number
  opacity?: number
  stagger?: number
  start?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = DURATION.base,
  y = 50,
  x = 0,
  scale = 1,
  opacity = 0,
  stagger = 0,
  start = 'top 85%',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    
    const prefersReducedMotion = getReducedMotion()
    
    if (prefersReducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    const element = ref.current
    const childElements = stagger > 0 ? element.children : element

    gsap.set(childElements, {
      opacity,
      y,
      x,
      scale,
    })

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once,
      onEnter: () => {
        gsap.to(childElements, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          stagger,
          ease: EASE.expo,
        })
      },
      onEnterBack: once ? undefined : () => {
        gsap.to(childElements, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          stagger,
          ease: EASE.expo,
        })
      },
      onLeave: once ? undefined : () => {
        gsap.to(childElements, {
          opacity,
          y,
          x,
          scale,
          duration: duration * 0.5,
          ease: EASE.power3,
        })
      },
      onLeaveBack: once ? undefined : () => {
        gsap.to(childElements, {
          opacity,
          y,
          x,
          scale,
          duration: duration * 0.5,
          ease: EASE.power3,
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [delay, duration, y, x, scale, opacity, stagger, start, once])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  scale?: number
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.2,
  scale = 1.15,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return
    
    if (getReducedMotion()) return

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (imageRef.current) {
          const yPercent = (self.progress - 0.5) * speed * 100
          gsap.set(imageRef.current, { yPercent })
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [speed, scale])

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)}>
      <div
        ref={imageRef}
        className="w-full h-full will-change-transform"
        style={{ 
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${scale})`,
        }}
        role="img"
        aria-label={alt}
      />
    </div>
  )
}

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  type?: 'words' | 'chars' | 'lines'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function TextReveal({
  children,
  className,
  delay = 0,
  stagger = 0.03,
  type = 'words',
  as: Component = 'p',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    
    if (getReducedMotion()) return

    const element = ref.current
    const text = children

    let items: string[]
    if (type === 'chars') {
      items = text.split('')
    } else if (type === 'words') {
      items = text.split(' ')
    } else {
      items = text.split('\n')
    }

    element.innerHTML = items
      .map((item, i) => {
        const separator = type === 'words' && i < items.length - 1 ? '&nbsp;' : ''
        return `<span class="inline-block overflow-hidden"><span class="inline-block gsap-text-item" style="transform: translateY(110%)">${item}${separator}</span></span>`
      })
      .join('')

    const innerElements = element.querySelectorAll('.gsap-text-item')

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(innerElements, {
          y: 0,
          duration: DURATION.slow,
          delay,
          stagger,
          ease: EASE.expo,
        })
      },
    })

    return () => {
      trigger.kill()
      element.textContent = text
    }
  }, [children, delay, stagger, type])

  return (
    <Component ref={ref as React.RefObject<HTMLHeadingElement>} className={cn(className)}>
      {children}
    </Component>
  )
}

interface SectionRevealProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'light' | 'dark' | 'neutral'
  overlapping?: boolean
}

export function SectionReveal({
  children,
  className,
  id,
  background = 'light',
  overlapping = false,
}: SectionRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    
    if (getReducedMotion()) return

    const section = ref.current
    
    gsap.set(section, { opacity: 0.8 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 90%',
      end: 'top 20%',
      scrub: 0.5,
      onUpdate: (self) => {
        const opacity = 0.8 + self.progress * 0.2
        gsap.set(section, { opacity })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  const bgClasses = {
    light: 'bg-travertino',
    dark: 'bg-nero-marquina',
    neutral: 'bg-white',
  }

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'relative',
        bgClasses[background],
        overlapping && '-mt-20 pt-20 rounded-t-[3rem]',
        className
      )}
    >
      {children}
    </section>
  )
}
