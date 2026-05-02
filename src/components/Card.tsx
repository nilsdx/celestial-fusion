interface CardProps {
    title?: string,
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({title, children}) => {
    return (
        <div className="flex flex-col border-sky-600 bg-gray-900 border-2 h-fit">
            {title && (
                <>
                    <div className="text-center text-xl font-bold">
                        {title}
                    </div>
                </>
            )}
            {children}
        </div>
    )
}

export default Card;