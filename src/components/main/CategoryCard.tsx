import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
    label: string,
    image: string,
    href: string
}
export const CategoryCard: React.FC<CategoryCardProps> = ({label, image, href}) => {
    return (
        <Link
            href={href}
            scroll={true}
            className="relative w-30 h-30 overflow-hidden group"
        >
            <p className="absolute bottom-0 font-bold text-center bg-rose-600 w-full z-10 text-white font text-sm p-1">{label}</p>
            <Image
                src={image} alt={`${label} image`}
                fill
                sizes="120px"
                className="hover:scale-120 transition-transform duration-200"
            />
        </Link>
    )
}