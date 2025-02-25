"use client"

import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import { useCreatePostContext } from "@/components/CreatePostContextProvider"
import React, { MouseEvent } from "react"
import Input from "@/components/ui/Input"
import TextArea from "@/components/ui/TextArea"
import useValidate from "@/hooks/useValidate"
import useDebounce from "@/hooks/useDebounce"
import addContentToPost from "@/server/post/addContentToPost"
import { useRouter } from "next/navigation"
import { titleSchema, descriptionSchema } from "@/server/post/postTypes"
import ConvertContentsToPayload from "@/app/admin/posts/(customizable)/ConvertContentsToPayload"
import editPost from "@/server/post/editPost"
import { PostContentBlock } from "@/db/schema/posts"

export default function EditPostForm({ id, oldContents }: { id: number; oldContents: PostContentBlock[] }) {
    const { title, setTitle, description, setDescription, contents } = useCreatePostContext()
    const [titleErrors, setTitleErrors, validateTitle] = useValidate(titleSchema, title)
    const [descriptionErrors, setDescriptionErrors, validateDescription] = useValidate(descriptionSchema, description)
    const [debounce] = useDebounce()
    const router = useRouter()

    const submitForm = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (titleErrors || descriptionErrors) return

        const { errors } = await editPost(id, title, description)
        if (errors) {
            setTitleErrors(errors.title || null)
            setDescriptionErrors(errors.description || null)
            return
        }

        // wont work if the content is a file or image
        const changedContents = contents.filter((content) =>
            oldContents.some((oldContent) => oldContent.content !== content.content || oldContent.position !== content.position)
        )
        const contentWithConvertedFiles = ConvertContentsToPayload(changedContents, title)

        for (const content of contentWithConvertedFiles) {
            const formData = new FormData()
            formData.append("type", content.type)
            formData.append("position", content.position.toString())
            formData.append("content", content.content)
            await addContentToPost(id, formData)
        }
        router.push(`/admin/posts/${id}`)
    }

    return (
        <form className="max-h-[60vh] h-fit bg-theme-0 rounded-xl p-4 flex flex-col gap-2 sticky top-25">
            <Heading variant="3" className="text-theme-14">
                Post details
            </Heading>
            <Input
                label="Title"
                type="text"
                id="title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    debounce(() => validateTitle(), 300)
                }}
                errors={titleErrors}
            />
            <TextArea
                label="Description"
                id="description"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                    debounce(() => validateDescription(), 300)
                }}
                errors={descriptionErrors}
            />
            <Button variant="primary-2" onClick={(e: MouseEvent<HTMLButtonElement>) => submitForm(e)}>
                Confirm changes
            </Button>
        </form>
    )
}
