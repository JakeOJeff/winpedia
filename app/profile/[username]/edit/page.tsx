"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EditProfilePage() {
  const router = useRouter()

  const [bio, setBio] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  // Load current user
  useEffect(() => {
    axios.get("/api/me").then((res) => {
      setBio(res.data.user.bio || "")
      setAvatarUrl(res.data.user.avatarUrl || "")
    })
  }, [])

  async function handleSave(e: any) {
    e.preventDefault()

    const res = await axios.post("/api/me/edit", { bio, avatarUrl })
    router.push(`/profile/${res.data.user.username}`)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <textarea
          className="border p-3 rounded"
          placeholder="Your bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          className="border p-3 rounded"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />

        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  )
}
