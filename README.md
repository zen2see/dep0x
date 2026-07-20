This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## GETTING STARTED https://www.youtube.com/watch?v=MZbwu3-uz3Y
First, run the development server:
```bash
pnpm dev

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and 
load [Geist](https://vercel.com/font), a new font family for Vercel.
## Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## DEPLOY IN VERCEL
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# INSTALL
# pnpm create next-app@latest (yes for defaults)
# cd dep0x
# pnpm run dev - TEST

# HOW NEXT WORKS
Layout.tsx file wraps everything, children are the routes
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

# NOW YOU WILL HAVE 
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
`app/blog/[blogid]/page.tsx`
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
`app/blog/[blogid]/page.tsx`
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

# ########  START PROJECT  # #################################################### ##############
NOTE: intall tailwwind css intelisense
# ADD NAVBAR TO ROOT LAYOUT
# mkdir dep0x/components/web
## dep0x/components/web/Navbar.tsx
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
# pnpm dlx shadcn@latest init - chose Base
Base - Luma
ON CORP FIREWALL HAD TO RUN:
# NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dlx shadcn@latest init

# INSTALL BUTTON
# pnpm dlx shadcn@latest add button
NODE_TLS_REJECT_UNAUTHORIZED=0 (ONLY NEEDED BEHIND A CORP FIREWALL)
# pnpm dlx shadcn@latest add button if you encounter SSL certificate errors

# UPDATE NAVBAR
## /components/web/navbar.tsx
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
```

# UPDATE PADDING
## app/layout.tsx
... 
#  <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
..

# ADD THEMES
# pnpm add next-themes

# CREATE THEME PROVIDER
## components/ui/theme-provider.tsx
```javascript
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
## app/layout.tsx
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
## components/web/theme-toggle.tsx
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
## pnpm dlx shadcn@latest add dropdown-menu

 # ADD DROPDOWN COMPONENT IN NAVBAR
 ## components/web/web/navbar.tsx
```javascript
             </div>
            <div className="flex items-center gap-2">
                <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
                <Link className={buttonVariants({ variant: "outline"})} href="/auth/login">Login</Link>
                <ThemeToggle />
            </div>
        </nav>
    )      
 }
```
 

# SETUP AUTHENTICATION WITH ROUTE GROUPS (folder convention that lets you org routes by catecory or team)
# app/(shared-layout)/page.tsx MOVE app/page.tsx to here
## app/auth/sign-up/page.tsx

# REMOVE navbar from layout.tsx and place it in (shared-layout) folder
## app/(shared-layout)/layout.tsx
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
# pnpm dlx shadcn@latest add card
# pnpm dlx shadcn@latest add field
# pnpm dlx shadcn@latest add input
# pnpm dlx shadcn@latest add separator

# SIGN-UP PAGE
# app/auth/sign-up/page.tsx
```javascript
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
```

# INSTALL FORM LIBRARY AND A VALIDATION LIBRARY - ZOD WITH REACT HOOKS
# It will ask for email,name and password
# pnpm i zod
# pnpm i react-hook-form
# pnpm i @hookform/resolvers

# INSTALL SCHEMAS 1:09
# app/schemas/auth.ts
```javascript
import z from 'zod'
export const signUpSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.email(),
    password: z.string().min(8).max(30),
})
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(30),
});
```

# UPDATE SIGN-UP PAGE
# app/auth/sign-up/page.tsx
```javascript
'use client'
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/app/schemas/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // 👈 Re-introduced for soft routing execution
import { z } from "zod";
type SignUpValues = z.infer<typeof signUpSchema>;
export default function SignUpPage() {
  const router = useRouter(); // 👈 Initialize the Next.js router
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;
  async function onSubmit(data: signUpValues) {
    try {
      // 👈 Await the response from Better Auth
      const response = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name, // 👈 Explicitly pass the name field here
      });
      // Catch error fields inside the response block
          if (response?.error) {
        toast.error(response.error.message || "Registration failed");
        return;
      }
      // ✅ Step 1: Fire the success notification immediately!
      toast.success("Account created successfully");
      // ✅ Step 2: Use client routing with a slight pause so the toast registers
      setTimeout(() => {
        router.push("/");
        router.refresh(); // Tells the application layout to look for new cookies
      }, 1000);  
    } catch (err: any) {
      console.error("Login execution crash:", err);
      toast.error("Something went wrong during sign in.");
    }
  }
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation Errors:", errors);
            toast.error("Please fill out the form requirements correctly.");
          })}
        >
          <FieldGroup>
          {/* Name Field */}
            <Controller 
              name="name"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input placeholder="John doe" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> 
            <Controller 
              name="email" 
              control={form.control} 
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input 
                    aria-invalid={fieldState.invalid}
                    placeholder="john@example.com" 
                    type="email" 
                    autoComplete="username"
                    {...field} 
                  />
                  {fieldState.error && <FieldError />}
                </Field>
              )}
            />
             {/* Password Field */}
            <Controller 
              name="password" 
              control={form.control} 
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input 
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••" 
                    type="password" 
                    autoComplete="current-password"
                    {...field} 
                  />
                  {fieldState.error && <FieldError />}
                </Field>
              )}
            />  
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>      
          </FieldGroup>
        </form>
      </CardContent>  
    </Card>
  )
}

```

# CREATE LAYOUT FILE FOR AUTH FOLDER
# app/auth/layout.tsx
```javascript
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();

  useEffect(() => {
    if (!isAuthLoading && !session) {
      toast.error("Please sign in to access this page.");
      router.push("/auth/login");
    }
  }, [session, isAuthLoading, router]);

  // Keep a clean loading state visible while verifying security tokens
  if (isAuthLoading) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Verifying security credentials...
        </p>
      </div>
    );
  }
  // Prevent restricted interface elements from rendering during redirect handoff
  if (!session) return null;

  return (
    <div className="min-h-screen flex items-center justify-center relative w-full">
      {/* Absolute Back Button Layout Anchor */}
      <div className="absolute top-5 left-5 z-50">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          <ArrowLeft className="mr-2 size-4" />
          Go Back
        </Link>
      </div>
      
      {/* Wrapped Page Views Content Container */}
      <div className="w-full h-full">{children}</div>
    </div>
  );
}

```

# UPDATE TO app/auth/sign-up/page.tsx
...
 <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
...

# ADDING THE DATABASE/BACKEND - CONVEX CHOOSE CLOUD DEPLOYMENT INSALLS CONVEXDIR
# pnpm dlx convex dev 81104323 =create a new project, cloud deployment
# pnpm i convex -D 


# SET ENV VARIABLES CONVEXT_DEPLOYMENT and NEXT_PUBLIC_CONVEX_URL 
# .env.local
..DEPLOYMENT to ...dev:...
_URL goext to ...cloud


# CREATE SAMPLE DATA FOR DB
# samleData.jsonl
```json
{text": "Buy groceries", "isCompleted": true}
{"text": "Go for a swim", "isCompleted": true}
{"text": "Integrate Convex", "isCompleted": false}
{"text": "Write a blog post", "isCompleted": false}
{"text": "Call mom", "isCompleted": true}
```

# IMPORT SAMPLE DATA INTO CONVEX 1:47
# pnpm dlx convex import --table tasks sampleData.jsonl 1:48


# TEST DATA
Go to convex web and check Data to see the data 


# UPDATE env.local 1:52
# Deployment used by `npx convex dev`


# EXPOSE A DATABASE QUERY AND A CONNECTION TEST (CALL FROM CONVEX WEBSITE)
# convex/tasks.ts 1:49
````javascript
import { query } from './_generated/server';
export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("tasks").collect();
    },
});
export const testConnection = query({
  args: {},
  handler: async (ctx) => {
    return "Successfully connected to Convex!";
  },
});
````

# CREATE A CLIENT COMPONENT FOR ConvexClientProvider
# app/components/web/ConvexClientProvider.tsx
```javascript
"use client";
import { ReactNode } from "react";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!, {
  // Optionally pause queries until the user is authenticated
  expectAuth: true, // no user data if not authenticated
});
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      {children}
    </ConvexBetterAuthProvider>
  );
}
```


# WRAP CHILDREN OF THE BODY ELEMENT WITH THE <ConvexClientProvider> IN App/layout.tsx
# app/layout.tsx
```javascript
import { ConvexClientProvider } from "@/components/web/ConvexClientProvider";  
   <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
            <ConvexClientProvider>{children}<ConvexClientProvider>
    </main>
</ThemeProvider>
```

# TEST - DISPLAY DATA IN COMVEX DB  localhost:3000/test (should show data)
# app(shared-layout)/test/page.tsx
```javascript
"use client"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
export default function Home() {
    const tasks = useQuery(api.tasks.get);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {tasks?.map(({ _id, text }) => (
            <div key={_id}>{text}</div>
        ))}
        </main>
    )
}
```

# TEST - pnpm run dev, pnpm convex dev http://localhost:3000/test 
Should see tasks in app of convex, go to functions Run Function to sest output


# ADDING BETTER AUTH https://better-auth.com/ 2:01
# pnpm i @convex-dev/better-auth
# pnpm add better-auth@1.3.34 --save-exact


# CREATE CONFIG FILE FOR CONVEX AND REGISTER IT
# app/convex/convex.config.ts
```javascript
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";
const app = defineApp();
app.use(betterAuth);
export default app;
```

# DEFINE CONVEX AUTH CONFIG FILE 2:03
# app/convex/auth.config.ts
```javascript
import type { AuthConfig } from 'convex/server';
import { getAuthConfigProvider } from "@convex-dev/better-auth/auth-config";
export default {
  providers: [
    getAuthConfigProvider(), 
  ],
} satisfies AuthConfig;
```
<!-- ully Automated: This helper automatically reads your environment variables behind the scenes and 
structures the provider exactly how Better Auth expects. You do not have to map domain URLs or 
type IDs yourself.Strictly Type Safe: The satisfies AuthConfig keyword tells TypeScript to 
validate your configuration object against Convex's built-in rules before compiling. If an object 
property is wrong or missing, your IDE catches it immediately.Resilient to Missing Variables: 
Because it is managed by the library, it handles fallback checks cleanly so it won't crash your  
server if an environment variable evaluates to undefined during a hot reload. -->


# SET ENVIRONMENT VARIABLES
# pnpm dlx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
# pnpm dlx convex env set SITE_URL http://localhost:3000 
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=
# dep0x  
NEXT_PUBLIC_CONVEX_URL=
# Same as `NEXT_PUBLIC_CONVEX_URL` but without the `https://` ends in .site
NEXT_PUBLIC_CONVEX_SITE_URL=
# Your local site URL
SITE_URL=http://localhost:3000


# CREATE A BETTER AUTH INSTANCE 2:02
# ../convex/auth.ts
```javascript
import { query } from './_generated/server';
import { components } from './_generated/api';
import { DataModel } from './_generated/dataModel';
import { betterAuth } from 'better-auth';
import { createClient, type GenericCtx } from '@convex-dev/better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import authConfig from './auth.config';
const siteURL = 
  process.env.NEXT_PUBLIC_SITE_URL ?? 
  process.env.NEXT_PUBLIC_CONVEX_SITE_URL ?? 
  'http://localhost:3000';
// The component client has methods needed for integrating Convex with Better Auth.
export const authComponent = createClient<DataModel>(components.betterAuth);
export const createAuth = (ctx: GenericCtx<DataModel>) => {
    return betterAuth({
        baseURL: siteURL,
        database: authComponent.adapter(ctx),
        emailAndPassword: {
            enabled: true,
            requireEmailVerification: false,
        },
        plugins: [
            // FIXED: Pass options object to convex plugin as required in v0.10+
            convex({ 
                authConfig,
                // Instructs Convex to rotate tokens cleanly to prevent algorithm mismatch errors
                jwksRotateOnTokenGenerationError: true 
            }),
        ],
    });
};
// Example function for getting the current user
export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        return authComponent.getAuthUser(ctx);
    },
});

```

# CREATE A BETTER AUTH CLIENT INSTANCE 2:07
# ../lib/auth-client.ts
```javascript
import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  plugins: [
    convexClient() // 👈 Tells Better Auth to route data directly via Convex mutations
  ]
});
```

# NOW MOUNT HANDLERS
# ../convex/http.ts
```javascript
import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";
const http = httpRouter();
authComponent.registerRoutes(http, createAuth);
export default http;
```

# SETUP ROUTE HANDLERS TO PROXY AUTH REQUESTS FROM SERVER TO CONVEX DEPLOYMENT
# `app/api/auth/[...all]/route.ts`
```javascript
import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
import { handler } from "@/lib/auth"; // Imports from your server file
export const dynamic = "force-dynamic"; // 👈 Prevents Next.js from breaking dynamic HTTP methods
export const { GET, POST } = handler;
```

# SETUP CONVEX CLIENT PROVIDER 2:08
# ../components/web/ConvexclientProvider.tsx
```javascript
"use client";
import { ReactNode } from "react";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!, {
  // Optionally pause queries until the user is authenticated
  expectAuth: true, // no user data if not authenticated
});
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      {children}
    </ConvexBetterAuthProvider>
  );
}
```

# UPDATE SIGN-UP PAGE
# app/auth/sign-up/page.tsx/sign-up/page.tsx
```javascript
'use client'

import { authClient } from "@/lib/auth-client";
...

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter(); // 👈 Initialize the Next.js router
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;
  async function onSubmit(data: signUpValues) {
    try {
...
```


# RESTART SERVER AND DB SERVER
# pnpm run dev
# pnpm convex dev

# FIXES 
# // lib/auth.ts (Server-side utilities)
```javascript
import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
export const { 
    handler, 
    preloadAuthQuery, 
    isAuthenticated, 
    getToken, 
    fetchAuthQuery, 
    fetchAuthMutation, 
    fetchAuthAction 
} = convexBetterAuthNextJs({
    convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
    convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
});

```# STATUS 06/25/2026
  The project has completed its initial UI scaffolding phase and is poised to begin backend database and authentication
  integration.
  A. Frontend Status (Completed)
   * Framework Setup: Next.js 16.2.4 on React 19.2.4 with Tailwind CSS v4 and shadcn/ui.
   * Routing & Structure:
       * Shared main layouts (app/(shared-layout)/layout.tsx) containing the navigation bar (components/web/navbar.tsx)
         and light/dark mode switcher (components/web/theme-toggle.tsx).
       * Dedicated authentication route layout (app/auth/layout.tsx).
   * Form Validation:
       * Zod validation schema is configured in app/auth/schemas/auth.ts (validating name, email, and password).
       * Sign-up page (app/auth/sign-up/page.tsx) uses react-hook-form with the Zod resolver.
       * Current State: Form submission is a mock that only executes console.log("onsubmit called").
  B. Backend Status (Pending Setup)
   * Installation: Convex (convex@^1.37.0) is installed in devDependencies.
   * Files: Default boilerplate files (convex/tsconfig.json and convex/README.md) are present.
   * Database Drafts: A sample dataset file sampleData.jsonl exists in the root directory.
   * Current State: No database schemas (convex/schema.ts), queries, mutations, or authentication mechanisms have been
     written yet.
  Next Steps
   1. Sync Docs: Align AGENTS.md and README.md with CLAUDE.md to ensure any AI agent has matching context.
   2. Schema Definition: Create convex/schema.ts to define the database tables and validation rules.
   3. Authentication: Configure Convex Auth (with Clerk, Auth0, or similar provider) to handle authenticating users.
   4. Form Submission Integration: Update onSubmit in app/auth/sign-up/page.tsx to dispatch a mutation to Convex.
```
# 2:15 AFTER GIT PUSH WITH WORKING USER SIGNUP


# SETUP FOR TOAST MESSAGES
# .../components/ui/sonner.tsx
```javascript
"use client"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
export { Toaster }
```

# FIX SIGN-UP PAGE - ADDING TIMER 
# app/auth/sign-up/page.tsx
```javascript
..
import { toast } from "sonner";
type SignUpValues = z.infer<typeof signUpSchema>;
export default function SignUpPage() {
    const router = useRouter();
    
    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const { isSubmitting } = form.formState;
    async function onSubmit(data: SignUpValues) {
        await authClient.signUp.email({
            email: data.email,
            name: data.name,
            password: data.password,
        }, { // Fixed nested configuration block structure
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Account created successfully");
                    // 👈 Micro-delay added so Next.js doesn't destroy the toast instantly
                    setTimeout(() => {
                        router.push("/");
                    }, 300);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Something went wrong");
                },
            }
        });
    }
    ...
      <Input placeholder="*****" type="password"  autoComplete="new-password" {...field} />
    ...  

```
<!-- Toast Timing & Syntax: Replaced the broken pmErrpr typo object keys with clean Better Auth 
client parameters, leveraging a 300ms buffer.Auto-completion Standards: Configured 
autoComplete="new-password" for the field structure, clearing out future console optimization 
warnings.TypeScript Types: Provided explicit SignUpValues types to hook up cleanly into the 
validation form submission state handlers. -->


# SHOWING UI BASED ON AUTHENTICATION STATE 2:17
# YOU LOGIN, REGISTER, LOGOUT WITH AUTH FCLIENT FROM BETTER AUTH
# GET USER SESSION WITH USE CONVEX AUTH HOOK
# pnpm add sonner - FOR TOAST
# components/web/navbar.tsx
```javascript
"use client"
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useConvexAuth } from "convex/react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { SearchInput} from "./SearchInput"
export function Navbar() {
    const { isAuthenticated , isLoading } = useConvexAuth()
    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        0xBytes <span className="text-blue-500">Pro</span>
                    </h1> 
                </Link>
               <div className="flex items-center gap-2">
                    <Link className={buttonVariants({variant: 'ghost'})} href="/">Home</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/blog" >Blog</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/create" >Create</Link>
               </div>
            </div> 
            <div className="flex items-center gap-2">
                <div className="hidden md:block mr-2">
                    <SearchInput />
                </div>
               {isLoading ? null : isAuthenticated ? (
                    <Button 
                        onClick={() => 
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        toast.success("Logged out successfully")
                                        router.push("/")
                                    },
                                    onError: (error) => {
                                        toast.error(`Error logging out: ${error.message}`)
                                    },
                                },
                            })
                        }
                    >   
                        Logout
                    </Buttton>
                    ): (
                        <>
                        <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
                        <Link className={buttonVariants({ variant: "outline"})} href="/auth/login">Login</Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    )      
}
```

# CREATE A LOGIN 
# ADD ATOAST WITH SONNER (MAY HAVE ALREADY SONEIT AND Toaster) - pnpm add sonar
# Add to app/layout.tsx
...
  </main>
          <Toaster closeButton />
...


# ../auth/login/page.tsx
```javascript
export default function LoginPage() {
  return (

```

# CREATE A NEW SCHEMA FOR LOGIN PAGE
# ../schemas/auth.ts
```javascript
...
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(30),
});
```

# DISPLAY AMESSAGE WHEN THE USER SUCCESSFULLY LOGS OUT
# ../components/web/navbar.tsx
```javascript
...
     fetchOptions: {
                                    onSuccess: () => {
                                        toast.success("Logged out successfully")
                                        router.push("/")
                                    },
                                    onError: (error) => {
                                        toast.error(error.error.message)
                                    },
         },
...
                  
```     
# REDIRECT USERS AFTER LOGGING OUT
# .../components/web/navbar.tsx
```javascript
..."use client"
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useConvexAuth } from "convex/react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation" 
import { SearchInput} from "./SearchInput"
export function Navbar() {
     // Note: If you migrated to Better Auth, you should use authClient.useSession() here instead!
    const { isAuthenticated , isLoading } = useConvexAuth()
    const router = useRouter() 
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully");
                    // 👈 Forces a full browser navigation to wipe Next.js route caches cleanly
                    window.location.href = "/"; 
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Failed to log out");
                },
            },
        });
    };
     return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        0xBytes <span className="text-blue-500">Pro</span>
                    </h1> 
                </Link>
               <div className="flex items-center gap-2">
                    <Link className={buttonVariants({variant: 'ghost'})} href="/">Home</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/blog" >Blog</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/create" >Create</Link>
               </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="hidden md:block mr-2">
                    <SearchInput />
                </div>
               {isLoading ? null : isAuthenticated ? (
                    <Button onClick={handleLogout}>   
                        Logout
                    </Button>    
                ): (    
                    <>
                        <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
                        <Link className={buttonVariants({ variant: "outline"})} href="/auth/login">Login</Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    )      
}
    ...

```

# FIXING GOING TO HOME AFTER LOGGING OUT
# ../auth/sign-up/page.tsx
# TEST LOGGING OUT
<!-- The core fix that made your logout work was switching from client-side routing (router.push) to a native 
browser navigation style.When you updated your logout logic, changing the execution flow solved three 
behind-the-scenes problems:1. Breaking the Next.js Route CacheThe Next.js App Router aggressively keeps 
an in-memory cache of your pages on the client side. When you click logout and use router.push("/"), 
Next.js checks its internal cache and says: "Hey, I already have the Home page ready to display!" and 
serves up the stale, cached page view.By forcing a fresh window refresh or server-level action, you 
completely destroy that client-side cache and force the app to pull fresh data.2. Immediate Token & 
Cookie ValidationAuthentication tools like Better Auth use secure HTTP-only cookies to keep you signed in. 
When you log out, those cookies are cleared.router.push() updates the browser URL but doesn't force a 
real page request to the server. Your layouts remain unaware that the cookies are gone.Native browser 
navigation forces the browser to send a brand-new network request to your Next.js server. 
The server instantly notices that the authorization cookies are completely empty. 
Originally, your logout function inside the Navbar component was using the Next.js router, which was getting 
stuck in the client-side cache:tsx// ❌ The old, stuck code in your Navbar:
onSuccess: () => {
    toast.success("Logged out successfully")
    router.push("/") // This client transition was causing the page to freeze/stay put
}
Use code with caution.You fixed it by patching the click handler inside that file to bypass the Next.js 
router cache entirely:tsx//  The fixed code in your Navbar:
onSuccess: () => {
    toast.success("Logged out successfully");
    window.location.href = "/"; // This forced a clean network reload and fixed your logout!
}

 Critical Fixes MadeImported Zod: Added import { z } from "zod" so z.infer compiles.Better Auth API Structure:
Corrected the .signIn.email call syntax. In Better Auth, fetchOptions / hooks are passed directly as the second
argument parameter object rather than being deeply nested.Cleaned Up Imports: Consolidated the Controller import
inside react-hook-form.FieldError Component Structure: Changed <FieldError errors={[fieldState.error]} /> to 
<FieldError>{fieldState.error.message}</FieldError> to match standard component mappings.Button UX: Added 
disabled={isSubmitting} and dynamic button text to prevent duplicate submission spamming.Would you like help 
with:Setting up a "Remember Me" persistent session checkbox?Adding Social Login / OAuth buttons underneath 
this standard form?Creating server middleware to protect private routes using Better Auth?  
WORKS
Awesome! Using direct try/catch execution threads with await statements is much more reliable in Next.js App Router applications because it prevents the React Hook Form lifecycle from dropping async updates.Now
  -->

# FIXING LOGGING IN (CURRENTLY NOT MOVING TO HOME)
1. Fix the authClient ImportIn your very first files, you imported from @/lib/auth-client. In this file, you are importing directly from the core library: import { authClient } from "@/lib/auth-client";.Ensure your @/lib/auth-client.ts file explicitly specifies the base URL of your application so the client transitions can map the callback payload back into the React state window.
# ../lib/auth-client.ts
```javascript
// import { createAuthClient } from "better-auth/react";
// import { convexClient } from "@convex-dev/better-auth/client/plugins";
// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
//   plugins: [
//     convexClient() // 👈 Tells Better Auth to route data directly via Convex mutations
//   ]
// });
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" })// 👈 CRITICAL: Must match your exact working URL
```
2. Bypass fetchOptions entirely using Better Auth Async AwaitBecause Better Auth requests are standard async Promises, you don't actually need to use the fetchOptions object configuration hook. You can handle the success state, toast, and redirection using a standard JavaScript try/catch block directly inside your execution timeline. This guarantees that Next.js doesn't freeze the operation thread.
#
 ../suth/login/page.tsx
```javascript
const { isSubmitting } = form.formState;

  async function onSubmit(data: LoginValues) {
    try {
      // 👈 Use try/catch with await directly for reliable async flow execution
      const response = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      // Better Auth returns error objects inside the resolved response data frame
      if (response?.error) {
        toast.error(response.error.message || "Invalid credentials");
        return;
      }
      // If we reach here, authentication passed successfully!
      toast.success("Logged in successfully");
      
      // Force immediate destination navigation
      window.location.href = "/";
      
    } catch (err: any) {
      console.error("Login unexpected crash:", err);
      toast.error("Something went wrong during sign in.");
    }
  }
  return (
```

# FIXING MISING LOGGED OUT SUCCESSFULLY MESSAGES
# ../components/web/navbar.tsx
Bypassing fetchOptions avoids nested callbacks that are prone to dropping out.
The callbackURL instructs the authentication client to schedule a clean destination 
route update without forcibly cutting off ongoing state threads.Does making this
modification to handleLogout solve the issue so that
Removed fetchOptions: Eliminating the deep callback structure stops Next.js from 
processing conflicting render threads.Added callbackURL: "/": This tells Better 
Auth to take control of the redirect timeline natively instead of having JavaScript 
sharply cut the window loading environment via a manual window.location.href rewrite. 
```javascript
"use client"
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useConvexAuth } from "convex/react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { SearchInput } from "./SearchInput"
export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const handleLogout = async () => {
        try {
            // 👈 Better Auth native logout wrapper
            const response = await authClient.signOut({
                // callbackURL forces a clean redirection while allowing the local code context to finish executing toasts
                callbackURL: "/" 
            });
            if (response?.error) {
                toast.error(response.error.message || "Failed to log out");
                return;
            }
            // Shows up seamlessly on the screen now
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout runtime error:", error);
            toast.error("An unexpected error occurred during logout.");
        }
    };
    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        0xBytes <span className="text-blue-500">Pro</span>
                    </h1> 
                </Link>
               <div className="flex items-center gap-2">
                    <Link className={buttonVariants({variant: 'ghost'})} href="/">Home</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/blog" >Blog</Link>
                    <Link className={buttonVariants({variant: 'ghost'})} href="/create" >Create</Link>
               </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="hidden md:block mr-2">
                    <SearchInput />
                </div>
               {isLoading ? null : isAuthenticated ? (
                    <Button onClick={handleLogout}>   
                        Logout
                    </Button>    
                ): (    
                    <>
                        <Link className={buttonVariants()} href="/auth/sign-up">Sign Up</Link>
                        <Link className={buttonVariants({ variant: "outline"})} href="/auth/login">Login</Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    )      
}
```
# FOR LOGGED IN MESSAGE
To make sure the "Logged in successfully" message shows up clearly on your login page before it redirects, 
apply the exact same fix: remove window.location.href = "/" and add callbackURL: "/" directly inside your 
signIn.email options.Just like with the logout function, window.location.href instantly wipes the browser's 
active memory before the toast can animate into view. Using callbackURL lets Better Auth manage the timing natively.
callbackURL: "/": This tells Better Auth to handle the route refresh safely without locking up Next.js.Removed 
sonner toast can slide onto the screen.
# ..auth/login/page.tsx
```javascript
...
 async function onSubmit(data: LoginValues) {
    try {
      // 👈 Use try/catch with await directly for reliable async flow execution
      const response = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/", // 👈 Better Auth native redirect parameter
      });
    // Better Auth returns error objects inside the resolved response data frame
    if (response?.error) {
        toast.error(response.error.message || "Invalid credentials", { duration: 8000 });
        return;
     }

     // Keep the success message on screen for 6 seconds (6000ms)
     toast.success("Logged in successfully", { duration: 6000 });
```

# ...componets/web/navbar.tsx
```javascript
// Inside your handleLogout function:
if (response?.error) {
  toast.error(response.error.message || "Failed to log out", { duration: 8000 });
  return;
}
// Keep the logout success message on screen for 6 seconds
toast.success("Logged out
``` successfully", { duration: 6000 });
Use code with caution.
```

# LOGIN SUCCESSFULL MESSAGE CUTS OFF BECAUSE PAGE REFRESH FIXED BY:
# TRIGGERING ON THE HOME PAGE AFTER THE REDIRECT LANDS
# Include a tiny query flag (?login=success). This passes a lightweight message to the next page.
# ../auth/login/page.tsx
```javascript
...
// callbackURL: "/", // 👈 Better Auth native redirect parameter
    callbackURL: "/?login=success", // 👈 Just append this query parameter
  });
   // toast.success("Logged in successfully", { duration: 6000 });
...
```

# ON HOMEPAGE dropt useEffect , it listens for the URL flag, fires the toast and cleans it up.
Open your home page file and replace or update it with this component. Notice the clean Suspense 
wrapper—this is a strict Next.js requirement when using useSearchParams to prevent the build system 
from breaking or dropping client-side hooks:tsx
# ..(shared-layout)/page.tsx
```javascript
"use client";
import Image from "next/image"
import Link from "next/link"
import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
// 1. Create a sub-component that safely hooks into the URL parameters
 function AuthToastListener() {
 const searchParams = useSearchParams();
 const router = useRouter();
 useEffect(() => {
    const loginStatus = searchParams.get("login");
    const signupStatus = searchParams.get("signup");
    if (loginStatus === "success") {
      toast.success("Logged in successfully");
      router.replace("/"); // Cleans the URL parameter immediately
    }
    if (signupStatus === "success") {
      toast.success("Account created successfully!");
      router.replace("/"); // Cleans the URL parameter immediately
    }
  }, [searchParams, router]);
  return null; // This component doesn't render HTML, it just listens
}
 // 2. Your actual main landing home page component
export default function HomePage() {
  return (
    <div className="p-8 space-y-4">
      {/* 👈 Next.js requires useSearchParams to be wrapped in Suspense */}
      <Suspense fallback={null}>
        <AuthToastListener />
      </Suspense> 
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1>page.tsx</h1>
      </div>
    </div>  
  );
}



}
```
# ALSO FOR SIGN-UP PAGE
# ../authsign-up/page.tsx
```javascript
'use client'
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/app/schemas/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // 👈 Re-introduced for soft routing execution
import { z } from "zod";
type LoginValues = z.infer<typeof loginSchema>;
export default function LoginPage() {
  const router = useRouter(); // 👈 Initialize the Next.js router

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;
  async function onSubmit(data: LoginValues) {
    try {
      // 👈 Await the response from Better Auth
      const response = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      // Catch error fields inside the response block
      if (response?.error) {
        toast.error(response.error.message || "Invalid credentials");
        return;
      }
      // ✅ Step 1: Fire the success notification immediately!
      toast.success("Logged in successfully");
      // ✅ Step 2: Use client routing with a slight pause so the toast registers
      setTimeout(() => {
        router.push("/");
        router.refresh(); // Tells the application layout to look for new cookies
      }, 1000);
    } catch (err: any) {
      console.error("Login execution crash:", err);
      toast.error("Something went wrong during sign in.");
    }
  }
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation Errors:", errors);
            toast.error("Please fill out the form requirements correctly.");
          })}
        >
          <FieldGroup className="gap-y-4">
            {/* Email Field */}
            <Controller 
              name="email" 
              control={form.control} 
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input 
                    aria-invalid={fieldState.invalid}
                    placeholder="john@example.com" 
                    type="email" 
                    autoComplete="username"
                    {...field} 
                  />
                  {fieldState.error && <FieldError />}
                </Field>
              )}
            />  
            {/* Password Field */}
            <Controller 
              name="password" 
              control={form.control} 
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input 
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••" 
                    type="password" 
                    autoComplete="current-password"
                    {...field} 
                  />
                  {fieldState.error && <FieldError />}
                </Field>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>     
          </FieldGroup>
        </form>
      </CardContent>  
    </Card>
  )
}

```
# FIXING SIGN-UP PAGE
```javascript
...
ype SignUpValues = z.infer<typeof signUpSchema>;
export default function SignUpPage() {
  const router = useRouter(); // 👈 Initialize the Next.js router
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;
  async function onSubmit(data: signUpValues) {
    try {
      // 👈 Await the response from Better Auth
      const response = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name, // 👈 Explicitly pass the name field here
      });
      // Catch error fields inside the response block
          if (response?.error) {
        toast.error(response.error.message || "Registration failed");
        return;
      }
      // ✅ Step 1: Fire the success notification immediately!
      toast.success("Account created successfully");
      // ✅ Step 2: Use client routing with a slight pause so the toast registers
      setTimeout(() => {
        router.push("/");
        router.refresh(); // Tells the application layout to look for new cookies
      }, 1000);
    } catch (err: any) {
      console.error("Login execution crash:", err);
      toast.error("Something went wrong during sign in.");
    }
  }
...
```

# ADD useTransiton React Hook that lets you render a part of the UIin the bkgrd
# app/auth/login/page.tsx
...
import { useTransiton } from "react";
...
export default function LoginPage() {
  const [isPending, startTransition] = useTransiton();

 function onSubmit(data: LoginValues) {
    try {
      startTransiton(async () => {
        

# START WORKING ON THE CREATE ROUTE 2:36
# app/(shared-layout)/create/page.tsx
```javascript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
export default function CreateRoute() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
			  <h1 className="text-4xl font-extrabold tracking-tigt sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader> 
        <CardContent>
          <form>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

# CREATE A NEW SCHEMA FOR THE CREATE 2:42
# app/convex/schemas/blog.ts
```javascript
import z from 'zod'
export const postSchema = z.object({
    title: z.string().min(3).max(50),
    content: z.string().min(10).max(1000), 
    image:  z.instanceof(File).optional(),
});

```

# HAD TO FIX theme-provider error
# ../components/ui/theme-provider.tsx
```javascript
"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// export function ThemeProvider({
//   children,
//   ...props
// }: React.ComponentProps<typeof NextThemesProvider>) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // React 19 fix: Suppress the <script> tag warning on the client side
  const scriptProps = typeof window === "undefined" 
    ? undefined 
    : ({ type: "application/json" } as const);
  return (
    <NextThemesProvider {...props} scriptProps={scriptProps}>
      {children}
    </NextThemesProvider>
  );
}
```

# INITIALIZE USEFORM HOOK - READY TO MAKE ADD CREATE POST BUTTON 2:48
# pnpm dlx shadcn@latest add textarea
# app/(shared-layout)/create/page.tsx
```javascript
"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { postSchema } from "@/app/schemas/blog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"; // 👈 Added missing hook import
import { z } from "zod"; // 👈 Added missing zod import
type PostFormValues = z.infer<typeof postSchema>; // 👈 Extracted clean type helper
export default function CreateRoute() {
  const mutation = useMutation(api.posts.createPosts)
  const form = useForm<PostFormValues>({ // 👈 Added explicit type generic
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
      image: undefined, // Added to match schema shape
    
    },
  });
  const { isSubmitting } = form.formState;
  // 👈 Added async/await to handle the database insertion lifecycle safely
  async function onSubmit(values: PostFormValues) {
    try {
      await mutation({
        title: values.title,
        body: values.content, // Make sure your Convex schema expects 'body' and not 'content'
      });
      form.reset(); // Clear the form after a successful post
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  }
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl"> {/* 👈 Fixed tracking-tigt typo */}
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader> 
        <CardContent>
          {/* 👈 Hooked up the onSubmit handler to react-hook-form */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input 
                      aria-invalid={fieldState.invalid}
                      placeholder="super cool title" 
                      {...field} 
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="super cool blog content" 
                      {...field} 
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* 👈 Added dynamic button states for safety during submission */}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Post"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
```

# CREATE SCHEMA FOR POSTS BUTTON 2:53
# ../convex/schema.ts
```javascript
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
export default defineSchema({
    posts: defineTable({
        title: v.string(),
        body: v.string(),
        authorId: v.string(),
    })
})
```
# DELETE TASKS FROM CONVEX TABELS (ON WEBSITE) AND FOLDER IN CONVEX 

#  FUNCTIONS - MUTATATIONS: WRITE DATA, QUERY: GET DATA ACTIONS: CALL SERVICES
# CREATE POSTS.TS -
# ../convex/posts.ts
```javascript
import { mutation } from "_generated/server";
import { v } from "convex/values";
// Create a new task with the given text
export const createPost = mutation({
    args: {
        title: v.string(),
        body: v.string(),
    },  
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("User not authenticated");
        }
        const blogArticle = await ctx.db.insert("posts", {
                title: args.title,
                body: args.body,
                authorId: user._id,
        });
        return blogArticle;
    },
})
```

# pnpm add better-auth@^1.6.11 UPGRADE 

# HAD TO RESET SECRET
# npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
# npx convex env set SITE_URL http://localhost:3000

# FIX CONVEXCLIENTPROVIDER
# ../components/web/ConvexClienProvider.tsx
```javascript
'"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";  
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!, {
  // Optionally pause queries until the user is authenticated
  expectAuth: true, // no user data if not authenticated
});
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient as any}>
      {children}
    </ConvexBetterAuthProvider>
  );
}
```
 When you log in via Better-Auth, the convexClient() plugin automatically intercepts your active session token. It then passes it directly into the <ConvexBetterAuthProvider> wrapper context.Once these updates are saved, your console statuses on your Create Post page should switch automatically to:Is Better-Auth Logged In?: trueIs Convex Client Synced?: true 

# ADD TOAST MESSAGE TO CREATE POSTS AND REDIRECT TO .
# ../app/(shared-layout)/create/page.tsx
```javascript
"use client";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { postSchema } from "@/app/schemas/blog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useConvexAuth } from "convex/react"; 
import { authClient } from "@/lib/auth-client"; 
import { z } from "zod";
import { useEffect } from "react";
import { useTransition } from "react";  // Import useTransition from React
import { Loader2 } from "lucide-react"; // Import the Loader2 icon from lucide-react
import { toast } from "sonner";// Import the toast function from sonner
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
type PostFormValues = z.infer<typeof postSchema>;
export default function CreateRoute() {
  const mutation = useMutation(api.posts.createPost);
  const router = useRouter();
  // 1. Get auth states to see what is failing
  const { data: session } = authClient.useSession();
  const { isAuthenticated } = useConvexAuth();
  const [isPending, startTransition] = useTransition(); // Initialize useTransition
  // 👈 Wrap this in a useEffect so it only prints ONCE when the status changes
  useEffect(() => {
    console.log("--- SYSTEM AUTH STATUS ---");
    console.log("Is Better-Auth Logged In?:", !!session);
    console.log("Is Convex Client Synced?:", isAuthenticated);
  }, [session, isAuthenticated]); 

  const form = useForm<PostFormValues>({ 
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
      image: undefined,
    },
  });
  const { isSubmitting } = form.formState;
   // Combine Hook Form's submission tracking with Next.js's 
   // transition router tracking
  const isLoading = isSubmitting || isPending;
  async function onSubmit(values: PostFormValues) {
    console.log("Form passed validation! Sending data to Convex...", values);
    try {
      // 1. Send data to Convex and wait for the server confirmation
      await mutation({
          body: values.content,
          title: values.title,
      });
      // 2. Trigger toast messaging immediately
      toast.success("Post created successfully!");
      form.reset(); // Reset the form after successful submission

       // 3. Keep the visual loading spinner active while Next.js finishes resolving the new page destination
      startTransition(() => {
        router.push("/");
        router.refresh();
      }); 
    } catch (error) {
      // 2. This CATCH block is critical. It resets the "Creating..." button if the server rejects it.
      console.error("Convex Server rejected the post:", error);
      alert("Error: Look at your browser console to see the backend message!");
    } 
  }
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader> 
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Zod Validation Failed:", errors);
              toast.error("Please fill out all required fields correctly.");
            })}
          >
            <FieldGroup className="gap-y-4">
               {/* Title Field */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input 
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter a catchy title" 
                      {...field} 
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* Content Body Field */}
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="Write your blog content here..." 
                      // rows={6}
                      {...field} 
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Post"}
              {/* Dynamic Submission Button */}
              <Button disabled = {isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {/* <span className="pl-2">Creating...</span>    */}
                    Publishing article...
                  </>
                ) : (
                  // <span>Create Post</span>
                  "Publish Post"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```
Correct Async Sequence: The code now blocks on await mutation(...) before entering the route 
transition block. This prevents asynchronous race conditions between the application state changes
and database state writes.Aggregated Loading States: Combined isSubmitting and isPending into a single 
isLoading value. The spinner icon stays running while Next.js fetches data for the index page 
route.Replaced alert(): Swapped the harsh browser popup alert out for clean, non-blocking toast.error 
messages inside both error catch conditions.Strict Controlled Forms: Connected explicit <Controller /> 
hooks for the input and text area properties mapped to match your schema setup.

# CREATED A PROTECED WRAPPER 
# implementation of your Shared ProtectedRoute Wrapper Layout so you can stop 
# copying and pasting authentication guards across all your secure views.
# app/components/authwrapper/protected-router.tsx
```javascript
"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  useEffect(() => {
    // Correct absolute public routing target path string 
    if (!isAuthLoading && !session) {
      toast.error("Please sign in to access this page.");
      router.push("/auth/login"); 
    }
  }, [session, isAuthLoading, router]);
  // Render a global loading skeleton while evaluating auth tokens
  if (isAuthLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Verifying security credentials...
        </p>
      </div>
    );
  }
  // Prevent secret children from building or flashing layout elements
  if (!session) return null;
  return <>{children}</>;
}
```
# WRAP CREATE ROUTE
# app/(shared-layout)/Create/page.tsx
```javascript
...
import { Loader2 } from "lucide-react"; // Import the Loader2 icon from lucide-react
import { toast } from "sonner";// Import the toast function from sonner
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { ProtectedRoute } from "@/components/authwrapper/protected-route";
type PostFormValues = z.infer<typeof postSchema>;
export default function CreateRoute() {
  const mutation = useMutation(api.posts.createPost);
  const router = useRouter();
  //const { data: session, isPending: isAuthLoading } = authClient.useSession();
  // const { isAuthenticated } = useConvexAuth();
  // const [isPending, startTransition] = useTransition(); // Initialize useTransition
 const [isPending, startTransition] = useTransition(); 
  // ✅ 2. Handle unauthorized protection redirection
  //useEffect(() => {
    // Wait until Better Auth finishes checking the cookie session status first
  //   if (!isAuthLoading && !session) {
  //     toast.error("Please sign in to access this page.");
  //     router.push("/auth/login"); // 👈 Redirect to your auth or login screen
  //   }
  // }, [session, isAuthLoading, router]);

  // // ✅ 3. Prevent rendering the form layout if authentication is missing or checking
  // if (isAuthLoading) {
  //   return (
  //     <div className="flex h-[50vh] w-full items-center justify-center">
  //       <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  //     </div>
  //   );
  // }
  // // Double safety guard check
  // if (!session) return null;
  const form = useForm<PostFormValues>({ 
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
      image: undefined,
    },
  });
  const { isSubmitting } = form.formState;
   // Combine Hook Form's submission tracking with Next.js's transition router tracking
  const isLoading = isSubmitting || isPending;
  async function onSubmit(values: PostFormValues) {
    console.log("Form passed validation! Sending data to Convex...", values);
    try {
      // 1. Await mutation
      await mutation({
          body: values.content,
          title: values.title,
      });
      // 2. Trigger toast messaging immediately
      toast.success("Post created successfully!");
      form.reset(); // Reset the form after successful submission
      // 3. Keep the visual loading spinner active while
      //    Next.js finishes resolving the new page destination
      //    Pause for 800ms so the user can easily read the toast message,
      //    then route them back to the index page.
       // then route them back to the index page.
      setTimeout(() => {
        startTransition(() => {
          router.push("/");
          router.refresh();
        });
      }, 800);
    } catch (error: any) {
      // 2. This CATCH block is critical. It resets the "Creating..."
      // button if the server rejects it.
      console.error("Convex Server rejected the post:", error);
      toast.error("Failed to save post.");
    } 
  }
  // ✅ Wrap the page JSX in the ProtectedRoute shell
  return (
    <ProtectedRoute>
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Create Post
          </h1>
          <p className="text-xl text-muted-foreground pt-4">
            Share your thoughts with the big world
          </p>
        </div>
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Create Blog Article</CardTitle>
            <CardDescription>Create a new blog article</CardDescription>
          </CardHeader> 
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                    console.log("Zod Validation Failed:", errors);
                    toast.error("Please fill out all required fields correctly.");
                  })}
            >
              <FieldGroup className="gap-y-4">
                {/* Title Field */}
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input 
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter a catchy title" 
                        {...field} 
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {/* Content Body Field */}
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Content</FieldLabel>
                      <Textarea
                        aria-invalid={fieldState.invalid}
                        placeholder="Write your blog content here..." 
                        rows={6}
                        {...field} 
                      />
                      {fieldState.invalid && ( <FieldError errors={[fieldState.error]} />)}
                    </Field>
                  )}
                />
                {/* Dynamic Submission Button */}
                <Button type="submit" disabled = {isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {/* <span className="pl-2">Creating...</span>    */}
                      Publishing article...
                    </>
                  ) : (
                    // <span>Create Post</span>
                    "Publish Post"
                  )}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute> 
  );
}
```


# SETTING UP A (protected) GROUP W/BACK BUTTON INSTEAD OF USING AUTHWRAPPER/PROTECTED-ROUTE ABOVE
# Setting up a Next.js Route Group is the cleanest way to handle authentication
# to to protect multiple views completely automatically without writing <ProtectedRoute> tags 
# on each page file, you can organize your routes into a Next.js Route Group. Move all your private 
# route subfolders inside a new folder structure named app/(protected)/layout.tsx. 
# By wrapping that group layout file in your protection checks, every page inside it becomes secure automatically.
# Parentheses around a directory name tell Next.js to omit that name from the final browser URL bar
# This will intercept all underlying routes,  run the Better-Auth token verification check,  handle redirects auto:
# app/(protected)/layout.tsx
```javascript
"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  useEffect(() => {
    if (!isAuthLoading && !session) {
      toast.error("Please sign in to access this page.");
      router.push("/auth/login");
    }
  }, [session, isAuthLoading, router]);
  // Keep a clean loading state visible while verifying security tokens
  if (isAuthLoading) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Verifying security credentials...
        </p>
      </div>
    );
  }
  // Prevent restricted interface elements from rendering during redirect handoff
  if (!session) return null;
  return (
    <div className="min-h-screen flex items-center justify-center relative w-full">
      {/* Absolute Back Button Layout Anchor */}
      <div className="absolute top-5 left-5 z-50">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          <ArrowLeft className="mr-2 size-4" />
          Go Back
        </Link>
      </div> 
      {/* Wrapped Page Views Content Container */}
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
```
# MOVE CREATE FOLDER AND FILES TO PROTECTED ROUTE
app/
├── (shared-layout)/
│   ├── layout.tsx         <-- Global navbar / sidebar shell
│   └── page.tsx           <-- Your main landing feed (resolves to ://domain.com)
├── (protected)/
│   ├── layout.tsx         <-- Better-Auth guard check from the previous step
│   └── create/
│       └── page.tsx       <-- Create Post view (resolves to ://domain.comcreate)
├── auth/
│   ├── login/
│   │   └── page.tsx       <-- Public login view (resolves to ://domain.comauth/login)
│   └── signup/
│       └── page.tsx       <-- Public signup view (resolves to ://domain.comauth/signup)
└── layout.tsx             <-- Root HTML/Body wrapper with your Sonner <Toaster />

# UPDATED/CLEAN UP CREATE ROUTE  REMOVE THAT components/authwrapper/protected-route 
# If you want to protect multiple views completely automatically without writing <ProtectedRoute>
# tags on each page file, you can organize your routes into a Next.js Route Group.
# Because the parent layout now completely manages route security checks, loading fallbacks, 
# & logins, you can strip out all wrapper tags & auth variables from  file to keep it readable/focused:
# app/(protected)/crate/page.tsx
 ```javascript
  "use client";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { postSchema } from "@/app/schemas/blog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react"; 
import { z } from "zod";
import { useTransition } from "react";  
import { Loader2 } from "lucide-react"; 
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 
type PostFormValues = z.infer<typeof postSchema>;
export default function CreateRoute() {
  const mutation = useMutation(api.posts.createPost);
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); 
  const form = useForm<PostFormValues>({ 
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
    },
  });
  const { isSubmitting } = form.formState;
  const isLoading = isSubmitting || isPending;
  async function onSubmit(values: PostFormValues) {
    try {
      await mutation({
        body: values.content,
        title: values.title,
      });
      toast.success("Post created successfully!");
      form.reset(); 
      setTimeout(() => {
        startTransition(() => {
          router.push("/");
          router.refresh();
        });
      }, 800);
    } catch (error) {
      console.error("Convex Server error:", error);
      toast.error("Failed to save post.");
    }
  }
  // ✅ Clean layout: No more explicit wrappers or tracking code needed here
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader> 
        <CardContent>
          <form 
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log("Zod Validation Failed:", errors);
              toast.error("Please fill out all required fields correctly.");
            })}
          >
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input placeholder="Enter a catchy title" aria-invalid={fieldState.invalid} {...field} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea placeholder="Write your blog content here..." rows={6} aria-invalid={fieldState.invalid} {...field} />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing article...
                  </>
                ) : (
                  "Publish Post"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
 ```

# IF VSCODE CRASHES CLEAR CORRUPTED REMOTE SERVER COODE
# rm -rf ~/.vscode-server
# reopen vscode OR/AND
# POWERSHELL
# Set-Service hns -StartupType Automatic
# Start-Service hns


# SERVER ACTIONS 3:10 MAKE SURE USER IS AUTHENTICATED
# app/actions.ts  TEST
```javascript
"use server"
export async function CreateBlogAction() {
    console.log("Hello from a server action")
}
```

# app/(protected)/create/page.tsx
```javascript
"use client";
...
import { CreateBlogAction } from "@/app/actions";
...
 async function onSubmit(values: PostFormValues) {
    try {
      // await mutation({
      //   body: values.content,
      //   title: values.title,
      // });
      console.log("This runs on the client side") 
      // Will show up in web developer tools
      // You also will get a message from the console.log of app/actions.ts
      // await CreateBlogAction()
      // form.reset(); 
      // You will get a message from the console.log of app/actions.ts
       setTimeout(() => {
        startTransition(async() => {
          // ROUTE HANDLER
          console.log("Hey this runs on the client side - ROUTE HANDLER")
          await fetch('@/api/create-blog', {
            method: "POST",
          })
          toast.success("Post created successfully!");
          router.push("/");
          router.refresh();
        });
      }, 800);
    } catch (error) {
  ...
```

# ROUTE HANDLERS allow you to create custom request handlers for a given route
# using the Web Request and Response APIs 3:15
# app/api/create-blog/route.ts
```javascript
import { createExhaustiveParamsProxy } from "next/dist/server/app-render/instant-validation/instant-samples";
import { NextResponse } from "next/server";
export async function POST() {
   console.log("Hello from the server -Route Handler") 
   return NextResponse.json({
    success: true
   })
}
```

# HAD TO UPDATE route.ts
# now reads JSON body, validates title and content
# calls fetchAuthMutation(api.posts.createPost, { title, body: content })
# returns success/error JSON
# app/api/create-blog/route.ts
```javascript
import { NextResponse } from "next/server";
import { fetchAuthMutation } from "@/lib/auth";
import { api } from "@/convex/_generated/api";
export async function POST(request: Request) {
  const body = await request.json();
  const { title, content } = body;

  if (typeof title !== "string" || typeof content !== "string") {
    return NextResponse.json(
      { success: false, error: "Missing title or content" },
      { status: 400 },
    );
  }
  try {
    const post = await fetchAuthMutation(api.posts.createPost, {
      title,
      body: content,
    });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
```
# page.tsx sends title and content as JSON to /api/create-blog
# throws non-ok response still navigates home on success
# app/(protected)/create/page.tsx
```javascript
...
form.reset(); 
      setTimeout(() => {
        startTransition(async() => {
          // ROUTE HANDLER
          console.log("Hey this runs on the client side - ROUTE HANDLER")
          const response = await fetch('/api/create-blog', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: values.title,
              content: values.content,
            }),
          });
          const result = await response.json();
          if (!response.ok || !result.success) {
            throw new Error(result.error || "Failed to create post");
          }
          toast.success("Post created successfully!");
          router.push("/");
          router.refresh();
        });
      }, 800);
    } catch (error) {
      console.error("Convex Server error:", error);
      toast.error("Failed to save post.");
    }
    ...
```

# SERVER ACTIONS REDO 3:21
# app/actions.ts
```javascript
"use server"
import { postSchema } from "@/schemas/blog";
import z from "zod";
import { fetchMutation } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
type PostFormValues = z.infer<typeof postSchema>;
export async function CreateBlogAction(values: PostFormValues) {
    const parsed = postSchema.safeParse(values);
    if (!parsed.success) {
        throw new Error("Something went wrong");
    }
    await fetchMutation(api.posts.createPost, {
        body: parsed.data.content,
        title: parsed.data.title,
    })
    redirect("/", "replace");
}
```
3:36

# FETCH DATA
# Queries from backend API fetch data from the db, check auth or perform other biz logic
# DEFINE A QUERY CONSTRUCTOR
# app/convex/posts.ts
```javascript
...
export const getPosts = query({
    args: {},
    handler: async (ctX) => {
        const posts = await ctX.db.query('posts').order('desc').collect();
        return posts;
    }
})
```

# CREATE ROUTE FOR BLOG
# app/(protected)/blog/page.tsx
```javascript
export default function BlogPage() {
    return <h1>Hello from bog page</h1>
}
```
# TEST 
# NOW FETCH DATA
# app/(protected)/blog/page.tsx
```javascript
"use client"
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react" // only works in cient
export default function BlogPage() {
    const posts = useQuery(api.posts.getPosts) 
    if (!posts) return <p>Loading...</p>;
    if (posts.length === 0) return <p>No posts yet.</p>;
    return (
        <div>
            <h1>hello from blog page</h1>
            <p>{posts[0].title}</p>
        </div> 
    )
}
```
# TEST AGAIN SHOULD SEE TITLE UNDER HELLO TEXT
# FINISH UI 3:56 RENDERING AN IMAGE 
# app/(protected)/blog/page.tsx
```javascript
"use client"
import { Card } from "@/components/ui/card";
import { api } from "@convex/_generated/api"
import { useQuery } from "convex/react" // only works in cient
import { Key } from "react";
export default function BlogPage() {
    const posts = useQuery(api.posts.getPosts) 
    if (!posts) return <p>Loading...</p>;
    if (posts.length === 0) return <p>No posts yet.</p>;
    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Our Blog
                </h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Insights, thoughts, and trends from our team.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">    
                {posts?.map((post: { _id: Key | null | undefined; }) => (
                    <Card key={post._id}>
                        <div>
                            <Image src="https://ix-marketing.imgix.net/bg-remove_after.png?auto=format,compress&w=688"
                             alt="" />
                        </div>
                    </Card>
                ))}
            </div>
        </div> 
    )
}
```
# TEST YOU WILL SEE A PHOTO FOR EVERY BLOG POSTS

# UPDATEnextconfig.ts TO ALLOW HOSTNAME, PROTOCOL AND PORT
```javascript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true, // 👈 Enable this line
    contentDispositionType: 'attachment', // Recommended  when enabling SVGs
    remotePatterns: [
      {
        hostname: 'ix-marketing.imgix.net',
        protocol: 'https',
        port: "",
      }
    ]
  }
};
export default nextConfig;
```

# UPDATE IMAGE PROPERTIES 4:10 NOW USING FILL W/RELATIVE AND FILL
# sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" to STP{ WARNING}
# # app/(protected)/blog/page.tsx
```javascript
...
<Card key={post._id}>
<div className="relative h-48 w-full overflow-hidden">
<Image src="https://ix-marketing.imgix.net/bg-remove_after.png?auto=format,compress&w=688"
   alt="image"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="rounded-t-lg"
/>
</div>                        
...    
```                    

# ERROR Property 'title' does not exist on type '{ _id: Key | null | undefined; }'.
# FIX IS app(portected)/blog/page.tsx
# Line 8 Remove import { key } from "react"
# Add import { Doc } from "convex/_generated/dataModel"
# "paths": {
#      "@convex_generated/*": ["./convex/_generated/*"]
#    }
#  },
# Line 27 Remove {posts?.map((post: { _id: key | null | undefined; }) => ()
# Add {posts?.map((post: Doc<"posts">) => (
 
 # RESTART TYPESCRIPT SERVER
 # pnpm exec convex dev

# ABOVE DIDN'T WORK FOR title doesn't exist HAD TO:
# The error happens because you typed the post object inline as { _id: Key | null | undefined; }, 
# which explicitly # tells TypeScript that _id is the only property that exists on a post.When
# you try to access post.title, TypeScript blocks it because title was not included in that 
# inline type definition.
# # # app/(protected)/blog/page.tsx
```javascript
...
 {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">    
                {posts?.map((post: { _id: Key | null | undefined; }) => ( */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">    
    {/* 2. Cast post as Doc<"posts"> (replace "posts" with your actual Convex table name) */}
```

# SETTING ONE LAYOUT FILE THAT IS STILL PROTECTED
# The update is straightforward: the protected layout will now wrap 
# pages with the navbar while preserving the auth redirect behavior.
# app/(protected)/layout.tsx
```javascript
"use client";
import { authClient } from "@lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@components/ui/button";
import Link from "next/link";
import { Navbar } from "../../components/web/navbar";
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  useEffect(() => {
    if (!isAuthLoading && !session) {
      toast.error("Please sign in to access this page.");
      router.push("/auth/login");
    }
  }, [session, isAuthLoading, router]);
  // Keep a clean loading state visible while verifying security tokens
  if (isAuthLoading) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Verifying security credentials...
        </p>
      </div>
    );
  }
  // Prevent restricted interface elements from rendering during redirect handoff
  if (!session) return null;
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="relative w-full">
        <div className="absolute left-5 top-5 z-50">
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Link>
        </div>
        <main className="mx-auto flex w-full max-w-7xl flex-col px-4 py-16 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

# UPDATING THEME FOR BLOG PAGE https://ui.shadcn.com/create
# APP SET WITH INTER (SANS FONT) GEIST MONO AS ALT
# COPY CODE FOR BLUE THEME FONT - INTER
# globals.css, delete root and dark only from your choice

# UPDATED TEXT ON HOVER FOR BLOG PAGE ALSO ADDED TEXT
# app/(protected)/blog/page.tsx
...
  <CardContent>
      <Link href={`/blog/${String(post._id)}`}>
          <h1 className="text-2xl font-bold transition-colors hover:text-primary">
              {post.title}
          </h1>
          </Link>
              <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                  </CardContent>
                  <CardFooter>
                    <Link className={buttonVariants({className: "w-full",})} href={`/blog/${post._id}`}>Read more
                    </Link> 
                  </CardFooter>
...


# INSTALLED POSTCSS LANGUAGE SUPPORT TO RID @theme warning
# INSTALLED TAIWIND CSS INTELLISENSE AS WELL

# NOW FETCH DATA ON SERVER SIDE USING FETCHQUERY 4:15
# NEXT GOES TO CONVEX A BACKEND SERVICE WITH OWN DB EXECUTES SERVER ()
# BUT NO REACTIVE BENEFIT THIS WAY JUST FETCH DATA AND RETURN IT UNLESS
# PRELOADING WHICH AUTO SUBSCRIBES TO DATA CHANGES
# app(protected)/blog/page.tsx
```javascript
// "use client"
...
// import { api } from "@convex/_generated/api"
// import { useQuery } from "convex/react" // only works in cient
import { fetchQuery } from "convex/nextjs";
...
export default async function BlogPage() {
    // const posts = useQuery(api.posts.getPosts) 
    const posts = await fetchQuery(api.posts.getPosts);
    if (!posts) return <p>Loading...</p>;
    if (posts.length === 0) return <p>No posts yet.</p>;
...
```

# FETCHING USING STREAMING 4:30
# app/(shared-layout)/blog/page.tsx
```javascript
export default async function BlogPage() {
    await new Promise((resolve) => setTimeout(resolve, 5000))
```
# ADD A LOADING PAGE - NOW IF YOU GO HOME THEN BLOG YOU WILL SEE LOADING
# app/(shared-layout)/blog/loading.tsx
```javascript
export default function LoadingBlog() {
    return (
        <h1 className="text-3xl font-bold text-red-500 p-10">Loading...</h1>
    )
}
```
# ERRORS#
# VSCODE KEEPS CRASHING TRIED THIS FIX in %USERPROFILE%/wslconfig
# Switch WSL to mirrored networking mode, which binds Linux directly 
# to your Windows network stack and bypasses the problematic virtual NAT switch.
[wsl2]
debugConsole=false
memory=4GB
swap=2GB
localhostForwarding=true
networkingMode=mirrored
ALSO
 opening VS Code from Windows PowerShell using code --disable-extensions to see if it stabilizes. If it stops disconnecting, check your AI extensions (like Claude, Copilot, or Cursor-like extensions) and ensure they aren't choking on giant files or monorepo structures in your dep0x folder.
 f you open Windows Task Manager right as VS Code disconnects, do you see Vmmem (the WSL process) spiking to 100% CPU or 100% Memory usage? Knowing this will pinpoint whether it's a resource issue or a network issue!
 The Fix: Try opening VS Code from Windows PowerShell using code --disable-extensions to see if it stabilizes. If it stops disconnecting, check your AI extensions (like Claude, Copilot, or Cursor-like extensions) and ensure they aren't choking on giant files or monorepo structures in your dep0x folder.


# NOW SUSPENSE WAY TO DISPLAY FALLBACK UNTIL ITS CHILDREN FINISH LOADING 4:32
# YOU'RE WRAPPING A COMPONENT IN A SUSPENSE BOUNDARY AND ADD A FALLBACK
# WE WILL DELETE app/(shared-layout)/blog/loading.tsx (MAKES THINGS MORE GRANULAR)
# app/(shared-layout)/blog/page.tsx
```javascript
export default async function BlogPage() {
    // await new Promise((resolve) => setTimeout(resolve, 5000)) 
    // // const posts = useQuery(api.posts.getPosts) 
    COMMENT OUT LINES ABOVE AND ADD TWO BOTTOM LoadBlogList()
// "use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Doc } from "@convex/_generated/dataModel";
// import { api } from "@convex/_generated/api"
// import { useQuery } from "convex/react" // only works in cient
import Image from "next/image";
import Link from "next/link";
import { Key, Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { resolve } from "path";
export default function BlogPage() {
    // await new Promise((resolve) => setTimeout(resolve, 5000)) 
    // // const posts = useQuery(api.posts.getPosts) 
    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Our Blog
                </h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Insights, thoughts, and trends from our team.
                </p>
            </div>
            {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">    
                {posts?.map((post: { _id: Key | null | undefined; }) => ( */}
            <Suspense 
              fallback={<p className="text-5xl text-red-500 px-10">Loading...</p>}
            >
                <LoadBlogList />
            </Suspense>
        </div> 
    )
}
async function  LoadBlogList() {
    ADDING A DELAY TO SHOW SUSPENSE/STREAMING
     await new Promise((resolve) => setTimeout(resolve, 5000)) 
     const data = await fetchQuery(api.posts.getPosts)   
     return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">    
            {/* 2. Cast post as Doc<"posts"> (replace "posts" with your actual Convex table name) */}
            {data?.map((post) => (    
                    <Card className="pt-0" key={post._id}>
                        <div className="relative h-48 w-full overflow-hidden">
...
```

# NOW LETS USE THE SKELETON API - WILL REPLACE BORING LOADING... TEXT 
# pnpm dlx shadcn@latest add skeleton 4:36
# app/(shared-layout)/blog/page.tsx
```javascript
// "use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Doc } from "@convex/_generated/dataModel";
// import { api } from "@convex/_generated/api"
// import { useQuery } from "convex/react" // only works in cient
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Key, Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { resolve } from "path";
export default function BlogPage() {
    // await new Promise((resolve) => setTimeout(resolve, 5000)) 
    // // const posts = useQuery(api.posts.getPosts) 
    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Our Blog
                </h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    Insights, thoughts, and trends from our team.
                </p>
            </div>
            {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">    
            {posts?.map((post: { _id: Key | null | undefined; }) => ( */}
            <Suspense
                fallback={<SkeletonLoadingUi />}>
                <LoadBlogList />
            </Suspense>
        </div>
    )
}
async function LoadBlogList() {
    // ADDING A DELAY TO SHOW SUSPENSE/STREAMING
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const data = await fetchQuery(api.posts.getPosts)
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 2. Cast post as Doc<"posts"> (replace "posts" with your actual Convediv className="flex flex-col space-y-3" key={i}></div>x table name) */}
            {data?.map((post) => (
                <Card className="pt-0" key={post._id}>
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image src="https://ix-marketing.imgix.net/footer-image.png?ixembed=1731958278380&auto=format,compress"
                            alt="image"
                            fill
                            loading="eager"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="rounded-t-lg"
                        />
                    </div>
                    <CardContent>
                        <Link href={`/blog/${String(post._id)}`}>
                            <h1 className="text-2xl font-bold transition-colors hover:text-primary">
                                {post.title}
                            </h1>
                        </Link>
                        <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                    </CardContent>
                    <CardFooter>
                        <Link className={buttonVariants({ className: "w-full" })} href={`/blog/${post._id}`}>Read more</Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
function SkeletonLoadingUi() {
    return (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
            {[
                ...Array(3)].map((_, i) => (
                    <div className="flex flex-col space-y-3" key={i}>
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="space-y-2 flex flex-col">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                ))
         }
        </div>
    )
}
...
```

# ALLOW USERS TO UPLOAD IMAGES 4:40
# 1. Generate an upload URL using a mutation that calls storage.generateUploadUrl()
# 2. Send a POST request with the file contents to the upload URL and recv storage ID
# 3. Save the storage ID into your data model via another mutation
# Client Request Upload -> NEXT generates API call -> Convex Get Presigned URL from
# storage -> Goest back to Convex -> Goes to Client -> Client uploads on client side

# UPDATE SCHEMA 4:45
# convex/schemas.ts
```javascript
...
imageStorageId: v.optional(v.id("_storage")),
    })
```

# STEP 1 Gen an upload URL using a mutation that calls storage.generateUploadUrl()
# convex/posts.ts
```javascript
...
// Step 1 to upload images
export const generateImageUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Not authenticated");
        }
        return await ctx.storage.generateUploadUrl();
    }
})
```

# STEP 2 Send POST req w/the file contents to the upload URL and recv storage ID
# app/actions.ts
```javascript
...
import { getToken } from "@lib/auth";
...
    const token = await getToken() 
    try { 
        // Check if image exists before using it
        if (parsed.data.image) {
            const imageUrl = await fetchMutation(
                api.posts.generateImageUploadUrl,
                {},
                { token }
            )
            const uploadResult = await fetch(imageUrl, {
                method: "POST",
                headers: {
                    "Content-Type": parsed.data.image.type
                },
                body: parsed.data.image,
            })
        }
    } catch {}  
    if (!parsed.success) {
        throw new Error("Something went wrong");
    }
    await fetchMutation(api.posts.createPost, {
        body: parsed.data.content,
        title: parsed.data.title,
    },{ token }
...
```

# app.(protected)/create/page.tsx 4:53
```javascript
...
 const form = useForm<PostFormValues>({ 
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      title: "",
      image: undefined,
...
    <Controller
      name="image"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
        <FieldLabel>image</FieldLabel>
        <Input
          placeholder="Choose an image..."
          aria-invalid={fieldState.invalid}
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
              field.onChange(file);
            }}
         /> 
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
```
Moved redirect() Outside Try/Catch: Next.js redirect() works by throwing a specific 
internal route error (NEXT_REDIRECT). If you place it inside a generic try/catch block, your 
empty catch {} will intercept the redirect, silence it, and break your page routing.
Fixed Extraneous Imports: Removed import { useForm } from "react-hook-form". React Hook Form is a 
client-side state machine. It has no business being inside a "use server" module file.
Fixed Broken Logic and Missing Brackets: Original snippet opened a block for image uploads, but 
accidentally nested the final createPost mutation entirely inside that if (parsed.data.image) block. 
Posts without images would have never saved to your database. Safe Error Feedback: Swapped generic 
runtime errors (throw new Error) with clean object returns (return { error: "..." }). Server actions 
should safely return error states to the UI so users don't face a crashed white-screen app.
# app/actions.ts
```javascript
"use server"
import { postSchema } from "@schemas/blog";
import z from "zod";
import { fetchMutation } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { getToken } from "@lib/auth";
type PostFormValues = z.infer<typeof postSchema>;
export async function CreateBlogAction(values: PostFormValues) {
  // 1. Fail early if validation fails
  const parsed = postSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid form data fields provided." };
  }
  try {
    const token = await getToken();
    let storageId: string | undefined;
    // 2. Handle image upload if a file exists
    if (parsed.data.image) {
      const imageUrl = await fetchMutation(api.posts.generateImageUploadUrl, {}, { token });
      const uploadResult = await fetch(imageUrl, {
        method: "POST",
        headers: { "Content-Type": parsed.data.image.type },
        body: parsed.data.image,
      });
      if (!uploadResult.ok) {
        return { error: "Failed to upload image to storage provider." };
      }
      const data = await uploadResult.json();
      storageId = data.storageId;
    }
    // 3. Create the post (Passing storageId if it exists)
    await fetchMutation(
      api.posts.createPost,
      {
        title: parsed.data.title,
        body: parsed.data.content,
        // imageStorageId: storageId, // <- Ensure your mutation accepts this!
      },
      { token }
    );
  } catch (error) {
    // 4. Log the real issue for debugging, but don't leak details to client
    console.error("Blog creation failed:", error);
    return { error: "An unexpected error occurred while creating your post." };
  }
  // 5. Next.js redirects MUST happen outside the try/catch block
  redirect("/blog");
}
```

# UPDATE CREATE POSTS ARGUMENTS
# convex/posts.ts
```javascript
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
export const searchPosts = query({
    args: {
        term: v.string(),
        limit: v.number(),
    },
    handler: async (ctx, args) => {
        const normalizedTerm = args.term.trim().toLowerCase();
        if (!normalizedTerm) {
            return [];
        }
        const posts = await ctx.db.query("posts").collect();
        return posts
            .filter((post) => {
                const searchableText = `${post.title} ${post.body}`.toLowerCase();
                return searchableText.includes(normalizedTerm);
            })
            .slice(0, args.limit)
            .map((post) => ({
                _id: post._id,
                title: post.title,
                body: post.body,
                // creationTime: post_creationTime,
            }));
    },
});
// Create a new blog article with the given title and body.
export const createPost = mutation({
    args: {
        title: v.string(),
        body: v.string(),
        // optional storage id validation
        imageStorageId: v.optional(v.id("_storage"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const user = identity ? await authComponent.safeGetAuthUser(ctx) : undefined;

        if (!identity || !user) {
            throw new ConvexError("User not authenticated");
        }

        const blogArticle = await ctx.db.insert("posts", {
            title: args.title,
            body: args.body,
            authorId: user?._id,
            imageStorageId:  args.imageStoreageId

        });

        return blogArticle;
    },
});
export const clearPosts = mutation({
 // args: {title: v.string(), body: v.string(), imageStorageId: v.id("_storage")},
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    for (const post of posts) {
      await ctx.db.delete(post._id);
    }
    return { deleted: posts.length };
  },
});
export const getPosts = query({
    args: {},
    handler: async (ctX) => {
        const posts = await ctX.db.query('posts').order('desc').collect();
        return posts;
    }
})
// Step 1 to upload images
export const generateImageUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Not authenticated");
        }
        return await ctx.storage.generateUploadUrl();
    }
})
```

# FIX FOR ERROR (property) imageStorageId?: Id<"_storage"> | undefined: 
# app/actions.ts
# // 1. IMPORT THE ID TYPE FROM CONVEX
# import { Id } from "@convex/_generated/dataModel";
# // 2. UPDATE TYPE TO EXPECT THE CONVEX STORAGE ID
#    let storageId: Id<"_storage"> | undefined;
```javascript
...
import { getToken } from "@lib/auth";
// 1. IMPORT THE ID TYPE FROM CONVEX
import { Id } from "@convex/_generated/dataModel";
// type PostFormValues = z.infer<typeof postSchema>;
// export async function CreateBlogAction(values: PostFormValues) {
//   // 1. Fail early if validation fails
//   const parsed = postSchema.safeParse(values);
//   if (!parsed.success) {
//     return { error: "Invalid form data fields provided." };
//   }
  export async function CreateBlogAction(formData: FormData) {
  // Extract values from FormData
  const rawValues = {
    title: formData.get("title"),
    content: formData.get("content"),
    image: formData.get("image"), // This will now correctly be a File object
  };
 // 1.Safely parse with your Zod schema  Fail early if validation fails
  const parsed = postSchema.safeParse(rawValues);
  if (!parsed.success) {
    return { error: "Invalid form data fields provided." };
  }
  try {
    const token = await getToken();
     let storageId: Id<"_storage"> | undefined;
    // 2. Handle image upload URL from Convex if a file exists
    if (parsed.data.image  && parsed.data.image.size > 0) {
      const file = parsed.data.image; // Type: File
      const imageUrl = await fetchMutation(api.posts.generateImageUploadUrl, {}, { token });
       // Upload the raw binary stream
      const uploadResult = await fetch(imageUrl, {
        method: "POST",
        // headers: { "Content-Type": parsed.data.image.type },
        // body: parsed.data.image,
        headers: { "Content-Type": file.type },
        body: file, // Works perfectly now because it's a real File instance
      });
      if (!uploadResult.ok) {
        return { error: "Failed to upload image to storage provider." };
      }
      const data = await uploadResult.json();
      storageId = data.storageId as Id<"_storage">;
    }
    // 3. Create the post (Passing storageId if it exists)
    await fetchMutation(
    ...
```

# HAD TO UPDATE POST FORM FILE
# You need to replace your fetch logic inside onSubmit to use FormData. 
# This will bundle the text inputs and the raw file together so your server can read it.
# app/(created)/create/page.tsx
```javascript
...
async function onSubmit(values: PostFormValues) {
  try {
    // 1. Create a FormData instance instead of an object
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    // 2. Append the file safely if it exists
    if (values.image) {
      formData.append("image", values.image);
    }
  form.reset()
   startTransition(async() => {
          // Send the FormData  to ROUTE HANDLER
          console.log("This runs on the client side - ROUTE HANDLER")
          const response = await fetch('/api/create-blog', {
            method: "POST",
            body: formData,
          });
```

Since you are calling fetch('/api/create-blog') from this form, you are using 
a Route Handler instead of the Server Action (CreateBlogAction).
You need to make sure your API route file—likely located at 
# app/api/create-blog/route.ts — is also ready to read FormData instead of req.json().
Here is why the image wasn't reaching your Convex database: your route handler is 
strictly parsing the incoming request as raw JSON string data via await request.json().
Because your frontend form is now sending a multipart FormData container holding 
the binary image file, parsing it as standard JSON will throw a runtime exception.
The Fix:
You need to update your route handler file (app/api/create-blog/route.ts) to read 
the data using request.formData(). Then, execute your Convex file upload logic 
sequentially right inside this route block before passing the final storageId 
into your createPost mutation.
# app/api/create-blog/route.ts
```javascript
...
import { Id } from "@/convex/_generated/dataModel";
export async function POST(request: Request) {
  try {
    // 1. Read request payload as FormData instead of JSON
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const imageFile = formData.get("image") as File | null;
    // Validate your text fields
    if (typeof title !== "string" || typeof content !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing title or content" },
        { status: 400 },
      );
    }
    let storageId: Id<"_storage"> | undefined;
    // 2. Handle image upload if a valid binary file exists
    if (imageFile && imageFile.size > 0) {
       // Get the single-use upload endpoint string from Convex
       const uploadUrl = await fetchAuthMutation(api.posts.generateImageUploadUrl, {});
      // Stream the binary payload directly into Convex Storage
      const uploadResult = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": imageFile.type },
        body: imageFile,
      });
      if (!uploadResult.ok) {
        return NextResponse.json(
          { success: false, error: "Failed to upload file to storage" },
          { status: 500 },
        );
      }
      // Extract and strongly cast the unique storage identity reference
      const data = await uploadResult.json();
      storageId = data.storageId as Id<"_storage">;
    }
    // 3. Persist the final document to your Convex Database
    const post = await fetchAuthMutation(api.posts.createPost, {
      title,
      body: content,
      imageStorageId: storageId, // This field maps to your schema layout
    });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
```

Because your Route Handler defines the input parameters with the standard 
web standard Request type, TypeScript throws a compilation type error when 
you try to pass it to the library.The FixOpen your API Route Handler file 
(app/api/create-blog/route.ts) and change the imported request type parameter 
from Request to NextRequest.Here is exactly how to clean up your file to fix 
the type mismatch instantly:


# TEST AND CHECK FOR FILES ON CONVEX WEB PAGE 5:00
# FETCH IMAGE - RETURN URLs ALONG WITH OTHER DATA FROM QUERIES A MUTATIONS
#
# open your next.config.js file and enable dangerouslyAllowSVG:javascript
# convex/posts.ts
```javascript
...

export const getPosts = query({
    args: {},
    handler: async (ctX) => {
        const posts = await ctX.db.query('posts').order('desc').collect();
        return await Promise.all(
            posts.map(async (post) => {
                const resolvedImageUrl = post.imageStorageId !== undefined ?
                await ctX.storage.getUrl(post.imageStorageId) : null
                return {
                    ...post,
                    imageUrl: resolvedImageUrl,
                }
            })
        )
        return posts;
    }
})
```

# NOW WE CAN UPDATE THE IMAGE URL WITH post.imageUrl in blog/page.tsx
# app/(shared-layout)/blog/page.tsx
```javascript
...
                <Card className="pt-0" key={post._id}>
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                            src={post.imageUrl ?? 
                                "https://ix-marketing.imgix.net/footer-image.png?ixembed=1731958278380&auto=format,compress"
                            }
                            alt="image"
                            fill
...
```

# WHITE LIST  ANY WEBSITES IN next.config.js

# FIX IMAGE PLACE HOLDER IN BLOG PAGE BY CHANGE ?? TO ||
# app/(chared-layout)/blog/page.tsx
...
export default function BlogPage() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
 #                           
 # Add the users table to your schema file so that the 
 # authorId: v.id("user") field has a valid table to reference.
 # convex/schema.ts
```javascript
 ...
  // authorId: v.string(),
        authorId: v.id("user), // Connects posts directly to their creator
        imageStorageId: v.optional(v.id("_storage")),
    }),
   ble to handle user registration data
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(), // Matches external auth identifiers (like Clerk/Auth0)
  }).index("by_token", ["tokenIdentifier"]), // Speeds up user lookup queries
}); 
```

# CREATED A SEARCH BAR
Index Queries: The user schema includes an index pattern ["tokenIdentifier"]. 
This makes auth checks inside your server execution blocks lightning fast instead 
of forcing the engine to scan the entire data collection.Network Throttling: T
he debouncer prevents hitting your database cluster layout on every character 
keypress, safeguarding your usage metrics.
# components/ui/blog-search-bar.tsx
```javascript
"use client";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
export function BlogSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  // Debounce logic: delays network requests until typing pauses for 300ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  // Hook handles active state querying automatically 
  const results = useQuery(
    api.posts.searchPosts,
    debouncedTerm ? { term: debouncedTerm, limit: 5 } : "skip"
  );
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <Input
        type="search"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      {/* Floating search dropdown panel */}
      {searchTerm && results && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground border rounded-md shadow-lg z-50 overflow-hidden">
          {results.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post._id}`}
              className="flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b last:border-0"
            >
              {post.imageUrl && (
                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="overflow-hidden">
                <h4 className="font-semibold truncate text-sm">{post.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{post.body}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```
# UPDATE BLOG PAGE LAYOUT FOR SEARCHBAR
# app.(shared-layout)/blog/page.tsx
```javascript
...
export function BlogSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
...
{/* ADDED: Mounted search engine directly into layout flow */}
      <div className="pb-8">
        <BlogSearchBar />
      </div>

      <Suspense fallback={<SkeletonLoadingUi />}>
        <LoadBlogList />
      </Suspense>

```

# CACHING 5:05
# Static Rendering - routes are rendered at build time or in bckgrd after revalidation/Full Rute Cche
# Dynamic Rendering - Done at request time
# pnpm run build - Create local build you will see items listed 0 means static f means dynamic

# ROUTE SEGMENT OPTIONS - allow you to configure layout behavior 
# AUTO (default) cache as much as possible  w/out preventing components opting to dynamic behavior
# FORCE DYNAMIC - routes rendered at request time
# ERROR - forces static rendering and cache the data of a layout or page by causing an error
# FORCE STATIC - rendering + cache data  by forcing cookies, headers() + useSearchParams() to empty values 5:17
# EXAMPLE:
# app/(shared-layout)/blog/page.ts
```javascript
...
import { BlogSearchBar } from "@/components/ui/blog-search-bar"; 
...
export const dynamic = "force-static"; (would have to rebuild the app pnpm run dev)
export const revalidate = 20; (after 20 seconds)
```
# But no fresh data until apps is rebuilt or revalidated
# REVALIDATE: TIME BASED = export const revalidate = 30;
#             EVENT BASED = revalidatepath("/blog") need to import { revalidatePAth } from "next/navigaton"


# ADD DYNAMIC ROUTE FILE SO READ MORE BUTTON WORKS 5:27
# app/blog/[id]/page.tsx
```javascript
// import { fetchQuery } from "convex/nextjs";
// import { api } from "@/convex/_generated/api";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
// import { Id } from "@/convex/_generated/dataModel";
// interface PostPageProps {
//   params: Promise<{ id: string }>;
// }
// export default async function BlogPostPage({ params }: PostPageProps) {
//   const resolvedParams = await params;
//   try {
//     // Safely cast string param to Convex database ID layout
//     const post = await fetchQuery(api.posts.getPostById, { 
//       id: resolvedParams.id as Id<"posts"> 
//     });
//     if (!post) {
//       notFound();
//     }
//     const imgSource = post.imageUrl || "https://imgix.net";
//     return (
//       <article className="container mx-auto max-w-3xl px-4 py-12">
//         <Link href="/blog" className={buttonVariants({ variant: "ghost", className: "mb-6" })}>
//           ← Back to blogs
//         </Link>
//         <h1 className="text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
//         <div className="relative w-full h-96 my-6 rounded-xl overflow-hidden bg-muted">
//           <Image
//             src={imgSource}
//             alt={post.title}
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>
//         <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-lg leading-relaxed mt-6">
//           {post.body}
//         </div>
//       </article>
//     );
//   } catch (error) {
//     console.error(error);
//     notFound();
//   }
// }
```
# REDO ABOVE 5:27
# app/blog/[id]/page.tsx
```javascript
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

interface PostIdRouteProps {
  params: Promise<{ postId: Id<"posts"> }>
}

export default async function PostIdRoute ({ params }: PostIdRouteProps) {
  const { postId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId: postId })
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
        <ArrowLeft className="size-4" />
          Back to blog
      </Link>
        <div className="relative w-full h-100 mb-8 rounded-xl overflow-hidden shadow-sm">
          <Image />
        </div>
    </div>
  )
}

```
# ADD getPostByID TO MAKE IMAGE IN [postId] page work
# convex/post.ts
```javascript
export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    // if (!post) return null;
    // const imageUrl = post.imageStorageId 
    //   ? await ctx.storage.getUrl(post.imageStorageId) 
    //   : null;
    // return {
    //   ...post,
    //   imageUrl,
    // };
    const resolvedImageUrl = 
      post?.imageStorageId !== undefined ? 
      await ctx.storage.getUrl(post.imageStorageId) : null;
    return {
      ...post,
      imageUrl: resolvedImageUrl
    }
  },
});
 
```

# ADD SHADCN SEPARATOR COMPONENT
# pnpm dlx shadcn@latest add separator

# UPDATED app/blog/[id]/page.tsx  
```javascript
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { notFound } from "next/navigation";
interface PostIdRouteProps { params: Promise<{ postId: Id<'posts'>}> }
export default async function PostIdRoute ({ params }: PostIdRouteProps) {
  const { postId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId: postId });
  // Handle case where post is not found or has no title
  if (!post || !post.title) {
    notFound();
  }
  // Define the missing imgSource variable
  const imgSource = post.imageUrl || 
    "https://ix-marketing.imgix.net/footer-image.png?ixembed=1731958278380&auto=format,compress";
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link className={buttonVariants({ variant: "ghost", className: "mb-6" })} href="/blog">
        <ArrowLeft className="mr-2 size-4" />
        Back to blog
      </Link>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
      <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden shadow-sm bg-muted">
        <Image 
          src={imgSource}
          alt={post.title || "Blog post image"}
          fill
          className="object-cover"
          priority
        />
      </div>
      <Separator className="my-8" />
      <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-lg leading-relaxed mt-6">
        {post.body}
      </div>
       <Separator className="my-8" />
      <p className="text-sm text-muted-foreground">
        Posted on: {new Date(post._creationTime).toLocaleDateString("en-US")}
      </p>
    </div>
  );
}
```
By updating the Convex query to return null when a post doesn't exist, TypeScript is
now able to guarantee that post._creationTime is a number at the point of rendering, 
resolving the compilation error. Also added separator lines.
# convex/posts.ts
```javascript
...
export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return null;
    const resolvedImageUrl = post.imageStorageId 
      ? await ctx.storage.getUrl(post.imageStorageId) 
      : null;
    return {
      ...post,
      imageUrl: resolvedImageUrl
    };
  },
});

```
