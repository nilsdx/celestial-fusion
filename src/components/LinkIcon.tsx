import Image from "next/image";
import { getArticleData } from "../actions/articles.action";

interface LinkIconProps {
    href: string|undefined;
    size?: number;
}

const VALID_ICONS = [
    "hu", "ra", "fo", "frame", "barrier", "item", "mag", "unit", "quest"
];

const LinkIcon = async ({ href, size = 20 }: LinkIconProps) => {
    if (!href || href.startsWith('http') || href.startsWith('#')) return null;

    const parts = href.split('/').filter(Boolean);
    
    if (parts.length < 2) return null;

    const category = parts[parts.length - 2];
    const itemSlug = parts[parts.length - 1];

    const article = await getArticleData(category, itemSlug);

    if (!article || !article.data.icon || !article.hasFrontmatter) return null;

    const iconName = article.data.icon.toLowerCase();

    if (!VALID_ICONS.includes(iconName)) {
        return null; 
    }

    return (
        <span className="inline-flex align-middle mr-1 select-none">
            <Image
                src={`/images/link-icons/${iconName}.png`}
                alt="" 
                width={size}
                height={size}
                className="object-contain"
                unoptimized
            />
        </span>
    );
}

export default LinkIcon;