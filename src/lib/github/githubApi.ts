import ky from "ky"

const githubApi = ky.create({
    prefixUrl: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
    timeout: 10000,
    next: { revalidate: 3600 },
})

export default githubApi
