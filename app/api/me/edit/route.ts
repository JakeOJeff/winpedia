import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromReq } from "@/lib/auth"

export async function POST(req: Request) {
  const userId = getUserIdFromReq(req)
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { bio, avatarUrl } = await req.json()

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { bio, avatarUrl }
  })

  return NextResponse.json({ user: updated })
}
