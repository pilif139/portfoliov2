import { notFound } from "next/navigation"
import githubApi from "@/lib/github/githubApi"

export default async function getGithubFile(owner: string, repo: string, path: string) {
    const response = await githubApi.get(`repos/${owner}/${repo}/contents/${path}`)

    if (!response.ok) {
        if (response.status === 404) {
            return notFound()
        }
        throw new Error(response.statusText)
    }

    const fileData = (await response.json()) as { content: string; encoding: BufferEncoding }
    return Buffer.from(fileData.content, fileData.encoding).toString("utf-8")
}
