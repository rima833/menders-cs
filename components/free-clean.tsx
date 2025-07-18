"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Users, Camera } from "lucide-react"
import { useForm } from "./form-provider"

export function FreeClean() {
  const { openFreeCleanModal } = useForm()

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white dark-transition">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">🎉 Get a Free Mini Clean!</h2>
          <p className="text-xl mb-8">
            Launching in Abuja and Lagos? We're offering free mini cleaning sessions to help you experience our magic
            firsthand.
          </p>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">What's Included?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-yellow-300 mt-1" />
                  <div>
                    <h4 className="font-semibold">45 Minutes</h4>
                    <p className="text-white/80">Or 1-2 rooms cleaned</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-yellow-300 mt-1" />
                  <div>
                    <h4 className="font-semibold">New Clients Only</h4>
                    <p className="text-white/80">First-time customers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Camera className="h-6 w-6 text-yellow-300 mt-1" />
                  <div>
                    <h4 className="font-semibold">Before & After</h4>
                    <p className="text-white/80">Photos for our portfolio</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>Limited slots weekly</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>Must follow @menderscleaning</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>Allow before-and-after photos</span>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-blue-600 dark:hover:bg-white text-lg px-8 py-4"
            onClick={openFreeCleanModal}
          >
            📍 Book My Free Clean
          </Button>
        </div>
      </div>
    </section>
  )
}
