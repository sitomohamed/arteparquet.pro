# Folder Structure

## Arteparquet Project Organization

### Overview

This document defines the complete folder structure for both frontend and backend applications, ensuring consistency and maintainability.

---

## Root Structure

```
arteparquet/
├── frontend/                 # Next.js application
├── backend/                  # FastAPI application
├── docs/                     # Project documentation
├── docker-compose.yml        # Local development
├── docker-compose.prod.yml   # Production deployment
├── .github/                  # GitHub workflows
│   └── workflows/
│       ├── frontend.yml
│       └── backend.yml
├── .gitignore
├── README.md
└── LICENSE
```

---

## Frontend Structure

```
frontend/
├── public/
│   ├── images/
│   │   ├── portfolio/           # Project images
│   │   │   ├── villa-como/
│   │   │   └── hotel-milan/
│   │   ├── services/            # Service images
│   │   ├── team/                # Team photos
│   │   ├── brand/               # Logo, icons
│   │   │   ├── logo.svg
│   │   │   ├── logo-dark.svg
│   │   │   └── icon.svg
│   │   └── og/                  # Open Graph images
│   ├── videos/                  # Video assets
│   ├── fonts/                   # Custom fonts (if any)
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (marketing)/         # Marketing pages group
│   │   │   ├── layout.tsx       # Marketing layout
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── servizi/
│   │   │   │   ├── page.tsx     # Services index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # Service detail
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx     # Portfolio grid
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # Project detail
│   │   │   ├── chi-siamo/
│   │   │   │   └── page.tsx     # About page
│   │   │   ├── contatti/
│   │   │   │   └── page.tsx     # Contact page
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx     # Blog index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # Blog post
│   │   │   └── faq/
│   │   │       └── page.tsx     # FAQ page
│   │   │
│   │   ├── (legal)/             # Legal pages group
│   │   │   ├── layout.tsx
│   │   │   ├── privacy-policy/
│   │   │   │   └── page.tsx
│   │   │   └── cookie-policy/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/               # Admin dashboard (protected)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx         # Dashboard
│   │   │   ├── leads/
│   │   │   │   └── page.tsx
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/                 # API routes
│   │   │   └── revalidate/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx           # Root layout
│   │   ├── not-found.tsx        # 404 page
│   │   ├── error.tsx            # Error boundary
│   │   ├── loading.tsx          # Loading state
│   │   └── globals.css          # Global styles
│   │
│   ├── components/
│   │   ├── ui/                  # Base UI components (shadcn)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── label.tsx
│   │   │   ├── form.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── container.tsx
│   │   │   └── section.tsx
│   │   │
│   │   ├── layout/              # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   └── page-header.tsx
│   │   │
│   │   ├── cards/               # Card variations
│   │   │   ├── service-card.tsx
│   │   │   ├── portfolio-card.tsx
│   │   │   ├── testimonial-card.tsx
│   │   │   ├── blog-card.tsx
│   │   │   └── stat-card.tsx
│   │   │
│   │   ├── forms/               # Form components
│   │   │   ├── contact-form.tsx
│   │   │   ├── quote-form.tsx
│   │   │   ├── newsletter-form.tsx
│   │   │   ├── form-step.tsx
│   │   │   └── form-progress.tsx
│   │   │
│   │   ├── sections/            # Page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── services-section.tsx
│   │   │   ├── portfolio-section.tsx
│   │   │   ├── testimonials-section.tsx
│   │   │   ├── cta-section.tsx
│   │   │   ├── faq-section.tsx
│   │   │   ├── credentials-section.tsx
│   │   │   └── contact-section.tsx
│   │   │
│   │   ├── media/               # Media components
│   │   │   ├── optimized-image.tsx
│   │   │   ├── image-gallery.tsx
│   │   │   ├── before-after-slider.tsx
│   │   │   └── video-player.tsx
│   │   │
│   │   ├── animations/          # Animation wrappers
│   │   │   ├── fade-in.tsx
│   │   │   ├── stagger-children.tsx
│   │   │   ├── count-up.tsx
│   │   │   └── parallax-image.tsx
│   │   │
│   │   ├── seo/                 # SEO components
│   │   │   ├── json-ld.tsx
│   │   │   └── meta-tags.tsx
│   │   │
│   │   └── shared/              # Shared components
│   │       ├── whatsapp-button.tsx
│   │       ├── phone-button.tsx
│   │       ├── back-to-top.tsx
│   │       ├── cookie-consent.tsx
│   │       └── loading-spinner.tsx
│   │
│   ├── lib/                     # Utilities
│   │   ├── utils.ts             # General utilities (cn, etc.)
│   │   ├── api.ts               # API client
│   │   ├── constants.ts         # Constants
│   │   └── validations.ts       # Zod schemas
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── use-scroll.ts
│   │   ├── use-media-query.ts
│   │   ├── use-intersection.ts
│   │   ├── use-form-persistence.ts
│   │   └── use-analytics.ts
│   │
│   ├── stores/                  # Zustand stores
│   │   ├── ui-store.ts
│   │   └── form-store.ts
│   │
│   ├── types/                   # TypeScript types
│   │   ├── index.ts
│   │   ├── api.ts
│   │   └── components.ts
│   │
│   ├── config/                  # Configuration
│   │   ├── site.ts              # Site metadata
│   │   ├── navigation.ts        # Nav structure
│   │   └── services.ts          # Services data
│   │
│   └── styles/                  # Styles
│       └── fonts.ts             # Font configuration
│
├── .env.local                   # Local environment
├── .env.example                 # Environment template
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
├── postcss.config.js            # PostCSS config
├── components.json              # shadcn config
├── package.json
├── package-lock.json
└── Dockerfile
```

---

## Backend Structure

```
backend/
├── alembic/                     # Database migrations
│   ├── versions/
│   │   └── 001_initial.py
│   ├── env.py
│   ├── script.py.mako
│   └── alembic.ini
│
├── app/
│   ├── __init__.py
│   ├── main.py                  # FastAPI application
│   ├── config.py                # Configuration
│   │
│   ├── api/                     # API routes
│   │   ├── __init__.py
│   │   ├── deps.py              # Dependencies
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py        # Main router
│   │       ├── auth.py
│   │       ├── contacts.py
│   │       ├── projects.py
│   │       ├── services.py
│   │       ├── testimonials.py
│   │       ├── blog.py
│   │       ├── faq.py
│   │       ├── media.py
│   │       └── settings.py
│   │
│   ├── core/                    # Core functionality
│   │   ├── __init__.py
│   │   ├── security.py          # JWT, hashing
│   │   ├── exceptions.py        # Custom exceptions
│   │   └── middleware.py        # Custom middleware
│   │
│   ├── models/                  # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── user.py
│   │   ├── contact.py
│   │   ├── project.py
│   │   ├── service.py
│   │   ├── testimonial.py
│   │   ├── blog.py
│   │   ├── faq.py
│   │   ├── media.py
│   │   ├── category.py
│   │   └── settings.py
│   │
│   ├── schemas/                 # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── user.py
│   │   ├── contact.py
│   │   ├── project.py
│   │   ├── service.py
│   │   ├── testimonial.py
│   │   ├── blog.py
│   │   ├── faq.py
│   │   └── common.py
│   │
│   ├── services/                # Business logic
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── user.py
│   │   ├── contact.py
│   │   ├── project.py
│   │   ├── email.py
│   │   └── media.py
│   │
│   ├── db/                      # Database
│   │   ├── __init__.py
│   │   ├── session.py           # Session management
│   │   └── init_db.py           # Initial data
│   │
│   └── utils/                   # Utilities
│       ├── __init__.py
│       ├── email.py             # Email sending
│       ├── storage.py           # File storage
│       └── validators.py        # Custom validators
│
├── tests/                       # Tests
│   ├── __init__.py
│   ├── conftest.py              # Fixtures
│   ├── test_auth.py
│   ├── test_contacts.py
│   ├── test_projects.py
│   └── test_services.py
│
├── uploads/                     # Uploaded files (local)
│   ├── projects/
│   ├── services/
│   └── blog/
│
├── .env.example                 # Environment template
├── requirements.txt             # Dependencies
├── requirements-dev.txt         # Dev dependencies
├── pyproject.toml               # Project config
├── Dockerfile
└── docker-compose.yml           # Local dev
```

---

## Documentation Structure

```
docs/
├── README.md
├── PROJECT_OVERVIEW.md
├── VISION.md
├── MISSION.md
├── BUSINESS_MODEL.md
├── BRAND_GUIDELINES.md
├── DESIGN_SYSTEM.md
├── COLOR_SYSTEM.md
├── TYPOGRAPHY.md
├── UI_GUIDELINES.md
├── UX_GUIDELINES.md
├── COMPONENT_LIBRARY.md
├── FRONTEND_ARCHITECTURE.md
├── BACKEND_ARCHITECTURE.md
├── DATABASE_SCHEMA.md
├── API_SPECIFICATION.md
├── AUTHENTICATION.md
├── SECURITY.md
├── SEO_STRATEGY.md
├── LOCAL_SEO_ITALY.md
├── CONTENT_STRATEGY.md
├── COPYWRITING_GUIDE.md
├── SELLING_WITH_EMOTIONS.md
├── CRO_GUIDE.md
├── CUSTOMER_JOURNEY.md
├── BUYER_PSYCHOLOGY.md
├── ICP.md
├── TARGET_AUDIENCE.md
├── BRAND_POSITIONING.md
├── MARKETING_STRATEGY.md
├── COMPETITOR_ANALYSIS.md
├── IMAGE_GUIDELINES.md
├── ANIMATION_GUIDELINES.md
├── ACCESSIBILITY.md
├── PERFORMANCE.md
├── RESPONSIVE_GUIDELINES.md
├── CODING_STANDARDS.md
├── CODE_STYLE.md
├── FOLDER_STRUCTURE.md
├── DEPLOYMENT.md
├── TESTING.md
├── ROADMAP.md
└── TASKS.md
```

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ServiceCard.tsx` |
| Pages | kebab-case | `chi-siamo/page.tsx` |
| Utilities | camelCase | `useScroll.ts` |
| Styles | kebab-case | `globals.css` |
| Constants | SCREAMING_SNAKE | `API_URL` |
| Types | PascalCase | `ContactFormData` |

### Folders

| Type | Convention | Example |
|------|------------|---------|
| Component folders | kebab-case | `ui/`, `layout/` |
| Page routes | kebab-case | `chi-siamo/` |
| Feature folders | kebab-case | `forms/`, `sections/` |

### Code

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `userName` |
| Functions | camelCase | `handleSubmit` |
| Classes | PascalCase | `ContactService` |
| Constants | SCREAMING_SNAKE | `MAX_FILE_SIZE` |
| Interfaces | PascalCase | `IUserData` (or just `UserData`) |
| Types | PascalCase | `ContactStatus` |
