import Image from "next/image";
import Link from "next/link";

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

    const component = (
        <Image
            src={`/images/section-id/${id.substring(1).toLowerCase()}.svg`}
            alt={`${id} icon`}
            width={size}
            height={size} 
            className='select-none'
        />
    )
    
    if (id == SECTION_IDS[6]) return (
        <>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
                href="/api/vapid"
            >
                {component}
            </a>
        </>
    ); else return component;
}

export default SectionID;