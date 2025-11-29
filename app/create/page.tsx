"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function CreatePostPage() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()

    const res = await axios.post("/api/posts", { content, imageUrl })

    if (res.status === 200) {
      router.push("/")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="border rounded p-3"
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          className="border rounded p-3"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  )
}
