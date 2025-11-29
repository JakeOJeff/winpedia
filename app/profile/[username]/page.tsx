import { prisma } from "@/lib/prisma"
import Image from "next/image"
import PostCard from "@/components/PostCard"

export default async function ProfilePage({ params }: any) {
  const username = params.username

  const user = await prisma.user.findUnique({
    where: { username },
    include: { posts: { orderBy: { createdAt: "desc" } } }
  })

  if (!user) return <div className="p-4">User not found.</div>

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={user.avatarUrl || "https://placekitten.com/200/200"}
          width={80}
          height={80}
          className="rounded-full"
          alt="avatar"
        />

        <div>
          <h1 className="text-2xl font-bold">@{user.username}</h1>
          <p className="text-gray-500">{user.bio || "No bio yet."}</p>
        </div>
      </div>

      <div className="mb-4">
        <p><b>Streak:</b> {user.streak} 🔥</p>
        <p><b>ICE:</b> {user.iceStatus}</p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Posts</h2>

      <div className="flex flex-col gap-4">
        {user.posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
