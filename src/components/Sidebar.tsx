import Link from "next/link"

const Sidebar = () => {
    return (
        <div className="p-4 flex flex-col w-48 border-3 border-sky-400 bg-gray-900 mx-1 flex-none h-fit rounded-lg">
            <Link href="/">
                Main page
            </Link>
            <Link href="/api/random">
                Random page
            </Link>
            <Link href="/contribute">
                How to contribute
            </Link>
        </div>
    )
}

export default Sidebar;