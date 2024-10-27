"use client";

import { PostContentBlock } from "@/db/schema/posts";
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";

type CreatePostContextType = {
    selectedContentType: string;
    setSelectedContentType: Dispatch<SetStateAction<string>>;
    textContent: string;
    setTextContent: Dispatch<SetStateAction<string>>;
    contents: Partial<PostContentBlock>[];
    setContents: Dispatch<SetStateAction<Partial<PostContentBlock>[]>>;
    inputFileRef: React.MutableRefObject<HTMLInputElement | null>;
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

    // files
    const inputFileRef = useRef<HTMLInputElement>(null);

    return (
        <CreatePostContext.Provider value={{ selectedContentType, setSelectedContentType, textContent, setTextContent, contents, setContents, inputFileRef, title, setTitle, description, setDescription }}>
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