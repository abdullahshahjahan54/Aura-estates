import React from 'react';
import { useRealEstate } from '../context/RealEstateContext';
import { RealEstateGuide } from '../types';
import { Clock, User, ArrowRight, Sparkles, BookOpen, X, CheckCircle2 } from 'lucide-react';

export const BlogGuidesSection: React.FC = () => {
  const { guides, selectedGuide, setSelectedGuide } = useRealEstate();

  return (
    <section id="blog-section" className="py-24 bg-neutral-950 text-neutral-100 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Estate Intelligence & SEO Guides</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2">
              Research & Market Guides
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg leading-relaxed">
              Proprietary market insights, regulatory analysis, and actionable guides curated by our senior managing partners.
            </p>
          </div>
        </div>

        {/* Guides Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="group bg-neutral-900/70 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-amber-400 border border-neutral-800">
                    {guide.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{guide.readTime}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{guide.date}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed font-light">
                    {guide.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-800/80 mt-4 flex items-center justify-between text-xs text-neutral-300">
                <span className="text-[11px] text-neutral-400">By {guide.author}</span>
                <span className="text-amber-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Full Guide Reader Modal */}
        {selectedGuide && (
          <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col text-neutral-100">
              
              <div className="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <span className="text-amber-400 font-bold uppercase">{selectedGuide.category}</span>
                  <span>·</span>
                  <span>{selectedGuide.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
                    {selectedGuide.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span>Written by {selectedGuide.author} ({selectedGuide.authorRole})</span>
                    <span>·</span>
                    <span>Published {selectedGuide.date}</span>
                  </div>
                </div>

                <div className="aspect-[16/8] rounded-xl overflow-hidden">
                  <img src={selectedGuide.image} alt={selectedGuide.title} className="w-full h-full object-cover" />
                </div>

                {/* Key takeaways box */}
                <div className="p-5 bg-neutral-950 border border-amber-500/30 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Key Strategic Takeaways</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {selectedGuide.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Body Content */}
                <div className="prose prose-invert max-w-none text-neutral-300 text-sm leading-relaxed whitespace-pre-line font-light">
                  {selectedGuide.content}
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <div className="text-xs text-neutral-500 font-mono">
                    Canonical: /guides/{selectedGuide.slug}
                  </div>
                  <button
                    onClick={() => setSelectedGuide(null)}
                    className="px-4 py-2 bg-amber-400 text-neutral-950 font-bold text-xs uppercase rounded"
                  >
                    Close Article
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
