import { getLatestArticles } from "@/src/actions/articles.action";
import HoverLink from "../HoverLink";
import { formatDate } from "@/src/utils/time.utils";

const LatestChanges = async () => {
    const latestArticles = await getLatestArticles();
    
    return (
        <div className="flex flex-col">
            {latestArticles.map((la) => (
                <HoverLink
                    key={`${la.slug}-latest-changed`}
                    href={`/${la.category}/${la.slug}`}
                    target={false}
                >
                    <div className="flex justify-between w-full items-center">
                        <p>{la.title}</p>
                        <p className="text-white/80 text-xs">{formatDate(la.updatedAt)}</p>
                    </div>
                </HoverLink>
            ))}
        </div>
    )
}

export default LatestChanges;