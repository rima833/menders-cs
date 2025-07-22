"use client"

import { useState } from "react"
import { Calculator, Home, Users, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

const serviceTypes = [
  { id: "regular", name: "Regular Cleaning", basePrice: 15000, multiplier: 1 },
  { id: "deep", name: "Deep Cleaning", basePrice: 35000, multiplier: 1.5 },
  { id: "commercial", name: "Commercial", basePrice: 25000, multiplier: 1.2 },
  { id: "post-construction", name: "Post-Construction", basePrice: 45000, multiplier: 2 }
]

const houseSizes = [
  { id: "small", name: "1-2 Bedrooms", multiplier: 1, sqft: "< 1000 sq ft" },
  { id: "medium", name: "3-4 Bedrooms", multiplier: 1.5, sqft: "1000-2000 sq ft" },
  { id: "large", name: "5+ Bedrooms", multiplier: 2, sqft: "> 2000 sq ft" }
]

const frequencies = [
  { id: "one-time", name: "One-Time", discount: 0 },
  { id: "weekly", name: "Weekly", discount: 0.15 },
  { id: "bi-weekly", name: "Bi-Weekly", discount: 0.10 },
  { id: "monthly", name: "Monthly", discount: 0.05 }
]

const addOns = [
  { id: "inside-oven", name: "Inside Oven Cleaning", price: 5000 },
  { id: "inside-fridge", name: "Inside Fridge Cleaning", price: 3000 },
  { id: "windows", name: "Window Cleaning", price: 8000 },
  { id: "garage", name: "Garage Cleaning", price: 10000 },
  { id: "laundry", name: "Laundry Service", price: 7000 }
]

export function PricingCalculator() {
  const [selectedService, setSelectedService] = useState(serviceTypes[0])
  const [selectedSize, setSelectedSize] = useState(houseSizes[1])
  const [selectedFrequency, setSelectedFrequency] = useState(frequencies[0])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

  const calculatePrice = () => {
    const basePrice = selectedService.basePrice * selectedSize.multiplier
    const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)
    
    const subtotal = basePrice + addOnPrice
    const discount = subtotal * selectedFrequency.discount
    const total = subtotal - discount
    
    return { basePrice, addOnPrice, discount, total }
  }

  const { basePrice, addOnPrice, discount, total } = calculatePrice()

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    )
  }

  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Calculate Your Cleaning Cost
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate for your cleaning service. Customize your options 
            to see pricing that fits your needs and budget.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Home className="h-5 w-5" />
                    <span>Service Type</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceTypes.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          selectedService.id === service.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500">
                          From {formatCurrency(service.basePrice)}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* House Size */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Property Size</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {houseSizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          selectedSize.id === size.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{size.name}</div>
                        <div className="text-xs text-gray-500">{size.sqft}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Frequency */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Cleaning Frequency</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {frequencies.map((frequency) => (
                      <button
                        key={frequency.id}
                        onClick={() => setSelectedFrequency(frequency)}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          selectedFrequency.id === frequency.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{frequency.name}</div>
                        {frequency.discount > 0 && (
                          <div className="text-xs text-green-600">
                            {Math.round(frequency.discount * 100)}% off
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card>
                <CardHeader>
                  <CardTitle>Add-On Services</CardTitle>
                  <CardDescription>Optional services to enhance your cleaning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {addOns.map((addOn) => (
                      <label key={addOn.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addOn.id)}
                          onChange={() => toggleAddOn(addOn.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1 flex justify-between">
                          <span className="font-medium">{addOn.name}</span>
                          <span className="text-gray-500">{formatCurrency(addOn.price)}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5" />
                    <span>Price Estimate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Service</span>
                      <span>{formatCurrency(basePrice)}</span>
                    </div>
                    {addOnPrice > 0 && (
                      <div className="flex justify-between">
                        <span>Add-ons</span>
                        <span>{formatCurrency(addOnPrice)}</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Frequency Discount</span>
                        <span>-{formatCurrency(discount)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <Button className="w-full cleaning-gradient text-white">
                    Book This Service
                  </Button>
                  
                  <div className="text-xs text-gray-500 text-center">
                    * Prices may vary based on specific requirements. 
                    Contact us for a detailed quote.
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