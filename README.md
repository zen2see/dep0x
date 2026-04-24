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

# CREATE SEPERATE LAYOT FOLDERS IF NEEDED - LETS DO ABC FOLDER
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
pnpm dlx shadcn@latest init