"use client"

import Button from "./ui/Button"
import Heading from "./ui/Heading"
import { useCreatePostContext } from "./CreatePostContextProvider"
import React, { useState, MouseEvent } from "react"
import Input from "./ui/Input"
import TextArea from "./ui/TextArea"
import { z } from "zod"
import useValidate from "@/hooks/useValidate"

const titleSchema = z.string().min(3, "Title must be atleast 3 characters long").max(150, "Title must be at most 150 characters long")
const descriptionSchema = z
    .string()
    .min(7, "Description must be atleast 7 characters long")
    .max(250, "Description must be at most 250 characters long")

export default function CreatePostForm({ handleCreatePost }: { handleCreatePost: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
    const { title, setTitle, description, setDescription } = useCreatePostContext()
    const [titleErrors, setTtitleErrors, validateTitle] = useValidate(titleSchema, title)
    const [descriptionErrors, setDescriptionErrors, validateDescription] = useValidate(descriptionSchema, description)

    const submitForm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!titleErrors && !descriptionErrors) {
            handleCreatePost(e)
        }
    }

    return (
        <form className="w-[20vw] max-h-[60vh] h-max bg-nord-0 rounded-xl p-4 flex flex-col gap-2">
            <Heading variant="3" className="text-nord-14">
                Post details
            </Heading>
            <Input
                label="Title"
                type="text"
                id="title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    validateTitle()
                }}
                errors={titleErrors}
            />
            <TextArea
                label="Description"
                id="description"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                    validateDescription()
                }}
                errors={descriptionErrors}
            />
            <Button variant="primary-2" onClick={submitForm}>
                Create post
            </Button>
        </form>
    )
}
