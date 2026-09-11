# Database Schema

## Arteparquet PostgreSQL Database Design

### Overview

The database is designed to support all website functionality including content management, lead tracking, and analytics. PostgreSQL 16 is used for its robustness and JSON support.

---

## Database Information

| Property | Value |
|----------|-------|
| **Database Name** | arteparquet |
| **Engine** | PostgreSQL 16 |
| **Host** | EasyPanel (managed) |
| **Encoding** | UTF-8 |
| **Collation** | it_IT.UTF-8 |

---

## Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   users     │       │  contacts   │       │  projects   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │       │ id (PK)     │
│ email       │       │ name        │       │ title       │
│ password    │       │ email       │       │ slug        │
│ role        │       │ phone       │       │ description │
│ created_at  │       │ project_type│       │ category    │
└─────────────┘       │ client_type │       │ images      │
                      │ status      │       │ featured    │
                      │ created_at  │       │ created_at  │
                      └─────────────┘       └─────────────┘

┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│  services   │       │testimonials │       │    blog     │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │       │ id (PK)     │
│ title       │       │ author      │       │ title       │
│ slug        │       │ quote       │       │ slug        │
│ description │       │ rating      │       │ content     │
│ icon        │       │ featured    │       │ author_id   │
│ order       │       │ created_at  │       │ category_id │
└─────────────┘       └─────────────┘       │ published   │
                                            └─────────────┘

┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    faqs     │       │   media     │       │  settings   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │       │ id (PK)     │
│ question    │       │ filename    │       │ key         │
│ answer      │       │ url         │       │ value       │
│ category    │       │ type        │       │ type        │
│ order       │       │ size        │       │ updated_at  │
└─────────────┘       │ created_at  │       └─────────────┘
                      └─────────────┘

┌─────────────┐       ┌─────────────┐
│ categories  │       │  analytics  │
├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │
│ name        │       │ page        │
│ slug        │       │ event       │
│ type        │       │ data        │
│ parent_id   │       │ created_at  │
└─────────────┘       └─────────────┘
```

---

## Table Definitions

### users

Authentication and admin users.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);

-- Roles: 'superadmin', 'admin', 'editor'
```

### contacts

Lead/quote requests from the website.

```sql
CREATE TYPE project_type AS ENUM (
    'installation',
    'restoration', 
    'repair',
    'consultation',
    'materials'
);

CREATE TYPE client_type AS ENUM (
    'private',
    'architect',
    'designer',
    'construction',
    'hotel',
    'restaurant',
    'commercial'
);

CREATE TYPE contact_status AS ENUM (
    'new',
    'contacted',
    'quoted',
    'negotiating',
    'converted',
    'lost',
    'spam'
);

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    
    -- Contact info
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    
    -- Project details
    project_type project_type NOT NULL,
    client_type client_type NOT NULL,
    area_sqm INTEGER,
    environment VARCHAR(50),
    city VARCHAR(100),
    province VARCHAR(50),
    message TEXT,
    contact_preference VARCHAR(20) DEFAULT 'phone',
    
    -- Status tracking
    status contact_status DEFAULT 'new',
    assigned_to INTEGER REFERENCES users(id),
    notes TEXT,
    quoted_amount DECIMAL(10, 2),
    
    -- Metadata
    source VARCHAR(50) DEFAULT 'website',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    contacted_at TIMESTAMP WITH TIME ZONE,
    converted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created ON contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON contacts(email);
```

### projects

Portfolio projects.

```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    
    -- Basic info
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    short_description VARCHAR(500),
    description TEXT NOT NULL,
    
    -- Classification
    category VARCHAR(50) NOT NULL,  -- villa, hotel, restaurant, commercial, residential
    subcategory VARCHAR(50),
    
    -- Details
    location VARCHAR(200),
    city VARCHAR(100),
    province VARCHAR(50),
    year INTEGER,
    area_sqm INTEGER,
    duration_days INTEGER,
    
    -- Materials used
    materials JSONB DEFAULT '[]',  -- ["rovere", "noce", "teak"]
    services JSONB DEFAULT '[]',   -- ["installation", "sanding"]
    pattern VARCHAR(50),           -- herringbone, chevron, plank
    
    -- Media
    cover_image VARCHAR(500),
    images JSONB DEFAULT '[]',     -- [{url, alt, order, caption}]
    video_url VARCHAR(500),
    before_after JSONB,            -- {before: url, after: url}
    
    -- Display
    featured BOOLEAN DEFAULT false,
    homepage_order INTEGER,
    order_index INTEGER DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(70),
    meta_description VARCHAR(160),
    
    -- Status
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX idx_projects_published ON projects(published) WHERE published = true;
```

### services

Service offerings.

```sql
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    
    -- Basic info
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    short_description VARCHAR(300),
    description TEXT NOT NULL,
    
    -- Classification
    category VARCHAR(50) NOT NULL,  -- installation, restoration, details
    parent_id INTEGER REFERENCES services(id),
    
    -- Display
    icon VARCHAR(50),               -- Lucide icon name
    cover_image VARCHAR(500),
    gallery JSONB DEFAULT '[]',
    
    -- Content
    features JSONB DEFAULT '[]',    -- [{title, description}]
    process_steps JSONB DEFAULT '[]', -- [{step, title, description}]
    
    -- Pricing (indicative)
    price_from DECIMAL(10, 2),
    price_unit VARCHAR(20),         -- sqm, linear_m, project
    
    -- SEO
    meta_title VARCHAR(70),
    meta_description VARCHAR(160),
    
    -- Status
    order_index INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_category ON services(category);
```

### testimonials

Client testimonials.

```sql
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    
    -- Author
    author_name VARCHAR(100) NOT NULL,
    author_role VARCHAR(100),
    author_company VARCHAR(100),
    author_image VARCHAR(500),
    author_location VARCHAR(100),
    
    -- Content
    quote TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    
    -- Link to project
    project_id INTEGER REFERENCES projects(id),
    
    -- Display
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    
    -- Status
    published BOOLEAN DEFAULT true,
    source VARCHAR(50),  -- google, direct, email
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_testimonials_featured ON testimonials(featured) WHERE featured = true;
```

### blog_posts

Blog articles.

```sql
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    
    -- Basic info
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    excerpt VARCHAR(500),
    content TEXT NOT NULL,
    
    -- Classification
    category_id INTEGER REFERENCES categories(id),
    tags JSONB DEFAULT '[]',
    
    -- Author
    author_id INTEGER REFERENCES users(id),
    
    -- Media
    cover_image VARCHAR(500),
    images JSONB DEFAULT '[]',
    
    -- SEO
    meta_title VARCHAR(70),
    meta_description VARCHAR(160),
    canonical_url VARCHAR(500),
    
    -- Stats
    view_count INTEGER DEFAULT 0,
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft',  -- draft, published, archived
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(published, published_at DESC);
CREATE INDEX idx_blog_category ON blog_posts(category_id);
```

### categories

Categories for blog posts and FAQs.

```sql
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL,  -- blog, faq, project
    parent_id INTEGER REFERENCES categories(id),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_categories_slug_type ON categories(slug, type);
```

### faqs

Frequently asked questions.

```sql
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    order_index INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_faqs_category ON faqs(category_id);
```

### media

Media files management.

```sql
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    
    -- File info
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_path VARCHAR(500) NOT NULL,
    url VARCHAR(500) NOT NULL,
    
    -- Metadata
    mime_type VARCHAR(100),
    file_size INTEGER,
    width INTEGER,
    height INTEGER,
    
    -- Organization
    alt_text VARCHAR(255),
    caption TEXT,
    folder VARCHAR(100) DEFAULT 'uploads',
    
    -- Variants (for images)
    variants JSONB DEFAULT '{}',  -- {thumb: url, medium: url, large: url}
    
    -- Metadata
    uploaded_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_folder ON media(folder);
CREATE INDEX idx_media_type ON media(mime_type);
```

### settings

Site-wide settings.

```sql
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    type VARCHAR(20) DEFAULT 'string',  -- string, number, boolean, json
    category VARCHAR(50) DEFAULT 'general',
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(id)
);

-- Default settings
INSERT INTO settings (key, value, type, category) VALUES
('site_name', 'Arteparquet', 'string', 'general'),
('site_tagline', 'Specialisti in Parquet • SPC • PVC • Laminati', 'string', 'general'),
('phone', '+393892407827', 'string', 'contact'),
('email', 'info@arteparquet.pro', 'string', 'contact'),
('whatsapp', '393892407827', 'string', 'contact'),
('address_city', 'Bergamo', 'string', 'contact'),
('address_country', 'Italia', 'string', 'contact'),
('vat_number', '03326410168', 'string', 'legal'),
('social_instagram', '', 'string', 'social'),
('social_facebook', '', 'string', 'social'),
('analytics_ga_id', '', 'string', 'analytics');
```

### analytics_events

Custom analytics tracking.

```sql
CREATE TABLE analytics_events (
    id SERIAL PRIMARY KEY,
    
    -- Event info
    event_type VARCHAR(50) NOT NULL,  -- page_view, form_submit, click
    event_name VARCHAR(100),
    
    -- Page info
    page_path VARCHAR(500),
    page_title VARCHAR(200),
    referrer VARCHAR(500),
    
    -- User info (anonymous)
    session_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    device_type VARCHAR(20),
    
    -- Event data
    data JSONB DEFAULT '{}',
    
    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_session ON analytics_events(session_id);

-- Partitioning by month for performance
-- Consider implementing table partitioning for large datasets
```

---

## Migrations

### Alembic Configuration

```python
# alembic/env.py
from app.models import Base
from app.config import get_settings

settings = get_settings()
config.set_main_option("sqlalchemy.url", settings.database_url)
target_metadata = Base.metadata
```

### Migration Commands

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Run migrations
alembic upgrade head

# Rollback one step
alembic downgrade -1

# Show current revision
alembic current
```

---

## Indexes Summary

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| users | idx_users_email | email | Login lookup |
| contacts | idx_contacts_status | status | Filter by status |
| contacts | idx_contacts_created | created_at DESC | Latest first |
| projects | idx_projects_slug | slug | URL lookup |
| projects | idx_projects_featured | featured | Homepage query |
| services | idx_services_slug | slug | URL lookup |
| blog_posts | idx_blog_published | published, published_at | Published posts |
| analytics | idx_analytics_created | created_at DESC | Time-based queries |

---

## Backup Strategy

```bash
# Daily backup
pg_dump -h localhost -U postgres arteparquet > backup_$(date +%Y%m%d).sql

# Restore
psql -h localhost -U postgres arteparquet < backup_20240101.sql
```
