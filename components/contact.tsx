"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Instagram } from "lucide-react"
import { useForm } from "./form-provider"

export function Contact() {
  const { openCallRequestModal } = useForm()

  return (
    <section id="contact" className="py-20 bg-background dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">📞 Contact Us</h2>
          <p className="text-xl text-muted-foreground">Ready to get started? Reach out to us in Abuja or Lagos.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Card className="text-center border-border">
            <CardHeader>
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg text-foreground">Abuja Office</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Jikwoyi, FCT</p>
            </CardContent>
          </Card>

          <Card className="text-center border-border">
            <CardHeader>
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg text-foreground">Lagos Office</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming Soon</p>
            </CardContent>
          </Card>

          <Card className="text-center border-border">
            <CardHeader>
              <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg text-foreground">Call/WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">080X XXX XXXX</p>
            </CardContent>
          </Card>

          <Card className="text-center border-border">
            <CardHeader>
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg text-foreground">Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">hello@menderscleaning.ng</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 mr-4" onClick={openCallRequestModal}>
            <Phone className="mr-2 h-5 w-5" />
            Call Now
          </Button>
          <Button size="lg" variant="outline" className="border-border bg-transparent">
            <Instagram className="mr-2 h-5 w-5" />
            Follow @menderscleaning
          </Button>
        </div>
      </div>
    </section>
  )
}
