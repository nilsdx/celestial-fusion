import FooterCard from "./FooterCard";

const Footer = () => {
    return (
        <footer className="bg-yellow-900 text-white p-8 mt-32">
            <div className="w-full flex justify-center space-x-4">
                <FooterCard 
                    link="https://github.com/nilsdx/linis-archives"
                    label="Source code"
                    icon="/images/github.svg"
                    size={48}
                />
                <FooterCard 
                    link="https://www.playpso.net/"
                    label="Play Destiny PSOBB"
                    icon="/images/destiny_bw.png"
                    size={96}
                />
            </div>
            <p>
                Copyright notice goes here.
            </p>
        </footer>
    )
}

export default Footer;