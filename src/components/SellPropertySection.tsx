import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { 
  Building2, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Send 
} from 'lucide-react';

export const SellPropertySection: React.FC = () => {
  const { submitInquiry } = useRealEstate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('villa');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock estimated market valuation based on entered size and type
  const numericSize = parseInt(size.replace(/[^0-9]/g, '') || '0', 10);
  const estimatedMin = numericSize > 0 ? numericSize * 1100 : 0;
  const estimatedMax = numericSize > 0 ? numericSize * 1650 : 0;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitInquiry({
      type: 'sell_submission',
      name,
      email,
      phone,
      message: `Owner listing proposal for a ${propertyType} in ${location}. Size: ${size}. Expected Price: ${expectedPrice}. Notes: ${description}`,
      sellDetails: {
        propertyType,
        location,
        size,
        expectedPrice,
      }
    });

    setIsSubmitted(true);
  };

  return (
    <section id="sell-section" className="py-24 bg-neutral-900 border-t border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maximize Realized Value</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Sell Your Property With Aura Estates
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Market your property to qualified high-net-worth buyers and sovereign investment funds through targeted global placement and bespoke architectural marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Why Sell With Us & Live Valuation Preview */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>The Aura Advantage</span>
              </h3>
              <ul className="space-y-3 text-xs text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Discreet Private Marketing:</strong> Option to transact off-market to preserve strict privacy and shield family affairs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Cinematic Visual Media:</strong> 8K drone aerials, architectural twilight videography, and curated digital dossiers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Direct Buyer Pre-Qualification:</strong> Zero speculative showings; proof of funds required prior to private access.</span>
                </li>
              </ul>
            </div>

            {/* Instant Valuation Estimator Preview */}
            <div className="p-6 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amber-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <TrendingUp className="w-4 h-4" />
                <span>Instant Valuation Benchmark</span>
              </div>
              <p className="text-xs text-neutral-400">
                Enter your property size in the form to see our predictive market range based on recent prime transactions.
              </p>
              {numericSize > 0 ? (
                <div className="pt-2">
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider">Estimated Market Value:</span>
                  <div className="font-serif text-2xl font-bold text-amber-400 tabular-nums mt-0.5">
                    ${(estimatedMin).toLocaleString()} – ${(estimatedMax).toLocaleString()}
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1 font-mono">
                    Based on ${1100} - ${1650} / sq ft luxury benchmark
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-neutral-950/80 rounded border border-neutral-800/80 text-xs text-neutral-500 italic">
                  Enter square footage on the right to activate instant valuation.
                </div>
              )}
            </div>

            <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-400 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Over $1.4 Billion in closed transactions across 6 global metropolitan hubs.</span>
            </div>

          </div>

          {/* Right Column: Submission Form */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8">
            
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-white">Listing Proposal Submitted</h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Your property submission for <strong className="text-amber-400">{location}</strong> has been assigned to our Senior Listing Partner. A formal comparative market analysis (CMA) will be delivered to <strong className="text-white">{email}</strong> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setLocation('');
                      setSize('');
                      setExpectedPrice('');
                      setDescription('');
                      setUploadedFiles([]);
                    }}
                    className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Submit Another Property
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-neutral-800 pb-3">
                  <h3 className="font-serif text-xl font-bold text-white">List Your Property For Valuation & Sale</h3>
                  <p className="text-xs text-neutral-400 mt-1">Complete the details below for a confidential pricing appraisal.</p>
                </div>

                {/* Owner Information */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Wright"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Property Type *</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="villa">Modern Villa / Detached House</option>
                      <option value="penthouse">Penthouse / Luxury Apartment</option>
                      <option value="commercial">Commercial Plaza / Office</option>
                      <option value="farmhouse">Farmhouse / Equestrian Estate</option>
                      <option value="plot">Residential Plot / Development Land</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Location / Neighborhood *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bel Air Crest, Los Angeles"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Covered Area (sq ft) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 7500"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Expected Price / Target *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. $12,500,000"
                      value={expectedPrice}
                      onChange={(e) => setExpectedPrice(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Property Description & Highlights</label>
                  <textarea
                    rows={3}
                    placeholder="Mention custom features, architectural provenance, pool, views, renovations..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Property Images Upload */}
                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Property Photos / Floorplans</label>
                  <label className="border-2 border-dashed border-neutral-800 hover:border-amber-500/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-900/40">
                    <Upload className="w-6 h-6 text-amber-400 mb-1" />
                    <span className="text-xs text-neutral-300">Click to upload photos or architectural PDFs</span>
                    <span className="text-[10px] text-neutral-500 mt-0.5">JPG, PNG, PDF up to 25MB</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-amber-400">
                      {uploadedFiles.map((f, i) => (
                        <span key={i} className="bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Your Property</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
