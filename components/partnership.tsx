"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, TrendingUp, Award, CheckCircle, ArrowRight } from "lucide-react"
import { useForm } from "@/components/form-provider"

const partnershipBenefits = [
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    description: "Increase your revenue by 30-50% through our partnership program",
  },
  {
    icon: Users,
    title: "Customer Base",
    description: "Access to our extensive customer network across Nigeria",
  },
  {
    icon: Award,
    title: "Brand Recognition",
    description: "Partner with Nigeria's most trusted cleaning service brand",
  },
  {
    icon: Building2,
    title: "Business Support",
    description: "Complete business support including training and marketing",
  },
]

const partnershipTypes = [
  {
    title: "Franchise Partner",
    description: "Own and operate a Menders franchise in your city",
    benefits: ["Full brand rights", "Comprehensive training", "Marketing support", "Ongoing assistance"],
    investment: "₦2,000,000 - ₦5,000,000",
  },
  {
    title: "Service Partner",
    description: "Provide cleaning services under the Menders brand",
    benefits: ["Flexible schedule", "Steady income", "Professional training", "Equipment provided"],
    investment: "₦500,000 - ₦1,000,000",
  },
  {
    title: "Referral Partner",
    description: "Earn commissions by referring customers to Menders",
    benefits: ["No investment required", "Earn up to 15% commission", "Marketing materials", "Online tracking"],
    investment: "No investment required",
  },
]

export function Partnership() {
  const { openModal } = useForm()

  return (
    <section
      id="partnership"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Partnership Opportunities
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Partner With <span className="text-blue-600">Menders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join Nigeria's fastest-growing cleaning service network. Build a profitable business with our proven system
            and ongoing support.
          </p>
        </div>

        {/* Partnership Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnershipBenefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership Types */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {partnershipTypes.map((type, index) => (
            <Card
              key={index}
              className="relative hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200"
            >
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">{type.title}</CardTitle>
                <CardDescription className="text-base">{type.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Benefits Include:</h4>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Investment Range:</p>
                  <p className="font-semibold text-lg">{type.investment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Partnership Journey?</h3>
              <p className="text-blue-100 mb-6">
                Join over 50+ successful partners across Nigeria. Get started with a free consultation and business
                assessment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => openModal("partner")}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => openModal("call")}
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Partner Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Sarah Okafor - Lagos Franchise</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      "In just 18 months, I've grown from a single cleaner to managing a team of 15. The Menders system
                      and support made all the difference."
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-600 font-semibold">+250% Revenue Growth</span>
                      <span className="text-blue-600">15 Team Members</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Michael Adebayo - Abuja Partner</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      "The referral program has been incredible. I earn consistent commissions just by connecting
                      friends with quality cleaning services."
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-600 font-semibold">₦150K Monthly Commissions</span>
                      <span className="text-blue-600">50+ Referrals</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
