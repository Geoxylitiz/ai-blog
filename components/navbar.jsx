import Link from 'next/link'

export default function Navbar() {
    return (
      <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link
          className="text-2xl font-bold text-gray-800"
          href="/"
        >BLOGIFY</Link>
        
       <Link
          href="/create"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Create Blog
        </Link>
      </nav>
    )
}