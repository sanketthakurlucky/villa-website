'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, FileText, Calendar, Eye, Download, X as XIcon, Link } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn, formatDate } from '@/lib/utils';

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    cover_image: string | null;
    destination_id: string | null;
    destination?: { id: string; name: string };
    tags: string[] | null;
    published_at: string | null;
    seo_title: string | null;
    seo_description: string | null;
    created_at: string;
    updated_at: string;
}

interface Destination {
    id: string;
    name: string;
    slug: string;
}

export default function AdminBlogsClient() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Blog | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        cover_image: '',
        destination_id: '',
        tags: [] as string[],
        published_at: '',
        seo_title: '',
        seo_description: '',
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [blogsRes, destRes] = await Promise.all([
                fetch('/api/admin/blogs?limit=50'),
                fetch('/api/admin/destinations?limit=100'),
            ]);
            const [blogsData, destData] = await Promise.all([blogsRes.json(), destRes.json()]);
            setBlogs(blogsData.blogs || []);
            setDestinations(destData.destinations || []);
        } catch (err) {
            console.error('Failed to fetch:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editing ? 'PUT' : 'POST';
        try {
            const res = await fetch('/api/admin/blogs', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, id: editing?.id }),
            });
            if (!res.ok) throw new Error('Failed to save');
            setShowModal(false);
            setEditing(null);
            resetForm();
            fetchData();
        } catch (err) { alert('Failed to save blog'); }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            const res = await fetch(`/api/admin/blogs?id=${deletingId}`, { method: 'DELETE' });
            if (res.ok) { fetchData(); setShowDeleteConfirm(false); setDeletingId(null); }
        } catch (err) { alert('Failed to delete'); }
    };

    const resetForm = () => {
        setFormData({ title: '', slug: '', excerpt: '', content: '', cover_image: '', destination_id: '', tags: [], published_at: '', seo_title: '', seo_description: '' });
    };

    const openCreate = () => { resetForm(); setEditing(null); setShowModal(true); };
    const openEdit = (b: Blog) => { setEditing(b); setFormData({ title: b.title, slug: b.slug, excerpt: b.excerpt || '', content: b.content || '', cover_image: b.cover_image || '', destination_id: b.destination_id || '', tags: b.tags || [], published_at: b.published_at ? b.published_at.split('T')[0] : '', seo_title: b.seo_title || '', seo_description: b.seo_description || '' }); setShowModal(true); };

    const filteredBlogs = blogs.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) &&
        (!statusFilter || (statusFilter === 'published' ? b.published_at : !b.published_at))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
                    <p className="text-gray-600 mt-1">Manage blog posts and articles</p>
                </div>
                <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" /> Add Blog Post</Button>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search blogs..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" />
                        </div>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink">
                            <option value="">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Destination</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Published</th>
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
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                            <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/3" /></td>
                                        </tr>
                                    ))
                                ) : filteredBlogs.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No blog posts found</td></tr>
                                ) : (
                                    filteredBlogs.map((b) => (
                                        <tr key={b.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="w-16 h-10 rounded-lg overflow-hidden bg-gray-100">
                                                    {b.cover_image ? <img src={b.cover_image} alt={b.title} className="w-full h-full object-cover" /> : <FileText className="w-full h-full text-gray-300 flex items-center justify-center" />}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900 max-w-xs truncate">{b.title}</p>
                                                <p className="text-sm text-gray-500 font-mono">{b.slug}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{b.destination?.name || 'N/A'}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn('px-2 py-1 rounded-full text-xs font-medium', b.published_at ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700')}>
                                                    {b.published_at ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{b.published_at ? formatDate(b.published_at) : '—'}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => openEdit(b)} aria-label="Edit"><Edit className="w-4 h-4" /></Button>
                                                    <Button variant="ghost" size="sm" asChild aria-label="View"><Link href={`/blogs/${b.slug}`} target="_blank"><Eye className="w-4 h-4" /></Link></Button>
                                                    <Button variant="ghost" size="sm" onClick={() => { setDeletingId(b.id); setShowDeleteConfirm(true); }} aria-label="Delete"><Trash2 className="w-4 h-4 text-red-500" /></Button>
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

            <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditing(null); resetForm(); }} title={editing ? `Edit ${editing.title}` : 'Add Blog Post'} size="full" showCloseButton>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex gap-1 px-2" role="tablist">
                            {['Content', 'Media', 'SEO'].map((label, i) => (
                                <button key={i} type="button" role="tab" aria-selected={activeTab === i} onClick={() => setActiveTab(i)} className={cn('px-4 py-3 text-sm font-medium border-b-2 -mb-px', activeTab === i ? 'border-luxPink text-luxPink' : 'border-transparent text-gray-500 hover:text-gray-700')}>{label}</button>
                            ))}
                        </nav>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto pr-2">
                        {activeTab === 0 && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6" role="tabpanel">
                                <Input label="Title *" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Blog post title" required />
                                <Input label="Slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="auto-generated" />
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt</label>
                                    <textarea value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" placeholder="Short summary for listings..." />
                                </div>
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Content (HTML/Markdown)</label>
                                    <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={15} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink font-mono text-sm" placeholder="Full blog content..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                                    <select value={formData.destination_id} onChange={(e) => setFormData({...formData, destination_id: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink">
                                        <option value="">None</option>
                                        {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
                                    <TagInput value={formData.tags} onChange={(tags) => setFormData({...formData, tags})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Publish Date</label>
                                    <input type="date" value={formData.published_at} onChange={(e) => setFormData({...formData, published_at: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" />
                                </div>
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="p-6 space-y-6" role="tabpanel">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Cover Image URL</label>
                                    <input type="url" value={formData.cover_image} onChange={(e) => setFormData({...formData, cover_image: e.target.value})} placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" />
                                </div>
                            </div>
                        )}

                        {activeTab === 2 && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6" role="tabpanel">
                                <Input label="SEO Title" value={formData.seo_title} onChange={(e) => setFormData({...formData, seo_title: e.target.value})} placeholder="Auto-generated" />
                                <Input label="SEO Description" value={formData.seo_description} onChange={(e) => setFormData({...formData, seo_description: e.target.value})} placeholder="Auto-generated" />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button type="button" variant="outline" onClick={() => { setShowModal(false); setEditing(null); resetForm(); }}>Cancel</Button>
                        <Button type="submit">{editing ? 'Save Changes' : 'Create Blog Post'}</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={showDeleteConfirm} onClose={() => { setShowDeleteConfirm(false); setDeletingId(null); }} title="Delete Blog Post" description="Are you sure? This action cannot be undone." size="sm">
                <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => { setShowDeleteConfirm(false); setDeletingId(null); }}>Cancel</Button><Button variant="destructive" onClick={handleDelete}>Delete</Button></div>
            </Modal>
        </div>
    );
}

function TagInput({ value, onChange }: { value: string[]; onChange: (tags: string[]) => void }) {
    const [inputValue, setInputValue] = useState('');
    const handleAdd = () => { if (inputValue.trim() && !value.includes(inputValue.trim())) { onChange([...value, inputValue.trim()]); setInputValue(''); } };
    const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } };
    return (
        <div className="flex flex-wrap gap-2">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Add tag (press Enter)" className="flex-1 min-w-[200px] px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" />
            <div className="flex flex-wrap gap-2">{value.map(tag => (<span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-luxPink/10 text-luxPink rounded-full text-sm font-medium">{tag}<button type="button" onClick={() => onChange(value.filter(t => t !== tag))} className="w-4 h-4 flex items-center justify-center hover:bg-luxPink/20 rounded-full"><XIcon className="w-3 h-3" /></button></span>))}</div>
        </div>
    );
}