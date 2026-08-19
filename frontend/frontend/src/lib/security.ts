import { NextRequest } from 'next/server'

// ─── RATE LIMITING ────────────────────────────────────────────────────────
interface RateLimitEntry {
  count: number
  resetTime: number
  lastAttempt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime + 600000) { // 10 min grace period
      rateLimitStore.delete(key)
    }
  }
}, 600000)

export function checkRateLimit(
  request: NextRequest,
  options: {
    maxRequests: number
    windowMs: number
    blockDurationMs?: number
  }
): { allowed: boolean; remaining: number; resetTime: number } {
  const ip = getClientIP(request)
  const now = Date.now()
  const key = `rate_${ip}`
  
  let entry = rateLimitStore.get(key)
  
  if (!entry || now > entry.resetTime) {
    // New window or expired
    entry = {
      count: 0,
      resetTime: now + options.windowMs,
      lastAttempt: now
    }
  }
  
  // Check if IP is blocked (too many attempts recently)
  const timeSinceLastAttempt = now - entry.lastAttempt
  const blockDuration = options.blockDurationMs || options.windowMs * 2
  
  if (entry.count >= options.maxRequests && timeSinceLastAttempt < blockDuration) {
    rateLimitStore.set(key, { ...entry, lastAttempt: now })
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.lastAttempt + blockDuration
    }
  }
  
  // Reset if block period expired
  if (entry.count >= options.maxRequests && timeSinceLastAttempt >= blockDuration) {
    entry = {
      count: 0,
      resetTime: now + options.windowMs,
      lastAttempt: now
    }
  }
  
  entry.count++
  entry.lastAttempt = now
  rateLimitStore.set(key, entry)
  
  return {
    allowed: entry.count <= options.maxRequests,
    remaining: Math.max(0, options.maxRequests - entry.count),
    resetTime: entry.resetTime
  }
}

// ─── CSRF PROTECTION (Edge Runtime Compatible) ────────────────────────────
export function validateCSRFToken(tokenString: string): boolean {
  if (!tokenString || !tokenString.includes(':')) return false
  
  const [sessionId, token] = tokenString.split(':')
  
  // Basic format validation (hex strings)
  const hexPattern = /^[a-f0-9]+$/i
  return sessionId.length === 32 && 
         token.length === 64 && 
         hexPattern.test(sessionId) && 
         hexPattern.test(token)
}

// ─── IP EXTRACTION ────────────────────────────────────────────────────────
export function getClientIP(request: NextRequest): string {
  // Trust proxy headers in production
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const ips = forwarded.split(',').map(ip => ip.trim())
    return ips[0] || '127.0.0.1'
  }
  
  return request.headers.get('x-real-ip') || 
         request.headers.get('x-client-ip') || 
         '127.0.0.1'
}

// ─── INPUT SANITIZATION ────────────────────────────────────────────────────
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/data:/gi, '') // Remove data: URLs
    .replace(/vbscript:/gi, '') // Remove vbscript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/\0/g, '') // Remove null bytes
    .trim()
    .slice(0, 2000) // Limit length
}

export function sanitizeEmail(email: string): string {
  // Basic email format check + sanitization
  const cleaned = email.toLowerCase().trim().slice(0, 254)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
  if (!emailRegex.test(cleaned)) {
    throw new Error('Invalid email format')
  }
  
  return cleaned
}

export function sanitizePhone(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '').slice(0, 20)
  
  if (cleaned.length < 8 || cleaned.length > 20) {
    throw new Error('Invalid phone number')
  }
  
  return cleaned
}

// ─── HONEYPOT DETECTION ────────────────────────────────────────────────────
export function detectHoneypot(request: NextRequest, formData: any): boolean {
  // Check for common bot patterns
  const userAgent = request.headers.get('user-agent') || ''
  
  // Suspicious user agents
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i,
    /python/i, /php/i, /java/i, /go-http/i
  ]
  
  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    return true
  }
  
  // Check for honeypot fields (should be empty)
  if (formData.website || formData.url || formData.honeypot || formData.trap) {
    return true
  }
  
  // Check for too-fast submission (less than 2 seconds is suspicious)
  const timestamp = formData.timestamp
  if (timestamp && Date.now() - parseInt(timestamp) < 2000) {
    return true
  }
  
  return false
}

// ─── SECURITY HEADERS ─────────────────────────────────────────────────────
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Strict Transport Security - Force HTTPS for 1 year
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    
    // Content Security Policy - Prevent XSS and code injection
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://images.unsplash.com", 
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://images.unsplash.com https://api.arteparquet.pro",
      "connect-src 'self' https://api.indexnow.org",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),
    
    // Prevent embedding in frames (clickjacking)
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions policy - Disable unnecessary features
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'bluetooth=()'
    ].join(', '),
    
    // Cross-Origin policies
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    
    // Cache control for security
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache'
  }
}