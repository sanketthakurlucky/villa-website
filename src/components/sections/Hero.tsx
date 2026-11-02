'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Users, Search, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Waves, Utensils, Shield, Dumbbell, Coffee, Bath, Car, Wind, Wifi, Droplet, Sunrise, Flame, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const destinations = [
  'North Goa', 'South Goa', 'Udaipur', 'Jaipur', 'Manali & Shimla', 'Kerala',
  'Leh-Ladakh', 'Varanasi', 'Agra', 'Andaman & Nicobar', 'Darjeeling', 'Rishikesh', 'Meghalaya', 'Coorg', 'Alibaug', 'Lonavala'
];

const amenityIcons = {
  'Private Pool': Waves,
  'Sauna Bath': Flame,
  'Meals Available': Utensils,
  'Housekeeping': Sparkles,
  'Gym': Dumbbell,
  'Air Condition': Wind,
  'Free WiFi': Wifi,
  'Breakfast': Coffee,
  'Washroom': Bath,
  'Cookware': ChefHat,
  'Parking': Car,
  'Swimming Pool': Waves,
  'Safe': Shield,
  'Private Deck': Sunrise,
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'location' | 'dates' | 'guests'>('location');
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalGuests = guests.adults + guests.children;
  const guestLabel = `${totalGuests} Guest${totalGuests !== 1 ? 's' : ''}${guests.children ? `, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}` : ''}`;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    if (totalGuests) params.set('guests', totalGuests.toString());
    window.location.href = `/villas?${params.toString()}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      </div>

      <div className="relative z-10 w-full container-main py-20">
        <div className="max-w-4xl mx-auto text-center text-white mb-16">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            Flat 10% Off! Use Code: <span className="font-semibold text-luxPink">SEASALT10</span>
          </span>
          <h1 className="text-display-xl sm:text-[5rem] lg:text-[6rem] font-semibold leading-tight animate-slide-up">
            Curated Luxury <span className="script-accent font-normal text-luxPink">Villas</span> Across India
          </h1>
          <p className="text-body-lg sm:text-xl text-white/90 mt-6 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Handpicked private pool villas with in-house chefs, butler service & personalized experiences.
            Your dream vacation starts here.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-slide-up animation-delay-300">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <SearchField
                ref={locationRef}
                label="Destination"
                icon={MapPin}
                value={location || 'Where to?'}
                placeholder="Search destinations..."
                isActive={activeTab === 'location'}
                onClick={() => { setActiveTab('location'); setShowLocationDropdown(true); }}
                dropdownOpen={showLocationDropdown}
                dropdownContent={
                  <DestinationDropdown
                    destinations={destinations}
                    selected={location}
                    onSelect={(d) => { setLocation(d); setShowLocationDropdown(false); setActiveTab('dates'); }}
                  />
                }
              />

              <SearchField
                ref={dateRef}
                label="Dates"
                icon={Calendar}
                value={checkIn && checkOut ? `${formatDate(checkIn)} - ${formatDate(checkOut)}` : checkIn ? `${formatDate(checkIn)} - Add checkout` : 'Add dates'}
                placeholder="Check-in & Check-out"
                isActive={activeTab === 'dates'}
                onClick={() => { setActiveTab('dates'); setShowDatePicker(true); }}
                dropdownOpen={showDatePicker}
                dropdownContent={
                  <DatePicker
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onSelect={(start, end) => { setCheckIn(start); setCheckOut(end); setShowDatePicker(false); setActiveTab('guests'); }}
                    onClose={() => setShowDatePicker(false)}
                  />
                }
              />

              <SearchField
                ref={guestRef}
                label="Guests"
                icon={Users}
                value={guestLabel || 'Add guests'}
                placeholder="Adults, Children"
                isActive={activeTab === 'guests'}
                onClick={() => { setActiveTab('guests'); setShowGuestDropdown(true); }}
                dropdownOpen={showGuestDropdown}
                dropdownContent={
                  <GuestDropdown
                    guests={guests}
                    onChange={setGuests}
                    onClose={() => { setShowGuestDropdown(false); handleSearch(); }}
                  />
                }
              />
            </div>

            <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-center gap-4">
              <Button size="xl" className="w-full sm:w-auto flex-1 sm:flex-none" onClick={handleSearch}>
                <Search className="w-5 h-5 mr-2" />
                Search Villas
              </Button>
              <Link
                href="/destinations"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Browse all destinations <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-4">
              <span className="font-medium">Popular:</span>
              {['Goa', 'Udaipur', 'Kerala', 'Manali', 'Jaipur'].map((dest) => (
                <Link
                  key={dest}
                  href={`/villas?location=${encodeURIComponent(dest)}`}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  {dest}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </section>
  );
}

interface SearchFieldProps {
  ref?: React.RefObject<HTMLDivElement>;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  placeholder: string;
  isActive: boolean;
  onClick: () => void;
  dropdownOpen: boolean;
  dropdownContent: React.ReactNode;
}

function SearchField({ ref, label, icon: Icon, value, placeholder, isActive, onClick, dropdownOpen, dropdownContent }: SearchFieldProps) {
  return (
    <div className="relative" ref={ref}>
      <label className="sr-only">{label}</label>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'w-full text-left px-4 py-4 sm:py-5 rounded-2xl bg-white/10 backdrop-blur-sm border transition-all duration-200',
          isActive ? 'border-luxPink/50 bg-white/15' : 'border-white/20 hover:border-white/30'
        )}
        aria-expanded={dropdownOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-luxPink" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs font-medium text-white/60 uppercase tracking-wider">{label}</p>
            <p className="text-base font-medium text-white truncate">{value || <span className="text-white/40">{placeholder}</span>}</p>
          </div>
          <ChevronDown className={cn('w-5 h-5 text-white/60 transition-transform', dropdownOpen && 'rotate-180')} />
        </div>
      </button>
      {dropdownOpen && (
        <div className="absolute z-50 w-full mt-2 animate-slide-down">
          {dropdownContent}
        </div>
      )}
    </div>
  );
}

function DestinationDropdown({ destinations, selected, onSelect }: { destinations: string[]; selected: string; onSelect: (d: string) => void }) {
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

function DatePicker({ checkIn, checkOut, onSelect, onClose }: { checkIn: string; checkOut: string; onSelect: (start: string, end: string) => void; onClose: () => void }) {
  const [viewDate, setViewDate] = useState(new Date());
  const [tempStart, setTempStart] = useState<Date | null>(checkIn ? new Date(checkIn) : null);
  const [tempEnd, setTempEnd] = useState<Date | null>(checkOut ? new Date(checkOut) : null);
  const [selectingEnd, setSelectingEnd] = useState(false);

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const isSelected = (date: Date) => {
    if (tempStart && date.toDateString() === tempStart.toDateString()) return 'start';
    if (tempEnd && date.toDateString() === tempEnd.toDateString()) return 'end';
    if (tempStart && tempEnd && date > tempStart && date < tempEnd) return 'range';
    return false;
  };

  const handleDayClick = (day: number) => {
    const clicked = new Date(currentYear, currentMonth, day);
    if (!selectingEnd || clicked < (tempStart || clicked)) {
      setTempStart(clicked);
      setTempEnd(null);
      setSelectingEnd(true);
    } else {
      setTempEnd(clicked);
      setSelectingEnd(false);
    }
  };

  const applyDates = () => {
    if (tempStart && tempEnd) {
      onSelect(
        tempStart.toISOString().split('T')[0],
        tempEnd.toISOString().split('T')[0]
      );
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-full sm:w-96">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <button onClick={() => setViewDate(new Date(currentYear, currentMonth - 1))} className="p-2 rounded-lg hover:bg-gray-100"><ChevronLeft className="w-5 h-5" /></button>
        <span className="font-semibold text-gray-900">{monthNames[currentMonth]} {currentYear}</span>
        <button onClick={() => setViewDate(new Date(currentYear, currentMonth + 1))} className="p-2 rounded-lg hover:bg-gray-100"><ChevronRight className="w-5 h-5" /></button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 px-4 py-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 px-4 pb-4">
        {[...Array(firstDayOfMonth)].map((_, i) => <span key={i} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const date = new Date(currentYear, currentMonth, day);
          const selectedState = isSelected(date);
          const isToday = date.toDateString() === new Date().toDateString();
          const isPast = date < new Date(new Date().setHours(0,0,0,0));
          return (
            <button
              key={day}
              onClick={() => !isPast && handleDayClick(day)}
              disabled={isPast}
              className={cn(
                'aspect-square rounded-xl text-sm font-medium transition-all',
                isPast && 'text-gray-300 cursor-not-allowed',
                selectedState === 'start' && 'bg-luxPink text-white shadow-lux',
                selectedState === 'end' && 'bg-luxPink text-white shadow-lux',
                selectedState === 'range' && 'bg-luxPink/20 text-luxPink',
                !selectedState && !isPast && 'text-gray-700 hover:bg-gray-100',
                isToday && !selectedState && 'ring-2 ring-luxPink'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-100 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
        <Button className="flex-1" onClick={applyDates} disabled={!tempStart || !tempEnd}>Apply</Button>
      </div>
    </div>
  );
}

function GuestDropdown({ guests, onChange, onClose }: { guests: { adults: number; children: number }; onChange: (g: { adults: number; children: number }) => void; onClose: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-full sm:w-80">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">Adults (13+)</label>
        <div className="flex items-center gap-3">
          <button onClick={() => onChange({ ...guests, adults: Math.max(1, guests.adults - 1) })} className="w-10 h-10 rounded-full border border-gray-200 hover:border-luxPink hover:text-luxPink flex items-center justify-center">−</button>
          <span className="text-2xl font-bold w-12 text-center">{guests.adults}</span>
          <button onClick={() => onChange({ ...guests, adults: guests.adults + 1 })} className="w-10 h-10 rounded-full border border-gray-200 hover:border-luxPink hover:text-luxPink flex items-center justify-center">+</button>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">Children (2-12)</label>
        <div className="flex items-center gap-3">
          <button onClick={() => onChange({ ...guests, children: Math.max(0, guests.children - 1) })} className="w-10 h-10 rounded-full border border-gray-200 hover:border-luxPink hover:text-luxPink flex items-center justify-center">−</button>
          <span className="text-2xl font-bold w-12 text-center">{guests.children}</span>
          <button onClick={() => onChange({ ...guests, children: guests.children + 1 })} className="w-10 h-10 rounded-full border border-gray-200 hover:border-luxPink hover:text-luxPink flex items-center justify-center">+</button>
        </div>
      </div>
      <Button className="w-full" onClick={onClose}>Done</Button>
    </div>
  );
}