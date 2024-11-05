import FadeDiv from "@/components/ui/FadeDiv";
import Heading from "@/components/ui/Heading";
import db from "@/db/db";
import { post_content_blocksTable, postsTable } from "@/db/schema/posts";
import contentMap from "@/lib/utils/contentMap";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type ViewPostPageProps = {
    params: Promise<{id: number}>;
}

export default async function ViewPostPage({ params} : ViewPostPageProps){
    const id = (await params).id;
    const [post] = await db
                          .select()
                          .from(postsTable)
                          .where(eq(postsTable.id, id))
                          .execute();
    if(!post){
        notFound();
    }                          
    const contents = await db
                            .select()
                            .from(post_content_blocksTable)
                            .where(eq(post_content_blocksTable.post_id, id))
                            .execute();

    return (
        <FadeDiv className="flex flex-col gap-4 items-center">
            <Heading variant="1" className="text-nord-9">{post.title}</Heading>
            <p>{post.description}</p>
            <div className="flex gap-2 flex-col w-[35vw]">
                {
                    contents.map((content, index) => {
                            const Component = contentMap(content)[content.type];
                            return <Component key={index}/>
                        }
                    )
                }
            </div>
        </FadeDiv>
    )
}