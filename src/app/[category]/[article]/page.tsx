import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import ItemCard from '../../../components/ItemCard';
import { Metadata } from 'next';
import { getArticleData } from '@/src/actions/articles.action';
import React from 'react';
import SectionID, { SECTION_IDS } from '@/src/components/SectionID';
import Link from 'next/link';

const articlesDirectory = path.join(process.cwd(), 'articles');

interface PageProps {
    params: Promise<{ category: string; article: string }>;
}

const formatTextWithIcons = (text: string) => {
    if (typeof text !== 'string') return text;

    const regex = new RegExp(`\\b(${SECTION_IDS.join('|')})\\b`, 'g');
    const parts = text.split(regex);

    return parts.map((part, i) => {
        if (SECTION_IDS.includes(part)) {
            return (
                <SectionID id={part} size={20} key={`drop-id-${i}`}/>
            );
        }
        return part;
    });
};

const recursiveFormat = (children: any): any => {
    return React.Children.map(children, child => {
        if (typeof child === 'string') {
            return formatTextWithIcons(child);
        }
        if (React.isValidElement(child) && (child.props as any).children) {
            return React.cloneElement(child, {
                children: recursiveFormat((child.props as any).children)
            } as any);
        }
        return child;
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category, article } = await params;
    const articleData = await getArticleData(category, article);

    if (!articleData) return { title: "Not found" };

    return {
        title: `${articleData.data.title} - Celestial Fusion`,
        description: articleData.data.description,
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { category, article } = await params;
    const itemData = await getArticleData(category, article);

    if (!itemData) notFound();

    const { content } = itemData;

    return (
        <div className="flex min-h-screen">
            <article className="m-6 article-styling flex-4 min-w-0">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        a: ({ href, children }) => {
                            return (
                                <Link href={href || '#'}>
                                    {recursiveFormat(children)}
                                </Link>
                            );
                        },
                        p: ({ children }) => <p>{recursiveFormat(children)}</p>,
                        li: ({ children }) => <li>{recursiveFormat(children)}</li>,
                        td: ({ children }) => <td>{recursiveFormat(children)}</td>,
                        th: ({ children }) => <th>{recursiveFormat(children)}</th>
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>
            <div className="m-2">
                <ItemCard item={article} category={category}/>
            </div>
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