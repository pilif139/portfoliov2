"use client";

import { PostContentBlock } from "@/db/schema/posts";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type FileContent = {
    file: File;
    position: number;
}

type CreatePostContextType = {
    selectedContentType: string;
    setSelectedContentType: Dispatch<SetStateAction<string>>;
    textContent: string;
    setTextContent: Dispatch<SetStateAction<string>>;
    contents: Partial<PostContentBlock>[];
    setContents: Dispatch<SetStateAction<Partial<PostContentBlock>[]>>;
    files: FileContent[];
    setFiles: Dispatch<SetStateAction<FileContent[]>>;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
}

export const CreatePostContext = createContext<CreatePostContextType | null>(null);

export default function CreatePostContextProvider({ children }: { children: React.ReactNode }) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedContentType, setSelectedContentType] = useState("p");
    const [textContent, setTextContent] = useState<string>("");
    const [contents, setContents] = useState<Partial<PostContentBlock>[]>([]);
    const [files, setFiles] = useState<FileContent[]>([]);

    return (
        <CreatePostContext.Provider value={{ selectedContentType, setSelectedContentType, textContent, setTextContent, contents, setContents, files, setFiles, title, setTitle, description, setDescription }}>
            {children}
        </CreatePostContext.Provider>
    );
}

export function useCreatePostContext() {
    const context = useContext(CreatePostContext);
    if(!context){
        throw new Error("useCreatePostContext must be used within CreatePostContextProvider");
    }
    return context;
}