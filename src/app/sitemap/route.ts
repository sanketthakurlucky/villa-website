import { createServiceClient } from '@/lib/supabase/service';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createServiceClient();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/villas`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/collections`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];

    try {
        const [villasRes, destinationsRes, blogsRes] = await Promise.all([
            supabase.from('villas').select('slug, updated_at').eq('status', 'PUBLISHED'),
            supabase.from('destinations').select('slug, updated_at'),
            supabase.from('blogs').select('slug, updated_at').not('published_at', 'is', null),
        ]);

        const villaUrls = (villasRes.data || []).map(villa => ({
            url: `${baseUrl}/villas/${villa.slug}`,
            lastModified: new Date(villa.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        const destinationUrls = (destinationsRes.data || []).map(dest => ({
            url: `${baseUrl}/villas?location=${dest.slug}`,
            lastModified: new Date(dest.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        const blogUrls = (blogsRes.data || []).map(blog => ({
            url: `${baseUrl}/blogs/${blog.slug}`,
            lastModified: new Date(blog.updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));

        return [...staticPages, ...villaUrls, ...destinationUrls, ...blogUrls];
    } catch (err) {
        console.error('Sitemap generation error:', err);
        return staticPages;
    }
}