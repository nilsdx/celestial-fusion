import { cookies } from "next/headers";
import Image from "next/image";

interface WebsiteLogoProps {
    size: number
}

const WebsiteLogo: React.FC<WebsiteLogoProps> = async ({size}) => {
    const cookieStore = await cookies();
    const c = cookieStore.get("vapid");
    const isVapid = c && c.value == "1";

    if (isVapid) return (
        <Image
            src="/images/dtyy.png"
            width={size}
            height={size}
            alt="Alternative Celestial Fusion logo"
            unoptimized
        />
    )

    return (
        <Image
            src="/images/cf_logo.png"
            width={size}
            height={size}
            alt="Celestial Fusion logo"
            unoptimized
        />
    )
}

export default WebsiteLogo;