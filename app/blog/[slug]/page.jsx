import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { getBlogBySlug } from '@/lib/blogService';

// Dynamic import with code splitting
const BlogDetails = dynamic(() => import('@/components/BlogDetails'), {
  loading: () => <div className="container mx-auto p-6 max-w-3xl">
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
    </div>
  </div>
});

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug);
  return {
    title: blog?.title || 'Blog Post',
    description: blog?.content?.substring(0, 160) || 'Generated blog post'
  };
}

export default async function BlogPage({ params }) {
  const blog = await getBlogBySlug(params.slug);

  return (
    <Suspense fallback={<div className="text-center py-10">Loading blog post...</div>}>
      <BlogDetails blog={blog} />
    </Suspense>
  );
}