import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface HoverLinkProps {
    href: string,
    children: React.ReactNode,
    target: boolean
}

const HoverLink: React.FC<HoverLinkProps> = ({href, children, target}) => {
    return (
        <Link
            href={href}
            className="px-2 py-1 text-sm transition-colors duration-150 hover:bg-sky-700/25 flex items-center gap-1"
            target={target ? "_blank" : "_self"}
        >
            {children}
            {target && (
                <ExternalLink size={16}/>
            )}
        </Link>
    )
}

export default HoverLink;