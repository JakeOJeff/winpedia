"use server"

import prisma from "@/lib/prisma"
import { getDbUserId } from "./user.action"

export async function createPost(content: string, imageUrl: string){
    try {
        const userId = await getDbUserId();

        const post = await prisma.post.create({
            data:{
                content,
                image,
                authorId: userId,
            }
        })
    } catch (error) {
        
    }
}