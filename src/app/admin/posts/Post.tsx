"use client";

import Heading from "@/components/ui/Heading";
import { Post } from "@/db/schema/posts"
import Link from "next/link";
import { Spline_Sans_Mono as Font } from "next/font/google";
import { MdDelete, MdModeEdit } from "react-icons/md";
import Button from "@/components/ui/Button";
import { useModalContext } from "@/components/ModalContext";

const font = Font({
    subsets: ["latin"],
    weight: "600"
});

type PostProps = {
    post: Post;
}

export default function PostCard({ post }: PostProps) {
    const { openModal } = useModalContext();

    const handleDelete = () => {
        openModal(<DeleteModal />);
    }

    return (
        <div className="bg-nord-0 hover:bg-gray-800 transition p-4 rounded-xl cursor-pointer w-[20vw] h-full">
            <Link href={`/admin/posts/${post.id}`}>
                <div>
                    <Heading variant="3" className="text-nord-9">{post.title}</Heading>
                    <p className={`text-nord-4 ${font.className}`}>{post.description}</p>
                </div>
            </Link>
            <div className="mt-4 flex gap-4">
                <Link href={`/admin/posts/edit/${post.id}`}>
                    <Button variant="secondary"
                        className="flex items-center gap-2 text-xl"
                    >
                        Edit <MdModeEdit size={20} />
                    </Button>
                </Link>
                <Button variant="secondary"
                    className="flex items-center gap-2 text-xl bg-nord-11 hover:bg-red-400"
                    onClick={handleDelete}
                    >
                    Delete <MdDelete size={20} />
                </Button>
            </div>
        </div>
    )
}

const DeleteModal = () => {
    return (
        <div>
            <Heading variant="2">Are you sure you want to delete this post?</Heading>
            <Button variant="secondary">Yes</Button>
            <Button variant="secondary">No</Button>
        </div>
    )
}