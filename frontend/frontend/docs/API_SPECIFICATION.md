# API Specification

## Arteparquet REST API Documentation

### Overview

The Arteparquet API follows REST principles and provides endpoints for managing website content, handling contact requests, and administrative functions.

---

## Base Information

| Property | Value |
|----------|-------|
| **Base URL** | `https://api.arteparquet.pro/api/v1` |
| **Format** | JSON |
| **Authentication** | JWT Bearer Token |
| **Rate Limit** | 60 requests/minute (public), 300/minute (authenticated) |

---

## Authentication

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@arteparquet.pro",
  "password": "your-password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

### Refresh Token

```http
POST /auth/refresh
Authorization: Bearer {refresh_token}
```

### Using Authentication

Include the access token in the Authorization header:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Public Endpoints

### Contacts (Quote Requests)

#### Create Contact

```http
POST /contacts
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Mario Rossi",
  "email": "mario.rossi@email.com",
  "phone": "+393331234567",
  "project_type": "installation",
  "client_type": "private",
  "area_sqm": 80,
  "environment": "appartamento",
  "city": "Milano",
  "message": "Vorrei un preventivo per parquet in rovere.",
  "contact_preference": "whatsapp"
}
```

**Enums:**
- `project_type`: `installation`, `restoration`, `repair`, `consultation`, `materials`
- `client_type`: `private`, `architect`, `designer`, `construction`, `hotel`, `restaurant`, `commercial`
- `contact_preference`: `phone`, `whatsapp`, `email`

**Response:** `201 Created`
```json
{
  "id": 123,
  "message": "Richiesta ricevuta. Ti contatteremo entro 24 ore.",
  "reference": "ART-2024-00123"
}
```

### Projects (Portfolio)

#### List Projects

```http
GET /projects
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category |
| `featured` | boolean | Only featured projects |
| `limit` | integer | Number of results (default: 12) |
| `offset` | integer | Pagination offset |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Villa sul Lago di Como",
      "slug": "villa-lago-como",
      "short_description": "Posa parquet massello in rovere",
      "category": "villa",
      "location": "Como",
      "year": 2023,
      "cover_image": "https://api.arteparquet.pro/media/projects/villa-como.jpg",
      "featured": true
    }
  ],
  "total": 45,
  "limit": 12,
  "offset": 0
}
```

#### Get Project

```http
GET /projects/{slug}
```

**Response:**
```json
{
  "id": 1,
  "title": "Villa sul Lago di Como",
  "slug": "villa-lago-como",
  "description": "Full description...",
  "short_description": "Posa parquet massello in rovere",
  "category": "villa",
  "location": "Como, Lombardia",
  "year": 2023,
  "area_sqm": 250,
  "materials": ["rovere", "massello"],
  "services": ["installation", "sanding"],
  "pattern": "herringbone",
  "cover_image": "https://...",
  "images": [
    {
      "url": "https://...",
      "alt": "Soggiorno con parquet",
      "order": 1
    }
  ],
  "before_after": {
    "before": "https://...",
    "after": "https://..."
  },
  "meta_title": "Villa sul Lago di Como | Arteparquet",
  "meta_description": "Posa parquet massello..."
}
```

### Services

#### List Services

```http
GET /services
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Posa Parquet",
      "slug": "posa-parquet",
      "short_description": "Installazione professionale",
      "category": "installation",
      "icon": "hammer",
      "cover_image": "https://..."
    }
  ]
}
```

#### Get Service

```http
GET /services/{slug}
```

### Testimonials

#### List Testimonials

```http
GET /testimonials
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `featured` | boolean | Only featured |
| `limit` | integer | Number of results |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "author_name": "Marco B.",
      "author_role": "Architetto",
      "author_location": "Milano",
      "quote": "Lavoro impeccabile...",
      "rating": 5,
      "project_slug": "villa-lago-como"
    }
  ]
}
```

### Blog

#### List Posts

```http
GET /blog
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category slug |
| `tag` | string | Filter by tag |
| `limit` | integer | Number of results |
| `offset` | integer | Pagination offset |

#### Get Post

```http
GET /blog/{slug}
```

### FAQ

#### List FAQs

```http
GET /faqs
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category |

### Settings (Public)

#### Get Public Settings

```http
GET /settings/public
```

**Response:**
```json
{
  "site_name": "Arteparquet",
  "site_tagline": "Specialisti in Parquet...",
  "phone": "+393892407827",
  "email": "info@arteparquet.pro",
  "whatsapp": "393892407827",
  "address_city": "Bergamo",
  "social_instagram": "...",
  "social_facebook": "..."
}
```

---

## Admin Endpoints

All admin endpoints require authentication.

### Contacts Management

#### List Contacts

```http
GET /admin/contacts
Authorization: Bearer {token}
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status |
| `from_date` | date | Start date |
| `to_date` | date | End date |
| `search` | string | Search in name/email |
| `limit` | integer | Results per page |
| `offset` | integer | Pagination offset |

#### Get Contact

```http
GET /admin/contacts/{id}
Authorization: Bearer {token}
```

#### Update Contact Status

```http
PATCH /admin/contacts/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "contacted",
  "notes": "Called on 15/01, will send quote"
}
```

#### Delete Contact

```http
DELETE /admin/contacts/{id}
Authorization: Bearer {token}
```

### Projects Management

#### Create Project

```http
POST /admin/projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Hotel Belvedere",
  "slug": "hotel-belvedere",
  "description": "Full description...",
  "short_description": "Short desc...",
  "category": "hotel",
  "location": "Firenze",
  "year": 2024,
  "area_sqm": 500,
  "materials": ["rovere", "prefinito"],
  "images": [...],
  "featured": false,
  "published": true
}
```

#### Update Project

```http
PUT /admin/projects/{id}
Authorization: Bearer {token}
```

#### Delete Project

```http
DELETE /admin/projects/{id}
Authorization: Bearer {token}
```

#### Reorder Projects

```http
PATCH /admin/projects/reorder
Authorization: Bearer {token}
Content-Type: application/json

{
  "order": [3, 1, 5, 2, 4]
}
```

### Media Management

#### Upload Media

```http
POST /admin/media/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: (binary)
folder: "projects"
alt_text: "Description"
```

**Response:**
```json
{
  "id": 45,
  "url": "https://api.arteparquet.pro/media/projects/image.jpg",
  "filename": "image.jpg",
  "variants": {
    "thumb": "https://.../image-thumb.jpg",
    "medium": "https://.../image-medium.jpg",
    "large": "https://.../image-large.jpg"
  }
}
```

#### List Media

```http
GET /admin/media
Authorization: Bearer {token}
```

#### Delete Media

```http
DELETE /admin/media/{id}
Authorization: Bearer {token}
```

### Settings Management

#### Get All Settings

```http
GET /admin/settings
Authorization: Bearer {token}
```

#### Update Setting

```http
PATCH /admin/settings/{key}
Authorization: Bearer {token}
Content-Type: application/json

{
  "value": "new value"
}
```

### Analytics

#### Dashboard Stats

```http
GET /admin/analytics/dashboard
Authorization: Bearer {token}
```

**Response:**
```json
{
  "contacts": {
    "total": 156,
    "new": 12,
    "this_month": 28,
    "conversion_rate": 0.23
  },
  "projects": {
    "total": 45,
    "published": 42
  },
  "traffic": {
    "page_views_today": 234,
    "page_views_month": 5420
  }
}
```

---

## Error Responses

### Standard Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `204` | No Content (successful delete) |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `422` | Validation Error |
| `429` | Too Many Requests |
| `500` | Internal Server Error |

---

## Rate Limiting

Response headers include rate limit information:

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1704067200
```

When exceeded:
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please wait before retrying.",
    "retry_after": 30
  }
}
```

---

## Webhooks (Future)

### Contact Created

```json
{
  "event": "contact.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": 123,
    "name": "Mario Rossi",
    "email": "mario@email.com",
    "project_type": "installation"
  }
}
```

---

## OpenAPI Specification

Full OpenAPI 3.0 specification available at:
```
https://api.arteparquet.pro/openapi.json
```

Interactive documentation:
```
https://api.arteparquet.pro/docs
```
