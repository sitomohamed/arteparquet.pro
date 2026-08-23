'use client'

import { useEffect } from 'react'
import { trackServiceView, trackZoneView } from '@/lib/analytics'

interface ServiceViewTrackerProps {
  serviceSlug: string
}

export function ServiceViewTracker({ serviceSlug }: ServiceViewTrackerProps) {
  useEffect(() => {
    trackServiceView(serviceSlug)
  }, [serviceSlug])

  return null
}

interface ZoneViewTrackerProps {
  cityName: string
}

export function ZoneViewTracker({ cityName }: ZoneViewTrackerProps) {
  useEffect(() => {
    trackZoneView(cityName)
  }, [cityName])

  return null
}
