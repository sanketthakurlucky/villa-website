import { Metadata } from 'next';
import { Suspense } from 'react';
import VillaListingClient from './VillaListingClient';

export const metadata: Metadata = {
    title: 'Explore Luxury Villas',
    description: 'Discover handpicked luxury villas across India with private pools, in-house chefs, and personalized concierge service.',
};

function VillaListingFallback() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-luxDark text-white py-16 sm:py-24">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
                <div className="relative container-main">
                    <div className="max-w-4xl mx-auto text-center mb-10">
                        <h1 className="text-display-lg sm:text-display-xl font-semibold mb-4 animate-pulse">
                            Loading...
                        </h1>
                    </div>
                </div>
            </section>
            <section className="py-12 lg:py-16 -mt-8">
                <div className="container-main">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-56 bg-gray-200 rounded-2xl" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function VillaListingPage() {
    return (
        <Suspense fallback={<VillaListingFallback />}>
            <VillaListingClient />
        </Suspense>
    );
}