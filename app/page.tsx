"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import PostCard from "@/components/PostCard"

export default function FeedPage() {
  const [mode, setMode] = useState<"latest" | "most_liked">("latest")

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts", mode],
    queryFn: async () => {
      const res = await axios.get(`/api/posts?mode=${mode}`)
      return res.data.posts
    }
  })

  useEffect(() => {
    refetch()
  }, [mode])

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Feed</h1>

      {/* FILTER */}
      <div className="flex gap-3 mb-5">
        <button
          className={`px-4 py-2 rounded ${
            mode === "latest" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("latest")}
        >
          Latest
        </button>

        <button
          className={`px-4 py-2 rounded ${
            mode === "most_liked" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("most_liked")}
        >
          Most Popular
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      <div className="flex flex-col gap-5">
        {data?.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
