// src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { Article, getArticles } from '@/lib/database'; // Import the Article type

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await getArticles();
        console.log('Fetched Articles:', fetchedArticles); // Log fetched articles
        setArticles(fetchedArticles);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        setError('Failed to fetch articles.');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="relative w-full h-48">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  <a href={`/article/${article.slug}`} className="hover:text-blue-600">
                    {article.title}
                  </a>
                </h2>
                <p className="text-gray-600 mb-2">{article.excerpt}</p>
                <p className="text-sm text-gray-500">
                  By {article.author} | {new Date(article.published_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No articles available.</p>
        )}
      </div>
    </div>
  );
}
