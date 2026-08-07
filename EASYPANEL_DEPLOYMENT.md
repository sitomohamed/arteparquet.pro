# EasyPanel Deployment Guide

This repository contains the full source code for the Arteparquet website. It is pre-configured with Dockerfiles for both frontend and backend to make it easy to deploy using EasyPanel.

## 1. Prerequisites

- Make sure you push this code to a GitHub repository (e.g., `arteparquet/arteparquet.pro`).
- Connect your GitHub account in EasyPanel so it can pull the repository.

## 2. Database Setup in EasyPanel

1. In EasyPanel, go to your project.
2. Click **Add Service** -> **PostgreSQL**.
3. Set the following configuration:
   - Name: `arteparquet_database`
   - User: `arteparquet`
   - Password: `arteparquet`
   - Database Name: `arteparquet`
4. Click **Create**.
5. Once created, EasyPanel will generate an internal database link. It will look like this:
   `postgres://arteparquet:arteparquet@arteparquet_database:5432/arteparquet?sslmode=disable`
   *(Note: For SQLAlchemy in Python, `postgres://` might need to be translated to `postgresql://` which the backend `alembic/env.py` handles automatically, so you can paste it exactly as provided!)*

## 3. Backend Setup

1. In EasyPanel, click **Add Service** -> **App**.
2. Name it: `arteparquet-backend`
3. Click **Create**.
4. Go to the **Source** tab:
   - Select **GitHub**.
   - Repository: select your repository (e.g., `arteparquet/arteparquet.pro`).
   - Branch: `main` (or `master`).
   - **Root Directory**: `backend` (important!)
5. Go to the **Build** tab:
   - Select **Dockerfile**.
   - Dockerfile Name: `Dockerfile`
6. Go to the **Environment** tab and add the following variables:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_SECRET_KEY=generate_a_random_secure_string_here
   
   # Use the internal database URL provided by EasyPanel
   DATABASE_URL=postgresql://arteparquet:arteparquet@arteparquet_database:5432/arteparquet?sslmode=disable
   
   # JWT Configuration
   JWT_SECRET_KEY=generate_a_random_secure_string_here
   JWT_ALGORITHM=HS256
   JWT_ACCESS_TOKEN_EXPIRE_MINUTES=1440
   
   # Important for allowing frontend to talk to backend
   CORS_ORIGINS=https://arteparquet.pro,https://www.arteparquet.pro
   ```
7. Go to the **Domains** tab:
   - Add domain: `api.arteparquet.pro`
   - Enable SSL (Let's Encrypt).
   - *Ensure your DNS is pointed to the server IP before doing this!*
8. Click **Deploy**.
   *Note: The `Dockerfile` is configured to run database migrations automatically on startup (`alembic upgrade head`).*

## 4. Frontend Setup

1. In EasyPanel, click **Add Service** -> **App**.
2. Name it: `arteparquet-frontend`
3. Click **Create**.
4. Go to the **Source** tab:
   - Select **GitHub**.
   - Repository: select your repository.
   - Branch: `main`
   - **Root Directory**: `frontend` (important!)
5. Go to the **Build** tab:
   - Select **Dockerfile**.
   - Dockerfile Name: `Dockerfile`
6. Go to the **Environment** tab and add:
   ```env
   NEXT_PUBLIC_API_URL=https://api.arteparquet.pro
   NEXT_PUBLIC_SITE_URL=https://arteparquet.pro
   NEXT_PUBLIC_PHONE=+393892407827
   NEXT_PUBLIC_WHATSAPP=393892407827
   NEXT_PUBLIC_EMAIL=info@arteparquet.pro
   ```
7. Go to the **Domains** tab:
   - Add domain: `arteparquet.pro`
   - Add domain: `www.arteparquet.pro`
   - Enable SSL (Let's Encrypt).
8. Click **Deploy**.

## 5. Connecting GitHub (Automated Deployments)

To make EasyPanel deploy automatically when you push to GitHub:
1. In both the Frontend and Backend apps in EasyPanel, go to the **Source** tab.
2. Ensure you have selected GitHub as the source.
3. Check the option for "Auto Deploy" if available, or copy the Webhook URL.
4. If using Webhook, go to your GitHub repository -> Settings -> Webhooks -> Add webhook, and paste the EasyPanel URL. Select "Just the push event". 
5. Now, every `git push origin main` will automatically rebuild and deploy the respective service!
