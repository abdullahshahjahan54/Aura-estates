import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Agent, Inquiry, SearchFilterState, RealEstateGuide } from '../types';
import { INITIAL_PROPERTIES, INITIAL_AGENTS, INITIAL_INQUIRIES, REAL_ESTATE_GUIDES } from '../data/mockData';

export type Currency = 'USD' | 'EUR' | 'GBP';

const CURRENCY_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

interface RealEstateContextType {
  properties: Property[];
  agents: Agent[];
  inquiries: Inquiry[];
  guides: RealEstateGuide[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amount: number, fromCurrency?: string) => string;
  searchFilters: SearchFilterState;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  resetFilters: () => void;
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  selectedProperty: Property | null;
  setSelectedProperty: (prop: Property | null) => void;
  scheduleVisitProperty: Property | null;
  openScheduleVisit: (prop: Property) => void;
  closeScheduleVisit: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedGuide: RealEstateGuide | null;
  setSelectedGuide: (guide: RealEstateGuide | null) => void;
  submitInquiry: (data: {
    type: 'inquiry' | 'schedule_tour' | 'sell_submission' | 'contact_general';
    name: string;
    email: string;
    phone: string;
    propertyId?: string;
    propertyTitle?: string;
    preferredDate?: string;
    tourType?: 'In-Person Private Viewing' | 'Virtual Video Walkthrough';
    message: string;
    sellDetails?: {
      propertyType: string;
      location: string;
      size: string;
      expectedPrice: string;
    };
  }) => { success: boolean; id: string };
  // Admin Operations
  addProperty: (property: Omit<Property, 'id' | 'slug'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  togglePropertyFeatured: (id: string) => void;
  togglePropertyStatus: (id: string) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  seoViewerOpen: boolean;
  setSeoViewerOpen: (open: boolean) => void;
}

const defaultSearchFilters: SearchFilterState = {
  purpose: 'all',
  propertyType: 'all',
  location: '',
  minPrice: 0,
  maxPrice: 0,
  bedrooms: 'all',
  bathrooms: 'all',
  minArea: 0,
  searchTerm: '',
  amenities: [],
};

const RealEstateContext = createContext<RealEstateContextType | undefined>(undefined);

export const RealEstateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('aura_properties');
      return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  const [agents] = useState<Agent[]>(INITIAL_AGENTS);
  const [guides] = useState<RealEstateGuide[]>(REAL_ESTATE_GUIDES);

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem('aura_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_favorites');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-2'];
    } catch {
      return ['prop-1', 'prop-2'];
    }
  });

  const [currency, setCurrency] = useState<Currency>('USD');
  const [searchFilters, setSearchFilters] = useState<SearchFilterState>(defaultSearchFilters);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [scheduleVisitProperty, setScheduleVisitProperty] = useState<Property | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<RealEstateGuide | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [seoViewerOpen, setSeoViewerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('aura_properties', JSON.stringify(properties));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [favorites]);

  const resetFilters = () => {
    setSearchFilters(defaultSearchFilters);
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const openScheduleVisit = (prop: Property) => {
    setScheduleVisitProperty(prop);
  };

  const closeScheduleVisit = () => {
    setScheduleVisitProperty(null);
  };

  const formatPrice = (amount: number, fromCurrency = 'USD'): string => {
    // Normalize to USD then convert to target currency
    const usdAmount = fromCurrency === 'EUR' ? amount / 0.92 : fromCurrency === 'GBP' ? amount / 0.78 : amount;
    const targetAmount = usdAmount * CURRENCY_RATES[currency];

    const symbol = CURRENCY_SYMBOLS[currency];
    if (targetAmount >= 1000000) {
      const millions = targetAmount / 1000000;
      return `${symbol}${millions.toFixed(millions >= 10 ? 1 : 2)}M`;
    }
    return `${symbol}${Math.round(targetAmount).toLocaleString()}`;
  };

  const submitInquiry = (data: {
    type: 'inquiry' | 'schedule_tour' | 'sell_submission' | 'contact_general';
    name: string;
    email: string;
    phone: string;
    propertyId?: string;
    propertyTitle?: string;
    preferredDate?: string;
    tourType?: 'In-Person Private Viewing' | 'Virtual Video Walkthrough';
    message: string;
    sellDetails?: {
      propertyType: string;
      location: string;
      size: string;
      expectedPrice: string;
    };
  }) => {
    const newInquiry: Inquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    return { success: true, id: newInquiry.id };
  };

  // Admin CRUD
  const addProperty = (propData: Omit<Property, 'id' | 'slug'>) => {
    const id = `prop-${Date.now()}`;
    const slug = propData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProp: Property = {
      ...propData,
      id,
      slug,
    };
    setProperties((prev) => [newProp, ...prev]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    if (selectedProperty && selectedProperty.id === id) {
      setSelectedProperty(null);
    }
  };

  const togglePropertyFeatured = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const togglePropertyStatus = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextStatus = p.status === 'available' ? 'under_contract' : p.status === 'under_contract' ? 'sold' : 'available';
        return { ...p, status: nextStatus };
      })
    );
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  return (
    <RealEstateContext.Provider
      value={{
        properties,
        agents,
        inquiries,
        guides,
        currency,
        setCurrency,
        formatPrice,
        searchFilters,
        setSearchFilters,
        resetFilters,
        favorites,
        toggleFavorite,
        isFavorite,
        selectedProperty,
        setSelectedProperty,
        scheduleVisitProperty,
        openScheduleVisit,
        closeScheduleVisit,
        activeTab,
        setActiveTab,
        selectedGuide,
        setSelectedGuide,
        submitInquiry,
        addProperty,
        updateProperty,
        deleteProperty,
        togglePropertyFeatured,
        togglePropertyStatus,
        updateInquiryStatus,
        deleteInquiry,
        seoViewerOpen,
        setSeoViewerOpen,
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};

export const useRealEstate = () => {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error('useRealEstate must be used within a RealEstateProvider');
  }
  return context;
};
