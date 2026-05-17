import React from "react";

interface ItemCardStarsProps {
    value: any
}

const ItemCardStars: React.FC<ItemCardStarsProps> = ({value}) => {
    const rating = Math.min(Math.max(parseInt(value, 10) || 0, 0), 5);
    
    return (
        <div className="flex gap-0.5 text-base mt-0.5" aria-label={`Difficulté : ${rating} sur 5`}>
            {Array.from({ length: 10 }).map((_, i) => (
                <span 
                    key={i} 
                    className={i < rating ? "text-white" : "text-gray-700"}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default ItemCardStars;