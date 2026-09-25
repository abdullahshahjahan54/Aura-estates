export type Purpose = 'sale' | 'rent';

export type PropertyType = 
  | 'villa' 
  | 'apartment' 
  | 'penthouse'
  | 'commercial' 
  | 'plot' 
  | 'farmhouse'
  | 'luxury_estate';

export type PropertyStatus = 'available' | 'under_contract' | 'sold';

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price: number;
  currency: 'USD' | 'EUR' | 'GBP';
  purpose: Purpose;
  type: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  isInvestment: boolean;
  projectedROI?: {
    rentalYield: number; // percentage, e.g. 7.5
    capitalGrowth: number; // percentage annual, e.g. 11.2
    estimatedAnnualReturn: number; // dollar amount
  };
  bedrooms: number;
  bathrooms: number;
  coveredArea: number; // in sq ft
  plotSize?: number; // in sq ft or acres
  location: {
    address: string;
    neighborhood: string;
    city: string;
    state?: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  features: string[];
  images: string[];
  agentId: string;
  yearBuilt: number;
  seoTitle: string;
  metaDescription: string;
}

export interface Agent {
  id: string;
  name: string;
  position: string;
  experienceYears: number;
  phone: string;
  email: string;
  whatsapp: string;
  photo: string;
  bio: string;
  specialization: string;
  closedVolume: string;
}

export interface Inquiry {
  id: string;
  createdAt: string;
  type: 'inquiry' | 'schedule_tour' | 'sell_submission' | 'contact_general';
  name: string;
  email: string;
  phone: string;
  propertyId?: string;
  propertyTitle?: string;
  preferredDate?: string;
  tourType?: 'In-Person Private Viewing' | 'Virtual Video Walkthrough';
  message: string;
  status: 'New' | 'Contacted' | 'Viewing Scheduled' | 'Closed';
  sellDetails?: {
    propertyType: string;
    location: string;
    size: string;
    expectedPrice: string;
  };
}

export interface RealEstateGuide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  seoTitle: string;
  metaDescription: string;
  keyTakeaways: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrCity: string;
  avatar: string;
  rating: number;
  dealType: string;
  comment: string;
}

export interface PrimeLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  propertiesCount: number;
  avgPriceSqFt: number;
  propertyTypes: string[];
  highlight: string;
}

export interface SearchFilterState {
  purpose: 'all' | 'sale' | 'rent';
  propertyType: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  bathrooms: string;
  minArea: number;
  searchTerm: string;
  amenities: string[];
}
