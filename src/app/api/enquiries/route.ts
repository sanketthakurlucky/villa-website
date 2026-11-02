import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const supabase = createClient();
    
    try {
        const body = await request.json();
        
        const { data, error } = await supabase
            .from('enquiries')
            .insert([{
                villa_id: body.villa_id || null,
                name: body.name,
                phone: body.phone,
                email: body.email || null,
                check_in: body.check_in || null,
                check_out: body.check_out || null,
                guests: body.guests || null,
                message: body.message || null,
                status: 'NEW',
                source: body.source || 'website',
            }])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function GET(request: NextRequest) {
    const supabase = createClient();
    const searchParams = request.nextUrl.searchParams;
    
    const status = searchParams.get('status');
    const villa_id = searchParams.get('villa_id');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
        .from('enquiries')
        .select(`
            *,
            villa:villas(id, name, code_name, slug)
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (status) {
        query = query.eq('status', status);
    }
    if (villa_id) {
        query = query.eq('villa_id', villa_id);
    }

    const { data, error, count } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ enquiries: data, total: count });
}