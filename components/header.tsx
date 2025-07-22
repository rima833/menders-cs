"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, Phone, MapPin, Clock, Star } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useForm } from "@/components/form-provider"
import { NotificationCenter } from "@/components/notification-center"

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
  { name: "Gallery", href: "#gallery" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { openModal } = useForm()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Lagos & Abuja</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat: 8AM-6PM</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-blue-100 hover:bg-blue-700"
              onClick={() => openModal("call")}
            >
              <Phone className="w-4 h-4 mr-1" />
              +234-800-MENDERS
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="/placeholder-logo.svg" alt="Menders Cleaning" className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold text-blue-600">Menders</h1>
                <p className="text-xs text-muted-foreground -mt-1">Cleaning Services</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Free Quote
              </Badge>
              <Button variant="outline" size="sm" onClick={() => openModal("quote")}>
                Get Quote
              </Button>
              <Button size="sm" onClick={() => openModal("book")} className="bg-blue-600 hover:bg-blue-700">
                Book Now
              </Button>
              <NotificationCenter />
              <ThemeToggle />
            </div>

            {/* Mobile Menu */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-6 mt-6">
                    {/* Mobile Logo */}
                    <div className="flex items-center space-x-2 pb-4 border-b">
                      <img src="/placeholder-logo.svg" alt="Menders Cleaning" className="h-8 w-8" />
                      <div>
                        <h1 className="text-xl font-bold text-blue-600">Menders</h1>
                        <p className="text-xs text-muted-foreground -mt-1">Cleaning Services</p>
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-4">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          className="text-left text-lg font-medium transition-colors hover:text-blue-600"
                        >
                          {item.name}
                        </button>
                      ))}
                    </nav>

                    {/* Mobile Actions */}
                    <div className="flex flex-col space-y-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          openModal("quote")
                          setIsOpen(false)
                        }}
                      >
                        Get Free Quote
                      </Button>
                      <Button
                        onClick={() => {
                          openModal("book")
                          setIsOpen(false)
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Book Service Now
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          openModal("call")
                          setIsOpen(false)
                        }}
                        className="text-blue-600"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call +234-800-MENDERS
                      </Button>
                    </div>

                    {/* Contact Info */}
                    <div className="pt-4 border-t text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>Serving Lagos & Abuja</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Mon-Sat: 8:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
