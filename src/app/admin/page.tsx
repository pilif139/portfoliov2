import Heading from "@/components/ui/Heading";
import ProjectsPanel from "@/app/admin/ProjectsPanel";
import BlogsPanel from "@/app/admin/BlogsPanel";

export default async function AdminPage() {

    return (
        <>
            <Heading>Admin Panel</Heading>
            <div className="flex flex-wrap justify-center w-full gap-4">
                <ProjectsPanel/>
                <BlogsPanel/>
            </div>
        </>
    );
}