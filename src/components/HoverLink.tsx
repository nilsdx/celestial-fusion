import Link from "next/link";

interface HoverLinkProps {
    href: string
    children: React.ReactNode
}

const HoverLink: React.FC<HoverLinkProps> = ({href, children}) => {
    return (
        <Link href={href} className="px-2 py-1 transition-colors duration-150 hover:bg-sky-700/25">
            {children}
        </Link>
    )
}

export default HoverLink;