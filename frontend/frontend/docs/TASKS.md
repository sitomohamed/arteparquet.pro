# Tasks

## Arteparquet Development Task List

### Overview

This document contains all development tasks organized by phase. Use this as a checklist for building the complete Arteparquet website.

---

## Phase 1: Project Setup

### 1.1 Repository Setup
- [ ] Create GitHub repository
- [ ] Set up branch protection rules
- [ ] Configure GitHub Actions for CI/CD
- [ ] Add README.md with project overview
- [ ] Add .gitignore for both frontend and backend
- [ ] Set up commit hooks (husky, lint-staged)

### 1.2 Frontend Setup
- [ ] Initialize Next.js 15 with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up shadcn/ui
- [ ] Configure ESLint and Prettier
- [ ] Set up fonts (Playfair Display, Inter)
- [ ] Configure color palette in Tailwind
- [ ] Create folder structure
- [ ] Set up environment variables
- [ ] Create Dockerfile

### 1.3 Backend Setup
- [ ] Initialize FastAPI project
- [ ] Configure SQLAlchemy with async
- [ ] Set up Alembic for migrations
- [ ] Configure Pydantic settings
- [ ] Set up JWT authentication
- [ ] Create folder structure
- [ ] Set up environment variables
- [ ] Create Dockerfile
- [ ] Create docker-compose.yml

### 1.4 Database Setup
- [ ] Design database schema
- [ ] Create initial migration
- [ ] Set up seed data script
- [ ] Configure connection pooling
- [ ] Test database connectivity

---

## Phase 2: Core Components

### 2.1 Layout Components
- [ ] Header component
  - [ ] Logo with icon and wordmark
  - [ ] Navigation links
  - [ ] CTA button
  - [ ] Scroll behavior (transparent → solid)
  - [ ] Mobile hamburger menu
- [ ] Footer component
  - [ ] Logo and description
  - [ ] Navigation links
  - [ ] Contact information
  - [ ] Social links
  - [ ] Copyright and legal
- [ ] Mobile navigation (full-screen overlay)
- [ ] Breadcrumb component
- [ ] Skip link for accessibility
- [ ] Container component
- [ ] Section component

### 2.2 UI Components
- [ ] Button (primary, secondary, ghost, sizes)
- [ ] Card (base, service, portfolio, testimonial)
- [ ] Input (text, email, phone, textarea)
- [ ] Select dropdown
- [ ] Checkbox and Radio
- [ ] Form components (label, helper, error)
- [ ] Badge
- [ ] Accordion (for FAQ)
- [ ] Tabs
- [ ] Modal/Dialog
- [ ] Toast notifications
- [ ] Skeleton loaders
- [ ] Loading spinner

### 2.3 Media Components
- [ ] Optimized Image wrapper
- [ ] Image Gallery with lightbox
- [ ] Before/After Slider
- [ ] Video Player (optional)

### 2.4 Animation Components
- [ ] FadeIn animation wrapper
- [ ] StaggerChildren wrapper
- [ ] CountUp for statistics
- [ ] Scroll reveal animations

### 2.5 Shared Components
- [ ] WhatsApp floating button
- [ ] Phone button (click-to-call)
- [ ] Back to top button
- [ ] Cookie consent banner
- [ ] Section header (overline, title, description)

---

## Phase 3: Page Development

### 3.1 Homepage
- [ ] Hero section
  - [ ] Background image/video
  - [ ] Headline and subheadline
  - [ ] La Scala credential badge
  - [ ] Primary CTA
- [ ] Credentials section (stats)
- [ ] Services overview section
- [ ] Portfolio preview section
- [ ] Testimonials section
- [ ] About preview section
- [ ] CTA section
- [ ] SEO metadata

### 3.2 Services Pages
- [ ] Services index page
  - [ ] Services grid/list
  - [ ] Category filtering
- [ ] Service detail page template
  - [ ] Hero with service image
  - [ ] Description and benefits
  - [ ] Process steps
  - [ ] Gallery
  - [ ] FAQ (service-specific)
  - [ ] Related services
  - [ ] CTA

### 3.3 Portfolio Pages
- [ ] Portfolio index page
  - [ ] Grid layout
  - [ ] Category filters
  - [ ] Pagination or infinite scroll
- [ ] Project detail page
  - [ ] Image gallery
  - [ ] Project description
  - [ ] Details (location, area, materials)
  - [ ] Before/After slider (if applicable)
  - [ ] Related projects
  - [ ] CTA

### 3.4 About Page (Chi Siamo)
- [ ] Hero section
- [ ] Story section
- [ ] La Scala feature section
- [ ] Values section
- [ ] Process/methodology section
- [ ] Team/founder section
- [ ] Credentials and numbers
- [ ] CTA

### 3.5 Contact Page
- [ ] Hero section
- [ ] Contact information
- [ ] Multi-step form
  - [ ] Step 1: Project type
  - [ ] Step 2: Client type
  - [ ] Step 3: Project details
  - [ ] Step 4: Contact info
  - [ ] Progress indicator
  - [ ] Validation
  - [ ] Submit handling
- [ ] Thank you state
- [ ] Map or service area
- [ ] FAQ section

### 3.6 Blog Pages
- [ ] Blog index page
  - [ ] Post grid
  - [ ] Category filter
  - [ ] Pagination
- [ ] Blog post page
  - [ ] Content rendering
  - [ ] Author info
  - [ ] Related posts
  - [ ] Share buttons
  - [ ] CTA

### 3.7 FAQ Page
- [ ] Accordion-based FAQ
- [ ] Category organization
- [ ] Search (optional)
- [ ] CTA

### 3.8 Legal Pages
- [ ] Privacy Policy
- [ ] Cookie Policy

### 3.9 Error Pages
- [ ] 404 Not Found
- [ ] 500 Error
- [ ] Generic error boundary

---

## Phase 4: Backend API

### 4.1 Authentication
- [ ] Login endpoint
- [ ] Token refresh endpoint
- [ ] Password hashing
- [ ] JWT generation/validation
- [ ] Role-based access control

### 4.2 Contacts API
- [ ] POST /contacts (public - create lead)
- [ ] GET /admin/contacts (admin - list)
- [ ] GET /admin/contacts/:id (admin - detail)
- [ ] PATCH /admin/contacts/:id (admin - update status)
- [ ] DELETE /admin/contacts/:id (admin - delete)
- [ ] Email notification on new contact

### 4.3 Projects API
- [ ] GET /projects (public - list)
- [ ] GET /projects/:slug (public - detail)
- [ ] POST /admin/projects (admin - create)
- [ ] PUT /admin/projects/:id (admin - update)
- [ ] DELETE /admin/projects/:id (admin - delete)
- [ ] PATCH /admin/projects/reorder (admin - reorder)

### 4.4 Services API
- [ ] GET /services (public - list)
- [ ] GET /services/:slug (public - detail)
- [ ] Admin CRUD endpoints

### 4.5 Testimonials API
- [ ] GET /testimonials (public - list)
- [ ] Admin CRUD endpoints

### 4.6 Blog API
- [ ] GET /blog (public - list)
- [ ] GET /blog/:slug (public - detail)
- [ ] Admin CRUD endpoints

### 4.7 FAQ API
- [ ] GET /faqs (public - list)
- [ ] Admin CRUD endpoints

### 4.8 Settings API
- [ ] GET /settings/public (public - site settings)
- [ ] Admin settings management

### 4.9 Media API
- [ ] POST /admin/media/upload
- [ ] GET /admin/media
- [ ] DELETE /admin/media/:id
- [ ] Image resizing/optimization

---

## Phase 5: SEO & Analytics

### 5.1 Technical SEO
- [ ] Meta tags for all pages
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] JSON-LD schema (LocalBusiness, Service, FAQ)
- [ ] Sitemap.xml generation
- [ ] Robots.txt
- [ ] Canonical URLs

### 5.2 Analytics
- [ ] Google Analytics 4 setup
- [ ] Event tracking (form submissions, CTA clicks)
- [ ] Conversion tracking
- [ ] Web Vitals reporting

---

## Phase 6: Admin Dashboard

### 6.1 Dashboard
- [ ] Overview stats (leads, projects, traffic)
- [ ] Recent leads
- [ ] Quick actions

### 6.2 Leads Management
- [ ] Leads list with filters
- [ ] Lead detail view
- [ ] Status updates
- [ ] Notes

### 6.3 Content Management
- [ ] Projects CRUD
- [ ] Services CRUD
- [ ] Testimonials CRUD
- [ ] Blog posts CRUD
- [ ] FAQ CRUD

### 6.4 Media Management
- [ ] Image upload
- [ ] Media library
- [ ] Image editing

### 6.5 Settings
- [ ] Site settings
- [ ] User management
- [ ] Password change

---

## Phase 7: Testing

### 7.1 Frontend Testing
- [ ] Component unit tests
- [ ] Integration tests
- [ ] E2E tests (critical flows)
- [ ] Accessibility testing
- [ ] Visual regression testing

### 7.2 Backend Testing
- [ ] Unit tests for services
- [ ] API endpoint tests
- [ ] Authentication tests
- [ ] Database tests

### 7.3 Performance Testing
- [ ] Lighthouse audits
- [ ] Core Web Vitals validation
- [ ] Load testing

---

## Phase 8: Deployment

### 8.1 Infrastructure
- [ ] Configure Vercel for frontend
- [ ] Configure EasyPanel for backend
- [ ] Set up PostgreSQL database
- [ ] Configure Cloudflare DNS
- [ ] SSL certificates

### 8.2 CI/CD
- [ ] GitHub Actions for frontend
- [ ] GitHub Actions for backend
- [ ] Automated testing in pipeline
- [ ] Automated deployment

### 8.3 Monitoring
- [ ] Error tracking setup
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Log aggregation

---

## Phase 9: Launch

### 9.1 Pre-Launch Checklist
- [ ] All pages complete and tested
- [ ] Forms working and sending emails
- [ ] SEO metadata verified
- [ ] Analytics tracking confirmed
- [ ] Performance targets met
- [ ] Accessibility audit passed
- [ ] Security audit passed
- [ ] Mobile testing complete
- [ ] Cross-browser testing complete
- [ ] Legal pages in place
- [ ] Cookie consent working

### 9.2 Launch
- [ ] DNS switch to production
- [ ] SSL verification
- [ ] Monitor for errors
- [ ] Test all critical flows
- [ ] Submit sitemap to Google
- [ ] Set up Google Business Profile

### 9.3 Post-Launch
- [ ] Monitor analytics
- [ ] Address any issues
- [ ] Gather feedback
- [ ] Plan content updates

---

## Phase 10: Ongoing

### Content
- [ ] Regular blog posts
- [ ] Portfolio updates
- [ ] Testimonial collection

### Optimization
- [ ] A/B testing
- [ ] Conversion optimization
- [ ] Performance monitoring
- [ ] SEO improvements

### Maintenance
- [ ] Dependency updates
- [ ] Security patches
- [ ] Backup verification
- [ ] Analytics review

---

## Priority Legend

| Priority | Description |
|----------|-------------|
| 🔴 Critical | Must have for launch |
| 🟠 High | Important for launch |
| 🟡 Medium | Nice to have |
| 🟢 Low | Future enhancement |

---

## Time Estimates

| Phase | Estimated Duration |
|-------|-------------------|
| Phase 1: Setup | 2-3 days |
| Phase 2: Components | 5-7 days |
| Phase 3: Pages | 7-10 days |
| Phase 4: Backend | 5-7 days |
| Phase 5: SEO | 2-3 days |
| Phase 6: Admin | 5-7 days |
| Phase 7: Testing | 3-5 days |
| Phase 8: Deployment | 2-3 days |
| **Total** | **31-45 days** |

---

## Dependencies

```
Phase 1 (Setup)
    │
    ├── Phase 2 (Components)
    │       │
    │       └── Phase 3 (Pages)
    │               │
    │               └── Phase 5 (SEO)
    │
    └── Phase 4 (Backend)
            │
            └── Phase 6 (Admin)

Phase 7 (Testing) ← All above phases
    │
    └── Phase 8 (Deployment)
            │
            └── Phase 9 (Launch)
```
