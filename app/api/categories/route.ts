import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch("https://api.blablagues.net/?list_cat", {
      cache: "no-store",
    })
    const data = await res.json()
    return NextResponse.json(Object.keys(data.blagues))
  } catch (error) {
    console.error("Erreur API Categories:", error)
    return NextResponse.json([], { status: 500 })
  }
}
