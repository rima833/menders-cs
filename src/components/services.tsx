import { Home, Building2, Sparkles, Wrench, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Complete home cleaning service including all rooms, bathrooms, and kitchen",
    features: [
      "Deep cleaning of all surfaces",
      "Kitchen and bathroom sanitization",
      "Floor cleaning and mopping",
      "Dusting and organizing",
      "Trash removal"
    ],
    price: 15000,
    duration: "2-4 hours",
    popular: false
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Professional office and business space cleaning for a productive environment",
    features: [
      "Office desk and workspace cleaning",
      "Conference room sanitization", 
      "Restroom deep cleaning",
      "Floor maintenance",
      "Window cleaning"
    ],
    price: 25000,
    duration: "3-6 hours",
    popular: true
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Intensive cleaning service for move-ins, move-outs, or seasonal cleaning",
    features: [
      "Detailed cleaning of all areas",
      "Cabinet and appliance cleaning",
      "Light fixture cleaning",
      "Baseboard and trim cleaning",
      "Carpet deep cleaning"
    ],
    price: 35000,
    duration: "4-8 hours",
    popular: false
  },
  {
    icon: Wrench,
    title: "Post-Construction",
    description: "Specialized cleaning after renovation or construction work",
    features: [
      "Debris and dust removal",
      "Window and surface cleaning", 
      "Floor cleaning and polishing",
      "Paint splatter removal",
      "Final touch-up cleaning"
    ],
    price: 45000,
    duration: "6-10 hours",
    popular: false
  },
  {
    icon: Calendar,
    title: "Regular Maintenance",
    description: "Scheduled weekly, bi-weekly, or monthly cleaning service",
    features: [
      "Customized cleaning schedule",
      "Consistent quality assurance",
      "Priority booking",
      "Discounted rates",
      "Dedicated cleaning team"
    ],
    price: 12000,
    duration: "2-3 hours",
    popular: false
  },
  {
    icon: Users,
    title: "Event Cleanup",
    description: "Pre and post-event cleaning for parties, weddings, and corporate events",
    features: [
      "Pre-event space preparation",
      "During-event maintenance",
      "Post-event cleanup",
      "Decoration removal",
      "Venue restoration"
    ],
    price: 30000,
    duration: "4-6 hours",
    popular: false
  }
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Cleaning Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From regular maintenance to deep cleaning, we offer comprehensive cleaning solutions 
            tailored to your specific needs.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`relative transform hover:scale-105 transition-all duration-200 ${
                service.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <service.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{formatCurrency(service.price)}</span>
                      <span>•</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Sparkles className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full ${
                    service.popular 
                      ? 'cleaning-gradient text-white' 
                      : ''
                  }`}
                  variant={service.popular ? 'default' : 'outline'}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Cleaning Plan?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us for a personalized quote tailored to your specific requirements 
              and budget.
            </p>
            <Button size="lg" className="cleaning-gradient text-white">
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}