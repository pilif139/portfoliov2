"use client";

import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { PostContentBlock } from "@/db/schema/posts";
import { contentType } from "@/db/schema/projects";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import ContentsList from "./ContentsList";

const contentTypeLabels: Record<string, string> = {
    "p" : "Text",
    "h1": "Heading",
    "h2": "Subheading",
    "h3": "Subheading",
    "h4": "Subheading",
    "image": "Image",
    "video": "Video",
    "file": "File",
    "link": "URL",
    "tag": "Tag",
}


export default function NewPostPage(){
    const [selectedContentType, setSelectedContentType] = useState("p");
    const [textContent, setTextContent] = useState<string>("");
    const [contents, setContents] = useState<Partial<PostContentBlock>[]>([]);

    // files
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<PutBlobResult | null>(null);

    // submits file to the Blob storage from vercel. For the preview i would use something diffrent like FileReader API from the browser
    const handleFileSubmit = async (post_id: number) =>{
        if(!inputFileRef.current?.files){
            return alert("No file selected");
        }

        const file = inputFileRef.current.files[0];

        const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: `/posts/${post_id}/images` // url to api route in the app that handles file upload to blob storage
        })
        setFile(newBlob);
    }

    // handles file preview for images, videos and files by storing local file url in the content array state
    const handleFilePreview = async (type: PostContentBlock["type"])=>{
        const input = inputFileRef.current;
        if(input && input.files && input.files[0]){
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                if(e.target?.result){
                    const content_block = {
                        type,
                        content: e.target.result as string,
                        position: contents.length,
                    }
                    setContents([...contents, content_block]);
                }
            }

            reader.readAsDataURL(file);
        } else{
            alert("No file selected");
        }
    }

    const handleContentSubmit = async (formData: FormData) =>{
       const type = formData.get("type") as PostContentBlock["type"];
       if(type !== "image" && type !== "video" && type !== "file"){
           const content_block = {
                type,
                content: formData.get("content") as string,
                position: contents.length
           }
            setContents([...contents, content_block]);
       }
       else{
            handleFilePreview(type);
       }
    }

    // input accept attribute for file types
    const acceptFileTypes = {
        "image": ".jpg,.png",
        "video": ".mp4",
        "file": ".jpg,.png,.mp4,.mp3",
    }

    return (
        <main className="w-full min-h-[75vh] flex flex-col items-center mx-0">
            <Heading variant="2" className="text-nord-9">Create new post</Heading>
            <div className="flex gap-4 w-full py-4 justify-between">
                <form className="w-max h-max bg-nord-0 rounded-xl p-4 flex flex-col gap-4">
                    <Heading variant="3">Post details</Heading>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" className="p-2 rounded-lg bg-nord-1 text-nord-9" />
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" className="p-2 rounded-lg bg-nord-1 text-nord-9 w-96 min-h-max  max-h-[30vh]"></textarea>
                    <Button className="bg-nord-14 hover:bg-nord-13 px-10 py-4 text-2xl mt-auto">Create post</Button>
                </form>
                <article className="w-[50%] flex flex-col px-8">
                    <ContentsList contents={contents} setContents={setContents} />
                </article>
                <aside className="w-max h-fit bg-nord-0 rounded-xl p-4">
                    <form className="flex gap-4 flex-col flex-grow h-full" action={handleContentSubmit}>
                        <Heading variant="3">Add content</Heading>
                        <div className="flex items-center gap-2">
                            <Heading variant="4" className="text-nord-15">Type: </Heading>
                            <select name="type" id="type" className="p-2 rounded-lg bg-nord-1 text-nord-9 w-max" value={selectedContentType} onChange={(e)=> setSelectedContentType(e.target.value)}>
                            {contentType.enumValues.map((type,id) => (
                                <option key={id} value={type}>
                                    {type}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="flex gap-2 flex-col max-h-[40vh]">
                            <Heading variant="4" className="text-nord-15">{contentTypeLabels[selectedContentType]}: </Heading>
                            {(selectedContentType === "image" || selectedContentType === "video" || selectedContentType === "file")  && (
                                <input name="image" type="file" accept={acceptFileTypes[selectedContentType]} ref={inputFileRef} className="p-2 rounded-lg bg-nord-1 text-nord-9 w-max" />
                            )}
                            {selectedContentType !== "image" && selectedContentType !== "video" &&  selectedContentType !== "file" && (
                                <textarea name="content" id="content" className="p-2 rounded-lg bg-nord-1 text-nord-6 w-96 min-h-max" value={textContent} onChange={(e)=>setTextContent(e.target.value)} ></textarea>
                            )}
                        </div>
                        <Button type="submit" className="self-end mt-auto">Add content</Button>
                    </form>
                </aside>
            </div>
        </main>
    )
}
