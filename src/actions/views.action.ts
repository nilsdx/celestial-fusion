"use server"

import { prisma } from '../lib/prisma';

/**
 * Increments the view count on an article, then returns the new view count.
 * Creates the entry in the database if it's not there yet.
 * 
 * @param articleName article slug
 * @returns the article's updated view count
 */
export async function incrementViews(articleName: string) {
    try {
        const stats = await prisma.articleStats.upsert({
            where: { slug: articleName },
            update: { views: { increment: 1 } },
            create: { slug: articleName, views: 1 },
        });

        return stats.views;
    } catch (e) {
        return new Response("Article not found", { status: 404 });
    }
}

// /**
//  * Get the number of views on an article
//  * 
//  * @param articleName article slug
//  * @returns the article's view count
//  */
// export async function getViews(articleName: string) {
//     try {
//         const stats = await prisma.articleStats.upsert({
//             where: { slug: articleName }
//         });

//         return stats.views;
//     } catch (e) {
//         return new Response("Article not found", { status: 404 });
//     }
// }