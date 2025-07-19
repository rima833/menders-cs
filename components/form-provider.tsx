"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { BookServiceModal } from "@/components/modals/book-service-modal"
import { CallRequestModal } from "@/components/modals/call-request-modal"
import { CustomQuoteModal } from "@/components/modals/custom-quote-modal"
import { FreeCleanModal } from "@/components/modals/free-clean-modal"
import { PartnerModal } from "@/components/modals/partner-modal"

type ModalType = "book" | "call" | "quote" | "free-clean" | "partner"

interface FormContextType {
  openModal: (type: ModalType) => void
  closeModal: () => void
  activeModal: ModalType | null
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function useForm() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider")
  }
  return context
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null)

  const openModal = (type: ModalType) => {
    setActiveModal(type)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <FormContext.Provider value={{ openModal, closeModal, activeModal }}>
      {children}
      <BookServiceModal open={activeModal === "book"} onOpenChange={closeModal} />
      <CallRequestModal open={activeModal === "call"} onOpenChange={closeModal} />
      <CustomQuoteModal open={activeModal === "quote"} onOpenChange={closeModal} />
      <FreeCleanModal open={activeModal === "free-clean"} onOpenChange={closeModal} />
      <PartnerModal open={activeModal === "partner"} onOpenChange={closeModal} />
    </FormContext.Provider>
  )
}
