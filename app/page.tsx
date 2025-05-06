import Footer from "@/components/Footer"
import JokeGenerator from "../components/joke-generator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-2xl mx-auto text-center animate-fadeIn">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-orange-600 dark:text-yellow-300 drop-shadow-sm">
           Kanalablague
        </h1>
        <p className="text-lg sm:text-xl mb-10 text-gray-700 dark:text-gray-300 font-medium">
          La blague du jour, servie chaude et sans modération. Prépare ton rire !
        </p>

        <JokeGenerator />

        <Footer />
      </div>
    </main>
  )
}
