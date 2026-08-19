# Deployment

## Arteparquet Deployment Guide

### Overview

This document covers the deployment process for both frontend and backend applications to production environments.

---

## Infrastructure Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLOUDFLARE                           │
│                    DNS + CDN + DDoS Protection              │
│                                                             │
│    arteparquet.pro ──────────────────────────────────┐      │
│    www.arteparquet.pro ──────────────────────────────┤      │
│                                                      │      │
└──────────────────────────────────────────────────────┼──────┘
                                                       │
                    ┌──────────────────────────────────┼───────┐
                    │                                  ▼       │
                    │  ┌─────────────────────────────────────┐ │
                    │  │            VERCEL                   │ │
                    │  │       Frontend (Next.js)            │ │
                    │  │    arteparquet.vercel.app           │ │
                    │  └─────────────────────────────────────┘ │
                    │                    │                     │
                    │                    │ API calls           │
                    │                    ▼                     │
                    │  ┌─────────────────────────────────────┐ │
                    │  │           EASYPANEL                 │ │
                    │  │                                     │ │
                    │  │  ┌──────────────┐ ┌──────────────┐  │ │
                    │  │  │   Backend    │ │  PostgreSQL  │  │ │
                    │  │  │   FastAPI    │ │   Database   │  │ │
                    │  │  └──────────────┘ └──────────────┘  │ │
                    │  │                                     │ │
                    │  │  api.arteparquet.pro                │ │
                    │  └─────────────────────────────────────┘ │
                    │                                          │
                    │              INFRASTRUCTURE              │
                    └──────────────────────────────────────────┘
```

---

## Domain Configuration

### DNS Records (Cloudflare)

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | @ | Vercel IP | Yes |
| CNAME | www | cname.vercel-dns.com | Yes |
| CNAME | api | [EasyPanel domain] | Yes |

### SSL/TLS Settings

- Mode: Full (strict)
- Always Use HTTPS: On
- Automatic HTTPS Rewrites: On
- Minimum TLS Version: 1.2

---

## Frontend Deployment (Vercel)

### Initial Setup

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Link project
   cd frontend
   vercel link
   ```

2. **Configure Project**
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables**
   
   Set in Vercel Dashboard > Settings > Environment Variables:
   
   ```
   NEXT_PUBLIC_API_URL=https://api.arteparquet.pro
   NEXT_PUBLIC_SITE_URL=https://arteparquet.pro
   NEXT_PUBLIC_PHONE=+393892407827
   NEXT_PUBLIC_WHATSAPP=393892407827
   NEXT_PUBLIC_EMAIL=info@arteparquet.pro
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Domain Configuration**
   
   Vercel Dashboard > Domains:
   - Add `arteparquet.pro`
   - Add `www.arteparquet.pro`

### Deployment Process

**Automatic Deployment (Recommended):**

Every push to `main` branch triggers deployment:

```bash
git push origin main
# Vercel automatically builds and deploys
```

**Manual Deployment:**

```bash
cd frontend
vercel --prod
```

### vercel.json

```json
{
  "framework": "nextjs",
  "regions": ["fra1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## Backend Deployment (EasyPanel)

### Initial Setup

1. **Create Application**
   - Type: Docker
   - Name: arteparquet-api
   - Port: 8000

2. **Configure Build**
   - Source: GitHub repository
   - Branch: main
   - Dockerfile path: `backend/Dockerfile`
   - Build context: `backend`

3. **Environment Variables**
   
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_SECRET_KEY=[generate-secure-key]
   
   DATABASE_URL=postgresql://[user]:[pass]@[host]:5432/arteparquet
   
   JWT_SECRET_KEY=[generate-secure-key]
   JWT_ALGORITHM=HS256
   JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
   
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=info@arteparquet.pro
   SMTP_PASSWORD=[email-password]
   EMAIL_FROM=info@arteparquet.pro
   EMAIL_TO=info@arteparquet.pro
   
   CORS_ORIGINS=https://arteparquet.pro,https://www.arteparquet.pro
   ```

4. **Domain Configuration**
   - Add domain: `api.arteparquet.pro`
   - Enable HTTPS

### Database Setup

1. **Create PostgreSQL Database**
   - Name: arteparquet
   - User: arteparquet_user
   - Auto-generate password
   - Save connection string

2. **Run Migrations**
   ```bash
   # Connect to container
   docker exec -it arteparquet-api bash
   
   # Run migrations
   alembic upgrade head
   
   # Seed initial data (if needed)
   python -m app.db.init_db
   ```

### Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Run migrations and start
CMD alembic upgrade head && \
    gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
```

---

## CI/CD Pipeline

### GitHub Actions - Frontend

```yaml
# .github/workflows/frontend.yml
name: Frontend CI/CD

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'
  pull_request:
    branches: [main]
    paths:
      - 'frontend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: frontend
```

### GitHub Actions - Backend

```yaml
# .github/workflows/backend.yml
name: Backend CI/CD

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'
  pull_request:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
      
      - name: Run tests
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test
        run: pytest

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Trigger EasyPanel Deploy
        run: |
          curl -X POST "${{ secrets.EASYPANEL_WEBHOOK_URL }}"
```

---

## Rollback Procedures

### Frontend (Vercel)

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

Or via Dashboard: Deployments > Select previous > Promote to Production

### Backend (EasyPanel)

1. Go to Application > Deployments
2. Select previous working deployment
3. Click "Redeploy"

### Database

```bash
# Rollback migration
alembic downgrade -1

# Or to specific revision
alembic downgrade [revision_id]
```

---

## Monitoring

### Health Checks

**Frontend:**
- Vercel Analytics (built-in)
- Core Web Vitals monitoring

**Backend:**
- Health endpoint: `GET /health`
- EasyPanel monitoring

**External:**
- Uptime Robot (free)
- Better Stack (premium)

### Alerts

Configure alerts for:
- Downtime
- Error rate > 1%
- Response time > 2s
- Database connection issues

---

## Backup Strategy

### Database Backups

**EasyPanel Automatic:**
- Daily backups enabled
- 7-day retention

**Manual Backup:**
```bash
pg_dump -h [host] -U [user] -d arteparquet > backup_$(date +%Y%m%d).sql
```

### Media Backups

If using local storage, sync to S3:
```bash
aws s3 sync /app/uploads s3://arteparquet-backups/uploads/
```

---

## Security Checklist

### Pre-Deployment

- [ ] Environment variables set (not in code)
- [ ] Debug mode disabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Secrets rotated from development

### Post-Deployment

- [ ] SSL certificate valid
- [ ] Health endpoints responding
- [ ] Database accessible
- [ ] Email sending works
- [ ] Forms submit correctly
- [ ] Analytics tracking
- [ ] Error monitoring active

---

## Deployment Commands Summary

```bash
# Frontend
cd frontend
npm run build        # Build locally
vercel               # Deploy preview
vercel --prod        # Deploy production

# Backend
cd backend
docker build -t arteparquet-api .  # Build image
# Push to EasyPanel via webhook or manual deploy

# Database
alembic upgrade head      # Run migrations
alembic downgrade -1      # Rollback one step
```
