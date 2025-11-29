import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromReq } from "@/lib/auth";


export async function POST(req: Request) {
    const userId = getUserIdFromReq(req)
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401})
    const { postId } = await req.json()
    const existing = await prisma.like.findUnique({ where: { userId_postId: { userId, postId } } }).catch(() => null)

    if (existing) {
        await prisma.like.delete({ where: {id: existing.id}})
        await prisma.post.update({ where: {id: postId }, data: { likes: {decrement: 1}}})
        return NextResponse.json({liked: false})
    }
    else {
        await prisma.like.create({ data: { userId, postId }})
        await prisma.post.update({ where: { id: postId }, data: { likes: { increment: 1} }})
        return NextResponse.json({liked : true})
    }
}