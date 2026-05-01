import { cookies } from "next/headers";
import Image from "next/image";
import SearchBar from "./SearchBar";
import WebsiteLogo from "../WebsiteLogo";

const LOGO_SIZE = 200;

const TopBar = async () => {
    const cookieStore = await cookies();
    const c = cookieStore.get("vapid");
    const isVapid = c && c.value == "1";

    return (
        <div className="flex justify-between items-center bg-gray-900 px-4 py-1 sticky w-screen z-50 top-0">
            <WebsiteLogo size={LOGO_SIZE}/>
            <SearchBar/>
        </div>
    )
}

export default TopBar;