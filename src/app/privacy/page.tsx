import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from 'fs';
import matter from "gray-matter";
import { Metadata } from "next";
import path from "path";

export const metadata: Metadata = {
  title: "Privacy policy - Celestial Fusion",
  description: "Unofficial database for the Destiny Phantasy Star Online Blue Burst private server",
};

export default async function PrivacyPage() {
    const filePath = path.join(process.cwd(), 'src/app/privacy/privacy.md');

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);

    return (
        <div className="article-styling m-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    )
}