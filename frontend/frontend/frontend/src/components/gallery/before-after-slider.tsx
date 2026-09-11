'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { MoveHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackBeforeAfterInteraction } from '@/lib/analytics'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  projectId: string
  className?: string
}

/**
 * Interactive Before/After comparison slider with GSAP animations.
 * Shows dramatic transformation results for customer proof.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  projectId,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const beforeContainerRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setPosition(percentage)

    if (!hasInteracted) {
      setHasInteracted(true)
      trackBeforeAfterInteraction(projectId)
    }
  }, [hasInteracted, projectId])

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    updatePosition(clientX)
  }, [isDragging, updatePosition])

  const handleEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchmove', handleMove)
      document.addEventListener('touchend', handleEnd)

      return () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleEnd)
        document.removeEventListener('touchmove', handleMove)
        document.removeEventListener('touchend', handleEnd)
      }
    }
  }, [isDragging, handleMove, handleEnd])

  // Intro animation
  useEffect(() => {
    if (!sliderRef.current || !handleRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      // Animate slider from center to 50% to show the effect
      tl.from(sliderRef.current, {
        x: '-50%',
        duration: 1.2,
        ease: 'power2.inOut',
      })

      // Pulse the handle to indicate interactivity
      tl.to(handleRef.current, {
        scale: 1.15,
        duration: 0.4,
        ease: 'power2.out',
        yoyo: true,
        repeat: 2,
      }, '+=0.5')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-neutral-100',
        className
      )}
      onMouseDown={(e) => {
        setIsDragging(true)
        updatePosition(e.clientX)
      }}
      onTouchStart={(e) => {
        setIsDragging(true)
        updatePosition(e.touches[0].clientX)
      }}
      role="img"
      aria-label={`Confronto prima e dopo: ${beforeAlt} trasformato in ${afterAlt}`}
    >
      {/* After image (full background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-rovere/90 backdrop-blur-sm text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-lg">
          Dopo
        </div>
      </div>

      {/* Before image (clipped) */}
      <div
        ref={beforeContainerRef}
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-legno-bruciato/90 backdrop-blur-sm text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-lg">
          Prima
        </div>
      </div>

      {/* Slider handle */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
        style={{ left: `${position}%` }}
      >
        <div
          ref={handleRef}
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]',
            'flex items-center justify-center',
            'transition-shadow duration-200',
            isDragging ? 'shadow-[0_6px_24px_rgba(0,0,0,0.25)]' : 'hover:shadow-[0_6px_24px_rgba(0,0,0,0.2)]'
          )}
        >
          <MoveHorizontal
            size={20}
            className="text-legno-bruciato"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Hint text (shows on first view) */}
      {!hasInteracted && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-nero-marquina/80 backdrop-blur-md text-white font-sans text-xs font-medium shadow-lg pointer-events-none animate-pulse">
          <MoveHorizontal size={14} aria-hidden="true" />
          <span>Trascina per confrontare</span>
        </div>
      )}
    </div>
  )
}
