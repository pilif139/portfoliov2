"use client"

import Button from "./ui/Button"
import Heading from "./ui/Heading"
import { useCreatePostContext } from "./CreatePostContextProvider"
import React, { useState, MouseEvent } from "react"
import Input from "./ui/Input"
import TextArea from "./ui/TextArea"
import { z } from "zod"

const titleSchema = z.string().min(3, "Title must be atleast 3 characters long").max(150, "Title must be at most 150 characters long")
const descriptionSchema = z
    .string()
    .min(7, "Description must be atleast 7 characters long")
    .max(250, "Description must be at most 250 characters long")

export default function CreatePostForm({ handleCreatePost }: { handleCreatePost: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
    const { title, setTitle, description, setDescription } = useCreatePostContext()
    const [formErrors, setFormErrors] = useState({
        title: "",
        description: "",
    })

    const submitForm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        validateDescription(description)
        validateTitle(title)
        if (!formErrors.title && !formErrors.description) {
            handleCreatePost(e)
        }
    }

    const validateTitle = (title: string) => {
        setTitle(title)
        setFormErrors((prevErrors) => {
            const validate = titleSchema.safeParse(title)
            if (!validate.success) {
                console.log(validate.error.flatten().formErrors[0])
                return { ...prevErrors, title: validate.error.flatten().formErrors[0] }
            } else {
                return { ...prevErrors, title: "" }
            }
        })
    }

    const validateDescription = (description: string) => {
        setDescription(description)
        setFormErrors((prevErrors) => {
            const validate = descriptionSchema.safeParse(description)
            if (!validate.success) {
                return { ...prevErrors, description: validate.error.message }
            } else {
                return { ...prevErrors, description: "" }
            }
        })
    }

    return (
        <form className="w-[20vw] max-h-[60vh] h-max bg-nord-0 rounded-xl p-4 flex flex-col gap-4">
            <Heading variant="3" className="text-nord-14">
                Post details
            </Heading>
            <Input
                label="Title"
                type="text"
                id="title"
                value={title}
                onChange={(e) => validateTitle(e.target.value)}
                errors={formErrors.title}
            />
            <TextArea
                label="Description"
                id="description"
                value={description}
                onChange={(e) => validateDescription(e.target.value)}
                error={formErrors.description}
            />
            <Button variant="primary-2" onClick={submitForm}>
                Create post
            </Button>
        </form>
    )
}
