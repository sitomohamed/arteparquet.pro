# Testing

## Arteparquet Testing Strategy

### Overview

This document outlines the testing strategy for both frontend and backend applications to ensure quality, reliability, and confidence in deployments.

---

## Testing Philosophy

1. **Test behavior, not implementation**
2. **Focus on critical paths**
3. **Fast feedback loops**
4. **Meaningful coverage over high coverage**

---

## Frontend Testing

### Testing Stack

| Tool | Purpose |
|------|---------|
| Vitest | Unit testing |
| React Testing Library | Component testing |
| Playwright | E2E testing |
| MSW | API mocking |

### Test Types & Coverage Goals

| Type | Coverage | Focus |
|------|----------|-------|
| Unit | 70%+ | Utilities, hooks |
| Component | 60%+ | UI components |
| Integration | Key flows | Form submissions |
| E2E | Critical paths | User journeys |

### Unit Tests

```typescript
// lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatPhone, cn } from './utils';

describe('formatPhone', () => {
  it('formats Italian phone numbers', () => {
    expect(formatPhone('3331234567')).toBe('+39 333 123 4567');
  });
  
  it('handles numbers with country code', () => {
    expect(formatPhone('+393331234567')).toBe('+39 333 123 4567');
  });
});

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });
  
  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', true && 'visible')).toBe('base visible');
  });
});
```

### Component Tests

```typescript
// components/ui/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
  
  it('applies variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Form Tests

```typescript
// components/forms/contact-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  it('validates required fields', async () => {
    render(<ContactForm />);
    
    // Try to submit empty form
    await userEvent.click(screen.getByRole('button', { name: /continua/i }));
    
    expect(screen.getByText(/campo obbligatorio/i)).toBeInTheDocument();
  });
  
  it('progresses through steps', async () => {
    render(<ContactForm />);
    
    // Step 1: Select project type
    await userEvent.click(screen.getByLabelText(/nuova installazione/i));
    await userEvent.click(screen.getByRole('button', { name: /continua/i }));
    
    // Should be on step 2
    expect(screen.getByText(/parlaci di te/i)).toBeInTheDocument();
  });
  
  it('submits form data correctly', async () => {
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);
    
    // Fill out form...
    // ...
    
    await userEvent.click(screen.getByRole('button', { name: /invia/i }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Mario Rossi',
          email: 'mario@example.com',
        })
      );
    });
  });
});
```

### E2E Tests

```typescript
// e2e/contact-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Flow', () => {
  test('completes contact form successfully', async ({ page }) => {
    await page.goto('/contatti');
    
    // Step 1: Project type
    await page.getByLabel('Nuova installazione').click();
    await page.getByRole('button', { name: 'Continua' }).click();
    
    // Step 2: Client type
    await page.getByLabel('Privato').click();
    await page.getByRole('button', { name: 'Continua' }).click();
    
    // Step 3: Details
    await page.fill('[name="area"]', '100');
    await page.getByRole('button', { name: 'Continua' }).click();
    
    // Step 4: Contact info
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="phone"]', '+393331234567');
    
    await page.getByRole('button', { name: 'Invia Richiesta' }).click();
    
    // Verify success
    await expect(page.getByText('Grazie')).toBeVisible();
  });
  
  test('shows validation errors for invalid input', async ({ page }) => {
    await page.goto('/contatti');
    
    // Try to proceed without selecting
    await page.getByRole('button', { name: 'Continua' }).click();
    
    await expect(page.getByText('Seleziona un\'opzione')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('navigates to all main pages', async ({ page }) => {
    await page.goto('/');
    
    // Check hero loads
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Navigate to services
    await page.click('text=Servizi');
    await expect(page).toHaveURL(/servizi/);
    
    // Navigate to portfolio
    await page.click('text=Portfolio');
    await expect(page).toHaveURL(/portfolio/);
    
    // Navigate to about
    await page.click('text=Chi Siamo');
    await expect(page).toHaveURL(/chi-siamo/);
  });
});
```

---

## Backend Testing

### Testing Stack

| Tool | Purpose |
|------|---------|
| pytest | Test framework |
| pytest-asyncio | Async test support |
| httpx | API testing |
| Factory Boy | Test data |

### Test Structure

```
tests/
├── conftest.py          # Fixtures
├── test_auth.py         # Auth tests
├── test_contacts.py     # Contact API tests
├── test_projects.py     # Project API tests
├── test_services.py     # Service tests
└── factories.py         # Test factories
```

### Fixtures

```python
# tests/conftest.py
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

from app.main import app
from app.db.session import get_session
from app.models.base import Base

@pytest.fixture
async def db_session():
    """Create test database session."""
    engine = create_async_engine(
        "postgresql+asyncpg://test:test@localhost:5432/test_db",
        echo=True
    )
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSession(engine) as session:
        yield session
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.fixture
async def client(db_session):
    """Create test client with database override."""
    async def override_get_session():
        yield db_session
    
    app.dependency_overrides[get_session] = override_get_session
    
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client
    
    app.dependency_overrides.clear()

@pytest.fixture
async def admin_token(client):
    """Get admin authentication token."""
    response = await client.post("/api/v1/auth/login", data={
        "username": "admin@arteparquet.pro",
        "password": "testpassword"
    })
    return response.json()["access_token"]
```

### API Tests

```python
# tests/test_contacts.py
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
class TestContactsAPI:
    
    async def test_create_contact(self, client: AsyncClient):
        """Test creating a new contact."""
        response = await client.post("/api/v1/contacts", json={
            "name": "Mario Rossi",
            "email": "mario@example.com",
            "phone": "+393331234567",
            "project_type": "installation",
            "client_type": "private",
        })
        
        assert response.status_code == 201
        data = response.json()
        assert data["id"] is not None
        assert data["message"] == "Richiesta ricevuta"
    
    async def test_create_contact_validation_error(self, client: AsyncClient):
        """Test validation errors for invalid data."""
        response = await client.post("/api/v1/contacts", json={
            "name": "M",  # Too short
            "email": "invalid-email",
            "phone": "123",  # Invalid format
            "project_type": "installation",
            "client_type": "private",
        })
        
        assert response.status_code == 422
    
    async def test_list_contacts_requires_auth(self, client: AsyncClient):
        """Test that listing contacts requires authentication."""
        response = await client.get("/api/v1/admin/contacts")
        
        assert response.status_code == 401
    
    async def test_list_contacts_as_admin(
        self, 
        client: AsyncClient, 
        admin_token: str
    ):
        """Test listing contacts as admin."""
        response = await client.get(
            "/api/v1/admin/contacts",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        assert "data" in response.json()
```

### Service Tests

```python
# tests/test_services.py
import pytest
from app.services.contact import ContactService
from app.schemas.contact import ContactCreate

@pytest.mark.asyncio
class TestContactService:
    
    async def test_create_contact(self, db_session):
        """Test contact creation service."""
        service = ContactService(db_session)
        
        contact_data = ContactCreate(
            name="Mario Rossi",
            email="mario@example.com",
            phone="+393331234567",
            project_type="installation",
            client_type="private",
        )
        
        contact = await service.create(contact_data)
        
        assert contact.id is not None
        assert contact.name == "Mario Rossi"
        assert contact.status == "new"
    
    async def test_update_contact_status(self, db_session):
        """Test updating contact status."""
        service = ContactService(db_session)
        
        # Create contact
        contact = await service.create(ContactCreate(...))
        
        # Update status
        updated = await service.update_status(
            contact.id, 
            status="contacted",
            notes="Called on Monday"
        )
        
        assert updated.status == "contacted"
        assert updated.notes == "Called on Monday"
```

---

## Testing Configuration

### Frontend (vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'tests/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Backend (pytest.ini)

```ini
[pytest]
asyncio_mode = auto
testpaths = tests
python_files = test_*.py
python_functions = test_*
addopts = -v --cov=app --cov-report=html
```

---

## CI Testing

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
        working-directory: frontend
      - run: npm test
        working-directory: frontend
  
  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r requirements.txt -r requirements-dev.txt
        working-directory: backend
      - run: pytest
        working-directory: backend
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test
  
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
        working-directory: frontend
      - run: npx playwright install
        working-directory: frontend
      - run: npm run test:e2e
        working-directory: frontend
```

---

## Testing Checklist

### Before Commit
- [ ] All unit tests pass
- [ ] New code has tests
- [ ] No console errors

### Before PR
- [ ] All tests pass locally
- [ ] Coverage maintained
- [ ] E2E tests for new features

### Before Deploy
- [ ] CI tests pass
- [ ] Manual smoke test
- [ ] Performance impact assessed
