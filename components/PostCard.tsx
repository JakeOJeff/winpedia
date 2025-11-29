"use client"

import axios from "axios"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function PostCard({ post }: any) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  async function toggleLike() {
    const res = await axios.post("/api/posts/like", { postId: post.id })
    if (res.data.liked) {
      setLiked(true)
      setLikes((l: number) => l + 1)
    } else {
      setLiked(false)
      setLikes((l: number) => l - 1)
    }
  }

  return (
    <div className="border rounded p-4 shadow-sm">
      <Link href={`/profile/${post.user.username}`}>
        <p className="font-semibold">@{post.user.username}</p>
      </Link>

      <p className="mt-2">{post.content}</p>

      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          width={400}
          height={400}
          className="rounded mt-2"
          alt="post"
        />
      )}

      <button
        onClick={toggleLike}
        className="mt-3 px-3 py-1 rounded bg-gray-200"
      >
        ❤️ {likes}
      </button>
    </div>
  )
}
