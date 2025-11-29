import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromReq } from "@/lib/auth";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode')

    const posts = await prisma.post.findMany({
        orderBy: mode === 'most_liked' ? { likes: 'desc'} : { createdAt: 'desc'},
        include: { user: true},
    })
    return NextResponse.json({ posts });
}


export async function POST(req: Request) {
    const userId = getUserIdFromReq(req);
    if ( !userId) return NextResponse.json({ error: "Unauthorized" }, { Status: 401})
    const body = await req.json();


    const user = await prisma.user.findUnique({ where: { id: userId }})
    const today = new Date().toDateString();

    if (user && (!user.lastPostDate || user.lastPostDate.toDateString() !== today)){
        await prisma.user.update({ where: { id: userId }, data: { postsToday: 0 }})
    }

    const post = await prisma.post.create({
        data: {
            userId,
            content: body.content,
            imageUrl: body.imageUrl || null,
        },
        include: { user: true },
    })

    

}

