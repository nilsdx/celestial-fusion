import Image from "next/image";
import { getItemDatas } from "../actions/get-item.action";

interface LinkIconProps {
    href: string|undefined;
    size?: number;
}

const VALID_ICONS = [
    "hu", "ra", "fo", "frame", "barrier", "item", "mag", "unit"
];

const LinkIcon = async ({ href, size = 20 }: LinkIconProps) => {
    if (!href || href.startsWith('http')) return null;

    const parts = href.split('/').filter(Boolean);

    if (parts.length < 2) return null;

    const [category, itemSlug] = parts;

    const itemData = await getItemDatas(category, itemSlug);

    if (!itemData || !itemData.icon) return null;

    if (!VALID_ICONS.includes(itemData.icon)) {
        return null; 
    }

    return (
        <span className="inline-flex align-middle mr-1 select-none">
            <Image
                src={`/images/link-icons/${itemData.icon}.png`}
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