import { cookies } from "next/headers";
import Image from "next/image";
import SearchBar from "./SearchBar";

const LOGO_SIZE = 200;

const TopBar = async () => {
    const cookieStore = await cookies();
    const c = cookieStore.get("vapid");
    const isVapid = c && c.value == "1";

    return (
        <div className="flex justify-between items-center bg-black p-1 fixed w-screen z-50 top-0">
            {isVapid ? (
                <Image
                    src="/images/dtyy.png"
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                    alt="Celestial Fusion logo"
                    unoptimized
                />
            ) : (
                <Image
                    src="/images/cf_logo.png"
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                    alt="Alternative Celestial Fusion logo"
                    unoptimized
                />
            )}
            <SearchBar/>
        </div>
    )
}

export default TopBar;