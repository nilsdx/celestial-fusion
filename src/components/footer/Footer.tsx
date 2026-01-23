import Link from "next/link";
import FooterCard from "./FooterCard";

const Footer = () => {
    return (
        <footer className="bg-yellow-900 text-white p-8 w-full space-y-4">
            <div className="flex justify-center space-x-4">
                <FooterCard 
                    link="https://github.com/nilsdx/linis-archives"
                    label="Source code"
                    icon="/images/github.svg"
                    size={48}
                />
                <FooterCard 
                    link="https://www.playpso.net/"
                    label="Play Destiny PSOBB"
                    icon="/images/destiny_hd.png"
                    size={96}
                />
            </div>
            <div className="">
                <p className="text-center text-white/55">
                    © 2026 Nils Durieux. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 text-amber-200">
                    <Link
                        href="/privacy"
                    >
                        Privacy policy
                    </Link>
                    <Link
                        href="/legal"
                    >
                        Legal notice
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;