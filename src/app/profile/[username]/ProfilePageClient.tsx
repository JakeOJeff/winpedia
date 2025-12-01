"use client"

import { getProfileByUsername, getUserPosts } from "@/actions/profile.action";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

type User = Awaited<ReturnType<typeof getProfileByUsername>>
type Posts = Awaited<ReturnType<typeof getUserPosts>>

interface ProfilePageClientProps {
    user: User
    posts: Posts
    likedPosts: Posts
    isFollowing: boolean
}
function ProfilePageClient() {

    const { user: currentUser } = useUser();
    const [showEditDialog, setShowEditDialog] = useState(false);
    // const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  return (
    <div>
      
    </div>
  )
}

export default ProfilePageClient
