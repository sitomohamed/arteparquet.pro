# Security

## Arteparquet Security Guidelines

### Overview

This document outlines security measures and best practices for the Arteparquet application to protect against common vulnerabilities and ensure data safety.

---

## Security Principles

1. **Defense in Depth**: Multiple layers of security
2. **Least Privilege**: Minimal access rights
3. **Secure by Default**: Security enabled out of the box
4. **Input Validation**: Trust no input
5. **Fail Securely**: Errors don't expose information

---

## OWASP Top 10 Mitigations

### 1. Injection Prevention

**SQL Injection:**
```python
# ❌ Never do this
query = f"SELECT * FROM users WHERE email = '{email}'"

# ✅ Use parameterized queries (SQLAlchemy)
user = await db.execute(
    select(User).where(User.email == email)
)
```

**Command Injection:**
```python
# ❌ Never do this
os.system(f"convert {filename}")

# ✅ Use safe libraries
from PIL import Image
Image.open(filename).save(output)
```

### 2. Broken Authentication

**Implemented Protections:**
- Strong password requirements (8+ chars, mixed case, numbers, symbols)
- Bcrypt password hashing with salt
- JWT with short expiration (30 min access, 7 day refresh)
- Rate limiting on login (5 attempts/minute)
- Account lockout after failed attempts
- Secure token storage recommendations

### 3. Sensitive Data Exposure

**Data Protection:**
```python
# Environment variables for secrets
DATABASE_URL = os.getenv("DATABASE_URL")
JWT_SECRET = os.getenv("JWT_SECRET_KEY")

# Never log sensitive data
logger.info(f"User logged in: {user.email}")  # ✅
logger.info(f"Password: {password}")  # ❌ NEVER
```

**Encryption:**
- TLS 1.3 for all connections
- HTTPS only (HSTS enabled)
- Database encryption at rest

### 4. XML External Entities (XXE)

Not applicable - JSON API only, no XML parsing.

### 5. Broken Access Control

```python
# Always verify ownership
@router.get("/contacts/{id}")
async def get_contact(
    id: int,
    current_user: User = Depends(get_current_admin),  # Require admin
):
    contact = await contact_service.get_by_id(id)
    if not contact:
        raise HTTPException(404)
    return contact
```

### 6. Security Misconfiguration

**Hardening Checklist:**
- [ ] Debug mode disabled in production
- [ ] Default credentials changed
- [ ] Unnecessary features disabled
- [ ] Error messages don't leak info
- [ ] Security headers configured
- [ ] CORS properly configured

### 7. Cross-Site Scripting (XSS)

**Frontend Protection:**
```tsx
// React automatically escapes
<p>{userInput}</p>  // ✅ Safe

// Never use dangerouslySetInnerHTML with user input
<div dangerouslySetInnerHTML={{__html: userInput}} />  // ❌ Danger
```

**Content Security Policy:**
```python
response.headers["Content-Security-Policy"] = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
    "img-src 'self' data: https:; "
    "font-src 'self' https://fonts.gstatic.com; "
    "connect-src 'self' https://api.arteparquet.pro;"
)
```

### 8. Insecure Deserialization

```python
# ✅ Use Pydantic for safe deserialization
from pydantic import BaseModel

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    # Pydantic validates and sanitizes
```

### 9. Using Components with Known Vulnerabilities

**Dependency Management:**
```bash
# Regular security audits
pip-audit  # Python
npm audit  # Node.js

# Automated updates
dependabot enabled on GitHub
```

### 10. Insufficient Logging & Monitoring

```python
# Structured logging
import structlog

logger = structlog.get_logger()

logger.info(
    "login_attempt",
    email=email,
    success=True,
    ip_address=request.client.host,
)

logger.warning(
    "login_failed",
    email=email,
    reason="invalid_password",
    ip_address=request.client.host,
)
```

---

## Security Headers

### Implementation

```python
# app/core/middleware.py
SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Content-Security-Policy": "default-src 'self'",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
}
```

---

## Input Validation

### Backend Validation

```python
from pydantic import BaseModel, EmailStr, Field, validator
import re

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r"^\+?[0-9]{10,15}$")
    message: str = Field(None, max_length=2000)
    
    @validator('name')
    def sanitize_name(cls, v):
        # Remove potentially dangerous characters
        return re.sub(r'[<>"\']', '', v)
    
    @validator('message')
    def sanitize_message(cls, v):
        if v:
            # Basic XSS prevention
            return re.sub(r'<script.*?>.*?</script>', '', v, flags=re.DOTALL)
        return v
```

### Frontend Validation

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/),
  message: z.string().max(2000).optional(),
});
```

---

## File Upload Security

```python
# Allowed file types
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.pdf'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

async def validate_upload(file: UploadFile):
    # Check extension
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, "File type not allowed")
    
    # Check file size
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(400, "File too large")
    
    # Verify file signature (magic bytes)
    import magic
    mime = magic.from_buffer(content, mime=True)
    if mime not in ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']:
        raise HTTPException(400, "Invalid file content")
    
    # Reset file pointer
    await file.seek(0)
    
    # Generate safe filename
    safe_filename = f"{uuid4()}{ext}"
    
    return safe_filename, content
```

---

## Rate Limiting

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

# Apply to sensitive endpoints
@router.post("/contacts")
@limiter.limit("10/minute")  # 10 submissions per minute
async def create_contact(...):
    ...

@router.post("/auth/login")
@limiter.limit("5/minute")  # 5 login attempts per minute
async def login(...):
    ...
```

---

## CORS Configuration

```python
from fastapi.middleware.cors import CORSMiddleware

# Production settings
CORS_ORIGINS = [
    "https://arteparquet.pro",
    "https://www.arteparquet.pro",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=86400,  # Cache preflight for 24 hours
)
```

---

## Database Security

### Connection Security

```python
# Use SSL for database connections
DATABASE_URL = "postgresql://user:pass@host:5432/db?sslmode=require"
```

### Query Safety

```python
# Always use ORM or parameterized queries
from sqlalchemy import select

# ✅ Safe
result = await session.execute(
    select(User).where(User.id == user_id)
)

# ✅ Safe with raw SQL
result = await session.execute(
    text("SELECT * FROM users WHERE id = :id"),
    {"id": user_id}
)
```

---

## Secrets Management

### Environment Variables

```bash
# .env (never commit)
DATABASE_URL=postgresql://...
JWT_SECRET_KEY=your-256-bit-secret
SMTP_PASSWORD=...
```

### Secret Generation

```python
import secrets

# Generate secure secrets
JWT_SECRET = secrets.token_urlsafe(32)  # 256 bits
```

### Production Secrets

Use secure secret management:
- EasyPanel secrets
- Docker secrets
- Vault (for larger deployments)

---

## Security Monitoring

### Logging Events

| Event | Log Level | Action |
|-------|-----------|--------|
| Failed login | WARNING | Monitor for brute force |
| Successful login | INFO | Audit trail |
| Permission denied | WARNING | Access attempt tracking |
| Input validation failure | INFO | Potential attack detection |
| Rate limit exceeded | WARNING | Possible DoS |
| File upload rejected | WARNING | Malicious upload attempt |

### Alerting

Set up alerts for:
- Multiple failed logins from same IP
- Unusual traffic patterns
- Error rate spikes
- New admin user creation

---

## Security Checklist

### Pre-Launch

- [ ] All secrets in environment variables
- [ ] Debug mode disabled
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] CORS properly restricted
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] File upload restrictions in place
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] Authentication tested
- [ ] Authorization tested
- [ ] Dependency audit clean
- [ ] Error messages sanitized
- [ ] Logging configured

### Ongoing

- [ ] Weekly dependency updates
- [ ] Monthly security review
- [ ] Quarterly penetration testing
- [ ] Log monitoring active
- [ ] Backup verification
- [ ] Incident response plan ready
