import Link from "next/link";
import { Gamepad2, Link as LuLink, UsersRound } from "lucide-react";
import Card from "../components/Card";
import MainSection from "../components/main/MainSection";
import { FaDiscord } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex gap-2 m-2">
      <Card>
        <MainSection/>
      </Card>
      <div className="space-y-2">
        <Card title={"Latest changes"}>
          <p>Test</p>
        </Card>
        <Card title={"Join the Community"}>
          <div className="w-80 flex flex-col items-center">
            <Link
              href="https://discord.gg/mRHMqKrNp8"
              target="_blank"
              className="flex items-center gap-1 underline"
            >
              <FaDiscord size={20}/>
              Destiny PSOBB Discord
            </Link>
            <Link
              href="https://playpso.net/forums/"
              target="_blank"
              className="flex items-center gap-1 underline"
            >
              <UsersRound size={20}/>
              Forums
            </Link>
          </div>
        </Card>
        <Card title={"Official website"}>
          <div className="w-80 flex flex-col items-center">
            <Image src="/images/destiny_hd.png" width={180} height={180} alt="Destiny PSOBB Icon"/>
            <Link 
              href="https://www.playpso.net/"
              className="flex items-center gap-1 underline"
              target="_blank"
            >
              <Gamepad2 size={20}/>
              Play Destiny PSOBB
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
