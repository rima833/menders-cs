import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Amanda",
    location: "Abuja",
    text: "The Menders team transformed my apartment after a party weekend. Super professional!",
    rating: 5,
  },
  {
    name: "Tunde",
    location: "Lekki",
    text: "Post-construction dust was gone in no time. Highly recommend.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">💬 What Clients Are Saying</h2>
          <p className="text-xl text-muted-foreground">
            Don't just take our word for it - hear from our satisfied customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg dark:shadow-2xl dark:shadow-primary/10 border-border">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="text-right">
                  <p className="font-semibold text-foreground">– {testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">({testimonial.location})</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
