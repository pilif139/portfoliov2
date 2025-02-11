"use client";

import Button from "./ui/Button"
import Heading from "./ui/Heading"
import { useCreatePostContext } from "./CreatePostContextProvider"
import React, { MouseEvent } from "react"
import Input from "./ui/Input"
import TextArea from "./ui/TextArea"
import { z } from "zod"
import useValidate from "@/hooks/useValidate"
import useDebounce from "@/hooks/useDebounce"
import addContentToPost from "@/server/post/addContentToPost"
import createPost from "@/server/post/createPost"
import base64ToFile from "@/lib/utils/base64ToFile"
import { useRouter } from "next/navigation"

const titleSchema = z.string().min(3, "Title must be atleast 3 characters long").max(150, "Title must be at most 150 characters long")
const descriptionSchema = z
    .string()
    .min(7, "Description must be atleast 7 characters long")
    .max(250, "Description must be at most 250 characters long")

type Errors = { description?: string[]; title?: string[]; user?: string }

export default function CreatePostForm() {
    const { title, setTitle, description, setDescription, contents } = useCreatePostContext()
    const [titleErrors, setTitleErrors, validateTitle] = useValidate(titleSchema, title)
    const [descriptionErrors, setDescriptionErrors, validateDescription] = useValidate(descriptionSchema, description)
    const [debounce] = useDebounce()
    const router = useRouter();

    const submitForm = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!titleErrors && !descriptionErrors) {
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

            const { post_id, errors }: { post_id?: number; errors?: Errors | null } = await createPost(title, description)
            if (post_id === undefined || errors) {
                setTitleErrors(errors?.title || null)
                setDescriptionErrors(errors?.description || null)
                return;
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
            <Button variant="primary-2" onClick={submitForm}>
                Create post
            </Button>
        </form>
    )
}
