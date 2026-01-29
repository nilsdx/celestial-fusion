import Card from "./Card";
import HoverLink from "./HoverLink";

const NAV_LINKS = [
    {
        title: "Navigation",
        links: [
            {
                label: "Main page",
                href: "/"
            },
            {
                label: "Random page",
                href: "/api/random"
            },
            {
                label: "How to contribute",
                href: "/contributing"
            }
        ]
    },
    {
        title: "Categories",
        links: [
            {
                label: "Classes",
                href: "/categories/classes"
            },
            {
                label: "Weapons",
                href: "/categories/weapons"
            },
            {
                label: "Frames",
                href: "/categories/frames"
            },
            {
                label: "Barriers",
                href: "/categories/barriers"
            },
            {
                label: "Units",
                href: "/categories/units"
            },
            {
                label: "Mags",
                href: "/categories/mags"
            },
            {
                label: "Items",
                href: "/categories/items"
            }
        ]
    }
]

const Sidebar = () => {
    return (
        <div>
            <div className="px-1 space-y-2 w-48">
                {NAV_LINKS.map((cat) => (
                    <Card title={cat.title} key={`${cat.title}-category`}>
                        {cat.links.map((l) => (
                            <HoverLink href={l.href} key={`${l.label}-link`}>
                                {l.label}
                            </HoverLink>
                        ))}
                    </Card>
                ))}
            </div>
        </div>
        
    )
}

export default Sidebar;