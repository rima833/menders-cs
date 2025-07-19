import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FormProvider } from "@/components/form-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Menders Cleaning Services - Professional Cleaning in Nigeria",
  description:
    "Professional cleaning services in Lagos, Abuja, and across Nigeria. Residential, commercial, and specialized cleaning solutions.",
  keywords:
    "cleaning services, Nigeria, Lagos, Abuja, professional cleaning, residential cleaning, commercial cleaning",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <FormProvider>
            {children}
            <Toaster />
          </FormProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
