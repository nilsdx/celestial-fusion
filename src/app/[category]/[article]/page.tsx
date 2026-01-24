import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import ItemCard from '../../../components/ItemCard';
import { Metadata } from 'next';
import { incrementViews } from '@/src/actions/views.action';
import { getArticleData } from '@/src/actions/articles.action';

const articlesDirectory = path.join(process.cwd(), 'articles');

interface PageProps {
    params: Promise<{ category: string; article: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category, article } = await params;
    const articleData = await getArticleData(category, article);

    if (!articleData) return { title: "Not found" };

    return {
        title: `${articleData.data.title} - Linis's Archives`,
        description: articleData.data.description,
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { category, article } = await params;
    
    const itemData = await getArticleData(category, article);

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