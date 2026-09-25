import React, { useState } from 'react';
import { useRealEstate, Currency } from '../context/RealEstateContext';
import { 
  Building2, 
  Heart, 
  Menu, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  Search,
  Globe
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    favorites, 
    currency, 
    setCurrency, 
    setActiveTab, 
    activeTab, 
    inquiries,
    setSeoViewerOpen
  } = useRealEstate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: string, anchorId?: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleNav('home')}
            className="text-left group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400/60 transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider text-neutral-100 uppercase group-hover:text-amber-200 transition-colors">
              Aura Estates
            </span>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <button 
            onClick={() => handleNav('home')} 
            className={`transition-colors hover:text-amber-300 ${activeTab === 'home' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('properties', 'properties-section')} 
            className={`transition-colors hover:text-amber-300 ${activeTab === 'properties' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Properties
          </button>
          <button 
            onClick={() => handleNav('buy', 'buy-section')} 
            className={`transition-colors hover:text-amber-300 ${activeTab === 'buy' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Buy
          </button>
          <button 
            onClick={() => handleNav('rent', 'rent-section')} 
            className={`transition-colors hover:text-amber-300 ${activeTab === 'rent' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Rent
          </button>
          <button 
            onClick={() => handleNav('sell', 'sell-section')} 
            className={`transition-colors hover:text-amber-300 ${activeTab === 'sell' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Sell Property
          </button>
          <button 
            onClick={() => handleNav('invest', 'invest-section')} 
            className={`transition-colors hover:text-amber-300 ${activeTab === 'invest' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Investments
          </button>
          <button 
            onClick={() => handleNav('services', 'services-section')} 
            className={`transition-colors hover:text-amber-300 ${activeTab === 'services' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Services
          </button>
          <button 
            onClick={() => handleNav('about', 'why-us-section')} 
            className={`transition-colors hover:text-amber-300 ${activeTab === 'about' ? 'text-amber-400 font-semibold' : ''}`}
          >
            About Us
          </button>
          <button 
            onClick={() => handleNav('contact', 'contact-section')} 
            className={`transition-colors hover:text-amber-300 ${activeTab === 'contact' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Currency Switcher, Saved, Admin & CTA) */}
        <div className="flex items-center gap-3">
          
          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center text-xs font-medium bg-neutral-900 border border-neutral-800 rounded px-1.5 py-1 text-neutral-400">
            {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                  currency === c ? 'bg-neutral-800 text-amber-300 font-semibold' : 'hover:text-neutral-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Favorites Button */}
          <button
            onClick={() => handleNav('properties', 'properties-section')}
            className="relative p-2 text-neutral-400 hover:text-amber-300 transition-colors"
            title="Saved Properties"
            aria-label="Saved Properties"
          >
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500/20' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] font-mono bg-rose-600 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Admin CRM Button */}
          <button
            onClick={() => handleNav('admin')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
              activeTab === 'admin'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-neutral-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin CRM</span>
            {newInquiriesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          {/* Primary CTA: "Find Your Property" */}
          <button
            onClick={() => handleNav('properties', 'hero-search')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded hover:from-amber-300 hover:to-amber-400 transition-all shadow-sm hover:shadow-amber-500/20 whitespace-nowrap"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find Your Property</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-neutral-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-5 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
            <span className="text-neutral-400">Currency</span>
            <div className="flex gap-1">
              {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 rounded text-xs ${
                    currency === c ? 'bg-amber-500 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleNav('home')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-neutral-200"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('properties', 'properties-section')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-neutral-200"
            >
              All Properties
            </button>
            <button
              onClick={() => handleNav('buy', 'buy-section')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-neutral-200"
            >
              Buy Property
            </button>
            <button
              onClick={() => handleNav('rent', 'rent-section')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-neutral-200"
            >
              Rent Property
            </button>
            <button
              onClick={() => handleNav('sell', 'sell-section')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-amber-300 font-semibold"
            >
              Sell Property
            </button>
            <button
              onClick={() => handleNav('invest', 'invest-section')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-neutral-200"
            >
              Investment Hub
            </button>
            <button
              onClick={() => handleNav('services', 'services-section')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-neutral-200"
            >
              Services
            </button>
            <button
              onClick={() => handleNav('about', 'why-us-section')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-neutral-200"
            >
              About Agency
            </button>
            <button
              onClick={() => handleNav('contact', 'contact-section')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-800 text-neutral-200"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="text-left py-2 px-3 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center justify-between"
            >
              <span>Admin CRM</span>
              {newInquiriesCount > 0 && (
                <span className="text-[10px] bg-amber-400 text-neutral-950 font-bold px-1.5 py-0.5 rounded-full">
                  {newInquiriesCount}
                </span>
              )}
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNav('properties', 'hero-search')}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-amber-400 rounded hover:bg-amber-300"
            >
              Find Your Property
            </button>
            <button
              onClick={() => setSeoViewerOpen(true)}
              className="w-full py-1.5 text-center text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center justify-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Inspect SEO & Structured Data</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
