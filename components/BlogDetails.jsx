'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogDetails({ blog }) {
  if (!blog) {
    return <div className="container mx-auto p-6 text-center">Blog post not found</div>;
  }

  return (
    <article className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">{blog.title}</h1>
      <div className="prose prose-lg mx-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}