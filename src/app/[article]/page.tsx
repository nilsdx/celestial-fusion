import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';

const articlesDirectory = path.join(process.cwd(), 'articles');

interface PageProps {
    params: Promise<{ article: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
    const { article } = await params;

    const filePath = path.join(articlesDirectory, `${article}.md`);

    console.log("Chemin généré :", filePath);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return (
        <article className="prose lg:prose-xl mx-auto py-10 px-6">
            {data.title && <h1>{data.title}</h1>}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </article>
    );
}

export async function generateStaticParams() {
    if (!fs.existsSync(articlesDirectory)) return [];
    
    const files = fs.readdirSync(articlesDirectory);
    return files.map((filename) => ({
        slug: filename.replace('.md', ''),
    }));
}