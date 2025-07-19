"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAdmin } from "./admin-provider"
import { Plus, Edit, Trash2, DollarSign, Calculator, Package, Building2, Home, Wrench } from "lucide-react"
import type { ServicePrice } from "@/lib/database"

export function PricingManagement() {
  const { servicePrices, addServicePrice, updateServicePrice, deleteServicePrice, calculatePrice } = useAdmin()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [editingPrice, setEditingPrice] = useState<ServicePrice | null>(null)
  const [newPrice, setNewPrice] = useState<Omit<ServicePrice, "id">>({
    name: "",
    basePrice: 0,
    description: "",
    category: "residential",
    isActive: true,
    addOns: [],
  })

  // Calculator state
  const [calculatorData, setCalculatorData] = useState({
    serviceId: "",
    size: "medium",
    frequency: "one-time",
    addOns: [] as string[],
  })

  const resetNewPrice = () => {
    setNewPrice({
      name: "",
      basePrice: 0,
      description: "",
      category: "residential",
      isActive: true,
      addOns: [],
    })
  }

  const handleAddPrice = () => {
    if (newPrice.name && newPrice.basePrice > 0) {
      addServicePrice(newPrice)
      resetNewPrice()
      setIsAddDialogOpen(false)
    }
  }

  const handleEditPrice = () => {
    if (editingPrice && newPrice.name && newPrice.basePrice > 0) {
      updateServicePrice(editingPrice.id, newPrice)
      setIsEditDialogOpen(false)
      setEditingPrice(null)
      resetNewPrice()
    }
  }

  const handleDeletePrice = (id: string) => {
    if (confirm("Are you sure you want to delete this service price?")) {
      deleteServicePrice(id)
    }
  }

  const openEditDialog = (price: ServicePrice) => {
    setEditingPrice(price)
    setNewPrice({
      name: price.name,
      basePrice: price.basePrice,
      description: price.description,
      category: price.category,
      isActive: price.isActive,
      addOns: price.addOns,
    })
    setIsEditDialogOpen(true)
  }

  const addNewAddOn = () => {
    setNewPrice((prev) => ({
      ...prev,
      addOns: [...prev.addOns, { name: "", price: 0 }],
    }))
  }

  const updateAddOn = (index: number, field: "name" | "price", value: string | number) => {
    setNewPrice((prev) => ({
      ...prev,
      addOns: prev.addOns.map((addOn, i) => (i === index ? { ...addOn, [field]: value } : addOn)),
    }))
  }

  const removeAddOn = (index: number) => {
    setNewPrice((prev) => ({
      ...prev,
      addOns: prev.addOns.filter((_, i) => i !== index),
    }))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "residential":
        return <Home className="h-4 w-4" />
      case "commercial":
        return <Building2 className="h-4 w-4" />
      case "specialized":
        return <Wrench className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "residential":
        return "bg-green-100 text-green-800"
      case "commercial":
        return "bg-blue-100 text-blue-800"
      case "specialized":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const selectedService = servicePrices.find((s) => s.id === calculatorData.serviceId)
  const calculatedPrice = selectedService
    ? calculatePrice(calculatorData.serviceId, calculatorData.size, calculatorData.frequency, calculatorData.addOns)
    : 0

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Service Price
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Service Price</DialogTitle>
                <DialogDescription>Create a new service with pricing and add-on options</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Service Name</Label>
                    <Input
                      id="name"
                      value={newPrice.name}
                      onChange={(e) => setNewPrice((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Deep Home Cleaning"
                    />
                  </div>
                  <div>
                    <Label htmlFor="basePrice">Base Price (NGN)</Label>
                    <Input
                      id="basePrice"
                      type="number"
                      value={newPrice.basePrice}
                      onChange={(e) => setNewPrice((prev) => ({ ...prev, basePrice: Number(e.target.value) }))}
                      placeholder="25000"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newPrice.description}
                    onChange={(e) => setNewPrice((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what's included in this service..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newPrice.category}
                      onValueChange={(value: any) => setNewPrice((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="specialized">Specialized</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={newPrice.isActive}
                      onCheckedChange={(checked) => setNewPrice((prev) => ({ ...prev, isActive: checked }))}
                    />
                    <Label htmlFor="isActive">Active Service</Label>
                  </div>
                </div>

                {/* Add-ons Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Add-on Services</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addNewAddOn}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Add-on
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {newPrice.addOns.map((addOn, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          placeholder="Add-on name"
                          value={addOn.name}
                          onChange={(e) => updateAddOn(index, "name", e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          placeholder="Price"
                          value={addOn.price}
                          onChange={(e) => updateAddOn(index, "price", Number(e.target.value))}
                          className="w-24"
                        />
                        <Button type="button" variant="outline" size="sm" onClick={() => removeAddOn(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPrice}>Add Service Price</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Calculator className="h-4 w-4" />
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
                    value={calculatorData.serviceId}
                    onValueChange={(value) => setCalculatorData((prev) => ({ ...prev, serviceId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {servicePrices
                        .filter((p) => p.isActive)
                        .map((price) => (
                          <SelectItem key={price.id} value={price.id}>
                            {price.name} - {formatCurrency(price.basePrice)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Property Size</Label>
                  <Select
                    value={calculatorData.size}
                    onValueChange={(value) => setCalculatorData((prev) => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-2 rooms)</SelectItem>
                      <SelectItem value="medium">Medium (3-4 rooms)</SelectItem>
                      <SelectItem value="large">Large (5-6 rooms)</SelectItem>
                      <SelectItem value="extra-large">Extra Large (7+ rooms)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Frequency</Label>
                  <Select
                    value={calculatorData.frequency}
                    onValueChange={(value) => setCalculatorData((prev) => ({ ...prev, frequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="weekly">Weekly (15% discount)</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly (10% discount)</SelectItem>
                      <SelectItem value="monthly">Monthly (5% discount)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedService && selectedService.addOns.length > 0 && (
                  <div>
                    <Label>Add-ons</Label>
                    <div className="space-y-2">
                      {selectedService.addOns.map((addOn) => (
                        <div key={addOn.name} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={addOn.name}
                            checked={calculatorData.addOns.includes(addOn.name)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCalculatorData((prev) => ({ ...prev, addOns: [...prev.addOns, addOn.name] }))
                              } else {
                                setCalculatorData((prev) => ({
                                  ...prev,
                                  addOns: prev.addOns.filter((a) => a !== addOn.name),
                                }))
                              }
                            }}
                            className="rounded"
                          />
                          <Label htmlFor={addOn.name} className="text-sm">
                            {addOn.name} (+{formatCurrency(addOn.price)})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {calculatedPrice > 0 && (
                  <Alert>
                    <DollarSign className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Total Price: {formatCurrency(calculatedPrice)}</strong>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Service Prices Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {servicePrices.map((price) => (
          <Card key={price.id} className={`${!price.isActive ? "opacity-60" : ""}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(price.category)}
                  <CardTitle className="text-lg">{price.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(price.category)}>{price.category}</Badge>
                  {!price.isActive && <Badge variant="secondary">Inactive</Badge>}
                </div>
              </div>
              <CardDescription>{price.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(price.basePrice)}</div>

                {price.addOns.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Available Add-ons:</p>
                    <div className="space-y-1">
                      {price.addOns.map((addOn, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{addOn.name}</span>
                          <span className="font-medium">+{formatCurrency(addOn.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(price)} className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePrice(price.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {servicePrices.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No service prices configured</p>
            <p className="text-sm text-gray-400 mb-4">Add your first service price to get started</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service Price
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Service Price</DialogTitle>
            <DialogDescription>Update service pricing and add-on options</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Service Name</Label>
                <Input
                  id="edit-name"
                  value={newPrice.name}
                  onChange={(e) => setNewPrice((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-basePrice">Base Price (NGN)</Label>
                <Input
                  id="edit-basePrice"
                  type="number"
                  value={newPrice.basePrice}
                  onChange={(e) => setNewPrice((prev) => ({ ...prev, basePrice: Number(e.target.value) }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newPrice.description}
                onChange={(e) => setNewPrice((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={newPrice.category}
                  onValueChange={(value: any) => setNewPrice((prev) => ({ ...prev, category: value }))}
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
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-isActive"
                  checked={newPrice.isActive}
                  onCheckedChange={(checked) => setNewPrice((prev) => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="edit-isActive">Active Service</Label>
              </div>
            </div>

            {/* Add-ons Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Add-on Services</Label>
                <Button type="button" variant="outline" size="sm" onClick={addNewAddOn}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Add-on
                </Button>
              </div>
              <div className="space-y-2">
                {newPrice.addOns.map((addOn, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Add-on name"
                      value={addOn.name}
                      onChange={(e) => updateAddOn(index, "name", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={addOn.price}
                      onChange={(e) => updateAddOn(index, "price", Number(e.target.value))}
                      className="w-24"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeAddOn(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditPrice}>Update Service Price</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
