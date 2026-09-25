import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Key, 
  ShieldCheck, 
  LineChart, 
  Briefcase, 
  Calculator, 
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  // Interactive Property Valuation Estimator tool state
  const [valArea, setValArea] = useState<number>(4500);
  const [valType, setValType] = useState<string>('villa');
  const [valLocation, setValLocation] = useState<string>('prime_city');
  const [valCondition, setValCondition] = useState<string>('new');

  const calculateEstimate = () => {
    let baseRate = 1200; // per sq ft
    if (valType === 'penthouse') baseRate = 1600;
    if (valType === 'commercial') baseRate = 950;
    if (valType === 'farmhouse') baseRate = 850;

    if (valLocation === 'ultra_prime') baseRate *= 1.45;
    if (valLocation === 'coastal') baseRate *= 1.3;
    if (valLocation === 'emerging') baseRate *= 0.85;

    if (valCondition === 'renovated') baseRate *= 1.15;
    if (valCondition === 'architectural') baseRate *= 1.35;

    const estimatedValue = Math.round(valArea * baseRate);
    const low = Math.round(estimatedValue * 0.94);
    const high = Math.round(estimatedValue * 1.08);

    return { low, high, avg: estimatedValue };
  };

  const estimate = calculateEstimate();

  const services = [
    {
      num: '01',
      title: 'Property Buying',
      icon: Search,
      description: 'Exclusive buyer representation, access to off-market inventory, valuation modeling, and bespoke property sourcing tailored to private wealth mandates.'
    },
    {
      num: '02',
      title: 'Property Selling',
      icon: Home,
      description: 'Strategic global marketing campaigns, high-production architectural photography, targeted HNW buyer outreach, and maximum price realization.'
    },
    {
      num: '03',
      title: 'Property Rental & Leasing',
      icon: Key,
      description: 'Executive tenancy placement, diplomatic leases, corporate relocation services, and complete vetting of prospective tenants.'
    },
    {
      num: '04',
      title: 'Property Management',
      icon: ShieldCheck,
      description: 'End-to-end luxury asset stewardship, 24/7 technical maintenance dispatch, preventive upkeep, rent collection, and fiduciary financial reporting.'
    },
    {
      num: '05',
      title: 'Real Estate Consultation',
      icon: LineChart,
      description: 'Independent strategic counsel on portfolio allocation, zoning regulations, entitlement approvals, and cross-border real estate taxation.'
    },
    {
      num: '06',
      title: 'Property Investment Advisory',
      icon: Sparkles,
      description: 'Identification of high-yield residential and commercial income assets delivering 7% to 11% net returns with strong capital appreciation.'
    },
    {
      num: '07',
      title: 'Commercial Real Estate',
      icon: Briefcase,
      description: 'Class-A office towers, retail plazas, hospitality assets, and logistics facilities negotiated with institutional diligence and lease audits.'
    },
    {
      num: '08',
      title: 'Residential Real Estate',
      icon: Building2,
      description: 'Iconic modern villas, waterfront estates, architectural compounds, and private island retreats in the world’s most coveted postcodes.'
    },
    {
      num: '09',
      title: 'Property Valuation & Appraisals',
      icon: Calculator,
      description: 'Certified analytical valuations based on hyper-local sales comparables, spatial utility, replacement cost, and discounted cash flow modeling.'
    }
  ];

  return (
    <section id="services-section" className="py-24 bg-neutral-950 text-neutral-100 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Brokerage & Advisory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Real Estate Services
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            From single trophy residence acquisitions to institutional multi-tenant commercial investments, our multidisciplinary team provides end-to-end real estate expertise.
          </p>
        </div>

        {/* 9 Services Grid adhering to human editorial numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.num}
                className="group p-8 bg-neutral-900/60 border border-neutral-800 rounded-xl hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-400/40 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-neutral-500 font-semibold">{svc.num}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {svc.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center text-xs text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Instant Property Valuation Tool */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
                <Calculator className="w-4 h-4" />
                <span>Proprietary Appraisal Engine</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Instant Property Valuation Estimator
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Adjust the variables to simulate an algorithmic market valuation benchmark based on our database of closed prime real estate transactions.
              </p>

              <div className="space-y-4 pt-2">
                
                {/* Area Slider */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-300 mb-1">
                    <span>Covered Living Area:</span>
                    <span className="font-mono font-bold text-amber-400 tabular-nums">{valArea.toLocaleString()} sq ft</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={20000}
                    step={250}
                    value={valArea}
                    onChange={(e) => setValArea(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-400 bg-neutral-950 cursor-pointer"
                  />
                </div>

                {/* Property Type Selector */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">Asset Class</label>
                    <select
                      value={valType}
                      onChange={(e) => setValType(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-neutral-200"
                    >
                      <option value="villa">Modern Villa / Detached</option>
                      <option value="penthouse">High-Rise Penthouse</option>
                      <option value="commercial">Commercial Plaza</option>
                      <option value="farmhouse">Equestrian Farmhouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">Location Tier</label>
                    <select
                      value={valLocation}
                      onChange={(e) => setValLocation(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-neutral-200"
                    >
                      <option value="ultra_prime">Trophy Metro (Bel Air / Mayfair)</option>
                      <option value="coastal">Prime Waterfront (Miami / Palm Jumeirah)</option>
                      <option value="prime_city">Gateway Downtown</option>
                      <option value="emerging">High-Growth Suburban</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* Valuation Output Box */}
            <div className="lg:col-span-6 bg-neutral-950 border border-amber-500/30 rounded-xl p-6 sm:p-8 text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Estimated Fair Market Valuation
              </span>
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 tabular-nums">
                ${(estimate.low / 1000000).toFixed(2)}M – ${(estimate.high / 1000000).toFixed(2)}M
              </div>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto font-mono">
                Median Valuation: ${(estimate.avg).toLocaleString()} (~${Math.round(estimate.avg / valArea)}/sq ft)
              </p>
              <div className="pt-2">
                <a
                  href="#sell-section"
                  className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
                >
                  Request Formal Certified Appraisal
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
