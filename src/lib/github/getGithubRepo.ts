import { GithubRepo } from "@/lib/github/getGithubRepos"
import githubApi from "@/lib/github/githubApi"

export default async function getGithubRepo(name: string, owner: string = "pilif139"): Promise<GithubRepo> {
    const res = await githubApi.get(`repos/${owner}/${name}`)
    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return (await res.json()) as GithubRepo
}
