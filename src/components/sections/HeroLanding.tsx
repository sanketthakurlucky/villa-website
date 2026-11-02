"use client";

import { useState, useRef, useEffect } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroLandingSection() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (videoRef.current && !videoRef.current.contains(event.target as Node)) {
        setShowVideo(false);
      }
    }
    if (showVideo) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [showVideo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background with Ken Burns effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-[20s] ease-out"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80')",
            transform: "scale(1.15)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.4)_0%,rgba(10,10,10,0.65)_100%)]" />
      </div>

      {/* Floating Header */}
      <header className="site-header absolute top-0 left-0 right-0 z-20">
        <div className="container-main h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3" aria-label="SEASALT Hospitality Home">
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9zM12 12c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9z" />
                <path d="M3 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0zM12 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-bold tracking-[0.26em] text-white leading-none">SEASALT</span>
              <span className="block text-[10px] font-medium tracking-[0.35em] gold-accent mt-0.5">HOSPITALITY</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/villas" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">Explore Villas</a>
            <a href="/destinations" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">Destinations</a>
            <a href="/collections" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">Collections</a>
            <a href="/blogs" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">Blogs</a>
            <a href="/about" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">About Us</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/login" className="hidden sm:block text-sm font-medium text-white/80 hover:gold-accent transition-colors">Login</a>
            <a href="/register" className="hidden sm:block bg-gradient-gold hover:opacity-90 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.4)]">
              Get in touch
              <svg className="w-4 h-4 ml-1.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12H5" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 w-full container-main px-6 py-20">
        <div className="max-w-2xl mx-auto text-center text-white">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9zM12 12c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9z" />
                <path d="M3 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0zM12 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0z" />
              </svg>
            </div>
          </div>

          {/* Play Button - Video Popup Trigger */}
          <button
            onClick={() => setShowVideo(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 animate-slide-up animation-delay-100"
            aria-label="Watch video"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-[0_4px_15px_rgba(212,175,55,0.4)]">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
            <span className="text-lg font-medium">Watch Experience</span>
          </button>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl mx-auto animate-slide-up animation-delay-200">
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium">
              Start now and get <b className="gold-accent">free bonus</b> on account
            </span>
          </p>

          {/* Sign Up Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="mt-10 space-y-4 animate-slide-up animation-delay-300 w-full max-w-md mx-auto">
            <div className="space-y-3">
              <input
                type="email"
                name="user-email"
                placeholder="Email"
                className="w-full px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent/50 transition-all"
                required
                autoComplete="email"
              />
              <input
                type="password"
                name="user-password"
                placeholder="Password"
                className="w-full px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent/50 transition-all"
                required
                autoComplete="new-password"
              />
              <input
                type="password"
                name="confirm-password"
                placeholder="Confirm the password"
                className="w-full px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent/50 transition-all"
                required
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 px-8 py-4 rounded-xl bg-gradient-gold text-white font-semibold text-lg hover:opacity-90 transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Video Popup Modal */}
      {showVideo && (
        <div
          ref={videoRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-title"
        >
          <div className="relative w-full max-w-4xl aspect-video bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            <div id="video-title" className="sr-only">SEASALT Hospitality Experience</div>

            <div className="w-full h-full">
              <iframe
                src="https://www.youtube.com/embed/uB1-wPrW4ck?autoplay=1&rel=0&modestbranding=1"
                title="SEASALT Hospitality Experience"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}