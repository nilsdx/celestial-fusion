import { cookies } from "next/headers";
import WebsiteLogo from "../WebsiteLogo";

const MainDescription = async () => {
    const cookieStore = await cookies();
    const c = cookieStore.get("vapid");
    const isVapid = c && c.value == "1"


    return (
        <>
            <p>Welcome to</p>
            <WebsiteLogo size={500}/>
            {isVapid ? (
                <p>Thank you Vapid, very cool.</p>
            ) : (
                <p className="mx-32">This website contains informations about Destiny PSOBB's new features, from items to quests, as well as guides to help players in need, whether new or advanced.</p>
            )}
        </>
    )
}

export default MainDescription;