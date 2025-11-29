import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromReq } from "@/lib/auth"

export async function GET(req: Request) {
  const userId = getUserIdFromReq(req)
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { id: userId } })
  return NextResponse.json({ user })
}
