import { PostContentBlock } from "@/db/schema/posts"
import base64ToFile from "@/lib/utils/base64ToFile"

export default function ConvertContentsToPayload(contents: Partial<PostContentBlock>[], title: string) {
    return contents
        .map(({ type, content, position }) => {
            if (!content || !type || !position) {
                return null
            }
            if (type === "file" || type === "image" || type === "video") {
                return {
                    type,
                    content: base64ToFile(content, `${title}-${type}-${position}`),
                    position,
                }
            } else {
                return { type, content, position }
            }
        })
        .filter((content) => content !== null)
}
