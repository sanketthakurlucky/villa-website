import { createServiceClient } from '@/lib/supabase/service';
import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2, generateR2Key, getSignedUploadUrl } from '@/lib/r2';

export async function POST(request: NextRequest) {
    const supabase = createServiceClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!adminUser || !['ADMIN', 'EDITOR'].includes(adminUser.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'uploads';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4', 'video/webm', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
        }

        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: 'File too large (max 50MB)' }, { status: 400 });
        }

        const key = generateR2Key(folder, file.name);
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const url = await uploadToR2(key, buffer, file.type);

        return NextResponse.json({
            url,
            key,
            name: file.name,
            size: file.size,
            type: file.type,
        });
    } catch (err) {
        console.error('R2 upload error:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const supabase = createServiceClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');
    const contentType = searchParams.get('contentType');
    const folder = searchParams.get('folder') || 'uploads';

    if (!key || !contentType) {
        return NextResponse.json({ error: 'Missing key or contentType' }, { status: 400 });
    }

    const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!adminUser || !['ADMIN', 'EDITOR'].includes(adminUser.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const signedUrl = await getSignedUploadUrl(key, contentType);
        return NextResponse.json({ signedUrl });
    } catch (err) {
        console.error('Signed URL error:', err);
        return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
    }
}