import Link from 'next/link';
import { getArticlesByCategory } from '@/lib/database';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const articles = await getArticlesByCategory(params.slug);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-['Great_Vibes'] mb-8 capitalize">{params.slug} News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="border rounded-lg overflow-hidden shadow-md">
            <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/article/${article.slug}`} className="hover:text-blue-600">
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-2">{article.excerpt}</p>
              <p className="text-sm text-gray-500">
                By {article.author} | {new Date(article.published_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}