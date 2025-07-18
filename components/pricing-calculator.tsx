"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calculator, Info } from "lucide-react"
import { useForm } from "./form-provider"

export function PricingCalculator() {
  const [serviceType, setServiceType] = useState("")
  const [propertySize, setPropertySize] = useState("")
  const [frequency, setFrequency] = useState("")
  const [addOns, setAddOns] = useState<string[]>([])
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

  const { openBookServiceModal } = useForm()

  const basePrices = {
    "home-regular": 15000,
    "home-deep": 25000,
    office: 20000,
    "post-construction": 35000,
    event: 18000,
  }

  const sizeMultipliers = {
    small: 1,
    medium: 1.5,
    large: 2,
    "extra-large": 2.5,
  }

  const frequencyDiscounts = {
    "one-time": 1,
    weekly: 0.85,
    "bi-weekly": 0.9,
    monthly: 0.95,
  }

  const addOnPrices = {
    "carpet-cleaning": 8000,
    "window-cleaning": 5000,
    "deep-kitchen": 7000,
    "appliance-cleaning": 6000,
  }

  const calculatePrice = () => {
    if (!serviceType || !propertySize || !frequency) return

    const basePrice = basePrices[serviceType as keyof typeof basePrices] || 0
    const sizeMultiplier = sizeMultipliers[propertySize as keyof typeof sizeMultipliers] || 1
    const frequencyDiscount = frequencyDiscounts[frequency as keyof typeof frequencyDiscounts] || 1

    const addOnTotal = addOns.reduce((total, addOn) => {
      return total + (addOnPrices[addOn as keyof typeof addOnPrices] || 0)
    }, 0)

    const totalPrice = basePrice * sizeMultiplier * frequencyDiscount + addOnTotal
    setEstimatedPrice(Math.round(totalPrice))
  }

  const handleAddOnChange = (addOn: string, checked: boolean) => {
    if (checked) {
      setAddOns([...addOns, addOn])
    } else {
      setAddOns(addOns.filter((item) => item !== addOn))
    }
  }

  return (
    <section className="py-20 bg-background dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">💰 Pricing Calculator</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get an instant estimate for your cleaning needs. Transparent pricing, no hidden fees.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Your Price
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="serviceType" className="text-foreground">
                    Service Type
                  </Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger className="border-border bg-background">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="home-regular">Home - Regular Cleaning</SelectItem>
                      <SelectItem value="home-deep">Home - Deep Cleaning</SelectItem>
                      <SelectItem value="office">Office Cleaning</SelectItem>
                      <SelectItem value="post-construction">Post-Construction</SelectItem>
                      <SelectItem value="event">Event Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="propertySize" className="text-foreground">
                    Property Size
                  </Label>
                  <Select value={propertySize} onValueChange={setPropertySize}>
                    <SelectTrigger className="border-border bg-background">
                      <SelectValue placeholder="Select property size" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="small">Small (1-2 rooms / Under 1000 sq ft)</SelectItem>
                      <SelectItem value="medium">Medium (3-4 rooms / 1000-2000 sq ft)</SelectItem>
                      <SelectItem value="large">Large (5+ rooms / 2000-3000 sq ft)</SelectItem>
                      <SelectItem value="extra-large">Extra Large (3000+ sq ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="frequency" className="text-foreground">
                    Cleaning Frequency
                  </Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="border-border bg-background">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="weekly">Weekly (15% discount)</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly (10% discount)</SelectItem>
                      <SelectItem value="monthly">Monthly (5% discount)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-foreground">Add-on Services</Label>
                  <div className="space-y-2 mt-2">
                    {Object.entries(addOnPrices).map(([key, price]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={key}
                          checked={addOns.includes(key)}
                          onChange={(e) => handleAddOnChange(key, e.target.checked)}
                          className="rounded border-border"
                        />
                        <Label htmlFor={key} className="text-sm text-muted-foreground">
                          {key.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} (+₦{price.toLocaleString()})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={calculatePrice} className="w-full bg-primary hover:bg-primary/90">
                  Calculate Price
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Price Estimate</CardTitle>
              </CardHeader>
              <CardContent>
                {estimatedPrice ? (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-4">₦{estimatedPrice.toLocaleString()}</div>
                    <p className="text-muted-foreground mb-6">Estimated price for your cleaning service</p>
                    <div className="space-y-2 text-sm text-muted-foreground mb-6">
                      <p>• Professional trained cleaners</p>
                      <p>• All cleaning supplies included</p>
                      <p>• Satisfaction guaranteed</p>
                      <p>• Flexible scheduling</p>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        openBookServiceModal(estimatedPrice, {
                          serviceType,
                          propertySize,
                          frequency,
                          addOns,
                        })
                      }
                    >
                      Book This Service
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Fill out the form to get your instant price estimate</p>
                  </div>
                )}

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-border">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold mb-1 text-foreground">Note:</p>
                      <p>
                        This is an estimate. Final pricing may vary based on specific requirements, accessibility, and
                        current condition of the space.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
