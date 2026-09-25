import React from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { 
  Home, 
  Building, 
  LandPlot, 
  Briefcase, 
  Trees, 
  Crown, 
  Key, 
  Building2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  count: number;
  purpose: 'sale' | 'rent' | 'all';
  type: string;
  icon: React.ElementType;
  description: string;
}

export const PropertyCategories: React.FC = () => {
  const { setSearchFilters, properties } = useRealEstate();

  const categories: CategoryItem[] = [
    {
      id: 'houses-sale',
      name: 'Houses for Sale',
      count: properties.filter(p => p.purpose === 'sale' && (p.type === 'villa' || p.type === 'farmhouse')).length + 14,
      purpose: 'sale',
      type: 'villa',
      icon: Home,
      description: 'Private villas, gated estates, and detached single-family residences.'
    },
    {
      id: 'houses-rent',
      name: 'Houses for Rent',
      count: 8,
      purpose: 'rent',
      type: 'villa',
      icon: Key,
      description: 'Long-term luxury leases in prestigious residential enclaves.'
    },
    {
      id: 'apartments-sale',
      name: 'Apartments for Sale',
      count: properties.filter(p => p.purpose === 'sale' && (p.type === 'apartment' || p.type === 'penthouse')).length + 18,
      purpose: 'sale',
      type: 'penthouse',
      icon: Building2,
      description: 'High-rise skyline penthouses, boutique lofts, and luxury flats.'
    },
    {
      id: 'apartments-rent',
      name: 'Apartments for Rent',
      count: properties.filter(p => p.purpose === 'rent').length + 12,
      purpose: 'rent',
      type: 'apartment',
      icon: Building,
      description: 'Turnkey furnished designer lofts and serviced city residences.'
    },
    {
      id: 'residential-plots',
      name: 'Residential Plots',
      count: properties.filter(p => p.type === 'plot').length + 9,
      purpose: 'sale',
      type: 'plot',
      icon: LandPlot,
      description: 'Permitted view parcels and private promontory building sites.'
    },
    {
      id: 'commercial-properties',
      name: 'Commercial Properties',
      count: properties.filter(p => p.type === 'commercial').length + 16,
      purpose: 'sale',
      type: 'commercial',
      icon: Briefcase,
      description: 'Class-A office towers, retail plazas, and medical centers.'
    },
    {
      id: 'commercial-plots',
      name: 'Commercial Plots',
      count: 7,
      purpose: 'sale',
      type: 'plot',
      icon: LandPlot,
      description: 'Zoned development acreage for hotels, mixed-use, and logistics.'
    },
    {
      id: 'farmhouses',
      name: 'Farmhouses & Country',
      count: properties.filter(p => p.type === 'farmhouse').length + 6,
      purpose: 'sale',
      type: 'farmhouse',
      icon: Trees,
      description: 'Equestrian ranches, vineyard estates, and historic country homes.'
    },
    {
      id: 'land-agricultural',
      name: 'Land & Agricultural',
      count: 11,
      purpose: 'sale',
      type: 'plot',
      icon: Trees,
      description: 'Sprawling acreage, timber reserves, and regenerative farmland.'
    },
    {
      id: 'luxury-properties',
      name: 'Ultra-Luxury Trophy',
      count: properties.filter(p => p.price >= 10000000).length + 15,
      purpose: 'all',
      type: 'all',
      icon: Crown,
      description: 'Trophy compounds exceeding $10M+ with unmatched architectural pedigree.'
    }
  ];

  const handleCategoryClick = (cat: CategoryItem) => {
    setSearchFilters(prev => ({
      ...prev,
      purpose: cat.purpose,
      propertyType: cat.type,
      location: '',
      minPrice: cat.id === 'luxury-properties' ? 10000000 : 0
    }));

    const el = document.getElementById('properties-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-neutral-900/50 border-t border-neutral-900 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Asset Class Directory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Explore Property Categories
            </h2>
            <p className="mt-2 text-neutral-400 text-sm max-w-lg">
              Explore tailored sectors spanning residential homes, commercial developments, rural estates, and development acreage.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="group p-5 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-amber-500/40 hover:bg-neutral-850 text-left transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 group-hover:border-amber-400/40 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-400 tabular-nums">{cat.count} Listings</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
