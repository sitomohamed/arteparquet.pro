# ══════════════════════════════════════════════════════════════════════════════
# ARTEPARQUET BACKEND - Security-Hardened Dockerfile
# ══════════════════════════════════════════════════════════════════════════════
FROM python:3.12-slim AS base

# SECURITY: Set Python to not write bytecode and not buffer stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# SECURITY: Update system packages and install only necessary dependencies
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
        libpq5 \
        libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# ══════════════════════════════════════════════════════════════════════════════
# Dependencies stage
# ══════════════════════════════════════════════════════════════════════════════
FROM base AS deps

WORKDIR /app

# Install dependencies first (better caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ══════════════════════════════════════════════════════════════════════════════
# Final stage
# ══════════════════════════════════════════════════════════════════════════════
FROM base AS runner

WORKDIR /app

# SECURITY: Create non-root user with specific UID/GID
RUN groupadd --gid 1001 appgroup && \
    useradd --uid 1001 --gid appgroup --shell /bin/false --create-home appuser

# Copy dependencies from deps stage
COPY --from=deps /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin

# Copy application code
COPY --chown=appuser:appgroup . .

# SECURITY: Ensure start script is executable but owned by appuser
RUN chmod +x start.sh && \
    # SECURITY: Remove unnecessary files
    rm -rf .git .gitignore *.md __pycache__ .pytest_cache .mypy_cache

# SECURITY: Switch to non-root user
USER appuser

# SECURITY: Expose only the necessary port
EXPOSE 8000

# SECURITY: Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

CMD ["./start.sh"]
