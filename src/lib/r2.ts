import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.R2_PUBLIC_URL!;

export async function uploadToR2(
    key: string,
    body: Buffer | ReadableStream | Blob,
    contentType: string,
    options?: { cacheControl?: string; metadata?: Record<string, string> }
) {
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: body as any,
        ContentType: contentType,
        CacheControl: options?.cacheControl || 'public, max-age=31536000, immutable',
        Metadata: options?.metadata,
    });

    await r2Client.send(command);
    return `${PUBLIC_URL}/${key}`;
}

export async function deleteFromR2(key: string) {
    const command = new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
    });
    await r2Client.send(command);
}

export async function listR2Objects(prefix: string) {
    const command = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: prefix,
    });
    const response = await r2Client.send(command);
    return response.Contents || [];
}

export async function getSignedUploadUrl(key: string, contentType: string, expiresIn = 3600) {
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        ContentType: contentType,
    });
    return getSignedUrl(r2Client, command, { expiresIn });
}

export function getPublicUrl(key: string): string {
    return `${PUBLIC_URL}/${key}`;
}

export function generateR2Key(folder: string, fileName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = fileName.split('.').pop();
    return `${folder}/${timestamp}-${random}.${ext}`;
}