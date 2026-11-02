import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();
    const searchParams = request.nextUrl.searchParams;
    
    const destination = searchParams.get('location');
    const checkIn = searchParams.get('checkin');
    const checkOut = searchParams.get('checkout');
    const guests = searchParams.get('guests');
    const minBedrooms = searchParams.get('bhk');
    const maxPrice = searchParams.get('price_max');
    const minPrice = searchParams.get('price_min');
    const amenities = searchParams.get('amenities')?.split(',').filter(Boolean);
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort') || 'featured';

    let query = supabase
        .from('villas')
        .select(`
            *,
            destination:destinations(id, name, slug),
            villa_amenities(amenity:amenities(name))
        `)
        .eq('status', 'PUBLISHED');

    if (destination) {
        query = query.eq('destination.slug', destination);
    }
    if (guests) {
        query = query.gte('max_guests', parseInt(guests));
    }
    if (minBedrooms) {
        query = query.gte('bedrooms', parseInt(minBedrooms));
    }
    if (maxPrice) {
        query = query.lte('base_price', parseInt(maxPrice));
    }
    if (minPrice) {
        query = query.gte('base_price', parseInt(minPrice));
    }
    if (featured === 'true') {
        query = query.eq('featured', true);
    }
    if (tags && tags.length > 0) {
        query = query.overlaps('tags', tags);
    }

    // Sorting
    switch (sort) {
        case 'price_asc':
            query = query.order('base_price', { ascending: true });
            break;
        case 'price_desc':
            query = query.order('base_price', { ascending: false });
            break;
        case 'rating':
            query = query.order('created_at', { ascending: false }); // placeholder
            break;
        case 'featured':
        default:
            query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
            break;
    }

    query = query.range(offset, offset + limit - 1);

    const { data: villas, error, count } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Filter by amenities if provided
    let filteredVillas = villas || [];
    if (amenities && amenities.length > 0) {
        filteredVillas = filteredVillas.filter(villa => 
            villa.villa_amenities?.some((va: any) => amenities.includes(va.amenity?.name))
        );
    }

    // Format response
    const formattedVillas = filteredVillas.map(villa => ({
        id: villa.id,
        slug: villa.slug,
        name: villa.name,
        codeName: villa.code_name,
        description: villa.description,
        destination: villa.destination,
        bedrooms: villa.bedrooms,
        bathrooms: villa.bathrooms,
        maxGuests: villa.max_guests,
        price: villa.base_price,
        b2bPrice: villa.b2b_price,
        coverImage: villa.cover_image,
        galleryImages: villa.gallery_images,
        videoUrl: villa.video_url,
        mapsUrl: villa.maps_url,
        checkIn: villa.check_in,
        checkOut: villa.check_out,
        houseRules: villa.house_rules,
        cancellationPolicy: villa.cancellation_policy,
        featured: villa.featured,
        tags: villa.tags,
        amenities: villa.villa_amenities?.map((va: any) => va.amenity?.name).filter(Boolean) || [],
    }));

    return NextResponse.json({
        villas: formattedVillas,
        total: count || formattedVillas.length,
        limit,
        offset,
    });
}