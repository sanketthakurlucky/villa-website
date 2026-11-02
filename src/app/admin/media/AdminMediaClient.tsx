'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Search, Filter, Upload, Image as ImageIcon, Video, FileText, Trash2, MoreVertical, Download, Copy, Check, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

interface MediaAsset {
    id: string;
    name: string;
    type: 'image' | 'video' | 'document';
    url: string;
    size: number;
    width?: number;
    height?: number;
    folder: string;
    created_at: string;
}

export default function AdminMediaClient() {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [folderFilter, setFolderFilter] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchAssets = async () => {
        setLoading(true);
        // Mock data for now - replace with actual API call
        setAssets([
            { id: '1', name: 'villa-cover-1.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', size: 245000, width: 800, height: 600, folder: 'villas', created_at: '2024-01-15' },
            { id: '2', name: 'villa-gallery-1.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', size: 189000, width: 800, height: 600, folder: 'villas', created_at: '2024-01-15' },
            { id: '3', name: 'villa-video-1.mp4', type: 'video', url: 'https://example.com/video.mp4', size: 5200000, folder: 'villas', created_at: '2024-01-10' },
            { id: '4', name: 'brochure-villa-1.pdf', type: 'document', url: 'https://example.com/brochure.pdf', size: 1024000, folder: 'documents', created_at: '2024-01-08' },
            { id: '5', name: 'hero-banner.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', size: 312000, width: 1920, height: 1080, folder: 'site', created_at: '2024-01-05' },
            { id: '6', name: 'blog-cover-1.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', size: 156000, width: 800, height: 600, folder: 'blogs', created_at: '2024-01-03' },
        ]);
        setLoading(false);
    };

    useEffect(() => { fetchAssets(); }, []);

    const handleFiles = (files: FileList) => {
        const fileArray = Array.from(files);
        fileArray.forEach(file => {
            const id = Math.random().toString(36).substr(2, 9);
            const url = URL.createObjectURL(file);
            setUploadProgress(prev => ({ ...prev, [id]: 0 }));
            
            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(() => {
                        setAssets(prev => [...prev, {
                            id,
                            name: file.name,
                            type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
                            url,
                            size: file.size,
                            folder: 'uploads',
                            created_at: new Date().toISOString(),
                        }]);
                        setUploadProgress(prev => { const next = { ...prev }; delete next[id]; return next; });
                    }, 500);
                }
                setUploadProgress(prev => ({ ...prev, [id]: progress }));
            }, 200);
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragActive(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setDragActive(false); };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) handleFiles(e.target.files);
    };

    const handleClick = () => fileInputRef.current?.click();

    const toggleSelect = (id: string) => {
        setSelectedAssets(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
    };

    const handleDelete = async (id: string) => {
        setAssets(prev => prev.filter(a => a.id !== id));
    };

    const handleBulkDelete = async () => {
        setAssets(prev => prev.filter(a => !selectedAssets.includes(a.id)));
        setSelectedAssets([]);
    };

    const filteredAssets = assets.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) &&
        (!typeFilter || a.type === typeFilter) &&
        (!folderFilter || a.folder === folderFilter)
    );

    const folders = [...new Set(assets.map(a => a.folder))];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
                    <p className="text-gray-600 mt-1">Manage images, videos, and documents</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handleClick} disabled={showUploadModal}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                    </Button>
<div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                    <Button variant={viewMode === 'grid' ? 'secondary' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
                        <Grid className="w-4 h-4" />
                    </Button>
                    <Button variant={viewMode === 'list' ? 'secondary' : 'outline'} size="sm" onClick={() => setViewMode('list')}>
                        <List className="w-4 h-4" />
                    </Button>
                </div>
                </div>
            </div>

            {/* Upload Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
                className={cn(
                    'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors',
                    dragActive ? 'border-luxPink bg-luxPink/5' : 'border-gray-200 hover:border-luxPink'
                )}
            >
                <input ref={fileInputRef} type="file" accept="image/*,video/*,.pdf" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-1">Drag & drop files here, or click to browse</p>
                <p className="text-sm text-gray-400">Supports: JPG, PNG, WebP, MP4, PDF (max 50MB each)</p>
                
                {Object.keys(uploadProgress).length > 0 && (
                    <div className="mt-6 space-y-2 max-h-40 overflow-y-auto">
                        {Object.entries(uploadProgress).map(([id, progress]) => (
                            <div key={id} className="flex items-center gap-3 text-sm">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-luxPink rounded-full transition-all" style={{ width: `${progress}%` }} />
                                </div>
                                <span>{Math.round(progress)}%</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" />
                        </div>
                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink">
                            <option value="">All Types</option>
                            <option value="image">Images</option>
                            <option value="video">Videos</option>
                            <option value="document">Documents</option>
                        </select>
                        <select value={folderFilter} onChange={(e) => setFolderFilter(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink">
                            <option value="">All Folders</option>
                            {folders.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                        {selectedAssets.length > 0 && (
                            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Selected ({selectedAssets.length})
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {loading ? (
                        [...Array(12)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-xl border border-gray-200">
                                <div className="aspect-square bg-gray-200" />
                                <div className="p-3 space-y-2"><div className="h-4 bg-gray-200 rounded w-3/4" /><div className="h-3 bg-gray-200 rounded w-1/2" /></div>
                            </div>
                        ))
                    ) : filteredAssets.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-gray-500">No files found</div>
                    ) : (
                        filteredAssets.map((asset) => (
                            <MediaCard
                                key={asset.id}
                                asset={asset}
                                selected={selectedAssets.includes(asset.id)}
                                onSelect={() => toggleSelect(asset.id)}
                                onDelete={() => handleDelete(asset.id)}
                            />
                        ))
                    )}
                </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-10"><input type="checkbox" checked={selectedAssets.length === filteredAssets.length && filteredAssets.length > 0} onChange={() => { if (selectedAssets.length === filteredAssets.length) setSelectedAssets([]); else setSelectedAssets(filteredAssets.map(a => a.id)); }} className="w-4 h-4 text-luxPink border-gray-300 rounded" /></th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Folder</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredAssets.map((asset) => (
                                <tr key={asset.id} className={cn('hover:bg-gray-50', selectedAssets.includes(asset.id) && 'bg-luxPink/5')}>
                                    <td className="px-6 py-4"><input type="checkbox" checked={selectedAssets.includes(asset.id)} onChange={() => toggleSelect(asset.id)} className="w-4 h-4 text-luxPink border-gray-300 rounded" /></td>
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-8 rounded-lg overflow-hidden bg-gray-100">
                                            {asset.type === 'image' && asset.url ? <img src={asset.url} alt="" className="w-full h-full object-cover" /> : asset.type === 'video' ? <Video className="w-full h-full text-gray-300 flex items-center justify-center" /> : <FileText className="w-full h-full text-gray-300 flex items-center justify-center" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{asset.name}</td>
                                    <td className="px-6 py-4"><span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', asset.type === 'image' ? 'bg-blue-100 text-blue-700' : asset.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700')}>{asset.type}</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{(asset.size / 1024).toFixed(1)} KB</td>
                                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{asset.folder}</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(asset.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm" asChild><a href={asset.url} target="_blank" rel="noopener noreferrer"><Download className="w-4 h-4" /></a></Button>
                                            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(asset.url)}><Copy className="w-4 h-4" /></Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(asset.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function MediaCard({ asset, selected, onSelect, onDelete }: { asset: MediaAsset; selected: boolean; onSelect: () => void; onDelete: () => void }) {
    return (
        <div className={cn('relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all', selected && 'ring-2 ring-luxPink border-transparent')}>
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                {asset.type === 'image' && asset.url ? (
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                ) : asset.type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-300"><Video className="w-8 h-8" /></div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300"><FileText className="w-8 h-8" /></div>
                )}
                <div className="absolute top-2 left-2 flex gap-1">
                    <button onClick={onSelect} className={cn('w-8 h-8 rounded-full flex items-center justify-center', selected ? 'bg-luxPink text-white' : 'bg-white/90 text-gray-600 hover:bg-luxPink hover:text-white')}>
                        {selected ? <Check className="w-4 h-4" /> : <span className="w-4 h-4 border-2 border-gray-300 rounded-full" />}
                    </button>
                </div>
                <div className="absolute top-2 right-2">
                    <button onClick={onDelete} className="w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500 flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                </div>
            </div>
            <div className="p-3 space-y-1">
                <p className="font-medium text-gray-900 truncate text-sm">{asset.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className={cn('px-2 py-0.5 rounded-full', asset.type === 'image' ? 'bg-blue-100 text-blue-700' : asset.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700')}>{asset.type}</span>
                    <span>{(asset.size / 1024).toFixed(1)} KB</span>
                </div>
            </div>
        </div>
    );
}