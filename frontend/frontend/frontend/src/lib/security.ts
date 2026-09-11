import { NextRequest } from 'next/server'

// --- RATE LIMITING ---
interface RateLimitEntry {
  count: number
  resetTime: number
  lastAttempt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function checkRateLimit(
  request: NextRequest,
  options: {
    maxRequests: number
    windowMs: number
    blockDurationMs?: number
    namespace?: string
  }
): { allowed: boolean; remaining: number; resetTime: number } {
  const ip = getClientIP(request)
  const now = Date.now()
  const ns = options.namespace ? `${options.namespace}_` : ''
  const key = `rate_${ns}${ip}`

  let entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + options.windowMs,
      lastAttempt: now,
    }
  }

  const timeSinceLastAttempt = now - entry.lastAttempt
  const blockDuration = options.blockDurationMs || options.windowMs * 2

  if (entry.count >= options.maxRequests && timeSinceLastAttempt < blockDuration) {
    rateLimitStore.set(key, { ...entry, lastAttempt: now })
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.lastAttempt + blockDuration,
    }
  }

  if (entry.count >= options.maxRequests && timeSinceLastAttempt >= blockDuration) {
    entry = {
      count: 0,
      resetTime: now + options.windowMs,
      lastAttempt: now,
    }
  }

  entry.count++
  entry.lastAttempt = now
  rateLimitStore.set(key, entry)

  return {
    allowed: entry.count <= options.maxRequests,
    remaining: Math.max(0, options.maxRequests - entry.count),
    resetTime: entry.resetTime,
  }
}

// --- CSRF PROTECTION (format check; actual validation in security-server.ts) ---
// This performs basic format validation on the client side
// The actual HMAC signature verification happens server-side
export function validateCSRFToken(tokenString: string): boolean {
  if (!tokenString || typeof tokenString !== 'string') return false
  
  const parts = tokenString.split(':')
  if (parts.length !== 3) return false
  
  const [timestamp, nonce, signature] = parts
  
  // Validate format only (not the actual signature - that's server-side)
  const hexPattern = /^[a-f0-9]+$/i
  const base36Pattern = /^[a-z0-9]+$/i
  
  return (
    base36Pattern.test(timestamp) &&
    hexPattern.test(nonce) &&
    hexPattern.test(signature) &&
    nonce.length === 32 &&
    signature.length === 64
  )
}

// --- IP EXTRACTION ---
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const ips = forwarded.split(',').map((ip) => ip.trim())
    return ips[0] || '127.0.0.1'
  }

  return request.headers.get('x-real-ip') || request.headers.get('x-client-ip') || '127.0.0.1'
}

// --- HONEYPOT DETECTION ---
export function detectHoneypot(request: NextRequest, formData: Record<string, unknown>): boolean {
  const userAgent = request.headers.get('user-agent') || ''

  const botPatterns = [/crawler/i, /spider/i, /scraper/i, /\bcurl\b/i, /\bwget\b/i]

  if (botPatterns.some((pattern) => pattern.test(userAgent))) {
    return true
  }

  if (formData.website || formData.url || formData.honeypot || formData.trap) {
    return true
  }

  const timestamp = formData.timestamp
  if (typeof timestamp === 'string' && Date.now() - parseInt(timestamp, 10) < 2000) {
    return true
  }

  return false
}

const IS_DEV = process.env.NODE_ENV !== 'production'

export function getContentSecurityPolicy(): string {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    // React/Next.js use eval() in development for call-stack reconstruction.
    // Never included in production.
    ...(IS_DEV ? ["'unsafe-eval'"] : []),
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ].join(' ')

  const connectSrc = [
    "'self'",
    'https://www.google-analytics.com',
    'https://analytics.google.com',
    'https://stats.g.doubleclick.net',
    'https://region1.google-analytics.com',
    'https://www.googletagmanager.com',
    'https://www.google.com',
    'https://api.indexnow.org',
    ...(IS_DEV ? ['ws:', 'wss:'] : []),
  ].join(' ')

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https://images.unsplash.com https://www.googletagmanager.com https://www.google-analytics.com",
    `connect-src ${connectSrc}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(IS_DEV ? [] : ['upgrade-insecure-requests']),
  ].join('; ')
}

export const CONTENT_SECURITY_POLICY = getContentSecurityPolicy()

export function getSecurityHeaders(): Record<string, string> {
  return {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Content-Security-Policy': getContentSecurityPolicy(),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'bluetooth=()',
    ].join(', '),
    'Cross-Origin-Opener-Policy': 'same-origin',
    'X-DNS-Prefetch-Control': 'on',
  }
}

export function getApiSecurityHeaders(): Record<string, string> {
  return {
    ...getSecurityHeaders(),
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'X-Robots-Tag': 'noindex, nofollow',
  }
}
