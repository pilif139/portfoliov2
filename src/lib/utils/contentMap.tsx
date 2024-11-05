import Heading from "@/components/ui/Heading";
import { PostContentBlock } from "@/db/schema/posts";
import Image from "next/image";

const contentMap = (content: Partial<PostContentBlock>) : { [key : string]: () => JSX.Element }=> ({
    "h1": () => (
        <Heading variant="1">{content.content}</Heading>
    ),
    "h2": () => (
        <Heading variant="2">{content.content}</Heading>
    ),
    "h3": () => (
        <Heading variant="3">{content.content}</Heading>
    ),
    "h4": () => (
        <Heading variant="4">{content.content}</Heading>
    ),
    "p": () => (
        <p>{content.content}</p>
    ),
    "image": () => (
        <Image src={content.content as string} alt="img" width={400} height={400} className="rounded-xl shadow-gray-900 shadow-lg max-w-min max-h-min"/>
    ),
    "video": () => (
        <video src={content.content as string} controls width="350" height="350" className="rounded-xl shadow-gray-900 shadow-lg"/>
    ),
    "file": () => (
        <a href={content.content as string} download className="bg-nord-10 px-4 py-2 rounded-xl">Download file</a>
    ),
});

export default contentMap;