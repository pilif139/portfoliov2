import { notFound } from "next/navigation"

export default async function getGithubFile(owner: string, repo: string, path: string) {
    try {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`

        const headers: HeadersInit = {
            Accept: "application/vnd.github.v3.raw",
        }

        const response = await fetch(url, { headers, next: { revalidate: 3600 } })

        if (!response.ok) {
            if (response.status === 404) {
                return notFound()
            }
            throw new Error(response.statusText)
        }

        return await response.text()
    } catch (error) {
        console.log("Error fetching github file", error)
        throw error
    }
}
