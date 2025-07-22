import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WhyMenders } from "@/components/why-menders"
import { PricingCalculator } from "@/components/pricing-calculator"
import { BeforeAfterGallery } from "@/components/before-after-gallery"
import { Testimonials } from "@/components/testimonials"
import { Partnership } from "@/components/partnership"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FreeClean } from "@/components/free-clean"
import { LiveChat } from "@/components/live-chat"
import { InlineNotification } from "@/components/notification-center"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyMenders />
        <PricingCalculator />
        <BeforeAfterGallery />
        <Testimonials />
        <FreeClean />
        <Partnership />
        <Contact />
      </main>
      <Footer />
      <LiveChat />
      <InlineNotification />
    </div>
  )
}
