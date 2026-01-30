import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-slate-200 p-8 w-full space-y-4">
            <div className="">
                <p className="text-center text-white/55">
                    © 2026 Nils Durieux. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 text-slate-200">
                    <Link
                        href="/privacy"
                    >
                        Privacy policy
                    </Link>
                    <Link
                        href="/about"
                    >
                        About Celestial Fusion
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;