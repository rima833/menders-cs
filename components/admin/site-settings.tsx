"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Clock,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Save,
  Settings,
} from "lucide-react"

export function SiteSettings() {
  const [settings, setSettings] = useState({
    company: {
      name: "Menders Cleaning Services",
      tagline: "Professional Cleaning Services in Lagos",
      description:
        "We provide top-quality residential and commercial cleaning services across Lagos, Nigeria. Our experienced team uses eco-friendly products and modern equipment to deliver exceptional results.",
      phone: "+234 801 234 5678",
      email: "info@menderscleaning.ng",
      address: "123 Victoria Island, Lagos, Nigeria",
      website: "https://menderscleaning.ng",
    },
    pricing: {
      roomPrice: 8000,
      bathroomPrice: 5000,
      discounts: {
        weekly: 15,
        biweekly: 10,
        monthly: 5,
      },
    },
    businessHours: {
      monday: { open: "08:00", close: "18:00", isOpen: true },
      tuesday: { open: "08:00", close: "18:00", isOpen: true },
      wednesday: { open: "08:00", close: "18:00", isOpen: true },
      thursday: { open: "08:00", close: "18:00", isOpen: true },
      friday: { open: "08:00", close: "18:00", isOpen: true },
      saturday: { open: "09:00", close: "16:00", isOpen: true },
      sunday: { open: "10:00", close: "14:00", isOpen: false },
    },
    serviceAreas: [
      "Victoria Island",
      "Ikoyi",
      "Lekki Phase 1",
      "Lekki Phase 2",
      "Ajah",
      "Surulere",
      "Yaba",
      "Lagos Island",
    ],
    socialMedia: {
      facebook: "https://facebook.com/menderscleaning",
      instagram: "https://instagram.com/menderscleaning",
      twitter: "https://twitter.com/menderscleaning",
      linkedin: "https://linkedin.com/company/menderscleaning",
    },
    features: {
      onlineBooking: true,
      freeCleanOffer: true,
      gallery: true,
      testimonials: true,
      pricingCalculator: true,
      partnerProgram: true,
    },
    maintenance: {
      isEnabled: false,
      message: "We are currently performing scheduled maintenance. Please check back soon.",
    },
  })

  const handleSave = () => {
    // In a real app, this would save to database
    console.log("Saving settings:", settings)
    alert("Settings saved successfully!")
  }

  const updateCompanyInfo = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      company: { ...prev.company, [field]: value },
    }))
  }

  const updatePricing = (field: string, value: number) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setSettings((prev) => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [parent]: { ...prev.pricing[parent as keyof typeof prev.pricing], [child]: value },
        },
      }))
    } else {
      setSettings((prev) => ({
        ...prev,
        pricing: { ...prev.pricing, [field]: value },
      }))
    }
  }

  const updateBusinessHours = (day: string, field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: { ...prev.businessHours[day as keyof typeof prev.businessHours], [field]: value },
      },
    }))
  }

  const updateSocialMedia = (platform: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value },
    }))
  }

  const toggleFeature = (feature: string) => {
    setSettings((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: !prev.features[feature as keyof typeof prev.features] },
    }))
  }

  const addServiceArea = (area: string) => {
    if (area && !settings.serviceAreas.includes(area)) {
      setSettings((prev) => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, area],
      }))
    }
  }

  const removeServiceArea = (area: string) => {
    setSettings((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((a) => a !== area),
    }))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Site Settings</h2>
        <p className="text-gray-600">Manage your website configuration and business information</p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Company Information
          </CardTitle>
          <CardDescription>Update your business details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={settings.company.name}
                onChange={(e) => updateCompanyInfo("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={settings.company.tagline}
                onChange={(e) => updateCompanyInfo("tagline", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              value={settings.company.description}
              onChange={(e) => updateCompanyInfo("description", e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  value={settings.company.phone}
                  onChange={(e) => updateCompanyInfo("phone", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  value={settings.company.email}
                  onChange={(e) => updateCompanyInfo("email", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="address">Business Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <Textarea
                id="address"
                value={settings.company.address}
                onChange={(e) => updateCompanyInfo("address", e.target.value)}
                className="pl-10"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Pricing Configuration
          </CardTitle>
          <CardDescription>Set your service prices and discount rates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="room-price">Price per Room (₦)</Label>
              <Input
                id="room-price"
                type="number"
                value={settings.pricing.roomPrice}
                onChange={(e) => updatePricing("roomPrice", Number.parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="bathroom-price">Price per Bathroom (₦)</Label>
              <Input
                id="bathroom-price"
                type="number"
                value={settings.pricing.bathroomPrice}
                onChange={(e) => updatePricing("bathroomPrice", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">Frequency Discounts (%)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="weekly-discount">Weekly Cleaning</Label>
                <Input
                  id="weekly-discount"
                  type="number"
                  value={settings.pricing.discounts.weekly}
                  onChange={(e) => updatePricing("discounts.weekly", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="biweekly-discount">Bi-weekly Cleaning</Label>
                <Input
                  id="biweekly-discount"
                  type="number"
                  value={settings.pricing.discounts.biweekly}
                  onChange={(e) => updatePricing("discounts.biweekly", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="monthly-discount">Monthly Cleaning</Label>
                <Input
                  id="monthly-discount"
                  type="number"
                  value={settings.pricing.discounts.monthly}
                  onChange={(e) => updatePricing("discounts.monthly", Number.parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Business Hours
          </CardTitle>
          <CardDescription>Set your operating hours for each day of the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(settings.businessHours).map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={hours.isOpen}
                    onCheckedChange={(checked) => updateBusinessHours(day, "isOpen", checked)}
                  />
                  <span className="font-medium capitalize w-20">{day}</span>
                </div>
                {hours.isOpen ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => updateBusinessHours(day, "open", e.target.value)}
                      className="w-32"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => updateBusinessHours(day, "close", e.target.value)}
                      className="w-32"
                    />
                  </div>
                ) : (
                  <Badge variant="secondary">Closed</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Service Areas
          </CardTitle>
          <CardDescription>Manage the areas where you provide services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {settings.serviceAreas.map((area) => (
                <Badge key={area} variant="outline" className="px-3 py-1">
                  {area}
                  <button onClick={() => removeServiceArea(area)} className="ml-2 text-red-500 hover:text-red-700">
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add new service area..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addServiceArea((e.target as HTMLInputElement).value)
                    ;(e.target as HTMLInputElement).value = ""
                  }
                }}
              />
              <Button
                onClick={() => {
                  const input = document.querySelector(
                    'input[placeholder="Add new service area..."]',
                  ) as HTMLInputElement
                  if (input) {
                    addServiceArea(input.value)
                    input.value = ""
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Social Media Links
          </CardTitle>
          <CardDescription>Update your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="facebook"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => updateSocialMedia("facebook", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="instagram"
                  value={settings.socialMedia.instagram}
                  onChange={(e) => updateSocialMedia("instagram", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="twitter"
                  value={settings.socialMedia.twitter}
                  onChange={(e) => updateSocialMedia("twitter", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="linkedin"
                  value={settings.socialMedia.linkedin}
                  onChange={(e) => updateSocialMedia("linkedin", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Website Features
          </CardTitle>
          <CardDescription>Enable or disable website features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(settings.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium capitalize">{feature.replace(/([A-Z])/g, " $1").trim()}</p>
                  <p className="text-sm text-gray-600">
                    {feature === "onlineBooking" && "Allow customers to book services online"}
                    {feature === "freeCleanOffer" && "Display free cleaning offer for new customers"}
                    {feature === "gallery" && "Show before/after photo gallery"}
                    {feature === "testimonials" && "Display customer testimonials"}
                    {feature === "pricingCalculator" && "Interactive pricing calculator"}
                    {feature === "partnerProgram" && "Partner/referral program section"}
                  </p>
                </div>
                <Switch checked={enabled} onCheckedChange={() => toggleFeature(feature)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="text-orange-600">Maintenance Mode</CardTitle>
          <CardDescription>Temporarily disable your website for maintenance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Enable Maintenance Mode</p>
              <p className="text-sm text-gray-600">Visitors will see a maintenance message</p>
            </div>
            <Switch
              checked={settings.maintenance.isEnabled}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  maintenance: { ...prev.maintenance, isEnabled: checked },
                }))
              }
            />
          </div>
          {settings.maintenance.isEnabled && (
            <div>
              <Label htmlFor="maintenance-message">Maintenance Message</Label>
              <Textarea
                id="maintenance-message"
                value={settings.maintenance.message}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    maintenance: { ...prev.maintenance, message: e.target.value },
                  }))
                }
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
