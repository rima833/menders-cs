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
import { Gift } from "lucide-react"

interface FreeCleanModalProps {
  open: boolean
  onClose: () => void
}

export function FreeCleanModal({ open, onClose }: FreeCleanModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    rooms: "",
    preferredDate: "",
    preferredTime: "",
    specialRequests: "",
    followInstagram: false,
    allowPhotos: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)

    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        rooms: "",
        preferredDate: "",
        preferredTime: "",
        specialRequests: "",
        followInstagram: false,
        allowPhotos: false,
      })
    }, 2000)
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <Gift className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h3>
            <p className="text-gray-600 mb-4">
              Thank you! We'll contact you within 24 hours to schedule your free mini clean.
            </p>
            <p className="text-sm text-gray-500">Don't forget to follow @menderscleaning on Instagram!</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">🎉 Book Your Free Mini Clean!</DialogTitle>
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
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rooms">Number of Rooms</Label>
              <Select value={formData.rooms} onValueChange={(value) => setFormData({ ...formData, rooms: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Room</SelectItem>
                  <SelectItem value="2">2 Rooms</SelectItem>
                  <SelectItem value="45min">45 Minutes (Any Area)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="preferredDate">Preferred Date</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="preferredTime">Preferred Time</Label>
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

          <div>
            <Label htmlFor="specialRequests">Special Requests or Notes</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="Any specific areas you'd like us to focus on?"
            />
          </div>

          <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900">Requirements for Free Mini Clean:</h4>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="followInstagram"
                checked={formData.followInstagram}
                onCheckedChange={(checked) => setFormData({ ...formData, followInstagram: checked as boolean })}
                required
              />
              <Label htmlFor="followInstagram" className="text-sm">
                I agree to follow @menderscleaning on Instagram *
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowPhotos"
                checked={formData.allowPhotos}
                onCheckedChange={(checked) => setFormData({ ...formData, allowPhotos: checked as boolean })}
                required
              />
              <Label htmlFor="allowPhotos" className="text-sm">
                I allow before-and-after photos for marketing purposes *
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book My Free Clean! 🎉"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
