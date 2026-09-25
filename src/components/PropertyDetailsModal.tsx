import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Heart, 
  Phone, 
  Mail, 
  MessageSquare, 
  Share2, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Send,
  Building,
  Sparkles
} from 'lucide-react';

export const PropertyDetailsModal: React.FC = () => {
  const { 
    selectedProperty, 
    setSelectedProperty, 
    formatPrice, 
    agents, 
    isFavorite, 
    toggleFavorite,
    openScheduleVisit,
    submitInquiry
  } = useRealEstate();

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [mapMode, setMapMode] = useState<'streets' | 'satellite'>('streets');
  
  // Inquiry form inside modal
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('I am interested in receiving the complete dossier, floorplans, and private inspection terms for this property.');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedProperty) return null;

  const agent = agents.find(a => a.id === selectedProperty.agentId) || agents[0];
  const favorite = isFavorite(selectedProperty.id);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      type: 'inquiry',
      name: inquiryName,
      email: inquiryEmail,
      phone: inquiryPhone,
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title,
      message: inquiryMessage,
    });
    setInquirySubmitted(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/90 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-auto text-neutral-100 flex flex-col max-h-[92vh]">
        
        {/* Top Sticky Header inside modal */}
        <div className="sticky top-0 z-30 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {selectedProperty.purpose === 'sale' ? 'Property For Sale' : 'Property For Rent'}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400 font-mono">Ref: {selectedProperty.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(selectedProperty.id)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-rose-400 transition-colors"
              title="Save Property"
            >
              <Heart className={`w-4 h-4 ${favorite ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-amber-400 transition-colors relative"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 text-[10px] bg-amber-400 text-neutral-950 font-bold px-2 py-0.5 rounded whitespace-nowrap">
                  Link Copied
                </span>
              )}
            </button>
            <button
              onClick={() => setSelectedProperty(null)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Main Visual Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <img
                src={selectedProperty.images[activeImageIndex] || selectedProperty.images[0]}
                alt={`${selectedProperty.title} preview ${activeImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-neutral-300 border border-neutral-700/50">
                {activeImageIndex + 1} / {selectedProperty.images.length}
              </div>
            </div>

            {/* Thumbnails row */}
            {selectedProperty.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProperty.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-400 opacity-100 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Pricing & Primary Specs */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                {selectedProperty.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{selectedProperty.location.address}, {selectedProperty.location.neighborhood}, {selectedProperty.location.city}, {selectedProperty.location.country}</span>
              </div>
            </div>

            <div className="md:text-right shrink-0">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-400 tabular-nums">
                {formatPrice(selectedProperty.price, selectedProperty.currency)}
                {selectedProperty.purpose === 'rent' && <span className="text-sm font-sans text-neutral-400 font-normal"> / mo</span>}
              </div>
              <div className="text-xs text-neutral-400 mt-1 font-mono">
                {selectedProperty.status === 'under_contract' ? 'Status: Under Contract' : selectedProperty.status === 'sold' ? 'Status: Sold' : 'Status: Available for Acquisition'}
              </div>
            </div>
          </div>

          {/* Unboxed Key Metrics Grid adhering to anti-pill discipline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            {selectedProperty.bedrooms > 0 && (
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">Bedrooms</span>
                <p className="text-lg font-semibold text-neutral-100 mt-0.5 font-mono">{selectedProperty.bedrooms} Beds</p>
              </div>
            )}
            {selectedProperty.bathrooms > 0 && (
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">Bathrooms</span>
                <p className="text-lg font-semibold text-neutral-100 mt-0.5 font-mono">{selectedProperty.bathrooms} Full Baths</p>
              </div>
            )}
            {selectedProperty.coveredArea > 0 && (
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">Interior Area</span>
                <p className="text-lg font-semibold text-neutral-100 mt-0.5 font-mono tabular-nums">{selectedProperty.coveredArea.toLocaleString()} sq ft</p>
              </div>
            )}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">Year Built / Renovated</span>
              <p className="text-lg font-semibold text-neutral-100 mt-0.5 font-mono">{selectedProperty.yearBuilt}</p>
            </div>
          </div>

          {/* Investment Metrics (if applicable) */}
          {selectedProperty.isInvestment && selectedProperty.projectedROI && (
            <div className="p-5 bg-neutral-950 border border-amber-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Institutional Investment & Yield Forecast</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-400">Net Rental Yield</span>
                  <p className="text-xl font-bold text-emerald-400 mt-1">{selectedProperty.projectedROI.rentalYield}% / yr</p>
                </div>
                <div>
                  <span className="text-neutral-400">Capital Growth (5-Yr Proj.)</span>
                  <p className="text-xl font-bold text-amber-300 mt-1">+{selectedProperty.projectedROI.capitalGrowth}%</p>
                </div>
                <div>
                  <span className="text-neutral-400">Est. Annual Net Return</span>
                  <p className="text-xl font-bold text-neutral-100 mt-1">${selectedProperty.projectedROI.estimatedAnnualReturn.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Narrative Description */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-white mb-3">About The Property</h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
              {selectedProperty.description}
            </p>
          </div>

          {/* Features & Amenities Checklist */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-white mb-4">Features & High-End Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedProperty.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated Google Maps Location with Street/Satellite toggle */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-2xl font-semibold text-white">Location & Neighborhood</h3>
              <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setMapMode('streets')}
                  className={`px-2.5 py-1 rounded transition-colors ${mapMode === 'streets' ? 'bg-amber-400 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-neutral-200'}`}
                >
                  Map View
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode('satellite')}
                  className={`px-2.5 py-1 rounded transition-colors ${mapMode === 'satellite' ? 'bg-amber-400 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-neutral-200'}`}
                >
                  Satellite
                </button>
              </div>
            </div>

            {/* Interactive map placeholder with real coordinates */}
            <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                  backgroundImage: mapMode === 'satellite'
                    ? 'radial-gradient(circle at center, #1c2b36 0%, #0d131a 100%)'
                    : 'linear-gradient(135deg, #181b20 0%, #0f1115 100%)'
                }}
              />
              {/* Grid overlay simulating streets */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="relative z-10 text-center p-4">
                <div className="w-12 h-12 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center mx-auto mb-2 shadow-xl shadow-amber-500/20 animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-neutral-100 text-sm">{selectedProperty.location.address}</h4>
                <p className="text-xs text-neutral-400">{selectedProperty.location.neighborhood}, {selectedProperty.location.city}</p>
                <p className="text-[11px] font-mono text-amber-400 mt-1">
                  Coords: {selectedProperty.location.coordinates.lat.toFixed(4)}° N, {Math.abs(selectedProperty.location.coordinates.lng).toFixed(4)}° W
                </p>
              </div>

              <div className="absolute bottom-2 right-2 text-[10px] text-neutral-500 font-mono bg-neutral-950/80 px-2 py-1 rounded">
                Google Maps Verified Coordinates
              </div>
            </div>
          </div>

          {/* Dedicated Agent Info & Conversion Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-neutral-800">
            
            {/* Agent Profile Card */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/40"
                  />
                  <div>
                    <h4 className="font-serif text-xl font-bold text-white">{agent.name}</h4>
                    <p className="text-xs text-amber-400">{agent.position}</p>
                    <p className="text-[11px] text-neutral-400 font-mono mt-0.5">{agent.experienceYears} Years Experience · {agent.closedVolume} Career Deals</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                  {agent.bio}
                </p>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                    className="py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-semibold text-neutral-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Agent</span>
                  </a>

                  <a
                    href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(agent.name)},%20I%20am%20inquiring%20about%20${encodeURIComponent(selectedProperty.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    openScheduleVisit(selectedProperty);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule a Private Visit</span>
                </button>
              </div>
            </div>

            {/* Direct Instant Inquiry Form */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl">
              <h4 className="font-serif text-xl font-bold text-white mb-2">Request Confidential Dossier</h4>
              <p className="text-xs text-neutral-400 mb-4">
                Submit an inquiry directly to the listing agent for floorplans and private escrow terms.
              </p>

              {inquirySubmitted ? (
                <div className="p-6 bg-neutral-900/80 border border-amber-500/40 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto" />
                  <h5 className="font-serif text-lg font-bold text-white">Inquiry Received</h5>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Thank you, {inquiryName}. Agent {agent.name} has received your inquiry for "{selectedProperty.title}" and will contact you directly within 2 business hours.
                  </p>
                  <button
                    onClick={() => setInquirySubmitted(false)}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / Mobile *"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-neutral-700"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
