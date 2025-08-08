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
      
      await router.push(`/blog/${data.slug}`);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || 'Failed to generate blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Blog Post Generator</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block mb-1 font-medium">Topic <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., Remote Work Tips"
          />
        </div>
        <div>
          <label htmlFor="tone" className="block mb-1 font-medium">Tone</label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>
        <div>
          <label htmlFor="length" className="block mb-1 font-medium">Length</label>
          <select
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded transition flex justify-center items-center ${
            isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : 'Generate Blog Post'}
        </button>
      </form>
    </div>
  );
};

export default BlogPostForm;