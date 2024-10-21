import {getCurrentSession} from "@/lib/auth/session";

export default async function AdminPage() {
    const { user } = await getCurrentSession();
    if(user === null || user.role !== "admin") {
        return <div>Access Denied</div>;
    }

    return (
        <div>
            <h1>Admin Page</h1>
            <p>Admin page content</p>
        </div>
    );
}