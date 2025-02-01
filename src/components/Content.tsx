import Heading from "@/components/ui/Heading"
import { PostContentBlock } from "@/db/schema/posts"
import Image from "next/image"

export default function Content({ content }: { content: Partial<PostContentBlock> }) {
    switch (content.type) {
        case "h1":
            return <Heading variant="1">{content.content}</Heading>
        case "h2":
            return <Heading variant="2">{content.content}</Heading>
        case "h3":
            return <Heading variant="3">{content.content}</Heading>
        case "h4":
            return <Heading variant="4">{content.content}</Heading>
        case "p":
            return <p>{content.content}</p>
        case "image":
            return (
                <Image
                    src={content.content as string}
                    alt="img"
                    width={400}
                    height={400}
                    className="shadow-gray-900 shadow-lg max-w-min max-h-min"
                />
            )
        case "video":
            return (
                <video src={content.content as string} controls width="350" height="350" className="shadow-gray-900 shadow-lg" />
            )
        case "file":
            return (
                <a href={content.content as string} download className="bg-theme-10 px-4 py-2 rounded-xl">
                    Download file
                </a>
            )
        default:
            return <></>
    }
}
