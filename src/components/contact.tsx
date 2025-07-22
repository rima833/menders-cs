"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+234-800-CLEAN-NOW", "+234-901-234-5678"],
    description: "Call us anytime, 24/7 support"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@cleanpro.ng", "support@cleanpro.ng"],
    description: "We'll respond within 2 hours"
  },
  {
    icon: MapPin,
    title: "Service Areas",
    details: ["Lagos, Abuja, Port Harcourt", "Kano, Ibadan, Kaduna"],
    description: "Expanding to more cities"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon-Fri: 6:00 AM - 10:00 PM", "Sat-Sun: 8:00 AM - 8:00 PM"],
    description: "Emergency services available"
  }
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert("Thank you for your message! We'll get back to you within 2 hours.")
    setFormData({ name: "", email: "", phone: "", service: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to transform your space? Contact us today for a free quote or 
            to schedule your cleaning service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <info.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="text-sm text-gray-700">
                            {detail}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Actions */}
            <Card className="cleaning-gradient text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-4">Need Immediate Service?</h3>
                <div className="space-y-3">
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    WhatsApp Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 2 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+234-xxx-xxx-xxxx"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        <option value="residential">Residential Cleaning</option>
                        <option value="commercial">Commercial Cleaning</option>
                        <option value="deep">Deep Cleaning</option>
                        <option value="post-construction">Post-Construction</option>
                        <option value="maintenance">Regular Maintenance</option>
                        <option value="event">Event Cleanup</option>
                        <option value="custom">Custom Service</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your cleaning needs, property size, preferred schedule, and any specific requirements..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full cleaning-gradient text-white"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Serving Major Cities Across Nigeria
                </h3>
                <p className="text-gray-600 mb-6">
                  We provide professional cleaning services in Lagos, Abuja, Port Harcourt, 
                  Kano, Ibadan, Kaduna, and surrounding areas. Contact us to check if we 
                  serve your location.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Kaduna"].map((city) => (
                    <span 
                      key={city}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}