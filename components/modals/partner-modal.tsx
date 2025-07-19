"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, TrendingUp, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface PartnerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PartnerModal({ open, onOpenChange }: PartnerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    partnershipType: "",
    experience: "",
    investment: "",
    businessPlan: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Partnership application submitted successfully! We'll contact you within 24 hours.")
      onOpenChange(false)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        partnershipType: "",
        experience: "",
        investment: "",
        businessPlan: "",
        agreeToTerms: false,
      })
    } catch (error) {
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Users className="h-6 w-6 text-blue-600" />
            Partnership Application
          </DialogTitle>
          <DialogDescription>
            Join Nigeria's fastest-growing cleaning service network. Fill out the form below to start your partnership
            journey.
          </DialogDescription>
        </DialogHeader>

        {/* Partnership Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="text-center p-4 border rounded-lg">
            <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold">Franchise</h4>
            <p className="text-sm text-muted-foreground">₦2M - ₦5M</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold">Service Partner</h4>
            <p className="text-sm text-muted-foreground">₦500K - ₦1M</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h4 className="font-semibold">Referral Partner</h4>
            <p className="text-sm text-muted-foreground">No Investment</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+234-800-123-4567"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City/Location *</Label>
                <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="abuja">Abuja</SelectItem>
                    <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                    <SelectItem value="ibadan">Ibadan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Partnership Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Partnership Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partnershipType">Partnership Type *</Label>
                <Select
                  value={formData.partnershipType}
                  onValueChange={(value) => handleInputChange("partnershipType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select partnership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="franchise">Franchise Partner</SelectItem>
                    <SelectItem value="service">Service Partner</SelectItem>
                    <SelectItem value="referral">Referral Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Business Experience</Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No business experience</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="investment">Investment Capacity</Label>
                <Select value={formData.investment} onValueChange={(value) => handleInputChange("investment", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No investment (Referral only)</SelectItem>
                    <SelectItem value="500k-1m">₦500K - ₦1M</SelectItem>
                    <SelectItem value="1m-2m">₦1M - ₦2M</SelectItem>
                    <SelectItem value="2m-5m">₦2M - ₦5M</SelectItem>
                    <SelectItem value="5m+">₦5M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Business Plan */}
          <div className="space-y-2">
            <Label htmlFor="businessPlan">Why do you want to partner with Menders?</Label>
            <Textarea
              id="businessPlan"
              value={formData.businessPlan}
              onChange={(e) => handleInputChange("businessPlan", e.target.value)}
              placeholder="Tell us about your goals, experience, and why you're interested in partnering with Menders..."
              rows={4}
            />
          </div>

          {/* Terms Agreement */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Partnership Agreement
              </a>
              *
            </Label>
          </div>

          {/* Benefits Reminder */}
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Partnership Benefits:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                <span>Comprehensive training</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                <span>Marketing support</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                <span>Ongoing assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500"></Badge>
                <span>Proven business model</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.agreeToTerms}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
