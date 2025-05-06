import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") ?? "dev"

  try {
    const res = await fetch(`https://api.blablagues.net/?rub=blagues&cat=${category}`, {
      cache: "no-store",
    })
    const data = await res.json()
    return NextResponse.json(data.data.content)
  } catch (error) {
    console.error("Erreur API Joke:", error)
    return NextResponse.json(null, { status: 500 })
  }
}
