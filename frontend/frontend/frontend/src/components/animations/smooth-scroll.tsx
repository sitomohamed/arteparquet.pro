'use client'

import { useEffect, useCallback, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '@/lib/gsap'

let lenisInstance: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function scrollTo(
  target: string | number | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean }
): void {
  lenisInstance?.scrollTo(target, {
    offset: options?.offset ?? -88,
    duration: options?.duration ?? 1.2,
    immediate: options?.immediate ?? false,
  })
}

const LenisContext = createContext<Lenis | null>(null)

export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    lenisInstance = new Lenis({
      autoRaf: false,
      anchors: { offset: -88 },
      stopInertiaOnNavigate: true,
      allowNestedScroll: true,
      lerp: reducedMotion ? 1 : 0.1,
      duration: reducedMotion ? 0 : 1.2,
    })

    lenisInstance.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => {
      lenisInstance?.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      gsap.ticker.lagSmoothing(500)
      lenisInstance?.off('scroll', ScrollTrigger.update)
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])

  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true })
    
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  )
}
