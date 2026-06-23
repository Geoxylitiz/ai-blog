'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogDetails({ blog }) {
  if (!blog) {
    return <div className="panel p-6 text-center text-[color:var(--color-ink-soft)]">Blog post not found</div>;
  }

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-8 border-b border-[color:var(--color-rule)] pb-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-strong)]">Generated draft</p>
        <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-black leading-tight text-[color:var(--color-ink)] [overflow-wrap:anywhere]">{blog.title}</h1>
      </header>
      <div className="panel p-5 sm:p-8">
      <div className="article-prose prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>
      </div>
    </article>
  );
}
