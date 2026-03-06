interface StatDisplayProps {
    label: string,
    value: string
}

const StatDisplay: React.FC<StatDisplayProps> = ({label, value}) => {
    return (
        <div className="text-center bg-white/5 px-2 py-1 rounded">
            <p className="text-[10px] text-white/40">{label}</p>
            <p className="font-mono">{value}</p>
        </div>
    )
}

export default StatDisplay;