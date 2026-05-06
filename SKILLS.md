# dep0x Project Skills & Development Journey

> This document tracks all questions, solutions, and development processes for the dep0x project. Updated continuously as new features and processes are added.

---

## Project Overview

**Project Name:** dep0x  
**Type:** Next.js Frontend with Convex Backend  
**Current Version:** 0.1.0  
**Status:** Active Development  
**Stack:** Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind CSS, shadcn/ui, Zod, react-hook-form, Convex

---

## Phase 1: Project Initialization & Setup

### 1.1 Create Next.js Project

**Problem:** Need to set up a new Next.js project  
**Solution:**
```bash
pnpm create next-app@latest
# Project name: dep0x
# Accepts all defaults during setup
cd dep0x
pnpm run dev
```

**Key Files Generated:**
- `app/layout.tsx` - Root layout component wrapping all pages
- `app/page.tsx` - Home page component
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration
- `package.json` - Dependencies and scripts

**Test:** Open http://localhost:3000 in browser

---

### 1.2 Git Repository Setup

**Problem:** Need version control for the project  
**Solution:**
```bash
git init
git add .
git commit -m "INITAL COMMIT"
git remote add origin https://github.com/zen2see/dep0x.git
git branch  # Verify main branch
git push -u origin main
```

**Commits Made:**
1. `d3da1d1` - Initial commit from Create Next App
2. `996f2d5` - INITAL COMMIT (manual setup)

---

## Phase 2: Routing & Layout Structure

### 2.1 Understanding Next.js Layout System

**Problem:** Need to understand how Next.js routing and layouts work  
**Solution:**

The `layout.tsx` file wraps everything. Children are the routes. Add content in `app/layout.tsx` and it appears on all child pages.

**Example Root Layout:**
```typescript
// app/layout.tsx
export default function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {/* Navigation or shared components here */}
        {children}
      </body>
    </html>
  );
}
```

### 2.2 Creating Routes

**Problem:** Need to create multiple pages/routes  
**Solution:**

To create a route, create a folder under `app/` and add a `page.tsx` file inside it.

**Example:**
```
app/
├── page.tsx           # localhost:3000/
├── abc/
│   └── page.tsx       # localhost:3000/abc
└── abc/helloabc/
    └── page.tsx       # localhost:3000/abc/helloabc
```

```typescript
// app/abc/page.tsx
export default function AbcPage() {
    return (
        <div>
            <h1>Hello from the Abc page</h1>
        </div>
    )
}
```

**Commit:** `0ab9a29` - UPDATED ADDED ROUTING

---

### 2.3 Creating Shared Layouts

**Problem:** Need to apply layout to specific route groups  
**Solution:**

Create a `(shared-layout)` folder (parentheses prevent URL segment creation) with its own `layout.tsx` and `page.tsx`.

**Structure:**
```
app/
├── (shared-layout)/
│   ├── layout.tsx     # Wraps only children in this folder
│   └── page.tsx       # localhost:3000/
└── auth/
    ├── layout.tsx
    └── sign-up/
        └── page.tsx   # localhost:3000/auth/sign-up
```

---

## Phase 3: UI Component Library (shadcn/ui)

### 3.1 Initialize shadcn/ui

**Problem:** Need UI components for the application  
**Solution:**

```bash
# May encounter TLS certificate issues in corporate environments
# Solution: Use insecure mode or set environment variables
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest init
```

This creates:
- `components/ui/` - UI component directory
- `components.json` - shadcn configuration
- `lib/utils.ts` - Utility functions

**Commit:** `ee6f0bd` - UPDATED ADDED SHADCN NOVA

### 3.2 Add shadcn/ui Components

**Problem:** Need individual UI components  
**Solution:**

Add components one by one:
```bash
# Use NODE_TLS_REJECT_UNAUTHORIZED=0 if needed
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add button
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add card
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add dropdown-menu
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add field
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add input
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add separator
```

**Components Added:**
- `components/ui/button.tsx` - Button component
- `components/ui/card.tsx` - Card component
- `components/ui/dropdown-menu.tsx` - Dropdown menu
- `components/ui/field.tsx` - Form field wrapper
- `components/ui/input.tsx` - Input field
- `components/ui/label.tsx` - Label component
- `components/ui/separator.tsx` - Visual separator

---

## Phase 4: Theme & Dark Mode

### 4.1 Install next-themes

**Problem:** Need dark mode support in the application  
**Solution:**

```bash
pnpm add next-themes
```

**Dependencies Added:**
- `next-themes` - Dark mode provider and hooks

### 4.2 Create Theme Provider

**Problem:** Need to configure theme provider for the app  
**Solution:**

Create a client component that wraps the app with theme provider:

```typescript
// components/ui/theme-provider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
```

Add to root layout:
```typescript
// app/layout.tsx
import { ThemeProvider } from "@/components/ui/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 4.3 Create Theme Toggle

**Problem:** Need UI button to switch between light/dark themes  
**Solution:**

```typescript
// components/web/theme-toggle.tsx
'use client'

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

**Commits:**
- `c94b5c5` - UPDATED them-toggle
- `12e678a` - ADDED THEME

---

## Phase 5: Navigation & Web Components

### 5.1 Create Navigation Bar

**Problem:** Need a persistent navigation header  
**Solution:**

```typescript
// components/web/navbar.tsx
'use client'

import { ThemeToggle } from "./theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">dep0x</h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Home</DropdownMenuItem>
              <DropdownMenuItem>Sign Up</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
```

---

## Phase 6: Form Handling & Validation

### 6.1 Install Form Dependencies

**Problem:** Need form handling with validation  
**Solution:**

```bash
pnpm add zod
pnpm add react-hook-form
pnpm add @hookform/resolvers
```

**Dependencies Added:**
- `zod` - TypeScript schema validation
- `react-hook-form` - Performant form handling
- `@hookform/resolvers` - Schema resolvers for form libraries

### 6.2 Create Sign-Up Page with Form

**Problem:** Need a sign-up page with form validation  
**Solution:**

```typescript
// app/auth/sign-up/page.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

const signUpSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    console.log(data)
    // Handle sign-up logic
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-96 p-6">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input {...register('email')} type="email" placeholder="your@email.com" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input {...register('password')} type="password" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input {...register('confirmPassword')} type="password" />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="w-full">Create Account</Button>
        </form>
      </Card>
    </div>
  )
}
```

**Commit:** `6360cdd` - UPDATED SIGN-UP PAGE

---

## Phase 7: Convex Backend Setup

### 7.1 Convex Installation

**Status:** Convex is installed as a dev dependency in `package.json` and is ready to use.

**Version:** `convex@^1.37.0`

**Location:** `convex/` directory in workspace

### 7.2 Important Convex Guidelines

Before writing any Convex code, always read `convex/_generated/ai/guidelines.md`. Key points:

- **HTTP Endpoints:** Use `httpRouter` and `httpAction` decorator in `convex/http.ts`
- **Function Registration:** Use `query`, `mutation`, `action` for public API; use `internalQuery`, `internalMutation`, `internalAction` for private functions
- **Validators:** Always include argument validators using `v` from `convex/values`
- **Function Calling:** Use `ctx.runQuery`, `ctx.runMutation`, `ctx.runAction`
- **Discriminated Unions:** Use `v.union()` for discriminated union types
- **Schema:** Use `defineSchema` and `defineTable` in `convex/schema.ts`

**Reference:** `convex/_generated/ai/guidelines.md`

---

## Current Project Structure

```
dep0x/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── (shared-layout)/
│   │   ├── layout.tsx        # Shared layout
│   │   └── page.tsx          # Home with layout
│   └── auth/
│       ├── layout.tsx        # Auth layout
│       ├── schemas/
│       │   └── auth.ts       # Auth schemas (Zod)
│       └── sign-up/
│           └── page.tsx      # Sign-up page
├── components/
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── field.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   └── theme-provider.tsx
│   └── web/                  # Custom web components
│       ├── navbar.tsx
│       └── theme-toggle.tsx
├── convex/
│   ├── tsconfig.json
│   ├── _generated/
│   │   └── ai/
│   │       ├── guidelines.md
│   │       └── ai-files.state.json
│   └── README.md
├── lib/
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── tsconfig.json
├── next.config.ts
├── package.json
└── tailwind.config.ts
```

---

## Development Workflow

### Starting Development Server
```bash
cd /home/mavix/DEV/dep0x
pnpm run dev
```

Open http://localhost:3000

### Git Workflow
```bash
# Check status
git status

# Add changes
git add .

# Commit with descriptive message
git commit -m "FEATURE: Add new component"

# Push to remote
git push origin main
```

### Adding New shadcn/ui Components
```bash
# With TLS issues:
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add [component-name]

# Without TLS issues:
pnpm dlx shadcn@latest add [component-name]
```

### Installing Dependencies
```bash
pnpm add [package-name]        # Production dependency
pnpm add -D [package-name]     # Dev dependency
```

---

## Key Technologies & Versions

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2.4 | React framework |
| React | 19.2.4 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Styling |
| shadcn/ui | ^4.6.0 | UI components |
| next-themes | ^0.4.6 | Dark mode support |
| react-hook-form | ^7.75.0 | Form handling |
| Zod | ^4.4.3 | Schema validation |
| Convex | ^1.37.0 | Backend as a service |
| Lucide React | ^1.14.0 | Icons |

---

## Troubleshooting Guide

### Issue: TLS Certificate Errors when Adding shadcn Components

**Symptoms:** `UNABLE_TO_VERIFY_LEAF_SIGNATURE` or similar SSL errors

**Solution:**
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest init
# or
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add [component-name]
```

### Issue: Node Version Compatibility

**Symptoms:** Build or runtime errors related to Node version

**Solution:**
```bash
nvm install 22.16.0  # Or required version
nvm use 22.16.0
```

---

## Next Steps & Future Features

- [ ] Convex backend integration
- [ ] Authentication with Convex Auth
- [ ] Database schema design
- [ ] API endpoints
- [ ] User management
- [ ] Data persistence
- [ ] Production deployment

---

## How to Update This Document

This SKILLS.md file should be updated whenever:
- A new feature is added
- A new process or workflow is created
- A question is answered that might help in the future
- An issue is resolved
- A new technology or dependency is added
- Breaking changes or solutions are discovered

**Update Process:**
1. Add the new section in the appropriate phase or create a new phase
2. Document the problem, solution, and code if applicable
3. Include git commits or terminal commands if relevant
4. Update the Current Project Structure and Key Technologies tables if needed
5. Commit the changes with a clear message like: `DOCS: Update SKILLS.md with [feature name]`

---

*Last Updated: May 6, 2026*  
*Project Start Date: May 2026*
