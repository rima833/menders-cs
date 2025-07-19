"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAdmin } from "./admin-provider"
import {
  Save,
  Building2,
  Phone,
  Mail,
  Globe,
  Clock,
  DollarSign,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react"
import type { SiteSettings as SiteSettingsType } from "@/lib/database"

export function SiteSettings() {
  const { siteSettings, updateSiteSettings } = useAdmin()
  const [settings, setSettings] = useState<SiteSettingsType>(siteSettings)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      updateSiteSettings(settings)
      // Show success message (you could add a toast here)
      setTimeout(() => setIsSaving(false), 1000)
    } catch (error) {
      setIsSaving(false)
      // Handle error
    }
  }

  const updateBusinessHours = (day: string, hours: string) => {
    setSettings((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: hours,
      },
    }))
  }

  const updateSocialMedia = (platform: string, url: string) => {
    setSettings((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: url,
      },
    }))
  }

  const daysOfWeek = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
          <CardDescription>Basic information about your cleaning business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => setSettings((prev) => ({ ...prev, companyName: e.target.value }))}
                placeholder="Your Company Name"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={settings.website}
                onChange={(e) => setSettings((prev) => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Business Address</Label>
            <Textarea
              id="address"
              value={settings.address}
              onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="Full business address"
              rows={3}
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
          <CardDescription>How customers can reach your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Business Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="info@yourcompany.com"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Business Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+234 803 123 4567"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="emergencyContact"
                value={settings.emergencyContact}
                onChange={(e) => setSettings((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                placeholder="+234 803 123 4567"
                className="pl-10"
              />
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
          <CardDescription>Set your operating hours for each day of the week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {daysOfWeek.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-24">
                  <Label className="text-sm font-medium">{label}</Label>
                </div>
                <div className="flex-1">
                  <Input
                    value={settings.businessHours[key as keyof typeof settings.businessHours]}
                    onChange={(e) => updateBusinessHours(key, e.target.value)}
                    placeholder="e.g., 8:00 AM - 6:00 PM or Closed"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Social Media Links
          </CardTitle>
          <CardDescription>Connect your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="facebook"
                  value={settings.socialMedia.facebook || ""}
                  onChange={(e) => updateSocialMedia("facebook", e.target.value)}
                  placeholder="https://facebook.com/yourpage"
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
                  value={settings.socialMedia.instagram || ""}
                  onChange={(e) => updateSocialMedia("instagram", e.target.value)}
                  placeholder="https://instagram.com/yourpage"
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
                  value={settings.socialMedia.twitter || ""}
                  onChange={(e) => updateSocialMedia("twitter", e.target.value)}
                  placeholder="https://twitter.com/yourpage"
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
                  value={settings.socialMedia.linkedin || ""}
                  onChange={(e) => updateSocialMedia("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/yourpage"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Settings
          </CardTitle>
          <CardDescription>Configure pricing and tax settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings((prev) => ({ ...prev, currency: e.target.value }))}
                placeholder="NGN"
              />
            </div>
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.1"
                value={settings.taxRate}
                onChange={(e) => setSettings((prev) => ({ ...prev, taxRate: Number.parseFloat(e.target.value) }))}
                placeholder="7.5"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="min-w-32">
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
