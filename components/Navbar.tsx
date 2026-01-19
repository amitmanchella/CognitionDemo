import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            My Blog
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              About
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
