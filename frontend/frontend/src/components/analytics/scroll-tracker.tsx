'use client'

import { useEffect } from 'react'
import { initScrollDepthTracking } from '@/lib/analytics'

/**
 * Tracks scroll depth for engagement analysis.
 * Automatically tracks 25%, 50%, 75%, 90%, and 100% scroll milestones.
 */
export function ScrollTracker() {
  useEffect(() => {
    const cleanup = initScrollDepthTracking()
    return cleanup
  }, [])

  return null
}
