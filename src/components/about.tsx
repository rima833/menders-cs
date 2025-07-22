import { Shield, Users, Clock, Award, CheckCircle, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Insured & Bonded",
    description: "Full insurance coverage for your peace of mind"
  },
  {
    icon: Users,
    title: "Trained Professionals",
    description: "Background-checked and professionally trained staff"
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description: "On-time service with consistent quality"
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee on all services"
  }
]

const stats = [
  { number: "5000+", label: "Satisfied Customers" },
  { number: "10+", label: "Years Experience" },
  { number: "50+", label: "Professional Cleaners" },
  { number: "99%", label: "Customer Satisfaction" }
]

const values = [
  "Eco-friendly cleaning products",
  "Transparent pricing with no hidden fees",
  "Flexible scheduling to fit your lifestyle",
  "Attention to detail in every cleaning",
  "Customer-first approach",
  "Continuous quality improvement"
]

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose CleanPro?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We're more than just a cleaning service. We're your trusted partner in 
            creating clean, healthy, and beautiful spaces.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="text-center transform hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="rounded-lg bg-blue-100 p-3 w-fit mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Professional Cleaning Services You Can Trust
            </h3>
            
            <p className="text-gray-600 mb-6">
              Since 2014, CleanPro has been providing exceptional cleaning services 
              to homes and businesses across Nigeria. Our commitment to excellence, 
              attention to detail, and customer satisfaction has made us the preferred 
              choice for thousands of satisfied customers.
            </p>

            <p className="text-gray-600 mb-8">
              We understand that your time is valuable, and your space is important. 
              That's why we go above and beyond to deliver cleaning services that 
              exceed your expectations every time.
            </p>

            {/* Values List */}
            <div className="space-y-3">
              {values.map((value, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats & Testimonial */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Testimonial Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "CleanPro has been cleaning our office for over 2 years. Their attention 
                  to detail and professionalism is outstanding. Our workplace has never 
                  looked better!"
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-600">Office Manager, Tech Solutions Ltd</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the CleanPro Difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied customers who trust us with their cleaning needs. 
              Get started with a free quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Get Free Quote
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Call Now: +234-800-CLEAN-NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}