import { refresh } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

export async function GET() {
    const cookieStore = await cookies();

    const c = cookieStore.get("vapid");
    if (c && c.value == "1" ) {
        cookieStore.set("vapid", "0");
    } else {
        cookieStore.set("vapid", "1");
    }
    
    redirect("/");
}