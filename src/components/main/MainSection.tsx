import Card from "../Card";
import CategoriesSection from "./CategoriesSection"
import MainDescription from "./MainDescription";

import HoverLink from "../HoverLink";

const YOUTUBE_EMBED_TITLE = "What's coming to Destiny PSOBB ?"
const YOUTUBE_EMBED = "https://www.youtube.com/embed/h2Hjuc0qE_o";

const MainSection = () => {
    return (
    <div className="space-y-4 flex flex-col items-center p-8">
        <MainDescription/>
        <div className="flex w-full">
            <CategoriesSection/>
            <div className="flex-1 space-y-2">
                <Card title="Don't know where to start ?">
                    <HoverLink
                        href="/guides/overview"
                        target={false}
                    >
                        All new Destiny PSOBB features
                    </HoverLink>
                    <HoverLink
                        href="/guides/beginner"
                        target={false}
                    >
                        Beginner's Guide
                    </HoverLink>
                </Card>
                <Card title="About Destiny PSOBB">
                    <p className="p-2">
                        Destiny PSOBB is a private server for the game Phantasy Star Online Blue Burst. 
                        Its goal is to completely overhaul the progression of the game and add a challenging 
                        endgame through new quests, new bosses, and new items.
                    </p>
                    <div className="aspect-video w-full overflow-hidden rounded-md p-2">
                        <iframe
                            className="w-full h-full"
                            src={YOUTUBE_EMBED}
                            title={YOUTUBE_EMBED_TITLE}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </Card>
            </div>
            
        </div>
        
    </div>
    )
}

export default MainSection;