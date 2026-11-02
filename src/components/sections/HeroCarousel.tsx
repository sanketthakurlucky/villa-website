"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, Users, Search, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSwiper } from "@/components/ui/useSwiper";

const destinations = [
  "North Goa", "South Goa", "Udaipur", "Jaipur", "Manali & Shimla", "Kerala",
  "Leh-Ladakh", "Varanasi", "Agra", "Andaman & Nicobar", "Darjeeling", "Rishikesh",
  "Meghalaya", "Coorg", "Alibaug", "Lonavala"
];

const videoSlides = [
  {
    id: 1,
    video: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80",
    poster: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    video: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    video: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80",
    poster: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 4,
    video: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80",
    poster: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80",
  },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const locationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  const totalGuests = guests.adults + guests.children;
  const guestLabel = `${totalGuests} Guest${totalGuests !== 1 ? "s" : ""}${guests.children ? `, ${guests.children} Child${guests.children !== 1 ? "ren" : ""}` : ""}`;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (totalGuests) params.set("guests", totalGuests.toString());
    window.location.href = `/villas?${params.toString()}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-slide carousel with 8-10s delay and 1.5s crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % videoSlides.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Dark Vignette Overlay */}
      <div className="hero-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.4)_0%,rgba(10,10,10,0.65)_100%)] z-0" />

      {/* Background Video / Slider with Crossfade */}
      <div className="hero-video-container absolute inset-0 z-0 overflow-hidden">
        {videoSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out",
              index === activeSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            style={{ transitionDelay: "0ms" }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              poster={slide.poster}
            >
              <source src={slide.video} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="hero-content relative z-10 w-full container-main px-6 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="hero-title leading-tight animate-slide-up">
            Curated Luxury <span className="gold-accent">Villas</span> Across India
          </h1>

          <p className="hero-subtitle text-body-lg sm:text-xl text-white/90 mt-6 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Handpicked private pool villas with in-house chefs, butler service & personalized experiences.
            Your dream vacation starts here.
          </p>

          {/* Glassmorphism Search Filter Card */}
          <div className="search-filter-card mt-10 animate-slide-up animation-delay-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* DESTINATION */}
              <div ref={locationRef} className="relative">
                <label className="sr-only">Destination</label>
                <button
                  type="button"
                  onClick={() => { setShowLocationDropdown(true); setShowDatePicker(false); setShowGuestDropdown(false); }}
                  className={cn(
                    "w-full text-left px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition-all duration-200",
                    "border-white/20 hover:border-white/30"
                  )}
                  aria-expanded={showLocationDropdown}
                  aria-haspopup="listbox"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-goldAccent" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Destination</p>
                      <p className="text-base font-medium text-white truncate">
                        {location || <span className="text-white/40">Where to?</span>}
                      </p>
                    </div>
                    <ChevronDown className={cn("w-5 h-5 text-white/60 transition-transform", showLocationDropdown && "rotate-180")} />
                  </div>
                </button>
                {showLocationDropdown && (
                  <div className="absolute z-50 w-full mt-2 animate-slide-down">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <input
                          type="text"
                          value={""}
                          onChange={() => {}}
                          placeholder="Search destinations..."
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent text-sm"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {destinations.map((dest) => (
                          <button
                            key={dest}
                            onClick={() => { setLocation(dest); setShowLocationDropdown(false); }}
                            className={cn(
                              "w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between",
                              location === dest && "bg-goldAccent/10 text-goldAccent"
                            )}
                          >
                            <span className="font-medium text-gray-900">{dest}</span>
                            {location === dest && <ChevronRight className="w-5 h-5 text-goldAccent" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DATES */}
              <div ref={dateRef} className="relative">
                <label className="sr-only">Dates</label>
                <button
                  type="button"
                  onClick={() => { setShowDatePicker(true); setShowLocationDropdown(false); setShowGuestDropdown(false); }}
                  className={cn(
                    "w-full text-left px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition-all duration-200",
                    "border-white/20 hover:border-white/30"
                  )}
                  aria-expanded={showDatePicker}
                  aria-haspopup="listbox"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-goldAccent" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Dates</p>
                      <p className="text-base font-medium text-white truncate">
                        {checkIn && checkOut ? `${formatDate(checkIn)} - ${formatDate(checkOut)}` : checkIn ? `${formatDate(checkIn)} - Add checkout` : "Add dates"}
                      </p>
                    </div>
                    <ChevronDown className={cn("w-5 h-5 text-white/60 transition-transform", showDatePicker && "rotate-180")} />
                  </div>
                </button>
                {showDatePicker && (
                  <div className="absolute z-50 w-full mt-2 animate-slide-down">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-full sm:w-96">
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <span className="font-semibold text-gray-900">Select Dates</span>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                            <input
                              type="date"
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                            <input
                              type="date"
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              min={checkIn || new Date().toISOString().split("T")[0]}
                              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent text-sm"
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex gap-3">
                          <button
                            type="button"
                            onClick={() => { setCheckIn(""); setCheckOut(""); setShowDatePicker(false); }}
                            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Clear
                          </button>
                          <button
                            type="button"
                            onClick={() => { setShowDatePicker(false); setShowGuestDropdown(true); }}
                            className="flex-1 px-4 py-2 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* GUESTS */}
              <div ref={guestRef} className="relative">
                <label className="sr-only">Guests</label>
                <button
                  type="button"
                  onClick={() => { setShowGuestDropdown(true); setShowLocationDropdown(false); setShowDatePicker(false); }}
                  className={cn(
                    "w-full text-left px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition-all duration-200",
                    "border-white/20 hover:border-white/30"
                  )}
                  aria-expanded={showGuestDropdown}
                  aria-haspopup="listbox"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-goldAccent" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Guests</p>
                      <p className="text-base font-medium text-white truncate">{guestLabel}</p>
                    </div>
                    <ChevronDown className={cn("w-5 h-5 text-white/60 transition-transform", showGuestDropdown && "rotate-180")} />
                  </div>
                </button>
                {showGuestDropdown && (
                  <div className="absolute z-50 w-full mt-2 animate-slide-down">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-full sm:w-80">
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-2">Adults</label>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })} className="w-10 h-10 rounded-full border border-gray-200 hover:border-goldAccent hover:text-goldAccent flex items-center justify-center">−</button>
                          <span className="text-2xl font-bold w-12 text-center">{guests.adults}</span>
                          <button onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })} className="w-10 h-10 rounded-full border border-gray-200 hover:border-goldAccent hover:text-goldAccent flex items-center justify-center">+</button>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-2">Children</label>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })} className="w-10 h-10 rounded-full border border-gray-200 hover:border-goldAccent hover:text-goldAccent flex items-center justify-center">−</button>
                          <span className="text-2xl font-bold w-12 text-center">{guests.children}</span>
                          <button onClick={() => setGuests({ ...guests, children: guests.children + 1 })} className="w-10 h-10 rounded-full border border-gray-200 hover:border-goldAccent hover:text-goldAccent flex items-center justify-center">+</button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setShowGuestDropdown(false); handleSearch(); }}
                        className="w-full px-4 py-3 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all"
                      >
                        Search Villas
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Button - Full Width on Mobile */}
            <div className="sm:hidden mt-4">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full px-8 py-4 rounded-xl bg-gradient-gold text-white font-semibold text-lg hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Villas
              </button>
            </div>
          </div>

          {/* Desktop Search Button */}
          <div className="hidden sm:flex mt-6 pt-6 border-t border-white/20 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full sm:w-auto flex-1 sm:flex-none px-8 py-4 rounded-xl bg-gradient-gold text-white font-semibold text-lg hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Villas
            </button>
            <a
              href="/destinations"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-goldAccent transition-colors"
            >
              Browse all destinations <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}