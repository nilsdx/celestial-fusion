interface AvailableClassesProps {
    classes: string;
}

export const allClasses = [
    ['HUmr', 'HUnl', 'HUct', 'HUcl'], 
    ['RAmr', 'RAml', 'RAct', 'RAcl'], 
    ['FOmr', 'FOml', 'FOnm', 'FOnl']
];

const AvailableClasses: React.FC<AvailableClassesProps> = ({classes}) => {
    const availability = classes.split("").map((a) => a == "1");
    
    return (
        <div className="flex flex-col gap-1 w-full">
            {allClasses.map((cat, i) => (
                <div 
                    className="grid grid-cols-4 gap-1"
                    key={`category-${i}`}
                >
                    {cat.map((cls, j) => (
                        <p 
                            className={`p-1 text-center text-xs ${
                                availability[(i * cat.length) + j] 
                                ? "bg-green-400 text-black font-bold" 
                                : "bg-red-500 text-white font-bold"
                            }`}
                            key={`class-${i}-${j}`}
                        >
                            {cls}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default AvailableClasses;