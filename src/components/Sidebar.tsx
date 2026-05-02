"use client"
import { useState } from "react";
import HoverLink from "./HoverLink";
import { Menu, X } from "lucide-react";

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
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 lg:z-20 p-2 bg-gray-800 rounded-full"
            >
                {isOpen ? (<X/>) : (<Menu/>)}
            </button>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
            <div className={`
                fixed inset-y-0 left-0 z-50 lg:z-30 w-60 bg-gray-900 border-r border-white/10 p-4 space-y-2
                transform transition-transform
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:relative lg:translate-x-0 lg:flex lg:flex-col shrink-0 overflow-y-auto
            `}>
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
        </>
    )
}

export default Sidebar;