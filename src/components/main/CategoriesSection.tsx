import { CategoryCard } from "./CategoryCard";

const CategoriesSection = () => {
    return (
        <div className="flex flex-col gap-2 flex-wrap m-2">
            
            <CategoryCard 
                href="/categories/classes"
                image="/images/items/igr.jpg"
                label="Classes"
            />
            <div className="flex gap-2 flex-wrap">
                <CategoryCard 
                    href="/categories/weapons"
                    image="/images/items/igr.jpg"
                    label="Weapons"
                />
                <CategoryCard 
                    href="/categories/frames"
                    image="/images/items/igr.jpg"
                    label="Frames"
                />
                <CategoryCard 
                    href="/categories/barriers"
                    image="/images/items/igr.jpg"
                    label="Barriers"
                />
                <CategoryCard 
                    href="/categories/units"
                    image="/images/items/igr.jpg"
                    label="Units"
                />
                <CategoryCard 
                    href="/categories/mags"
                    image="/images/items/igr.jpg"
                    label="Mags"
                />
                <CategoryCard 
                    href="/categories/mags"
                    image="/images/items/igr.jpg"
                    label="Items"
                />
            </div>
            <div className="flex gap-2 flex-wrap">
                <CategoryCard 
                    href="/categories/enemies"
                    image="/images/items/igr.jpg"
                    label="Enemies"
                />
                <CategoryCard 
                    href="/categories/quests"
                    image="/images/items/igr.jpg"
                    label="Quests"
                />
            </div>
            
            <div className="flex gap-2 flex-wrap">
                <CategoryCard 
                    href="/categories/updates"
                    image="/images/items/igr.jpg"
                    label="Updates"
                />
                <CategoryCard 
                    href="/categories/events"
                    image="/images/items/igr.jpg"
                    label="Events"
                />
                <CategoryCard 
                    href="/categories/guides"
                    image="/images/items/igr.jpg"
                    label="Guides"
                />
            </div>
        </div>
    )
}

export default CategoriesSection;