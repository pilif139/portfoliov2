import { getCurrentSession } from "@/lib/auth/session";
import FadeDiv from "@/components/ui/FadeDiv";
import Unauthorized from "@/components/Unauthorized";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user } = await getCurrentSession();
    if (user === null || user.role !== "admin") {
        return <Unauthorized />
    }

    return (
        <FadeDiv className="flex flex-col items-center w-screen gap-2 mx-0">
            {children}
        </FadeDiv>
    );
}