"use client"

import Heading from "@/components/ui/Heading"
import { Post } from "@/db/schema/posts"
import Link from "next/link"
import { Spline_Sans_Mono as Font } from "next/font/google"
import { MdDelete, MdModeEdit } from "react-icons/md"
import Button from "@/components/ui/Button"
import { useModalContext } from "@/components/ModalContext"
import deletePost from "@/server/post/deletePost"

const font = Font({
    subsets: ["latin"],
    weight: "600",
})

type PostProps = {
    post: Post
}

export default function PostCard({ post }: PostProps) {
    const { openModal, closeModal } = useModalContext()

    const handleDelete = () => {
        openModal(
            <DeleteModal
                onClick={() => {
                    deletePost(post.id)
                    closeModal()
                }}
            />
        )
    }

    return (
        <div className="bg-theme-0 hover:bg-gray-800 transition p-4 rounded-xl cursor-pointer w-[20vw] h-full">
            <Link href={`/admin/posts/${post.id}`}>
                <div>
                    <Heading variant="3" className="text-theme-9">
                        {post.title}
                    </Heading>
                    <p className={`text-theme-4 ${font.className}`}>{post.description}</p>
                </div>
            </Link>
            <div className="mt-4 flex gap-4">
                <Link href={`/admin/posts/edit/${post.id}`}>
                    <Button variant="secondary" className="flex items-center gap-2 text-xl">
                        Edit <MdModeEdit size={20} />
                    </Button>
                </Link>
                <Button variant="secondary" className="flex items-center gap-2 text-xl bg-theme-11 hover:bg-red-400" onClick={handleDelete}>
                    Delete <MdDelete size={20} />
                </Button>
            </div>
        </div>
    )
}

const DeleteModal = ({ onClick }: { onClick: () => void }) => {
    const { closeModal } = useModalContext()

    return (
        <div className="flex gap-2 flex-col w-[30vw]">
            <Heading variant="2">Are you sure you want to delete this post?</Heading>
            <p>This will permamently delete all the data, images and all information about this post.</p>
            <div className="flex gap-4">
                <Button variant="secondary" className="bg-theme-14 hover:bg-green-500 text-xl" onClick={onClick}>
                    Yes
                </Button>
                <Button variant="secondary" className="bg-theme-11 hover:bg-red-400 text-xl" onClick={() => closeModal()}>
                    No
                </Button>
            </div>
        </div>
    )
}
