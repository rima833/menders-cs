"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Upload, Eye, Edit, Trash2, Star, MapPin, Calendar } from "lucide-react"

interface GalleryImage {
  id: number
  title: string
  description: string
  beforeImage: string
  afterImage: string
  serviceType: string
  location: string
  rating: number
  dateCompleted: string
  isPublished: boolean
  clientName: string
}

export function ImageManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      title: "Luxury Apartment Deep Clean",
      description:
        "Complete transformation of a 3-bedroom luxury apartment in Victoria Island. Deep cleaning of all rooms, kitchen, and bathrooms.",
      beforeImage: "/placeholder.jpg",
      afterImage: "/placeholder.jpg",
      serviceType: "Deep Cleaning",
      location: "Victoria Island, Lagos",
      rating: 5,
      dateCompleted: "2024-01-15",
      isPublished: true,
      clientName: "John Adebayo",
    },
    {
      id: 2,
      title: "Office Space Cleaning",
      description:
        "Professional office cleaning service for a tech startup. Sanitized workstations, meeting rooms, and common areas.",
      beforeImage: "/placeholder.jpg",
      afterImage: "/placeholder.jpg",
      serviceType: "Office Cleaning",
      location: "Lekki Phase 1, Lagos",
      rating: 4,
      dateCompleted: "2024-01-12",
      isPublished: true,
      clientName: "TechCorp Ltd",
    },
    {
      id: 3,
      title: "Move-in Cleaning Service",
      description:
        "Thorough move-in cleaning for new homeowners. Cleaned all surfaces, appliances, and fixtures to move-in ready condition.",
      beforeImage: "/placeholder.jpg",
      afterImage: "/placeholder.jpg",
      serviceType: "Move-in Cleaning",
      location: "Ikoyi, Lagos",
      rating: 5,
      dateCompleted: "2024-01-10",
      isPublished: false,
      clientName: "Sarah Okafor",
    },
    {
      id: 4,
      title: "Post-Construction Cleanup",
      description:
        "Extensive post-construction cleaning of a newly built residential property. Removed dust, debris, and construction residue.",
      beforeImage: "/placeholder.jpg",
      afterImage: "/placeholder.jpg",
      serviceType: "Post-Construction",
      location: "Surulere, Lagos",
      rating: 4,
      dateCompleted: "2024-01-08",
      isPublished: true,
      clientName: "Grace Eze",
    },
  ]

  const togglePublishStatus = (imageId: number) => {
    // In a real app, this would update the database
    console.log(`Toggling publish status for image ${imageId}`)
  }

  const deleteImage = (imageId: number) => {
    // In a real app, this would delete from database
    console.log(`Deleting image ${imageId}`)
  }

  const filteredImages = galleryImages.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = serviceFilter === "all" || image.serviceType === serviceFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && image.isPublished) ||
      (statusFilter === "unpublished" && !image.isPublished)
    return matchesSearch && matchesService && matchesStatus
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gallery Management</h2>
        <p className="text-gray-600">Manage before/after photos and project showcases</p>
      </div>

      {/* Upload Button */}
      <div className="mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">
              <Upload className="h-4 w-4 mr-2" />
              Upload New Photos
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Before/After Photos</DialogTitle>
              <DialogDescription>Add new project photos to your gallery</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="before-image">Before Image</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload before image</p>
                </div>
              </div>
              <div>
                <Label htmlFor="after-image">After Image</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload after image</p>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input id="project-title" placeholder="Enter project title..." />
                </div>
                <div>
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea id="project-description" placeholder="Describe the cleaning project..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service-type">Service Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
                        <SelectItem value="Regular Cleaning">Regular Cleaning</SelectItem>
                        <SelectItem value="Office Cleaning">Office Cleaning</SelectItem>
                        <SelectItem value="Move-in Cleaning">Move-in Cleaning</SelectItem>
                        <SelectItem value="Post-Construction">Post-Construction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter location..." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input id="client-name" placeholder="Enter client name..." />
                  </div>
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
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
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Upload & Publish</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
            <SelectItem value="Regular Cleaning">Regular Cleaning</SelectItem>
            <SelectItem value="Office Cleaning">Office Cleaning</SelectItem>
            <SelectItem value="Move-in Cleaning">Move-in Cleaning</SelectItem>
            <SelectItem value="Post-Construction">Post-Construction</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative">
              <div className="grid grid-cols-2 h-48">
                <div className="relative">
                  <img
                    src={image.beforeImage || "/placeholder.svg"}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Before
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={image.afterImage || "/placeholder.svg"}
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    After
                  </div>
                </div>
              </div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <Badge variant={image.isPublished ? "default" : "secondary"}>
                  {image.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                <div className="flex items-center mb-2">
                  {renderStars(image.rating)}
                  <span className="ml-2 text-sm text-gray-600">({image.rating}/5)</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
              <div className="space-y-1 text-xs text-gray-500 mb-3">
                <p className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {image.location}
                </p>
                <p className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {image.dateCompleted}
                </p>
                <p>Service: {image.serviceType}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedImage(image)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{image.title}</DialogTitle>
                        <DialogDescription>Project details and before/after comparison</DialogDescription>
                      </DialogHeader>
                      {selectedImage && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Before</h4>
                              <img
                                src={selectedImage.beforeImage || "/placeholder.svg"}
                                alt="Before"
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">After</h4>
                              <img
                                src={selectedImage.afterImage || "/placeholder.svg"}
                                alt="After"
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p>
                                <strong>Service Type:</strong> {selectedImage.serviceType}
                              </p>
                              <p>
                                <strong>Location:</strong> {selectedImage.location}
                              </p>
                              <p>
                                <strong>Client:</strong> {selectedImage.clientName}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Date Completed:</strong> {selectedImage.dateCompleted}
                              </p>
                              <p>
                                <strong>Rating:</strong> {selectedImage.rating}/5 stars
                              </p>
                              <p>
                                <strong>Status:</strong> {selectedImage.isPublished ? "Published" : "Draft"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p>
                              <strong>Description:</strong>
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{selectedImage.description}</p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteImage(image.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant={image.isPublished ? "secondary" : "default"}
                  size="sm"
                  onClick={() => togglePublishStatus(image.id)}
                >
                  {image.isPublished ? "Unpublish" : "Publish"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
