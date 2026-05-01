'use client'

import * as React from 'react'
import { ThemeProvider as NextThhemesProvider } from 'next-themes'

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThhemesProvider>) {
    return <NextThhemesProvider {...props}>{children}</NextThhemesProvider>
}