"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, CheckCircle } from "lucide-react"
import { useForm } from "./form-provider"

export function BookingSystem() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const availableDates = [
    { date: "2024-01-20", day: "Today", available: true },
    { date: "2024-01-21", day: "Tomorrow", available: true },
    { date: "2024-01-22", day: "Mon", available: true },
    { date: "2024-01-23", day: "Tue", available: false },
    { date: "2024-01-24", day: "Wed", available: true },
    { date: "2024-01-25", day: "Thu", available: true },
    { date: "2024-01-26", day: "Fri", available: true },
  ]

  const timeSlots = [
    { time: "8:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "2:00 PM", available: true },
    { time: "4:00 PM", available: true },
    { time: "6:00 PM", available: true },
  ]

  const cities = [
    { name: "Abuja", available: true, teams: 5 },
    { name: "Lagos", available: true, teams: 3 },
  ]

  const { openBookServiceModal } = useForm()

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">📅 Quick Booking</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book your cleaning service in just a few clicks. Real-time availability across both cities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* City Selection */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <MapPin className="mr-2 h-5 w-5" />
                  Select City
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cities.map((city) => (
                  <Button
                    key={city.name}
                    variant={selectedCity === city.name ? "default" : "outline"}
                    className="w-full justify-between"
                    onClick={() => setSelectedCity(city.name)}
                  >
                    <span>{city.name}</span>
                    <Badge variant="secondary">{city.teams} teams</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Calendar className="mr-2 h-5 w-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {availableDates.map((dateOption) => (
                  <Button
                    key={dateOption.date}
                    variant={selectedDate === dateOption.date ? "default" : "outline"}
                    className="w-full justify-between"
                    onClick={() => dateOption.available && setSelectedDate(dateOption.date)}
                    disabled={!dateOption.available}
                  >
                    <span>{dateOption.day}</span>
                    {dateOption.available ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-xs text-muted-foreground">Booked</span>
                    )}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Clock className="mr-2 h-5 w-5" />
                  Select Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    className="w-full justify-between"
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                  >
                    <span>{slot.time}</span>
                    {slot.available ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-xs text-muted-foreground">Booked</span>
                    )}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {selectedCity && selectedDate && selectedTime && (
            <Card className="mt-8 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Booking Summary</h3>
                  <div className="space-y-2 text-muted-foreground mb-6">
                    <p>
                      <strong className="text-foreground">City:</strong> {selectedCity}
                    </p>
                    <p>
                      <strong className="text-foreground">Date:</strong>{" "}
                      {availableDates.find((d) => d.date === selectedDate)?.day}
                    </p>
                    <p>
                      <strong className="text-foreground">Time:</strong> {selectedTime}
                    </p>
                  </div>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => openBookServiceModal()}>
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
