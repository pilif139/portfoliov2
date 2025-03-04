import Heading from "@/components/ui/Heading";
import getGithubFile from "@/lib/github/getGithubFile";
import ReactMarkdown from 'react-markdown'

export default async function ProjectPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const markdown = await getGithubFile("pilif139", name, "README.md");

    return (
        <main className="flex flex-col gap-6 items-center">
            <Heading variant="1">{name}</Heading>
            <article className="prose prose-invert prose-h1:text-theme-8 prose-headings:text-theme-7 prose-p:text-theme-5 prose-p:text-lg prose-strong:text-theme-14 prose-a:text-theme-13">
                <ReactMarkdown>
                    {markdown}
                </ReactMarkdown>
            </article>
        </main>
    )
}