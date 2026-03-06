"use server"

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { ArticleData, ArticleSearchResult, ArticleSearchResultInfos } from '../types/article';

const articlesDirectory = path.join(process.cwd(), 'articles');

/**
 * Returns an article's datas and content
 * 
 * @param category article category (1st part of the link)
 * @param slug  article slug (2nd part of the link)
 * @returns Article datas (including its content)
 */
export const getArticleData = cache(async (category: string, slug: string): Promise<ArticleData | null> => {
    const filePath = path.join(articlesDirectory, category, `${slug}.md`);

    if (!fs.existsSync(filePath)) return null;

    const stats = fs.statSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const { data, content } = matter(fileContent);

    const match = content.match(/^#\s+(.*)$/m);
    let extractedTitle;
    if (match) {
        extractedTitle = match[1].trim();
    } else {
        extractedTitle = slug;
    }

    const extractedDescription = data.description || "No description available.";

    const hasFrontmatter = Object.keys(data).length > 0;

    return { 
        data: { 
            ...data, 
            title: extractedTitle,
            description: extractedDescription,
            createdAt: stats.birthtime,
            updatedAt: stats.mtime
        },
        content,
        hasFrontmatter
    };
})

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
 * Extracts YAML Frontmatter values from an
 * article, without the keys.
 * 
 * @param obj Generated object by gray-matter
 * @returns array containing all extracted values
 */
const extractYamlValues = (obj: any): string => {
    if (typeof obj !== 'object' || obj === null) {
        return String(obj).toLowerCase();
    }

    return Object.values(obj)
        .map(value => {
            if (typeof value === 'object') {
                return extractYamlValues(value);
            }
            return String(value).toLowerCase();
        })
        .join(' ');
};

/**
 * Searches through all articles by using the keywords present in the query.
 * Returns a list of all articles, title and description.
 * 
 * Priorities (in order):
 * - YAML datas
 * - Article title
 * - Category
 * - Most number of matching keywords
 * 
 * @param query Search query
 * @returns all articles matching the query
 */
export const searchArticles = async (query: string): Promise<ArticleSearchResultInfos[]> => {
    if (!query) return [];

    const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0);
    const allFiles = getAllArticleFiles();
    const results: { article: ArticleSearchResultInfos, score: number }[] = [];

    const exactRegexes = keywords.map(word => new RegExp(`\\b${word}\\b`, 'i'));

    for (const fileInfo of allFiles) {
        const articleData = await getArticleData(fileInfo.category, fileInfo.slug);
        if (!articleData) continue;

        let score = 0;
        const titleLower = articleData.data.title.toLowerCase();
        const categoryLower = fileInfo.category.toLowerCase();
        const contentLower = articleData.content.toLowerCase();
        
        const { title, description, createdAt, updatedAt, ...otherData } = articleData.data;
        const yamlValuesLower = extractYamlValues(otherData);

        keywords.forEach((word, index) => {
            if (titleLower.includes(word)) {
                score += 20; 
                if (exactRegexes[index].test(titleLower)) score += 150;
                if (new RegExp(`\\b${word}`, 'i').test(titleLower)) score += 50;
            }

            if (categoryLower.includes(word)) {
                score += exactRegexes[index].test(categoryLower) ? 80 : 30;
            }

            const contentOccurrences = contentLower.split(word).length - 1;
            score += contentOccurrences * 2;

            if (yamlValuesLower.includes(word)) {
                score += 40;
                if (exactRegexes[index].test(yamlValuesLower)) {
                    score += 60;
                }
            }
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