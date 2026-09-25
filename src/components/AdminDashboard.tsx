import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { Property, Inquiry, Purpose, PropertyType } from '../types';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  CheckCircle, 
  Inbox, 
  DollarSign, 
  Calendar, 
  X, 
  Save, 
  Eye, 
  Phone, 
  Mail, 
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    properties, 
    inquiries, 
    agents,
    formatPrice, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    togglePropertyFeatured, 
    togglePropertyStatus,
    updateInquiryStatus, 
    deleteInquiry,
    setSelectedProperty,
    setActiveTab
  } = useRealEstate();

  const [activeAdminTab, setActiveAdminTab] = useState<'properties' | 'inquiries' | 'leads'>('properties');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [propertySearch, setPropertySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'New' | 'Contacted' | 'Viewing Scheduled' | 'Closed'>('all');

  // New Property Form State
  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState<number>(5000000);
  const [formPurpose, setFormPurpose] = useState<Purpose>('sale');
  const [formType, setFormType] = useState<PropertyType>('villa');
  const [formBedrooms, setFormBedrooms] = useState<number>(5);
  const [formBathrooms, setFormBathrooms] = useState<number>(6);
  const [formArea, setFormArea] = useState<number>(6500);
  const [formPlotSize, setFormPlotSize] = useState<number>(20000);
  const [formAddress, setFormAddress] = useState('');
  const [formNeighborhood, setFormNeighborhood] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formCountry, setFormCountry] = useState('United States');
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState('Infinity Edge Pool, Wine Vault, Smart Automation, Private Security');
  const [formImageUrl, setFormImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [formAgentId, setFormAgentId] = useState('agent-1');
  const [formFeatured, setFormFeatured] = useState(true);
  const [formIsInvestment, setFormIsInvestment] = useState(false);
  const [formYield, setFormYield] = useState<number>(7.5);

  const resetForm = () => {
    setFormTitle('');
    setFormTagline('');
    setFormPrice(5000000);
    setFormPurpose('sale');
    setFormType('villa');
    setFormBedrooms(5);
    setFormBathrooms(6);
    setFormArea(6500);
    setFormPlotSize(20000);
    setFormAddress('');
    setFormNeighborhood('');
    setFormCity('');
    setFormCountry('United States');
    setFormDescription('');
    setFormFeatures('Infinity Edge Pool, Wine Vault, Smart Automation, Private Security');
    setFormImageUrl('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
    setFormAgentId('agent-1');
    setFormFeatured(true);
    setFormIsInvestment(false);
    setFormYield(7.5);
    setEditingProperty(null);
    setIsAddingNew(false);
  };

  const handleEditClick = (p: Property) => {
    setEditingProperty(p);
    setFormTitle(p.title);
    setFormTagline(p.tagline);
    setFormPrice(p.price);
    setFormPurpose(p.purpose);
    setFormType(p.type);
    setFormBedrooms(p.bedrooms);
    setFormBathrooms(p.bathrooms);
    setFormArea(p.coveredArea);
    setFormPlotSize(p.plotSize || 0);
    setFormAddress(p.location.address);
    setFormNeighborhood(p.location.neighborhood);
    setFormCity(p.location.city);
    setFormCountry(p.location.country);
    setFormDescription(p.description);
    setFormFeatures(p.features.join(', '));
    setFormImageUrl(p.images[0]);
    setFormAgentId(p.agentId);
    setFormFeatured(p.featured);
    setFormIsInvestment(p.isInvestment);
    setFormYield(p.projectedROI?.rentalYield || 7.5);
    setIsAddingNew(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = formFeatures.split(',').map(f => f.trim()).filter(Boolean);

    if (editingProperty) {
      // Update
      updateProperty(editingProperty.id, {
        title: formTitle,
        tagline: formTagline,
        price: formPrice,
        purpose: formPurpose,
        type: formType,
        bedrooms: formBedrooms,
        bathrooms: formBathrooms,
        coveredArea: formArea,
        plotSize: formPlotSize,
        location: {
          ...editingProperty.location,
          address: formAddress,
          neighborhood: formNeighborhood,
          city: formCity,
          country: formCountry,
        },
        description: formDescription,
        features: featuresArray,
        images: [formImageUrl, ...editingProperty.images.slice(1)],
        agentId: formAgentId,
        featured: formFeatured,
        isInvestment: formIsInvestment,
        projectedROI: formIsInvestment ? {
          rentalYield: formYield,
          capitalGrowth: 11.0,
          estimatedAnnualReturn: Math.round(formPrice * (formYield / 100))
        } : undefined,
      });
    } else {
      // Add
      addProperty({
        title: formTitle,
        tagline: formTagline,
        price: formPrice,
        currency: 'USD',
        purpose: formPurpose,
        type: formType,
        status: 'available',
        featured: formFeatured,
        isInvestment: formIsInvestment,
        projectedROI: formIsInvestment ? {
          rentalYield: formYield,
          capitalGrowth: 11.0,
          estimatedAnnualReturn: Math.round(formPrice * (formYield / 100))
        } : undefined,
        bedrooms: formBedrooms,
        bathrooms: formBathrooms,
        coveredArea: formArea,
        plotSize: formPlotSize,
        location: {
          address: formAddress || '100 Prime Avenue',
          neighborhood: formNeighborhood || 'Bel Air',
          city: formCity || 'Los Angeles',
          country: formCountry || 'United States',
          coordinates: { lat: 34.0837, lng: -118.4487 }
        },
        description: formDescription || 'An exclusive luxury residence featuring state-of-the-art finishes and prestigious location.',
        features: featuresArray,
        images: [formImageUrl],
        agentId: formAgentId,
        yearBuilt: 2024,
        seoTitle: `${formTitle} | Luxury Real Estate`,
        metaDescription: `Exclusive ${formType} in ${formCity} featuring ${formBedrooms} beds, ${formBathrooms} baths.`
      });
    }

    resetForm();
  };

  // Metrics
  const totalValue = properties.reduce((acc, p) => acc + p.price, 0);
  const newInquiries = inquiries.filter(i => i.status === 'New').length;
  const scheduledTours = inquiries.filter(i => i.type === 'schedule_tour').length;

  const filteredProperties = properties.filter(p =>
    `${p.title} ${p.location.city} ${p.location.neighborhood}`.toLowerCase().includes(propertySearch.toLowerCase())
  );

  const filteredInquiries = inquiries.filter(inq => {
    if (inquiryFilter === 'all') return true;
    return inq.status === inquiryFilter;
  });

  return (
    <section className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-neutral-800 gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Back-Office CRM & Content Management</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">
              Aura Estates Admin Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetForm();
                setIsAddingNew(true);
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Property</span>
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs rounded-lg border border-neutral-800 transition-colors"
            >
              Return to Website
            </button>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Active Inventory</span>
            <div className="font-serif text-3xl font-bold text-white mt-1 tabular-nums">{properties.length}</div>
            <p className="text-[11px] text-neutral-500 mt-0.5">Properties under brokerage</p>
          </div>

          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Gross Listing Value</span>
            <div className="font-serif text-3xl font-bold text-amber-400 mt-1 tabular-nums">
              ${(totalValue / 1000000).toFixed(1)}M
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5">Active portfolio volume</p>
          </div>

          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Total Client Inquiries</span>
            <div className="font-serif text-3xl font-bold text-white mt-1 tabular-nums">{inquiries.length}</div>
            <p className="text-[11px] text-emerald-400 mt-0.5">{newInquiries} action required</p>
          </div>

          <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Private Tours Logged</span>
            <div className="font-serif text-3xl font-bold text-white mt-1 tabular-nums">{scheduledTours}</div>
            <p className="text-[11px] text-neutral-500 mt-0.5">Confirmed private visits</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-800 mb-8">
          <button
            onClick={() => setActiveAdminTab('properties')}
            className={`pb-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 ${
              activeAdminTab === 'properties'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Properties ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('inquiries')}
            className={`pb-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 ${
              activeAdminTab === 'inquiries'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Lead Inbox & Viewings ({inquiries.length})</span>
            {newInquiries > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* SECTION 1: PROPERTIES MANAGEMENT */}
        {activeAdminTab === 'properties' && (
          <div className="space-y-6">
            
            {/* Search Bar for Properties */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-72">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter listings by name or city..."
                  value={propertySearch}
                  onChange={(e) => setPropertySearch(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Properties Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider font-mono">
                    <tr>
                      <th className="py-3 px-4">Property</th>
                      <th className="py-3 px-4">Type / Purpose</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-neutral-850 transition-colors">
                        
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prop.images[0]}
                              alt=""
                              className="w-12 h-9 rounded object-cover border border-neutral-800 shrink-0"
                            />
                            <div>
                              <div className="font-semibold text-white font-serif text-sm">{prop.title}</div>
                              <div className="text-[11px] text-neutral-400 font-mono">ID: {prop.id}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="capitalize text-neutral-300">{prop.type}</span>
                          <span className="text-neutral-500"> · </span>
                          <span className="uppercase text-amber-400 font-semibold">{prop.purpose}</span>
                        </td>

                        <td className="py-3 px-4 font-mono font-semibold text-neutral-200 tabular-nums">
                          {formatPrice(prop.price, prop.currency)}
                        </td>

                        <td className="py-3 px-4 text-neutral-300">
                          {prop.location.neighborhood}, {prop.location.city}
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => togglePropertyStatus(prop.id)}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
                              prop.status === 'available'
                                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30 hover:border-emerald-400'
                                : prop.status === 'under_contract'
                                ? 'bg-amber-950/60 text-amber-400 border-amber-500/30 hover:border-amber-400'
                                : 'bg-rose-950/60 text-rose-400 border-rose-500/30 hover:border-rose-400'
                            }`}
                            title="Click to cycle status: Available -> Under Contract -> Sold"
                          >
                            {prop.status.replace('_', ' ')}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => togglePropertyFeatured(prop.id)}
                            className="p-1 hover:text-amber-400 transition-colors"
                            title="Toggle Featured"
                          >
                            <Star className={`w-4 h-4 mx-auto ${prop.featured ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`} />
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedProperty(prop)}
                              className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white"
                              title="Preview on site"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditClick(prop)}
                              className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-amber-400"
                              title="Edit Listing"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete "${prop.title}"?`)) {
                                  deleteProperty(prop.id);
                                }
                              }}
                              className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-rose-400"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 2: INQUIRIES & LEAD MANAGEMENT */}
        {activeAdminTab === 'inquiries' && (
          <div className="space-y-6">
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">Filter by Status:</span>
              {(['all', 'New', 'Contacted', 'Viewing Scheduled', 'Closed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setInquiryFilter(st)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    inquiryFilter === st
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {st === 'all' ? 'All Inquiries' : st}
                </button>
              ))}
            </div>

            {/* Inquiries Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
                          {inq.type.replace('_', ' ')}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white">{inq.name}</h4>
                      </div>
                      
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as Inquiry['status'])}
                        className={`text-xs rounded px-2 py-1 font-mono border ${
                          inq.status === 'New'
                            ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                            : inq.status === 'Viewing Scheduled'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                            : inq.status === 'Contacted'
                            ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                            : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Viewing Scheduled">Viewing Scheduled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <div className="space-y-1 text-xs text-neutral-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-neutral-500" />
                        <a href={`mailto:${inq.email}`} className="hover:text-amber-300">{inq.email}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-neutral-500" />
                        <a href={`tel:${inq.phone}`} className="hover:text-amber-300">{inq.phone}</a>
                      </div>
                      {inq.propertyTitle && (
                        <div className="text-neutral-300 pt-1">
                          <span className="text-neutral-500">Property: </span>
                          <strong>{inq.propertyTitle}</strong>
                        </div>
                      )}
                      {inq.preferredDate && (
                        <div className="text-amber-400 font-mono">
                          <span>Tour Date: {inq.preferredDate} ({inq.tourType})</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-neutral-950 rounded border border-neutral-800/80 text-xs text-neutral-300 leading-relaxed font-light">
                      "{inq.message}"
                    </div>

                    {inq.sellDetails && (
                      <div className="mt-2 p-2 bg-neutral-950/60 rounded text-[11px] text-neutral-400 space-y-0.5 font-mono">
                        <div>Type: {inq.sellDetails.propertyType}</div>
                        <div>Location: {inq.sellDetails.location}</div>
                        <div>Size: {inq.sellDetails.size}</div>
                        <div>Target Price: {inq.sellDetails.expectedPrice}</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span>Logged: {new Date(inq.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      className="text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Delete record"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* MODAL: ADD / EDIT PROPERTY */}
        {isAddingNew && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 text-neutral-100 max-h-[90vh] flex flex-col">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <h3 className="font-serif text-2xl font-bold text-white">
                  {editingProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProperty} className="overflow-y-auto space-y-4 pr-1">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400">Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Bel Air Promontory Estate"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400">Tagline / Subheading</label>
                  <input
                    type="text"
                    placeholder="e.g. Modernist architectural masterpiece overlooking Los Angeles"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Price (USD) *</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      value={formPrice}
                      onChange={(e) => setFormPrice(parseInt(e.target.value, 10))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Purpose *</label>
                    <select
                      value={formPurpose}
                      onChange={(e) => setFormPurpose(e.target.value as Purpose)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Asset Type *</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as PropertyType)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      <option value="villa">Modern Villa</option>
                      <option value="penthouse">Luxury Penthouse</option>
                      <option value="apartment">Apartment / Townhome</option>
                      <option value="commercial">Commercial Plaza</option>
                      <option value="farmhouse">Farmhouse Estate</option>
                      <option value="plot">Development Plot</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Bedrooms</label>
                    <input
                      type="number"
                      min={0}
                      value={formBedrooms}
                      onChange={(e) => setFormBedrooms(parseInt(e.target.value, 10))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Bathrooms</label>
                    <input
                      type="number"
                      min={0}
                      value={formBathrooms}
                      onChange={(e) => setFormBathrooms(parseInt(e.target.value, 10))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Area (sq ft)</label>
                    <input
                      type="number"
                      min={0}
                      value={formArea}
                      onChange={(e) => setFormArea(parseInt(e.target.value, 10))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Plot Size (sq ft)</label>
                    <input
                      type="number"
                      min={0}
                      value={formPlotSize}
                      onChange={(e) => setFormPlotSize(parseInt(e.target.value, 10))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                {/* Location Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Street Address</label>
                    <input
                      type="text"
                      placeholder="1200 Crestview Rd"
                      value={formAddress}
                      onChange={(e) => setFormAddress(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">Neighborhood</label>
                    <input
                      type="text"
                      placeholder="Bel Air"
                      value={formNeighborhood}
                      onChange={(e) => setFormNeighborhood(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400">City & Country</label>
                    <input
                      type="text"
                      placeholder="Los Angeles, USA"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400">Primary Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                {/* Features (comma separated) */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400">Amenities & Features (Comma separated)</label>
                  <input
                    type="text"
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400">Detailed Narrative</label>
                  <textarea
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Assigned Agent & Featured Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">Assign Agent</label>
                    <select
                      value={formAgentId}
                      onChange={(e) => setFormAgentId(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      {agents.map(a => (
                        <option key={a.id} value={a.id}>{a.name} ({a.position.split('·')[0]})</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="featCheck"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="accent-amber-400 w-4 h-4 rounded"
                    />
                    <label htmlFor="featCheck" className="text-xs text-neutral-300 cursor-pointer">
                      Mark as Featured Listing
                    </label>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="investCheck"
                      checked={formIsInvestment}
                      onChange={(e) => setFormIsInvestment(e.target.checked)}
                      className="accent-amber-400 w-4 h-4 rounded"
                    />
                    <label htmlFor="investCheck" className="text-xs text-neutral-300 cursor-pointer">
                      High-Yield Investment
                    </label>
                  </div>
                </div>

                {formIsInvestment && (
                  <div className="p-3 bg-neutral-950 border border-amber-500/30 rounded-lg space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-amber-400">Target Net Yield (%)</label>
                    <input
                      type="number"
                      step={0.1}
                      value={formYield}
                      onChange={(e) => setFormYield(parseFloat(e.target.value))}
                      className="w-32 bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                )}

                <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProperty ? 'Save Changes' : 'Publish Property'}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
