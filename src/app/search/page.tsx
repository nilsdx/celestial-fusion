import { searchArticles } from "@/src/actions/articles.action";
import Link from "next/link";
import { Suspense } from "react";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) {

    const { query } = await searchParams;

    if (!query) {
        return (
            <div className="m-6 w-full">
                <p>Please enter a keyword to start searching</p>
            </div>
        );
    }

    const searchParamsResult = await searchArticles(query);

    return (
        <Suspense fallback={<div className="m-6">Loading...</div>}>
            <div className="m-6 w-full">
                <h2 className="text-2xl">Search result for: {query}</h2>
                <hr/>
                <div>
                    {searchParamsResult.map((res, i) => (
                        <div
                            key={`result-${i}`}
                            className="bg-black/25 m-4 p-4"
                        >
                            <Link
                                href={`/${res.category}/${res.slug}`}
                                className="text-2xl"
                            >
                                {res.title}
                            </Link>
                            <p>{res.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Suspense>
    );
}