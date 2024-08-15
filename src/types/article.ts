// src/types/article.ts

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  created_at: string; // Ensure this is present
  published_at: string;
  image_url: string;
}
