import { BellIcon, Rss, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { getNotifications } from "@/actions/notification.action";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

export default async function DesktopNavbar() {
    const user = await currentUser();

    let unreadCount = 0;
    if (user) {
        const notifications = await getNotifications();
        unreadCount = notifications.filter(n => !n.read).length;
    }

    return (
        <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/">
                    <Rss className="w-2 h-4" />
                    <span className="hidden lg:inline">Feed</span>
                </Link>
            </Button>

            {user ? (
                <>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link href="/notifications">
                            <BellIcon className="w-2 h-4" />
                            {unreadCount > 0 && (
                                <span className="hidden lg:inline">{unreadCount}</span>
                            )}
                        </Link>
                    </Button>

                    <Button variant="ghost" asChild>
                        <Link
                            href={`/profile/${
                                user.username ??
                                user.emailAddresses[0].emailAddress.split("@")[0]
                            }`}
                        >
                            <UserIcon className="w-2 h-4" />
                        </Link>
                    </Button>

                    <UserButton />
                </>
            ) : (
                <SignInButton mode="modal">
                    <Button variant="default">Sign In</Button>
                </SignInButton>
            )}
        </div>
    );
}