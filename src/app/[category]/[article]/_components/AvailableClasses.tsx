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

    console.log(availability);
    
    return (
        <div>
            {allClasses.map((cat, i) => (
                <div className="flex" key={`category-${i}`}>
                    {cat.map((cls, j) => (
                        <p 
                            className={`p-1 ${availability[ ( i*cat.length )+j ] ? "bg-green-400" : "bg-red-400"}`}
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