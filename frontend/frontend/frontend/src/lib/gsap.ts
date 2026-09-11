'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

export const EASE = {
  expo: 'expo.out',
  power3: 'power3.out',
  power4: 'power4.out',
  smooth: 'power2.inOut',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.5)',
} as const

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 1,
  slower: 1.4,
  cinematic: 1.8,
} as const

export function splitLines(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || ''
  const words = text.split(' ')
  element.innerHTML = ''
  
  const lines: HTMLElement[] = []
  let currentLine = document.createElement('span')
  currentLine.className = 'gsap-line overflow-hidden inline-block'
  
  words.forEach((word, i) => {
    const wordSpan = document.createElement('span')
    wordSpan.className = 'gsap-word inline-block'
    wordSpan.textContent = word + (i < words.length - 1 ? ' ' : '')
    currentLine.appendChild(wordSpan)
  })
  
  const wrapper = document.createElement('span')
  wrapper.className = 'gsap-line-inner inline-block'
  wrapper.appendChild(currentLine)
  element.appendChild(wrapper)
  lines.push(wrapper)
  
  return lines
}

export function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function createScrollReveal(
  trigger: string | Element,
  options: {
    y?: number
    opacity?: number
    duration?: number
    delay?: number
    stagger?: number
    start?: string
    end?: string
    markers?: boolean
  } = {}
): ScrollTrigger {
  const {
    y = 60,
    opacity = 0,
    duration = DURATION.base,
    delay = 0,
    stagger = 0.1,
    start = 'top 85%',
    end = 'bottom 20%',
    markers = false,
  } = options

  const elements = typeof trigger === 'string' 
    ? gsap.utils.toArray(trigger) 
    : [trigger]

  if (getReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 })
    return ScrollTrigger.create({ trigger: elements[0] as Element })
  }

  gsap.set(elements, { opacity, y })

  return ScrollTrigger.create({
    trigger: elements[0] as Element,
    start,
    end,
    markers,
    onEnter: () => {
      gsap.to(elements, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: EASE.expo,
      })
    },
  })
}

export function createParallax(
  element: string | Element,
  options: {
    y?: string | number
    scale?: number
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
): ScrollTrigger {
  const {
    y = '-20%',
    scale,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
  } = options

  if (getReducedMotion()) {
    return ScrollTrigger.create({ trigger: element as Element })
  }

  const vars: gsap.TweenVars = { y, ease: 'none' }
  if (scale) vars.scale = scale

  return ScrollTrigger.create({
    trigger: element as Element,
    start,
    end,
    scrub,
    animation: gsap.fromTo(element, 
      { y: typeof y === 'string' && y.startsWith('-') ? y.replace('-', '') : `-${y}` },
      vars
    ),
  })
}

export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach(st => st.kill())
}
