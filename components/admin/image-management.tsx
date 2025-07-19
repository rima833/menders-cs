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
import { useAdmin } from "./admin-provider"
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, Star, MapPin, Calendar } from "lucide-react"
import type { BeforeAfterImage } from "@/lib/database"

export function ImageManagement() {
  const {
    beforeAfterImages,
    addBeforeAfterImage,
    updateBeforeAfterImage,
    deleteBeforeAfterImage,
    toggleImagePublished,
  } = useAdmin()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<BeforeAfterImage | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPublished, setFilterPublished] = useState("all")
  const [newImage, setNewImage] = useState<Omit<BeforeAfterImage, "id" | "uploadDate">>({
    title: "",
    location: "",
    serviceType: "",
    beforeImage: "",
    afterImage: "",
    description: "",
    duration: "",
    client: "",
    rating: 5,
    isPublished: true,
    tags: [],
  })

  const resetNewImage = () => {
    setNewImage({
      title: "",
      location: "",
      serviceType: "",
      beforeImage: "",
      afterImage: "",
      description: "",
      duration: "",
      client: "",
      rating: 5,
      isPublished: true,
      tags: [],
    })
  }

  const handleAddImage = () => {
    if (newImage.title && newImage.location && newImage.serviceType) {
      addBeforeAfterImage(newImage)
      resetNewImage()
      setIsAddDialogOpen(false)
    }
  }

  const handleEditImage = () => {
    if (editingImage && newImage.title && newImage.location && newImage.serviceType) {
      updateBeforeAfterImage(editingImage.id, newImage)
      setIsEditDialogOpen(false)
      setEditingImage(null)
      resetNewImage()
    }
  }

  const handleDeleteImage = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteBeforeAfterImage(id)
    }
  }

  const openEditDialog = (image: BeforeAfterImage) => {
    setEditingImage(image)
    setNewImage({
      title: image.title,
      location: image.location,
      serviceType: image.serviceType,
      beforeImage: image.beforeImage,
      afterImage: image.afterImage,
      description: image.description,
      duration: image.duration,
      client: image.client,
      rating: image.rating,
      isPublished: image.isPublished,
      tags: image.tags,
    })
    setIsEditDialogOpen(true)
  }

  const filteredImages = beforeAfterImages.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPublished =
      filterPublished === "all" ||
      (filterPublished === "published" && image.isPublished) ||
      (filterPublished === "draft" && !image.isPublished)
    return matchesSearch && matchesPublished
  })

  const serviceTypes = [
    "Deep Cleaning",
    "Regular Cleaning",
    "Office Cleaning",
    "Post-Construction Cleaning",
    "Move-in/Move-out Cleaning",
    "Carpet Cleaning",
    "Window Cleaning",
  ]

  const addTag = (tag: string) => {
    if (tag && !newImage.tags.includes(tag)) {
      setNewImage((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewImage((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Gallery Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Gallery Image</DialogTitle>
                <DialogDescription>Upload before/after photos to showcase your work</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newImage.title}
                      onChange={(e) => setNewImage((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Living Room Deep Clean"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newImage.location}
                      onChange={(e) => setNewImage((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Lekki Phase 1, Lagos"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select
                      value={newImage.serviceType}
                      onValueChange={(value) => setNewImage((prev) => ({ ...prev, serviceType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={newImage.duration}
                      onChange={(e) => setNewImage((prev) => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 4 hours"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client Name</Label>
                    <Input
                      id="client"
                      value={newImage.client}
                      onChange={(e) => setNewImage((prev) => ({ ...prev, client: e.target.value }))}
                      placeholder="e.g., Mrs. Johnson"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Select
                      value={newImage.rating.toString()}
                      onValueChange={(value) => setNewImage((prev) => ({ ...prev, rating: Number.parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            {rating} Star{rating !== 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newImage.description}
                    onChange={(e) => setNewImage((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the transformation and work done..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="beforeImage">Before Image URL</Label>
                    <Input
                      id="beforeImage"
                      value={newImage.beforeImage}
                      onChange={(e) => setNewImage((prev) => ({ ...prev, beforeImage: e.target.value }))}
                      placeholder="https://example.com/before.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="afterImage">After Image URL</Label>
                    <Input
                      id="afterImage"
                      value={newImage.afterImage}
                      onChange={(e) => setNewImage((prev) => ({ ...prev, afterImage: e.target.value }))}
                      placeholder="https://example.com/after.jpg"
                    />
                  </div>
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newImage.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag and press Enter"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addTag(e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPublished"
                    checked={newImage.isPublished}
                    onCheckedChange={(checked) => setNewImage((prev) => ({ ...prev, isPublished: checked }))}
                  />
                  <Label htmlFor="isPublished">Publish to gallery</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddImage}>Add Image</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={filterPublished} onValueChange={setFilterPublished}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Images</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              <div className="grid grid-cols-2 h-full">
                <div className="relative">
                  <img
                    src={image.beforeImage || "/placeholder.svg?height=200&width=300&text=Before"}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    BEFORE
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={image.afterImage || "/placeholder.svg?height=200&width=300&text=After"}
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    AFTER
                  </div>
                </div>
              </div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <Badge variant={image.isPublished ? "default" : "secondary"}>
                  {image.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{image.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {image.location}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < image.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{image.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{image.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-medium">{image.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upload Date:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {image.uploadDate}
                  </span>
                </div>
              </div>

              {image.description && <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>}

              {image.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {image.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => toggleImagePublished(image.id)} className="flex-1">
                  {image.isPublished ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                  {image.isPublished ? "Unpublish" : "Publish"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEditDialog(image)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteImage(image.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No gallery images found</p>
            <p className="text-sm text-gray-400 mb-4">
              {searchTerm || filterPublished !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Upload your first before/after photos to showcase your work"}
            </p>
            {!searchTerm && filterPublished === "all" && (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Image
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Gallery Image</DialogTitle>
            <DialogDescription>Update image details and information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={newImage.title}
                  onChange={(e) => setNewImage((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={newImage.location}
                  onChange={(e) => setNewImage((prev) => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-serviceType">Service Type</Label>
                <Select
                  value={newImage.serviceType}
                  onValueChange={(value) => setNewImage((prev) => ({ ...prev, serviceType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={newImage.duration}
                  onChange={(e) => setNewImage((prev) => ({ ...prev, duration: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-client">Client Name</Label>
                <Input
                  id="edit-client"
                  value={newImage.client}
                  onChange={(e) => setNewImage((prev) => ({ ...prev, client: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-rating">Rating (1-5)</Label>
                <Select
                  value={newImage.rating.toString()}
                  onValueChange={(value) => setNewImage((prev) => ({ ...prev, rating: Number.parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} Star{rating !== 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newImage.description}
                onChange={(e) => setNewImage((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-beforeImage">Before Image URL</Label>
                <Input
                  id="edit-beforeImage"
                  value={newImage.beforeImage}
                  onChange={(e) => setNewImage((prev) => ({ ...prev, beforeImage: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-afterImage">After Image URL</Label>
                <Input
                  id="edit-afterImage"
                  value={newImage.afterImage}
                  onChange={(e) => setNewImage((prev) => ({ ...prev, afterImage: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newImage.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addTag(e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isPublished"
                checked={newImage.isPublished}
                onCheckedChange={(checked) => setNewImage((prev) => ({ ...prev, isPublished: checked }))}
              />
              <Label htmlFor="edit-isPublished">Publish to gallery</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditImage}>Update Image</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
