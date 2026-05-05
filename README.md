This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# INSTALL
pnpm create next-app@latest (yes for defaults)
cd dep0x
pnpm run dev - TEST

# HOW NEXT WORKS
Layout.tsx file wraps everything, children are the routs
If you add "Layout page" in layout.tsx it will be on all children

## app/layout.tsx 
```javascript
export default function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col">
        Generated in layout.tsx - RootLayout
        {children}
      </body>
    </html>
  );
}
```

## app/page.tsx
```javascript
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>page.tsx page</h1>
    </div>
  );
}
```

# ROUTING 
## app/abc/page.tsx
To create a new route, create folder under app folder and create page.tsx
If you called the folder abc, you woul.d then goto localhost:3000/abc
```javascript
export default function Abcpage() {
    return (
        <div>
            <h1>Hello fron the Abcpage</h1>
        </div>
    )
}
```
# TEST 
http://localhost:3000/abc

# CHILD ROUTE 
## app/abc/helloabc
Under abc folder, create a new holder like helloabc and a new page.tsx inside it
Make sure it starts with export default function abc
```javascript
export default function Abcpage() {
    return (
        <div>
            <h1>Hello fron the Abcpage</h1>
        </div>
    )
}
```
# TEST 
http://localhost:3000/abc/helloabc

# CREATE SEPERATE LAYOUT IF NEEDED - LETS DO ABC FOLDER
## app/abc/layout.tsx
```javascript
import React from "react";
export default function abclayout ({ children }: {children: React.ReactNode })
{
    return (
        <div>
            <h1>Hello from the abc layout</h1>
            {children} 
        </div>
    )
}
```
Now you will have 
Generated in layout.tsx - RootLayout
Hello from the abc layout
Hello from the Abcpage

# NOW CREATE A CLIENT SIDE NAVIGATIONM WITH A LINK COMPONENT
app/abc/page.tsx
```javascript
import Link from "next/link";

export default function Abcpage() {
    return (
        <div>
            <h1>Hello fron the Abcpage</h1>
            <Link href="/abc/helloabc">Go to helloabc</Link>
        </div>
    )
}
```
http://localhost:3000/abc

# CREATE A DYNAMIC ROUTE []
## app/blog/page.tsx
```javascript
export default function BlogPage() {
    return (
            <div>
                <h1>Hello from the Blog page</h1>
            </div>
    )
}
```
localhost:3000/blog
# THE DYNAMIC ROUTE USING []
app/blog[blogid]/page.tsx
```javascript
export default function BlogIdPage() {
    return (
        <div>
            <h1>Hello from the [blogid] page</h1>
        </div>
    )
}
```
# NOW GOTO http://localhost:3000/blog/sdfasdf
You will get:
Generated layout.tsx - RootLayout
Hello from the blog id page

# NOW HOW TO FETCH ANY BLOG DATA
app/blog[blogid]/page.tsx
```javascript
interface BlogIdPageProps {
    params: Promise<{ blogId: string }> 
}
export default async function BlogIdPage({ params }: BlogIdPageProps) {
const { blogId } = await params
    return (
        <div>
            <h1>Hello from the blog id page</h1>
            <p>blog id: {blogId}</p>
    )
}
```

# ADD NAVBAR TO ROOT LAYOUT
app/layout.tsx

# FOMPONENTS
dep0x/components/web/Navbar.tsx
NOTE: intall tailwwind css intelisense
```javascript
import Link from "next/link"
export function Navbar() {
    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        0xBytes <span className="text-blue-500">Pro</span>
                    </h1> 
                </Link>      
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-lg">Home</Link>
                    <Link href="/blog" className="text-lg">Blog</Link>
                    <Link href="/create" className="text-lg">Create</Link>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Link href="/auth/sign-up">Sign Up</Link>
                <Link href="/auth/login">Login</Link>
            </div>
        </nav>
    )     
}
```
# INSTALL SHADCN
pnpm dlx shadcn@latest init - chose Base
Base - Luma
ON CORP FIREWALL HAD TO RUN:
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest init
# INSTALL BUTTON
pnpm dlx shadcn@latest add button
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add button if you encounter SSL certificate errors

# UPDATE NAVBAR
/components/web/navbar.tsx
```javascript

...
  </Link>
        
                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({variant: 'ghost'})} href="/">Home</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/blog" >Blog</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/create" >Create</Link>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
                <Link className={buttonVariants({ variant: "outline"})} href="/auth/login">Login</Link>
            </div>
        </nav>


# UPDATE PADDING
app/layout.tsx

# ADD THEMES
pnpm add next-themes

# CREATE THEME PROVIDER
components/ui/theme-provider.tsx
'use client'
import * as React from 'react'
import { ThemeProvider as NextThhemesProvider } from 'next-themes'
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThhemesProvider>) {
    return <NextThhemesProvider {...props}>{children}</NextThhemesProvider>
}
```

# WRAP ROOT LAYOUT
app/layout.tsx
```javascript
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/web/navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "dep0x",
  description: "Demo of Next.js",
};
export default function RootLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)} >
      <body className={`min-h-full flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
          <Navbar />
            {children}
        </main>
      </body>
    </html> 
  );
}
```

# ADD THEME-TOGGLE
components/web/theme-toggle.tsx
```javascript
"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export function ThemeToggle() {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

# ADD DROPDOWN
 NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add dropdown-menu

 # ADD DROPDOWN COMPONENT IN NAVBAR
 components/web/web/navbar.tsx
 ...
             </div>
            <div className="flex items-center gap-2">
                <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
                <Link className={buttonVariants({ variant: "outline"})} href="/auth/login">Login</Link>
                <ThemeToggle />
            </div>
        </nav>
    )      
}

# SETUP AUTHENTICATION WITH ROUTE GROUPS (folder convention that lets you org routes ny catecory or team)
app/(shared-layout)/page.tsx MOVE app/page.tsx to here
app/auth/sign-up/page.tsx
# REMOVE navbar from layout.tsx and place it in (shared-layout) folder
app/(shared-layout)/layout.tsx
```javascript
import { Navbar } from "@/components/web/navbar";
import { ReactNode } from "react";
export default  function SharedLayout({children} : { children: ReactNode }) {
    return (
        <>
           <Navbar />
           {children}
        </>
    )  
}
```

# INSTALL CARD, FIELD, INPUT and  COMPONENTS
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add card
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add field
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add input
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest add separator

# SIGN-UP PAGE
app/auth/sign-up/page.tsx
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export default function SignUpPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create an account to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
            </CardContent>
        </Card>
    )
}

# INSTALL FORM LIBRARY AND A VALIDATION LIBRARY - ZOD WITH REACT HOOKS
# It will ask for email,name and password
pnpm i zod
pnpm i react-hook-form
pnpm i @hookform/resolvers

# INSTALL SCHEMAS
app/schemas/auth.ts
```python
import z from 'zod'
export const signUpSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.email(),
    password: z.string().min(8).max(30),
})
```
# UPDATE SIGN-UP PAGE
app/auth/sign-up/page.tsx
```javascript
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
    })

    function onSubmit() {
        console.log("onsubmit called")
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create an account to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller 
                            name="name" 
                            control={form.control} 
                            render={({ field, fieldState }) => (
                                <Field>
                                   <FieldLabel>Full Name</FieldLabel>
                                   <Input
                                     aria-invalid={fieldState.invalid}
                                     placeholder="John Doe"
                                     {...field}
                                   />
                                   {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />  
                                   )}
                                </Field>
                           )}
                        />
                        <Controller 
                            name="email" 
                            control={form.control} 
                            render={({ field, fieldState })  => (
                                <Field>
                                   <FieldLabel>Email</FieldLabel>
                                   <Input aria-invalid={fieldState.invalid}
                                   placeholder="John@Doe.com" type="email" {...field} />
                                   {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />  
                                   )}
                                </Field>
                           )}
                        />  
                        <Controller 
                            name="password" 
                            control={form.control} 
                            render={({ field, fieldState })  => (
                                <Field>
                                   <FieldLabel>Password</FieldLabel>
                                   <Input placeholder="*****" type="password" {...field} />
                                   {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />  
                                   )}
                                </Field>
                           )}
                        />
                        <Button type="submit">Sign up</Button>     
                    </FieldGroup>
                </form>
            </CardContent>  
        </Card>
    )
}
```

# CREATE LAYOUT FILE FOR AUTH FOLDER
app/auth/layout.tsx
```javascript
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute top-5 left-5">
                <Link href="/" className={buttonVariants({variant: "secondary"})}>
                    <ArrowLeft className="size-4" />
                    Go Back
                </Link>
            </div>
            <div className="w-full max-w-md mx-auto">{children}</div>
        </div>
    )
}
```

# UPDATE TO app/auth/sign-up/page.tsx
...
 <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
...

# ADDING THE DATABASE/CACKEND - CONVEX
https://convex.link/JanMarshall
pnpm dlx convex dev