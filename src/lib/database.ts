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

// Get all unique categories
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('category')
      .order('category', { ascending: true });

    if (error) {
      throw error;
    }

    // Extract unique categories
    const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
    return uniqueCategories;
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

// Upload image to Supabase Storage
export async function uploadImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `article-images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('article-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('article-images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error('Error uploading image:', err);
    return null;
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
