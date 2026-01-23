import Link from "next/link"

const Sidebar = () => {
    return (
        <div className="m-2 p-4 flex flex-col border w-48">
            <Link href="/">
                Main page
            </Link>
            <Link href="/mag-guide">
                Mag Guide
            </Link>
        </div>
    )
}

export default Sidebar;