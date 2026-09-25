import React, { useState } from 'react';
import { PRIME_LOCATIONS } from '../data/mockData';
import { useRealEstate } from '../context/RealEstateContext';
import { MapPin, Search, ArrowRight, Sparkles, Building2 } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  const { setSearchFilters } = useRealEstate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = PRIME_LOCATIONS.filter((loc) =>
    `${loc.name} ${loc.city} ${loc.country} ${loc.propertyTypes.join(' ')}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSelectLocation = (locName: string, city: string) => {
    setSearchFilters(prev => ({
      ...prev,
      location: city,
      purpose: 'all',
      propertyType: 'all',
    }));

    const el = document.getElementById('properties-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="locations-section" className="py-24 bg-neutral-900 border-t border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Search Input */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prime Geographical Footholds</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2">
              Explore Premier Locations
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg leading-relaxed">
              Explore real estate opportunities in the world's most resilient metropolitan centers, coastal sanctuaries, and financial capitals.
            </p>
          </div>

          {/* Search bar inside Locations */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cities or neighborhoods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className="group bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={loc.image}
                  alt={`${loc.name} Prime Real Estate`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-amber-400 border border-neutral-800">
                  {loc.propertiesCount} Active Properties
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">{loc.country}</span>
                  <h3 className="font-serif text-xl font-bold">{loc.name}</h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mb-3">
                    {loc.highlight}
                  </p>

                  <div className="flex items-center justify-between text-xs py-2 border-y border-neutral-800 font-mono">
                    <span className="text-neutral-500">Benchmark Val.:</span>
                    <span className="text-neutral-200 tabular-nums font-semibold">${loc.avgPriceSqFt.toLocaleString()} / sq ft</span>
                  </div>

                  <div className="pt-2 text-[11px] text-neutral-400">
                    <span className="text-neutral-500">Key Assets: </span>
                    {loc.propertyTypes.join(' · ')}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectLocation(loc.name, loc.city)}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-neutral-800 group/btn"
                >
                  <span>View Properties in {loc.city}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
