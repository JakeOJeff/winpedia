import { Bell, BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";

import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar() {
    const user = await currentUser();

    return (
        <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <Button variant={"ghost"} className="flex items-center gap-2" asChild>
                <Link href="/">
                    <span className="hidden lg:inline">Feed</span>
                </Link>
            </Button>

            { user ? (
                <>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link href="/notifications">
                            <BellIcon className="w-4 h-4"/>
                            <span className="hidden lg:inline">Notifications</span>
                        </Link>
                    </Button>
                </>
            ) : (<></>)}
        </div>
    )
}
export default DesktopNavbar;