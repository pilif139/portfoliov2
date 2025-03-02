import { Suspense } from "react"
import getGithubRepos from "@/lib/github/getGithubRepos"
import Card from "@/components/Card";
import Heading from "@/components/ui/Heading";
import LanguageIcon from "@/lib/icons/LanguageIcon";
import Link from "next/link";

export default async function ProjectsPage() {
    const repos = await getGithubRepos("pilif139");

    return (
        <main className="flex flex-col items-center gap-8">
            <Heading>Projects</Heading>
            <div className="flex items-stretch flex-wrap gap-5">
                <Suspense fallback={<div>Loading...</div>}>
                    {repos.map((repo, id) => (
                        <Link key={id} href={`/projects/${repo.name}`} className="flex-1/3">
                            <Card className="w-full h-full">
                                <Card.Header className="text-theme-13">{repo.name}</Card.Header>
                                <Card.Content>{repo.description}</Card.Content>
                                {repo.language && (
                                    <Card.Footer className="text-4xl">
                                        <LanguageIcon language={repo.language} />
                                    </Card.Footer>
                                )}
                            </Card>
                        </Link>
                    ))}
                </Suspense>
            </div>
        </main>
    )
}
