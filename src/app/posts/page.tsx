import { getCurrentSession } from "@/lib/auth/session"
import Unauthorized from "@/components/Unauthorized"
import db from "@/db/db"
import { postsTable } from "@/db/schema/posts"
import Link from "next/link"
import Card from "@/components/Card"

export default async function PostsPage() {
    const { user, session } = await getCurrentSession()
    if (!user && !session) {
        return <Unauthorized />
    }

    const posts = await db.select().from(postsTable).execute()

    return posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
            <Card key={post.id} className="p-6">
                <Card.Header>
                    <h1 className="text-theme-9 text-2xl drop-shadow drop-shadow-black hover:shadow-theme-9">{post.title}</h1>
                </Card.Header>
                <Card.Content>
                    <p>{post.description}</p>
                </Card.Content>
            </Card>
        </Link>
    ))
}
