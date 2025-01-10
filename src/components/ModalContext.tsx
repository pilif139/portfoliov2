"use client"

import { createContext, ReactNode, useContext, useState } from "react"

const ModalContext = createContext({
    isOpen: false,
    component: null as ReactNode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    openModal: (_component: ReactNode) => {},
    closeModal: () => {},
})

export function ModalContextProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [component, setComponent] = useState<ReactNode | null>(null)
    const openModal = (component: ReactNode) => {
        closeModal() // Close any existing modal before opening a new one
        setComponent(component)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setComponent(null)
    }

    return <ModalContext.Provider value={{ isOpen, component, openModal, closeModal }}>{children}</ModalContext.Provider>
}

export function useModalContext() {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error("useModal must be used within a ModalContextProvider")
    }
    return context
}
