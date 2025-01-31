"use client"

import Heading from "@/components/ui/Heading"
import ContentsList from "./ContentsList"
import FadeDiv from "@/components/ui/FadeDiv"
import CreatePostForm from "@/components/CreatePostForm"
import { useCreatePostContext } from "@/components/CreatePostContextProvider"
import ContentForm from "@/components/ContentForm"
import createPost from "@/server/post/createPost"
import base64ToFile from "@/lib/utils/base64ToFile"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
import addContentToPost from "@/server/post/addContentToPost"

export default function NewPostPage() {
    const { contents, title, description } = useCreatePostContext()
    const router = useRouter()

    const handleCreatePost = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const contentWithConvertedFiles = contents
            .map(({ type, content, position }) => {
                if (!content || !type || !position) {
                    return null
                }
                if (type === "file" || type === "image" || type === "video") {
                    return {
                        type,
                        content: base64ToFile(content, `${title}-${type}-${position}`),
                        position,
                    }
                } else {
                    return { type, content, position }
                }
            })
            .filter((content) => content !== null)

        const { post_id, errors } = await createPost(title, description)
        if (post_id === undefined || errors) {
            return errors
        }
        for (const content of contentWithConvertedFiles) {
            const formData = new FormData()
            formData.append("type", content.type)
            formData.append("position", content.position.toString())
            formData.append("content", content.content)
            await addContentToPost(post_id, formData)
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
