from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import logging

# Configure logging for security events
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
security_logger = logging.getLogger('security')

# Application configuration
APP_ENV = os.getenv("APP_ENV", "production")
APP_DEBUG = os.getenv("APP_DEBUG", "false").lower() == "true"

# SECURITY: Never enable debug mode in production
if APP_ENV == "production" and APP_DEBUG:
    raise RuntimeError("CRITICAL: APP_DEBUG must be false in production environment")

app = FastAPI(
    title="Arteparquet API",
    # SECURITY: Disable OpenAPI docs in production
    docs_url="/docs" if APP_DEBUG else None,
    redoc_url="/redoc" if APP_DEBUG else None,
    openapi_url="/openapi.json" if APP_DEBUG else None,
)

# SECURITY: Strict CORS configuration
# Never fall back to wildcard origins
cors_origins_raw = os.getenv("CORS_ORIGINS", "")
if not cors_origins_raw or cors_origins_raw.strip() == "":
    # SECURITY: In production, require explicit CORS origins
    if APP_ENV == "production":
        raise RuntimeError("CRITICAL: CORS_ORIGINS must be configured in production")
    # Development fallback - localhost only
    origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
else:
    origins = [origin.strip() for origin in cors_origins_raw.split(",") if origin.strip()]
    # SECURITY: Reject wildcard in origins list
    if "*" in origins:
        raise RuntimeError("CRITICAL: Wildcard (*) is not allowed in CORS_ORIGINS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    # SECURITY: Restrict allowed methods to what's actually needed
    allow_methods=["GET", "POST", "OPTIONS"],
    # SECURITY: Restrict headers to essential ones
    allow_headers=["Content-Type", "Authorization", "X-CSRF-Token", "Accept"],
    # SECURITY: Don't expose internal headers
    expose_headers=["X-Request-ID"],
    max_age=600,  # Cache preflight for 10 minutes
)


# SECURITY: Global exception handler to prevent information leakage
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log the actual error for debugging (server-side only)
    security_logger.error(
        f"Unhandled exception: {type(exc).__name__}",
        extra={
            "path": request.url.path,
            "method": request.method,
            "client_ip": request.client.host if request.client else "unknown",
        },
        exc_info=True if APP_DEBUG else False
    )
    
    # SECURITY: Return generic error message to client
    return JSONResponse(
        status_code=500,
        content={"error": "Si è verificato un errore interno. Riprova più tardi."},
        headers={
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
        }
    )


# SECURITY: Add security headers middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    
    # Security headers for all responses
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, private"
    response.headers["Pragma"] = "no-cache"
    
    # HSTS for HTTPS connections
    if request.url.scheme == "https":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    
    return response


@app.get("/")
def read_root():
    """Health check endpoint"""
    return {"status": "ok", "service": "Arteparquet API"}


@app.get("/health")
def health_check():
    """
    Health check endpoint for monitoring.
    SECURITY: Does not expose sensitive information.
    """
    return {
        "status": "healthy",
        "environment": APP_ENV,
    }
