import Link from 'next/link';
import { Article } from '@/types/article';

type ArticleListProps = {
  articles: Article[];
};

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <article key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/article/${article.slug}`} className="hover:text-blue-600">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
              <span>{article.author}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;