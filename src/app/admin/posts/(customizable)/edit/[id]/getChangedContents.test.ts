import getChangedContents from "./getChangedContents"
import { PostContentBlock } from "@/db/schema/posts"

describe("getChangedContents test", () => {
    it("returns an empty array when no contents have changed", () => {
        const oldContents: PostContentBlock[] = [{ post_id: 1, type: "p", content: "old content", position: 1 }]
        const contents: Partial<PostContentBlock>[] = [{ type: "p", content: "old content", position: 1 }]
        expect(getChangedContents(oldContents, contents)).toEqual([])
    })

    it("returns contents that have changed content", () => {
        const oldContents: PostContentBlock[] = [{ post_id: 1, type: "p", content: "old content", position: 1 }]
        const contents: Partial<PostContentBlock>[] = [{ type: "p", content: "new content", position: 1 }]
        expect(getChangedContents(oldContents, contents)).toEqual([{ type: "p", content: "new content", position: 1 }])
    })

    it("returns contents that have changed position", () => {
        const oldContents: PostContentBlock[] = [{ post_id: 1, type: "p", content: "old content", position: 1 }]
        const contents: Partial<PostContentBlock>[] = [
            { type: "p", content: "old content", position: 1 },
            { type: "p", content: "old content", position: 2 },
        ]
        expect(getChangedContents(oldContents, contents)).toEqual([{ type: "p", content: "old content", position: 2 }])
    })

    it("returns contents that are of type image, file, or video", () => {
        const oldContents: PostContentBlock[] = [{ post_id: 1, type: "p", content: "old content", position: 1 }]
        const contents: Partial<PostContentBlock>[] = [
            { type: "p", content: "old content", position: 1 },
            { type: "image", content: "image content", position: 2 },
        ]
        expect(getChangedContents(oldContents, contents)).toEqual([{ type: "image", content: "image content", position: 2 }])
    })

    it("returns contents that didnt change but are of type image, file or video", () => {
        const fileContents: PostContentBlock[] = [
            { post_id: 1, type: "image", content: "old content", position: 1 },
            { post_id: 1, type: "file", content: "old content", position: 2 },
            { post_id: 1, type: "video", content: "old content", position: 3 },
        ]

        const oldContents: PostContentBlock[] = [...fileContents, { post_id: 1, type: "p", content: "old content", position: 4 }]

        expect(getChangedContents(oldContents, oldContents)).toEqual(fileContents)
    })
})
