'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    MapPin, Star, Users, Bath, ChevronLeft, ChevronRight, X,
    Share2, Heart, FileText, PhoneCall, Waves, Flame, Utensils,
    Sparkles, Dumbbell, Shield, Wifi, Wind, Coffee, Sunrise,
    Car, Droplet, ChefHat, TreePine, Mountain, Calendar, Check, X as XIcon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { cn, formatPrice, formatDate, generateWhatsAppUrl } from '@/lib/utils';
import { VillaStructuredData } from '@/components/seo/StructuredData';

interface VillaDetailClientProps {
    villa: any;
}

export default function VillaDetailClient({ villa }: VillaDetailClientProps) {
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [enquiryData, setEnquiryData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 2,
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    const allImages = [
        villa.cover_image,
        ...(villa.gallery_images || []),
    ].filter(Boolean);

    const mainImage = allImages[mainImageIndex] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80';

    const handleEnquirySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const msg = `Hi SEASALT Hospitality! I want to enquire about *${villa.code_name || villa.name}*.

📅 Check-in: ${enquiryData.checkIn || 'Flexible'}
📅 Check-out: ${enquiryData.checkOut || 'Flexible'}
👥 Guests: ${enquiryData.guests}
👤 Name: ${enquiryData.name}
📱 Phone: ${enquiryData.phone}
📧 Email: ${enquiryData.email || 'Not provided'}

${enquiryData.message ? `💬 Message: ${enquiryData.message}` : ''}

Please share live availability and final price.`;

        window.open(generateWhatsAppUrl('919399344077', msg), '_blank');
        setShowEnquiryModal(false);
    };

    return (
        <>
            <VillaStructuredData villa={villa} />
            <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <nav className="border-b border-gray-100 bg-white sticky top-0 z-30" aria-label="Breadcrumb">
                <div className="container-main px-4 py-3">
                    <ol className="flex items-center gap-2 text-sm text-gray-500">
                        <li><Link href="/" className="hover:text-luxPink">Home</Link></li>
                        <li>/</li>
                        <li><Link href="/villas" className="hover:text-luxPink">Villas</Link></li>
                        <li>/</li>
                        <li><Link href={`/villas?location=${villa.destination?.slug}`} className="hover:text-luxPink">{villa.destination?.name}</Link></li>
                        <li>/</li>
                        <li className="text-gray-900 truncate max-w-[200px]">{villa.code_name || villa.name}</li>
                    </ol>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container-main py-10 lg:py-16">
                {/* Image Gallery */}
                <div className="mb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-7">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                                <Image
                                    src={mainImage}
                                    alt={villa.name}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 58vw"
                                />
                                {allImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setMainImageIndex(prev => (prev - 1 + allImages.length) % allImages.length)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white shadow-lg transition-all"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={() => setMainImageIndex(prev => (prev + 1) % allImages.length)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white shadow-lg transition-all"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => setShowLightbox(true)}
                                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white shadow-lg transition-all"
                                    aria-label="Open fullscreen gallery"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                        <line x1="12" y1="22.08" x2="12" y2="12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Thumbnails */}
                            {allImages.length > 1 && (
                                <div className="grid grid-cols-6 gap-3 mt-4">
                                    {allImages.slice(0, 6).map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setMainImageIndex(i)}
                                            className={cn(
                                                'relative aspect-square rounded-xl overflow-hidden border-2 transition-all',
                                                mainImageIndex === i ? 'border-luxPink' : 'border-transparent hover:border-gray-300'
                                            )}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${villa.name} ${i + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                            {mainImageIndex === i && (
                                                <div className="absolute inset-0 bg-luxPink/20 flex items-center justify-center">
                                                    <Check className="w-6 h-6 text-luxPink" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                    {allImages.length > 6 && (
                                        <button
                                            className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-gray-300 bg-gray-100 flex items-center justify-center"
                                            onClick={() => setShowLightbox(true)}
                                        >
                                            <span className="text-xl font-bold text-gray-500">+{allImages.length - 6}</span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sticky Enquiry Widget */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-28 bg-white border border-gray-200 rounded-3xl p-6 shadow-lg">
                                <div className="flex items-end justify-between border-b border-gray-100 pb-4 mb-5">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{formatPrice(villa.base_price)}</p>
                                        <p className="text-sm text-gray-500">Per Night + Taxes</p>
                                    </div>
                                    <Button variant="ghost" size="sm">View price breakdown</Button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="border border-gray-200 rounded-xl p-3">
                                        <label className="block text-xs text-gray-500">Check-In</label>
                                        <input
                                            type="date"
                                            value={enquiryData.checkIn}
                                            onChange={(e) => setEnquiryData(prev => ({ ...prev, checkIn: e.target.value }))}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full text-sm font-medium text-gray-900 focus:outline-none mt-1 bg-transparent"
                                        />
                                    </div>
                                    <div className="border border-gray-200 rounded-xl p-3">
                                        <label className="block text-xs text-gray-500">Checkout</label>
                                        <input
                                            type="date"
                                            value={enquiryData.checkOut}
                                            onChange={(e) => setEnquiryData(prev => ({ ...prev, checkOut: e.target.value }))}
                                            min={enquiryData.checkIn || new Date().toISOString().split('T')[0]}
                                            className="w-full text-sm font-medium text-gray-900 focus:outline-none mt-1 bg-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-xl p-3 mb-4">
                                    <label className="block text-xs text-gray-500">Guests</label>
                                    <select
                                        value={enquiryData.guests}
                                        onChange={(e) => setEnquiryData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                                        className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent mt-1"
                                    >
                                        {[2, 4, 6, 8, 10, 12, 14, 16].map(g => (
                                            <option key={g} value={g}>{g} Guests</option>
                                        ))}
                                    </select>
                                </div>

                                <Button className="w-full" onClick={() => setShowEnquiryModal(true)} size="lg">
                                    Enquire Now on WhatsApp
                                </Button>

                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-sm text-gray-600">
                                    <a href="https://wa.me/919399344077" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-luxPink">
                                        <PhoneCall className="w-4 h-4" />
                                        Call Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Villa Details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-12">
                        {/* Title & Location */}
                        <div>
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{villa.code_name || villa.name}</h1>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                                        <MapPin className="w-4 h-4" /> {villa.destination?.name}, India
                                    </p>
                                    <div className="flex items-center gap-3 mt-3 text-sm">
                                        <span className="font-bold text-gray-900 flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.8/5
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <Link href="#reviews" className="text-luxTeal underline font-medium">100+ reviews</Link>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-1.5" /> Share</Button>
                                    <Button variant="ghost" size="sm"><Heart className="w-4 h-4 mr-1.5" /> Save</Button>
                                    <Button variant="outline" size="sm" onClick={() => setShowEnquiryModal(true)}><FileText className="w-4 h-4 mr-1.5" /> Brochure</Button>
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700">
                                <span>{villa.bedrooms} BHK</span>
                                <span className="text-gray-300">|</span>
                                <span>{villa.bathrooms} Baths</span>
                                <span className="text-gray-300">|</span>
                                <span>Up to {villa.max_guests} Guests</span>
                                <span className="text-gray-300">|</span>
                                <span>Meals Available</span>
                            </div>
                        </div>

                        {/* Quick Amenities */}
                        <div className="flex flex-wrap items-center gap-3">
                            {(villa.amenities || []).slice(0, 8).map((amenity: any, i: number) => (
                                <div key={i} className="border border-gray-200 rounded-2xl p-3 w-24 text-center">
                                    <amenity.icon className="w-5 h-5 mx-auto mb-1.5 text-gray-600" />
                                    <span className="text-xs text-gray-600 block leading-tight">{amenity.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Features Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border border-gray-200 rounded-2xl p-4 flex items-start gap-3">
                                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200"><Utensils className="w-5 h-5 text-gray-700" /></div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">Food Service</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">Home cooked meals with local ingredients</p>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-2xl p-4 flex items-start gap-3">
                                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200"><Shield className="w-5 h-5 text-gray-700" /></div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">24/7 Support</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">Dedicated caretaker and concierge on-site</p>
                                </div>
                            </div>
                        </div>

                        {/* Connect with Host */}
                        <div className="bg-luxTeal text-white rounded-2xl p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center">
                                    <PhoneCall className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="font-medium text-sm block">Connect with Director — Sanket Thakur</span>
                                    <span className="text-xs text-white/80">SEASALT Hospitality Concierge Desk</span>
                                </div>
                            </div>
                            <Button onClick={() => setShowEnquiryModal(true)} variant="secondary">
                                Request Call Back
                            </Button>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3 border-l-2 border-luxPink pl-3">
                                {villa.name} in <span className="script-accent font-normal text-luxPink">{villa.destination?.name}</span>
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                {villa.description || 'Experience luxury living in this beautifully appointed villa with premium amenities and personalized service.'}
                            </p>
                            <Button onClick={() => setShowEnquiryModal(true)} size="lg">
                                Explore your stay
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        {/* Policies */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 border-l-2 border-luxPink pl-3">
                                Rules and <span className="script-accent font-normal text-luxPink">Policies</span>
                            </h2>
                            <div className="flex items-center justify-between max-w-md mb-6 text-sm">
                                <div className="text-center">
                                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2"><Check className="w-5 h-5" /></div>
                                    <p className="font-semibold text-gray-800">80% Future Stay Voucher</p>
                                    <p className="text-gray-500 text-xs">50% Refund</p>
                                    <p className="text-gray-400 text-[10px]">Before 7 days of Check-in</p>
                                </div>
                                <div className="flex-1 border-t border-dashed border-gray-300 mx-4"></div>
                                <div className="text-center">
                                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-2"><XIcon className="w-5 h-5" /></div>
                                    <p className="font-semibold text-gray-800">No Refund</p>
                                    <p className="text-gray-400 text-[10px]">Within 7 days of Check-in</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                                Check-in: <strong className="text-gray-900">{villa.check_in || '02:00 PM'}</strong> | Check-out: <strong className="text-gray-900">{villa.check_out || '11:00 AM'}</strong>
                            </p>
                            {villa.house_rules && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                    <h4 className="font-semibold text-gray-900 mb-2">House Rules</h4>
                                    <p className="text-sm text-gray-600">{villa.house_rules}</p>
                                </div>
                            )}
                            {villa.cancellation_policy && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                    <h4 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h4>
                                    <p className="text-sm text-gray-600">{villa.cancellation_policy}</p>
                                </div>
                            )}
                        </div>

                        {/* Amenities Grid */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-5 border-l-2 border-luxPink pl-3">
                                Villa <span className="script-accent font-normal text-luxPink">Amenities</span>
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
                                {(villa.amenities || []).map((amenity: any, i: number) => (
                                    <div key={i} className="border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                                        <amenity.icon className="w-4 h-4 text-gray-500" />
                                        <span>{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Nearby Villas */}
                    {(villa.nearbyVillas || []).length > 0 && (
                        <section className="mt-16 pt-10 border-t border-gray-100">
                            <h2 className="text-2xl font-semibold mb-6 border-l-2 border-luxPink pl-3">
                                Nearby <span className="script-accent font-normal text-luxPink">Villas</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {villa.nearbyVillas.map((nearby: any, i: number) => (
                                    <Link key={nearby.id} href={`/villas/${nearby.slug}`} className="group">
                                        <Card className="overflow-hidden h-full hover:shadow-card-hover transition-shadow" padding="none">
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={nearby.cover_image || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'}
                                                    alt={nearby.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                />
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-luxPink transition-colors line-clamp-1">{nearby.code_name || nearby.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {nearby.destination?.name}</p>
                                                <p className="text-xs text-gray-400 mt-1">{nearby.bedrooms} BHK • {nearby.max_guests} Guests</p>
                                                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                                                    <p className="text-lg font-bold text-gray-900">{formatPrice(nearby.base_price)}</p>
                                                    <span className="text-xs text-gray-400">/night</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Lightbox Modal */}
                <Modal
                    isOpen={showLightbox}
                    onClose={() => setShowLightbox(false)}
                    size="full"
                    showCloseButton
                >
                    <div className="relative h-[80vh]">
                        <Image
                            src={allImages[mainImageIndex]}
                            alt={villa.name}
                            fill
                            className="object-contain"
                            priority
                        />
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={() => setMainImageIndex(prev => (prev - 1 + allImages.length) % allImages.length)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white shadow-lg"
                                >
                                    <ChevronLeft className="w-7 h-7" />
                                </button>
                                <button
                                    onClick={() => setMainImageIndex(prev => (prev + 1) % allImages.length)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white shadow-lg"
                                >
                                    <ChevronRight className="w-7 h-7" />
                                </button>
                            </>
                        )}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {allImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImageIndex(i)}
                                    className={cn(
                                        'w-20 h-12 rounded-lg overflow-hidden border-2',
                                        mainImageIndex === i ? 'border-luxPink' : 'border-transparent'
                                    )}
                                >
                                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                                </button>
                            ))}
                        </div>
                    </div>
                </Modal>

                {/* Enquiry Modal */}
                <Modal
                    isOpen={showEnquiryModal}
                    onClose={() => setShowEnquiryModal(false)}
                    title="Enquire on WhatsApp"
                    description="Fill in your details and we'll connect you with our concierge team"
                    size="lg"
                >
                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                                <input
                                    type="date"
                                    value={enquiryData.checkIn}
                                    onChange={(e) => setEnquiryData(prev => ({ ...prev, checkIn: e.target.value }))}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                                <input
                                    type="date"
                                    value={enquiryData.checkOut}
                                    onChange={(e) => setEnquiryData(prev => ({ ...prev, checkOut: e.target.value }))}
                                    min={enquiryData.checkIn || new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                            <select
                                value={enquiryData.guests}
                                onChange={(e) => setEnquiryData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                            >
                                {[2, 4, 6, 8, 10, 12, 14, 16].map(g => <option key={g} value={g}>{g} Guests</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={enquiryData.name}
                                onChange={(e) => setEnquiryData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="flex">
                                <span className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-l-xl text-gray-600">+91</span>
                                <input
                                    type="tel"
                                    value={enquiryData.phone}
                                    onChange={(e) => setEnquiryData(prev => ({ ...prev, phone: e.target.value }))}
                                    placeholder="93993 44077"
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                            <input
                                type="email"
                                value={enquiryData.email}
                                onChange={(e) => setEnquiryData(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                            <textarea
                                value={enquiryData.message}
                                onChange={(e) => setEnquiryData(prev => ({ ...prev, message: e.target.value }))}
                                rows={3}
                                placeholder="Any special requirements, occasions, dietary needs..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink resize-y"
                            />
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                            Send on WhatsApp
                        </Button>
                    </form>
                </Modal>
            </main>
        </div>
    </>
    );
}