'use client';

import { useEffect, useState } from 'react';
import { Article, getArticles } from '@/lib/database';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await getArticles();
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

  if (loading) return <p className="text-lg">Loading...</p>;
  if (error) return <p className="text-lg text-red-600">{error}</p>;

  const mainArticles = articles.filter(article => article.category !== 'opinion').slice(0, 6);
  const opinionArticles = articles.filter(article => article.category === 'opinion').slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-2 font-sans text-black">Latest News</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Articles Section */}
        <div className="lg:w-2/3 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mainArticles.length > 0 ? (
              mainArticles.map((article) => (
                <div key={article.id} className="border overflow-hidden shadow-sm">
                  <div className="relative w-full h-40">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h2 className="text-lg font-bold mb-2 font-sans leading-tight text-black">
                      <a href={`/article/${article.slug}`} className="hover:text-blue-600">
                        {article.title}
                      </a>
                    </h2>
                    <p className="text-sm text-gray-700 mb-2 leading-relaxed">{article.excerpt}</p>
                    <p className="text-xs text-gray-500">
                      By {article.author} | {new Date(article.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg">No articles available.</p>
            )}
          </div>
        </div>

        {/* Vertical Separator */}
        <div className="hidden lg:block border-l border-gray-300"></div>

        {/* Opinion Section */}
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-2xl font-bold mb-4 font-sans text-black">Opinion</h2>
          <div className="space-y-4">
            {opinionArticles.length > 0 ? (
              opinionArticles.map((article) => (
                <div key={article.id} className="border overflow-hidden shadow-sm">
                  <div className="relative w-full h-32">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h2 className="text-md font-bold mb-2 font-sans leading-tight text-black">
                      <a href={`/article/${article.slug}`} className="hover:text-blue-600">
                        {article.title}
                      </a>
                    </h2>
                    <p className="text-sm text-gray-700 mb-2 leading-relaxed">{article.excerpt}</p>
                    <p className="text-xs text-gray-500">
                      By {article.author} | {new Date(article.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg">No opinion articles available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
