"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText } from "lucide-react"

interface CustomQuoteModalProps {
  open: boolean
  onClose: () => void
}

export function CustomQuoteModal({ open, onClose }: CustomQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    propertyType: "",
    squareFootage: "",
    frequency: "",
    specialServices: [] as string[],
    timeline: "",
    budget: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const specialServiceOptions = [
    "Deep cleaning",
    "Carpet cleaning",
    "Window cleaning",
    "Post-construction cleanup",
    "Move-in/move-out",
    "Event cleanup",
    "Eco-friendly products only",
    "Same-day service",
  ]

  const handleSpecialServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, specialServices: [...formData.specialServices, service] })
    } else {
      setFormData({ ...formData, specialServices: formData.specialServices.filter((s) => s !== service) })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceType: "",
        propertyType: "",
        squareFootage: "",
        frequency: "",
        specialServices: [],
        timeline: "",
        budget: "",
        description: "",
      })
    }, 2000)
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <FileText className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Requested! 📋</h3>
            <p className="text-gray-600 mb-4">
              We'll prepare a detailed custom quote and send it to you within 24 hours.
            </p>
            <p className="text-sm text-gray-500">Check your email for updates!</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">📋 Get Custom Quote</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential Cleaning</SelectItem>
                  <SelectItem value="commercial">Commercial Cleaning</SelectItem>
                  <SelectItem value="post-construction">Post-Construction</SelectItem>
                  <SelectItem value="event">Event Cleaning</SelectItem>
                  <SelectItem value="multiple">Multiple Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="retail">Retail Space</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="event-venue">Event Venue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="squareFootage">Square Footage</Label>
              <Input
                id="squareFootage"
                value={formData.squareFootage}
                onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                placeholder="e.g., 1500 sq ft"
              />
            </div>
            <div>
              <Label htmlFor="frequency">Cleaning Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="When needed?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP</SelectItem>
                  <SelectItem value="this-week">This week</SelectItem>
                  <SelectItem value="next-week">Next week</SelectItem>
                  <SelectItem value="this-month">This month</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Special Services Needed</Label>
            <div className="grid md:grid-cols-2 gap-2 mt-2">
              {specialServiceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.specialServices.includes(service)}
                    onCheckedChange={(checked) => handleSpecialServiceChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-sm">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="budget">Budget Range (Optional)</Label>
            <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-50k">Under ₦50,000</SelectItem>
                <SelectItem value="50k-100k">₦50,000 - ₦100,000</SelectItem>
                <SelectItem value="100k-200k">₦100,000 - ₦200,000</SelectItem>
                <SelectItem value="200k-500k">₦200,000 - ₦500,000</SelectItem>
                <SelectItem value="over-500k">Over ₦500,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please provide detailed information about your cleaning needs, specific requirements, challenges, or any other relevant details..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Preparing Quote..." : "Get My Custom Quote 📋"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
