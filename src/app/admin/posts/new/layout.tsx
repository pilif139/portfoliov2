import CreatePostContextProvider from "@/components/CreatePostContextProvider"

export default function NewPostLayout({ children }: { children: React.ReactNode }) {
    return <CreatePostContextProvider>{children}</CreatePostContextProvider>
}
