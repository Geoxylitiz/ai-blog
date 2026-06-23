'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const BlogPostForm = () => {
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    length: 'medium'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate blog post');
      }
      
       router.push(`/blog/${data.slug}`);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || 'Failed to generate blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="page-wrap py-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-strong)]">New draft</p>
          <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-black leading-[0.95] text-[color:var(--color-ink)] [overflow-wrap:anywhere]">
            Shape the article before it writes.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-[color:var(--color-ink-soft)]">
            Give the generator a precise topic, then set the editorial tone and target depth before Blogify drafts.
          </p>
        </div>
    <div className="panel p-5 sm:p-7">
      <h2 className="mb-5 text-2xl font-black text-[color:var(--color-ink)]">Draft settings</h2>
      
      {error && (
        <div className="mb-5 rounded-[var(--radius-md)] border border-[color:var(--color-danger)] bg-[color:var(--color-danger-soft)] p-3 text-sm font-semibold text-[color:var(--color-danger)]">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="mb-2 block text-sm font-bold text-[color:var(--color-ink)]">Topic <span className="text-[color:var(--color-danger)]">*</span></label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="control min-h-12 w-full px-4"
            placeholder="Remote work rituals for small teams"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-[color:var(--color-ink)]">Tone</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {['professional', 'casual', 'friendly'].map((tone) => (
              <label key={tone} className={`control cursor-pointer px-4 py-3 text-center text-sm font-bold capitalize ${formData.tone === tone ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)]' : 'text-[color:var(--color-ink-soft)]'}`}>
                <input
                  type="radio"
                  name="tone"
                  value={tone}
                  checked={formData.tone === tone}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="sr-only"
                />
                {tone}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-[color:var(--color-ink)]">Length</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {['short', 'medium', 'long'].map((length) => (
              <label key={length} className={`control cursor-pointer px-4 py-3 text-center text-sm font-bold capitalize ${formData.length === length ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)]' : 'text-[color:var(--color-ink-soft)]'}`}>
                <input
                  type="radio"
                  name="length"
                  value={length}
                  checked={formData.length === length}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="sr-only"
                />
                {length}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="action-button w-full px-5"
        >
          {isLoading ? 'Generating draft...' : 'Generate draft'}
        </button>
      </form>
    </div>
      </div>
    </section>
  );
};

export default BlogPostForm;
