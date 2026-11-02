'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Tag, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

interface Amenity {
    id: string;
    name: string;
    icon: string | null;
    category: string | null;
    created_at: string;
}

const categories = ['Outdoor', 'Services', 'Amenities', 'Food', 'Entertainment', 'Wellness', 'Location', 'Policy', 'Events', 'Premium'];

export default function AdminAmenitiesClient() {
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Amenity | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        icon: '',
        category: '',
    });

    const fetchAmenities = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/amenities?limit=200');
            const data = await res.json();
            setAmenities(data.amenities || []);
        } catch (err) {
            console.error('Failed to fetch amenities:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAmenities();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        const url = '/api/admin/amenities';

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
            fetchAmenities();
        } catch (err) {
            alert('Failed to save amenity');
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            const res = await fetch(`/api/admin/amenities?id=${deletingId}`, { method: 'DELETE' });
            if (res.ok) {
                fetchAmenities();
                setShowDeleteConfirm(false);
                setDeletingId(null);
            }
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', icon: '', category: '' });
    };

    const openCreate = () => { resetForm(); setEditing(null); setShowModal(true); };
    const openEdit = (a: Amenity) => { setEditing(a); setFormData({ name: a.name, icon: a.icon || '', category: a.category || '' }); setShowModal(true); };

    const filteredAmenities = amenities.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) &&
        (!categoryFilter || a.category === categoryFilter)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Amenities</h1>
                    <p className="text-gray-600 mt-1">Manage villa amenities and features</p>
                </div>
                <Button onClick={openCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Amenity
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
                                placeholder="Search amenities..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                            />
                        </div>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                        >
                            <option value="">All Categories</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Icon</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-6 py-4"><div className="w-10 h-10 bg-gray-200 rounded" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                        </tr>
                                    ))
                                ) : filteredAmenities.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No amenities found</td>
                                    </tr>
                                ) : (
                                    filteredAmenities.map((a) => (
                                        <tr key={a.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="w-10 h-10 rounded-lg bg-luxPink/10 flex items-center justify-center">
                                                    {a.icon ? (
                                                        <span className="text-luxPink text-xl">{a.icon}</span>
                                                    ) : (
                                                        <Tag className="w-5 h-5 text-luxPink" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{a.name}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{a.category || 'N/A'}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => openEdit(a)} aria-label="Edit"><Edit className="w-4 h-4" /></Button>
                                                    <Button variant="ghost" size="sm" onClick={() => { setDeletingId(a.id); setShowDeleteConfirm(true); }} aria-label="Delete"><Trash2 className="w-4 h-4 text-red-500" /></Button>
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

            <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditing(null); resetForm(); }} title={editing ? `Edit ${editing.name}` : 'Add Amenity'} size="md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g., Private Pool" required />
                    <Input label="Lucide Icon Name" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} placeholder="e.g., waves, utensils, wifi" helperText="Use Lucide React icon names" />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                        <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" required>
                            <option value="">Select category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button type="button" variant="outline" onClick={() => { setShowModal(false); setEditing(null); resetForm(); }}>Cancel</Button>
                        <Button type="submit">{editing ? 'Save Changes' : 'Create Amenity'}</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showDeleteConfirm} onClose={() => { setShowDeleteConfirm(false); setDeletingId(null); }} title="Delete Amenity" description="Are you sure? This will remove the amenity from all villas." size="sm">
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => { setShowDeleteConfirm(false); setDeletingId(null); }}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
}