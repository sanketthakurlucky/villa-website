import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VillaDetailClient from './VillaDetailClient';
import { createClient } from '@/lib/supabase/server';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const supabase = createClient();
    
    const { data: villa } = await supabase
        .from('villas')
        .select('name, code_name, description, destination:destinations(name), cover_image')
        .eq('slug', slug)
        .eq('status', 'PUBLISHED')
        .maybeSingle();

    if (!villa) {
        return { title: 'Villa Not Found' };
    }

    // Handle destination being an array
    const destination = Array.isArray(villa.destination) ? villa.destination[0] : villa.destination;

    if (!villa) {
        return { title: 'Villa Not Found' };
    }

    return {
        title: villa.code_name || villa.name,
        description: villa.description || `Book ${villa.name} - luxury villa in ${destination?.name}`,
        openGraph: {
            title: villa.code_name || villa.name,
            description: villa.description || `Luxury villa in ${destination?.name}`,
            images: villa.cover_image ? [villa.cover_image] : [],
            type: 'website',
        },
    };
}

export default async function VillaDetailPage({ params }: Props) {
    const { slug } = await params;
    const supabase = createClient();

    const { data: villa, error } = await supabase
        .from('villas')
        .select(`
            *,
            destination:destinations(*),
            villa_amenities(amenity:amenities(*))
        `)
        .eq('slug', slug)
        .eq('status', 'PUBLISHED')
        .single();

    if (error || !villa) {
        notFound();
    }

    // Fetch nearby villas
    const { data: nearbyVillas } = await supabase
        .from('villas')
        .select('id, slug, name, code_name, destination:destinations(name), bedrooms, bathrooms, max_guests, base_price, cover_image, featured')
        .eq('status', 'PUBLISHED')
        .neq('id', villa.id)
        .eq('destination_id', villa.destination_id)
        .limit(4);

    const formattedVilla = {
        ...villa,
        destination: villa.destination,
        amenities: villa.villa_amenities?.map((va: any) => va.amenity).filter(Boolean) || [],
        nearbyVillas: nearbyVillas || [],
    };

    return <VillaDetailClient villa={formattedVilla} />;
}