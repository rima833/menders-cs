"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Star } from "lucide-react"
import { useForm } from "./form-provider"

export function PartnersDisplay() {
  const { partners } = useForm()

  if (partners.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">🏢 Our Trusted Partners</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're proud to work with these amazing businesses across Abuja and Lagos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <Card
              key={partner.id}
              className="hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-border"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{partner.name}</CardTitle>
                <Badge variant="secondary" className="w-fit mx-auto">
                  {partner.type}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-4">{partner.description}</p>
                <div className="flex justify-center items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">Verified Partner</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">Want to join our partner network?</p>
          <p className="text-sm text-muted-foreground">
            We're always looking for quality businesses to collaborate with.
          </p>
        </div>
      </div>
    </section>
  )
}
