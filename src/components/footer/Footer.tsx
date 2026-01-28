import Link from "next/link";
import FooterCard from "./FooterCard";

const Footer = () => {
    return (
        <footer className="bg-sky-950 text-slate-200 p-8 w-full space-y-4">
            <div className="flex justify-center space-x-4">
                <FooterCard 
                    link="https://github.com/nilsdx/celestial-fusion"
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