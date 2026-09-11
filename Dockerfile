# ══════════════════════════════════════════════════════════════════════════════
# ARTEPARQUET FRONTEND - Security-Hardened Dockerfile
# ══════════════════════════════════════════════════════════════════════════════
FROM node:20-alpine AS base

# SECURITY: Update Alpine packages
RUN apk update && apk upgrade --no-cache

# ══════════════════════════════════════════════════════════════════════════════
# Dependencies stage
# ══════════════════════════════════════════════════════════════════════════════
FROM base AS deps

# SECURITY: Required for some npm packages
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies only (better caching)
COPY frontend/frontend/package.json frontend/frontend/package-lock.json* ./
RUN npm ci --only=production=false && npm cache clean --force

# ══════════════════════════════════════════════════════════════════════════════
# Build stage
# ══════════════════════════════════════════════════════════════════════════════
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/frontend/ .

# SECURITY: Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBOPACK=0

# Build arguments for public environment variables
ARG NEXT_PUBLIC_GA_ID=G-CXJX669QNK
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

# Build the application
RUN npm run build

# ══════════════════════════════════════════════════════════════════════════════
# Production stage
# ══════════════════════════════════════════════════════════════════════════════
FROM base AS runner

WORKDIR /app

# SECURITY: Production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# SECURITY: Create non-root user with specific UID/GID
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# SECURITY: Create .next directory with proper ownership
RUN mkdir .next && chown nextjs:nodejs .next

# Copy built application with proper ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# SECURITY: Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# SECURITY: Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
