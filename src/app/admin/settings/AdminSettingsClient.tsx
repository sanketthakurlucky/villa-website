'use client';

import { useState } from 'react';
import { Save, TestTube, Globe, Mail, Phone, Shield, Bell, Key, Database, Cloud, Palette, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface SettingsTab {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

const tabs: SettingsTab[] = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'whatsapp', label: 'WhatsApp', icon: Phone },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'social', label: 'Social', icon: Globe },
    { id: 'integrations', label: 'Integrations', icon: Cloud },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function AdminSettingsClient() {
    const [activeTab, setActiveTab] = useState('general');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [settings, setSettings] = useState({
        site_name: 'SEASALT Hospitality',
        site_tagline: 'Curated Luxury Villas & Private Stays',
        site_description: 'Discover handpicked luxury villas across India with private pools, in-house chefs, and personalized concierge service.',
        contact_email: 'info@seasalthospitality.com',
        contact_phone: '+91 93993 44077',
        contact_address: 'Goa, India',
        whatsapp_number: '919399344077',
        whatsapp_default_message: 'Hi SEASALT Hospitality! I would like to enquire about a villa booking.',
        meta_title: 'SEASALT Hospitality | Curated Luxury Villas & Private Stays',
        meta_description: 'Discover handpicked luxury villas across India with private pools, in-house chefs, and personalized concierge service.',
        og_image: '',
        twitter_handle: '@seasalthospitality',
        facebook_url: 'https://facebook.com/seasalthospitality',
        instagram_url: 'https://instagram.com/seasalthospitality',
        youtube_url: 'https://youtube.com/seasalthospitality',
        google_analytics_id: '',
        google_search_console_id: '',
        recaptcha_site_key: '',
        recaptcha_secret_key: '',
        resend_api_key: '',
        email_from: 'noreply@seasalthospitality.com',
        cloudflare_r2_account_id: '',
        cloudflare_r2_access_key: '',
        cloudflare_r2_secret_key: '',
        cloudflare_r2_bucket: 'seasalt-assets',
        cloudflare_r2_public_url: '',
    });

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const tabContents: Record<string, React.ReactNode> = {
        general: (
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Site Identity</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="Site Name" value={settings.site_name} onChange={(e) => handleChange('site_name', e.target.value)} />
                        <Input label="Tagline" value={settings.site_tagline} onChange={(e) => handleChange('site_tagline', e.target.value)} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                            <textarea value={settings.site_description} onChange={(e) => handleChange('site_description', e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        ),
        contact: (
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="Email" type="email" value={settings.contact_email} onChange={(e) => handleChange('contact_email', e.target.value)} />
                        <Input label="Phone" value={settings.contact_phone} onChange={(e) => handleChange('contact_phone', e.target.value)} />
                        <Input label="Address" value={settings.contact_address} onChange={(e) => handleChange('contact_address', e.target.value)} />
                    </CardContent>
                </Card>
            </div>
        ),
        whatsapp: (
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>WhatsApp Integration</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="WhatsApp Number (with country code)" value={settings.whatsapp_number} onChange={(e) => handleChange('whatsapp_number', e.target.value)} placeholder="919399344077" />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Message Template</label>
                            <textarea value={settings.whatsapp_default_message} onChange={(e) => handleChange('whatsapp_default_message', e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" />
                        </div>
                        <p className="text-sm text-gray-500">Use {'{name}'}, {'{villa}'}, {'{checkin}'}, {'{checkout}'}, {'{guests}'} as placeholders</p>
                    </CardContent>
                </Card>
            </div>
        ),
        seo: (
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>SEO Settings</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="Meta Title" value={settings.meta_title} onChange={(e) => handleChange('meta_title', e.target.value)} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label>
                            <textarea value={settings.meta_description} onChange={(e) => handleChange('meta_description', e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink" />
                        </div>
                        <Input label="Open Graph Image URL" value={settings.og_image} onChange={(e) => handleChange('og_image', e.target.value)} placeholder="https://..." />
                        <Input label="Twitter Handle" value={settings.twitter_handle} onChange={(e) => handleChange('twitter_handle', e.target.value)} />
                        <Input label="Google Analytics ID" value={settings.google_analytics_id} onChange={(e) => handleChange('google_analytics_id', e.target.value)} placeholder="G-XXXXXXXXXX" />
                        <Input label="Google Search Console ID" value={settings.google_search_console_id} onChange={(e) => handleChange('google_search_console_id', e.target.value)} />
                    </CardContent>
                </Card>
            </div>
        ),
        social: (
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Social Media Links</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="Facebook URL" value={settings.facebook_url} onChange={(e) => handleChange('facebook_url', e.target.value)} placeholder="https://facebook.com/..." />
                        <Input label="Instagram URL" value={settings.instagram_url} onChange={(e) => handleChange('instagram_url', e.target.value)} placeholder="https://instagram.com/..." />
                        <Input label="YouTube URL" value={settings.youtube_url} onChange={(e) => handleChange('youtube_url', e.target.value)} placeholder="https://youtube.com/..." />
                    </CardContent>
                </Card>
            </div>
        ),
        integrations: (
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Cloudflare R2 (Media CDN)</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="Account ID" value={settings.cloudflare_r2_account_id} onChange={(e) => handleChange('cloudflare_r2_account_id', e.target.value)} />
                        <Input label="Access Key ID" value={settings.cloudflare_r2_access_key} onChange={(e) => handleChange('cloudflare_r2_access_key', e.target.value)} />
                        <Input label="Secret Access Key" type="password" value={settings.cloudflare_r2_secret_key} onChange={(e) => handleChange('cloudflare_r2_secret_key', e.target.value)} />
                        <Input label="Bucket Name" value={settings.cloudflare_r2_bucket} onChange={(e) => handleChange('cloudflare_r2_bucket', e.target.value)} />
                        <Input label="Public URL" value={settings.cloudflare_r2_public_url} onChange={(e) => handleChange('cloudflare_r2_public_url', e.target.value)} placeholder="https://pub-xxx.r2.dev" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Email (Resend)</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="API Key" type="password" value={settings.resend_api_key} onChange={(e) => handleChange('resend_api_key', e.target.value)} />
                        <Input label="From Email" value={settings.email_from} onChange={(e) => handleChange('email_from', e.target.value)} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>reCAPTCHA</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="Site Key" value={settings.recaptcha_site_key} onChange={(e) => handleChange('recaptcha_site_key', e.target.value)} />
                        <Input label="Secret Key" type="password" value={settings.recaptcha_secret_key} onChange={(e) => handleChange('recaptcha_secret_key', e.target.value)} />
                    </CardContent>
                </Card>
            </div>
        ),
        security: (
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-500">Require 2FA for all admin users</p>
                            </div>
                            <Button variant="outline" size="sm">Enable</Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Session Timeout</p>
                                <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                            </div>
                            <select className="px-4 py-2 border border-gray-200 rounded-xl w-48">
                                <option>30 minutes</option>
                                <option>1 hour</option>
                                <option>4 hours</option>
                                <option>8 hours</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        ),
        notifications: (
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { label: 'New Enquiry', desc: 'Email notification for new enquiries' },
                            { label: 'Booking Confirmed', desc: 'Email when enquiry status changes to Booked' },
                            { label: 'Low Stock Alerts', desc: 'Notify when villa availability is low' },
                            { label: 'Weekly Report', desc: 'Weekly summary of enquiries and bookings' },
                            { label: 'System Alerts', desc: 'Critical system notifications' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">{item.label}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-luxPink/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-luxPink"></div>
                                </label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        ),
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your platform configuration</p>
                </div>
                <div className="flex gap-3">
                    {saved && <span className="flex items-center gap-2 text-green-600 text-sm"><CheckCircle className="w-4 h-4" /> Saved!</span>}
                    <Button onClick={handleSave} disabled={saving} className="min-w-[140px]">
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Tabs */}
                <Card className="lg:w-64 flex-shrink-0 sticky top-28">
                    <nav className="p-2" aria-label="Settings sections">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                                    activeTab === tab.id
                                        ? 'bg-luxPink/10 text-luxPink'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )}
                            >
                                <tab.icon className="w-5 h-5 flex-shrink-0" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </Card>

                {/* Content */}
                <div className="flex-1">
                    {tabContents[activeTab]}
                </div>
            </div>
        </div>
    );
}

import { CheckCircle } from 'lucide-react';