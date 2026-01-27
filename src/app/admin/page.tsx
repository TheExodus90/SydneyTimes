// src/app/admin/page.tsx

'use client'; // This line makes this component a Client Component

import { useState } from 'react';
import { createArticle, uploadImage } from '@/lib/database';
import { Article } from '@/lib/database'; // Import Article type

// Categories matching the Header navigation
const CATEGORIES = ['politics', 'technology', 'science', 'culture', 'opinion'];

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Clear any existing URL when file is selected
      setArticle(prev => ({ ...prev, image_url: '' }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Clear file selection if input is cleared
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalImageUrl = article.image_url;
    
    // Upload image first if a file is selected
    if (selectedFile) {
      setUploading(true);
      try {
        const imageUrl = await uploadImage(selectedFile);
        if (!imageUrl) {
          alert('Failed to upload image. Please try again.');
          setUploading(false);
          return;
        }
        finalImageUrl = imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image. Please try again.');
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    // Validate that image_url is set
    if (!finalImageUrl) {
      alert('Please upload an image or provide an image URL.');
      return;
    }

    try {
      const articleToSubmit = {
        ...article,
        image_url: finalImageUrl
      };
      
      const newArticle = await createArticle(articleToSubmit);
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
        setSelectedFile(null);
        setImagePreview(null);
        // Reset file input
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        console.error('Failed to create article: No data returned');
        alert('Failed to create article. The server did not return any data. Please check the server logs and try again.');
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('An error occurred while creating the article. Please check the console for more details and try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <select
          name="category"
          value={article.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Article Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs h-48 object-cover rounded border"
              />
            </div>
          )}
          {!selectedFile && (
            <input
              name="image_url"
              value={article.image_url}
              onChange={handleChange}
              placeholder="Or enter image URL"
              className="w-full px-3 py-2 border rounded mt-2"
            />
          )}
        </div>
        <button 
          type="submit" 
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Create Article'}
        </button>
      </form>
    </div>
  );
}
