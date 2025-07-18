"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, Search, Filter, Eye, Edit, Trash2, ImageIcon } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  description: string
  category: "before-after" | "team" | "equipment" | "testimonial"
  beforeImage?: string
  afterImage?: string
  singleImage?: string
  isPublished: boolean
  uploadDate: string
  tags: string[]
}

export function ImageManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const images: GalleryImage[] = [
    {
      id: "IMG001",
      title: "Living Room Deep Clean",
      description: "Complete transformation of a living room with deep cleaning service",
      category: "before-after",
      beforeImage: "/placeholder.svg?height=200&width=300&text=Before",
      afterImage: "/placeholder.svg?height=200&width=300&text=After",
      isPublished: true,
      uploadDate: "2024-01-20",
      tags: ["deep-cleaning", "living-room", "residential"],
    },
    {
      id: "IMG002",
      title: "Professional Cleaning Team",
      description: "Our experienced cleaning professionals at work",
      category: "team",
      singleImage: "/placeholder.svg?height=200&width=300&text=Team",
      isPublished: true,
      uploadDate: "2024-01-19",
      tags: ["team", "professional", "staff"],
    },
    {
      id: "IMG003",
      title: "Kitchen Sanitization",
      description: "Before and after kitchen deep cleaning and sanitization",
      category: "before-after",
      beforeImage: "/placeholder.svg?height=200&width=300&text=Kitchen+Before",
      afterImage: "/placeholder.svg?height=200&width=300&text=Kitchen+After",
      isPublished: false,
      uploadDate: "2024-01-18",
      tags: ["kitchen", "sanitization", "deep-cleaning"],
    },
    {
      id: "IMG004",
      title: "Cleaning Equipment",
      description: "Professional grade cleaning equipment and supplies",
      category: "equipment",
      singleImage: "/placeholder.svg?height=200&width=300&text=Equipment",
      isPublished: true,
      uploadDate: "2024-01-17",
      tags: ["equipment", "professional", "tools"],
    },
  ]

  const getCategoryBadge = (category: string) => {
    const variants = {
      "before-after": "default",
      team: "secondary",
      equipment: "outline",
      testimonial: "destructive",
    } as const

    return <Badge variant={variants[category as keyof typeof variants]}>{category.replace("-", " ")}</Badge>
  }

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || image.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const togglePublishStatus = (imageId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggling publish status for image ${imageId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gallery Management</h2>
          <p className="text-gray-600">Manage before/after photos and gallery images</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="before-after">Before & After</SelectItem>
                <SelectItem value="team">Team Photos</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="testimonial">Testimonials</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              {image.category === "before-after" ? (
                <div className="grid grid-cols-2 h-full">
                  <div className="relative">
                    <img
                      src={image.beforeImage || "/placeholder.svg"}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-white">
                        Before
                      </Badge>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={image.afterImage || "/placeholder.svg"}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="bg-white">
                        After
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={image.singleImage || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 right-2 flex space-x-2">
                {getCategoryBadge(image.category)}
                <Badge variant={image.isPublished ? "default" : "secondary"}>
                  {image.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{image.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {image.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{image.uploadDate}</span>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedImage(image)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Edit Image - {image.title}</DialogTitle>
                        <DialogDescription>Manage image details and settings</DialogDescription>
                      </DialogHeader>
                      {selectedImage && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={selectedImage.title} className="mt-1" />
                              </div>
                              <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  value={selectedImage.description}
                                  className="mt-1"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label htmlFor="category">Category</Label>
                                <Select value={selectedImage.category}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="before-after">Before & After</SelectItem>
                                    <SelectItem value="team">Team Photos</SelectItem>
                                    <SelectItem value="equipment">Equipment</SelectItem>
                                    <SelectItem value="testimonial">Testimonials</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="tags">Tags (comma separated)</Label>
                                <Input id="tags" value={selectedImage.tags.join(", ")} className="mt-1" />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="published"
                                  checked={selectedImage.isPublished}
                                  onCheckedChange={() => togglePublishStatus(selectedImage.id)}
                                />
                                <Label htmlFor="published">Published</Label>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label>Preview</Label>
                                <div className="mt-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                  {selectedImage.category === "before-after" ? (
                                    <div className="grid grid-cols-2 h-full">
                                      <img
                                        src={selectedImage.beforeImage || "/placeholder.svg"}
                                        alt="Before"
                                        className="w-full h-full object-cover"
                                      />
                                      <img
                                        src={selectedImage.afterImage || "/placeholder.svg"}
                                        alt="After"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <img
                                      src={selectedImage.singleImage || "/placeholder.svg"}
                                      alt={selectedImage.title}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Button variant="outline" className="w-full bg-transparent">
                                  <Upload className="mr-2 h-4 w-4" />
                                  Replace Image
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full text-red-600 hover:text-red-700 bg-transparent"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Image
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Area */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-8 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload New Images</h3>
          <p className="text-gray-600 mb-4">Drag and drop images here, or click to select files</p>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Choose Files
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
