"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { FreeCleanModal } from "./modals/free-clean-modal"
import { CallRequestModal } from "./modals/call-request-modal"
import { CustomQuoteModal } from "./modals/custom-quote-modal"
import { PartnerModal } from "./modals/partner-modal"
import { BookServiceModal } from "./modals/book-service-modal"

interface FormContextType {
  openFreeCleanModal: () => void
  openCallRequestModal: () => void
  openCustomQuoteModal: () => void
  openPartnerModal: () => void
  openBookServiceModal: (estimatedPrice?: number, serviceDetails?: any) => void
  addPartner: (partner: Partner) => void
  partners: Partner[]
}

interface Partner {
  id: string
  name: string
  type: string
  logo?: string
  description: string
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function useForm() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useForm must be used within FormProvider")
  }
  return context
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [showFreeCleanModal, setShowFreeCleanModal] = useState(false)
  const [showCallRequestModal, setShowCallRequestModal] = useState(false)
  const [showCustomQuoteModal, setShowCustomQuoteModal] = useState(false)
  const [showPartnerModal, setShowPartnerModal] = useState(false)
  const [showBookServiceModal, setShowBookServiceModal] = useState(false)
  const [bookingData, setBookingData] = useState<{ estimatedPrice?: number; serviceDetails?: any }>({})
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: "1",
      name: "Abuja Property Management",
      type: "Property Manager",
      description: "Managing 50+ residential properties across Abuja",
    },
    {
      id: "2",
      name: "Lagos Events Co.",
      type: "Event Planner",
      description: "Premium event planning and management services",
    },
    {
      id: "3",
      name: "Prime Real Estate",
      type: "Real Estate Agent",
      description: "Leading real estate agency in FCT and Lagos",
    },
  ])

  const addPartner = (partner: Partner) => {
    setPartners((prev) => [...prev, { ...partner, id: Date.now().toString() }])
  }

  const value = {
    openFreeCleanModal: () => setShowFreeCleanModal(true),
    openCallRequestModal: () => setShowCallRequestModal(true),
    openCustomQuoteModal: () => setShowCustomQuoteModal(true),
    openPartnerModal: () => setShowPartnerModal(true),
    openBookServiceModal: (estimatedPrice?: number, serviceDetails?: any) => {
      setBookingData({ estimatedPrice, serviceDetails })
      setShowBookServiceModal(true)
    },
    addPartner,
    partners,
  }

  return (
    <FormContext.Provider value={value}>
      {children}
      <FreeCleanModal open={showFreeCleanModal} onClose={() => setShowFreeCleanModal(false)} />
      <CallRequestModal open={showCallRequestModal} onClose={() => setShowCallRequestModal(false)} />
      <CustomQuoteModal open={showCustomQuoteModal} onClose={() => setShowCustomQuoteModal(false)} />
      <PartnerModal open={showPartnerModal} onClose={() => setShowPartnerModal(false)} />
      <BookServiceModal
        open={showBookServiceModal}
        onClose={() => setShowBookServiceModal(false)}
        estimatedPrice={bookingData.estimatedPrice}
        serviceDetails={bookingData.serviceDetails}
      />
    </FormContext.Provider>
  )
}
