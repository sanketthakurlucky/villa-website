'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
    MapPin, Calendar, Users, ChevronDown, ChevronLeft, ChevronRight,
    Filter, X, Map, Layout, Star, Waves, Flame, Utensils, Shield,
    Wifi, Wind, Coffee, Bath, Car, Sparkles, Dumbbell, Sunrise,
    Droplet, ChefHat, Dog, Baby, Heart, Zap, Mountain, TreePine
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { cn, formatPrice } from '@/lib/utils';

const amenities = [
    { name: 'Private Pool', icon: Waves, category: 'Outdoor' },
    { name: 'Jacuzzi', icon: Flame, category: 'Outdoor' },
    { name: 'In-house Chef', icon: Utensils, category: 'Services' },
    { name: 'Butler Service', icon: Users, category: 'Services' },
    { name: 'Caretaker Onsite', icon: Shield, category: 'Services' },
    { name: 'Housekeeping', icon: Sparkles, category: 'Services' },
    { name: 'Free WiFi', icon: Wifi, category: 'Amenities' },
    { name: 'Air Conditioning', icon: Wind, category: 'Amenities' },
    { name: 'Breakfast Included', icon: Coffee, category: 'Food' },
    { name: 'Meals Available', icon: Utensils, category: 'Food' },
    { name: 'Parking', icon: Car, category: 'Amenities' },
    { name: 'Garden/Lawn', icon: TreePine, category: 'Outdoor' },
    { name: 'Rooftop Terrace', icon: Sunrise, category: 'Outdoor' },
    { name: 'Games Room', icon: Dumbbell, category: 'Entertainment' },
    { name: 'Gym', icon: Dumbbell, category: 'Wellness' },
    { name: 'Spa/Sauna', icon: Flame, category: 'Wellness' },
    { name: 'Beach Access', icon: Waves, category: 'Location' },
    { name: 'Mountain View', icon: Mountain, category: 'Location' },
    { name: 'Pet Friendly', icon: Dog, category: 'Policy' },
    { name: 'Family Friendly', icon: Baby, category: 'Policy' },
    { name: 'Romantic Getaway', icon: Heart, category: 'Vibe' },
    { name: 'Workation Ready', icon: Zap, category: 'Vibe' },
];

const collections = [
    { name: 'Private Pool Villas', icon: Waves, count: 156, tag: 'private-pool' },
    { name: 'Pet-Friendly Villas', icon: Dog, count: 89, tag: 'pet-friendly' },
    { name: 'Wedding & Celebration', icon: Heart, count: 67, tag: 'weddings' },
    { name: 'Workation & Long Stays', icon: Zap, count: 45, tag: 'workation' },
    { name: 'Family & Kid-Friendly', icon: Baby, count: 78, tag: 'family' },
    { name: 'Romantic Getaway', icon: Heart, count: 54, tag: 'romantic' },
    { name: 'Beachfront Villas', icon: Waves, count: 34, tag: 'beachfront' },
    { name: 'Mountain & Hill Station', icon: Mountain, count: 42, tag: 'mountain' },
];

export default function VillaListingClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [location, setLocation] = useState(searchParams.get('location') || '');
    const [checkIn, setCheckIn] = useState(searchParams.get('checkin') || '');
    const [checkOut, setCheckOut] = useState(searchParams.get('checkout') || '');
    const [guests, setGuests] = useState(searchParams.get('guests') || '2');
    const [minBedrooms, setMinBedrooms] = useState(searchParams.get('bhk') || '');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 150000 });
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
        searchParams.get('amenities')?.split(',').filter(Boolean) || []
    );
    const [selectedTags, setSelectedTags] = useState<string[]>(
        searchParams.get('tags')?.split(',').filter(Boolean) || []
    );
    const [featured, setFeatured] = useState(searchParams.get('featured') === 'true');
    const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

    const [villas, setVillas] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const limit = 12;

    const [showFilters, setShowFilters] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);

    const fetchVillas = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (location) params.set('location', location);
        if (checkIn) params.set('checkin', checkIn);
        if (checkOut) params.set('checkout', checkOut);
        if (guests) params.set('guests', guests);
        if (minBedrooms) params.set('bhk', minBedrooms);
        if (priceRange.max < 150000) params.set('price_max', priceRange.max.toString());
        if (priceRange.min > 0) params.set('price_min', priceRange.min.toString());
        if (selectedAmenities.length) params.set('amenities', selectedAmenities.join(','));
        if (selectedTags.length) params.set('tags', selectedTags.join(','));
        if (featured) params.set('featured', 'true');
        params.set('sort', sort);
        params.set('limit', limit.toString());
        params.set('offset', offset.toString());

        try {
            const res = await fetch(`/api/villas?${params.toString()}`);
            const data = await res.json();
            if (offset === 0) {
                setVillas(data.villas);
            } else {
                setVillas(prev => [...prev, ...data.villas]);
            }
            setTotal(data.total);
        } catch (err) {
            console.error('Failed to fetch villas:', err);
        } finally {
            setLoading(false);
        }
    }, [location, checkIn, checkOut, guests, minBedrooms, priceRange, selectedAmenities, selectedTags, featured, sort, offset, limit]);

    useEffect(() => {
        fetchVillas();
    }, [fetchVillas]);

    const updateURL = () => {
        const params = new URLSearchParams();
        if (location) params.set('location', location);
        if (checkIn) params.set('checkin', checkIn);
        if (checkOut) params.set('checkout', checkOut);
        if (guests && guests !== '2') params.set('guests', guests);
        if (minBedrooms) params.set('bhk', minBedrooms);
        if (priceRange.max < 150000) params.set('price_max', priceRange.max.toString());
        if (priceRange.min > 0) params.set('price_min', priceRange.min.toString());
        if (selectedAmenities.length) params.set('amenities', selectedAmenities.join(','));
        if (selectedTags.length) params.set('tags', selectedTags.join(','));
        if (featured) params.set('featured', 'true');
        if (sort !== 'featured') params.set('sort', sort);
        
        router.push(`/villas?${params.toString()}`, { scroll: false });
    };

    const handleFilterChange = () => {
        setOffset(0);
        updateURL();
    };

    const clearFilters = () => {
        setLocation('');
        setCheckIn('');
        setCheckOut('');
        setGuests('2');
        setMinBedrooms('');
        setPriceRange({ min: 0, max: 150000 });
        setSelectedAmenities([]);
        setSelectedTags([]);
        setFeatured(false);
        setSort('featured');
        setOffset(0);
        updateURL();
    };

    const hasActiveFilters = location || checkIn || checkOut || guests !== '2' || minBedrooms || 
        priceRange.max < 150000 || priceRange.min > 0 || selectedAmenities.length || 
        selectedTags.length || featured;

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-luxDark text-white py-16 sm:py-24">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
                <div className="relative container-main">
                    <div className="max-w-4xl mx-auto text-center mb-10">
                        <h1 className="text-display-lg sm:text-display-xl font-semibold mb-4">
                            Find Your Perfect <span className="script-accent font-normal text-luxPink">Villa</span>
                        </h1>
                        <p className="text-white/80 text-body-lg">
                            Search 1,200+ curated luxury villas across India
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-6 max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                            <SearchField
                                label="Destination"
                                icon={MapPin}
                                value={location || 'Anywhere'}
                                placeholder="Search destinations..."
                                onClick={() => setShowLocationDropdown(true)}
                                dropdownOpen={showLocationDropdown}
                                dropdownContent={
                                    <LocationDropdown
                                        selected={location}
                                        onSelect={(loc) => { setLocation(loc); setShowLocationDropdown(false); }}
                                    />
                                }
                            />
                            <SearchField
                                label="Check-in"
                                icon={Calendar}
                                value={checkIn || 'Add date'}
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                            <SearchField
                                label="Check-out"
                                icon={Calendar}
                                value={checkOut || 'Add date'}
                                type="date"
                                min={checkIn || new Date().toISOString().split('T')[0]}
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                            <SearchField
                                label="Guests"
                                icon={Users}
                                value={`${guests} Guest${guests !== '1' ? 's' : ''}`}
                                onClick={() => setShowGuestDropdown(true)}
                                dropdownOpen={showGuestDropdown}
                                dropdownContent={
                                    <GuestDropdown
                                        guests={parseInt(guests)}
                                        onChange={setGuests}
                                        onClose={() => { setShowGuestDropdown(false); handleFilterChange(); }}
                                    />
                                }
                            />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={featured}
                                        onChange={(e) => { setFeatured(e.target.checked); handleFilterChange(); }}
                                        className="w-4 h-4 rounded border-gray-300 text-luxPink focus:ring-luxPink"
                                    />
                                    Featured only
                                </label>
                                <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={minBedrooms === '4'}
                                        onChange={(e) => { setMinBedrooms(e.target.checked ? '4' : ''); handleFilterChange(); }}
                                        className="w-4 h-4 rounded border-gray-300 text-luxPink focus:ring-luxPink"
                                    />
                                    4+ BHK
                                </label>
                            </div>
                            <Button size="lg" className="w-full sm:w-auto" onClick={() => handleFilterChange()}>
                                <Filter className="w-4 h-4 mr-2" />
                                Search Villas
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-16 -mt-8">
                <div className="container-main">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <aside className={cn(
                            'lg:w-72 flex-shrink-0',
                            showFilters ? 'block' : 'hidden lg:block'
                        )}>
                            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-28">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-gray-900">Filters</h3>
                                    {hasActiveFilters && (
                                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                                            <X className="w-3.5 h-3.5 mr-1" />
                                            Clear all
                                        </Button>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Price Range <span className="font-normal text-gray-500">(per night)</span>
                                    </label>
                                    <div className="flex items-center gap-2 mb-3">
                                        <input
                                            type="number"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                                            placeholder="Min"
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input
                                            type="number"
                                            value={priceRange.max === 150000 ? '' : priceRange.max}
                                            onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 150000 })}
                                            placeholder="Max"
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="150000"
                                        step="5000"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                                        className="w-full accent-luxPink"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>₹0</span>
                                        <span>₹1.5L+</span>
                                    </div>
                                    <Button variant="outline" className="w-full mt-3" onClick={() => { setPriceRange({ min: 0, max: 150000 }); handleFilterChange(); }}>
                                        Reset Price
                                    </Button>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Bedrooms (BHK)</label>
                                    <div className="space-y-2">
                                        {[2, 3, 4, 5, 6].map(bhk => (
                                            <label key={bhk} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="bhk"
                                                    value={bhk.toString()}
                                                    checked={minBedrooms === bhk.toString()}
                                                    onChange={(e) => { setMinBedrooms(e.target.value); handleFilterChange(); }}
                                                    className="w-4 h-4 text-luxPink border-gray-300 focus:ring-luxPink"
                                                />
                                                <span className="text-sm text-gray-700">{bhk} BHK</span>
                                            </label>
                                        ))}
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="bhk"
                                                value=""
                                                checked={!minBedrooms}
                                                onChange={(e) => { setMinBedrooms(''); handleFilterChange(); }}
                                                className="w-4 h-4 text-luxPink border-gray-300 focus:ring-luxPink"
                                            />
                                            <span className="text-sm text-gray-700">Any</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {amenities.map(amenity => (
                                            <label key={amenity.name} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAmenities.includes(amenity.name)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedAmenities([...selectedAmenities, amenity.name]);
                                                        } else {
                                                            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity.name));
                                                        }
                                                        handleFilterChange();
                                                    }}
                                                    className="w-4 h-4 rounded border-gray-300 text-luxPink focus:ring-luxPink"
                                                />
                                                <amenity.icon className="w-5 h-5 text-gray-500" />
                                                <span className="text-sm text-gray-700">{amenity.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Collections</label>
                                    <div className="space-y-2">
                                        {collections.map(collection => (
                                            <label key={collection.tag} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTags.includes(collection.tag)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedTags([...selectedTags, collection.tag]);
                                                        } else {
                                                            setSelectedTags(selectedTags.filter(t => t !== collection.tag));
                                                        }
                                                        handleFilterChange();
                                                    }}
                                                    className="w-4 h-4 rounded border-gray-300 text-luxPink focus:ring-luxPink"
                                                />
                                                <collection.icon className="w-5 h-5 text-gray-500" />
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-sm font-medium text-gray-700 truncate block">{collection.name}</span>
                                                    <span className="text-xs text-gray-500">{collection.count} villas</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full" onClick={handleFilterChange}>
                                    Apply Filters
                                </Button>
                            </div>
                        </aside>

                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold text-gray-900">{total}</span> villas found
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <select
                                        value={sort}
                                        onChange={(e) => { setSort(e.target.value); handleFilterChange(); }}
                                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                                    >
                                        <option value="featured">Recommended</option>
                                        <option value="price_asc">Price: Low to High</option>
                                        <option value="price_desc">Price: High to Low</option>
                                        <option value="rating">Top Rated</option>
                                    </select>
                                    <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={cn('p-2', viewMode === 'grid' ? 'bg-luxPink text-white' : 'text-gray-500 hover:text-gray-700')}
                                        >
                                            <Layout className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={cn('p-2', viewMode === 'list' ? 'bg-luxPink text-white' : 'text-gray-500 hover:text-gray-700')}
                                        >
                                            <Layout className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('map')}
                                            className={cn('p-2', viewMode === 'map' ? 'bg-luxPink text-white' : 'text-gray-500 hover:text-gray-700')}
                                        >
                                            <Map className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                                        <Filter className="w-4 h-4 mr-1.5" />
                                        Filters
                                    </Button>
                                </div>
                            </div>

                            {loading && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, i) => (
                                        <VillaCardSkeleton key={i} />
                                    ))}
                                </div>
                            )}

                            {!loading && villas.length === 0 && (
                                <div className="text-center py-20">
                                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No villas found</h3>
                                    <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                                    <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
                                </div>
                            )}

                            {!loading && villas.length > 0 && (
                                <>
                                    {viewMode === 'grid' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {villas.map((villa, i) => (
                                                <VillaCard key={villa.id} villa={villa} index={i} />
                                            ))}
                                        </div>
                                    )}

                                    {viewMode === 'list' && (
                                        <div className="space-y-4">
                                            {villas.map((villa, i) => (
                                                <VillaCardList key={villa.id} villa={villa} index={i} />
                                            ))}
                                        </div>
                                    )}

                                    {viewMode === 'map' && (
                                        <div className="h-[500px] rounded-2xl overflow-hidden border border-gray-200">
                                            <iframe
                                                title="Villa Locations Map"
                                                src={`https://www.openstreetmap.org/export/embed.html?bbox=68,6,98,38&layer=mapnik`}
                                                className="w-full h-full border-0"
                                            />
                                        </div>
                                    )}

                                    {(offset + limit) < total && (
                                        <div className="text-center mt-10">
                                            <Button variant="outline" size="lg" onClick={() => setOffset(prev => prev + limit)} disabled={loading}>
                                                Load More ({villas.length} of {total})
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <button
                className="lg:hidden fixed bottom-6 right-6 z-50 bg-luxPink text-white p-4 rounded-full shadow-lg"
                onClick={() => setShowFilters(true)}
            >
                <Filter className="w-6 h-6" />
            </button>
        </div>
    );
}

interface SearchFieldProps {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    placeholder?: string;
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    min?: string;
    dropdownOpen?: boolean;
    dropdownContent?: React.ReactNode;
}

function SearchField({ label, icon: Icon, value, placeholder, onClick, onChange, type = 'text', min, dropdownOpen, dropdownContent }: SearchFieldProps) {
    return (
        <div className="relative">
            <label className="sr-only">{label}</label>
            <button
                type="button"
                onClick={onClick}
                className={cn(
                    'w-full text-left px-4 py-3 sm:py-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition-all duration-200',
                    'border-white/20 hover:border-white/30'
                )}
                aria-expanded={dropdownOpen}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-luxPink" />
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-xs font-medium text-white/60 uppercase tracking-wider">{label}</p>
                        {onChange ? (
                            <input
                                type={type}
                                value={value}
                                onChange={onChange}
                                min={min}
                                className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none text-base font-medium"
                                placeholder={placeholder}
                            />
                        ) : (
                            <p className="text-base font-medium text-white truncate">{value}</p>
                        )}
                    </div>
                    <ChevronDown className={cn('w-5 h-5 text-white/60 transition-transform', dropdownOpen && 'rotate-180')} />
                </div>
            </button>
            {dropdownOpen && dropdownContent && (
                <div className="absolute z-50 w-full mt-2 animate-slide-down">
                    {dropdownContent}
                </div>
            )}
        </div>
    );
}

function LocationDropdown({ selected, onSelect }: { selected: string; onSelect: (loc: string) => void }) {
    const destinations = [
        'North Goa', 'South Goa', 'Udaipur', 'Jaipur', 'Manali & Shimla', 'Kerala',
        'Leh-Ladakh', 'Coorg', 'Varanasi', 'Agra', 'Andaman & Nicobar', 'Darjeeling',
        'Rishikesh', 'Meghalaya', 'Alibaug', 'Lonavala'
    ];
    const [query, setQuery] = useState('');
    const filtered = destinations.filter(d => d.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search destinations..."
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink text-sm"
                    autoFocus
                />
            </div>
            <div className="max-h-64 overflow-y-auto">
                {filtered.map((dest) => (
                    <button
                        key={dest}
                        onClick={() => onSelect(dest)}
                        className={cn(
                            'w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between',
                            selected === dest && 'bg-luxPink/10 text-luxPink'
                        )}
                    >
                        <span className="font-medium text-gray-900">{dest}</span>
                        {selected === dest && <ChevronRight className="w-5 h-5 text-luxPink" />}
                    </button>
                ))}
            </div>
        </div>
    );
}

function GuestDropdown({ guests, onChange, onClose }: { guests: number; onChange: (g: string) => void; onClose: () => void }) {
    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-full sm:w-80">
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">Guests</label>
                <div className="flex items-center gap-3">
                    <button onClick={() => onChange(String(Math.max(1, guests - 1)))} className="w-10 h-10 rounded-full border border-gray-200 hover:border-luxPink hover:text-luxPink flex items-center justify-center">−</button>
                    <span className="text-2xl font-bold w-12 text-center">{guests}</span>
                    <button onClick={() => onChange(String(guests + 1))} className="w-10 h-10 rounded-full border border-gray-200 hover:border-luxPink hover:text-luxPink flex items-center justify-center">+</button>
                </div>
            </div>
            <Button className="w-full" onClick={onClose}>Done</Button>
        </div>
    );
}

function VillaCard({ villa, index }: { villa: any; index: number }) {
    const style = { animationDelay: `${index * 80}ms` };
    return (
        <Link href={`/villas/${villa.slug}`} className="group block" style={style}>
            <Card className="overflow-hidden h-full hover:shadow-card-hover transition-shadow" padding="none">
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={villa.coverImage || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'}
                        alt={villa.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:bg-luxPink hover:text-white transition-all" aria-label="Add to wishlist">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    {villa.featured && (
                        <span className="absolute bottom-3 left-3 bg-luxPink text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                        </span>
                    )}
                    {villa.tags?.[0] && (
                        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                            {villa.tags[0]}
                        </span>
                    )}
                </div>
                <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-luxPink transition-colors line-clamp-1">{villa.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {villa.destination?.name || 'India'}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-sm font-medium text-gray-900">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            4.8
                        </span>
                        <span className="text-sm text-gray-400">(100+ reviews)</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {villa.maxGuests} Guests</span>
                        <span className="flex items-center gap-1"><ChefHat className="w-3.5 h-3.5" /> {villa.bedrooms} BHK</span>
                    </div>
                </CardContent>
                <CardFooter className="px-5 pb-5">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xl font-bold text-gray-900">{formatPrice(villa.price)}</p>
                            <p className="text-xs text-gray-400">per night + taxes</p>
                        </div>
                        <span className="px-3 py-1.5 bg-luxPink/10 text-luxPink text-xs font-semibold rounded-full">Enquire</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

function VillaCardList({ villa, index }: { villa: any; index: number }) {
    const style = { animationDelay: `${index * 80}ms` };
    return (
        <Link href={`/villas/${villa.slug}`} className="group block" style={style}>
            <Card className="overflow-hidden hover:shadow-card-hover transition-shadow" padding="none" variant="elevated">
                <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-64 h-48 sm:h-auto min-h-[200px] overflow-hidden">
                        <img
                            src={villa.coverImage || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'}
                            alt={villa.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    </div>
                    <CardContent className="flex-1 flex flex-col justify-between p-5 sm:p-6">
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-luxPink transition-colors">{villa.name}</h3>
                                {villa.featured && <span className="px-2 py-0.5 bg-luxPink/10 text-luxPink text-xs font-semibold rounded-full">Featured</span>}
                            </div>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {villa.destination?.name || 'India'}</p>
                            <p className="text-xs text-gray-400 mt-2">{villa.bedrooms} BHK • {villa.bathrooms} Baths • Up to {villa.maxGuests} Guests</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 mt-4">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                {villa.amenities?.slice(0, 3).map((a: string, i: number) => (
                                    <span key={i} className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-full">{a}</span>
                                ))}
                                {villa.amenities && villa.amenities.length > 3 && (
                                    <span className="text-gray-400">+{villa.amenities.length - 3} more</span>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-gray-900">{formatPrice(villa.price)}</p>
                                <p className="text-xs text-gray-400">per night + taxes</p>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </Link>
    );
}

function VillaCardSkeleton() {
    return (
        <Card className="overflow-hidden animate-pulse" padding="none">
            <div className="h-56 bg-gray-200" />
            <CardContent className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
            </CardContent>
            <CardFooter className="px-5 pb-5">
                <div className="h-6 bg-gray-200 rounded w-1/4" />
            </CardFooter>
        </Card>
    );
}