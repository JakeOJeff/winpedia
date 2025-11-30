import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getUserByClerkId } from "@/actions/user.action";
import { Link } from "lucide-react";
async function Sidebar() {
    const authUser = await currentUser()
    if (!authUser) return <UnauthenticatedSidebar />;

    const user = await getUserByClerkId(authUser.id);
    if (!user) return null
    
    return <div className="sticky top-20">
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex col items-center text-center">
                    <Link
                        href = {`/profile/${user.username}`}
                        className="flex flex-col items-center justify-center"
                    >
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
}


export default Sidebar

const UnauthenticatedSidebar = () => (
    <div className="sticky top-20">
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground mb-4">
                    Login to access your profile to connect!
                </p>
                <SignInButton mode="modal">
                    <Button className="w-full" variant={"outline"}>
                        Login
                    </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button className="w-full mt-2" variant={"default"}>
                        Sign Up
                    </Button>
                </SignUpButton>
            </CardContent>
        </Card>
    </div>
);
