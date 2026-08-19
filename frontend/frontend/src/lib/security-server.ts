import crypto from 'crypto'

// Server-side security functions that use Node.js crypto
// These run in Node.js runtime, not Edge runtime

// ─── CSRF TOKEN GENERATION ────────────────────────────────────────────────
export function generateCSRFTokenServer(): string {
  const sessionId = crypto.randomBytes(16).toString('hex')
  const token = crypto.randomBytes(32).toString('hex')
  return `${sessionId}:${token}`
}

export function validateCSRFTokenServer(tokenString: string): boolean {
  if (!tokenString || !tokenString.includes(':')) return false
  
  const [sessionId, token] = tokenString.split(':')
  
  // Basic format validation
  const hexPattern = /^[a-f0-9]+$/i
  return sessionId.length === 32 && 
         token.length === 64 && 
         hexPattern.test(sessionId) && 
         hexPattern.test(token)
}

// ─── INPUT SANITIZATION ────────────────────────────────────────────────────
export function sanitizeInputServer(input: string): string {
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

export function sanitizeEmailServer(email: string): string {
  const cleaned = email.toLowerCase().trim().slice(0, 254)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
  if (!emailRegex.test(cleaned)) {
    throw new Error('Invalid email format')
  }
  
  return cleaned
}

export function sanitizePhoneServer(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '').slice(0, 20)
  
  if (cleaned.length < 8 || cleaned.length > 20) {
    throw new Error('Invalid phone number')
  }
  
  return cleaned
}