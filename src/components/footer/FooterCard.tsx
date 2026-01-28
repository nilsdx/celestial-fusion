import Image from "next/image";
import Link from "next/link"

interface FooterCardProps {
    link: string,
    label: string,
    icon: string,
    size: number
}

const FooterCard: React.FC<FooterCardProps> = ({link, label, icon, size}) => {
    return (
        <Link 
            href={link}
            target="_blank"
            className="bg-white/20 w-40 p-4 flex flex-col items-center justify-between rounded-lg"
        >
            <p className="text-center">
                {label}
            </p>
            <Image src={icon} width={size} height={size} alt={`${label} icon`} className="opacity-40"/>
        </Link>
    )
}

export default FooterCard;