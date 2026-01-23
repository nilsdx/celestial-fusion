import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import ItemCard from '../../../components/ItemCard';
import { Metadata } from 'next';
import { incrementViews } from '@/src/actions/views.action';

const articlesDirectory = path.join(process.cwd(), 'articles');

interface PageProps {
    params: Promise<{ category: string; article: string }>;
}

function getArticleData(category: string, slug: string) {
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

    return { 
        data: { 
            ...data, 
            title: extractedTitle || slug,
            description: extractedDescription || "Unofficial Destiny PSOBB strategy guide website"
        },
        content 
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category, article } = await params;
    const articleData = getArticleData(category, article);

    if (!articleData) return { title: "Not found" };

    return {
        title: `${articleData.data.title} - Linis's Archives`,
        description: articleData.data.description,
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { category, article } = await params;
    
    const itemData = getArticleData(category, article);

    if (!itemData) {
        notFound();
    }

    const { data, content } = itemData;

    const views = await incrementViews(data.title, category, article);

    return (
        <div className="flex w-full justify-between">
            <article className="m-6 article-styling">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
                <p>Views: {views}</p>
            </article>
            <ItemCard item={article}/>
        </div>
    );
}

export async function generateStaticParams() {
    if (!fs.existsSync(articlesDirectory)) return [];
    
    const categories = fs.readdirSync(articlesDirectory, { withFileTypes: true })
                         .filter(dirent => dirent.isDirectory())
                         .map(dirent => dirent.name);

    const paths = categories.flatMap(category => {
        const categoryPath = path.join(articlesDirectory, category);
        
        return fs.readdirSync(categoryPath)
            .filter(filename => filename.endsWith('.md'))
            .map(filename => ({
                category: category,
                article: filename.replace('.md', ''),
            }));
    });

    return paths;
}