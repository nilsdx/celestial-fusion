import { promises as fs } from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';

export async function GET() {
    const articlesPath = path.join(process.cwd(), 'articles');
    let targetUrl = "";

    try {
        const entries = await fs.readdir(articlesPath, { withFileTypes: true });
        const categories = entries
            .filter(dir => dir.isDirectory())
            .map(dir => dir.name);

        if (categories.length === 0) throw new Error("No category found");

        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const categoryPath = path.join(articlesPath, randomCategory);

        const files = await fs.readdir(categoryPath, { withFileTypes: true });
        const articles = files
            .filter(file => file.isFile() && file.name.endsWith('.md'))
            .map(file => file.name.replace('.md', ''));

        if (articles.length === 0) throw new Error("No article found");

        const randomArticle = articles[Math.floor(Math.random() * articles.length)];

        targetUrl = `/${randomCategory}/${randomArticle}`;

    } catch (error) {
        console.error("Error log: ", error);
        return new Response("Internal server error", { status: 500 });
    }

    redirect(targetUrl);
}