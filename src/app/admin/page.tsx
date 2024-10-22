import {getCurrentSession} from "@/lib/auth/session";
import FadeDiv from "@/components/ui/FadeDiv";
import Heading from "@/components/ui/Heading";
import ProjectsPanel from "@/app/admin/ProjectsPanel";

export default async function AdminPage() {

    return (
        <>
            <Heading>Admin Panel</Heading>
            <ProjectsPanel/>
        </>
    );
}