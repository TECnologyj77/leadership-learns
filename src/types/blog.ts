export type BlogCategory = 'Corporate' | 'Individual' | 'Productivity' | 'Leadership';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  imageUrl?: string;
}
