'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap, EASE, getReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  disabled?: boolean
  as?: 'button' | 'a' | 'div'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  ariaLabel?: string
  type?: 'button' | 'submit' | 'reset'
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  disabled = false,
  as: Component = 'button',
  href,
  target,
  rel,
  onClick,
  ariaLabel,
  type = 'button',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!buttonRef.current || disabled) return
    
    if (getReducedMotion()) return
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return

    const button = buttonRef.current
    const inner = innerRef.current

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as globalThis.MouseEvent
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (mouseEvent.clientX - centerX) * strength
      const deltaY = (mouseEvent.clientY - centerY) * strength

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: EASE.power3,
      })

      if (inner) {
        gsap.to(inner, {
          x: deltaX * 0.3,
          y: deltaY * 0.3,
          duration: 0.3,
          ease: EASE.power3,
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: EASE.expo,
      })

      if (inner) {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: EASE.expo,
        })
      }
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, disabled])

  const commonProps = {
    ref: buttonRef as React.RefObject<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>,
    className: cn('will-change-transform', className),
    onClick,
    'aria-label': ariaLabel,
  }

  if (Component === 'a') {
    return (
      <a
        {...commonProps}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
      >
        <span ref={innerRef} className="inline-flex items-center gap-inherit will-change-transform">
          {children}
        </span>
      </a>
    )
  }

  if (Component === 'div') {
    return (
      <div {...commonProps} ref={buttonRef as React.RefObject<HTMLDivElement>}>
        <span ref={innerRef} className="inline-flex items-center gap-inherit will-change-transform">
          {children}
        </span>
      </div>
    )
  }

  return (
    <button
      {...commonProps}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
    >
      <span ref={innerRef} className="inline-flex items-center gap-inherit will-change-transform">
        {children}
      </span>
    </button>
  )
}
