# Code Style

## Arteparquet Code Style Guide

### Overview

This document defines code formatting and style conventions for consistent, readable code across the project.

---

## Tools & Configuration

### Formatters

| Tool | Purpose | Config File |
|------|---------|-------------|
| Prettier | Code formatting | `.prettierrc` |
| ESLint | Linting (TS/JS) | `eslint.config.js` |
| Black | Python formatting | `pyproject.toml` |
| Ruff | Python linting | `pyproject.toml` |

---

## Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## ESLint Configuration

```javascript
// eslint.config.js
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks,
      '@next/next': next,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // React
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },
];
```

---

## TypeScript Style

### Variable Declarations

```typescript
// ✅ Prefer const
const userName = 'Mario';

// ✅ Use let only when reassignment needed
let count = 0;
count++;

// ❌ Never use var
var oldStyle = 'bad';
```

### Functions

```typescript
// ✅ Arrow functions for components
const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

// ✅ Named functions for utilities
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '+39 $1 $2 $3');
}

// ✅ Async/await over .then()
const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};
```

### Imports

```typescript
// ✅ Group and order imports
// 1. React/framework
import { useState, useEffect } from 'react';
import Image from 'next/image';

// 2. External libraries
import { motion } from 'framer-motion';
import { z } from 'zod';

// 3. Internal modules
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 4. Types
import type { Service } from '@/types';

// 5. Styles
import styles from './component.module.css';
```

### Type Definitions

```typescript
// ✅ Interfaces for objects
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Types for unions
type Status = 'pending' | 'completed' | 'cancelled';

// ✅ Explicit return types
function getUser(id: string): User | null {
  // ...
}

// ✅ Generic types
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

---

## React/JSX Style

### Component Structure

```tsx
// ✅ Component file structure
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { CardProps } from './types';

interface CardProps {
  title: string;
  description: string;
}

export function Card({ title, description }: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggle = () => setIsExpanded(!isExpanded);
  
  return (
    <div className="rounded-lg p-6">
      <h3>{title}</h3>
      <p>{description}</p>
      <Button onClick={handleToggle}>
        {isExpanded ? 'Less' : 'More'}
      </Button>
    </div>
  );
}
```

### JSX Formatting

```tsx
// ✅ Single line for short elements
<Button onClick={handleClick}>Click Me</Button>

// ✅ Multi-line for complex elements
<Button
  variant="primary"
  size="lg"
  onClick={handleClick}
  disabled={isLoading}
>
  Submit Form
</Button>

// ✅ Conditional rendering
{isVisible && <Modal />}
{status === 'loading' ? <Spinner /> : <Content />}

// ✅ List rendering
{items.map(item => (
  <ListItem key={item.id} {...item} />
))}
```

### Props Destructuring

```tsx
// ✅ Destructure props
function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

// ✅ Rest props for DOM elements
function Input({ label, className, ...props }: InputProps) {
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}
```

---

## Tailwind CSS Style

### Class Organization

```tsx
// Order: Layout > Box Model > Typography > Visual > State > Responsive
<div
  className="
    flex items-center justify-between
    p-4 m-2
    text-lg font-medium
    bg-white rounded-lg shadow-md
    hover:shadow-lg
    md:p-6 lg:p-8
  "
/>
```

### Conditional Classes

```tsx
import { cn } from '@/lib/utils';

// ✅ Use cn() utility
<button
  className={cn(
    'px-4 py-2 rounded-lg font-medium',
    variant === 'primary' && 'bg-rovere text-white',
    variant === 'secondary' && 'border border-current',
    disabled && 'opacity-50 cursor-not-allowed'
  )}
/>
```

### Long Class Lists

```tsx
// ✅ Break into multiple lines
<section
  className="
    relative overflow-hidden
    bg-travertino
    py-20 md:py-32
    px-4 md:px-8 lg:px-12
  "
>
```

---

## Python Style

### Black Configuration

```toml
# pyproject.toml
[tool.black]
line-length = 88
target-version = ['py312']
include = '\.pyi?$'
```

### Ruff Configuration

```toml
# pyproject.toml
[tool.ruff]
line-length = 88
select = ["E", "F", "I", "N", "W"]
ignore = ["E501"]

[tool.ruff.isort]
known-first-party = ["app"]
```

### Python Formatting

```python
# ✅ Imports organized
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.schemas.contact import ContactCreate
from app.services.contact import ContactService


# ✅ Type hints everywhere
async def get_contact(
    contact_id: int,
    db: AsyncSession = Depends(get_db),
) -> Contact:
    """Get contact by ID."""
    service = ContactService(db)
    contact = await service.get_by_id(contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Not found")
    return contact


# ✅ Class formatting
class ContactService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, data: ContactCreate) -> Contact:
        """Create a new contact."""
        contact = Contact(**data.model_dump())
        self.db.add(contact)
        await self.db.commit()
        return contact
```

---

## Comments & Documentation

### When to Comment

```typescript
// ✅ Explain WHY, not WHAT
// Rate limit prevents spam submissions
const RATE_LIMIT = 5;

// ✅ Document non-obvious behavior
// Using eager loading because we always need related data
const contacts = await prisma.contact.findMany({
  include: { assignedUser: true },
});

// ❌ Don't state the obvious
// Increment counter
counter++;
```

### JSDoc for APIs

```typescript
/**
 * Formats a phone number to Italian format.
 *
 * @param phone - The raw phone number
 * @returns Formatted phone with +39 prefix
 * @example
 * formatPhone('3331234567') // '+39 333 123 4567'
 */
export function formatPhone(phone: string): string {
  // ...
}
```

---

## File Organization

### One Component Per File

```
components/
├── button.tsx           # One component
├── button.test.tsx      # Its tests
├── card.tsx             # Another component
└── card.test.tsx        # Its tests
```

### Index Files

```typescript
// components/ui/index.ts
export { Button } from './button';
export { Card } from './card';
export { Input } from './input';
```

---

## Git Hooks

### Pre-Commit

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### Husky Setup

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

---

## Editor Settings

### VS Code Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

### Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Hero
