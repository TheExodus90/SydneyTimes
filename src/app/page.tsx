'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Article, getArticles, getArticlesByCategory } from '@/lib/database';

export default function Home() {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [opinionArticles, setOpinionArticles] = useState<Article[]>([]);
  const [loadingLatest, setLoadingLatest] = useState(false);
  const [loadingOpinion, setLoadingOpinion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latestPage, setLatestPage] = useState(1);
  const [opinionPage, setOpinionPage] = useState(1);
  const [hasMoreLatest, setHasMoreLatest] = useState(true);
  const [hasMoreOpinion, setHasMoreOpinion] = useState(true);

  // Observers for infinite scrolling
  const latestObserver = useRef<IntersectionObserver | null>(null);
  const opinionObserver = useRef<IntersectionObserver | null>(null);

  const lastLatestArticleElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loadingLatest || !hasMoreLatest) return;
      if (latestObserver.current) latestObserver.current.disconnect();
      latestObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLatestPage((prevPage) => prevPage + 1);
        }
      }, {
        root: null,
        rootMargin: '20px',
        threshold: 1.0
      });
      if (node) latestObserver.current.observe(node);
    },
    [loadingLatest, hasMoreLatest]
  );

  const lastOpinionArticleElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loadingOpinion || !hasMoreOpinion) return;
      if (opinionObserver.current) opinionObserver.current.disconnect();
      opinionObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOpinionPage((prevPage) => prevPage + 1);
        }
      }, {
        root: null,
        rootMargin: '20px',
        threshold: 1.0
      });
      if (node) opinionObserver.current.observe(node);
    },
    [loadingOpinion, hasMoreOpinion]
  );

  useEffect(() => {
    async function fetchLatestArticles() {
      setLoadingLatest(true);
      try {
        const fetchedLatestArticles = await getArticles(latestPage);
        const nonOpinionArticles = fetchedLatestArticles.filter(article => article.category !== 'opinion');
        setLatestArticles((prevArticles) => {
          const newArticles = nonOpinionArticles.filter(
            newArticle => !prevArticles.some(prevArticle => prevArticle.id === newArticle.id)
          );
          return [...prevArticles, ...newArticles];
        });
        setHasMoreLatest(nonOpinionArticles.length > 0);
      } catch (err) {
        console.error('Failed to fetch latest articles:', err);
        setError('Failed to fetch latest articles.');
      } finally {
        setLoadingLatest(false);
      }
    }

    fetchLatestArticles();
  }, [latestPage]);

  useEffect(() => {
    async function fetchOpinionArticles() {
      setLoadingOpinion(true);
      try {
        const fetchedOpinionArticles = await getArticlesByCategory('opinion', opinionPage);
        setOpinionArticles((prevArticles) => {
          const newArticles = fetchedOpinionArticles.filter(
            newArticle => !prevArticles.some(prevArticle => prevArticle.id === newArticle.id)
          );
          return [...prevArticles, ...newArticles];
        });
        setHasMoreOpinion(fetchedOpinionArticles.length > 0);
      } catch (err) {
        console.error('Failed to fetch opinion articles:', err);
        setError('Failed to fetch opinion articles.');
      } finally {
        setLoadingOpinion(false);
      }
    }

    fetchOpinionArticles();
  }, [opinionPage]);

  if (error) return <p className="text-xl text-red-600 text-center font-article">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold mb-2 font-article text-black pt-4">Latest News</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-2/3 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {latestArticles.map((article, index) => (
              <div
                key={article.id}
                className="border overflow-hidden shadow-sm"
                ref={latestArticles.length === index + 1 ? lastLatestArticleElementRef : null}
              >
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
                  <p className="text-sm text-gray-700 mb-1 leading-relaxed font-article">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-gray-500 font-article">
                    By {article.author} | {new Date(article.published_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {loadingLatest && <Skeleton count={6} />}
        </div>

        <div className="hidden lg:block border-l border-gray-300"></div>

        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold mb-4 font-article text-black">Opinion</h2>
          <div className="space-y-4">
            {opinionArticles.map((article, index) => (
              <div
                key={article.id}
                className="border overflow-hidden shadow-sm"
                ref={opinionArticles.length === index + 1 ? lastOpinionArticleElementRef : null}
              >
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
                  <p className="text-sm text-gray-700 mb-1 leading-relaxed font-article">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-gray-500 font-article">
                    By {article.author} | {new Date(article.published_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {loadingOpinion && <Skeleton count={3} />}
          </div>
        </div>
      </div>
    </div>
  );
}