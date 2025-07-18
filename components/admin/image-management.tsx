"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Upload, Search, Filter, Eye, Trash2, Star } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  description: string
  beforeImage: string
  afterImage: string
  serviceType: string
  location: string
  clientName: string
  rating: number
  isPublished: boolean
  uploadDate: string
}

export function ImageManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: "IMG001",
      title: "Living Room Deep Clean",
      description: "Complete transformation of a 3-bedroom apartment living room with deep cleaning service.",
      beforeImage: "/placeholder.svg?height=300&width=400&text=Before",
      afterImage: "/placeholder.svg?height=300&width=400&text=After",
      serviceType: "Deep Cleaning",
      location: "Victoria Island, Lagos",
      clientName: "John Adebayo",
      rating: 5,
      isPublished: true,
      uploadDate: "2024-01-15",
    },
    {
      id: "IMG002",
      title: "Kitchen Makeover",
      description: "Professional kitchen cleaning with grease removal and appliance cleaning.",
      beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Kitchen",
      afterImage: "/placeholder.svg?height=300&width=400&text=After+Kitchen",
      serviceType: "Regular Cleaning",
      location: "Ikeja, Lagos",
      clientName: "Sarah Okafor",
      rating: 5,
      isPublished: true,
      uploadDate: "2024-01-12",
    },
    {
      id: "IMG003",
      title: "Office Space Cleaning",
      description: "Complete office cleaning including workstations, meeting rooms, and common areas.",
      beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Office",
      afterImage: "/placeholder.svg?height=300&width=400&text=After+Office",
      serviceType: "Office Cleaning",
      location: "Lekki, Lagos",
      clientName: "Tech Solutions Ltd",
      rating: 4,
      isPublished: false,
      uploadDate: "2024-01-10",
    },
  ])

  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({
    title: "",
    description: "",
    serviceType: "",
    location: "",
    clientName: "",
    rating: 5,
    isPublished: false,
  })

  const togglePublish = (imageId: string) => {
    setImages(images.map((img) => (img.id === imageId ? { ...img, isPublished: !img.isPublished } : img)))
  }

  const deleteImage = (imageId: string) => {
    setImages(images.filter((img) => img.id !== imageId))
  }

  const addNewImage = () => {
    const newId = `IMG${String(images.length + 1).padStart(3, "0")}`
    const imageToAdd: GalleryImage = {
      id: newId,
      title: newImage.title || "",
      description: newImage.description || "",
      beforeImage: "/placeholder.svg?height=300&width=400&text=Before",
      afterImage: "/placeholder.svg?height=300&width=400&text=After",
      serviceType: newImage.serviceType || "",
      location: newImage.location || "",
      clientName: newImage.clientName || "",
      rating: newImage.rating || 5,
      isPublished: newImage.isPublished || false,
      uploadDate: new Date().toISOString().split("T")[0],
    }

    setImages([imageToAdd, ...images])
    setNewImage({
      title: "",
      description: "",
      serviceType: "",
      location: "",
      clientName: "",
      rating: 5,
      isPublished: false,
    })
    setIsUploadOpen(false)
  }

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = serviceFilter === "all" || image.serviceType === serviceFilter
    return matchesSearch && matchesService
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gallery Management</h2>
          <p className="text-muted-foreground">Manage before/after photos and project showcases</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload New Photos
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Before/After Photos</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Project Title</Label>
                  <Input
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    placeholder="e.g., Living Room Deep Clean"
                  />
                </div>
                <div>
                  <Label>Service Type</Label>
                  <Select
                    value={newImage.serviceType}
                    onValueChange={(value) => setNewImage({ ...newImage, serviceType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
                      <SelectItem value="Regular Cleaning">Regular Cleaning</SelectItem>
                      <SelectItem value="Move-in Cleaning">Move-in Cleaning</SelectItem>
                      <SelectItem value="Office Cleaning">Office Cleaning</SelectItem>
                      <SelectItem value="Post-Construction">Post-Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={newImage.location}
                    onChange={(e) => setNewImage({ ...newImage, location: e.target.value })}
                    placeholder="e.g., Victoria Island, Lagos"
                  />
                </div>
                <div>
                  <Label>Client Name</Label>
                  <Input
                    value={newImage.clientName}
                    onChange={(e) => setNewImage({ ...newImage, clientName: e.target.value })}
                    placeholder="Client name (optional)"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={newImage.description}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  placeholder="Describe the cleaning project and results..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Rating</Label>
                  <Select
                    value={String(newImage.rating)}
                    onValueChange={(value) => setNewImage({ ...newImage, rating: Number(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={newImage.isPublished}
                    onCheckedChange={(checked) => setNewImage({ ...newImage, isPublished: checked })}
                  />
                  <Label>Publish immediately</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Before Photo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload before photo</p>
                  </div>
                </div>
                <div>
                  <Label>After Photo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload after photo</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addNewImage}>Upload Photos</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, location, or client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
                <SelectItem value="Regular Cleaning">Regular Cleaning</SelectItem>
                <SelectItem value="Move-in Cleaning">Move-in Cleaning</SelectItem>
                <SelectItem value="Office Cleaning">Office Cleaning</SelectItem>
                <SelectItem value="Post-Construction">Post-Construction</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id}>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Before/After Images */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Before</p>
                    <img
                      src={image.beforeImage || "/placeholder.svg"}
                      alt="Before"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">After</p>
                    <img
                      src={image.afterImage || "/placeholder.svg"}
                      alt="After"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                </div>

                {/* Image Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                    <Badge variant={image.isPublished ? "default" : "secondary"}>
                      {image.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>🧹 {image.serviceType}</p>
                    <p>📍 {image.location}</p>
                    <p>👤 {image.clientName}</p>
                    <p>📅 {image.uploadDate}</p>
                  </div>

                  <div className="flex items-center gap-1">{renderStars(image.rating)}</div>

                  <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedImage(image)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{selectedImage?.title}</DialogTitle>
                      </DialogHeader>
                      {selectedImage && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Before</Label>
                              <img
                                src={selectedImage.beforeImage || "/placeholder.svg"}
                                alt="Before"
                                className="w-full h-64 object-cover rounded"
                              />
                            </div>
                            <div>
                              <Label>After</Label>
                              <img
                                src={selectedImage.afterImage || "/placeholder.svg"}
                                alt="After"
                                className="w-full h-64 object-cover rounded"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Service Type</Label>
                              <p>{selectedImage.serviceType}</p>
                            </div>
                            <div>
                              <Label>Location</Label>
                              <p>{selectedImage.location}</p>
                            </div>
                            <div>
                              <Label>Client</Label>
                              <p>{selectedImage.clientName}</p>
                            </div>
                            <div>
                              <Label>Rating</Label>
                              <div className="flex items-center gap-1">{renderStars(selectedImage.rating)}</div>
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <p>{selectedImage.description}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => togglePublish(image.id)}>
                    {image.isPublished ? "Unpublish" : "Publish"}
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => deleteImage(image.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No images found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
