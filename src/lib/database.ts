// lib/database.ts

import { supabase } from './supabase';

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  created_at: string;  // Use 'created_at' as string
  published_at: string;
  image_url: string;
}

// Fetch articles with pagination
export async function getArticles(page: number = 1, limit: number = 10) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .range((page - 1) * limit, page * limit - 1) // Pagination logic
      .order('published_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Article[];
  } catch (err) {
    console.error('Error fetching articles:', err);
    return [];
  }
}

// Fetch a single article by slug
export async function getArticleBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      throw error;
    }

    return data as Article;
  } catch (err) {
    console.error('Error fetching article:', err);
    return null;
  }
}

// Fetch articles by category with pagination
export async function getArticlesByCategory(category: string, page: number = 1, limit: number = 10) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .range((page - 1) * limit, page * limit - 1) // Pagination logic
      .order('published_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Article[];
  } catch (err) {
    console.error('Error fetching articles by category:', err);
    return [];
  }
}

// Create a new article
export async function createArticle(article: Omit<Article, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([{
        ...article,
        created_at: new Date().toISOString(),
      }])
      .select() // Select returns the inserted data
      .single();  // Expect a single row response

    console.log('Insert Data:', data); // Log the inserted data
    console.error('Insert Error:', error); // Log any errors

    if (error) {
      throw error;
    }

    return data as Article;
  } catch (err) {
    console.error('Error creating article:', err);
    return null;
  }
}
