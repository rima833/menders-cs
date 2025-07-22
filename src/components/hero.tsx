import { ArrowRight, Star, Clock, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Available whenever you need us"
  },
  {
    icon: Shield,
    title: "Insured & Bonded",
    description: "Your property is protected"
  },
  {
    icon: Star,
    title: "5-Star Rating",
    description: "Trusted by thousands of customers"
  }
]

const benefits = [
  "Professional trained cleaners",
  "Eco-friendly products",
  "Satisfaction guaranteed",
  "Flexible scheduling"
]

export function Hero() {
  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-gradient opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
      
      <div className="container relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          {/* Main Content */}
          <div className="col-span-7">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                <span className="block">Premium</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Cleaning
                </span>
                <span className="block">Services</span>
              </h1>
              
              <p className="mt-6 text-lg leading-8 text-gray-600 lg:text-xl">
                Transform your space with our professional cleaning services. We provide 
                top-quality residential and commercial cleaning with eco-friendly products 
                and guaranteed satisfaction.
              </p>

              {/* Benefits List */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="cleaning-gradient text-white group">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  View Services
                </Button>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">4.9/5</span> from 500+ reviews
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="col-span-5 mt-16 lg:mt-0">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card key={index} className="transform hover:scale-105 transition-transform duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-blue-100 p-2">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Stats Card */}
              <Card className="cleaning-gradient text-white">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">1000+</div>
                      <div className="text-sm opacity-90">Happy Customers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm opacity-90">Expert Cleaners</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}