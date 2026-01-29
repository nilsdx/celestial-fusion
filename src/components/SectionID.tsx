import Image from "next/image";

interface ClassIconProps {
    id: string,
    size: number
}

export const SECTION_IDS = [
    "@Viridia", "@Greenill", "@Skyly", "@Bluefull", "@Purplenum", 
    "@Pinkal", "@Redria", "@Oran", "@Yellowboze", "@Whitill"
];

const SectionID: React.FC<ClassIconProps> = ({id, size}) => {

    if (!SECTION_IDS.includes(id)) return (
        <p>?</p>
    )
    
    return (
        <Image src={`/images/section-id/${id.substring(1).toLowerCase()}.svg`} alt={`${id} icon`} width={size} height={size} className='select-none'/>
    )
}

export default SectionID;