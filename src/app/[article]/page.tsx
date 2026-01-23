import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import ItemCard from './_components/ItemCard';
import { Metadata } from 'next';

const articlesDirectory = path.join(process.cwd(), 'articles');

interface PageProps {
    params: Promise<{ article: string }>;
}

function getArticleData(slug: string) {
    const filePath = path.join(articlesDirectory, `${slug}.md`);

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
                .replace(/[#*`_~]/g, '')        // remove markdown #
                .replace(/\[(.*?)\]\(.*?\)/g, '$1') // clean
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
    const { article } = await params;
    const articleData = getArticleData(article);

    if (!articleData) return { title: "Not found" };

    return {
        title: `${articleData.data.title} - Linis's Archives`,
        description: articleData.data.description || "Unofficial Destiny PSOBB strategy guide website",
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { article } = await params;
    
    const itemData = getArticleData(article);

    if (!itemData) {
        notFound();
    }

    const { data, content } = itemData;

    console.log("Lecture article :", article);

    return (
        <div className="flex w-full justify-between">
            <article className="py-10 px-6 article-styling">
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
    
    const files = fs.readdirSync(articlesDirectory);
    
    return files.map((filename) => ({
        article: filename.replace('.md', ''), 
    }));
}