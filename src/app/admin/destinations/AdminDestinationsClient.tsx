'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, MapPin, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn, formatPrice } from '@/lib/utils';

interface Destination {
    id: string;
    name: string;
    slug: string;
    region: string | null;
    country: string | null;
    image: string | null;
    description: string | null;
    villa_count: number;
    seo_title: string | null;
    seo_description: string | null;
    created_at: string;
    updated_at: string;
}

export default function AdminDestinationsClient() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Destination | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        region: '',
        country: 'India',
        image: '',
        description: '',
        seo_title: '',
        seo_description: '',
    });

    const fetchDestinations = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/destinations?limit=100');
            const data = await res.json();
            setDestinations(data.destinations || []);
        } catch (err) {
            console.error('Failed to fetch destinations:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = editing ? '/api/admin/destinations' : '/api/admin/destinations';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, id: editing?.id }),
            });

            if (!res.ok) throw new Error('Failed to save');
            setShowModal(false);
            setEditing(null);
            resetForm();
            fetchDestinations();
        } catch (err) {
            alert('Failed to save destination');
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            const res = await fetch(`/api/admin/destinations?id=${deletingId}`, { method: 'DELETE' });
            if (res.ok) {
                fetchDestinations();
                setShowDeleteConfirm(false);
                setDeletingId(null);
            }
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            region: '',
            country: 'India',
            image: '',
            description: '',
            seo_title: '',
            seo_description: '',
        });
    };

    const openCreate = () => {
        resetForm();
        setEditing(null);
        setShowModal(true);
    };

    const openEdit = (dest: Destination) => {
        setEditing(dest);
        setFormData({
            name: dest.name,
            slug: dest.slug,
            region: dest.region || '',
            country: dest.country || 'India',
            image: dest.image || '',
            description: dest.description || '',
            seo_title: dest.seo_title || '',
            seo_description: dest.seo_description || '',
        });
        setShowModal(true);
    };

    const filteredDestinations = destinations.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.region?.toLowerCase().includes(search.toLowerCase()) ||
        d.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Destinations</h1>
                    <p className="text-gray-600 mt-1">Manage travel destinations</p>
                </div>
                <Button onClick={openCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Destination
                </Button>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search destinations..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Region</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Villas</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-6 py-4"><div className="w-16 h-10 bg-gray-200 rounded" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/4" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                        </tr>
                                    ))
                                ) : filteredDestinations.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No destinations found</td>
                                    </tr>
                                ) : (
                                    filteredDestinations.map((dest) => (
                                        <tr key={dest.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="w-16 h-10 rounded-lg overflow-hidden bg-gray-100">
                                                    {dest.image ? (
                                                        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <MapPin className="w-full h-full text-gray-300 flex items-center justify-center" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">{dest.name}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{dest.region || 'N/A'}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                    {dest.villa_count} villas
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 font-mono">{dest.slug}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => openEdit(dest)} aria-label="Edit">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => { setDeletingId(dest.id); setShowDeleteConfirm(true); }} aria-label="Delete">
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditing(null); resetForm(); }} title={editing ? `Edit ${editing.name}` : 'Add Destination'} size="lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Input label="Name *" error={!formData.name && editing ? 'Required' : undefined} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., North Goa" required />
                        <Input label="Slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="auto-generated" helperText="Leave empty to auto-generate" />
                        <Input label="Region" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})} placeholder="e.g., Goa" />
                        <Input label="Country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} placeholder="India" />
                        <Input label="Cover Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" placeholder="Destination description..." />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <Input label="SEO Title" value={formData.seo_title} onChange={(e) => setFormData({...formData, seo_title: e.target.value})} placeholder="Auto-generated" />
                        <Input label="SEO Description" value={formData.seo_description} onChange={(e) => setFormData({...formData, seo_description: e.target.value})} placeholder="Auto-generated" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button type="button" variant="outline" onClick={() => { setShowModal(false); setEditing(null); resetForm(); }}>Cancel</Button>
                        <Button type="submit">{editing ? 'Save Changes' : 'Create Destination'}</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showDeleteConfirm} onClose={() => { setShowDeleteConfirm(false); setDeletingId(null); }} title="Delete Destination" description="Are you sure? This will affect all villas in this destination." size="sm">
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => { setShowDeleteConfirm(false); setDeletingId(null); }}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
}