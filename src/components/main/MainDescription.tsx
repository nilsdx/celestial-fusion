import { cookies } from "next/headers";
import WebsiteLogo from "../WebsiteLogo";

const MainDescription = async () => {
    const cookieStore = await cookies();
    const c = cookieStore.get("vapid");
    const isVapid = c && c.value == "1"


    return (
        <>
            <p className="text-2xl">Welcome to</p>
            <WebsiteLogo size={500}/>
            {isVapid ? (
                <p className="text-3xl">Thank you Vapid, very cool.</p>
            ) : (
                <p className="mx-32 text-xl">This website contains lots of knowledge about Destiny PSOBB's new features, from items to quests, as well as guides to help players in need. Whether you're a new or advanced player, a returnee or just someone curious about what this server can offer, you'll be sure to find useful knowledge regardless.</p>
            )}
        </>
    )
}

export default MainDescription;