import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { HERO_ASSET } from '../data/mockData';
import { Search, MapPin, Home, SlidersHorizontal, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { searchFilters, setSearchFilters, setActiveTab } = useRealEstate();
  
  const [purpose, setPurpose] = useState<'all' | 'sale' | 'rent'>('sale');
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    let minPrice = 0;
    let maxPrice = 0;
    if (priceRange === 'under-5m') {
      maxPrice = 5000000;
    } else if (priceRange === '5m-15m') {
      minPrice = 5000000;
      maxPrice = 15000000;
    } else if (priceRange === '15m-plus') {
      minPrice = 15000000;
    }

    setSearchFilters(prev => ({
      ...prev,
      purpose,
      propertyType,
      location,
      minPrice,
      maxPrice,
      bedrooms
    }));

    const el = document.getElementById('properties-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleListProperty = () => {
    setActiveTab('sell');
    const el = document.getElementById('sell-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Photography with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_ASSET}
          alt="Aura Estates Luxury Villa Exterior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured dark gradient overlay to guarantee WCAG AA contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/45" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-neutral-950/40 to-neutral-950/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Trust editorial kicker - clean unboxed typography without pills */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Prime Global Real Estate & Advisory</span>
          <span aria-hidden="true">·</span>
          <span>Verified Portfolios</span>
        </div>

        {/* Main Heading with text-wrap: balance */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white max-w-4xl text-balance leading-[1.08] mb-6">
          Find Your Perfect Property
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl text-balance font-light leading-relaxed mb-10">
          Discover premium homes, apartments, plots, commercial properties and investment opportunities in prime locations.
        </p>

        {/* Powerful Property Search Box */}
        <div id="hero-search" className="w-full max-w-4xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-xl p-4 sm:p-6 shadow-2xl transition-all">
          
          {/* Segmented Buy / Rent / All filter tabs */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
            <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-lg border border-neutral-800/80">
              <button
                type="button"
                onClick={() => setPurpose('sale')}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-colors ${
                  purpose === 'sale'
                    ? 'bg-amber-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`}
              >
                Buy Property
              </button>
              <button
                type="button"
                onClick={() => setPurpose('rent')}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-colors ${
                  purpose === 'rent'
                    ? 'bg-amber-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`}
              >
                Rent Property
              </button>
              <button
                type="button"
                onClick={() => setPurpose('all')}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-colors ${
                  purpose === 'all'
                    ? 'bg-amber-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`}
              >
                All Listings
              </button>
            </div>

            {/* Direct List Your Property Action */}
            <button
              type="button"
              onClick={handleListProperty}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 group transition-colors"
            >
              <span>List Your Property</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Search Inputs Grid */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            
            {/* Location Filter */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Location</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="">All Prime Locations</option>
                <option value="Bel Air">Bel Air / Beverly Hills, CA</option>
                <option value="Tribeca">Tribeca / New York, NY</option>
                <option value="Miami">Brickell / Miami, FL</option>
                <option value="London">Mayfair / London, UK</option>
                <option value="Dubai">Palm Jumeirah / Dubai, UAE</option>
                <option value="Calabasas">Calabasas / Hidden Hills, CA</option>
              </select>
            </div>

            {/* Property Type Filter */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                <span>Property Type</span>
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="all">All Property Types</option>
                <option value="villa">Modern Villas & Mansions</option>
                <option value="penthouse">Penthouses & High-Rise</option>
                <option value="commercial">Commercial Plazas & Towers</option>
                <option value="farmhouse">Country Farmhouses & Estates</option>
                <option value="plot">Residential & Development Plots</option>
                <option value="apartment">Luxury Townhomes & Condos</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Price Range</span>
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="all">Any Price</option>
                <option value="under-5m">Under $5,000,000</option>
                <option value="5m-15m">$5,000,000 – $15,000,000</option>
                <option value="15m-plus">$15,000,000+</option>
              </select>
            </div>

            {/* Bedrooms Filter */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                <span>Bedrooms</span>
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="all">Any Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
                <option value="6">6+ Bedrooms</option>
              </select>
            </div>

            {/* CTA Submit Button spanning full width on mobile or inline */}
            <div className="sm:col-span-2 lg:col-span-4 pt-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-neutral-950 font-semibold text-sm rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 active:scale-[0.99]"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>

        </div>

        {/* Trust Badges - unboxed clean typography */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>100% Verified Legal Ownership</span>
          </div>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <div>Private Off-Market Portfolios</div>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <div>Cross-Border Escrow Security</div>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <div>$1.4B+ Deals Transacted</div>
        </div>

      </div>
    </div>
  );
};
