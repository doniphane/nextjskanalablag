import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const blagues = await prisma.blaguePerso.findMany()
    const random = Math.floor(Math.random() * blagues.length)
    return NextResponse.json(blagues[random])
  } catch (error) {
    console.error("Erreur Prisma:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
