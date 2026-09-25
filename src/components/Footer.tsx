import React from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { Building2, Globe, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setSeoViewerOpen } = useRealEstate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab: string, anchorId?: string) => {
    setActiveTab(tab);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900 text-xs">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white uppercase">
                Aura Estates
              </span>
            </div>

            {/* Social Media Channels under Brand (Insta, WhatsApp, Facebook, TikTok, LinkedIn, YouTube, X) */}
            <div className="pt-1 pb-1">
              <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono mb-2.5">
                Official Channels & Media
              </div>
              <div className="flex flex-wrap items-center gap-2">
                
                {/* 1. Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-pink-500/60 hover:bg-gradient-to-tr hover:from-amber-500/20 hover:via-rose-500/20 hover:to-purple-500/20 transition-all shadow-sm"
                  title="Follow Aura Estates on Instagram"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* 2. WhatsApp */}
                <a
                  href="https://wa.me/13108492910?text=Hi%20Aura%20Estates,%20I%20am%20inquiring%20about%20your%20luxury%20real%20estate%20portfolio."
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/60 hover:bg-emerald-950/30 transition-all shadow-sm"
                  title="Message Aura Estates on WhatsApp"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.777.785 2.791.785 3.181 0 5.767-2.586 5.767-5.766 0-3.18-2.586-5.771-5.767-5.771zm3.374 8.211c-.14.394-.711.728-1.077.777-.367.049-.787.071-2.529-.652-2.127-.883-3.486-3.056-3.592-3.197-.105-.14-8.62e-4-.187-.008-.229.071-.352.378-.423.506-.593.127-.169.169-.282.254-.469.085-.187.042-.352-.021-.493-.063-.14-.572-1.38-.784-1.888-.206-.494-.416-.426-.572-.434-.148-.007-.318-.009-.488-.009-.169 0-.444.063-.677.317-.233.254-.889.869-.889 2.119s.91 2.457 1.037 2.626c.127.169 1.791 2.735 4.339 3.834.606.262 1.079.418 1.448.535.608.193 1.162.166 1.6.101.488-.073 1.503-.615 1.714-1.211.211-.596.211-1.107.148-1.213-.063-.105-.233-.169-.488-.296z"/>
                  </svg>
                </a>

                {/* 3. Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-blue-400 hover:border-blue-500/60 hover:bg-blue-950/30 transition-all shadow-sm"
                  title="Follow Aura Estates on Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>

                {/* 4. TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neutral-100 hover:border-neutral-500 hover:bg-neutral-800 transition-all shadow-sm group/tiktok"
                  title="Watch Architectural Tours on TikTok"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 fill-current group-hover/tiktok:text-cyan-400" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>

                {/* 5. LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-sky-400 hover:border-sky-500/60 hover:bg-sky-950/30 transition-all shadow-sm"
                  title="Connect on LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* 6. YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-500/60 hover:bg-red-950/30 transition-all shadow-sm"
                  title="Watch Luxury Property Tours on YouTube"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* 7. X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-neutral-100 hover:border-neutral-600 hover:bg-neutral-800 transition-all shadow-sm"
                  title="Follow Aura Estates on X"
                  aria-label="X (formerly Twitter)"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

              </div>
            </div>
            
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-light">
              Premier international luxury real estate brokerage. Specializing in confidential trophy residences, Class-A commercial assets, and high-yield real estate investments across premier global destinations.
            </p>

            <div className="pt-2 text-[11px] text-neutral-500 space-y-1">
              <div>450 North Rodeo Drive, Suite 800, Beverly Hills, CA 90210</div>
              <div>Direct: +1 (800) 555-2872 · concierge@auraestates.luxury</div>
            </div>
          </div>

          {/* Column 2: Properties & Portfolios */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-neutral-200 uppercase tracking-wider">Properties</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('properties', 'properties-section')} className="hover:text-amber-300 transition-colors">
                  All Featured Properties
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('buy', 'buy-section')} className="hover:text-amber-300 transition-colors">
                  Houses for Sale
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rent', 'rent-section')} className="hover:text-amber-300 transition-colors">
                  Luxury Rentals & Leases
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('properties', 'properties-section')} className="hover:text-amber-300 transition-colors">
                  Penthouse Residences
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('properties', 'properties-section')} className="hover:text-amber-300 transition-colors">
                  Commercial Plazas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sell', 'sell-section')} className="text-amber-400 hover:text-amber-300 transition-colors">
                  List Your Property
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Prime Destinations */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-neutral-200 uppercase tracking-wider">Destinations</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('locations', 'locations-section')} className="hover:text-amber-300 transition-colors">
                  Beverly Hills & Bel Air
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('locations', 'locations-section')} className="hover:text-amber-300 transition-colors">
                  Tribeca & Manhattan
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('locations', 'locations-section')} className="hover:text-amber-300 transition-colors">
                  Palm Jumeirah Dubai
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('locations', 'locations-section')} className="hover:text-amber-300 transition-colors">
                  Mayfair London
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('locations', 'locations-section')} className="hover:text-amber-300 transition-colors">
                  Brickell Financial Miami
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Firm & Governance */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-neutral-200 uppercase tracking-wider">Advisory & Firm</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('about', 'why-us-section')} className="hover:text-amber-300 transition-colors">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('agents', 'agents-section')} className="hover:text-amber-300 transition-colors">
                  Senior Partners
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('invest', 'invest-section')} className="hover:text-amber-300 transition-colors">
                  Investment Yields
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog', 'blog-section')} className="hover:text-amber-300 transition-colors">
                  Market Guides & Trends
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact', 'contact-section')} className="hover:text-amber-300 transition-colors">
                  Contact Concierge
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="text-neutral-500 hover:text-amber-400 transition-colors">
                  Admin CRM Login
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Technical SEO, Equal Housing & Legal Disclosures */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-center md:text-left">
            <span>© 2026 Aura Estates LLC. All Rights Reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Equal Housing Opportunity</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setSeoViewerOpen(true)}
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              <span>XML Sitemap & Schema.org JSON-LD</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 rounded text-neutral-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
