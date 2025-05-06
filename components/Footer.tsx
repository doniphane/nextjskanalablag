export default function Footer() {
  return (
    <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 py-6 border-t border-orange-200 dark:border-gray-700">
      <p className="mb-2">
        © {new Date().getFullYear()} <strong>Kanalablague</strong> — Rire garanti ou je te rembourse ta blague
      </p>
      <p className="italic text-xs">
       By Noelson
      </p>
    </footer>
  )
}
