"use client"

import { useEffect, useState } from "react"
import { Loader2, Laugh, Sparkles } from "lucide-react"

export default function JokeGenerator() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true)
      try {
        const res = await fetch("/api/categories")
        const cats = await res.json()
        setCategories(cats)
        if (cats.length > 0) {
          setSelectedCategory(cats[0])
        }
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error)
      } finally {
        setLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  const handleGetApiJoke = async () => {
    if (!selectedCategory) return
    setLoading(true)
    try {
      const res = await fetch(`/api/joke?category=${selectedCategory}`)
      const data = await res.json()
      setJoke(data)
    } catch (error) {
      console.error("Erreur lors de la blague API:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGetPersonalJoke = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/blaguesperso")
      const data = await res.json()
      setJoke(data)
    } catch (error) {
      console.error("Erreur lors de la blague perso:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 text-center">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
        {loadingCategories ? (
          <div className="w-60 h-12 bg-yellow-100 animate-pulse rounded-xl"></div>
        ) : (
          <div className="relative w-60">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-12 px-4 pr-10 bg-yellow-100 border-2 border-yellow-300 rounded-xl text-yellow-900 font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace(/[+]/g, " ")}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500">
              😂
            </div>
          </div>
        )}

        {/* 🔁 Bouton blague depuis API externe */}
        <button
          onClick={handleGetApiJoke}
          disabled={loading || categories.length === 0}
          className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Chargement...
            </>
          ) : (
            <>
              <Laugh className="h-5 w-5" />
              Fait moi rire !
            </>
          )}
        </button>

        {/* 🌟 Bouton blague perso (MySQL via Prisma) */}
        <button
          onClick={handleGetPersonalJoke}
          disabled={loading}
          className="h-12 px-6 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Chargement...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Blague perso 🤫
            </>
          )}
        </button>
      </div>

      {/* 📦 Affichage de la blague */}
      {joke && (
        <div className="bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 border-4 border-yellow-200 dark:border-yellow-600 p-6 rounded-3xl shadow-xl max-w-2xl mx-auto transition-all duration-300">
          {joke.text_head && (
            <p className="text-xl font-extrabold text-purple-800 dark:text-yellow-300 mb-3 animate-bounce">
              {joke.text_head}
            </p>
          )}
          {joke.text && (
            <p className="text-lg text-gray-800 dark:text-gray-200">{joke.text}</p>
          )}
          {joke.text_hidden && (
            <p className="mt-4 pt-4 border-t border-dashed border-yellow-400 dark:border-yellow-500 text-gray-900 dark:text-gray-300 font-medium italic">
              {joke.text_hidden}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
