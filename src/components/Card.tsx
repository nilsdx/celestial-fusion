interface CardProps {
    title?: string,
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({title, children}) => {
    return (
        <div className="flex flex-col border-sky-500 bg-gray-900 border-3 rounded-lg h-fit">
            {title && (
                <div className="bg-sky-500 text-center text-xl">
                    {title}
                </div>
            )}
            {children}
        </div>
    )
}

export default Card;