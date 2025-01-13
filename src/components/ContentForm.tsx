"use client"

import { contentType } from "@/db/schema/projects"
import { useCreatePostContext } from "./CreatePostContextProvider"
import Button from "./ui/Button"
import Heading from "./ui/Heading"
import React, { useRef, useState } from "react"
import { PostContentBlock } from "@/db/schema/posts"
import Input from "./ui/Input"
import TextArea from "./ui/TextArea"
import { z } from "zod"
import useValidate from "@/hooks/useValidate"

const contentTypeLabels: Record<string, string> = {
    p: "Text",
    h1: "Heading",
    h2: "Subheading",
    h3: "Subheading",
    h4: "Subheading",
    image: "Image",
    video: "Video",
    file: "File",
    link: "URL",
    tag: "Tag",
}

const textSchema = z.string().min(3, { message: "Text must be atleast 3 characters long" }) //need fix

export default function ContentForm() {
    const { setContents, contents } = useCreatePostContext()
    const [selectedContentType, setSelectedContentType] = useState("p")
    const [textContent, setTextContent] = useState("")
    const [textErrors, setTextErrors, validate] = useValidate(textSchema, textContent)
    const [fileErrors, setFileErrors] = useState<string[] | string>([])
    const inputFileRef = useRef<HTMLInputElement>(null)

    const validateFileInput = () => {
        const input = inputFileRef.current
        if (input && input.files && input.files[0]) {
            const file = input.files[0]
            const MB = 1024 * 1024
            if (file.size > MB * 25) {
                setFileErrors("File size must be less than 25MB")
            } else {
                setFileErrors([])
            }
        } else {
            setFileErrors("No file selected")
        }
    }

    const handleContentSubmit = async (formData: FormData) => {
        const type = formData.get("type") as PostContentBlock["type"]
        if (type !== "image" && type !== "video" && type !== "file" && !textErrors) {
            const content = formData.get("content") as string
            const content_block = {
                type,
                content,
                position: contents.length + 1,
            }

            setContents([...contents, content_block])
        } else {
            await handleFilePreview(type)
        }
    }

    const handleFilePreview = async (type: PostContentBlock["type"]) => {
        const input = inputFileRef.current
        if (input && input.files && input.files[0] && !fileErrors) {
            const file = input.files[0]
            const reader = new FileReader()

            reader.onload = (e) => {
                if (e.target?.result) {
                    const content_block = {
                        type,
                        content: e.target.result as string,
                        position: contents.length + 1,
                    }
                    setContents([...contents, content_block])
                    setFileErrors([])
                }
            }

            reader.readAsDataURL(file)
        } else {
            setFileErrors("No file selected")
        }
    }

    // input accept attribute for file types
    const acceptFileTypes = {
        image: ".jpg,.png",
        video: ".mp4",
        file: ".jpg,.png,.mp4,.mp3",
    }

    return (
        <form className="flex gap-4 flex-col flex-grow h-full max-h-[60vh] w-[20vw]" action={handleContentSubmit}>
            <Heading variant="3" className="text-nord-9">
                Add content
            </Heading>
            <div className="flex items-center gap-2">
                <label htmlFor="type">Type</label>
                <select
                    name="type"
                    id="type"
                    className="p-2 rounded-lg bg-nord-3 text-nord-9 focus:bg-nord-2 w-max transition"
                    value={selectedContentType}
                    onChange={(e) => {
                        setSelectedContentType(e.target.value)
                        setTextContent("")
                        setFileErrors([])
                        setTextErrors([])
                    }}
                >
                    {contentType.enumValues.map((type, id) => (
                        <option key={id} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex gap-2 flex-col max-h-max">
                {(selectedContentType === "image" || selectedContentType === "video" || selectedContentType === "file") && (
                    <Input
                        type="file"
                        name="file"
                        label={contentTypeLabels[selectedContentType]}
                        ref={inputFileRef}
                        accept={acceptFileTypes[selectedContentType]}
                        errors={fileErrors}
                        onChange={validateFileInput}
                    />
                )}
                {selectedContentType !== "image" && selectedContentType !== "video" && selectedContentType !== "file" && (
                    <TextArea
                        className="max-h-[30vh]"
                        label={contentTypeLabels[selectedContentType]}
                        name="content"
                        value={textContent}
                        onChange={(e) => {
                            setTextContent(e.target.value)
                            validate()
                        }}
                        errors={textErrors}
                    />
                )}
            </div>
            <Button type="submit" className="self-end mt-auto">
                Add content
            </Button>
        </form>
    )
}
