import Image from "next/image";
import Card from "../Card";
import LinkIcon from "../LinkIcon";
import AvailableClasses from "../AvailableClasses";

interface ItemCardProps {
    data: any;
    category: string;
    slug: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ data, category, slug }) => {
    const reservedFields = ['name', 'icon', 'image', 'classes', 'description', 'createdAt', 'updatedAt'];

    const dynamicFields = Object.entries(data).filter(
        ([key]) => !reservedFields.includes(key)
    );

    return (
        <Card>
            <div className="flex flex-col items-center p-2 h-fit w-72 text-sm">
                <p className="flex items-center font-bold text-lg mb-2">
                    <LinkIcon href={`/${category}/${slug}`} />
                    {data.name}
                </p>

                <div className="flex flex-col items-center p-2 space-y-2 w-full">
                    {data.image && (
                        <div className="relative w-full aspect-video">
                            <Image 
                                src={data.image} 
                                alt={data.title} 
                                fill 
                                className="object-contain"
                            />
                        </div>
                    )}
                    <p className="italic text-center text-white/80">
                        {data.description}
                    </p>
                </div>
                <div className="w-full space-y-1 border-t border-white/10 mt-2 pt-2">
                    {dynamicFields.map(([key, value]) => (
                        <div key={key} className="flex flex-col border-b border-white/5 pb-1">
                            <span className="text-white/50 uppercase text-[10px] font-bold">{key}</span>
                            {/* This dynamic stats implementation is very bad as
                            it uses type checking through isArray. A better variation
                            of this would be to force a type onto dynamicFields, but
                            this would force all articles to follow a very specific
                            structure, which can become troublesome for
                            certain categories such as quests. */}
                            {Array.isArray(value) && value !== null ? (
                                <div className="flex flex-wrap gap-2">
                                    {value.map((item, index) => (
                                        <div key={index} className="text-center bg-white/5 px-2 py-1 rounded">
                                            <p className="text-[10px] text-white/40">{item.label}</p>
                                            <p className="font-mono">{String(item.value)}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="font-medium">{String(value)}</p>
                            )}
                        </div>
                    ))}
                </div>

                {data.classes && (
                    <div className="mt-4 w-full">
                        <AvailableClasses classes={data.classes} />
                    </div>
                )}
            </div>
        </Card>
    );
}

export default ItemCard;