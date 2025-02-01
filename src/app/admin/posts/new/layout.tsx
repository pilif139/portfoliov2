import CreatePostContextProvider from "@/components/CreatePostContextProvider"
import React from "react"

export default function NewPostLayout({ children }: { children: React.ReactNode }) {
    return <CreatePostContextProvider>{children}</CreatePostContextProvider>
}
