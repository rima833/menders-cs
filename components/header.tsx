"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border dark-transition">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/menders-logo.png"
              alt="Menders Cleaning Services"
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">Menders</span>
              <span className="text-xs text-muted-foreground -mt-1 animate-pulse">Cleaning Services</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              Why Us
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <ThemeToggle />
            <Button className="bg-primary hover:bg-primary/90">Book Free Clean</Button>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 dark-transition">
            <div className="flex flex-col space-y-4">
              <Link href="#services" className="text-muted-foreground hover:text-primary">
                Services
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-primary">
                Why Us
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
              <div className="flex justify-between items-center">
                <ThemeToggle />
                <Button className="bg-primary hover:bg-primary/90 flex-1 ml-4">Book Free Clean</Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
