"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Handshake } from "lucide-react"
import { useForm } from "../form-provider"

interface PartnerModalProps {
  open: boolean
  onClose: () => void
}

export function PartnerModal({ open, onClose }: PartnerModalProps) {
  const { addPartner } = useForm()
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    partnerType: "",
    businessSize: "",
    location: "",
    website: "",
    description: "",
    expectedVolume: "",
    currentChallenges: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Add partner to the list
    addPartner({
      id: "",
      name: formData.company,
      type: formData.partnerType,
      description: formData.description,
    })

    setIsSubmitting(false)
    setSubmitted(true)

    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        partnerType: "",
        businessSize: "",
        location: "",
        website: "",
        description: "",
        expectedVolume: "",
        currentChallenges: "",
      })
    }, 2000)
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <Handshake className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Partnership Request Sent! 🤝</h3>
            <p className="text-gray-600 mb-4">
              Thank you for your interest! Our partnership team will review your application and contact you within 48
              hours.
            </p>
            <p className="text-sm text-gray-500">Welcome to the Menders family!</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">🤝 Become a Partner</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Contact Person *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="partnerType">Partner Type *</Label>
              <Select
                value={formData.partnerType}
                onValueChange={(value) => setFormData({ ...formData, partnerType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Property Manager">Property Manager</SelectItem>
                  <SelectItem value="Event Planner">Event Planner</SelectItem>
                  <SelectItem value="Real Estate Agent">Real Estate Agent</SelectItem>
                  <SelectItem value="Construction Company">Construction Company</SelectItem>
                  <SelectItem value="Facility Manager">Facility Manager</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="businessSize">Business Size</Label>
              <Select
                value={formData.businessSize}
                onValueChange={(value) => setFormData({ ...formData, businessSize: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                  <SelectItem value="small">Small (11-50 employees)</SelectItem>
                  <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                  <SelectItem value="large">Large (200+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Primary Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abuja">Abuja</SelectItem>
                  <SelectItem value="lagos">Lagos</SelectItem>
                  <SelectItem value="both">Both Cities</SelectItem>
                  <SelectItem value="other">Other (expanding soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Business Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your business and what services you provide..."
              required
            />
          </div>

          <div>
            <Label htmlFor="expectedVolume">Expected Cleaning Volume</Label>
            <Select
              value={formData.expectedVolume}
              onValueChange={(value) => setFormData({ ...formData, expectedVolume: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select expected volume" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 cleanings per month</SelectItem>
                <SelectItem value="6-15">6-15 cleanings per month</SelectItem>
                <SelectItem value="16-30">16-30 cleanings per month</SelectItem>
                <SelectItem value="30+">30+ cleanings per month</SelectItem>
                <SelectItem value="project-based">Project-based (varies)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="currentChallenges">Current Cleaning Challenges</Label>
            <Textarea
              id="currentChallenges"
              value={formData.currentChallenges}
              onChange={(e) => setFormData({ ...formData, currentChallenges: e.target.value })}
              placeholder="What cleaning challenges are you currently facing? How can we help solve them?"
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Partnership Benefits:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Exclusive partner rates and volume discounts</li>
              <li>• Priority scheduling and dedicated account manager</li>
              <li>• Flexible payment terms and bulk service packages</li>
              <li>• Co-marketing opportunities and referral bonuses</li>
            </ul>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Application..." : "Submit Partnership Application 🤝"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
