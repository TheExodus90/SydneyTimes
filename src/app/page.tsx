'use client';

import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
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

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold mb-2 font-article text-black pt-4">
          <Skeleton width={200} />
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Articles Section */}
          <div className="lg:w-2/3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="border overflow-hidden shadow-sm">
                  <div className="relative w-full h-24">
                    <Skeleton height={96} />
                  </div>
                  <div className="p-3">
                    <h2 className="text-lg font-semibold mb-1 font-article leading-tight text-black">
                      <Skeleton width={150} />
                    </h2>
                    <p className="text-sm text-gray-700 mb-1 leading-relaxed font-article">
                      <Skeleton count={2} />
                    </p>
                    <p className="text-xs text-gray-500 font-article">
                      <Skeleton width={100} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden lg:block border-l border-gray-300"></div>

          {/* Opinion Section */}
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-2xl font-semibold mb-4 font-article text-black">
              <Skeleton width={120} />
            </h2>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="border overflow-hidden shadow-sm">
                  <div className="relative w-full h-20">
                    <Skeleton height={80} />
                  </div>
                  <div className="p-3">
                    <h2 className="text-lg font-semibold mb-1 font-article leading-tight text-black">
                      <Skeleton width={100} />
                    </h2>
                    <p className="text-sm text-gray-700 mb-1 leading-relaxed font-article">
                      <Skeleton count={2} />
                    </p>
                    <p className="text-xs text-gray-500 font-article">
                      <Skeleton width={80} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-xl text-red-600 text-center font-article">{error}</p>;

  const mainArticles = articles.filter(article => article.category !== 'opinion').slice(0, 6);
  const opinionArticles = articles.filter(article => article.category === 'opinion').slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold mb-2 font-article text-black pt-4">Latest News</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Articles Section */}
        <div className="lg:w-2/3 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mainArticles.length > 0 ? (
              mainArticles.map((article) => (
                <div key={article.id} className="border overflow-hidden shadow-sm">
                  <a href={`/article/${article.slug}`} className="block">
                    <div className="relative w-full h-24">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </a>
                  <div className="p-3">
                    <h2 className="text-lg font-semibold mb-1 font-article leading-tight text-black">
                      <a href={`/article/${article.slug}`} className="hover:text-purple-900">
                        {article.title}
                      </a>
                    </h2>
                    <p className="text-sm text-gray-700 mb-1 leading-relaxed font-article">{article.excerpt}</p>
                    <p className="text-xs text-gray-500 font-article">
                      By {article.author} | {new Date(article.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-xl font-article">No articles available.</p>
            )}
          </div>
        </div>

        {/* Vertical Separator */}
        <div className="hidden lg:block border-l border-gray-300"></div>

        {/* Opinion Section */}
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold mb-4 font-article text-black">Opinion</h2>
          <div className="space-y-4">
            {opinionArticles.length > 0 ? (
              opinionArticles.map((article) => (
                <div key={article.id} className="border overflow-hidden shadow-sm">
                  <a href={`/article/${article.slug}`} className="block">
                    <div className="relative w-full h-20">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </a>
                  <div className="p-3">
                    <h2 className="text-lg font-semibold mb-1 font-article leading-tight text-black">
                      <a href={`/article/${article.slug}`} className="hover:text-purple-900">
                        {article.title}
                      </a>
                    </h2>
                    <p className="text-sm text-gray-700 mb-1 leading-relaxed font-article">{article.excerpt}</p>
                    <p className="text-xs text-gray-500 font-article">
                      By {article.author} | {new Date(article.published_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-xl font-article">No opinion articles available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
