'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Building2, MapPin, FileText, MessageSquare, Users, DollarSign,
    TrendingUp, TrendingDown, ArrowUpRight, Clock, CheckCircle, XCircle,
    Building2 as BuildingIcon, Star, ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn, formatPrice } from '@/lib/utils';

interface StatsData {
    totalVillas: number;
    publishedVillas: number;
    totalDestinations: number;
    totalEnquiries: number;
    newEnquiries: number;
    totalBlogs: number;
    monthlyRevenue: number;
    conversionRate: number;
}

interface RecentEnquiry {
    id: string;
    name: string;
    phone: string;
    villa_name: string;
    status: string;
    created_at: string;
}

interface RecentVilla {
    id: string;
    name: string;
    code_name: string;
    status: string;
    destination_name: string;
    created_at: string;
}

export default function AdminDashboardClient() {
    const [stats, setStats] = useState<StatsData>({
        totalVillas: 0,
        publishedVillas: 0,
        totalDestinations: 0,
        totalEnquiries: 0,
        newEnquiries: 0,
        totalBlogs: 0,
        monthlyRevenue: 0,
        conversionRate: 0,
    });
    const [recentEnquiries, setRecentEnquiries] = useState<RecentEnquiry[]>([]);
    const [recentVillas, setRecentVillas] = useState<RecentVilla[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, enquiriesRes, villasRes] = await Promise.all([
                fetch('/api/admin/stats'),
                fetch('/api/admin/enquiries?limit=5'),
                fetch('/api/admin/villas?limit=5'),
            ]);

            const [statsData, enquiriesData, villasData] = await Promise.all([
                statsRes.json(),
                enquiriesRes.json(),
                villasRes.json(),
            ]);

            if (statsData.stats) setStats(statsData.stats);
            if (enquiriesData.enquiries) setRecentEnquiries(enquiriesData.enquiries);
            if (villasData.villas) setRecentVillas(villasData.villas);
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            name: 'Total Villas',
            value: stats.totalVillas,
            change: '+12%',
            icon: Building2,
            color: 'bg-luxPink/10 text-luxPink',
            href: '/admin/villas',
        },
        {
            name: 'Published',
            value: stats.publishedVillas,
            change: '+8%',
            icon: CheckCircle,
            color: 'bg-green-100 text-green-600',
            href: '/admin/villas?status=PUBLISHED',
        },
        {
            name: 'Destinations',
            value: stats.totalDestinations,
            change: '+2',
            icon: MapPin,
            color: 'bg-blue-100 text-blue-600',
            href: '/admin/destinations',
        },
        {
            name: 'Total Enquiries',
            value: stats.totalEnquiries,
            change: '+23%',
            icon: MessageSquare,
            color: 'bg-purple-100 text-purple-600',
            href: '/admin/enquiries',
        },
        {
            name: 'New Enquiries',
            value: stats.newEnquiries,
            change: '+5 today',
            icon: Clock,
            color: 'bg-orange-100 text-orange-600',
            href: '/admin/enquiries?status=NEW',
        },
        {
            name: 'Blog Posts',
            value: stats.totalBlogs,
            change: '+3',
            icon: FileText,
            color: 'bg-teal-100 text-teal-600',
            href: '/admin/blogs',
        },
    ];

    const statusColors: Record<string, string> = {
        NEW: 'bg-blue-100 text-blue-700',
        CONTACTED: 'bg-yellow-100 text-yellow-700',
        QUOTED: 'bg-purple-100 text-purple-700',
        BOOKED: 'bg-green-100 text-green-700',
        LOST: 'bg-red-100 text-red-700',
        DRAFT: 'bg-gray-100 text-gray-700',
        PUBLISHED: 'bg-green-100 text-green-700',
        ARCHIVED: 'bg-gray-100 text-gray-700',
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardContent className="pt-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                                <div className="h-8 bg-gray-200 rounded w-1/2" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your SEASALT Hospitality platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" asChild>
                        <Link href="/admin/villas?create=true">
                            <Building2 className="w-4 h-4 mr-2" />
                            Add Villa
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/admin/enquiries?status=NEW">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            View Enquiries
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                {statCards.map((stat) => (
                    <Link key={stat.name} href={stat.href} className="block">
                        <Card className="hover:shadow-card-hover transition-shadow">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', stat.color)}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value.toLocaleString()}</p>
                                    <p className="text-xs font-medium text-green-600 mt-1">{stat.change}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Link href="/admin/villas?create=true" className="card-hover group">
                    <Card className="h-full border-l-4 border-luxPink">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 rounded-xl bg-luxPink/10 flex items-center justify-center mb-4 group-hover:bg-luxPink group-hover:text-white transition-colors">
                                <BuildingIcon className="w-6 h-6 text-luxPink group-hover:text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Add New Villa</h3>
                            <p className="text-sm text-gray-500 mt-1">Create a new villa listing</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/destinations?create=true" className="card-hover group">
                    <Card className="h-full border-l-4 border-blue-500">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <MapPin className="w-6 h-6 text-blue-600 group-hover:text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Add Destination</h3>
                            <p className="text-sm text-gray-500 mt-1">Create a new destination</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/blogs?create=true" className="card-hover group">
                    <Card className="h-full border-l-4 border-purple-500">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6 text-purple-600 group-hover:text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Write Blog Post</h3>
                            <p className="text-sm text-gray-500 mt-1">Publish a new article</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/amenities?create=true" className="card-hover group">
                    <Card className="h-full border-l-4 border-teal-500">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                <Settings className="w-6 h-6 text-teal-600 group-hover:text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Add Amenity</h3>
                            <p className="text-sm text-gray-500 mt-1">Create a new amenity</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Enquiries */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Enquiries</CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/enquiries">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentEnquiries.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No enquiries yet</p>
                            ) : (
                                recentEnquiries.map((enquiry) => (
                                    <div key={enquiry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-luxPink/10 flex items-center justify-center">
                                                <MessageSquare className="w-5 h-5 text-luxPink" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{enquiry.name}</p>
                                                <p className="text-sm text-gray-500">{enquiry.villa_name || 'General Enquiry'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={cn(
                                                'px-3 py-1 rounded-full text-xs font-medium',
                                                statusColors[enquiry.status] || 'bg-gray-100 text-gray-700'
                                            )}>
                                                {enquiry.status}
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(enquiry.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Villas */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Villas</CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/villas">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentVillas.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No villas yet</p>
                            ) : (
                                recentVillas.map((villa) => (
                                    <div key={villa.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                <BuildingIcon className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{villa.code_name || villa.name}</p>
                                                <p className="text-sm text-gray-500">{villa.destination_name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={cn(
                                                'px-3 py-1 rounded-full text-xs font-medium',
                                                statusColors[villa.status] || 'bg-gray-100 text-gray-700'
                                            )}>
                                                {villa.status}
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(villa.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}