"use server"

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "../utils/r2";

interface UploadResponse {
    success: boolean;
    url?: string;
    error?: string;
}

export async function uploadImageAction(
    formData: FormData, 
    folder: "page-pictures" | "aside-pictures"
): Promise<UploadResponse> {
    try {
        const file = formData.get("file") as File;
        if (!file) return { success: false, error: "Aucun fichier trouvé" };

        const fileExtension = file.name.split(".").pop();
        const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileKey = `${folder}/${uniqueFileName}`;

        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileKey,
            Body: buffer,
            ContentType: file.type,
        });

        await r2Client.send(command);

        // Construction de l'URL publique finale
        const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileKey}`;

        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error("R2 Upload Error:", error);
        return { success: false, error: error.message || "Échec de l'upload" };
    }
}