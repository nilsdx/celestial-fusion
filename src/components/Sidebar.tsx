import Card from "./Card";
import HoverLink from "./HoverLink";

const NAV_LINKS = [
    {
        title: "Navigation",
        links: [
            {
                label: "Main page",
                href: "/",
                blank: false
            },
            {
                label: "Random page",
                href: "/api/random",
                blank: false
            },
            {
                label: "Game updates",
                href: "/categories/updates",
                blank: false
            }
        ]
    },
    {
        title: "Categories",
        links: [
            {
                label: "Classes",
                href: "/categories/classes",
                blank: false
            },
            {
                label: "Weapons",
                href: "/categories/weapons",
                blank: false
            },
            {
                label: "Frames",
                href: "/categories/frames",
                blank: false
            },
            {
                label: "Barriers",
                href: "/categories/barriers",
                blank: false
            },
            {
                label: "Units",
                href: "/categories/units",
                blank: false
            },
            {
                label: "Mags",
                href: "/categories/mags",
                blank: false
            },
            {
                label: "Items",
                href: "/categories/items",
                blank: false
            },
            {
                label: "Quests",
                href: "/categories/quests",
                blank: false
            },
            {
                label: "Events",
                href: "/categories/events",
                blank: false
            },
            {
                label: "Guides",
                href: "/categories/guides",
                blank: false
            }
        ]
    },
    {
        title: "Help",
        links: [
            {
                label: "How to contribute",
                href: "/contributing",
                blank: false
            },
            {
                label: "View source",
                href: "https://github.com/nilsdx/celestial-fusion",
                blank: true
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
                            <HoverLink href={l.href} key={`${l.label}-link`} target={l.blank}>
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