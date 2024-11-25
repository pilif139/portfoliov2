"use client";

import { PostContentBlock } from "@/db/schema/posts";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type CreatePostContextType = {
    contents: Partial<PostContentBlock>[];
    setContents: Dispatch<SetStateAction<Partial<PostContentBlock>[]>>;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
}

export const CreatePostContext = createContext<CreatePostContextType | null>(null);

export default function CreatePostContextProvider({ children }: { children: React.ReactNode }) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [contents, setContents] = useState<Partial<PostContentBlock>[]>([]);

    return (
        <CreatePostContext.Provider value={{ contents, setContents, title, setTitle, description, setDescription }}>
            {children}
        </CreatePostContext.Provider>
    );
}

export function useCreatePostContext() {
    const context = useContext(CreatePostContext);
    if (!context) {
        throw new Error("useCreatePostContext must be used within CreatePostContextProvider");
    }
    return context;
}