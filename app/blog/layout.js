import Navbar from '@/components/navbar';

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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