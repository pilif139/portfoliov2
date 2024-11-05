import Heading from "@/components/ui/Heading";
import { Post } from "@/db/schema/posts"
import Link from "next/link";
import { Spline_Sans_Mono as Font } from "next/font/google";

const font = Font({
    subsets: ["latin"],
    weight: "600"
});

type PostProps = {
    post: Post;
}

export default function PostCard({post}: PostProps){
    return (
        <Link href={`/admin/posts/${post.id}`}>
            <div className="bg-nord-0 hover:bg-gray-800 transition p-4 rounded-xl cursor-pointer w-[20vw] h-full">
                <Heading variant="3" className="text-nord-9">{post.title}</Heading>
                <p className={`text-nord-4 ${font.className}`}>{post.description}</p>
            </div>
        </Link>
    )
}