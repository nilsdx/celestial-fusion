import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from 'fs';
import matter from "gray-matter";
import { Metadata } from "next";
import path from "path";

export const metadata: Metadata = {
  title: "Privacy policy - Linis's Archives",
  description: "Unofficial Destiny PSOBB strategy guide website",
};

export default async function PrivacyPage() {
    const filePath = path.join(process.cwd(), 'src/app/privacy/privacy.md');

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);

    return (
        <div className="article-styling">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    )
}