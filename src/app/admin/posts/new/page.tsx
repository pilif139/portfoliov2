"use client"

import Heading from "@/components/ui/Heading"
import ContentsList from "./ContentsList"
import FadeDiv from "@/components/ui/FadeDiv"
import CreatePostForm from "@/components/CreatePostForm"
import { useCreatePostContext } from "@/components/CreatePostContextProvider"
import ContentForm from "@/components/ContentForm"
import CreatePost from "@/server/post/createPost"
import submitFileToVercelStorage, { FileContent } from "@/server/post/submitFileToVercelStorage"
import base64ToFile from "@/lib/utils/base64ToFile"
import { useRouter } from "next/navigation"

export default function NewPostPage() {
    const { contents, title, description } = useCreatePostContext()
    const router = useRouter()

    const handleCreatePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const { post_id, errors } = await CreatePost({
            title,
            description,
            contents,
        })
        if (!post_id) {
            return
        }
        if (errors) {
            throw new Error("An error occurred while creating the post")
        }
        const files = contents
            .filter(({ type }) => type === "file" || type === "image" || type === "video")
            .map(({ content, type, position }) => {
                if (content && type && position && post_id) {
                    return {
                        post_id,
                        position,
                        type,
                        content: base64ToFile(content, `${type}-${post_id}-${position}`),
                    }
                }
                return null
            })
            .filter((file) => file !== null) as FileContent[]
        for (const file of files) {
            const formData = new FormData()
            formData.append("file", file.content)
            formData.append("type", file.type)
            formData.append("position", file.position.toString())
            formData.append("post_id", post_id.toString())
            await submitFileToVercelStorage(formData)
        }
        router.push(`/admin/posts/${post_id}`)
    }

    return (
        <FadeDiv className="w-full min-h-[75vh] flex flex-col items-center mx-0">
            <Heading variant="2" className="text-nord-9">
                Create new post
            </Heading>
            <div className="flex gap-4 w-full py-4 justify-between">
                <CreatePostForm handleCreatePost={handleCreatePost} />
                <article className="w-[50%] flex flex-col px-8">
                    <ContentsList />
                </article>
                <aside className="w-max h-fit bg-nord-0 rounded-xl p-4">
                    <ContentForm />
                </aside>
            </div>
        </FadeDiv>
    )
}
