'use client'

/**
 * UTM Tracker - captures UTM parameters on first page load
 * and stores them in sessionStorage for attribution across the session.
 * Fires a GA4 event with the source/medium/campaign data.
 */

import { useEffect } from 'react'
import { trackUTMParameters } from '@/lib/analytics'

export function UTMTracker() {
  useEffect(() => {
    trackUTMParameters()
  }, [])

  return null
}
