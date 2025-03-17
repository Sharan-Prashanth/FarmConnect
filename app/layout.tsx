import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Leaf } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AgriContract - Contract Farming Platform",
  description: "A platform connecting farmers and buyers through assured contract farming agreements",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center gap-2 mr-6">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="hidden font-bold sm:inline-block">AgriContract</span>
                </Link>
                <MainNav />
                <div className="ml-auto flex items-center gap-2">
                  <ModeToggle />
                  <UserNav />
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2025 AgriContract. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                    Terms
                  </Link>
                  <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                    Privacy
                  </Link>
                  <Link href="/contact-us" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                    Contact
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

