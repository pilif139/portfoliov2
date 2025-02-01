import Button from "./ui/Button"
import Heading from "./ui/Heading"
import { useCreatePostContext } from "./CreatePostContextProvider"
import React, { MouseEvent } from "react"
import Input from "./ui/Input"
import TextArea from "./ui/TextArea"
import { z } from "zod"
import useValidate from "@/hooks/useValidate"
import useDebounce from "@/hooks/useDebounce"

const titleSchema = z.string().min(3, "Title must be atleast 3 characters long").max(150, "Title must be at most 150 characters long")
const descriptionSchema = z
    .string()
    .min(7, "Description must be atleast 7 characters long")
    .max(250, "Description must be at most 250 characters long")

type Errors = { description?: string[]; title?: string[]; user?: string }

export default function CreatePostForm({
    handleCreatePost,
}: {
    handleCreatePost: (e: React.MouseEvent<HTMLButtonElement>) => Promise<Errors | undefined>
}) {
    const { title, setTitle, description, setDescription } = useCreatePostContext()
    const [titleErrors, setTitleErrors, validateTitle] = useValidate(titleSchema, title)
    const [descriptionErrors, setDescriptionErrors, validateDescription] = useValidate(descriptionSchema, description)
    const [debounce] = useDebounce()

    const submitForm = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!titleErrors && !descriptionErrors) {
            const errors = await handleCreatePost(e)
            setTitleErrors(errors?.title || null)
            setDescriptionErrors(errors?.description || null)
        }
    }

    return (
        <form className="w-[20vw] max-h-[60vh] h-max bg-theme-0 rounded-xl p-4 flex flex-col gap-2">
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
