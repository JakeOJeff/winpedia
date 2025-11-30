import { currentUser } from "@clerk/nextjs/server";

async function Sidebar() {
    const authUser = await currentUser()
    if (!authUser) return <UnauthenticatedSidebar />;
    return <div>Sidebar</div> 
}

export default Sidebar