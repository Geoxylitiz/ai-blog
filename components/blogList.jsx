'use client'
import React, { useEffect, useState } from "react";
import Link from 'next/link';
export default function BlogList() {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogs) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-4xl font-extrabold mb-10 text-gray-800">
          No Blog Posts Available
        </h2>
        <p className="text-lg text-gray-600">
          There are currently no blog posts available. Please check back later.
        </p>
      </div>
    );
  }

   return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-4xl font-extrabold mb-10 text-gray-800">
        Blog Posts
      </h2>
      <div className="flex flex-col items-center gap-6 w-full max-w-lg px-4">
        {blogs.map((blog, index) => (
          <Link
            key={index}
            href={`/blog/${blog.slug}`}
            className="w-full"
          >
            <div className="w-full bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-100 transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500">
                Click to read more about {blog.title}.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}