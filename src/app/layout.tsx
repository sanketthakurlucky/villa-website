import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Cormorant_Garamond, Alex_Brush, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-alex-brush',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SEASALT Hospitality | Curated Luxury Villas & Private Stays',
    template: '%s | SEASALT Hospitality',
  },
  description: 'Discover handpicked luxury villas across India with private pools, in-house chefs, and personalized concierge service. Book your dream vacation with SEASALT Hospitality.',
  keywords: ['luxury villas', 'private pool villas', 'Goa villas', 'holiday homes', 'vacation rentals', 'SEASALT Hospitality'],
  authors: [{ name: 'SEASALT Hospitality' }],
  creator: 'SEASALT Hospitality',
  publisher: 'SEASALT Hospitality',
  formatDetection: { telephone: false },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'SEASALT Hospitality',
    title: 'SEASALT Hospitality | Curated Luxury Villas & Private Stays',
    description: 'Discover handpicked luxury villas across India with private pools, in-house chefs, and personalized concierge service.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'SEASALT Hospitality - Luxury Villas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEASALT Hospitality | Curated Luxury Villas',
    description: 'Discover handpicked luxury villas across India with private pools and personalized service.',
    images: ['/og-default.jpg'],
    creator: '@seasalthospitality',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVars = `${inter.variable} ${plusJakartaSans.variable} ${cormorantGaramond.variable} ${alexBrush.variable} ${playfairDisplay.variable}`;

  return (
    <html lang="en" className={fontVars}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.tailwindcss.com" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}