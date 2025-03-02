import { notFound } from "next/navigation"

export type GithubRepo = {
    name: string
    description: string
    html_url: string
    updated_at: string
    homepage: string | null
    language: string | null
}

export default async function getGithubRepos(username: string): Promise<GithubRepo[]> {
    try {
        const url = `https://api.github.com/users/${username}/repos`

        const headers: HeadersInit = {
            Accept: "application/vnd.github.v3+json",
        }

        const response = await fetch(url, { headers, next: { revalidate: 3600 } })

        if (!response.ok) {
            if (response.status === 404) {
                return notFound()
            }
            throw new Error(response.statusText)
        }

        const json = await response.json()
        return json.map((repo: GithubRepo) => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            updated_at: repo.updated_at,
            homepage: repo.homepage, // website url not always defined
            language: repo.language,
        }))
    } catch (error) {
        console.log("Error fetching github repos", error)
        throw error
    }
}
