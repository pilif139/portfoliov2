import {getCurrentSession} from "@/lib/auth/session";
import Heading from "@/components/ui/Heading";
import FadeDiv from "@/components/ui/FadeDiv";

export default async function AdminLayout({children} : {children: React.ReactNode}) {
    const { user } = await getCurrentSession();
    if(user === null || user.role !== "admin") {
        return <Heading className="text-nord-11">Access Denied</Heading>;
    }

    return (
        <FadeDiv className="flex flex-col items-center w-[50vw] gap-2">
            {children}
        </FadeDiv>
    );
}