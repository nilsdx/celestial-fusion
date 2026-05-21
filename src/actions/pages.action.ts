"use server"

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "../utils/supabase";

interface ArticlePayload {
    slug: string;
    title: string;
    content?: string;
    category_id: string;
    created_at: string;
    last_modified: string;
    viewcount: string;
}

export async function createArticleAction(payload: ArticlePayload) {
    const supabase = getSupabaseServer();

    const { data, error } = await supabase
        .from("page")
        .insert([payload])
        .select()
        .single();

    if (error) {
        console.error("Supabase Insert Error:", error);
        throw new Error(`Cannot create page: ${error.message}`);
    }

    revalidatePath(`/categories/[category]`, "page");
    return data;
}

export async function getArticleBySlugAction(slug: string) {
    const supabase = getSupabaseServer();

    const { data, error } = await supabase
        .from("page")
        .select(`
            *,
            categories (
                name,
                slug
            )
        `)
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Supabase Fetch Error:", error);
        return null;
    }

    return data;
}