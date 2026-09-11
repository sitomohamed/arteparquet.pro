import crypto from 'crypto'

// Server-side security functions that use Node.js crypto
// These run in Node.js runtime, not Edge runtime

// SECURITY: CSRF secret key - should be set via environment variable
const CSRF_SECRET = process.env.CSRF_SECRET || crypto.randomBytes(32).toString('hex')

// Token expiration time (1 hour)
const TOKEN_EXPIRY_MS = 60 * 60 * 1000

// --- CSRF TOKEN GENERATION (HMAC-based) ---
export function generateCSRFTokenServer(): string {
  const timestamp = Date.now().toString(36)
  const nonce = crypto.randomBytes(16).toString('hex')
  const payload = `${timestamp}:${nonce}`
  
  // Create HMAC signature
  const hmac = crypto.createHmac('sha256', CSRF_SECRET)
  hmac.update(payload)
  const signature = hmac.digest('hex')
  
  return `${payload}:${signature}`
}

export function validateCSRFTokenServer(tokenString: string): boolean {
  if (!tokenString || typeof tokenString !== 'string') return false
  
  const parts = tokenString.split(':')
  if (parts.length !== 3) return false
  
  const [timestamp, nonce, signature] = parts
  
  // Validate format
  const hexPattern = /^[a-f0-9]+$/i
  const base36Pattern = /^[a-z0-9]+$/i
  
  if (!base36Pattern.test(timestamp) || !hexPattern.test(nonce) || !hexPattern.test(signature)) {
    return false
  }
  
  if (nonce.length !== 32 || signature.length !== 64) {
    return false
  }
  
  // SECURITY: Verify HMAC signature using constant-time comparison
  const payload = `${timestamp}:${nonce}`
  const hmac = crypto.createHmac('sha256', CSRF_SECRET)
  hmac.update(payload)
  const expectedSignature = hmac.digest('hex')
  
  // Constant-time comparison to prevent timing attacks
  if (!timingSafeEqual(signature, expectedSignature)) {
    return false
  }
  
  // SECURITY: Check token expiration
  try {
    const tokenTime = parseInt(timestamp, 36)
    const now = Date.now()
    if (isNaN(tokenTime) || now - tokenTime > TOKEN_EXPIRY_MS) {
      return false
    }
  } catch {
    return false
  }
  
  return true
}

// --- CONSTANT-TIME STRING COMPARISON ---
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  
  return crypto.timingSafeEqual(bufA, bufB)
}

// Export for use in other security checks
export { timingSafeEqual }

// --- INPUT SANITIZATION ---
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