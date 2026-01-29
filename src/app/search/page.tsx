import { searchArticles } from "@/src/actions/articles.action";
import Card from "@/src/components/Card";
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
        <Suspense fallback={<div className="m-6 w-full">Loading...</div>}>
            <div className="m-6 space-y-4">
                <h2 className="text-4xl">Search result for: {query}</h2>
                <hr className="border-sky-500 border-2 rounded-full"/>
                <div className="space-y-4">
                    {searchParamsResult.map((res, i) => (
                        <Card key={`result-${i}`}>
                            <div className="p-2">
                                <Link
                                    href={`/${res.category}/${res.slug}`}
                                    className="text-2xl"
                                >
                                    {res.title}
                                </Link>
                                <p>{res.description}</p>
                            </div> 
                        </Card>
                    ))}
                </div>
            </div>
        </Suspense>
    );
}