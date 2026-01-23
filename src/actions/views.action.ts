"use server"

import { prisma } from '../lib/prisma';
import { ArticleViews } from '../types/views';

/**
 * Increments the view count on an article, then returns the new view count.
 * Creates the entry in the database if it's not there yet.
 * 
 * @returns the article's updated view count
 */
export async function incrementViews(articleName: string, articleCategory: string, articleSlug: string): Promise<number> {
    try {
        const stats = await prisma.articleStats.upsert({
            where: { slug: articleSlug },
            update: { 
                views: { increment: 1 },
                category: articleCategory,
                name: articleName
            },
            create: {
                slug: articleSlug,
                category: articleCategory,
                name: articleName,
                views: 1 
            },
        });

        return stats.views;
    } catch (e) {
        return 0;
    }
}

/**
 * Gets all article slugs and their view count
 * @returns all articles and their view count
 */
export async function getAllArticleViews(): Promise<ArticleViews[]> {
  try {
    const dbStats = await prisma.articleStats.findMany({
      orderBy: {
        views: 'desc'
      }
    });

    return dbStats;
    
  } catch (error) {
    console.error("Error while fetching stats:", error);
    return [];
  }
}