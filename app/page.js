import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import with code splitting
const BlogPostForm = dynamic(() => import('../components/form'), {
  loading: () => <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  </div>,
  ssr: false
});

export const metadata = {
  title: 'Create AI-Generated Blog Posts',
  description: 'Generate high-quality blog content in seconds with our AI-powered blog generator. Customize tone, length, and topic to your needs.',
  openGraph: {
    title: 'Create AI-Generated Blog Posts',
    description: 'Generate high-quality blog content in seconds with our AI-powered blog generator.',
  }
};

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPostForm />
      </Suspense>
    </main>
  );
}
