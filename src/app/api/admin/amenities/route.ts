import { createServiceClient } from '@/lib/supabase/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createServiceClient();
    const searchParams = request.nextUrl.searchParams;

    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category');

    let query = supabase.from('amenities').select('*', { count: 'exact' });

    if (category) query = query.eq('category', category);

    query = query.order('category').order('name').range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ amenities: data || [], total: count || 0 });
}

export async function POST(request: NextRequest) {
    const supabase = createServiceClient();

    try {
        const body = await request.json();
        const { data, error } = await supabase.from('amenities').insert([body]).select().single();

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ amenity: data });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    const supabase = createServiceClient();

    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const { data, error } = await supabase
            .from('amenities')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });

        return NextResponse.json({ amenity: data });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    const supabase = createServiceClient();
    const id = request.nextUrl.searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { error } = await supabase.from('amenities').delete().eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
}