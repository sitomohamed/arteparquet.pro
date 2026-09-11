#!/bin/sh
set -e

# Run migrations only when revision files exist (empty alembic/versions would crash deploy)
if [ -d "alembic/versions" ] && [ "$(ls -A alembic/versions 2>/dev/null)" ]; then
  alembic upgrade head
fi

exec uvicorn app.main:app --host 0.0.0.0 --port 8000
