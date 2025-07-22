"use client"

import { useState } from "react"
import { Menu, X, Sparkles, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold gradient-text bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CleanPro
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <a
            href="tel:+234-800-CLEAN-NOW"
            className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            <span>+234-800-CLEAN-NOW</span>
          </a>
          <Button className="cleaning-gradient text-white">Book Now</Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden",
          mobileMenuOpen
            ? "fixed inset-x-0 top-16 z-50 border-b bg-background px-6 pb-6 shadow-lg"
            : "hidden"
        )}
      >
        <div className="space-y-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-base font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="space-y-3 pt-4">
            <a
              href="tel:+234-800-CLEAN-NOW"
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              <span>+234-800-CLEAN-NOW</span>
            </a>
            <Button className="w-full cleaning-gradient text-white">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}