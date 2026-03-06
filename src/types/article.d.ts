export interface ArticleFrontmatter {
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    icon?: string;
    image?: string;
    [key: string]: any;
}

export interface ArticleData {
    data: ArticleFrontmatter;
    content: string;
    hasFrontmatter: boolean;
}

export interface ArticleSearchResultInfos {
    title: string,
    description: string,
    category: string,
    slug: string
}

export interface ArticleSearchResult {
    article: ArticleSearchResultInfos
    score: number
}