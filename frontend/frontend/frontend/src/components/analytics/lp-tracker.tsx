'use client'

/**
 * LpTracker - Landing Page Analytics
 *
 * Fires on mount:
 *   1. Captures all UTM parameters from the URL query string
 *   2. Stores them in sessionStorage for downstream attribution
 *   3. Fires a GA4 "landing_view" event with variant + UTM data
 *   4. Fires Meta Pixel "PageView" (consent-gated via MetaPixel component)
 *
 * Usage: <LpTracker variant="b2c" /> or <LpTracker variant="levigatura" />
 */

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

export type LpTrackerVariant = 'b2c' | 'b2b' | 'levigatura' | 'restauro' | 'spc'

interface LpTrackerProps {
  variant: LpTrackerVariant
}

const SESSION_KEY = 'arteparquet_lp_context'

export function LpTracker({ variant }: LpTrackerProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const utm = {
      source:   searchParams.get('utm_source')   ?? '',
      medium:   searchParams.get('utm_medium')   ?? '',
      campaign: searchParams.get('utm_campaign') ?? '',
      content:  searchParams.get('utm_content')  ?? '',
      term:     searchParams.get('utm_term')     ?? '',
      adset:    searchParams.get('adset')        ?? '',
      ad:       searchParams.get('ad')           ?? '',
      variant,
    }

    // Persist across the session for form submissions
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(utm))
    } catch {
      // sessionStorage unavailable (private mode etc.) - safe to ignore
    }

    // GA4 landing_view event
    trackEvent('landing_view', {
      landing_variant:  variant,
      utm_source:       utm.source,
      utm_medium:       utm.medium,
      utm_campaign:     utm.campaign,
      utm_content:      utm.content,
    })
  }, [variant, searchParams])

  return null
}

/**
 * Read LP context from session (for enriching form submissions).
 */
export function getLpContext(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}')
  } catch {
    return {}
  }
}
