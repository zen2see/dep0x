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
{
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

# CREATE A DYNAMIC ROUTE
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
30:40
