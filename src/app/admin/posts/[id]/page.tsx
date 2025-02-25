import FadeDiv from "@/components/ui/FadeDiv"
import Heading from "@/components/ui/Heading"
import Content from "@/components/Content"
import fetchPost from "@/server/post/fetchPost"

type ViewPostPageProps = {
    params: Promise<{ id: number }>
}

export default async function ViewPostPage({ params }: ViewPostPageProps) {
    const id = (await params).id
    const { post, contents } = await fetchPost(id)

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
