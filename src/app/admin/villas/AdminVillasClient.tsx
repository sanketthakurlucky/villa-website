'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Copy,
    ChevronDown, ChevronUp, Download, Upload, Image as ImageIcon,
    Building2, MapPin, Star, DollarSign, Tag, LayoutGrid, List
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn, formatPrice } from '@/lib/utils';
import VillaFormModal from './VillaFormModal';
import { useRouter } from 'next/navigation';

interface Villa {
    id: string;
    name: string;
    code_name: string;
    slug: string;
    description: string;
    destination_id: string;
    destination?: { id: string; name: string; slug: string };
    bedrooms: number;
    bathrooms: number;
    max_guests: number;
    base_price: number;
    b2b_price: number | null;
    cover_image: string | null;
    gallery_images: string[];
    video_url: string | null;
    maps_url: string | null;
    check_in: string | null;
    check_out: string | null;
    house_rules: string | null;
    cancellation_policy: string | null;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    featured: boolean;
    tags: string[];
    seo_title: string | null;
    seo_description: string | null;
    created_at: string;
    updated_at: string;
    amenities: { id: string; name: string }[];
}

interface Destination {
    id: string;
    name: string;
    slug: string;
}

export default function AdminVillasClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [villas, setVillas] = useState<Villa[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
    const [destinationFilter, setDestinationFilter] = useState(searchParams.get('destination') || '');
    const [sortField, setSortField] = useState('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
    const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const fetchVillas = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams({
            limit: pageSize.toString(),
            offset: ((page - 1) * pageSize).toString(),
            sort: sortField,
            order: sortOrder,
        });
        if (statusFilter) params.set('status', statusFilter);
        if (destinationFilter) params.set('destination', destinationFilter);
        if (search) params.set('search', search);

        try {
            const res = await fetch(`/api/admin/villas?${params.toString()}`);
            const data = await res.json();
            setVillas(data.villas || []);
            setTotal(data.total || 0);
        } catch (err) {
            console.error('Failed to fetch villas:', err);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, statusFilter, destinationFilter, search, sortField, sortOrder]);

    const fetchDestinations = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/destinations?limit=100');
            const data = await res.json();
            setDestinations(data.destinations || []);
        } catch (err) {
            console.error('Failed to fetch destinations:', err);
        }
    }, []);

    useEffect(() => {
        fetchVillas();
        fetchDestinations();
    }, [fetchVillas, fetchDestinations]);

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
    };

    const handleCreate = () => {
        setFormMode('create');
        setSelectedVilla(null);
        setShowFormModal(true);
    };

    const handleEdit = (villa: Villa) => {
        setFormMode('edit');
        setSelectedVilla(villa);
        setShowFormModal(true);
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!deletingId) return;
        try {
            const res = await fetch(`/api/admin/villas?id=${deletingId}`, { method: 'DELETE' });
            if (res.ok) {
                fetchVillas();
                setShowDeleteConfirm(false);
                setDeletingId(null);
            }
        } catch (err) {
            console.error('Failed to delete villa:', err);
        }
    };

    const handleFormSuccess = () => {
        setShowFormModal(false);
        setSelectedVilla(null);
        fetchVillas();
    };

    const statusColors: Record<string, string> = {
        PUBLISHED: 'bg-green-100 text-green-700',
        DRAFT: 'bg-gray-100 text-gray-700',
        ARCHIVED: 'bg-red-100 text-red-700',
    };

    const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
        PUBLISHED: CheckCircle,
        DRAFT: FileText,
        ARCHIVED: Archive,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Villas</h1>
                    <p className="text-gray-600 mt-1">Manage your villa listings</p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Villa
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search villas..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                onKeyDown={(e) => e.key === 'Enter' && fetchVillas()}
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                        >
                            <option value="">All Status</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="DRAFT">Draft</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>
                        <select
                            value={destinationFilter}
                            onChange={(e) => setDestinationFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                        >
                            <option value="">All Destinations</option>
                            {destinations.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setViewMode('table')}>
                                <LayoutGrid className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setViewMode('grid')}>
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Table View */}
            {viewMode === 'table' && (
                <Card>
                    <CardContent className="pt-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        {[
                                            { key: 'image', label: '', sortable: false },
                                            { key: 'name', label: 'Villa', sortable: true },
                                            { key: 'destination', label: 'Destination', sortable: true },
                                            { key: 'specs', label: 'Specs', sortable: false },
                                            { key: 'price', label: 'Price', sortable: true },
                                            { key: 'status', label: 'Status', sortable: true },
                                            { key: 'featured', label: 'Featured', sortable: true },
                                            { key: 'actions', label: 'Actions', sortable: false },
                                        ].map((col) => (
                                            <th
                                                key={col.key}
                                                className={cn(
                                                    'px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                                                    col.sortable && 'cursor-pointer hover:text-gray-700'
                                                )}
                                                onClick={() => col.sortable && handleSort(col.key)}
                                            >
                                                <div className="flex items-center gap-1">
                                                    {col.label}
                                                    {col.sortable && sortField === col.key && (
                                                        sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        [...Array(5)].map((_, i) => (
                                            <tr key={i} className="animate-pulse">
                                                <td className="px-6 py-4"><div className="h-12 w-16 bg-gray-200 rounded" /></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4" /></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                            </tr>
                                        ))
                                    ) : villas.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-12 text-center text-gray-500">No villas found</td>
                                        </tr>
                                    ) : (
                                        villas.map((villa) => (
                                            <tr key={villa.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                                                        {villa.cover_image ? (
                                                            <img src={villa.cover_image} alt={villa.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Building2 className="w-full h-full text-gray-300 flex items-center justify-center" />
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{villa.name}</p>
                                                        <p className="text-sm text-gray-500">{villa.code_name}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                        {villa.destination?.name || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {villa.bedrooms}BHK • {villa.bathrooms}Ba • {villa.max_guests}G
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-gray-900">{formatPrice(villa.base_price)}</p>
                                                    {villa.b2b_price && (
                                                        <p className="text-xs text-gray-500">B2B: {formatPrice(villa.b2b_price)}</p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                                                        statusColors[villa.status] || 'bg-gray-100 text-gray-700'
                                                    )}>
                                                        {villa.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Button
                                                        variant={villa.featured ? 'secondary' : 'ghost'}
                                                        size="sm"
                                        onClick={() => {
                                            // Toggle featured
                                        }}
                                                    >
                                                        <Star className={cn('w-4 h-4', villa.featured ? 'fill-current text-yellow-400' : 'text-gray-400')} />
                                                    </Button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(villa)} aria-label="Edit">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(villa.id)} aria-label="Delete">
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" asChild aria-label="View">
                                                            <Link href={`/villas/${villa.slug}`} target="_blank">
                                                                <Eye className="w-4 h-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {total > pageSize && (
                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(Math.ceil(total / pageSize), p + 1))} disabled={page === Math.ceil(total / pageSize)}>
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        [...Array(8)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <div className="h-48 bg-gray-200" />
                                <CardContent className="pt-4 space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </CardContent>
                            </Card>
                        ))
                    ) : villas.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-gray-500">No villas found</div>
                    ) : (
                        villas.map((villa) => (
                            <Card key={villa.id} className="overflow-hidden">
                                <div className="relative h-48 overflow-hidden">
                                    {villa.cover_image ? (
                                        <img src={villa.cover_image} alt={villa.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Building2 className="w-full h-full text-gray-300 flex items-center justify-center" />
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <Button variant="ghost" size="sm" className="bg-white/90" onClick={() => handleEdit(villa)}>
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                        <Button variant="ghost" size="sm" className="bg-white/90" onClick={() => handleDelete(villa.id)}>
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </Button>
                                    </div>
                                    {villa.featured && (
                                        <span className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">★ Featured</span>
                                    )}
                                </div>
                                <CardContent className="p-4 space-y-3">
                                    <h3 className="font-semibold text-gray-900">{villa.name}</h3>
                                    <p className="text-sm text-gray-500">{villa.code_name}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{villa.destination?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="font-semibold text-gray-900">{formatPrice(villa.base_price)}</span>
                                        <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', statusColors[villa.status])}>
                                            {villa.status}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}

            {/* Modals */}
            <VillaFormModal
                isOpen={showFormModal}
                onClose={() => setShowFormModal(false)}
                mode={formMode}
                villa={selectedVilla}
                destinations={destinations}
                onSuccess={handleFormSuccess}
            />

            <Modal
                isOpen={showDeleteConfirm}
                onClose={() => { setShowDeleteConfirm(false); setDeletingId(null); }}
                title="Delete Villa"
                description="Are you sure you want to delete this villa? This action cannot be undone."
                size="sm"
            >
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => { setShowDeleteConfirm(false); setDeletingId(null); }}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={confirmDelete} disabled={!deletingId}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

// Import missing icons
import { CheckCircle, Archive } from 'lucide-react';