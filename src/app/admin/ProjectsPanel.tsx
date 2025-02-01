import Heading from "@/components/ui/Heading"
import Link from "next/link"
import Button from "@/components/ui/Button"

export default function ProjectsPanel() {
    return (
        <div className="flex flex-col gap-4 bg-theme-0 p-4 rounded-lg w-[20vw]">
            <Heading variant="3" className="text-theme-9">
                Projects
            </Heading>
            <Button className="w-full">
                <Link href={"/admin/projects"}>View your projects</Link>
            </Button>
            <Button className="w-full">
                <Link href={"/admin/projects/new"}>Create a new project</Link>
            </Button>
        </div>
    )
}
