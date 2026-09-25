import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { Property } from '../types';
import { Heart, ArrowUpRight, Bed, Bath, Maximize2, MapPin, Calendar, Sparkles } from 'lucide-react';

export const FeaturedProperties: React.FC = () => {
  const { 
    properties, 
    formatPrice, 
    toggleFavorite, 
    isFavorite, 
    setSelectedProperty, 
    openScheduleVisit,
    searchFilters,
    resetFilters
  } = useRealEstate();

  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Filter logic combining top tabs and context searchFilters
  const filteredProperties = properties.filter((p) => {
    // 1. Interactive tab filter
    if (activeFilter === 'featured' && !p.featured) return false;
    if (activeFilter === 'for-sale' && p.purpose !== 'sale') return false;
    if (activeFilter === 'for-rent' && p.purpose !== 'rent') return false;
    if (activeFilter === 'houses' && p.type !== 'villa' && p.type !== 'farmhouse') return false;
    if (activeFilter === 'apartments' && p.type !== 'apartment' && p.type !== 'penthouse') return false;
    if (activeFilter === 'plots' && p.type !== 'plot') return false;
    if (activeFilter === 'commercial' && p.type !== 'commercial') return false;

    // 2. Global searchFilters from Hero or Search Box
    if (searchFilters.purpose !== 'all' && p.purpose !== searchFilters.purpose) return false;
    if (searchFilters.propertyType !== 'all' && p.type !== searchFilters.propertyType) return false;
    if (searchFilters.location && !`${p.location.neighborhood} ${p.location.city} ${p.location.address}`.toLowerCase().includes(searchFilters.location.toLowerCase())) {
      return false;
    }
    if (searchFilters.minPrice > 0 && p.price < searchFilters.minPrice) return false;
    if (searchFilters.maxPrice > 0 && p.price > searchFilters.maxPrice) return false;
    if (searchFilters.bedrooms !== 'all' && p.bedrooms < parseInt(searchFilters.bedrooms, 10)) return false;

    return true;
  });

  const filterTabs = [
    { id: 'all', label: 'All Listings' },
    { id: 'featured', label: 'Featured' },
    { id: 'for-sale', label: 'For Sale' },
    { id: 'for-rent', label: 'For Rent' },
    { id: 'houses', label: 'Houses & Villas' },
    { id: 'apartments', label: 'Apartments & Penthouses' },
    { id: 'plots', label: 'Residential Plots' },
    { id: 'commercial', label: 'Commercial' },
  ];

  const getTypeName = (type: Property['type']) => {
    switch (type) {
      case 'villa': return 'Modern Villa';
      case 'penthouse': return 'Luxury Penthouse';
      case 'commercial': return 'Commercial Plaza';
      case 'farmhouse': return 'Country Farmhouse';
      case 'plot': return 'Development Plot';
      case 'apartment': return 'Urban Townhome';
      default: return 'Prime Residence';
    }
  };

  return (
    <section id="properties-section" className="py-24 bg-neutral-950 text-neutral-100 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Human Editorial Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Property Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Featured Properties
            </h2>
            <p className="mt-3 text-neutral-400 max-w-xl text-sm sm:text-base leading-relaxed">
              Explore hand-selected architectural residences, high-yield commercial assets, and private parcels across global wealth capitals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-mono">
              Showing <span className="text-amber-400 font-semibold tabular-nums">{filteredProperties.length}</span> properties
            </span>
            {(searchFilters.purpose !== 'all' || searchFilters.propertyType !== 'all' || searchFilters.location) && (
              <button
                onClick={resetFilters}
                className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Interactive Filter Tabs - Functional Buttons adhering to SKILL.md */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-md shadow-amber-500/10'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850 border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Property Cards Grid */}
        {filteredProperties.length === 0 ? (
          <div className="p-16 text-center bg-neutral-900/50 rounded-xl border border-neutral-800">
            <p className="text-neutral-300 font-serif text-xl mb-2">No properties matched your criteria</p>
            <p className="text-neutral-400 text-sm mb-6">Try broadening your search parameters or explore all active listings.</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                resetFilters();
              }}
              className="px-5 py-2.5 bg-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded hover:bg-amber-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => {
              const favorite = isFavorite(property.id);

              return (
                <div
                  key={property.id}
                  className="group bg-neutral-900/70 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col"
                >
                  {/* Card Visual with Zero-Broken-Image Fallback */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        // Fallback container
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Gradient scrim for bottom text clarity */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top right Favorite Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property.id);
                      }}
                      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-neutral-950/70 backdrop-blur-md border border-neutral-700/60 flex items-center justify-center text-neutral-300 hover:text-rose-400 transition-colors"
                      title={favorite ? 'Remove from Saved' : 'Save Property'}
                      aria-label="Save Property"
                    >
                      <Heart className={`w-4 h-4 ${favorite ? 'text-rose-500 fill-rose-500' : ''}`} />
                    </button>

                    {/* Purpose and Type tags - clean inline overlay */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-medium text-neutral-300 flex items-center gap-1.5 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded">
                      <span className="text-amber-400 font-semibold uppercase">{property.purpose === 'sale' ? 'For Sale' : 'For Rent'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{getTypeName(property.type)}</span>
                    </div>

                    {property.isInvestment && (
                      <div className="absolute top-3 left-3 text-[11px] font-medium text-emerald-300 bg-neutral-950/80 backdrop-blur-md border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                        <span>Yield {property.projectedROI?.rentalYield}%</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content with Zero-Pill Unboxed Metadata */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Price with tabular numerals */}
                      <div className="flex items-baseline justify-between mb-2">
                        <div className="font-serif text-2xl font-bold text-white tabular-nums tracking-tight">
                          {formatPrice(property.price, property.currency)}
                          {property.purpose === 'rent' && <span className="text-xs font-sans text-neutral-400 font-normal"> / month</span>}
                        </div>
                        <span className="text-xs text-neutral-400 font-mono">
                          {property.status === 'under_contract' ? 'Under Contract' : property.status === 'sold' ? 'Sold' : 'Active'}
                        </span>
                      </div>

                      {/* Property Title */}
                      <h3 className="font-serif text-lg font-semibold text-neutral-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
                        {property.title}
                      </h3>

                      {/* Location text */}
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{property.location.neighborhood}, {property.location.city}</span>
                      </div>

                      {/* Unboxed Metadata Specs with · separators */}
                      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-300 py-3 border-y border-neutral-800/80 font-mono">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{property.bedrooms} Beds</span>
                          </div>
                        )}
                        {property.bathrooms > 0 && (
                          <div className="flex items-center gap-1">
                            <Bath className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{property.bathrooms} Baths</span>
                          </div>
                        )}
                        {property.coveredArea > 0 && (
                          <div className="flex items-center gap-1">
                            <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
                            <span className="tabular-nums">{property.coveredArea.toLocaleString()} sq ft</span>
                          </div>
                        )}
                        {property.plotSize && property.plotSize > 0 && (
                          <div className="text-neutral-400">
                            {property.plotSize > 43560 ? `${(property.plotSize / 43560).toFixed(1)} Acres` : `${property.plotSize.toLocaleString()} sq ft Lot`}
                          </div>
                        )}
                      </div>

                      {/* Short Description */}
                      <p className="mt-3 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {property.tagline || property.description}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                      <button
                        onClick={() => openScheduleVisit(property)}
                        className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule Visit</span>
                      </button>

                      <button
                        onClick={() => setSelectedProperty(property)}
                        className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors group/btn"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
