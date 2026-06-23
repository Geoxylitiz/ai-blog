'use client'
import React, { useEffect, useState } from "react";
import Link from 'next/link';
export default function BlogList() {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog');
        if (!res.ok) {
          throw new Error('Could not load saved drafts');
        }
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error.message || 'Could not load saved drafts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="page-wrap pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="panel h-40 animate-pulse bg-[color:var(--color-panel-muted)]" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-wrap pb-14">
        <div className="panel p-6 text-[color:var(--color-danger)]">
          <p className="font-bold">Drafts did not load.</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  if (!blogs.length) {
    return (
      <section className="page-wrap pb-14">
        <div className="panel grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-black text-[color:var(--color-ink)]">No saved drafts yet</h2>
            <p className="mt-2 max-w-2xl text-[color:var(--color-ink-soft)]">
              Create your first article draft, then return here to scan, open, and refine it.
            </p>
          </div>
          <Link href="/create" className="action-button px-5">Create draft</Link>
        </div>
      </section>
    );
  }

   return (
    <section className="page-wrap pb-14">
      <div className="mb-5 flex flex-col gap-2 border-b border-[color:var(--color-rule)] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-black text-[color:var(--color-ink)]">Saved drafts</h2>
          <p className="mt-1 text-[color:var(--color-ink-muted)]">{blogs.length} draft{blogs.length === 1 ? '' : 's'} ready for review.</p>
        </div>
        <Link href="/create" className="secondary-button px-4">Add another</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog, index) => (
          <Link
            key={index}
            href={`/blog/${blog.slug}`}
            className="group panel block min-h-44 p-5 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1"
          >
              <div className="mb-8 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">
                <span>Draft {String(index + 1).padStart(2, '0')}</span>
                <span className="text-[color:var(--color-accent-strong)] transition-transform group-hover:translate-x-1">Open -&gt;</span>
              </div>
              <h3 className="text-xl font-black leading-tight text-[color:var(--color-ink)] [overflow-wrap:anywhere]">
                {blog.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[color:var(--color-ink-soft)]">
                Review the generated copy, headings, and structure.
              </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
