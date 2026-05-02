import { CategoryCard } from "./CategoryCard";

const CATEGORIES = [
    {
        title: "OVERVIEW",
        items: [
            {
                title: "Classes",
                image: "/images/items/igr.jpg",
                link: "/categories/classes"
            },
            {
                title: "Updates",
                image: "/images/items/igr.jpg",
                link: "/categories/updates"
            }
        ]
    },
    {
        title: "Items",
        items: [
            {
                title: "Weapons",
                image: "/images/items/dfalz-buster.jpg",
                link: "/categories/weapons"
            },
            {
                title: "Frames",
                image: "/images/items/igr.jpg",
                link: "/categories/frames"
            },
            {
                title: "Barriers",
                image: "/images/items/igr.jpg",
                link: "/categories/barriers"
            },
            {
                title: "Units",
                image: "/images/items/igr.jpg",
                link: "/categories/units"
            },
            {
                title: "Mags",
                image: "/images/items/igr.jpg",
                link: "/categories/mags"
            },
            {
                title: "Tools",
                image: "/images/items/igr.jpg",
                link: "/categories/tools"
            }
        ]
    },
    {
        title: "Content",
        items: [
            {
                title: "Enemies",
                image: "/images/enemies/rathalos.jpg",
                link: "/categories/enemies"
            },
            {
                title: "Quests",
                image: "/images/enemies/rathalos.jpg",
                link: "/categories/quests"
            },
            {
                title: "Events",
                image: "/images/enemies/rathalos.jpg",
                link: "/categories/events"
            }
        ]
    }
]

const CategoriesSection = () => {
    return (
        <div className="flex flex-col gap-8 sm:m-4 flex-1">
            {CATEGORIES.map((ctg, i) => (
                <div
                    key={`${ctg.title}-${i}`}
                    className="flex justify-center gap-4 flex-wrap border-2 border-sky-600 p-6 pt-8 relative"
                >
                    <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4 font-bold text-xl uppercase tracking-wider z-10">
                        {ctg.title}
                    </p>

                    {ctg.items.map((itm, j) => (
                        <CategoryCard 
                            href={itm.link}
                            image={itm.image}
                            label={itm.title}
                            key={`${itm.title}-${j}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CategoriesSection;