"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAdmin } from "./admin-provider"
import { Plus, Edit, Trash2, Calculator, Save } from "lucide-react"

interface ServicePrice {
  id: string
  name: string
  basePrice: number
  description: string
  category: "residential" | "commercial" | "specialized"
  isActive: boolean
  addOns: { name: string; price: number }[]
}

export function PricingManagement() {
  const { servicePrices, addServicePrice, updateServicePrice, deleteServicePrice, calculatePrice } = useAdmin()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<ServicePrice | null>(null)
  const [calculatorOpen, setCalculatorOpen] = useState(false)

  const [newService, setNewService] = useState({
    name: "",
    basePrice: 0,
    description: "",
    category: "residential" as const,
    isActive: true,
    addOns: [] as { name: string; price: number }[],
  })

  const [calculator, setCalculator] = useState({
    serviceId: "",
    size: "",
    frequency: "",
    addOns: [] as string[],
    result: 0,
  })

  const handleAddService = () => {
    if (newService.name && newService.basePrice > 0) {
      addServicePrice(newService)
      setNewService({
        name: "",
        basePrice: 0,
        description: "",
        category: "residential",
        isActive: true,
        addOns: [],
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditService = () => {
    if (editingService) {
      updateServicePrice(editingService.id, editingService)
      setIsEditDialogOpen(false)
      setEditingService(null)
    }
  }

  const handleDeleteService = (id: string) => {
    deleteServicePrice(id)
  }

  const addNewServiceAddOn = () => {
    setNewService((prev) => ({
      ...prev,
      addOns: [...prev.addOns, { name: "", price: 0 }],
    }))
  }

  const updateNewServiceAddOn = (index: number, field: "name" | "price", value: string | number) => {
    setNewService((prev) => ({
      ...prev,
      addOns: prev.addOns.map((addOn, i) => (i === index ? { ...addOn, [field]: value } : addOn)),
    }))
  }

  const removeNewServiceAddOn = (index: number) => {
    setNewService((prev) => ({
      ...prev,
      addOns: prev.addOns.filter((_, i) => i !== index),
    }))
  }

  const calculateServicePrice = () => {
    if (calculator.serviceId && calculator.size && calculator.frequency) {
      const result = calculatePrice(calculator.serviceId, calculator.size, calculator.frequency, calculator.addOns)
      setCalculator((prev) => ({ ...prev, result }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pricing Management</h2>
          <p className="text-gray-600">Manage service prices, add-ons, and calculate quotes</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={calculatorOpen} onOpenChange={setCalculatorOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calculator className="mr-2 h-4 w-4" />
                Price Calculator
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Price Calculator</DialogTitle>
                <DialogDescription>Calculate pricing for customer quotes</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Service</Label>
                  <Select
                    value={calculator.serviceId}
                    onValueChange={(value) => setCalculator((prev) => ({ ...prev, serviceId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {servicePrices
                        .filter((s) => s.isActive)
                        .map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Property Size</Label>
                  <Select
                    value={calculator.size}
                    onValueChange={(value) => setCalculator((prev) => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-2 rooms)</SelectItem>
                      <SelectItem value="medium">Medium (3-4 rooms)</SelectItem>
                      <SelectItem value="large">Large (5+ rooms)</SelectItem>
                      <SelectItem value="extra-large">Extra Large (3000+ sq ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Frequency</Label>
                  <Select
                    value={calculator.frequency}
                    onValueChange={(value) => setCalculator((prev) => ({ ...prev, frequency: value }))}
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
                <Button onClick={calculateServicePrice} className="w-full">
                  Calculate Price
                </Button>
                {calculator.result > 0 && (
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Estimated Price</p>
                    <p className="text-2xl font-bold text-green-600">₦{calculator.result.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Create a new cleaning service with pricing</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Service Name</Label>
                    <Input
                      value={newService.name}
                      onChange={(e) => setNewService((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Premium Deep Clean"
                    />
                  </div>
                  <div>
                    <Label>Base Price (₦)</Label>
                    <Input
                      type="number"
                      value={newService.basePrice}
                      onChange={(e) =>
                        setNewService((prev) => ({ ...prev, basePrice: Number.parseInt(e.target.value) }))
                      }
                      placeholder="25000"
                    />
                  </div>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={newService.category}
                    onValueChange={(value: any) => setNewService((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="specialized">Specialized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={newService.description}
                    onChange={(e) => setNewService((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this service includes..."
                    rows={3}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Add-on Services</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addNewServiceAddOn}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Add-on
                    </Button>
                  </div>
                  {newService.addOns.map((addOn, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Add-on name"
                        value={addOn.name}
                        onChange={(e) => updateNewServiceAddOn(index, "name", e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        value={addOn.price}
                        onChange={(e) => updateNewServiceAddOn(index, "price", Number.parseInt(e.target.value))}
                        className="w-32"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => removeNewServiceAddOn(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newService.isActive}
                    onCheckedChange={(checked) => setNewService((prev) => ({ ...prev, isActive: checked }))}
                  />
                  <Label>Active Service</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddService}>
                    <Save className="mr-2 h-4 w-4" />
                    Add Service
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicePrices.map((service) => (
          <Card key={service.id} className={`${!service.isActive ? "opacity-60" : ""}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        service.category === "residential"
                          ? "default"
                          : service.category === "commercial"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {service.category}
                    </Badge>
                    {!service.isActive && <Badge variant="destructive">Inactive</Badge>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingService(service)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Service</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{service.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteService(service.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">₦{service.basePrice.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Base Price</p>
                </div>
                <p className="text-sm text-gray-700">{service.description}</p>
                {service.addOns.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Add-ons:</p>
                    <div className="space-y-1">
                      {service.addOns.map((addOn, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span>{addOn.name}</span>
                          <span>+₦{addOn.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Service Dialog */}
      {editingService && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>Update service details and pricing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Service Name</Label>
                  <Input
                    value={editingService.name}
                    onChange={(e) => setEditingService((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                  />
                </div>
                <div>
                  <Label>Base Price (₦)</Label>
                  <Input
                    type="number"
                    value={editingService.basePrice}
                    onChange={(e) =>
                      setEditingService((prev) =>
                        prev ? { ...prev, basePrice: Number.parseInt(e.target.value) } : null,
                      )
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={editingService.category}
                  onValueChange={(value: any) =>
                    setEditingService((prev) => (prev ? { ...prev, category: value } : null))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="specialized">Specialized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService((prev) => (prev ? { ...prev, description: e.target.value } : null))
                  }
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingService.isActive}
                  onCheckedChange={(checked) =>
                    setEditingService((prev) => (prev ? { ...prev, isActive: checked } : null))
                  }
                />
                <Label>Active Service</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditService}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
