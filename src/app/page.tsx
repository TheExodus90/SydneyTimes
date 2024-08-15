import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/database';

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="relative w-full h-48">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-48"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/article/${article.slug}`}>
                    <a className="hover:text-blue-600">{article.title}</a>
                  </Link>
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
