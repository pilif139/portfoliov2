import Heading from "@/components/ui/Heading"
import getGithubFile from "@/lib/github/getGithubFile"
import ReactMarkdown from "react-markdown"
import Button from "@/components/ui/Button"
import Link from "next/link"
import getGithubRepo from "@/lib/github/getGithubRepo"

export default async function ProjectPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params
    const markdown = await getGithubFile("pilif139", name, "README.md")
    const repo = await getGithubRepo(name)
    console.log(repo)

    return (
        <main className="flex flex-col gap-6 items-center">
            <Heading variant="1">{name}</Heading>
            <article className="prose prose-invert prose-h1:text-theme-8 prose-headings:text-theme-7 prose-p:text-theme-5 prose-p:text-lg prose-strong:text-theme-14 prose-a:text-theme-13">
                <ReactMarkdown>{markdown}</ReactMarkdown>
                <aside className="flex gap-4 flex-col md:flex-row">
                    <Link href={`https://www.github.com/pilif139/${name}`} target="_blank">
                        <Button variant="secondary" className="text-2xl px-10 py-4 bg-black">
                            Source code
                        </Button>
                    </Link>
                    {repo.homepage && (
                        <Link href={repo.homepage} target="_blank">
                            <Button variant="secondary" className="text-2xl px-10 py-4 bg-black">
                                Website
                            </Button>
                        </Link>
                    )}
                </aside>
            </article>
        </main>
    )
}
