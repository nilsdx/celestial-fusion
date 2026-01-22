import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
        return NextResponse.json({ error: "name is a required parameter" }, { status: 400 });
    }

    try {
        const filePath = path.join(process.cwd(), `datas/items/${name}.json`);
        console.log(filePath)

        const fileContent = await fs.readFile(filePath, 'utf8');
        
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ error: "File either not found or invalid" }, { status: 404 });
    }
}