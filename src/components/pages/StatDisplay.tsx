interface StatDisplayProps {
    label: string,
    value: string
}

const StatDisplay: React.FC<StatDisplayProps> = ({label, value}) => {
    return (
        <div className="text-center bg-white/5 px-2 py-1">
            <p className="text-white/50 uppercase">{label}</p>
            <p>{value}</p>
        </div>
    )
}

export default StatDisplay;