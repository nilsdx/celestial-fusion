import Card from "../Card";
import CategoriesSection from "./CategoriesSection"

const YOUTUBE_EMBED = "https://www.youtube.com/embed/h2Hjuc0qE_o";

const MainSection = () => {
    return (
    <div className="space-y-2 flex flex-col items-center p-8">
        <h1 className="text-6xl">Welcome to Celestial Fusion!</h1>
        <p>This website contains informations about Destiny PSOBB's new features, from items to quests, as well as guides to help players in need, whether new or advanced.</p>
        <div className="flex w-full">
            <CategoriesSection/>
            <div className="flex-1 space-y-2">
                <Card title="Don't know where to start ?">
                    <p className="p-2">Check out this page !</p>
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
                            title="What&#39;s coming to Destiny PSOBB?"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            ></iframe>
                    </div>
                </Card>
            </div>
            
        </div>
        
    </div>
    )
}

export default MainSection;