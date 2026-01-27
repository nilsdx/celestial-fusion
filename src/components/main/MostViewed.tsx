import { getAllArticleViews } from "@/src/actions/views.action"
import { ArticleViews } from "@/src/types/views";
import Link from "next/link";

const MAX_ARTICLES = 12

const MostViewed = async () => {
    const views: ArticleViews[] = await getAllArticleViews();

    return (
        <div>
            <h2>
                Most viewed
            </h2>
            <div className="grid grid-cols-4 gap-2 text-center">
                {views.slice(0,MAX_ARTICLES).map((a) => (
                    <Link
                        key={`${a.slug}-viewcount`}
                        href={`/${a.category}/${a.slug}`}
                        className="bg-red-500 p-2 text-slate-100"
                    >
                        {a.name}
                    </Link>
                ))}
            </div>
        </div>  
    )
}
export default MostViewed;