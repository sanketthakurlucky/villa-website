'use client';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
    noIndex?: boolean;
    noFollow?: boolean;
}

export function SEOHead({
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
    noIndex,
    noFollow,
}: SEOProps) {
    const siteName = 'SEASALT Hospitality';
    const twitterHandle = '@seasalthospitality';
    const defaultImage = image || '/og-default.jpg';
    const fullUrl = url || typeof window !== 'undefined' ? window.location.href : '';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {noIndex && <meta name="robots" content="noindex" />}
            {noFollow && <meta name="robots" content="nofollow" />}
            {noIndex && noFollow && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title || siteName} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={defaultImage} />
            <meta property="og:site_name" content={siteName} />
            {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {type === 'article' && author && <meta property="article:author" content={author} />}
            {type === 'article' && section && <meta property="article:section" content={section} />}
            {tags?.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title || siteName} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={defaultImage} />

            {/* Additional SEO */}
            <link rel="canonical" href={fullUrl} />
            {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
        </>
    );
}

interface JSONLDProps {
    data: Record<string, any>;
}

export function JSONLD({ data }: JSONLDProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}