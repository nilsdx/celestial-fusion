import Link from "next/link";

interface HoverLinkProps {
    href: string,
    children: React.ReactNode,
    target: boolean
}

const HoverLink: React.FC<HoverLinkProps> = ({href, children, target}) => {
    return (
        <Link
            href={href}
            className="px-2 py-1 transition-colors duration-150 hover:bg-sky-700/25"
            target={target ? "_blank" : "_self"}
        >
            {children}
        </Link>
    )
}

export default HoverLink;