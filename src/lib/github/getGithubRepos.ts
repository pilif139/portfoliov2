import { notFound } from "next/navigation"
import githubApi from "@/lib/github/githubApi"

export type GithubRepo = {
    name: string
    description: string
    html_url: string
    updated_at: string
    homepage: string | null
    language: string | null
}

export default async function getGithubRepos(username: string): Promise<GithubRepo[]> {
    const response = await githubApi.get(`users/${username}/repos`)

    if (!response.ok) {
        if (response.status === 404) {
            return notFound()
        }
        throw new Error(response.statusText)
    }

    const json = (await response.json()) as GithubRepo[]
    return json.map((repo: GithubRepo) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        updated_at: repo.updated_at,
        homepage: repo.homepage, // link to website if exists
        language: repo.language,
    }))
}
