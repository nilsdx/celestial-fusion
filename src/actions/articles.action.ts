"use server"

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from "../types/article";

const articlesDirectory = path.join(process.cwd(), 'articles');

/**
 * Returns an article's datas and content
 * 
 * @param category article category (1st part of the link)
 * @param slug  article slug (2nd part of the link)
 * @returns Article datas (including its content)
 */
export const getArticleData = async (category: string, slug: string) => {
    const filePath = path.join(articlesDirectory, category, `${slug}.md`);

    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const lines = content.split('\n').map(line => line.trim());

    let extractedTitle = data.title;
    let titleLineIndex = -1;

    if (!extractedTitle) {
        titleLineIndex = lines.findIndex(line => line.startsWith('# '));
        if (titleLineIndex !== -1) {
            extractedTitle = lines[titleLineIndex].replace('# ', '').trim();
        }
    } else {
        titleLineIndex = lines.findIndex(line => line.startsWith('# '));
    }

    let extractedDescription = data.description;

    if (!extractedDescription) {
        const firstParagraph = lines.slice(titleLineIndex + 1).find(line => line.length > 0);
        
        if (firstParagraph) {
            extractedDescription = firstParagraph
                .replace(/[#*`_~]/g, '')
                .replace(/\[(.*?)\]\(.*?\)/g, '$1')
                .slice(0, 160);
        }
    }

    // I should be returning my new Article type, but this was made early into the project...
    // Maybe I'll come back to it.
    return { 
        data: { 
            ...data, 
            title: extractedTitle || slug,
            description: extractedDescription || "No description for this article",
        },
        content 
    };
}

/**
 * Searches through all articles by using the keywords present in the query.
 * Returns a list of all articles, title and description.
 * 
 * Priorities (in order):
 * - Article title
 * - Category
 * - Most number of matching keywords
 * 
 * @param query Search query
 * @returns all articles matching the query
 */
export const searchArticles = async (query: string): Promise<Article[]> => {
    if (!query) return [];

    const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0);
    const results: { article: Article, score: number }[] = [];

    const categories = fs.readdirSync(articlesDirectory).filter(file => 
        fs.statSync(path.join(articlesDirectory, file)).isDirectory()
    );

    for (const category of categories) {
        const categoryPath = path.join(articlesDirectory, category);
        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));

        for (const file of files) {
            const slug = file.replace('.md', '');
            const articleData = await getArticleData(category, slug);
            
            if (!articleData) continue;

            let score = 0;
            const titleLower = articleData.data.title.toLowerCase();
            const categoryLower = category.toLowerCase();
            const contentLower = articleData.content;

            keywords.forEach(word => {
                // Priority 1
                if (titleLower.includes(word)) score += 100;
                
                // Priority 2
                if (categoryLower.includes(word)) score += 50;

                // Priority 3
                const occurrences = contentLower.split(word).length - 1;
                score += occurrences;
            });

            if (score > 0) {
                results.push({
                    article: {
                        title: articleData.data.title,
                        description: articleData.data.description,
                        category: category,
                        slug: slug
                    },
                    score
                });
            }
        }
    }

    return results
        .sort((a, b) => b.score - a.score)
        .map(r => r.article);
}