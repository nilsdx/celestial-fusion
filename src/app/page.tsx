import Link from "next/link";
import { Link as LuLink } from "lucide-react";
import Card from "../components/Card";
import MainSection from "../components/main/MainSection";
import { FaDiscord } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex gap-2 m-2">
      <Card>
        <MainSection/>
      </Card>
      <Card>
        <div className="w-80 flex flex-col items-center">
          
          <FaDiscord size={128}/>
          <Link
            href="https://discord.gg/mRHMqKrNp8"
            target="_blank"
            className="flex items-center gap-1 underline"
          >
            <LuLink size={16}/>
            Join the Destiny PSOBB Discord !
          </Link>
        </div>
      </Card>
    </div>
  );
}
