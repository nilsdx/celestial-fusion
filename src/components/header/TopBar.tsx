import { cookies } from "next/headers";
import Image from "next/image";

const TopBar = async () => {
    const cookieStore = await cookies();
    const c = cookieStore.get("vapid");
    const isVapid = c && c.value == "1";

    return (
        <div className="flex justify-center items-center py-12">
            {isVapid ? (
                <Image
                    src="/images/dtyy.png"
                    width={600}
                    height={600}
                    alt="Celestial Fusion logo"
                    unoptimized
                />
            ) : (
                <Image
                    src="/images/cf_logo.png"
                    width={600}
                    height={600}
                    alt="Celestial Fusion logo"
                    unoptimized
                />
            )}
            
        </div>
    )
}

export default TopBar;