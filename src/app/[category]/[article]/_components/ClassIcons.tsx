import Image from "next/image";

interface SectionIDProps {
    character: string,
}

const ClassIcon: React.FC<SectionIDProps> = ({character}) => {
    const classes = ['HUmar', 'HUnewearl', 'HUcast', 'HUcaseal', 'RAmar', 'RAmarl', 'RAcast', 'RAcaseal', 'FOmar', 'FOmarl', 'FOnewm', 'FOnewearl'];

    if (!classes.includes(character)) return (
        <p>?</p>
    )

    return (
        <Image src={`/class/icon/${character.toLowerCase()}.png`} alt={`${character} icon`} width={80} height={20} className="object-contain"/>
    )
}

export default ClassIcon;