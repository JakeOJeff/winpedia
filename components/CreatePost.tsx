'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { NextResponse } from 'next/server'


export default function CreatePost({ onPosted }: { onPosted?: () => void }) {
    const [content, setContent] = useState('')
    const [image, setImage] = useState<File | null>(null)


    async function submit() {
        let imageUrl = null
        if (image) {
        const form = new FormData()
        form.append('file', image)
        form.append('upload_preset', 'unsigned_preset')
        const r = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL as string, { method: 'POST', body: form })
        const data = await r.json()
        imageUrl = data.secure_url
    }


    await axios.post('/api/posts', { content, imageUrl })
        setContent('')
        setImage(null)
        onPosted?.()
    }


    return NextResponse.json({})
}