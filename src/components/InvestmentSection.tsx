import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  PieChart, 
  ArrowUpRight, 
  Sparkles,
  Calculator,
  Building
} from 'lucide-react';

export const InvestmentSection: React.FC = () => {
  const { properties, setSelectedProperty, setSearchFilters, formatPrice } = useRealEstate();

  // Investment Calculator State
  const [investCapital, setInvestCapital] = useState<number>(2500000);
  const [targetYield, setTargetYield] = useState<number>(8.0);
  const [holdingYears, setHoldingYears] = useState<number>(5);
  const [annualGrowthRate, setAnnualGrowthRate] = useState<number>(7.5);

  const annualRentalIncome = Math.round(investCapital * (targetYield / 100));
  const monthlyRentalIncome = Math.round(annualRentalIncome / 12);
  const projectedFutureEquity = Math.round(investCapital * Math.pow(1 + annualGrowthRate / 100, holdingYears));
  const capitalGain = projectedFutureEquity - investCapital;
  const totalCumulativeReturn = (annualRentalIncome * holdingYears) + capitalGain;

  const investmentProperties = properties.filter(p => p.isInvestment);

  const handleExploreInvestments = () => {
    setSearchFilters(prev => ({
      ...prev,
      purpose: 'all',
      propertyType: 'all',
      location: '',
      minPrice: 0,
      maxPrice: 0
    }));
    const el = document.getElementById('properties-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="invest-section" className="py-24 bg-neutral-950 text-neutral-100 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Capital Preservation & Alpha Yields</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
              Invest in the Right Property
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Prime real estate remains the paramount anchor for institutional wealth preservation. Acquire assets positioned for resilient cash flows and asymmetric capital appreciation.
            </p>
          </div>

          <button
            onClick={handleExploreInvestments}
            className="self-start lg:self-end px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-500/10 flex items-center gap-2 whitespace-nowrap"
          >
            <span>Explore Investment Opportunities</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Investment Advantage Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-400">
              <PieChart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Consistent High-Yield Cashflows</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Class-A commercial plazas with long-term Triple-Net (NNN) leases and prime residential penthouses yield between 6.8% and 11.5% net annual income.
            </p>
          </div>

          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Inflation-Proof Capital Defense</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Physical scarcity in geographical choke-points (Malibu beachfront, Bel Air, Mayfair, Palm Jumeirah) creates structural resistance against monetary dilution.
            </p>
          </div>

          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Favorable Tax & Entity Shielding</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Take advantage of 1031 tax-deferred exchanges, cost segregation depreciation, zero income tax jurisdictions (Miami FL, Dubai UAE), and estate succession trusts.
            </p>
          </div>
        </div>

        {/* Interactive Investment Yield & Growth Simulator */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Calculator className="w-4 h-4" />
                <span>Portfolio ROI Simulator</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Simulate Your Investment Returns
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Test various allocation models to project expected passive rental income and cumulative capital gains over your intended holding timeframe.
              </p>

              {/* Slider 1: Capital */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>Investment Capital:</span>
                  <span className="font-mono font-bold text-amber-400 tabular-nums">${(investCapital).toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={25000000}
                  step={250000}
                  value={investCapital}
                  onChange={(e) => setInvestCapital(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 bg-neutral-950 cursor-pointer"
                />
              </div>

              {/* Slider 2: Target Net Yield */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>Target Net Rental Yield:</span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">{targetYield}% / yr</span>
                </div>
                <input
                  type="range"
                  min={4.0}
                  max={12.0}
                  step={0.5}
                  value={targetYield}
                  onChange={(e) => setTargetYield(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 bg-neutral-950 cursor-pointer"
                />
              </div>

              {/* Slider 3: Holding Time */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400 block">Holding Horizon</label>
                  <select
                    value={holdingYears}
                    onChange={(e) => setHoldingYears(parseInt(e.target.value, 10))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-200"
                  >
                    <option value={3}>3 Years</option>
                    <option value={5}>5 Years (Recommended)</option>
                    <option value={7}>7 Years</option>
                    <option value={10}>10 Years</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400 block">Annual Appreciation</label>
                  <select
                    value={annualGrowthRate}
                    onChange={(e) => setAnnualGrowthRate(parseFloat(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-200"
                  >
                    <option value={5.0}>5.0% (Conservative)</option>
                    <option value={7.5}>7.5% (Prime Gateway)</option>
                    <option value={10.0}>10.0% (High Growth)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Simulated Returns Over {holdingYears} Years
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider">Annual Net Rental Cashflow</span>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums mt-1">
                    ${annualRentalIncome.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">${monthlyRentalIncome.toLocaleString()} / mo</div>
                </div>

                <div className="p-4 bg-neutral-900/80 rounded-lg border border-neutral-800">
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider">Projected Portfolio Value</span>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white tabular-nums mt-1">
                    ${projectedFutureEquity.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">+${capitalGain.toLocaleString()} Equity Growth</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-300 font-medium">Total Projected Return (Cashflow + Gain):</span>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">
                    +${totalCumulativeReturn.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-neutral-400 font-mono">Total ROI</span>
                  <div className="text-lg font-bold text-amber-300 font-mono">
                    +{((totalCumulativeReturn / investCapital) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Selected Investment Opportunities Showcase */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl font-bold text-white">
              Selected High-Yield Opportunities
            </h3>
            <span className="text-xs text-neutral-400 font-mono">
              Institutional grade listings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentProperties.slice(0, 3).map((prop) => (
              <div
                key={prop.id}
                onClick={() => setSelectedProperty(prop)}
                className="group bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded text-xs font-mono font-bold">
                    Net Yield: {prop.projectedROI?.rentalYield}%
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-serif text-xl font-bold text-white tabular-nums mb-1">
                    {formatPrice(prop.price, prop.currency)}
                  </div>
                  <h4 className="font-serif text-base font-semibold text-neutral-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mb-3">{prop.location.neighborhood}, {prop.location.city}</p>
                  
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-amber-400 font-medium">
                    <span>Est. Annual: ${prop.projectedROI?.estimatedAnnualReturn.toLocaleString()}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
