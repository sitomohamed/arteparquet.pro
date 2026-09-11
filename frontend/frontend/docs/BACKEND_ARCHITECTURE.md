# Backend Architecture

## Arteparquet Backend Technical Specification

### Overview

The Arteparquet backend is built with Python and FastAPI, providing a robust REST API for content management, lead handling, and analytics. The architecture follows clean architecture principles for maintainability and testability.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.12+ | Programming language |
| FastAPI | 0.115+ | Web framework |
| SQLAlchemy | 2.x | ORM |
| Alembic | 1.x | Database migrations |
| Pydantic | 2.x | Data validation |
| PostgreSQL | 16 | Database |
| Redis | 7.x | Caching (optional) |
| JWT | - | Authentication |
| Uvicorn | 0.30+ | ASGI server |
| Gunicorn | 23+ | Process manager |

---

## Project Structure

```
backend/
├── alembic/                      # Database migrations
│   ├── versions/
│   ├── env.py
│   └── alembic.ini
│
├── app/
│   ├── __init__.py
│   ├── main.py                   # FastAPI application entry
│   ├── config.py                 # Configuration settings
│   │
│   ├── api/                      # API routes
│   │   ├── __init__.py
│   │   ├── deps.py               # Dependencies
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py         # Main router
│   │       ├── auth.py           # Authentication endpoints
│   │       ├── contacts.py       # Contact form endpoints
│   │       ├── projects.py       # Portfolio endpoints
│   │       ├── services.py       # Services endpoints
│   │       ├── testimonials.py   # Testimonials endpoints
│   │       ├── blog.py           # Blog endpoints
│   │       ├── faq.py            # FAQ endpoints
│   │       ├── media.py          # Media upload endpoints
│   │       └── settings.py       # Site settings endpoints
│   │
│   ├── core/                     # Core functionality
│   │   ├── __init__.py
│   │   ├── security.py           # JWT, hashing
│   │   ├── exceptions.py         # Custom exceptions
│   │   └── middleware.py         # Custom middleware
│   │
│   ├── models/                   # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── base.py               # Base model class
│   │   ├── user.py
│   │   ├── contact.py
│   │   ├── project.py
│   │   ├── service.py
│   │   ├── testimonial.py
│   │   ├── blog.py
│   │   ├── faq.py
│   │   ├── media.py
│   │   └── settings.py
│   │
│   ├── schemas/                  # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── contact.py
│   │   ├── project.py
│   │   ├── service.py
│   │   ├── testimonial.py
│   │   ├── blog.py
│   │   ├── faq.py
│   │   └── common.py
│   │
│   ├── services/                 # Business logic
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── contact.py
│   │   ├── email.py
│   │   ├── project.py
│   │   └── media.py
│   │
│   ├── db/                       # Database
│   │   ├── __init__.py
│   │   ├── session.py            # Database session
│   │   └── init_db.py            # Initial data
│   │
│   └── utils/                    # Utilities
│       ├── __init__.py
│       ├── email.py              # Email sending
│       ├── storage.py            # File storage
│       └── validators.py         # Custom validators
│
├── tests/                        # Test suite
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_contacts.py
│   └── test_projects.py
│
├── .env.example                  # Environment template
├── requirements.txt              # Dependencies
├── Dockerfile
├── docker-compose.yml
└── pyproject.toml
```

---

## Configuration

### Environment Variables

```env
# .env

# Application
APP_ENV=production
APP_DEBUG=false
APP_SECRET_KEY=your-secret-key-here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/arteparquet

# Redis (optional)
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET_KEY=your-jwt-secret
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=info@arteparquet.pro
SMTP_PASSWORD=your-password
EMAIL_FROM=info@arteparquet.pro
EMAIL_TO=info@arteparquet.pro

# Storage
STORAGE_TYPE=local  # or s3
STORAGE_PATH=/app/uploads
# S3_BUCKET=arteparquet-media
# S3_REGION=eu-south-1

# CORS
CORS_ORIGINS=https://arteparquet.pro,https://www.arteparquet.pro

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60
```

### Config Class

```python
# app/config.py
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    app_env: str = "development"
    app_debug: bool = False
    app_secret_key: str
    
    database_url: str
    
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    
    smtp_host: str
    smtp_port: int = 587
    smtp_user: str
    smtp_password: str
    email_from: str
    email_to: str
    
    cors_origins: list[str] = ["http://localhost:3000"]
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    return Settings()
```

---

## Main Application

```python
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import get_settings
from app.api.v1.router import api_router
from app.db.session import engine
from app.models.base import Base

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown
    await engine.dispose()

app = FastAPI(
    title="Arteparquet API",
    description="Backend API for Arteparquet.pro",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.app_debug else None,
    redoc_url="/redoc" if settings.app_debug else None,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

---

## Database Models

### Base Model

```python
# app/models/base.py
from sqlalchemy import Column, DateTime
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.sql import func

class Base(DeclarativeBase):
    pass

class TimestampMixin:
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

### Contact Model

```python
# app/models/contact.py
from sqlalchemy import Column, Integer, String, Text, Enum
from app.models.base import Base, TimestampMixin
import enum

class ProjectType(str, enum.Enum):
    INSTALLATION = "installation"
    RESTORATION = "restoration"
    REPAIR = "repair"
    CONSULTATION = "consultation"

class ClientType(str, enum.Enum):
    PRIVATE = "private"
    ARCHITECT = "architect"
    CONSTRUCTION = "construction"
    COMMERCIAL = "commercial"

class ContactStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUOTED = "quoted"
    CONVERTED = "converted"
    CLOSED = "closed"

class Contact(Base, TimestampMixin):
    __tablename__ = "contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    project_type = Column(Enum(ProjectType), nullable=False)
    client_type = Column(Enum(ClientType), nullable=False)
    area_sqm = Column(Integer, nullable=True)
    environment = Column(String(50), nullable=True)
    message = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    contact_preference = Column(String(20), default="phone")
    status = Column(Enum(ContactStatus), default=ContactStatus.NEW)
    notes = Column(Text, nullable=True)
```

### Project Model

```python
# app/models/project.py
from sqlalchemy import Column, Integer, String, Text, Boolean, ARRAY
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base, TimestampMixin

class Project(Base, TimestampMixin):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=False)
    short_description = Column(String(500), nullable=True)
    category = Column(String(50), nullable=False)  # villa, hotel, commercial
    location = Column(String(200), nullable=True)
    year = Column(Integer, nullable=True)
    area_sqm = Column(Integer, nullable=True)
    materials = Column(ARRAY(String), nullable=True)
    images = Column(JSONB, default=[])  # [{url, alt, order}]
    featured = Column(Boolean, default=False)
    published = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    
    # SEO
    meta_title = Column(String(70), nullable=True)
    meta_description = Column(String(160), nullable=True)
```

---

## API Schemas

```python
# app/schemas/contact.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum
from datetime import datetime

class ProjectType(str, Enum):
    installation = "installation"
    restoration = "restoration"
    repair = "repair"
    consultation = "consultation"

class ClientType(str, Enum):
    private = "private"
    architect = "architect"
    construction = "construction"
    commercial = "commercial"

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r"^\+?[0-9]{10,15}$")
    project_type: ProjectType
    client_type: ClientType
    area_sqm: Optional[int] = Field(None, ge=1, le=100000)
    environment: Optional[str] = None
    message: Optional[str] = Field(None, max_length=2000)
    city: Optional[str] = None
    contact_preference: str = "phone"

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    project_type: ProjectType
    client_type: ClientType
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True
```

---

## API Routes

```python
# app/api/v1/contacts.py
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_admin
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact import ContactService
from app.services.email import send_notification_email

router = APIRouter(prefix="/contacts", tags=["contacts"])

@router.post("/", response_model=ContactResponse)
async def create_contact(
    contact: ContactCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new contact/quote request.
    Public endpoint - no authentication required.
    """
    service = ContactService(db)
    result = await service.create(contact)
    
    # Send notification email in background
    background_tasks.add_task(
        send_notification_email,
        contact=contact,
    )
    
    return result

@router.get("/", response_model=list[ContactResponse])
async def list_contacts(
    skip: int = 0,
    limit: int = 50,
    status: str = None,
    db: AsyncSession = Depends(get_db),
    admin = Depends(get_current_admin),
):
    """
    List all contacts. Admin only.
    """
    service = ContactService(db)
    return await service.get_all(skip=skip, limit=limit, status=status)

@router.get("/{contact_id}", response_model=ContactResponse)
async def get_contact(
    contact_id: int,
    db: AsyncSession = Depends(get_db),
    admin = Depends(get_current_admin),
):
    """
    Get a specific contact. Admin only.
    """
    service = ContactService(db)
    contact = await service.get_by_id(contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@router.patch("/{contact_id}/status")
async def update_contact_status(
    contact_id: int,
    status: str,
    notes: str = None,
    db: AsyncSession = Depends(get_db),
    admin = Depends(get_current_admin),
):
    """
    Update contact status. Admin only.
    """
    service = ContactService(db)
    return await service.update_status(contact_id, status, notes)
```

---

## Authentication

```python
# app/core/security.py
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.config import get_settings

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)

def verify_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        return payload
    except JWTError:
        return None
```

---

## Email Service

```python
# app/utils/email.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import get_settings

settings = get_settings()

async def send_notification_email(contact):
    """Send email notification for new contact."""
    
    msg = MIMEMultipart()
    msg["From"] = settings.email_from
    msg["To"] = settings.email_to
    msg["Subject"] = f"Nuova richiesta da {contact.name}"
    
    body = f"""
    Nuova richiesta di preventivo:
    
    Nome: {contact.name}
    Email: {contact.email}
    Telefono: {contact.phone}
    Tipo progetto: {contact.project_type}
    Tipo cliente: {contact.client_type}
    Città: {contact.city or 'Non specificata'}
    Superficie: {contact.area_sqm or 'Non specificata'} mq
    
    Messaggio:
    {contact.message or 'Nessun messaggio'}
    
    ---
    Rispondi a questo contatto il prima possibile.
    """
    
    msg.attach(MIMEText(body, "plain"))
    
    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
        server.starttls()
        server.login(settings.smtp_user, settings.smtp_password)
        server.send_message(msg)
```

---

## Docker Configuration

```dockerfile
# Dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser
USER appuser

EXPOSE 8000

CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/arteparquet
    depends_on:
      - db
    volumes:
      - ./uploads:/app/uploads

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=arteparquet
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```
