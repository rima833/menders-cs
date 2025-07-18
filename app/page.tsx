import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WhyMenders } from "@/components/why-menders"
import { FreeClean } from "@/components/free-clean"
import { Testimonials } from "@/components/testimonials"
import { Partnership } from "@/components/partnership"
import { Contact } from "@/components/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FormProvider } from "@/components/form-provider"
import { PartnersDisplay } from "@/components/partners-display"
import { PricingCalculator } from "@/components/pricing-calculator"
import { BookingSystem } from "@/components/booking-system"
import { BeforeAfterGallery } from "@/components/before-after-gallery"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <FormProvider>
        <Header />
        <main>
          <Hero />
          <WhyMenders />
          <Services />
          <PricingCalculator />
          <FreeClean />
          <BookingSystem />
          <Testimonials />
          <BeforeAfterGallery />
          <Partnership />
          <PartnersDisplay />
          <Contact />
        </main>
        <Footer />
      </FormProvider>
    </div>
  )
}
