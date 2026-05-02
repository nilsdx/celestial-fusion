import SearchBar from "./SearchBar";
import WebsiteLogo from "../WebsiteLogo";
import Link from "next/link";

const LOGO_SIZE = 200;

const TopBar = () => {

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-900 px-4 py-1 sticky w-screen z-50 top-0 border-b-4 border-pink-300">
            <Link href="/">
                <WebsiteLogo size={LOGO_SIZE}/>
            </Link>
            <SearchBar/>
        </div>
    )
}

export default TopBar;