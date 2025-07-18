"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Phone, Instagram } from "lucide-react"
import { useForm } from "./form-provider"

export function Hero() {
  const { openFreeCleanModal, openCallRequestModal } = useForm()

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 dark-transition">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-6xl">🧼</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Menders Cleaning Services</h1>
          <p className="text-2xl md:text-3xl text-primary font-semibold mb-8">
            Fixing Your Space. Refreshing Your World.
          </p>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We don't just clean, we mend. Bringing comfort, hygiene, and shine back to your space in Abuja and Lagos
            with professional, trained teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4" onClick={openFreeCleanModal}>
              🎉 Get Free Mini Clean
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-border hover:bg-accent bg-transparent"
              onClick={openCallRequestModal}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Abuja & Lagos
            </div>
            <div className="flex items-center">
              <Instagram className="mr-2 h-4 w-4" />
              @menderscleaning
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
