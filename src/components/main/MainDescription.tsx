import { cookies } from "next/headers";

const MainDescription = async () => {
    const cookieStore = await cookies();
    const c = cookieStore.get("vapid");
    const isVapid = c && c.value == "1"


    if ( isVapid ) return (
        <>
            <h1 className="text-6xl">Thank you Vapid,</h1>
            <p>very cool.</p>
        </>
        
    ); else return (
        <>
            <h1 className="text-6xl">Welcome to Celestial Fusion!</h1>
            <p>This website contains informations about Destiny PSOBB's new features, from items to quests, as well as guides to help players in need, whether new or advanced.</p>
        </>
    );
}

export default MainDescription;