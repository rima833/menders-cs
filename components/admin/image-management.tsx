"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, ImageIcon, Eye, Edit, Trash2, Search, Filter, Download, Share } from "lucide-react"

export function ImageManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const images = [
    {
      id: "IMG001",
      title: "Kitchen Deep Clean - Before",
      type: "before",
      category: "Kitchen",
      url: "/placeholder.svg?height=300&width=400&text=Kitchen+Before",
      uploadDate: "2024-01-15",
      bookingId: "BK001",
      customer: "Sarah Johnson",
      description: "Kitchen before deep cleaning service",
      published: true,
      tags: ["kitchen", "deep-clean", "before"],
    },
    {
      id: "IMG002",
      title: "Kitchen Deep Clean - After",
      type: "after",
      category: "Kitchen",
      url: "/placeholder.svg?height=300&width=400&text=Kitchen+After",
      uploadDate: "2024-01-15",
      bookingId: "BK001",
      customer: "Sarah Johnson",
      description: "Kitchen after deep cleaning service - sparkling clean",
      published: true,
      tags: ["kitchen", "deep-clean", "after"],
    },
    {
      id: "IMG003",
      title: "Living Room - Before",
      type: "before",
      category: "Living Room",
      url: "/placeholder.svg?height=300&width=400&text=Living+Room+Before",
      uploadDate: "2024-01-18",
      bookingId: "BK002",
      customer: "Michael Chen",
      description: "Living room before regular cleaning",
      published: false,
      tags: ["living-room", "regular-clean", "before"],
    },
    {
      id: "IMG004",
      title: "Living Room - After",
      type: "after",
      category: "Living Room",
      url: "/placeholder.svg?height=300&width=400&text=Living+Room+After",
      uploadDate: "2024-01-18",
      bookingId: "BK002",
      customer: "Michael Chen",
      description: "Living room after regular cleaning - fresh and tidy",
      published: false,
      tags: ["living-room", "regular-clean", "after"],
    },
    {
      id: "IMG005",
      title: "Bathroom Deep Clean - Before",
      type: "before",
      category: "Bathroom",
      url: "/placeholder.svg?height=300&width=400&text=Bathroom+Before",
      uploadDate: "2024-01-19",
      bookingId: "BK003",
      customer: "Emma Wilson",
      description: "Bathroom before move-in cleaning",
      published: true,
      tags: ["bathroom", "move-in", "before"],
    },
    {
      id: "IMG006",
      title: "Bathroom Deep Clean - After",
      type: "after",
      category: "Bathroom",
      url: "/placeholder.svg?height=300&width=400&text=Bathroom+After",
      uploadDate: "2024-01-19",
      bookingId: "BK003",
      customer: "Emma Wilson",
      description: "Bathroom after move-in cleaning - pristine condition",
      published: true,
      tags: ["bathroom", "move-in", "after"],
    },
  ]

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || image.type === filterType
    return matchesSearch && matchesFilter
  })

  const togglePublished = (imageId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggling published status for image ${imageId}`)
  }

  const deleteImage = (imageId: string) => {
    // In a real app, this would make an API call
    console.log(`Deleting image ${imageId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600">Manage before/after photos and gallery content</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{images.length}</div>
                <div className="text-sm text-gray-600">Total Images</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{images.filter((img) => img.published).length}</div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{images.filter((img) => img.type === "before").length}</div>
                <div className="text-sm text-gray-600">Before Photos</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{images.filter((img) => img.type === "after").length}</div>
                <div className="text-sm text-gray-600">After Photos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant={filterType === "all" ? "default" : "outline"} onClick={() => setFilterType("all")}>
                All
              </Button>
              <Button variant={filterType === "before" ? "default" : "outline"} onClick={() => setFilterType("before")}>
                Before
              </Button>
              <Button variant={filterType === "after" ? "default" : "outline"} onClick={() => setFilterType("after")}>
                After
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2">
                <Badge variant={image.type === "before" ? "destructive" : "default"}>{image.type}</Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant={image.published ? "default" : "secondary"}>
                  {image.published ? "Published" : "Draft"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{image.customer}</span>
                  <span>{image.uploadDate}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {image.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
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
                        <DialogDescription>Image details and management options</DialogDescription>
                      </DialogHeader>
                      {selectedImage && (
                        <div className="space-y-6">
                          <div className="aspect-video">
                            <img
                              src={selectedImage.url || "/placeholder.svg"}
                              alt={selectedImage.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                value={selectedImage.title}
                                onChange={(e) =>
                                  setSelectedImage({
                                    ...selectedImage,
                                    title: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="category">Category</Label>
                              <Input
                                id="category"
                                value={selectedImage.category}
                                onChange={(e) =>
                                  setSelectedImage({
                                    ...selectedImage,
                                    category: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={selectedImage.description}
                              onChange={(e) =>
                                setSelectedImage({
                                  ...selectedImage,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="flex justify-between">
                            <div className="flex space-x-2">
                              <Button
                                variant={selectedImage.published ? "default" : "outline"}
                                onClick={() => togglePublished(selectedImage.id)}
                              >
                                {selectedImage.published ? "Published" : "Publish"}
                              </Button>
                              <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                              <Button variant="outline">
                                <Share className="mr-2 h-4 w-4" />
                                Share
                              </Button>
                            </div>
                            <Button variant="destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant={image.published ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePublished(image.id)}
                >
                  {image.published ? "Published" : "Publish"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg">
            <Upload className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Images</DialogTitle>
            <DialogDescription>Add new before/after photos to your gallery</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Button variant="outline">Choose Files</Button>
                <p className="mt-2 text-sm text-gray-600">or drag and drop images here</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="upload-title">Title</Label>
                <Input id="upload-title" placeholder="Image title" />
              </div>
              <div>
                <Label htmlFor="upload-type">Type</Label>
                <select id="upload-type" className="w-full p-2 border rounded">
                  <option value="before">Before</option>
                  <option value="after">After</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="upload-description">Description</Label>
              <Textarea id="upload-description" placeholder="Image description" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Upload Images</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
