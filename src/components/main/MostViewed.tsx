import { getAllArticleViews } from "@/src/actions/views.action"
import { ArticleViews } from "@/src/types/views";
import Link from "next/link";

const MAX_ARTICLES = 12

const MostViewed = async () => {
    const views: ArticleViews[] = await getAllArticleViews();

    console.log(views)

    return (
        <div>
            <h2>
                Most viewed
            </h2>
            <div className="grid grid-cols-4 gap-2 text-center">
                {views.slice(0,MAX_ARTICLES-1).map((a) => (
                    <Link
                        key={`${a.slug}-viewcount`}
                        href={`/${a.category}/${a.slug}`}
                        className="bg-amber-200 p-2"
                    >
                        {a.name}
                    </Link>
                ))}
            </div>
        </div>  
    )
}
export default MostViewed;