import Link from "next/link"

const Sidebar = () => {
    return (
        <div className="m-4 p-4 flex flex-col w-48 bg-sky-950 text-slate-200 flex-none h-fit">
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