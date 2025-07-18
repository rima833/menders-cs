"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, Pause, Star, MapPin } from "lucide-react"

const beforeAfterData = [
  {
    id: 1,
    title: "Living Room Deep Clean",
    location: "Abuja",
    serviceType: "Deep Cleaning",
    beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Living+Room",
    afterImage: "/placeholder.svg?height=300&width=400&text=After+Living+Room",
    description: "Complete transformation of a family living room with deep carpet cleaning and furniture polishing.",
    duration: "3 hours",
    rating: 5,
    client: "Mrs. Adebayo",
  },
  {
    id: 2,
    title: "Post-Construction Cleanup",
    location: "Lagos",
    serviceType: "Post-Construction",
    beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Construction",
    afterImage: "/placeholder.svg?height=300&width=400&text=After+Construction",
    description: "New apartment ready for move-in after complete post-construction cleaning service.",
    duration: "6 hours",
    rating: 5,
    client: "Tunde O.",
  },
  {
    id: 3,
    title: "Office Space Makeover",
    location: "Abuja",
    serviceType: "Commercial",
    beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Office",
    afterImage: "/placeholder.svg?height=300&width=400&text=After+Office",
    description: "Professional office cleaning that boosted team productivity and client impressions.",
    duration: "4 hours",
    rating: 5,
    client: "Tech Startup Ltd.",
  },
  {
    id: 4,
    title: "Kitchen Deep Clean",
    location: "Lagos",
    serviceType: "Deep Cleaning",
    beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Kitchen",
    afterImage: "/placeholder.svg?height=300&width=400&text=After+Kitchen",
    description: "Complete kitchen restoration including appliance cleaning and grease removal.",
    duration: "2.5 hours",
    rating: 5,
    client: "Chef Maria",
  },
  {
    id: 5,
    title: "Event Venue Cleanup",
    location: "Abuja",
    serviceType: "Event Cleaning",
    beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Event",
    afterImage: "/placeholder.svg?height=300&width=400&text=After+Event",
    description: "Post-wedding cleanup that restored the venue to pristine condition overnight.",
    duration: "5 hours",
    rating: 5,
    client: "Golden Events",
  },
  {
    id: 6,
    title: "Bathroom Restoration",
    location: "Lagos",
    serviceType: "Deep Cleaning",
    beforeImage: "/placeholder.svg?height=300&width=400&text=Before+Bathroom",
    afterImage: "/placeholder.svg?height=300&width=400&text=After+Bathroom",
    description: "Complete bathroom restoration with tile cleaning and sanitization.",
    duration: "2 hours",
    rating: 5,
    client: "Mr. Johnson",
  },
]

export function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [showBefore, setShowBefore] = useState(true)

  const currentItem = beforeAfterData[currentIndex]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterData.length)
    setShowBefore(true)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterData.length) % beforeAfterData.length)
    setShowBefore(true)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">✨ Before & After Transformations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the magic happen! Real results from our professional cleaning services across Abuja and Lagos.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Gallery */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Image Display */}
            <div className="relative">
              <Card className="overflow-hidden shadow-2xl border-border dark:shadow-2xl dark:shadow-primary/10">
                <div className="relative h-80 bg-muted">
                  <img
                    src={showBefore ? currentItem.beforeImage : currentItem.afterImage}
                    alt={`${showBefore ? "Before" : "After"} - ${currentItem.title}`}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Before/After Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={showBefore ? "destructive" : "default"}
                      className={`text-white font-bold px-4 py-2 text-lg ${
                        showBefore ? "bg-red-500 animate-pulse" : "bg-green-500 animate-bounce"
                      }`}
                    >
                      {showBefore ? "BEFORE" : "AFTER"}
                    </Badge>
                  </div>

                  {/* Toggle Button */}
                  <Button
                    className="absolute bottom-4 right-4 bg-background/90 text-foreground hover:bg-background"
                    onClick={() => setShowBefore(!showBefore)}
                  >
                    Show {showBefore ? "After" : "Before"}
                  </Button>
                </div>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" onClick={prevSlide} className="p-2 bg-transparent">
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="flex items-center space-x-1"
                  >
                    {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span>{isAutoPlay ? "Pause" : "Play"}</span>
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} / {beforeAfterData.length}
                  </span>
                </div>

                <Button variant="outline" onClick={nextSlide} className="p-2 bg-transparent">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Details Panel */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{currentItem.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {currentItem.location}
                        </div>
                        <Badge variant="secondary">{currentItem.serviceType}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(currentItem.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{currentItem.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-foreground">Duration:</span>
                      <p className="text-muted-foreground">{currentItem.duration}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Client:</span>
                      <p className="text-muted-foreground">{currentItem.client}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="text-center p-4 border-border">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </Card>
                <Card className="text-center p-4 border-border">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Done</div>
                </Card>
                <Card className="text-center p-4 border-border">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">24hr</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </Card>
              </div>

              {/* CTA */}
              <Card className="bg-gradient-to-r from-primary to-green-600 text-primary-foreground border-0">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold mb-2">Ready for Your Transformation?</h4>
                  <p className="mb-4">Join hundreds of satisfied customers across Abuja and Lagos</p>
                  <Button className="bg-background text-foreground hover:bg-background/90">
                    Book Your Cleaning Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {beforeAfterData.map((item, index) => (
              <Card
                key={item.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-border ${
                  index === currentIndex ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setShowBefore(true)
                }}
              >
                <div className="relative h-24 overflow-hidden rounded-t-lg">
                  <img
                    src={item.beforeImage || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Badge variant="secondary" className="text-xs">
                      {item.serviceType}
                    </Badge>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
