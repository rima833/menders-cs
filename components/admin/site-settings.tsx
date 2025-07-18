"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, Settings, DollarSign, Clock, MapPin, Phone, Globe } from "lucide-react"

export function SiteSettings() {
  const [settings, setSettings] = useState({
    // Company Information
    companyName: "Menders Cleaning Services",
    tagline: "Professional Cleaning Services in Lagos",
    description:
      "We provide top-quality residential and commercial cleaning services across Lagos, Nigeria. Our experienced team uses eco-friendly products and modern equipment to deliver exceptional results.",

    // Contact Information
    phone: "+234 901 234 5678",
    email: "info@menderscleaning.ng",
    address: "123 Business District, Victoria Island, Lagos, Nigeria",

    // Business Hours
    businessHours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Closed",
    },

    // Service Areas
    serviceAreas: ["Lagos Island", "Victoria Island", "Ikoyi", "Lekki", "Ikeja", "Surulere", "Yaba"],

    // Pricing
    pricing: {
      roomPrice: 8000,
      bathroomPrice: 5000,
      frequencyDiscounts: {
        weekly: 15,
        biweekly: 10,
        monthly: 5,
      },
    },

    // Social Media
    socialMedia: {
      facebook: "https://facebook.com/menderscleaning",
      instagram: "https://instagram.com/menderscleaning",
      twitter: "https://twitter.com/menderscleaning",
      linkedin: "https://linkedin.com/company/menderscleaning",
    },

    // Feature Toggles
    features: {
      onlineBooking: true,
      freeCleanOffer: true,
      partnerProgram: true,
      testimonials: true,
      beforeAfterGallery: true,
      pricingCalculator: true,
      maintenanceMode: false,
    },
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    // Show success message
    alert("Settings saved successfully!")
  }

  const updateSetting = (path: string, value: any) => {
    const keys = path.split(".")
    const newSettings = { ...settings }
    let current = newSettings as any

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value

    setSettings(newSettings)
  }

  const addServiceArea = () => {
    const area = prompt("Enter new service area:")
    if (area && !settings.serviceAreas.includes(area)) {
      setSettings({
        ...settings,
        serviceAreas: [...settings.serviceAreas, area],
      })
    }
  }

  const removeServiceArea = (area: string) => {
    setSettings({
      ...settings,
      serviceAreas: settings.serviceAreas.filter((a) => a !== area),
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Site Settings</h2>
          <p className="text-muted-foreground">Manage your website configuration and business settings</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Company Name</Label>
              <Input value={settings.companyName} onChange={(e) => updateSetting("companyName", e.target.value)} />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input value={settings.tagline} onChange={(e) => updateSetting("tagline", e.target.value)} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={settings.description}
                onChange={(e) => updateSetting("description", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Phone Number</Label>
              <Input value={settings.phone} onChange={(e) => updateSetting("phone", e.target.value)} />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input value={settings.email} onChange={(e) => updateSetting("email", e.target.value)} />
            </div>
            <div>
              <Label>Business Address</Label>
              <Textarea value={settings.address} onChange={(e) => updateSetting("address", e.target.value)} rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price per Room (₦)</Label>
                <Input
                  type="number"
                  value={settings.pricing.roomPrice}
                  onChange={(e) => updateSetting("pricing.roomPrice", Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Price per Bathroom (₦)</Label>
                <Input
                  type="number"
                  value={settings.pricing.bathroomPrice}
                  onChange={(e) => updateSetting("pricing.bathroomPrice", Number(e.target.value))}
                />
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-sm font-medium">Frequency Discounts (%)</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <Label className="text-xs">Weekly</Label>
                  <Input
                    type="number"
                    value={settings.pricing.frequencyDiscounts.weekly}
                    onChange={(e) => updateSetting("pricing.frequencyDiscounts.weekly", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Bi-weekly</Label>
                  <Input
                    type="number"
                    value={settings.pricing.frequencyDiscounts.biweekly}
                    onChange={(e) => updateSetting("pricing.frequencyDiscounts.biweekly", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Monthly</Label>
                  <Input
                    type="number"
                    value={settings.pricing.frequencyDiscounts.monthly}
                    onChange={(e) => updateSetting("pricing.frequencyDiscounts.monthly", Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(settings.businessHours).map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between">
                <Label className="capitalize w-20">{day}</Label>
                <Input
                  value={hours}
                  onChange={(e) => updateSetting(`businessHours.${day}`, e.target.value)}
                  className="flex-1 ml-4"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Service Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Service Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {settings.serviceAreas.map((area) => (
                <Badge
                  key={area}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeServiceArea(area)}
                >
                  {area} ×
                </Badge>
              ))}
            </div>
            <Button variant="outline" onClick={addServiceArea}>
              Add Service Area
            </Button>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Social Media Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Facebook</Label>
              <Input
                value={settings.socialMedia.facebook}
                onChange={(e) => updateSetting("socialMedia.facebook", e.target.value)}
              />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input
                value={settings.socialMedia.instagram}
                onChange={(e) => updateSetting("socialMedia.instagram", e.target.value)}
              />
            </div>
            <div>
              <Label>Twitter</Label>
              <Input
                value={settings.socialMedia.twitter}
                onChange={(e) => updateSetting("socialMedia.twitter", e.target.value)}
              />
            </div>
            <div>
              <Label>LinkedIn</Label>
              <Input
                value={settings.socialMedia.linkedin}
                onChange={(e) => updateSetting("socialMedia.linkedin", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Controls</CardTitle>
          <p className="text-sm text-muted-foreground">Enable or disable website features</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(settings.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center justify-between">
                <div>
                  <Label className="capitalize">{feature.replace(/([A-Z])/g, " $1").trim()}</Label>
                  {feature === "maintenanceMode" && (
                    <p className="text-xs text-muted-foreground">Temporarily disable the site</p>
                  )}
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => updateSetting(`features.${feature}`, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
