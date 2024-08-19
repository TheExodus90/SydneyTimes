import { getArticleBySlug } from '@/lib/database';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-['Great_Vibes'] mb-4">{article.title}</h1>
      <img src={article.image_url} alt={article.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className="text-gray-600 mb-4">{article.excerpt}</p>
      <div 
        className="prose lg:prose-xl whitespace-pre-wrap"  // Added the whitespace-pre-wrap class here
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
      <p className="mt-4 text-sm text-gray-500">
        By {article.author} | Published on {new Date(article.published_at).toLocaleDateString()}
      </p>
    </article>
  );
}
