import Heading from "@/components/ui/Heading";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function BlogsPanel() {
    return (
        <div className="flex flex-col gap-4 bg-nord-0 p-4 rounded-lg w-[20vw]">
            <Heading variant="3" className="text-nord-9">Blog</Heading>
            <Button className="w-full">
                <Link href={"/admin/posts"}>View your posts</Link>
            </Button>
            <Button className="w-full">
                <Link href={"/admin/posts/new"}>Create new post</Link>
            </Button>
        </div>
    )
}