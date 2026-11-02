'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Mail, Phone, MapPin, Calendar, Users, MessageSquare, ChevronDown, MoreVertical, Edit, Trash2, ExternalLink, Copy, CheckCircle, XCircle, DollarSign, Link } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { cn, formatDate, generateWhatsAppUrl } from '@/lib/utils';

interface Enquiry {
    id: string;
    villa_id: string | null;
    villa?: { id: string; name: string; code_name: string; slug: string };
    name: string;
    phone: string;
    email: string | null;
    check_in: string | null;
    check_out: string | null;
    guests: number | null;
    message: string | null;
    status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'BOOKED' | 'LOST';
    source: string | null;
    created_at: string;
    updated_at: string;
}

const statuses: { value: Enquiry['status']; label: string; color: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: 'NEW', label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: MessageSquare },
    { value: 'CONTACTED', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Phone },
    { value: 'QUOTED', label: 'Quoted', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: DollarSign },
    { value: 'BOOKED', label: 'Booked', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
    { value: 'LOST', label: 'Lost', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
];

const statusColors: Record<Enquiry['status'], string> = {
    NEW: 'bg-blue-100 text-blue-700',
    CONTACTED: 'bg-yellow-100 text-yellow-700',
    QUOTED: 'bg-purple-100 text-purple-700',
    BOOKED: 'bg-green-100 text-green-700',
    LOST: 'bg-red-100 text-red-700',
};

export default function AdminEnquiriesClient() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ limit: '100' });
            if (statusFilter) params.set('status', statusFilter);
            const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
            const data = await res.json();
            setEnquiries(data.enquiries || []);
        } catch (err) { console.error('Failed to fetch enquiries:', err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchEnquiries(); }, [statusFilter]);

    const handleStatusChange = async (id: string, newStatus: Enquiry['status']) => {
        setUpdatingId(id);
        try {
            const res = await fetch('/api/admin/enquiries', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (res.ok) fetchEnquiries();
        } catch (err) { alert('Failed to update status'); }
        finally { setUpdatingId(null); }
    };

    const openWhatsApp = (enquiry: Enquiry) => {
        const msg = `Hi ${enquiry.name}! This is SEASALT Hospitality regarding your enquiry about ${enquiry.villa?.code_name || 'a villa'}.

📅 Check-in: ${enquiry.check_in || 'Flexible'}
📅 Check-out: ${enquiry.check_out || 'Flexible'}
👥 Guests: ${enquiry.guests || 'Not specified'}

We'd love to help you with your booking!`;

        window.open(generateWhatsAppUrl('919399344077', msg), '_blank');
    };

    const openDetail = (enquiry: Enquiry) => {
        setSelectedEnquiry(enquiry);
        setShowDetailModal(true);
    };

    const filteredEnquiries = enquiries.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.phone.includes(search) ||
        e.email?.toLowerCase().includes(search.toLowerCase()) ||
        e.villa?.name.toLowerCase().includes(search.toLowerCase())
    );

    const groupedEnquiries = statuses.map(s => ({
        ...s,
        items: filteredEnquiries.filter(e => e.status === s.value),
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
                    <p className="text-gray-600 mt-1">Manage customer enquiries and bookings</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search enquiries..." className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" />
                    </div>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink">
                        <option value="">All Status</option>
                        {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-4">
                {groupedEnquiries.map((column) => (
                    <div key={column.value} className="min-w-[320px] max-w-[320px] flex flex-col">
                        <div className={cn('px-4 py-3 rounded-t-xl border-b', column.color.replace('bg-', 'bg-').replace('text-', 'text-'))}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <column.icon className={cn('w-5 h-5', column.color.replace('bg-', 'text-').replace('border-', ''))} />
                                    <span className="font-semibold text-sm">{column.label}</span>
                                </div>
                                <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', column.color)}>{column.items.length}</span>
                            </div>
                        </div>
                        <div className="flex-1 p-3 space-y-3 bg-gray-50 rounded-b-xl min-h-[400px] max-h-[600px] overflow-y-auto">
                            {column.items.length === 0 ? (
                                <p className="text-center text-gray-400 text-sm py-8">No enquiries</p>
                            ) : (
                                column.items.map((enquiry) => (
                                    <EnquiryCard
                                        key={enquiry.id}
                                        enquiry={enquiry}
                                        onStatusChange={handleStatusChange}
                                        onDetail={openDetail}
                                        onWhatsApp={openWhatsApp}
                                        updating={updatingId === enquiry.id}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Enquiry Details" size="lg" showCloseButton>
                {selectedEnquiry && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900">{selectedEnquiry.name}</h3>
                                <p className="text-sm text-gray-500">{selectedEnquiry.villa?.code_name || 'General Enquiry'}</p>
                            </div>
                            <span className={cn('px-3 py-1 rounded-full text-xs font-medium', statusColors[selectedEnquiry.status])}>
                                {statuses.find(s => s.value === selectedEnquiry.status)?.label}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="text-gray-500">Phone</span><p className="font-medium">{selectedEnquiry.phone}</p></div>
                            <div><span className="text-gray-500">Email</span><p className="font-medium">{selectedEnquiry.email || 'Not provided'}</p></div>
                            <div><span className="text-gray-500">Check-in</span><p className="font-medium">{selectedEnquiry.check_in ? formatDate(selectedEnquiry.check_in) : 'Flexible'}</p></div>
                            <div><span className="text-gray-500">Check-out</span><p className="font-medium">{selectedEnquiry.check_out ? formatDate(selectedEnquiry.check_out) : 'Flexible'}</p></div>
                            <div><span className="text-gray-500">Guests</span><p className="font-medium">{selectedEnquiry.guests || 'Not specified'}</p></div>
                            <div><span className="text-gray-500">Source</span><p className="font-medium">{selectedEnquiry.source || 'Website'}</p></div>
                            <div className="col-span-2"><span className="text-gray-500">Created</span><p className="font-medium">{formatDate(selectedEnquiry.created_at)}</p></div>
                        </div>

                        {selectedEnquiry.message && (
                            <div>
                                <span className="text-gray-500 text-sm">Message</span>
                                <p className="mt-1 p-3 bg-gray-50 rounded-xl text-sm">{selectedEnquiry.message}</p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                            <Button onClick={() => openWhatsApp(selectedEnquiry)} className="flex-1 bg-green-500 hover:bg-green-600">
                                <MessageSquare className="w-4 h-4 mr-2" /> Reply on WhatsApp
                            </Button>
                            <Button variant="outline" onClick={() => { if (selectedEnquiry.villa) window.open(`/villas/${selectedEnquiry.villa.slug}`, '_blank'); }}>
                                <ExternalLink className="w-4 h-4 mr-2" /> View Villa
                            </Button>
                        </div>

                        <div className="pt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                            <div className="flex flex-wrap gap-2">
                                {statuses.map(s => (
                                    <Button
                                        key={s.value}
                                        variant={selectedEnquiry.status === s.value ? 'secondary' : 'outline'}
                                        size="sm"
                                        onClick={() => handleStatusChange(selectedEnquiry.id, s.value)}
                                        disabled={updatingId === selectedEnquiry.id}
                                    >
                                        <s.icon className="w-3.5 h-3.5 mr-1.5" /> {s.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

function EnquiryCard({ enquiry, onStatusChange, onDetail, onWhatsApp, updating }: { enquiry: Enquiry; onStatusChange: (id: string, status: Enquiry['status']) => void; onDetail: (e: Enquiry) => void; onWhatsApp: (e: Enquiry) => void; updating: boolean }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{enquiry.name}</p>
                    <p className="text-xs text-gray-500 truncate">{enquiry.villa?.code_name || 'General Enquiry'}</p>
                </div>
                <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', statusColors[enquiry.status])}>
                    {statuses.find(s => s.value === enquiry.status)?.label}
                </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /><span>{enquiry.phone}</span></div>
                {enquiry.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /><span className="truncate">{enquiry.email}</span></div>}
                {(enquiry.check_in || enquiry.check_out) && (
                    <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /><span>{enquiry.check_in ? formatDate(enquiry.check_in) : 'Flexible'} - {enquiry.check_out ? formatDate(enquiry.check_out) : 'Flexible'}</span></div>
                )}
                {enquiry.guests && <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /><span>{enquiry.guests} Guests</span></div>}
            </div>

            {enquiry.message && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs line-clamp-2">{enquiry.message}</div>
            )}

            <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => onDetail(enquiry)}><MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Details</Button>
                <Button variant="secondary" size="sm" className="flex-1" onClick={() => onWhatsApp(enquiry)}><ExternalLink className="w-3.5 h-3.5 mr-1.5" /> WhatsApp</Button>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
                <label className="text-xs text-gray-500 mb-1 block">Quick Status</label>
                <div className="flex gap-1">
                    {statuses.map(s => (
                        <button
                            key={s.value}
                            onClick={() => !updating && onStatusChange(enquiry.id, s.value)}
                            disabled={updating}
                            className={cn('flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors', enquiry.status === s.value ? s.color : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200')}
                        >
                            <s.icon className="w-3 h-3 mr-1 inline-block" /> {s.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}