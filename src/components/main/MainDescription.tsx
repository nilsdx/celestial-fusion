
import WebsiteLogo from "../WebsiteLogo";

const MainDescription = async () => {
    


    return (
        <div className="flex items-center">
            <div className="flex-1 flex flex-col items-center">
                <p className="text-2xl">Welcome to</p>
                <WebsiteLogo size={500}/>
            </div>
            <p className="flex-1 text-lg">This website contains lots of knowledge about Destiny PSOBB&apos;s new features, from items to quests, as well as guides to help players in need. Whether you&apos;re a new or advanced player, a returnee or just someone curious about what this server can offer, you&apos;ll be sure to find useful knowledge regardless.</p>
        </div>
    )
}

export default MainDescription;