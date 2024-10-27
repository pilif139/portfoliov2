"use client";

import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { PostContentBlock } from "@/db/schema/posts";
import { contentType } from "@/db/schema/projects";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import ContentsList from "./ContentsList";
import FadeDiv from "@/components/ui/FadeDiv";
import CreatePostForm from "@/components/CreatePostForm";
import CreatePostContextProvider from "@/components/CreatePostContextProvider";
import ContentForm from "@/components/ContentForm";

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
    // files
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleCreatePost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Creating post");
        // server action to create post
    }

    // submits file to the Blob storage from vercel. For the preview i would use something diffrent like FileReader API from the browser
    const handleFileSubmit = async (post_id: number) =>{
        if(!inputFileRef.current?.files){
            return alert("No file selected");
        }

        const file = inputFileRef.current.files[0];

        await upload(file.name, file, {
            access: "public",
            handleUploadUrl: `/posts/${post_id}/images` // url to api route in the app that handles file upload to blob storage
        })
    }

    return (
        <CreatePostContextProvider>
            <FadeDiv className="w-full min-h-[75vh] flex flex-col items-center mx-0">
                <Heading variant="2" className="text-nord-9">Create new post</Heading>
                <div className="flex gap-4 w-full py-4 justify-between">
                    <CreatePostForm handleCreatePost={handleCreatePost}/>
                    <article className="w-[50%] flex flex-col px-8">
                        <ContentsList/>
                    </article>
                    <aside className="w-max h-fit bg-nord-0 rounded-xl p-4">
                        <ContentForm/>
                    </aside>
                </div>
            </FadeDiv>
        </CreatePostContextProvider>
    )
}
