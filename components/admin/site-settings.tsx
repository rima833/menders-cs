"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, DollarSign, Clock, MapPin, Share2, SettingsIcon, Save, Trash2 } from "lucide-react"

export function SiteSettings() {
  const [settings, setSettings] = useState({
    company: {
      name: "Menders Cleaning Services",
      email: "info@menderscleaning.ng",
      phone: "+234 801 234 5678",
      address: "123 Business District, Lagos, Nigeria",
      description: "Professional cleaning services for homes and offices across Lagos",
    },
    pricing: {
      regularCleaning: 25000,
      deepCleaning: 45000,
      officeCleaning: 75000,
      postConstruction: 120000,
      discountEnabled: true,
      firstTimeDiscount: 20,
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
    serviceAreas: ["Victoria Island", "Ikoyi", "Lekki Phase 1", "Lekki Phase 2", "Ajah", "Surulere", "Yaba", "Ikeja"],
    social: {
      facebook: "https://facebook.com/menderscleaning",
      instagram: "https://instagram.com/menderscleaning",
      twitter: "https://twitter.com/menderscleaning",
      linkedin: "https://linkedin.com/company/menderscleaning",
    },
    features: {
      onlineBooking: true,
      paymentIntegration: false,
      smsNotifications: true,
      emailNotifications: true,
      customerReviews: true,
      beforeAfterGallery: true,
    },
  })

  const [newServiceArea, setNewServiceArea] = useState("")

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log("Saving settings:", settings)
  }

  const addServiceArea = () => {
    if (newServiceArea.trim()) {
      setSettings((prev) => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, newServiceArea.trim()],
      }))
      setNewServiceArea("")
    }
  }

  const removeServiceArea = (area: string) => {
    setSettings((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((a) => a !== area),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Site Settings</h2>
          <p className="text-gray-600">Configure your website and business settings</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="hours">Hours</TabsTrigger>
          <TabsTrigger value="areas">Areas</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
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
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        company: { ...prev.company, name: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={settings.company.email}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        company: { ...prev.company, email: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="company-phone">Phone</Label>
                  <Input
                    id="company-phone"
                    value={settings.company.phone}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        company: { ...prev.company, phone: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="company-address">Address</Label>
                  <Input
                    id="company-address"
                    value={settings.company.address}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        company: { ...prev.company, address: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company-description">Description</Label>
                <Textarea
                  id="company-description"
                  value={settings.company.description}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      company: { ...prev.company, description: e.target.value },
                    }))
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Service Pricing
              </CardTitle>
              <CardDescription>Set prices for your cleaning services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regular-price">Regular Cleaning (₦)</Label>
                  <Input
                    id="regular-price"
                    type="number"
                    value={settings.pricing.regularCleaning}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        pricing: { ...prev.pricing, regularCleaning: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="deep-price">Deep Cleaning (₦)</Label>
                  <Input
                    id="deep-price"
                    type="number"
                    value={settings.pricing.deepCleaning}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        pricing: { ...prev.pricing, deepCleaning: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="office-price">Office Cleaning (₦)</Label>
                  <Input
                    id="office-price"
                    type="number"
                    value={settings.pricing.officeCleaning}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        pricing: { ...prev.pricing, officeCleaning: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="construction-price">Post-Construction (₦)</Label>
                  <Input
                    id="construction-price"
                    type="number"
                    value={settings.pricing.postConstruction}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        pricing: { ...prev.pricing, postConstruction: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="discount-enabled"
                    checked={settings.pricing.discountEnabled}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        pricing: { ...prev.pricing, discountEnabled: checked },
                      }))
                    }
                  />
                  <Label htmlFor="discount-enabled">Enable First-Time Customer Discount</Label>
                </div>
                {settings.pricing.discountEnabled && (
                  <div className="ml-6">
                    <Label htmlFor="discount-percent">Discount Percentage (%)</Label>
                    <Input
                      id="discount-percent"
                      type="number"
                      value={settings.pricing.firstTimeDiscount}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          pricing: { ...prev.pricing, firstTimeDiscount: Number.parseInt(e.target.value) },
                        }))
                      }
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Business Hours
              </CardTitle>
              <CardDescription>Set your operating hours for each day</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="w-20">
                    <Switch
                      checked={hours.enabled}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          businessHours: {
                            ...prev.businessHours,
                            [day]: { ...hours, enabled: checked },
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="w-24 font-medium capitalize">{day}</div>
                  {hours.enabled ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            businessHours: {
                              ...prev.businessHours,
                              [day]: { ...hours, open: e.target.value },
                            },
                          }))
                        }
                        className="w-32"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            businessHours: {
                              ...prev.businessHours,
                              [day]: { ...hours, close: e.target.value },
                            },
                          }))
                        }
                        className="w-32"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-500">Closed</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="areas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Service Areas
              </CardTitle>
              <CardDescription>Manage the areas where you provide services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add new service area..."
                  value={newServiceArea}
                  onChange={(e) => setNewServiceArea(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addServiceArea()}
                />
                <Button onClick={addServiceArea}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {settings.serviceAreas.map((area, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-2">
                    <span>{area}</span>
                    <button onClick={() => removeServiceArea(area)} className="ml-2 hover:text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="mr-2 h-5 w-5" />
                Social Media Links
              </CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={settings.social.facebook}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        social: { ...prev.social, facebook: e.target.value },
                      }))
                    }
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={settings.social.instagram}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        social: { ...prev.social, instagram: e.target.value },
                      }))
                    }
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={settings.social.twitter}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        social: { ...prev.social, twitter: e.target.value },
                      }))
                    }
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={settings.social.linkedin}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        social: { ...prev.social, linkedin: e.target.value },
                      }))
                    }
                    placeholder="https://linkedin.com/company/yourpage"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="mr-2 h-5 w-5" />
                Website Features
              </CardTitle>
              <CardDescription>Enable or disable website features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.features).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium capitalize">{feature.replace(/([A-Z])/g, " $1").trim()}</p>
                    <p className="text-sm text-gray-500">
                      {feature === "onlineBooking" && "Allow customers to book services online"}
                      {feature === "paymentIntegration" && "Accept online payments"}
                      {feature === "smsNotifications" && "Send SMS notifications to customers"}
                      {feature === "emailNotifications" && "Send email notifications"}
                      {feature === "customerReviews" && "Display customer reviews and ratings"}
                      {feature === "beforeAfterGallery" && "Show before/after photo gallery"}
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        features: { ...prev.features, [feature]: checked },
                      }))
                    }
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
