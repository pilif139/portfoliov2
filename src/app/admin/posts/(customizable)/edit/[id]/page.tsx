import Heading from "@/components/ui/Heading"
import FadeDiv from "@/components/ui/FadeDiv"
import ContentForm from "@/components/ContentForm"
import ContentsList from "@/app/admin/posts/(customizable)/ContentsList"
import CreatePostContextProvider from "@/components/CreatePostContextProvider"
import fetchPost from "@/server/post/fetchPost"
import EditPostForm from "./EditPostForm"

export default async function EditPostPage({ params }: { params: Promise<{ id: number }> }) {
    const id = (await params).id
    const { post, contents } = await fetchPost(id)

    return (
        <CreatePostContextProvider
            value={{
                initialTitle: post.title,
                initialDescription: post.description,
                initialContents: contents,
            }}
        >
            <FadeDiv className="w-full min-h-[75vh] flex flex-col items-center mx-0">
                <Heading variant="2" className="text-theme-9">
                    Edit post
                </Heading>
                <div className="grid grid-cols-[1fr_1.8fr_1fr] gap-8 w-full p-4 justify-between">
                    <EditPostForm id={id} oldContents={contents} />
                    <ContentsList />
                    <ContentForm />
                </div>
            </FadeDiv>
        </CreatePostContextProvider>
    )
}
