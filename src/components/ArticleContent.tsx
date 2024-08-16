import { Article } from '../types/article';

type ArticleContentProps = {
  article: Article;
};

const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1>{article.title}</h1>
      <div className="flex items-center space-x-4 text-gray-500 mb-8">
        <img src={article.author_image} alt={article.author} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{article.author}</p>
          <p>{new Date(article.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <img src={article.image_url} alt={article.title} className="w-full h-64 object-cover rounded-lg mb-8" />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
};

export default ArticleContent;
