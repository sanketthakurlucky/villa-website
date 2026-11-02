'use client';

interface VillaStructuredDataProps {
    villa: {
        name: string;
        codeName: string;
        description: string;
        destination: { name: string };
        bedrooms: number;
        bathrooms: number;
        maxGuests: number;
        price: number;
        coverImage: string;
        galleryImages: string[];
        videoUrl?: string;
        checkIn: string;
        checkOut: string;
        amenities: { name: string }[];
    };
}

export function VillaStructuredData({ villa }: VillaStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: villa.codeName || villa.name,
        description: villa.description,
        address: {
            '@type': 'PostalAddress',
            addressLocality: villa.destination.name,
            addressCountry: 'IN',
        },
        image: [villa.coverImage, ...villa.galleryImages].filter(Boolean),
        priceRange: `₹${villa.price.toLocaleString('en-IN')}`,
        amenityFeature: villa.amenities.map(a => ({
            '@type': 'LocationFeatureSpecification',
            name: a.name,
            value: true,
        })),
        numberOfRooms: villa.bedrooms,
        bathroomCount: villa.bathrooms,
        maxOccupancy: villa.maxGuests,
        checkinTime: villa.checkIn,
        checkoutTime: villa.checkOut,
        ...(villa.videoUrl && { video: villa.videoUrl }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

interface BlogStructuredDataProps {
    blog: {
        title: string;
        description: string;
        coverImage: string;
        publishedAt: string;
        author: { name: string };
    };
}

export function BlogStructuredData({ blog }: BlogStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.description,
        image: blog.coverImage,
        datePublished: blog.publishedAt,
        author: {
            '@type': 'Person',
            name: blog.author.name,
        },
        publisher: {
            '@type': 'Organization',
            name: 'SEASALT Hospitality',
            logo: {
                '@type': 'ImageObject',
                url: 'https://seasalthospitality.com/logo.png',
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

export function OrganizationStructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SEASALT Hospitality',
        alternateName: 'SEASALT',
        url: process.env.NEXT_PUBLIC_APP_URL || 'https://seasalthospitality.com',
        logo: 'https://seasalthospitality.com/logo.png',
        sameAs: [
            'https://instagram.com/seasalthospitality',
            'https://facebook.com/seasalthospitality',
            'https://youtube.com/seasalthospitality',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-93993-44077',
            contactType: 'customer service',
            availableLanguage: ['English', 'Hindi'],
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Goa',
            addressCountry: 'IN',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}