import React, { useState } from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { X, Globe, FileCode, CheckCircle2, Copy } from 'lucide-react';

export const SeoViewerModal: React.FC = () => {
  const { seoViewerOpen, setSeoViewerOpen, properties, guides } = useRealEstate();
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'schema'>('schema');
  const [copied, setCopied] = useState(false);

  if (!seoViewerOpen) return null;

  // Generate dynamic XML sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Real Estate Pages -->
  <url>
    <loc>https://auraestates.luxury/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://auraestates.luxury/#properties-section</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://auraestates.luxury/#buy-section</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://auraestates.luxury/#rent-section</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://auraestates.luxury/#invest-section</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://auraestates.luxury/#sell-section</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Property Listings -->
${properties.map(p => `  <url>
    <loc>https://auraestates.luxury/properties/${p.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}

  <!-- Guides & SEO Articles -->
${guides.map(g => `  <url>
    <loc>https://auraestates.luxury/guides/${g.slug}</loc>
    <lastmod>2026-09-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`).join('\n')}
</urlset>`;

  const robotsTxt = `# Aura Estates Robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://auraestates.luxury/sitemap.xml`;

  const sampleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://auraestates.luxury/#organization",
        "name": "Aura Estates",
        "url": "https://auraestates.luxury",
        "logo": "https://auraestates.luxury/assets/logo.png",
        "description": "Premier luxury real estate brokerage providing buying, renting, selling, and property investment opportunities.",
        "telephone": "+1-800-555-2872",
        "email": "concierge@auraestates.luxury",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "450 North Rodeo Drive, Suite 800",
          "addressLocality": "Beverly Hills",
          "addressRegion": "CA",
          "postalCode": "90210",
          "addressCountry": "US"
        },
        "priceRange": "$$$$"
      },
      ...properties.slice(0, 2).map(p => ({
        "@type": p.type === 'apartment' || p.type === 'penthouse' ? "Apartment" : "SingleFamilyResidence",
        "name": p.title,
        "description": p.description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": p.location.address,
          "addressLocality": p.location.city,
          "addressRegion": p.location.state || "",
          "addressCountry": p.location.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": p.location.coordinates.lat,
          "longitude": p.location.coordinates.lng
        },
        "numberOfRooms": p.bedrooms,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": p.coveredArea,
          "unitCode": "FTK"
        },
        "offers": {
          "@type": "Offer",
          "price": p.price,
          "priceCurrency": p.currency,
          "availability": "https://schema.org/InStock",
          "businessFunction": p.purpose === 'sale' ? "https://schema.org/SellAction" : "https://schema.org/RentAction"
        }
      }))
    ]
  };

  const getActiveContent = () => {
    if (activeTab === 'sitemap') return sitemapXml;
    if (activeTab === 'robots') return robotsTxt;
    return JSON.stringify(sampleSchema, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 text-neutral-100 max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-2xl font-bold text-white">Technical SEO & Schema.org Inspector</h3>
          </div>
          <button
            onClick={() => setSeoViewerOpen(false)}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                activeTab === 'schema' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white bg-neutral-950'
              }`}
            >
              Schema.org (JSON-LD)
            </button>
            <button
              onClick={() => setActiveTab('sitemap')}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                activeTab === 'sitemap' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white bg-neutral-950'
              }`}
            >
              sitemap.xml
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                activeTab === 'robots' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white bg-neutral-950'
              }`}
            >
              robots.txt
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded flex items-center gap-1.5 transition-colors font-mono"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Output Area */}
        <div className="flex-1 overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-xs text-neutral-300 leading-relaxed whitespace-pre selection:bg-amber-500/20 selection:text-amber-300">
          {getActiveContent()}
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <span>Fully compliant with Google Search Central RealEstateAgent & Residence structured data guidelines.</span>
          <button
            onClick={() => setSeoViewerOpen(false)}
            className="px-4 py-1.5 bg-neutral-800 text-neutral-300 hover:text-white rounded"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
