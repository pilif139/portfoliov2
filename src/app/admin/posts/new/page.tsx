"use client";

import Heading from "@/components/ui/Heading";
import { upload } from "@vercel/blob/client";
import ContentsList from "./ContentsList";
import FadeDiv from "@/components/ui/FadeDiv";
import CreatePostForm from "@/components/CreatePostForm";
import { useCreatePostContext } from "@/components/CreatePostContextProvider";
import ContentForm from "@/components/ContentForm";
import base64ToFile from "@/lib/utils/base64ToFile";
import CreatePost from "@/server/post/post";

export default function NewPostPage(){
    const { contents, title, description,  } = useCreatePostContext();
    
    const handleCreatePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const {post_id, errors} = await CreatePost({title, description, contents});
        if(!post_id){
            return;
        }
        if(errors){
            throw new Error("An error occurred while creating the post");
        }
        await submitFileToVercelStorage(post_id);
        
    }

    const submitFileToVercelStorage = async (post_id: number) =>{
        const files = contents.filter(content => content.type === "file" || content.type === "image" || content.type === "video");
        files.forEach(async (file) => {
            const newFile = base64ToFile(file.content as string, `${post_id}-${file.position}`);
            await upload(newFile.name, newFile, {
                access: "public",
                handleUploadUrl: `/api/images?post_id=${post_id}&position=${file.position}`
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
