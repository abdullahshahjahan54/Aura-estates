import React from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  Key, 
  FileCheck, 
  Sparkles,
  Building,
  Home
} from 'lucide-react';

export const BuyRentSections: React.FC = () => {
  const { setSearchFilters, setActiveTab } = useRealEstate();

  const handleExploreBuy = () => {
    setSearchFilters(prev => ({ ...prev, purpose: 'sale' }));
    const el = document.getElementById('properties-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreRent = () => {
    setSearchFilters(prev => ({ ...prev, purpose: 'rent' }));
    const el = document.getElementById('properties-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 divide-y divide-neutral-900">
      
      {/* 1. BUY SECTION */}
      <section id="buy-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acquisition Advisory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Buy With Certainty, Discretion & Integrity
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 font-light">
              Acquiring prime property is an art that demands acute market intelligence, off-market access, and uncompromising legal safeguards. Our senior partners guide family offices, founders, and private individuals from sourcing through title deed registration.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Private Off-Market Dossiers</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Access over $400M in confidential trophy residences never publicized on public MLS portals.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Architectural & Structural Audits</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Comprehensive independent engineering, soils, geotechnical, and MEP building inspections.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Cross-Border Tax & Legal Structuring</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">Seamless trust, LLC, and fiduciary representation across the US, UK, UAE, and Europe.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleExploreBuy}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/10 transition-all"
            >
              <span>Explore Properties For Sale</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
              <Home className="w-8 h-8 text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-white">Residential Purchases</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Luxury single-family homes, coastal compounds, and branded penthouses.</p>
              <div className="pt-2 text-[11px] font-mono text-amber-400">Avg Closing: 24 Days</div>
            </div>
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
              <Building className="w-8 h-8 text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-white">Commercial Purchases</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Office plazas, retail developments, and logistics assets with long leases.</p>
              <div className="pt-2 text-[11px] font-mono text-amber-400">Target Net Yield: 7-10%</div>
            </div>
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3 col-span-2">
              <FileCheck className="w-8 h-8 text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-white">Concierge Settlement & Escrow</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">From initial Letter of Intent (LOI) to final title warranty deeds and turnkey utility transfer, our legal escrow team handles every technicality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RENT SECTION */}
      <section id="rent-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
              <Key className="w-7 h-7 text-amber-400" />
              <h3 className="font-serif text-base font-bold text-white">Executive Tenancy</h3>
              <p className="text-xs text-neutral-400">Discreet leasing for C-suite leaders, diplomats, and international relocation clients.</p>
            </div>
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
              <Building className="w-7 h-7 text-amber-400" />
              <h3 className="font-serif text-base font-bold text-white">Corporate Plazas</h3>
              <p className="text-xs text-neutral-400">Custom office floorplates, flagship retail premises, and boutique studios.</p>
            </div>
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl col-span-2 space-y-2">
              <h3 className="font-serif text-base font-bold text-white">Full-Service Tenant Experience</h3>
              <p className="text-xs text-neutral-400">All managed residences feature 24/7 maintenance dispatch, key-holding services, private security liaisons, and insured lease contracts.</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Leasing Services</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Rent Exceptional Homes & Flagship Spaces
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 font-light">
              Whether securing a furnished penthouse overlooking Central Park, a Mayfair townhome with private mews, or an entire commercial office floorplate in Brickell, Aura Estates provides vetted inventory with flexible, white-glove leasing terms.
            </p>

            <button
              onClick={handleExploreRent}
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-bold uppercase tracking-wider rounded-lg border border-neutral-700 transition-all"
            >
              <span>Browse Properties For Rent</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
