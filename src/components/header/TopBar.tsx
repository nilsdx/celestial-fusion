import { cookies } from "next/headers";

const TopBar = async () => {
    const cookieStore = await cookies();
    const c = cookieStore.get("vapid");
    const isVapid = c && c.value == "1";

    return (
        <div className="flex justify-center items-center py-12">
            {isVapid ? (
                <p className="text-5xl text-white">Destiny thingy yup yup</p>
            ) : (
                <p className="text-5xl text-white">Celestial Fusion</p>
            )}
            
        </div>
    )
}

export default TopBar;