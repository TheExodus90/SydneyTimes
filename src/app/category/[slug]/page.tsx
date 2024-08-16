'use client';

import { useEffect, useState } from 'react';
import { Article, getArticlesByCategory } from '@/lib/database';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await getArticlesByCategory(params.slug);
        setArticles(fetchedArticles);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        setError('Failed to fetch articles.');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [params.slug]);

  if (loading) return <p className="text-lg">Loading...</p>;
  if (error) return <p className="text-lg text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold mb-6 font-sans capitalize">{params.slug}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="border overflow-hidden shadow-md">
              <div className="relative w-full h-48">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 font-sans leading-tight">
                  <a href={`/article/${article.slug}`} className="hover:text-blue-600">
                    {article.title}
                  </a>
                </h2>
                <p className="text-base text-gray-700 mb-3 leading-relaxed">{article.excerpt}</p>
                <p className="text-sm text-gray-500">
                  By {article.author} | {new Date(article.published_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">No articles available in this category.</p>
        )}
      </div>
    </div>
  );
}