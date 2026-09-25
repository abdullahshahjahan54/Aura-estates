import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-neutral-900 border-t border-neutral-800 text-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3">
            What Our Clients Say
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto">
            Real feedback from institutional investors, tech founders, and private families who partnered with Aura Estates.
          </p>
        </div>

        {/* Testimonial Showcase Box */}
        <div className="relative bg-neutral-950 border border-neutral-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
          <Quote className="w-12 h-12 text-amber-500/20 absolute top-8 left-8 -z-0" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-amber-400/40 shrink-0"
            />

            <div className="flex-1 text-center md:text-left space-y-4">
              
              {/* Rating Stars */}
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-neutral-100 italic leading-relaxed">
                "{current.comment}"
              </p>

              {/* Attribution */}
              <div className="pt-2 border-t border-neutral-800">
                <h4 className="font-bold text-white text-base">{current.name}</h4>
                <p className="text-xs text-amber-400 font-medium">{current.role} · {current.companyOrCity}</p>
                <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{current.dealType}</p>
              </div>

            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-900">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-amber-400 w-6' : 'bg-neutral-800'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
