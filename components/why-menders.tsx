import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, DollarSign, Leaf } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Dual-City Advantage",
    description:
      "We operate in both Abuja and Lagos, ensuring consistent service quality across Nigeria's busiest cities.",
  },
  {
    icon: Users,
    title: "Reliable and Professional Teams",
    description:
      "Trained on-demand cleaners, coordinated by experienced local managers who understand your city's unique needs.",
  },
  {
    icon: DollarSign,
    title: "Flexible and Transparent Pricing",
    description: "Choose from hourly, per-room, or square footage plans. No hidden fees—just clean, clear service.",
  },
  {
    icon: Leaf,
    title: "Sustainable Cleaning",
    description: "Eco-cleaning options for homes and businesses that prioritise safety and environmental care.",
  },
]

export function WhyMenders() {
  return (
    <section id="about" className="py-20 bg-background dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">🌆 Why Menders?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're not just another cleaning service. Here's what makes us different.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-xl transition-all duration-300 dark:hover:shadow-2xl dark:hover:shadow-primary/10"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <feature.icon className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">✅ {feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
