import Heading from "@/components/ui/Heading";
import Unauthorized from "@/components/Unauthorized";
import db from "@/db/db";
import { postsTable } from "@/db/schema/posts";
import { getCurrentSession } from "@/lib/auth/session";
import { eq } from "drizzle-orm";
import PostCard from "./PostCard";

export default async function ViewPostsPage(){
    const { user, session } = await getCurrentSession();
    if(!user && !session){
        return <Unauthorized/>
    }

    const posts = await db.select().from(postsTable).where(eq(postsTable.author_id, user.id)).execute();

    return (
        <div className="flex flex-col gap-4 items-center">
            <Heading variant="1" className="text-nord-9">View your posts</Heading>
            <div className="flex gap-4 flex-wrap">
                {posts.map(post => (
                    <PostCard post={post} key={post.id}/>
                ))}
                {posts.length === 0 && <p className="text-nord-4 text-xl">You have no posts</p>}
            </div>
        </div>
    )
}