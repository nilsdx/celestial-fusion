interface CardProps {
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({children}) => {
    return (
        <div className="flex flex-col border-sky-400 bg-gray-900 border-3 rounded-lg h-fit">
            {children}
        </div>
    )
}

export default Card;