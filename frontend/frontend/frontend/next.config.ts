import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV !== 'production'

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    // React requires eval() in development for debugging; never in production.
    isDev ? "'unsafe-eval'" : null,
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    // Meta Pixel - loaded only after marketing consent granted
    'https://connect.facebook.net',
  ]
    .filter(Boolean)
    .join(' '),
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://www.facebook.com https://www.facebook.net",
  [
    "connect-src 'self'",
    'https://www.google-analytics.com',
    'https://analytics.google.com',
    'https://stats.g.doubleclick.net',
    'https://region1.google-analytics.com',
    'https://www.googletagmanager.com',
    'https://www.google.com',
    'https://api.indexnow.org',
    // Meta Pixel reporting endpoints - only called after consent granted
    'https://www.facebook.com',
    'https://connect.facebook.net',
    isDev ? 'ws: wss:' : null,
  ]
    .filter(Boolean)
    .join(' '),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  isDev ? null : 'upgrade-insecure-requests',
]
  .filter(Boolean)
  .join('; ')

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.arteparquet.pro',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, private' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      { source: '/preventivi', destination: '/crm/preventivi', permanent: false },
      { source: '/preventivi/:path*', destination: '/crm/preventivi/:path*', permanent: false },
      { source: '/lavori', destination: '/crm/lavori', permanent: false },
      { source: '/lavori/:path*', destination: '/crm/lavori/:path*', permanent: false },
      // Duplicate local landing pages: keep one URL per city
      { source: '/zone/posa-parquet-:city', destination: '/zone/parquet-:city', permanent: true },
    ]
  },
}

export default nextConfig