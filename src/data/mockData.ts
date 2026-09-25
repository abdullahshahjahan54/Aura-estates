import { Property, Agent, RealEstateGuide, Testimonial, PrimeLocation } from '../types';

import heroImg from '../assets/images/hero_luxury_estate_1790329148109.jpg';
import villaImg from '../assets/images/property_modern_villa_1790329162782.jpg';
import penthouseImg from '../assets/images/property_penthouse_loft_1790329174200.jpg';
import plazaImg from '../assets/images/property_commercial_plaza_1790329186317.jpg';
import farmhouseImg from '../assets/images/property_farmhouse_estate_1790329197617.jpg';

export const HERO_ASSET = heroImg;

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Victoria Sterling',
    position: 'Managing Partner · Luxury Estates',
    experienceYears: 16,
    phone: '+1 (310) 849-2910',
    email: 'v.sterling@auraestates.luxury',
    whatsapp: '+13108492910',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Specializing in trophy residences and private architectural compounds in Beverly Hills, Bel Air, and Malibu with over $650M in career closings.',
    specialization: 'Ultra-Luxury Mansions & Estates',
    closedVolume: '$650M+'
  },
  {
    id: 'agent-2',
    name: 'Julian Vance',
    position: 'Director of Commercial Acquisitions',
    experienceYears: 14,
    phone: '+1 (212) 693-4412',
    email: 'j.vance@auraestates.luxury',
    whatsapp: '+12126934412',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    bio: 'Advising institutional family offices and private equity investors on Class-A office towers, retail plazas, and mixed-use commercial developments.',
    specialization: 'Commercial Real Estate & Institutional Portfolios',
    closedVolume: '$820M+'
  },
  {
    id: 'agent-3',
    name: 'Elena Rostova',
    position: 'Head of Global Penthouses & Yields',
    experienceYears: 11,
    phone: '+44 20 7946 0912',
    email: 'e.rostova@auraestates.luxury',
    whatsapp: '+442079460912',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Recognized authority on international high-yield penthouses, cross-border tax incentives, and prime London & Dubai developments.',
    specialization: 'High-Yield Penthouses & Capital Appreciation',
    closedVolume: '$410M+'
  },
  {
    id: 'agent-4',
    name: 'Marcus Thorne',
    position: 'Principal Land & Estate Strategist',
    experienceYears: 18,
    phone: '+1 (305) 552-8199',
    email: 'm.thorne@auraestates.luxury',
    whatsapp: '+13055528199',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in private coastal acreage, zoned development parcels, and architectural country farmhouses across North America and Southern Europe.',
    specialization: 'Residential Land Parcels & Country Estates',
    closedVolume: '$520M+'
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    slug: 'the-solarium-bel-air-estate',
    title: 'The Solarium Architectural Compound',
    tagline: 'Iconic cantilevered modernist masterpiece with infinity skyline vistas',
    price: 18500000,
    currency: 'USD',
    purpose: 'sale',
    type: 'villa',
    status: 'available',
    featured: true,
    isInvestment: true,
    projectedROI: {
      rentalYield: 6.8,
      capitalGrowth: 12.4,
      estimatedAnnualReturn: 1258000
    },
    bedrooms: 6,
    bathrooms: 8,
    coveredArea: 9850,
    plotSize: 45000,
    location: {
      address: '1420 Bel Air Crest Rd',
      neighborhood: 'Bel Air',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      coordinates: { lat: 34.0837, lng: -118.4487 }
    },
    description: 'Set behind double guarded gates on an ultra-private promontory, The Solarium merges organic travertine surfaces with floor-to-ceiling glass pavilions. Featuring a 75-foot cantilevered infinity pool overlooking downtown Los Angeles, wine cellar with 1,200 bottle capacity, state-of-the-art wellness pavilion with cold plunge, and custom Italian Poliform kitchen.',
    features: [
      'Cantilevered Zero-Edge Pool',
      'Temperature-Controlled Wine Vault',
      'Private 6-Car Gallery Garage',
      'Smart Home Savant Automation',
      'Staff Quarters with Private Entry',
      'Motorized Fleetwood Pocket Glass Doors',
      'Outdoor Kitchen & Fire Pits',
      'Wellness Spa & Finnish Sauna'
    ],
    images: [
      villaImg,
      heroImg,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-1',
    yearBuilt: 2024,
    seoTitle: 'The Solarium Compound | Luxury Villa For Sale in Bel Air, Los Angeles',
    metaDescription: '6 Bedroom, 8 Bath Architectural Modernist Mansion in Bel Air, CA. Features 75ft infinity pool, wine cellar, and panoramic skyline views.'
  },
  {
    id: 'prop-2',
    slug: 'the-sky-residence-tribeca-penthouse',
    title: 'The Sky Residence at 111 Franklin',
    tagline: 'Duplex penthouse with 360-degree Hudson River and Manhattan skyline views',
    price: 14200000,
    currency: 'USD',
    purpose: 'sale',
    type: 'penthouse',
    status: 'available',
    featured: true,
    isInvestment: true,
    projectedROI: {
      rentalYield: 7.2,
      capitalGrowth: 9.8,
      estimatedAnnualReturn: 1022400
    },
    bedrooms: 4,
    bathrooms: 5,
    coveredArea: 6400,
    location: {
      address: '111 Franklin Street, PH-B',
      neighborhood: 'Tribeca',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      coordinates: { lat: 40.7186, lng: -74.0085 }
    },
    description: 'An architectural tour de force occupying the top two levels of Tribeca’s most sought-after boutique condominium. Direct keyed elevator access opens into dramatic double-height 24-foot ceilings with private wraparound landscaped terrace, Calacatta marble fireplace, Sub-Zero & Gaggenau culinary suite, and primary suite sanctuary with deep soaking tub framed by skyline windows.',
    features: [
      'Private Keyed Elevator Access',
      '1,800 sq ft Landscaped Wrap Terrace',
      '24-Foot Double-Height Ceilings',
      'Calacatta Viola Marble Fireplace',
      'Dedicated 24/7 Doorman & Valet',
      'Sonos Architectural Sound System',
      'Radiant Heated French White Oak Floors',
      'Private Heated Storage Vault'
    ],
    images: [
      penthouseImg,
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-3',
    yearBuilt: 2023,
    seoTitle: 'Tribeca Sky Penthouse For Sale | Luxury Manhattan Real Estate',
    metaDescription: 'Luxury 4-Bedroom Duplex Penthouse in Tribeca NY with 360 river views, private terrace, and 24ft ceilings.'
  },
  {
    id: 'prop-3',
    slug: 'lumina-tower-financial-district',
    title: 'Lumina Commercial Plaza & Towers',
    tagline: 'Institutional Grade Class-A commercial office & retail complex',
    price: 48000000,
    currency: 'USD',
    purpose: 'sale',
    type: 'commercial',
    status: 'available',
    featured: true,
    isInvestment: true,
    projectedROI: {
      rentalYield: 9.4,
      capitalGrowth: 14.1,
      estimatedAnnualReturn: 4512000
    },
    bedrooms: 0,
    bathrooms: 24,
    coveredArea: 68000,
    plotSize: 32000,
    location: {
      address: '500 Brickell Avenue',
      neighborhood: 'Brickell Financial District',
      city: 'Miami',
      state: 'FL',
      country: 'United States',
      coordinates: { lat: 25.7675, lng: -80.1904 }
    },
    description: 'Fully leased Class-A commercial plaza anchored by multinational financial and technology tenants. 98.4% occupancy on long-term triple-net (NNN) leases with weighted average lease expiry (WALE) of 7.8 years. High-efficiency LEED Platinum certification with street-level luxury retail and 280-bay subterranean parking structure.',
    features: [
      'LEED Platinum Certified Architecture',
      '98.4% Occupancy with Fortune 500 Tenants',
      'Triple-Net (NNN) High-Yield Structure',
      '280-Vehicle Subterranean Garage',
      'High-Speed Regenerative Destination Elevators',
      'Rooftop Executive Conference Center',
      'Backup Generator Power Grid',
      'Ground Floor Michelin-Caliber Dining'
    ],
    images: [
      plazaImg,
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-2',
    yearBuilt: 2022,
    seoTitle: 'Lumina Commercial Plaza Brickell | Commercial Real Estate Investment Miami',
    metaDescription: 'Class-A commercial plaza in Brickell Miami with 9.4% net yield, 68,000 sq ft, and premium Fortune 500 institutional tenants.'
  },
  {
    id: 'prop-4',
    slug: 'the-provence-modern-farmhouse',
    title: 'Oakwood Meadow Luxury Farmhouse',
    tagline: 'Timeless modern country farmhouse with equestrian grounds & olive orchards',
    price: 8900000,
    currency: 'USD',
    purpose: 'sale',
    type: 'farmhouse',
    status: 'available',
    featured: true,
    isInvestment: false,
    projectedROI: {
      rentalYield: 5.5,
      capitalGrowth: 8.2,
      estimatedAnnualReturn: 489500
    },
    bedrooms: 5,
    bathrooms: 6,
    coveredArea: 7200,
    plotSize: 260000, // ~6 acres
    location: {
      address: '28400 Meadow View Rd',
      neighborhood: 'Hidden Hills',
      city: 'Calabasas',
      state: 'CA',
      country: 'United States',
      coordinates: { lat: 34.1678, lng: -118.6608 }
    },
    description: 'Designed as an exquisite retreat blending rustic French limestone masonry with black steel sash glazing. Set over 6 sprawling private acres featuring a 4-stall equestrian barn, fenced riding ring, saltwater pool, organic olive grove, guest cottage, and outdoor dining pergola wrapped in fragrant wisteria.',
    features: [
      '6 Acres of Gated Private Grounds',
      '4-Stall Luxury Equestrian Facility',
      'Separate 1-Bedroom Guest House',
      'French Limestone Hand-Cut Fireplaces',
      'Custom Lacanche French Range Cooker',
      'Saltwater Lap Pool & Heated Spa',
      'Private 40-Tree Olive Orchard',
      'High-Speed Solar & Tesla Powerwalls'
    ],
    images: [
      farmhouseImg,
      heroImg,
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-4',
    yearBuilt: 2023,
    seoTitle: 'Oakwood Meadow Farmhouse | Luxury Country Estate For Sale in Calabasas',
    metaDescription: '5 Bed, 6 Bath Modern Farmhouse on 6 acres with equestrian barn, pool, and guest cottage in Hidden Hills / Calabasas.'
  },
  {
    id: 'prop-5',
    slug: 'mayfair-crescent-residence',
    title: 'The Crescent Townhome at Mayfair',
    tagline: 'Restored Georgian Grade-II listed residence with private mews house',
    price: 26500,
    currency: 'GBP',
    purpose: 'rent',
    type: 'apartment',
    status: 'available',
    featured: true,
    isInvestment: false,
    bedrooms: 4,
    bathrooms: 5,
    coveredArea: 5100,
    location: {
      address: '14 Upper Grosvenor Street',
      neighborhood: 'Mayfair',
      city: 'London',
      country: 'United Kingdom',
      coordinates: { lat: 51.5098, lng: -0.1508 }
    },
    description: 'Available for prestigious long-term luxury lease. Masterfully renovated Georgian townhome offering grand ceiling proportions, ornate plasterwork, private internal hydraulic passenger lift, cinema room, secure underground garage, and private landscaped courtyard connecting to a separate guest mews house.',
    features: [
      'Internal Hydraulic Glass Elevator',
      'Private Rear Guest Mews House',
      'Acoustically Treated Private Cinema Room',
      'Subterranean Temperature Wine Room',
      'Private Gated Courtyard Garden',
      '24/7 Monitored Alarm & Concierge',
      'Crestron Lighting & HVAC Control',
      'Formal Dining Room for 16 Guests'
    ],
    images: [
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
      penthouseImg,
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-3',
    yearBuilt: 2021,
    seoTitle: 'Mayfair Luxury Townhome To Rent | Prime Central London Real Estate',
    metaDescription: 'Magnificent 4-Bedroom Georgian Mayfair Residence to rent in London with private mews, lift, and cinema room.'
  },
  {
    id: 'prop-6',
    slug: 'beverly-ridge-residential-plot',
    title: 'Ridgeview Promontory Development Parcel',
    tagline: 'Pre-permitted luxury residential plot with unobstructed ocean & canyon views',
    price: 6500000,
    currency: 'USD',
    purpose: 'sale',
    type: 'plot',
    status: 'available',
    featured: false,
    isInvestment: true,
    projectedROI: {
      rentalYield: 0,
      capitalGrowth: 18.5,
      estimatedAnnualReturn: 1202500
    },
    bedrooms: 0,
    bathrooms: 0,
    coveredArea: 0,
    plotSize: 87120, // 2 acres
    location: {
      address: '2600 Coldwater Canyon Crest',
      neighborhood: 'Beverly Hills Post Office',
      city: 'Beverly Hills',
      state: 'CA',
      country: 'United States',
      coordinates: { lat: 34.1089, lng: -118.4112 }
    },
    description: 'A once-in-a-generation developer or end-user opportunity. 2.0 flat-to-gentle sloping acres situated high above the marine layer. RTI (Ready To Issue) architectural plans from renowned architect for a 14,000 sq ft modern compound with subterranean gallery, tennis court, and infinity pool.',
    features: [
      '2.0 Gross Acre Promontory Lot',
      'RTI Approved Plans for 14,000 sq ft Estate',
      'All Utilities Connected to Site Boundary',
      'Unobstructed 270-Degree Pacific & Canyon Views',
      'Permitted for Regulation Tennis Court',
      'Geotechnical & Soils Reports Completed',
      'Gated Private Access Road'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      heroImg,
      villaImg
    ],
    agentId: 'agent-4',
    yearBuilt: 2024,
    seoTitle: 'Prime Residential Plot For Sale | Beverly Hills Land Investment',
    metaDescription: '2-Acre development plot for sale in Beverly Hills with RTI architectural permits and panoramic canyon views.'
  },
  {
    id: 'prop-7',
    slug: 'palm-jumeirah-coastal-villa',
    title: 'The Palm Horizon Beachfront Villa',
    tagline: 'Private white-sand beach frontage with Dubai Marina skyline views',
    price: 24500000,
    currency: 'USD',
    purpose: 'sale',
    type: 'villa',
    status: 'available',
    featured: true,
    isInvestment: true,
    projectedROI: {
      rentalYield: 8.5,
      capitalGrowth: 13.5,
      estimatedAnnualReturn: 2082500
    },
    bedrooms: 7,
    bathrooms: 9,
    coveredArea: 11400,
    plotSize: 15800,
    location: {
      address: 'Frond G, Palm Jumeirah',
      neighborhood: 'Palm Jumeirah',
      city: 'Dubai',
      country: 'United Arab Emirates',
      coordinates: { lat: 25.1124, lng: 55.1390 }
    },
    description: 'Direct private beachfront living on the prestigious billionaires row of Palm Jumeirah. Featuring private infinity swimming pool merging seamlessly into the Arabian Gulf, private yacht mooring access, Italian custom marble flooring, double staff accommodation, and private cinema.',
    features: [
      'Direct Private Beachfront Access',
      'Private Yacht Mooring Facility',
      'Infinity Edge Pool into Arabian Gulf',
      'Roof Garden with Panoramic Marina Views',
      'Private Elevator to All Levels',
      'Dedicated Staff Quarters & Chef Kitchen',
      '10-Seat 4K Dolby Atmos Cinema',
      '24/7 Gated Frond Security'
    ],
    images: [
      heroImg,
      villaImg,
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-3',
    yearBuilt: 2024,
    seoTitle: 'Palm Jumeirah Beachfront Villa For Sale | Dubai Luxury Real Estate',
    metaDescription: '7-Bedroom ultra-luxury beachfront villa on Palm Jumeirah Dubai with private beach, yacht mooring, and infinity pool.'
  },
  {
    id: 'prop-8',
    slug: 'chelsea-arts-loft-manhattan',
    title: 'The Chelsea Gallery Penthouse',
    tagline: 'Turnkey designer loft with soaring cast-iron columns and private terrace',
    price: 18000,
    currency: 'USD',
    purpose: 'rent',
    type: 'apartment',
    status: 'available',
    featured: false,
    isInvestment: false,
    bedrooms: 3,
    bathrooms: 3,
    coveredArea: 3800,
    location: {
      address: '520 West 24th Street',
      neighborhood: 'West Chelsea',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      coordinates: { lat: 40.7495, lng: -74.0048 }
    },
    description: 'Immaculately furnished designer artist loft steps from the High Line and premier galleries. Exquisite wide-plank chevron oak floors, gas fireplace, bespoke Boffi kitchen, custom lighting fixtures, and a 600 sq ft private terrace with outdoor shower.',
    features: [
      'Turnkey Furnished by AD100 Designer',
      'Private Landscaped Terrace with Shower',
      'Direct Keyed High-Speed Elevator',
      'Museum-Grade Art Display Lighting',
      'Boffi Kitchen with Miele Appliances',
      'Radiant Heated Floors Throughout',
      'Smart Climate & Shade Automation'
    ],
    images: [
      penthouseImg,
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-1',
    yearBuilt: 2022,
    seoTitle: 'Chelsea Designer Loft For Rent | Luxury New York Apartments',
    metaDescription: '3-Bedroom designer luxury loft for rent in Chelsea NYC with private terrace and keyed elevator.'
  }
];

export const PRIME_LOCATIONS: PrimeLocation[] = [
  {
    id: 'loc-1',
    name: 'Beverly Hills & Bel Air',
    city: 'Los Angeles',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 38,
    avgPriceSqFt: 2150,
    propertyTypes: ['Modern Villas', 'Architectural Compounds', 'Residential Plots'],
    highlight: 'World-renowned celebrity compounds, security, and elite school districts.'
  },
  {
    id: 'loc-2',
    name: 'Tribeca & Soho',
    city: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 42,
    avgPriceSqFt: 2850,
    propertyTypes: ['Duplex Penthouses', 'Cast-Iron Lofts', 'Full-Floor Condos'],
    highlight: 'Historic cobblestone streets, private elevators, and Michelin dining.'
  },
  {
    id: 'loc-3',
    name: 'Palm Jumeirah & Downtown',
    city: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 54,
    avgPriceSqFt: 1450,
    propertyTypes: ['Beachfront Villas', 'Ultra-Luxury Towers', 'Commercial Plazas'],
    highlight: 'Tax-free capital growth, guaranteed high rental yields (8-11%), and private beaches.'
  },
  {
    id: 'loc-4',
    name: 'Mayfair & Belgravia',
    city: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 29,
    avgPriceSqFt: 3100,
    propertyTypes: ['Georgian Townhomes', 'Garden Penthouses', 'Mews Residences'],
    highlight: 'Global wealth sanctuary with timeless capital preservation and heritage charm.'
  },
  {
    id: 'loc-5',
    name: 'Brickell & Miami Beach',
    city: 'Miami',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 47,
    avgPriceSqFt: 1680,
    propertyTypes: ['Class-A Office Towers', 'Waterfront Condos', 'Private Islands'],
    highlight: 'Booming financial district hub with 0% state income tax advantage.'
  }
];

export const REAL_ESTATE_GUIDES: RealEstateGuide[] = [
  {
    id: 'guide-1',
    slug: 'how-to-buy-luxury-property-prime-markets',
    title: 'The Modern Playbook for Acquiring Prime Real Estate',
    excerpt: 'Key strategies on due diligence, discreet private sales, escrow structuring, and negotiating trophy assets without overpaying.',
    content: `Acquiring prime residential real estate requires a strategic combination of architectural diligence, discreet negotiation, and cross-border structural planning. In global trophy markets such as Beverly Hills, Manhattan, and London Mayfair, up to 40% of the finest transactions happen "off-market" via private client broker networks.

When evaluating a luxury asset, focus on three non-negotiable fundamentals:
1. Site Topography & Light Exposure: Promontory ridge-lines and south-facing views command permanent premiums that renovation cannot create.
2. Construction Integrity & Engineering: Review subterranean waterproofing, structural cantilevers, and HVAC MEP engineering reports.
3. Private Entity Ownership: Utilize multi-member LLCs or trusts to maintain family privacy and optimize long-term asset succession.`,
    category: 'Buying Guide',
    author: 'Victoria Sterling',
    authorRole: 'Managing Partner',
    date: 'September 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    seoTitle: 'How to Buy Luxury Property in Prime Markets | Aura Estates Guide',
    metaDescription: 'Comprehensive guide to purchasing luxury real estate, off-market deal acquisition, due diligence, and private entity structuring.',
    keyTakeaways: [
      'Over 40% of top-tier trophy listings trade strictly off-market',
      'Site views and natural solar orientation cannot be duplicated',
      'Entity structuring protects purchaser identity and wealth succession'
    ]
  },
  {
    id: 'guide-2',
    slug: 'best-areas-to-invest-in-real-estate-high-roi',
    title: 'Top Global Cities for High-Yield Property Investment',
    excerpt: 'Analyzing cap rates, rental yield growth, and capital appreciation trends across Miami, Dubai, and emerging European hubs.',
    content: `Global real estate allocation in 2026 demands a nuanced balance between cash-on-cash yield and capital appreciation. While mature gateway capitals like London and New York offer rock-solid preservation, emerging financial centers like Miami Brickell and Dubai Marina are generating 7.5% to 10.5% net yields.

Investors looking for optimal total returns should compare gross rental returns against local property taxes, HOA charges, and capital gains structures. In markets with pro-business regulatory environments, institutional investors are locking in strong cashflows while enjoying inflation-hedged equity growth.`,
    category: 'Property Investment',
    author: 'Elena Rostova',
    authorRole: 'Head of Global Yields',
    date: 'September 2026',
    readTime: '5 min read',
    image: plazaImg,
    seoTitle: 'Best Areas to Invest in Real Estate for High ROI | Investment Analysis',
    metaDescription: 'Detailed investment report comparing rental yields, cap rates, and capital growth in Dubai, Miami, and London.',
    keyTakeaways: [
      'Dubai and Miami lead global metros in net rental yields (7.5%–10%)',
      'Tax-advantaged jurisdictions significantly enhance net cashflow',
      'Commercial NNN leases provide superior passive hands-off returns'
    ]
  },
  {
    id: 'guide-3',
    slug: 'residential-vs-commercial-property-investment',
    title: 'Residential vs Commercial Property: Which Yields More?',
    excerpt: 'A comprehensive comparative analysis of risk, lease terms, tenant covenants, maintenance liabilities, and liquidity.',
    content: `When allocating substantial capital, choosing between Class-A residential homes and commercial plazas depends on your liquidity timeframe and hands-on preference.

Residential properties offer higher liquidity, broader buyer demand upon exit, and simplified mortgage financing. In contrast, commercial properties—specifically Triple-Net (NNN) plazas and office suites—place property taxes, insurance, and routine maintenance directly on institutional tenants, eliminating landlord operational headaches while delivering predictable 8-12 year cash flow contracts.`,
    category: 'Market Trends',
    author: 'Julian Vance',
    authorRole: 'Commercial Director',
    date: 'August 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    seoTitle: 'Residential vs Commercial Real Estate: Which Yields More? | Aura Estates',
    metaDescription: 'Expert comparison between residential and commercial property investments: cash flow, leases, yields, and risk analysis.',
    keyTakeaways: [
      'Commercial Triple-Net leases transfer operating costs to tenants',
      'Residential assets offer faster resale liquidity and flexible usage',
      'A diversified portfolio blends high-yield commercial with blue-chip residential equity'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Harrison Sterling-Cole',
    role: 'Principal, Sterling Asset Management',
    companyOrCity: 'London & Zurich',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    dealType: 'Purchased $18.5M Bel Air Architectural Villa',
    comment: 'Aura Estates orchestrated our cross-border family office acquisition with absolute precision and complete discretion. Their architectural appraisal caught details two independent inspectors missed.'
  },
  {
    id: 't-2',
    name: 'Camilla D’Angelo',
    role: 'Tech Founder & Private Investor',
    companyOrCity: 'New York & Milan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    dealType: 'Acquired Tribeca Duplex Penthouse ($14.2M)',
    comment: 'The team found our dream penthouse off-market in 12 days. Julian and Elena handled the cooperative board package effortlessly. Truly the gold standard in luxury realty.'
  },
  {
    id: 't-3',
    name: 'Tariq Al-Mansoor',
    role: 'Managing Director, Gulf Holdings',
    companyOrCity: 'Dubai & Singapore',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    dealType: 'Sold $48M Commercial Plaza Portfolio',
    comment: 'Their investment modeling and international institutional buyer network resulted in multiple competitive offers within three weeks. Transparent, responsive, and unmatched in commercial acumen.'
  }
];

export const INITIAL_INQUIRIES: any[] = [
  {
    id: 'inq-101',
    createdAt: '2026-09-24T14:20:00Z',
    type: 'schedule_tour',
    name: 'Lord Arthur Mountbatten',
    email: 'arthur.mountbatten@mayfairinvest.co.uk',
    phone: '+44 20 7946 0881',
    propertyId: 'prop-1',
    propertyTitle: 'The Solarium Architectural Compound',
    preferredDate: '2026-10-02',
    tourType: 'In-Person Private Viewing',
    message: 'We are flying in from Geneva on Friday. Would like a private 2-hour confidential viewing of the Bel Air estate accompanied by our principal architect.',
    status: 'Viewing Scheduled'
  },
  {
    id: 'inq-102',
    createdAt: '2026-09-25T08:15:00Z',
    type: 'inquiry',
    name: 'Sophia Lindqvist',
    email: 'sophia@lindqvistcapital.se',
    phone: '+46 8 123 4567',
    propertyId: 'prop-3',
    propertyTitle: 'Lumina Commercial Plaza & Towers',
    message: 'Requesting the comprehensive confidential investment prospectus, rent roll, and tenant lease agreements for the Brickell commercial plaza.',
    status: 'New'
  },
  {
    id: 'inq-103',
    createdAt: '2026-09-25T11:45:00Z',
    type: 'sell_submission',
    name: 'David K. Henderson',
    email: 'd.henderson@hendersonholdings.com',
    phone: '+1 (415) 890-2134',
    message: 'Looking to discreetly sell our modern oceanfront compound in Malibu. 7,800 sq ft on 1.2 acres with private beach stairs.',
    status: 'Contacted',
    sellDetails: {
      propertyType: 'villa',
      location: 'Malibu Colony Road, CA',
      size: '7,800 sq ft',
      expectedPrice: '$21,500,000'
    }
  }
];
