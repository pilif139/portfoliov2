"use client";

import Heading from "@/components/ui/Heading";
import { upload } from "@vercel/blob/client";
import ContentsList from "./ContentsList";
import FadeDiv from "@/components/ui/FadeDiv";
import CreatePostForm from "@/components/CreatePostForm";
import { useCreatePostContext } from "@/components/CreatePostContextProvider";
import ContentForm from "@/components/ContentForm";

export default function NewPostPage(){
    const { files } = useCreatePostContext();
    
    const handleCreatePost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Creating post");
        // server action to create post
    }

    const handleFileSubmitToVercelStorage = async (post_id: number) =>{
        files.forEach(async (file) => {
            await upload(file.name, file, {
                access: "public",
                handleUploadUrl: `/api/images/${post_id}` // url to api route in the app that handles file upload to blob storage
            })
        });
    }

    return (
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
    )
}
