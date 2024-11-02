"use client";

import { contentType } from "@/db/schema/projects";
import { useCreatePostContext } from "./CreatePostContextProvider";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import { useRef, useState } from "react";
import { PostContentBlock } from "@/db/schema/posts";
import Input from "./ui/Input";
import TextArea from "./ui/TextArea";

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
};

export default function ContentForm() {
    const {
        setContents,
        contents,
        selectedContentType,
        setSelectedContentType,
        textContent,
        setTextContent,
    } = useCreatePostContext();
    const [formErrors, setFormErrors] = useState({
        text: "",
        file: "",
    });
    const inputFileRef = useRef<HTMLInputElement>(null);

    const validateTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value;
        setTextContent(content);
        if (!content) {
            setFormErrors({
                ...formErrors,
                text: contentTypeLabels[selectedContentType] + " cannot be empty",
            });
        } else {
            setFormErrors({ ...formErrors, text: "" });
        }
    };

    const validateFileInput = () => {
        const input = inputFileRef.current;
        if (input && input.files && input.files[0]) {
            const file = input.files[0];
            const MB = 1024 * 1024;
            if (file.size > MB * 25) {
                setFormErrors({ ...formErrors, file: "File size is too big" });
            } else {
                setFormErrors({ ...formErrors, file: "" });
            }
        } else {
            setFormErrors({ ...formErrors, file: "No file selected" });
        }
    };

    const handleContentSubmit = async (formData: FormData) => {
        const type = formData.get("type") as PostContentBlock["type"];
        if (type !== "image" && type !== "video" && type !== "file") {
            const content = formData.get("content") as string;
            if (!content) {
                setFormErrors({ ...formErrors, text: type + " cannot be empty" });
            } else {
                const content_block = {
                    type,
                    content: formData.get("content") as string,
                    position: contents.length + 1,
                };
                setContents([...contents, content_block]);
                setFormErrors({ ...formErrors, text: "" });
            }
        } else {
            handleFilePreview(type);
        }
    };

    const handleFilePreview = async (type: PostContentBlock["type"]) => {
        const input = inputFileRef.current;
        if (input && input.files && input.files[0] && !formErrors.file) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target?.result) {
                    const content_block = {
                        type,
                        content: e.target.result as string,
                        position: contents.length + 1,
                    };   
                    setContents([...contents, content_block]);
                    setFormErrors({ ...formErrors, file: "" });
                }
            };

            reader.readAsDataURL(file);
        } else {
            setFormErrors({ ...formErrors, file: "No file selected" });
        }
    };

    // input accept attribute for file types
    const acceptFileTypes = {
        image: ".jpg,.png",
        video: ".mp4",
        file: ".jpg,.png,.mp4,.mp3",
    };

    return (
        <form
            className="flex gap-4 flex-col flex-grow h-full max-h-[60vh] w-[20vw]"
            action={handleContentSubmit}
        >
            <Heading variant="3" className="text-nord-9">Add content</Heading>
            <div className="flex items-center gap-2">
                <label htmlFor="type">Type</label>
                <select
                    name="type"
                    id="type"
                    className="p-2 rounded-lg bg-nord-1 text-nord-9 w-max focus:bg-nord-2 transition"
                    value={selectedContentType}
                    onChange={(e) => {
                        setSelectedContentType(e.target.value);
                        setTextContent("");
                        setFormErrors({text: "", file: "" });
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
                {(selectedContentType === "image" ||
                    selectedContentType === "video" ||
                    selectedContentType === "file") && (
                        <Input
                            type="file"
                            name="file"
                            label={contentTypeLabels[selectedContentType]}
                            ref={inputFileRef}
                            accept={acceptFileTypes[selectedContentType]}
                            error={formErrors.file}
                            onChange={validateFileInput}
                        />
                    )}
                {selectedContentType !== "image" &&
                    selectedContentType !== "video" &&
                    selectedContentType !== "file" && (
                        <TextArea
                            className="max-h-[30vh]"
                            label={contentTypeLabels[selectedContentType]}
                            name="content"
                            value={textContent}
                            onChange={validateTextInput}
                            error={formErrors.text}
                        />
                    )}
            </div>
            <Button type="submit" className="self-end mt-auto">
                Add content
            </Button>
        </form>
    );
}
