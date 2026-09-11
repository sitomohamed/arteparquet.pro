# Coding Standards

## Arteparquet Development Standards

### Overview

This document defines coding standards for both frontend and backend development to ensure consistency, maintainability, and quality.

---

## General Principles

1. **Readability over cleverness**
2. **Explicit over implicit**
3. **DRY but not prematurely**
4. **Test critical paths**
5. **Document non-obvious decisions**

---

## TypeScript/JavaScript Standards

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `userName` |
| Functions | camelCase | `handleSubmit` |
| Components | PascalCase | `ServiceCard` |
| Constants | SCREAMING_SNAKE | `API_URL` |
| Types/Interfaces | PascalCase | `ContactFormData` |
| Files (components) | kebab-case | `service-card.tsx` |
| Files (utilities) | camelCase | `useScroll.ts` |

### Type Definitions

```typescript
// ✅ Prefer interfaces for objects
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Use type for unions and intersections
type Status = 'pending' | 'completed' | 'cancelled';
type UserWithRole = User & { role: Role };

// ✅ Export types from dedicated files
// types/contact.ts
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: ProjectType;
}
```

### Function Patterns

```typescript
// ✅ Prefer arrow functions for components
const ServiceCard = ({ title, description }: ServiceCardProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

// ✅ Named functions for utilities (better stack traces)
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '+39 $1 $2 $3');
}

// ✅ Explicit return types for public APIs
export function calculatePrice(area: number, pricePerSqm: number): number {
  return area * pricePerSqm;
}
```

### Import Organization

```typescript
// 1. React/Next imports
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

// 3. Internal components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 4. Internal utilities/hooks
import { cn } from '@/lib/utils';
import { useScroll } from '@/hooks/use-scroll';

// 5. Types
import type { ContactFormData } from '@/types';

// 6. Styles (if any)
import styles from './component.module.css';
```

---

## React/Next.js Standards

### Component Structure

```tsx
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ServiceCardProps } from './types';

// 2. Types (if component-specific)
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

// 3. Component
export function ServiceCard({ 
  title, 
  description, 
  icon, 
  href 
}: ServiceCardProps) {
  // Hooks first
  const [isHovered, setIsHovered] = useState(false);
  
  // Derived state
  const cardClasses = cn(
    'rounded-lg p-6',
    isHovered && 'shadow-lg'
  );
  
  // Handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Render
  return (
    <div 
      className={cardClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
      <Button asChild>
        <Link href={href}>Scopri di più</Link>
      </Button>
    </div>
  );
}
```

### Server vs Client Components

```tsx
// Server Component (default) - no directive needed
async function PortfolioPage() {
  const projects = await fetchProjects();
  return <ProjectGrid projects={projects} />;
}

// Client Component - needs directive
'use client';

import { useState } from 'react';

function ContactForm() {
  const [step, setStep] = useState(1);
  // ...
}
```

### Props Patterns

```tsx
// ✅ Destructure props
function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

// ✅ Use children for composition
function Card({ children, className }: CardProps) {
  return <div className={cn('card', className)}>{children}</div>;
}

// ✅ Forward refs when needed
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn('input', className)} {...props} />;
  }
);
Input.displayName = 'Input';
```

---

## Python/FastAPI Standards

### Code Style

Follow PEP 8 with these specifics:
- Line length: 88 characters (Black default)
- Use type hints everywhere
- Use docstrings for public functions

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables | snake_case | `user_name` |
| Functions | snake_case | `get_user_by_id` |
| Classes | PascalCase | `ContactService` |
| Constants | SCREAMING_SNAKE | `MAX_FILE_SIZE` |
| Private | _prefix | `_internal_method` |
| Modules | snake_case | `contact_service.py` |

### Type Hints

```python
from typing import Optional, List
from pydantic import BaseModel

# ✅ Always use type hints
def get_user_by_id(user_id: int) -> Optional[User]:
    ...

# ✅ Use Pydantic for data validation
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    project_type: ProjectType

# ✅ Return types for all public functions
async def create_contact(
    db: AsyncSession, 
    contact: ContactCreate
) -> Contact:
    ...
```

### API Endpoint Structure

```python
@router.post("/contacts", response_model=ContactResponse, status_code=201)
async def create_contact(
    contact: ContactCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
) -> Contact:
    """
    Create a new contact/quote request.
    
    - **name**: Contact's full name
    - **email**: Valid email address
    - **phone**: Phone number with country code
    - **project_type**: Type of project (installation, restoration, etc.)
    """
    service = ContactService(db)
    result = await service.create(contact)
    
    background_tasks.add_task(send_notification_email, contact)
    
    return result
```

### Error Handling

```python
from fastapi import HTTPException, status

# ✅ Use HTTPException with appropriate status codes
async def get_contact(contact_id: int) -> Contact:
    contact = await service.get_by_id(contact_id)
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    return contact

# ✅ Create custom exceptions for domain errors
class ContactNotFoundError(Exception):
    pass

class ValidationError(Exception):
    def __init__(self, field: str, message: str):
        self.field = field
        self.message = message
```

---

## CSS/Tailwind Standards

### Class Organization

```tsx
// Order: Layout > Box > Typography > Visual > States > Responsive
<div className="
  flex items-center justify-between
  p-4 rounded-lg
  text-lg font-medium
  bg-white shadow-md
  hover:shadow-lg
  md:p-6 lg:p-8
">
```

### Custom Classes

```tsx
// ✅ Use cn() for conditional classes
import { cn } from '@/lib/utils';

<button
  className={cn(
    'px-4 py-2 rounded-lg font-medium transition',
    variant === 'primary' && 'bg-rovere text-white',
    variant === 'secondary' && 'border border-legno-bruciato',
    disabled && 'opacity-50 cursor-not-allowed'
  )}
/>
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      // Use design system tokens
      colors: {
        travertino: '#F9F8F6',
        'legno-bruciato': '#1A1A1A',
        rovere: '#C89B7B',
        'nero-marquina': '#0A0A0A',
      },
    },
  },
};
```

---

## Git Standards

### Branch Naming

```
feature/add-contact-form
fix/form-validation-error
refactor/service-card-component
chore/update-dependencies
docs/api-documentation
```

### Commit Messages

```
feat: add multi-step contact form
fix: resolve form validation on mobile
refactor: extract form step components
chore: update Next.js to 15.1
docs: add API endpoint documentation
test: add contact form unit tests
```

### Commit Structure

```
<type>: <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`

---

## Documentation Standards

### Code Comments

```typescript
// ✅ Explain WHY, not WHAT
// Rate limit to prevent spam submissions
const RATE_LIMIT = 5;

// ✅ Document non-obvious decisions
// Using eager loading here because we always need user data with contacts
const contacts = await prisma.contact.findMany({
  include: { assignedUser: true }
});

// ❌ Don't state the obvious
// Increment counter
counter++;
```

### JSDoc for Public APIs

```typescript
/**
 * Formats a phone number to Italian format.
 * 
 * @param phone - The phone number to format
 * @returns The formatted phone number with +39 prefix
 * @example
 * formatPhone('3331234567') // '+39 333 123 4567'
 */
export function formatPhone(phone: string): string {
  // ...
}
```

---

## Error Handling

### Frontend

```typescript
// ✅ Use try-catch for async operations
async function handleSubmit(data: FormData) {
  try {
    await submitContact(data);
    toast.success('Richiesta inviata con successo');
  } catch (error) {
    if (error instanceof ValidationError) {
      setErrors(error.errors);
    } else {
      toast.error('Si è verificato un errore. Riprova.');
      console.error('Contact submission failed:', error);
    }
  }
}

// ✅ Use Error Boundaries for component errors
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="error-container">
      <h2>Qualcosa è andato storto</h2>
      <Button onClick={() => window.location.reload()}>
        Riprova
      </Button>
    </div>
  );
}
```

### Backend

```python
# ✅ Centralized error handling
@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": exc.message,
                "field": exc.field
            }
        }
    )
```

---

## Security Standards

### Frontend

```typescript
// ✅ Sanitize user input before display
import DOMPurify from 'dompurify';
const sanitizedHtml = DOMPurify.sanitize(userContent);

// ✅ Use environment variables for secrets
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ❌ Never expose secrets in client code
const secretKey = process.env.SECRET_KEY; // WRONG if client-side
```

### Backend

```python
# ✅ Use parameterized queries (SQLAlchemy does this)
user = await session.execute(
    select(User).where(User.email == email)
)

# ✅ Validate and sanitize all input
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    
    @validator('name')
    def sanitize_name(cls, v):
        return re.sub(r'[<>"\']', '', v)
```
