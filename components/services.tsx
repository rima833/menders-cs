"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, HardHat, PartyPopper, Building2 } from "lucide-react"
import { useForm } from "./form-provider"

const services = [
  {
    icon: Home,
    title: "Home Cleaning",
    description: "Regular, deep, and move-in/move-out cleaning",
    features: ["Weekly/Monthly schedules", "Deep cleaning sessions", "Move-in/out specials"],
  },
  {
    icon: HardHat,
    title: "Post-Construction Cleaning",
    description: "We'll take care of the mess so you can enjoy your new space",
    features: ["Dust removal", "Debris cleanup", "Final polish"],
  },
  {
    icon: PartyPopper,
    title: "Event & After-Party Cleaning",
    description: "Before, during, or after your event, we've got it covered",
    features: ["Pre-event setup", "During event maintenance", "Post-event cleanup"],
  },
  {
    icon: Building2,
    title: "Office & Boutique Cleaning",
    description: "Small business? We'll keep your space fresh, neat, and client-ready",
    features: ["Daily maintenance", "Weekly deep cleans", "Client-ready spaces"],
  },
]

export function Services() {
  const { openCustomQuoteModal } = useForm()

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900 dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">🧽 Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From homes to offices, events to construction sites - we handle it all with professional care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 border-border"
            >
              <CardHeader className="text-center">
                <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">Need something custom? Let's talk.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={openCustomQuoteModal}>
            Get Custom Quote
          </Button>
        </div>
      </div>
    </section>
  )
}
