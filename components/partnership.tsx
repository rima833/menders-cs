"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Handshake, Building, Calendar, Home } from "lucide-react"
import { useForm } from "./form-provider"

const partnerTypes = [
  {
    icon: Building,
    title: "Property Managers",
    description: "Bulk cleaning for multiple properties",
  },
  {
    icon: Calendar,
    title: "Event Planners",
    description: "Pre and post-event cleaning services",
  },
  {
    icon: Home,
    title: "Real Estate Agents",
    description: "Move-in/out and staging cleaning",
  },
]

export function Partnership() {
  const { openPartnerModal } = useForm()

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">🤝 Partner With Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Are you a property manager, event planner, or real estate agent? Let's collaborate with exclusive rates and
            bundle deals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {partnerTypes.map((partner, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 border-border"
            >
              <CardHeader>
                <partner.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-foreground">{partner.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={openPartnerModal}>
            <Handshake className="mr-2 h-5 w-5" />📩 Become a Partner
          </Button>
        </div>
      </div>
    </section>
  )
}
