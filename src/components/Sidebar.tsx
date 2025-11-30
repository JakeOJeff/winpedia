import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
async function Sidebar() {
    const authUser = await currentUser()
    if (!authUser) return <UnauthenticatedSidebar />;
    return <div>Sidebar</div> 
}

const UnauthenticatedSidebar = () => {
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
}

export default Sidebar