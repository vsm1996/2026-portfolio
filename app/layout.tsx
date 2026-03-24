import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { createRengeTheme } from "@renge-ui/tokens"
import "./globals.css"

const rengeTheme = createRengeTheme({
  profile: "twilight",
  mode: "dark",
  baseUnit: 4,
  typeBase: 16,
  scaleRatio: 1.618,
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vanessa Martin - Frontend Architect & Systems Builder",
  description: "Software engineer specializing in building exceptional digital experiences",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Renge design system tokens — spacing, typography, motion, radius */}
        <style dangerouslySetInnerHTML={{ __html: rengeTheme.css }} />
      </head>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
