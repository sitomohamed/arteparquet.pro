# Authentication

## Arteparquet Authentication System

### Overview

The authentication system uses JWT (JSON Web Tokens) for secure, stateless authentication. It supports role-based access control (RBAC) for administrative functions.

---

## Authentication Flow

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│    Client    │────────▶│   Backend    │────────▶│   Database   │
│              │         │              │         │              │
└──────────────┘         └──────────────┘         └──────────────┘
       │                        │                        │
       │  1. POST /auth/login   │                        │
       │  {email, password}     │                        │
       │───────────────────────▶│                        │
       │                        │  2. Verify credentials │
       │                        │───────────────────────▶│
       │                        │                        │
       │                        │  3. User data          │
       │                        │◀───────────────────────│
       │                        │                        │
       │  4. {access_token,     │                        │
       │      refresh_token}    │                        │
       │◀───────────────────────│                        │
       │                        │                        │
       │  5. Request with       │                        │
       │  Authorization header  │                        │
       │───────────────────────▶│                        │
       │                        │  6. Validate JWT       │
       │                        │  7. Check permissions  │
       │                        │                        │
       │  8. Protected resource │                        │
       │◀───────────────────────│                        │
```

---

## JWT Configuration

### Token Structure

**Access Token:**
```json
{
  "sub": "1",
  "email": "admin@arteparquet.pro",
  "role": "admin",
  "iat": 1704067200,
  "exp": 1704069000,
  "type": "access"
}
```

**Refresh Token:**
```json
{
  "sub": "1",
  "iat": 1704067200,
  "exp": 1704672000,
  "type": "refresh"
}
```

### Configuration

```python
# app/config.py
JWT_SECRET_KEY = "your-256-bit-secret-key"
JWT_ALGORITHM = "HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 30
JWT_REFRESH_TOKEN_EXPIRE_DAYS = 7
```

---

## Implementation

### Security Module

```python
# app/core/security.py
from datetime import datetime, timedelta
from typing import Optional, Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

from app.config import get_settings

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class TokenPayload(BaseModel):
    sub: str
    email: Optional[str] = None
    role: Optional[str] = None
    type: str
    exp: datetime

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Generate password hash."""
    return pwd_context.hash(password)

def create_access_token(
    subject: Union[str, int],
    email: str,
    role: str,
    expires_delta: Optional[timedelta] = None
) -> str:
    """Create JWT access token."""
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.jwt_access_token_expire_minutes)
    )
    
    payload = {
        "sub": str(subject),
        "email": email,
        "role": role,
        "type": "access",
        "exp": expire,
        "iat": datetime.utcnow(),
    }
    
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)

def create_refresh_token(
    subject: Union[str, int],
    expires_delta: Optional[timedelta] = None
) -> str:
    """Create JWT refresh token."""
    expire = datetime.utcnow() + (
        expires_delta or timedelta(days=settings.jwt_refresh_token_expire_days)
    )
    
    payload = {
        "sub": str(subject),
        "type": "refresh",
        "exp": expire,
        "iat": datetime.utcnow(),
    }
    
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)

def verify_token(token: str, token_type: str = "access") -> Optional[TokenPayload]:
    """Verify and decode JWT token."""
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm]
        )
        
        if payload.get("type") != token_type:
            return None
            
        return TokenPayload(**payload)
        
    except JWTError:
        return None
```

### Authentication Endpoints

```python
# app/api/v1/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.core.security import (
    verify_password,
    create_access_token,
    create_refresh_token,
    verify_token,
)
from app.schemas.auth import Token, TokenRefresh
from app.services.user import UserService

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    """
    OAuth2 compatible login endpoint.
    Returns access and refresh tokens.
    """
    user_service = UserService(db)
    user = await user_service.get_by_email(form_data.username)
    
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is disabled",
        )
    
    # Update last login
    await user_service.update_last_login(user.id)
    
    return Token(
        access_token=create_access_token(user.id, user.email, user.role),
        refresh_token=create_refresh_token(user.id),
        token_type="bearer",
        expires_in=settings.jwt_access_token_expire_minutes * 60,
    )

@router.post("/refresh", response_model=Token)
async def refresh_token(
    token_data: TokenRefresh,
    db: AsyncSession = Depends(get_db),
):
    """
    Refresh access token using refresh token.
    """
    payload = verify_token(token_data.refresh_token, token_type="refresh")
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )
    
    user_service = UserService(db)
    user = await user_service.get_by_id(int(payload.sub))
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
        )
    
    return Token(
        access_token=create_access_token(user.id, user.email, user.role),
        refresh_token=create_refresh_token(user.id),
        token_type="bearer",
        expires_in=settings.jwt_access_token_expire_minutes * 60,
    )

@router.post("/logout")
async def logout():
    """
    Logout endpoint.
    Note: JWT is stateless, so we just return success.
    Client should discard the tokens.
    """
    return {"message": "Successfully logged out"}
```

### Dependency Injection

```python
# app/api/deps.py
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.core.security import verify_token
from app.models.user import User
from app.services.user import UserService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

async def get_db() -> AsyncSession:
    async with get_session() as session:
        yield session

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    """Get current authenticated user."""
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = verify_token(token)
    if not payload:
        raise credentials_exception
    
    user_service = UserService(db)
    user = await user_service.get_by_id(int(payload.sub))
    
    if not user:
        raise credentials_exception
        
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is disabled",
        )
    
    return user

async def get_current_admin(
    current_user: User = Depends(get_current_user),
) -> User:
    """Require admin role."""
    
    if current_user.role not in ["admin", "superadmin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    return current_user

async def get_current_superadmin(
    current_user: User = Depends(get_current_user),
) -> User:
    """Require superadmin role."""
    
    if current_user.role != "superadmin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Superadmin access required",
        )
    
    return current_user
```

---

## Role-Based Access Control (RBAC)

### Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `superadmin` | Full access | All operations |
| `admin` | Standard admin | CRUD on content, view contacts |
| `editor` | Content editor | Create/edit content, no delete |

### Permission Matrix

| Resource | superadmin | admin | editor | public |
|----------|------------|-------|--------|--------|
| View projects | ✅ | ✅ | ✅ | ✅ |
| Create project | ✅ | ✅ | ✅ | ❌ |
| Edit project | ✅ | ✅ | ✅ | ❌ |
| Delete project | ✅ | ✅ | ❌ | ❌ |
| View contacts | ✅ | ✅ | ❌ | ❌ |
| Update contact | ✅ | ✅ | ❌ | ❌ |
| Delete contact | ✅ | ❌ | ❌ | ❌ |
| Manage users | ✅ | ❌ | ❌ | ❌ |
| System settings | ✅ | ❌ | ❌ | ❌ |

---

## Password Security

### Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Validation Schema

```python
# app/schemas/auth.py
from pydantic import BaseModel, Field, validator
import re

class PasswordChange(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=8)
    
    @validator('new_password')
    def validate_password(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain lowercase letter')
        if not re.search(r'[0-9]', v):
            raise ValueError('Password must contain number')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain special character')
        return v
```

---

## Security Headers

### Response Headers

```python
# app/core/middleware.py
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        
        return response
```

---

## Token Storage (Frontend)

### Recommended Approach

```typescript
// Store tokens securely
const storeTokens = (accessToken: string, refreshToken: string) => {
  // Access token in memory (not localStorage)
  sessionStorage.setItem('access_token', accessToken);
  
  // Refresh token in httpOnly cookie (set by backend)
  // Or secure localStorage with encryption
};

// Auto-refresh before expiration
const scheduleRefresh = (expiresIn: number) => {
  const refreshTime = (expiresIn - 60) * 1000; // 1 minute before expiry
  setTimeout(refreshAccessToken, refreshTime);
};
```

---

## Brute Force Protection

### Rate Limiting

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.post("/login")
@limiter.limit("5/minute")
async def login(...):
    ...
```

### Account Lockout

```python
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_DURATION_MINUTES = 15

async def check_login_attempts(email: str, db: AsyncSession):
    # Check failed attempts in last 15 minutes
    # Lock account if exceeded
    pass
```
