import Link from 'next/link';
import { Article } from '@/types/article';

type FeaturedArticleProps = {
  article: Article;
};

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={article.image_url} alt={article.title} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Featured</div>
          <Link href={`/article/${article.slug}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {article.title}
          </Link>
          <p className="mt-2 text-gray-500">{article.excerpt}</p>
          <div className="mt-4 flex items-center">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={article.author_image} alt={article.author} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{article.author}</p>
              <p className="text-sm text-gray-500">{new Date(article.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;