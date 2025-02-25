import Heading from "@/components/ui/Heading"
import ContentsList from "../ContentsList"
import FadeDiv from "@/components/ui/FadeDiv"
import CreatePostForm from "@/app/admin/posts/(customizable)/new/CreatePostForm"
import ContentForm from "@/components/ContentForm"
import CreatePostContextProvider from "@/components/CreatePostContextProvider"

export default function NewPostPage() {
    return (
        <CreatePostContextProvider>
            <FadeDiv className="w-full min-h-[75vh] flex flex-col items-center mx-0">
                <Heading variant="2" className="text-theme-9">
                    Create new post
                </Heading>
                <div className="grid grid-cols-[1fr_1.8fr_1fr] gap-8 w-full p-4 justify-between">
                    <CreatePostForm />
                    <ContentsList />
                    <ContentForm />
                </div>
            </FadeDiv>
        </CreatePostContextProvider>
    )
}
