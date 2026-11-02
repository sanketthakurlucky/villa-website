import { createServiceClient } from '@/lib/supabase/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createServiceClient();
    const searchParams = request.nextUrl.searchParams;

    const status = searchParams.get('status');
    const destination = searchParams.get('destination');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const create = searchParams.get('create');

    if (create) {
        // Return empty template for create form
        return NextResponse.json({ villa: null });
    }

    let query = supabase
        .from('villas')
        .select(`
            *,
            destination:destinations(id, name, slug),
            villa_amenities(amenity:amenities(id, name))
        `, { count: 'exact' });

    if (status) query = query.eq('status', status);
    if (destination) query = query.eq('destination_id', destination);
    if (featured === 'true') query = query.eq('featured', true);
    if (search) {
        query = query.or(`name.ilike.%${search}%,code_name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    query = query.order(sort, { ascending: order === 'asc' }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formattedVillas = data?.map(villa => ({
        ...villa,
        destination: villa.destination,
        amenities: villa.villa_amenities?.map((va: any) => va.amenity).filter(Boolean) || [],
    })) || [];

    return NextResponse.json({
        villas: formattedVillas,
        total: count || 0,
        limit,
        offset,
    });
}

export async function POST(request: NextRequest) {
    const supabase = createServiceClient();

    try {
        const body = await request.json();
        const { amenities, gallery_images, ...villaData } = body;

        // Generate slug if not provided
        if (!villaData.slug && villaData.name) {
            villaData.slug = villaData.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        // Set defaults
        const insertData = {
            ...villaData,
            status: villaData.status || 'DRAFT',
            gallery_images: gallery_images || [],
            tags: villaData.tags || [],
        };

        const { data, error } = await supabase
            .from('villas')
            .insert([insertData])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // Handle amenities
        if (amenities && amenities.length > 0 && data) {
            const amenityInserts = amenities.map((amenityId: string) => ({
                villa_id: data.id,
                amenity_id: amenityId,
            }));
            await supabase.from('villa_amenities').insert(amenityInserts);
        }

        return NextResponse.json({ villa: data });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    const supabase = createServiceClient();

    try {
        const body = await request.json();
        const { id, amenities, gallery_images, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'Villa ID required' }, { status: 400 });
        }

        const updatePayload = {
            ...updateData,
            gallery_images: gallery_images || undefined,
            tags: updateData.tags || undefined,
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('villas')
            .update(updatePayload)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // Handle amenities
        if (amenities && data) {
            // Delete existing
            await supabase.from('villa_amenities').delete().eq('villa_id', id);
            // Insert new
            const amenityInserts = amenities.map((amenityId: string) => ({
                villa_id: id,
                amenity_id: amenityId,
            }));
            await supabase.from('villa_amenities').insert(amenityInserts);
        }

        return NextResponse.json({ villa: data });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    const supabase = createServiceClient();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Villa ID required' }, { status: 400 });
    }

    const { error } = await supabase.from('villas').delete().eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
}