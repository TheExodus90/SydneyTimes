// src/app/admin/page.tsx

'use client'; // This line makes this component a Client Component

import { useState } from 'react';
import { createArticle } from '@/lib/database';
import { Article } from '@/lib/database'; // Import Article type

export default function AdminPage() {
  const [article, setArticle] = useState<Omit<Article, 'id' | 'created_at'>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    published_at: new Date().toISOString(),
    image_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newArticle = await createArticle(article);
      console.log('API Response:', newArticle);
      
      if (newArticle) {
        alert('Article created successfully!');
        console.log('New article:', newArticle);
        // Reset form
        setArticle({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          author: '',
          category: '',
          published_at: new Date().toISOString(),
          image_url: '',
        });
      } else {
        console.error('Failed to create article: No data returned');
        alert('Failed to create article. The server did not return any data. Please check the server logs and try again.');
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('An error occurred while creating the article. Please check the console for more details and try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={article.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="slug"
          value={article.slug}
          onChange={handleChange}
          placeholder="Slug"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          name="excerpt"
          value={article.excerpt}
          onChange={handleChange}
          placeholder="Excerpt"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          name="content"
          value={article.content}
          onChange={handleChange}
          placeholder="Content"
          required
          className="w-full px-3 py-2 border rounded h-32"
        />
        <input
          name="author"
          value={article.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="category"
          value={article.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="image_url"
          value={article.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Article
        </button>
      </form>
    </div>
  );
}
