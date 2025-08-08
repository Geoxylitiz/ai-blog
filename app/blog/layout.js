import Link from 'next/link';

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition">
            Blog Generator
          </Link>
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Create New Blog
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-8">
        {children}
      </main>
      <footer className="bg-white shadow-inner mt-8 py-6">
        <div className="container mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} Blog Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 