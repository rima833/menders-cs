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
import { CheckCircle } from "lucide-react"

interface BookServiceModalProps {
  open: boolean
  onClose: () => void
  estimatedPrice?: number
  serviceDetails?: {
    serviceType: string
    propertySize: string
    frequency: string
    addOns: string[]
  }
}

export function BookServiceModal({ open, onClose, estimatedPrice, serviceDetails }: BookServiceModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",

    // Service Details
    serviceType: serviceDetails?.serviceType || "",
    propertySize: serviceDetails?.propertySize || "",
    frequency: serviceDetails?.frequency || "",
    addOns: serviceDetails?.addOns || [],

    // Scheduling
    preferredDate: "",
    preferredTime: "",
    alternativeDate: "",
    alternativeTime: "",

    // Special Requirements
    accessInstructions: "",
    specialRequests: "",
    petFriendly: false,
    ecoFriendly: false,

    // Payment
    paymentMethod: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setCurrentStep(1)
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        serviceType: "",
        propertySize: "",
        frequency: "",
        addOns: [],
        preferredDate: "",
        preferredTime: "",
        alternativeDate: "",
        alternativeTime: "",
        accessInstructions: "",
        specialRequests: "",
        petFriendly: false,
        ecoFriendly: false,
        paymentMethod: "",
        agreeToTerms: false,
      })
    }, 3000)
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h3>
            <p className="text-gray-600 mb-4">
              Thank you for choosing Menders! We'll contact you within 2 hours to confirm your appointment details.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-green-800">
                <strong>Booking Reference:</strong> MND-{Date.now().toString().slice(-6)}
              </p>
              <p className="text-sm text-green-800">
                <strong>Total Amount:</strong> ₦{estimatedPrice?.toLocaleString() || "TBD"}
              </p>
            </div>
            <p className="text-sm text-gray-500">Check your email for booking confirmation and payment details.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const stepTitles = ["Personal Information", "Service Details", "Schedule & Requirements", "Payment & Confirmation"]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">📅 Book Your Cleaning Service</DialogTitle>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep
                      ? "bg-blue-600 text-white"
                      : step < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < currentStep ? "✓" : step}
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-600 mt-2">{stepTitles[currentStep - 1]}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
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
                  <Label htmlFor="city">City *</Label>
                  <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="lagos">Lagos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Include landmarks and specific directions"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Service Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
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
                      <SelectItem value="home-regular">Home - Regular Cleaning</SelectItem>
                      <SelectItem value="home-deep">Home - Deep Cleaning</SelectItem>
                      <SelectItem value="office">Office Cleaning</SelectItem>
                      <SelectItem value="post-construction">Post-Construction</SelectItem>
                      <SelectItem value="event">Event Cleaning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="propertySize">Property Size *</Label>
                  <Select
                    value={formData.propertySize}
                    onValueChange={(value) => setFormData({ ...formData, propertySize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-2 rooms)</SelectItem>
                      <SelectItem value="medium">Medium (3-4 rooms)</SelectItem>
                      <SelectItem value="large">Large (5+ rooms)</SelectItem>
                      <SelectItem value="extra-large">Extra Large (Commercial)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="frequency">Cleaning Frequency *</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="weekly">Weekly (15% discount)</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly (10% discount)</SelectItem>
                    <SelectItem value="monthly">Monthly (5% discount)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {estimatedPrice && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Estimated Total:</span>
                    <span className="text-2xl font-bold text-blue-600">₦{estimatedPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Schedule & Requirements */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="preferredTime">Preferred Time *</Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM-4PM)</SelectItem>
                      <SelectItem value="evening">Evening (4PM-7PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="alternativeDate">Alternative Date</Label>
                  <Input
                    id="alternativeDate"
                    type="date"
                    value={formData.alternativeDate}
                    onChange={(e) => setFormData({ ...formData, alternativeDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="alternativeTime">Alternative Time</Label>
                  <Select
                    value={formData.alternativeTime}
                    onValueChange={(value) => setFormData({ ...formData, alternativeTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM-4PM)</SelectItem>
                      <SelectItem value="evening">Evening (4PM-7PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="accessInstructions">Access Instructions</Label>
                <Textarea
                  id="accessInstructions"
                  value={formData.accessInstructions}
                  onChange={(e) => setFormData({ ...formData, accessInstructions: e.target.value })}
                  placeholder="Gate codes, parking instructions, key location, etc."
                />
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Areas to focus on, items to avoid, allergies, etc."
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="petFriendly"
                    checked={formData.petFriendly}
                    onCheckedChange={(checked) => setFormData({ ...formData, petFriendly: checked as boolean })}
                  />
                  <Label htmlFor="petFriendly" className="text-sm">
                    Pet-friendly cleaning (we have pets on premises)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ecoFriendly"
                    checked={formData.ecoFriendly}
                    onCheckedChange={(checked) => setFormData({ ...formData, ecoFriendly: checked as boolean })}
                  />
                  <Label htmlFor="ecoFriendly" className="text-sm">
                    Eco-friendly products only (+₦2,000)
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment & Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{formData.serviceType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Size:</span>
                    <span>{formData.propertySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <span>{formData.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>
                      {formData.preferredDate} - {formData.preferredTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{formData.city}</span>
                  </div>
                  {estimatedPrice && (
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total Amount:</span>
                      <span>₦{estimatedPrice.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash on Service</SelectItem>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                    <SelectItem value="card">Card Payment</SelectItem>
                    <SelectItem value="pos">POS on Site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Payment Information:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 50% deposit required for first-time customers</li>
                  <li>• Full payment due upon service completion</li>
                  <li>• We accept cash, bank transfer, and card payments</li>
                  <li>• Receipts provided for all transactions</li>
                </ul>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  required
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the Terms of Service and Privacy Policy *
                </Label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting || !formData.agreeToTerms}
              >
                {isSubmitting ? "Confirming Booking..." : "Confirm Booking 🎉"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
