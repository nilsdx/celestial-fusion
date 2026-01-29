interface CardProps {
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({children}) => {
    return (
        <div className="flex flex-col border-white border rounded-lg h-fit">
            {children}
        </div>
    )
}

export default Card;