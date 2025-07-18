"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  Facebook,
  Instagram,
  Twitter,
  Save,
  Settings,
} from "lucide-react"

export function SiteSettings() {
  const [settings, setSettings] = useState({
    company: {
      name: "Menders Cleaning Services",
      tagline: "Professional Cleaning Solutions",
      description: "We provide top-quality cleaning services for homes and offices across Lagos, Nigeria.",
      phone: "+234 801 234 5678",
      email: "info@menderscleaning.ng",
      address: "123 Victoria Island, Lagos, Nigeria",
      website: "https://menderscleaning.ng",
    },
    pricing: {
      regularCleaning: 25000,
      deepCleaning: 45000,
      moveInCleaning: 65000,
      officeCleaning: 85000,
      discountPercentage: 10,
      minimumBooking: 15000,
    },
    businessHours: {
      monday: { open: "08:00", close: "18:00", enabled: true },
      tuesday: { open: "08:00", close: "18:00", enabled: true },
      wednesday: { open: "08:00", close: "18:00", enabled: true },
      thursday: { open: "08:00", close: "18:00", enabled: true },
      friday: { open: "08:00", close: "18:00", enabled: true },
      saturday: { open: "09:00", close: "16:00", enabled: true },
      sunday: { open: "10:00", close: "14:00", enabled: false },
    },
    serviceAreas: ["Victoria Island", "Ikoyi", "Lekki", "Ajah", "Ikeja", "Surulere", "Yaba", "Maryland"],
    socialMedia: {
      facebook: "https://facebook.com/menderscleaning",
      instagram: "https://instagram.com/menderscleaning",
      twitter: "https://twitter.com/menderscleaning",
      whatsapp: "+234 801 234 5678",
    },
    features: {
      onlineBooking: true,
      freeQuotes: true,
      emergencyService: true,
      ecoFriendly: true,
      insured: true,
      satisfaction: true,
    },
  })

  const updateSetting = (section: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const saveSettings = () => {
    // In a real app, this would make an API call
    console.log("Saving settings:", settings)
    alert("Settings saved successfully!")
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-600">Configure your website and business settings</p>
        </div>
        <Button onClick={saveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="hours">Hours</TabsTrigger>
          <TabsTrigger value="areas">Areas</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        {/* Company Information */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>Basic information about your cleaning business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={settings.company.name}
                    onChange={(e) => updateSetting("company", "name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={settings.company.tagline}
                    onChange={(e) => updateSetting("company", "tagline", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={settings.company.description}
                  onChange={(e) => updateSetting("company", "description", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={settings.company.phone}
                    onChange={(e) => updateSetting("company", "phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.company.email}
                    onChange={(e) => updateSetting("company", "email", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Business Address
                </Label>
                <Input
                  id="address"
                  value={settings.company.address}
                  onChange={(e) => updateSetting("company", "address", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  type="url"
                  value={settings.company.website}
                  onChange={(e) => updateSetting("company", "website", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Pricing Configuration
              </CardTitle>
              <CardDescription>Set your service prices and discount rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regular-cleaning">Regular Cleaning (₦)</Label>
                  <Input
                    id="regular-cleaning"
                    type="number"
                    value={settings.pricing.regularCleaning}
                    onChange={(e) => updateSetting("pricing", "regularCleaning", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="deep-cleaning">Deep Cleaning (₦)</Label>
                  <Input
                    id="deep-cleaning"
                    type="number"
                    value={settings.pricing.deepCleaning}
                    onChange={(e) => updateSetting("pricing", "deepCleaning", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="move-in-cleaning">Move-in Cleaning (₦)</Label>
                  <Input
                    id="move-in-cleaning"
                    type="number"
                    value={settings.pricing.moveInCleaning}
                    onChange={(e) => updateSetting("pricing", "moveInCleaning", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="office-cleaning">Office Cleaning (₦)</Label>
                  <Input
                    id="office-cleaning"
                    type="number"
                    value={settings.pricing.officeCleaning}
                    onChange={(e) => updateSetting("pricing", "officeCleaning", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discount">Discount Percentage (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.pricing.discountPercentage}
                    onChange={(e) => updateSetting("pricing", "discountPercentage", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="minimum">Minimum Booking (₦)</Label>
                  <Input
                    id="minimum"
                    type="number"
                    value={settings.pricing.minimumBooking}
                    onChange={(e) => updateSetting("pricing", "minimumBooking", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Hours */}
        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Business Hours
              </CardTitle>
              <CardDescription>Configure your operating hours for each day</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {days.map((day) => (
                <div key={day} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="w-24">
                    <span className="font-medium capitalize">{day}</span>
                  </div>
                  <Switch
                    checked={settings.businessHours[day as keyof typeof settings.businessHours].enabled}
                    onCheckedChange={(checked) =>
                      updateSetting("businessHours", day, {
                        ...settings.businessHours[day as keyof typeof settings.businessHours],
                        enabled: checked,
                      })
                    }
                  />
                  {settings.businessHours[day as keyof typeof settings.businessHours].enabled && (
                    <>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`${day}-open`}>Open:</Label>
                        <Input
                          id={`${day}-open`}
                          type="time"
                          value={settings.businessHours[day as keyof typeof settings.businessHours].open}
                          onChange={(e) =>
                            updateSetting("businessHours", day, {
                              ...settings.businessHours[day as keyof typeof settings.businessHours],
                              open: e.target.value,
                            })
                          }
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`${day}-close`}>Close:</Label>
                        <Input
                          id={`${day}-close`}
                          type="time"
                          value={settings.businessHours[day as keyof typeof settings.businessHours].close}
                          onChange={(e) =>
                            updateSetting("businessHours", day, {
                              ...settings.businessHours[day as keyof typeof settings.businessHours],
                              close: e.target.value,
                            })
                          }
                          className="w-32"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Areas */}
        <TabsContent value="areas">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Service Areas
              </CardTitle>
              <CardDescription>Manage the areas where you provide services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {settings.serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{area}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newAreas = settings.serviceAreas.filter((_, i) => i !== index)
                        setSettings((prev) => ({ ...prev, serviceAreas: newAreas }))
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add new service area"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const input = e.target as HTMLInputElement
                      if (input.value.trim()) {
                        setSettings((prev) => ({
                          ...prev,
                          serviceAreas: [...prev.serviceAreas, input.value.trim()],
                        }))
                        input.value = ""
                      }
                    }
                  }}
                />
                <Button
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement
                    if (input.value.trim()) {
                      setSettings((prev) => ({
                        ...prev,
                        serviceAreas: [...prev.serviceAreas, input.value.trim()],
                      }))
                      input.value = ""
                    }
                  }}
                >
                  Add Area
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Social Media Links
              </CardTitle>
              <CardDescription>Configure your social media presence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebook" className="flex items-center">
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  type="url"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => updateSetting("socialMedia", "facebook", e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <Label htmlFor="instagram" className="flex items-center">
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  type="url"
                  value={settings.socialMedia.instagram}
                  onChange={(e) => updateSetting("socialMedia", "instagram", e.target.value)}
                  placeholder="https://instagram.com/yourpage"
                />
              </div>
              <div>
                <Label htmlFor="twitter" className="flex items-center">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  type="url"
                  value={settings.socialMedia.twitter}
                  onChange={(e) => updateSetting("socialMedia", "twitter", e.target.value)}
                  placeholder="https://twitter.com/yourpage"
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  value={settings.socialMedia.whatsapp}
                  onChange={(e) => updateSetting("socialMedia", "whatsapp", e.target.value)}
                  placeholder="+234 801 234 5678"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Website Features</CardTitle>
              <CardDescription>Enable or disable website features and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.features).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium capitalize">{feature.replace(/([A-Z])/g, " $1").trim()}</span>
                    <p className="text-sm text-gray-600">
                      {feature === "onlineBooking" && "Allow customers to book services online"}
                      {feature === "freeQuotes" && "Offer free quotes and estimates"}
                      {feature === "emergencyService" && "Provide emergency cleaning services"}
                      {feature === "ecoFriendly" && "Highlight eco-friendly cleaning products"}
                      {feature === "insured" && "Display insurance and bonding information"}
                      {feature === "satisfaction" && "Show satisfaction guarantee"}
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) => updateSetting("features", feature, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
