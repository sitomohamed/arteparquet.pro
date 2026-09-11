'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, EASE } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      })

      gsap.set(dot, {
        x: dotX,
        y: dotY,
      })

      requestAnimationFrame(updateCursor)
    }

    const handleElementEnter = (e: Event) => {
      const target = e.target as HTMLElement
      setIsHovering(true)

      const text = target.dataset.cursorText
      if (text) setCursorText(text)

      if (target.matches('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        gsap.to(cursor, {
          scale: 1.8,
          duration: 0.3,
          ease: EASE.expo,
        })
      }
    }

    const handleElementLeave = () => {
      setIsHovering(false)
      setCursorText('')
      
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: EASE.expo,
      })
    }

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    )

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementEnter)
      el.addEventListener('mouseleave', handleElementLeave)
    })

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    const rafId = requestAnimationFrame(updateCursor)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [isVisible])

  useEffect(() => {
    if (isClicking) {
      gsap.to(cursorRef.current, {
        scale: 0.8,
        duration: 0.15,
        ease: EASE.power3,
      })
    } else {
      gsap.to(cursorRef.current, {
        scale: isHovering ? 1.8 : 1,
        duration: 0.15,
        ease: EASE.power3,
      })
    }
  }, [isClicking, isHovering])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          'fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference',
          'w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/80',
          'transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
          'hidden md:block'
        )}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white uppercase tracking-wider">
            {cursorText}
          </span>
        )}
      </div>
      <div
        ref={cursorDotRef}
        className={cn(
          'fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference',
          'w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-white',
          'transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
          'hidden md:block'
        )}
        style={{ willChange: 'transform' }}
      />
      <style jsx global>{`
        @media (min-width: 768px) {
          body:has(.custom-cursor-enabled) {
            cursor: none;
          }
          body:has(.custom-cursor-enabled) a,
          body:has(.custom-cursor-enabled) button,
          body:has(.custom-cursor-enabled) [role="button"],
          body:has(.custom-cursor-enabled) input,
          body:has(.custom-cursor-enabled) textarea,
          body:has(.custom-cursor-enabled) select {
            cursor: none;
          }
        }
      `}</style>
    </>
  )
}
