import Link from "next/link"

const Sidebar = () => {
    return (
        <div className="m-4 p-4 flex flex-col border w-48">
            <Link href="/">
                Main page
            </Link>
            <Link href="/api/random">
                Random page
            </Link>
        </div>
    )
}

export default Sidebar;