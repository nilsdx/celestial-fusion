import HoverLink from "./HoverLink";
import WebsiteLogo from "./WebsiteLogo";

const NAV_LINKS = [
    {
        title: "Navigation",
        links: [
            {label: "Main page", href: "/", blank: false},
            {label: "Random page", href: "/api/random", blank: false},
        ]
    },
    {
        title: "Categories",
        links: [
            {label: "Classes", href: "/categories/classes", blank: false},
            {label: "Weapons", href: "/categories/weapons", blank: false},
            {label: "Frames", href: "/categories/frames", blank: false},
            {label: "Barriers", href: "/categories/barriers", blank: false},
            {label: "Units", href: "/categories/units", blank: false},
            {label: "Mags", href: "/categories/mags", blank: false},
            {label: "Items", href: "/categories/items", blank: false},
            {label: "Quests", href: "/categories/quests", blank: false},
            {label: "Events", href: "/categories/events", blank: false},
            {label: "Guides", href: "/categories/guides", blank: false},{label: "Game updates", href: "/categories/updates", blank: false}
        ]
    },
    {
        title: "Help",
        links: [
            {label: "How to contribute", href: "/contributing", blank: false},
            {label: "View source", href: "https://github.com/nilsdx/celestial-fusion", blank: true}
        ]
    }
]

const Sidebar = () => {
    return (
        <div className="px-4 py-4 space-y-2 w-60 bg-gray-900">
            {NAV_LINKS.map((cat, i) => (
                <div key={`${cat.title}-category`}>
                    <p className="text-xl">{cat.title}</p>
                    {cat.links.map((l) => (
                        <HoverLink href={l.href} key={`${l.label}-link`} target={l.blank}>
                            {l.label}
                        </HoverLink>
                    ))}
                    {i+1 < NAV_LINKS.length && (<hr className="text-white/20 border"/>)}
                </div>
            ))}
        </div>
        
    )
}

export default Sidebar;