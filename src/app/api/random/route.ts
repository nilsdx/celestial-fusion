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

        if (categories.length === 0) throw new Error("No categories found");

        const allArticles: { category: string; slug: string }[] = [];

        await Promise.all(
            categories.map(async (category) => {
                const categoryPath = path.join(articlesPath, category);
                const files = await fs.readdir(categoryPath, { withFileTypes: true });
                
                const articlesInCat = files
                    .filter(file => file.isFile() && file.name.endsWith('.md'))
                    .map(file => ({
                        category: category,
                        slug: file.name.replace('.md', '')
                    }));
                
                allArticles.push(...articlesInCat);
            })
        );

        if (allArticles.length === 0) throw new Error("No articles found");

        const randomIndex = Math.floor(Math.random() * allArticles.length);
        const selected = allArticles[randomIndex];

        targetUrl = `/${selected.category}/${selected.slug}`;

    } catch (error) {
        console.error("Random article error:", error);
        return new Response("Internal server error", { status: 500 });
    }

    redirect(targetUrl);
}