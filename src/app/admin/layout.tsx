'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Building2, MapPin, Settings, FileText, 
    Users, MessageSquare, Image as ImageIcon, LogOut, Menu, X,
    ChevronDown, Home, Shield, BarChart2, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Villas', href: '/admin/villas', icon: Building2, badge: '12' },
    { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
    { name: 'Amenities', href: '/admin/amenities', icon: Settings },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare, badge: '5' },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0',
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3 p-6 border-b border-gray-100">
                        <Link href="/admin/dashboard" className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full border border-luxPink/20 bg-luxPink/10 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-luxPink" />
                            </div>
                            <div>
                                <span className="block text-lg font-bold tracking-[0.26em] text-gray-900 leading-none">SEASALT</span>
                                <span className="block text-[10px] font-medium tracking-[0.35em] text-luxPink mt-0.5">ADMIN</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Admin navigation">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || 
                                (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                                        isActive
                                            ? 'bg-luxPink/10 text-luxPink'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    )}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-luxPink')} />
                                    <span className="truncate">{item.name}</span>
                                    {item.badge && (
                                        <span className={cn(
                                            'ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold',
                                            isActive ? 'bg-luxPink text-white' : 'bg-gray-100 text-gray-600'
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User section */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-luxPink/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-luxPink" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </div>
                        <Link 
                            href="/admin/login?logout=true" 
                            className="flex items-center gap-2 w-full mt-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">
                                {navigation.find(n => pathname === n.href || pathname.startsWith(n.href))?.name || 'Admin'}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link 
                                href="/" 
                                target="_blank"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                View Site
                            </Link>
                            <div className="w-px h-6 bg-gray-200 hidden sm:block" />
                            <Link 
                                href="/admin/villas?create=true"
                                className="flex items-center gap-2 px-4 py-2 bg-luxPink text-white rounded-xl text-sm font-semibold hover:bg-luxPinkHover transition-all shadow-lux"
                            >
                                <Plus className="w-4 h-4" />
                                Add Villa
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}