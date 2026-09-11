# Arteparquet.pro

> The most trusted parquet website in Italy.

## Overview

Arteparquet.pro is a premium website for professional parquet specialists based in Bergamo, Italy, operating nationwide. The website is designed to position Arteparquet as the reference company for parquet installation, restoration, and premium flooring solutions.

## Key Credentials

- **Founded**: 2004
- **Notable Project**: Teatro alla Scala, Milano (2004) - Installation, Restoration, Maintenance
- **Experience**: 20+ years
- **Coverage**: All of Italy

## Tech Stack

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **Data Fetching**: TanStack Query

### Backend
- **Language**: Python 3.12+
- **Framework**: FastAPI
- **ORM**: SQLAlchemy
- **Migrations**: Alembic
- **Validation**: Pydantic
- **Auth**: JWT + RBAC

### Database
- **Engine**: PostgreSQL 16
- **Host**: EasyPanel

### Infrastructure
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Frontend Hosting**: Vercel
- **Backend Hosting**: EasyPanel
- **CDN**: Cloudflare

## Quick Start

```bash
# Clone the repository
git clone https://github.com/arteparquet/arteparquet.pro.git
cd arteparquet.pro

# Start with Docker
docker-compose up -d

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

## Documentation

All project documentation is located in the `/docs` folder:

| Document | Description |
|----------|-------------|
| [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) | Complete project summary |
| [VISION.md](./VISION.md) | Company vision |
| [MISSION.md](./MISSION.md) | Company mission |
| [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md) | Brand identity rules |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Design system documentation |
| [FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md) | Frontend structure |
| [BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md) | Backend structure |
| [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) | Database design |
| [API_SPECIFICATION.md](./API_SPECIFICATION.md) | API endpoints |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deployment guide |
| [TASKS.md](./TASKS.md) | Development tasks |

## Project Structure

```
arteparquet.pro/
├── frontend/          # Next.js 15 application
├── backend/           # FastAPI application
├── docs/              # Project documentation
├── docker-compose.yml # Local development
└── README.md
```

## Contact

- **Website**: https://arteparquet.pro
- **Phone**: +39 389 240 7827
- **Location**: Bergamo, Italy

## License

Copyright © 2024 Arteparquet. All rights reserved.
