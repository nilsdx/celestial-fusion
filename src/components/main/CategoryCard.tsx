import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
    label: string,
    image: string,
    href: string
}
export const CategoryCard: React.FC<CategoryCardProps> = ({label, image, href}) => {
    return (
        <div className="relative w-64 h-64 overflow-hidden group">
            <Link
                href={href}
            >
                <p className="absolute bottom-0 bg-red-500 w-full z-10 text-white font-bold p-1">{label}</p>
                <Image
                    src={image} alt={`${label} image`}
                    fill
                    className="hover:scale-120 transition-transform duration-200"
                />
            </Link>
        </div>
        
    )
}