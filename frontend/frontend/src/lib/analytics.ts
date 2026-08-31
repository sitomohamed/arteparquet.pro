export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || 'G-CXJX669QNK'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Send a custom event to Google Analytics
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

/**
 * Track page view (automatic with Next.js navigation)
 */
export function trackPageView(url: string, title?: string) {
  trackEvent('page_view', {
    page_path: url,
    page_title: title || document.title,
  })
}

/**
 * Track service page views (for conversion funnel analysis)
 */
export function trackServiceView(service: string) {
  trackEvent('service_view', {
    service_name: service,
    page_path: window.location.pathname,
  })
}

/**
 * Track zone/city page views (for local SEO analysis)
 */
export function trackZoneView(city: string) {
  trackEvent('zone_view', {
    city_name: city,
    page_path: window.location.pathname,
  })
}

/**
 * Track CTA clicks (primary conversion actions)
 */
export function trackCtaClick(
  ctaType: 'quote_request' | 'phone' | 'whatsapp' | 'contact_form' | 'service_cta' | 'quote_wizard_submit' | 'quote_wizard_step',
  location: string,
  additionalParams?: Record<string, string | number>
) {
  trackEvent('cta_click', {
    cta_type: ctaType,
    cta_location: location,
    ...additionalParams,
  })
}

/**
 * Track phone number clicks
 */
export function trackPhoneClick(location: string) {
  trackCtaClick('phone', location, {
    phone_number: '+393892407827',
  })
}

/**
 * Track WhatsApp clicks
 */
export function trackWhatsAppClick(location: string, message?: string) {
  trackCtaClick('whatsapp', location, {
    has_message: message ? 'yes' : 'no',
  })
}

/**
 * Track contact form interactions
 */
export function trackFormStart() {
  trackEvent('form_start', {
    form_name: 'contact_form',
  })
}

export function trackFormStep(stepNumber: number, stepName: string) {
  trackEvent('form_step', {
    form_name: 'contact_form',
    step_number: stepNumber,
    step_name: stepName,
  })
}

export function trackFormComplete(data: {
  projectType: string
  clientType: string
  city?: string
}) {
  trackEvent('form_submit', {
    form_name: 'contact_form',
    project_type: data.projectType,
    client_type: data.clientType,
    city: data.city || 'unknown',
  })
  
  // Also track as conversion
  trackEvent('generate_lead', {
    value: 1,
    currency: 'EUR',
    project_type: data.projectType,
    client_type: data.clientType,
  })
}

export function trackFormError(step: number, errorField: string) {
  trackEvent('form_error', {
    form_name: 'contact_form',
    step: step,
    error_field: errorField,
  })
}

/**
 * Track scroll depth (for engagement analysis)
 */
export function initScrollDepthTracking() {
  if (typeof window === 'undefined') return

  const thresholds = [25, 50, 75, 90, 100]
  const reached = new Set<number>()

  const checkScroll = () => {
    const scrollPercentage =
      (window.scrollY + window.innerHeight) /
      document.documentElement.scrollHeight *
      100

    thresholds.forEach((threshold) => {
      if (scrollPercentage >= threshold && !reached.has(threshold)) {
        reached.add(threshold)
        trackEvent('scroll_depth', {
          percent: threshold,
          page_path: window.location.pathname,
        })
      }
    })
  }

  window.addEventListener('scroll', checkScroll, { passive: true })
  return () => window.removeEventListener('scroll', checkScroll)
}

/**
 * Track portfolio/gallery interactions
 */
export function trackGalleryOpen(imageId: string, location: string) {
  trackEvent('gallery_open', {
    image_id: imageId,
    gallery_location: location,
  })
}

export function trackBeforeAfterInteraction(projectId: string) {
  trackEvent('before_after_interaction', {
    project_id: projectId,
  })
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, linkText: string) {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText,
  })
}

/**
 * Track internal navigation (for user flow analysis)
 */
export function trackInternalNavigation(
  fromPath: string,
  toPath: string,
  linkText?: string
) {
  trackEvent('internal_navigation', {
    from_path: fromPath,
    to_path: toPath,
    link_text: linkText || '',
  })
}

/**
 * Track 404 errors
 */
export function track404(attemptedPath: string) {
  trackEvent('error_404', {
    page_path: attemptedPath,
    referrer: document.referrer || 'direct',
  })
}

/**
 * Track lead quality signals (for optimization)
 */
export function trackLeadQualitySignal(
  signal: 'high_intent_keyword' | 'multiple_services_viewed' | 'long_session' | 'return_visitor',
  value: string | number
) {
  trackEvent('lead_quality_signal', {
    signal_type: signal,
    signal_value: String(value),
  })
}
