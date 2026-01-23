export type ArticleViews = {
    slug: string, // primary key
    name: string,
    category: string,
    views: number,
    updatedAt: Date
}