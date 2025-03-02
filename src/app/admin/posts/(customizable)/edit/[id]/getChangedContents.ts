import { PostContentBlock } from "@/db/schema/posts"

/**
 * @returns An array of content blocks that have changed or are new or are of type image, video or file because you cannot compare local file url with the one that is in vercel storage directly.
 * */
export default function getChangedContents(
    oldContents: PostContentBlock[],
    contents: Partial<PostContentBlock>[]
): Partial<PostContentBlock>[] {
    if (!oldContents || oldContents.length <= 0) return contents

    return contents.filter((content, id) => {
        const oldContent = oldContents[id]
        if (!oldContent) return true
        if (oldContent.content !== content.content) return true
        if (content.type === "file" || content.type === "image" || content.type === "video") return true
        if (oldContent.type !== content.type) return true
        return false
    })
}
