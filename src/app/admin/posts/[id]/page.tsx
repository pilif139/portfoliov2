import FadeDiv from "@/components/ui/FadeDiv"
import Heading from "@/components/ui/Heading"
import db from "@/db/db"
import { post_content_blocksTable, postsTable } from "@/db/schema/posts"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import Content from "@/components/Content"

type ViewPostPageProps = {
    params: Promise<{ id: number }>
}

export default async function ViewPostPage({ params }: ViewPostPageProps) {
    const id = (await params).id
    const [post] = await db.select().from(postsTable).where(eq(postsTable.id, id)).execute()
    if (!post) {
        notFound()
    }
    const contents = await db.select().from(post_content_blocksTable).where(eq(post_content_blocksTable.post_id, id)).execute()

    return (
        <FadeDiv className="flex flex-col gap-4 items-center">
            <Heading variant="1" className="text-theme-9">
                {post.title}
            </Heading>
            <p>{post.description}</p>
            <div className="flex gap-4 flex-col w-[50vw]">
                {contents.map((content, index) => {
                    return <Content key={index} content={content} />
                })}
            </div>
        </FadeDiv>
    )
}
