import { CategoryCard } from "./CategoryCard";

const CategoriesSection = () => {
    return (
        <div className="flex space-x-2">
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
        </div>
    )
}

export default CategoriesSection;