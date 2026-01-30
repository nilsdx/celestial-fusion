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

    const stats = fs.statSync(filePath);

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
            createdAt: stats.birthtime,
            updatedAt: stats.mtime,
        },
        content 
    };
}

/**
 * Returns all articles with their slug, their category and their full path
 * @returns 
 */
const getAllArticleFiles = () => {
    if (!fs.existsSync(articlesDirectory)) return [];

    const categories = fs.readdirSync(articlesDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    return categories.flatMap(category => {
        const categoryPath = path.join(articlesDirectory, category);
        return fs.readdirSync(categoryPath)
            .filter(f => f.endsWith('.md'))
            .map(filename => ({
                slug: filename.replace('.md', ''),
                category,
                fullPath: path.join(categoryPath, filename)
            }));
    });
};

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
    const allFiles = getAllArticleFiles();
    const results: { article: Article, score: number }[] = [];

    for (const fileInfo of allFiles) {
        const articleData = await getArticleData(fileInfo.category, fileInfo.slug);
        if (!articleData) continue;

        let score = 0;
        const titleLower = articleData.data.title.toLowerCase();
        const categoryLower = fileInfo.category.toLowerCase();
        const contentLower = articleData.content.toLowerCase();

        keywords.forEach(word => {
            if (titleLower.includes(word)) {
                score += 20; 

                const exactMatchRegex = new RegExp(`\\b${word}\\b`, 'i');
                if (exactMatchRegex.test(titleLower)) {
                    score += 150;
                }

                const startsWithRegex = new RegExp(`\\b${word}`, 'i');
                if (startsWithRegex.test(titleLower)) {
                    score += 50;
                }
            }
            
            if (categoryLower.includes(word)) {
                const exactCatRegex = new RegExp(`\\b${word}\\b`, 'i');
                score += exactCatRegex.test(categoryLower) ? 80 : 30;
            }

            const occurrences = contentLower.split(word).length - 1;
            score += occurrences;
        });

        if (score > 0) {
            results.push({
                article: {
                    title: articleData.data.title,
                    description: articleData.data.description,
                    category: fileInfo.category,
                    slug: fileInfo.slug
                },
                score
            });
        }
    }

    return results
        .sort((a, b) => b.score - a.score)
        .map(r => r.article);
};

/**
 * Returns the last <limit> articles that were recently updated
 * 
 * @param limit 
 * @returns 
 */
export const getLatestArticles = async (limit = 5) => {
    const allFiles = getAllArticleFiles();

    const articles = allFiles.map(file => {
        const stats = fs.statSync(file.fullPath);
        const fileContent = fs.readFileSync(file.fullPath, 'utf8');
        const { data, content } = matter(fileContent);

        let displayTitle = data.title;
        if (!displayTitle) {
            const firstLine = content.split('\n').find(line => line.trim().startsWith('# '));
            displayTitle = firstLine ? firstLine.replace('# ', '').trim() : file.slug;
        }

        return {
            slug: file.slug,
            category: file.category,
            title: displayTitle,
            updatedAt: stats.mtime
        };
    });

    return articles
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, limit);
};