import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createServiceClient();

    try {
        const [
            { count: totalVillas },
            { count: publishedVillas },
            { count: totalDestinations },
            { count: totalEnquiries },
            { count: newEnquiries },
            { count: totalBlogs },
        ] = await Promise.all([
            supabase.from('villas').select('*', { count: 'exact', head: true }),
            supabase.from('villas').select('*', { count: 'exact', head: true }).eq('status', 'PUBLISHED'),
            supabase.from('destinations').select('*', { count: 'exact', head: true }),
            supabase.from('enquiries').select('*', { count: 'exact', head: true }),
            supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'NEW'),
            supabase.from('blogs').select('*', { count: 'exact', head: true }),
        ]);

        // Get monthly revenue (sum of base_price for booked enquiries this month)
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { data: bookedEnquiries } = await supabase
            .from('enquiries')
            .select('villa:villas(base_price)')
            .eq('status', 'BOOKED')
            .gte('created_at', startOfMonth.toISOString());

        const monthlyRevenue = bookedEnquiries?.reduce((sum, e: any) => sum + (e.villa?.base_price || 0), 0) || 0;

        // Conversion rate
        const conversionRate = totalEnquiries && totalEnquiries > 0 
            ? Math.round((bookedEnquiries?.length || 0) / totalEnquiries * 100) 
            : 0;

        return NextResponse.json({
            stats: {
                totalVillas: totalVillas || 0,
                publishedVillas: publishedVillas || 0,
                totalDestinations: totalDestinations || 0,
                totalEnquiries: totalEnquiries || 0,
                newEnquiries: newEnquiries || 0,
                totalBlogs: totalBlogs || 0,
                monthlyRevenue,
                conversionRate,
            },
        });
    } catch (err) {
        console.error('Stats error:', err);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}