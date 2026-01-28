import { CategoryCard } from "./CategoryCard";

const CategoriesSection = () => {
    return (
        <div className="flex gap-2 flex-wrap m-2">
            <CategoryCard 
                href="/categories/classes"
                image="/images/items/igr.jpg"
                label="Classes"
            />
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
            <CategoryCard 
                href="/categories/guides"
                image="/images/items/igr.jpg"
                label="Items"
            />
        </div>
    )
}

export default CategoriesSection;