import { Metadata } from 'next';
import { Suspense } from 'react';
import AdminVillasClient from './AdminVillasClient';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
    title: 'Manage Villas',
    description: 'Manage villa listings',
};

function AdminVillasFallback() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-pulse">
                <div>
                    <div className="h-8 bg-gray-200 rounded w-48" />
                    <div className="h-4 bg-gray-200 rounded w-32 mt-2" />
                </div>
                <div className="h-10 bg-gray-200 rounded w-32" />
            </div>
            <Card>
                <CardContent className="pt-6">
                    <div className="animate-pulse space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-16 h-10 bg-gray-200 rounded" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                                <div className="w-24 h-8 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function AdminVillasPage() {
    return (
        <Suspense fallback={<AdminVillasFallback />}>
            <AdminVillasClient />
        </Suspense>
    );
}