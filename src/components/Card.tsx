

interface CardProps {
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({children}) => {
    return (
        <div className="flex flex-col items-center gap-4 border rounded-lg h-fit">
            {children}
        </div>
    )
}

export default Card;